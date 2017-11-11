# coding= utf-8

import datetime
import decimal
import json
import uuid
import io
import tempfile

import base.common.orm
from base.application.components import Base
from base.application.components import api
from base.application.components import params
from base.application.components import authenticated

from src.lookup import user_roles as role
from src.lookup import response_messages as rmsgs
from src.common.arvin_common import have_record
from src.common.arvin_common import crypt_enc_password
from src.common.arvin_common import decrypt_enc_password
from src.common.arvin_common import get_record_path
from src.common.arvin_common import make_record_path
from src.common.arvin_common import decode_data_file
from src.common.arvin_common import get_own_file
from src.common.arvin_common import encode_data_file
from src.common.arvin_common import generate_gpg_keys
from src.config.arvin_config import enc_key_path


@authenticated(role.USER)
@api(
    URI='/medical-record'
)
class MedicalRecord(Base):
    @params(
        {'name': 'pin', 'type': str, 'required': True, 'doc': 'user\'s pin'},
    )
    def get(self, pin):
        """user get his own record"""
        return self.ok()

    @params(
        {'name': 'pin', 'type': str, 'required': True, 'doc': 'user\'s pin'},
        {'name': 'ssn', 'type': str, 'required': True, 'doc': 'user\'s ssn'}
    )
    def post(self, pin, ssn):
        """user create medical record"""

        if have_record(self.auth_user):
            return self.error(rmsgs.MEDICAL_RECORD_EXISTS)

        MR, _session = base.common.orm.get_orm_model('medical_records')

        _uniq_pass = uuid.uuid1()
        _uniq_encrypted = crypt_enc_password(_uniq_pass, pin)
        if not _uniq_encrypted:
            return self.error(rmsgs.PASSWORD_ENCRYPTION_ERROR)
        self.auth_user.user.enc_key = _uniq_encrypted

        _record_path = get_record_path(self.auth_user)
        if not _record_path:
            return self.error(rmsgs.GENERATE_RECORD_PATH_ERROR)
        if not make_record_path(_record_path):
            return self.error(rmsgs.CREATE_RECORD_PATH_ERROR)
        if not generate_gpg_keys(self.auth_user.username, _uniq_pass, _record_path):
            return self.error(rmsgs.GENERATE_KEYS_ERROR)

        self.auth_user.user.record_path = _record_path
        mr = MR(self.auth_user.id, ssn)
        _session.add(mr)
        _session.commit()

        return self.ok()

    @params(
        {'name': 'pin', 'type': str, 'required': True, 'doc': 'user\'s pin'},
        {'name': 'weight', 'type': float, 'required': False, 'doc': 'user\'s weight'},
        {'name': 'height', 'type': float, 'required': False, 'doc': 'user\'s height'},
        {'name': 'systolic_blood_pressure', 'type': int, 'required': False, 'doc': 'systolic blood pressure'},
        {'name': 'diastolic_blood_pressure', 'type': int, 'required': False, 'doc': 'diastolic blood pressure'},
        {'name': 'blood_type', 'type': str, 'required': False, 'doc': 'blood_type'},
        {'name': 'own_data', 'type': json, 'required': False, 'doc': 'users records'},
    )
    def put(self, pin, weight, height, systolic_blood_pressure, diastolic_blood_pressure, blood_type, own_data):
        """user save medical record"""

        if not have_record(self.auth_user):
            return self.error(rmsgs.MEDICAL_RECORD_DO_NOT_EXISTS)
        MR, _session = base.common.orm.get_orm_model('medical_records')
        _q = _session.query(MR).filter(MR.id == self.auth_user.id)
        if _q.count() != 1:
           return self.error(rmsgs.MEDICAL_RECORD_DO_NOT_EXISTS)

        _mr = _q.one()

        _decoded_pass = decrypt_enc_password(self.auth_user.user.enc_key, pin)
        if not _decoded_pass:
            return self.error(rmsgs.PASSWORD_DECRYPTION_ERROR)

        _own_data_file = get_own_file(self.auth_user)
        if _mr.have_personal_data:
            # get old data end calculate changes

            # TODO: user stream instead of file
            # _file_like_obj = io.BytesIO()
            _file_like_obj = tempfile.NamedTemporaryFile()
            _decoded_own_data = decode_data_file(_own_data_file.name, _decoded_pass, _file_like_obj)
            if not _decoded_own_data:
                return self.error(rmsgs.FILE_DECODING_ERROR)

            # uchitaj podatke ako ih ima u own_file-u
            # analiziraj promene i upishi ih u log

            _mr.have_personal_data = True

            # TODO: user stream instead of file
        # _file_like_input_obj = io.BytesIO(json.dumps(own_data))
        _file_like_input_obj = tempfile.NamedTemporaryFile()
        key_file = enc_key_path.format(self.auth_user.user.record_path)
        # def encode_data_file(file_like_object, recipient, encoded_file, auth_user):
        if not encode_data_file(_file_like_input_obj.name, self.auth_user.username, _own_data_file, key_file):
            return self.error(rmsgs.FILE_ENCODING_ERROR)

        _mr.have_personal_data = True

        return self.ok()

    # @params(
    #     {'name': 'pin', 'type': str, 'required': True, 'doc': 'user\'s pin'},
    #     {'name': 'record', 'type': json, 'required': True, 'doc': 'record data'},
    # )
    # def patch(self, pin, record):
    #     """user write his own data"""
    #     return self.ok()


# admin
# request with ssn - get
    # send ssn
        # if there are no records with ssn return not found
        # if user found tell the user that someone requesting his data (doctor with his doc id, first and last name
            # if the user says no doctor receives a denial
            # if the user says ok,
                # user's data has to be decrypted and encrypted with doctor's public key
                # doctor is informed with the socket
                # doctor with his pin decrypt and receives the data

# request write
    # doctor send data and wait
    # data are encrypted with users public key and saved to redis with key
    # socket inform the user with the key
    # user answer to request with the key
    # doctor get an answer
        # if no choose to remove data or not
        # if yes doctor receives na ok and the data from the redis are saved
    # this can only write admin's data

@api(
    URI='/save-pin'
)
class MedicalRecords(Base):
    @authenticated(role.ADMIN)
    @params(
        {'name': 'pin', 'type': str, 'required': True, 'doc': 'admin\'s pin'},
    )
    def put(self, ssn):
        """generate password and keys for the admin"""
        return self.ok()

@api(
    URI='/records-access'
)
class MedicalRecords(Base):
    @authenticated(role.ADMIN)
    @params(
        {'name': 'ssn', 'type': str, 'required': True, 'doc': 'user\'s ssn'},
    )
    def get(self, ssn):
        """doctor request access to users records"""
        return self.ok()

    @authenticated(role.USER)
    @params(
        {'name': 'ssn', 'type': str, 'required': True, 'doc': 'user\'s ssn'},
    )
    def put(self, ssn):
        """user answer to record access request"""
        return self.ok()


@authenticated()
@api(
    URI='/medical-records/:id_user'
)
class MedicalRecords(Base):
    @authenticated()
    @params(
        {'name': 'pin', 'type': str, 'required': True, 'doc': 'doctor\'s pin'},
    )
    def get(self, pin):
        """doctor get user's records with his pin"""
        return self.ok()

    @authenticated()
    @params(
        {'name': 'record', 'type': str, 'required': True, 'doc': 'user\'s record data'},
    )
    def put(self, record):
        """doctor request to write user's medical record"""
        return self.ok()


