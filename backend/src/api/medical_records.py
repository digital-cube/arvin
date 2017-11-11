# coding= utf-8

from base.application.components import Base
from base.application.components import api
from base.application.components import params
from base.application.components import authenticated

import datetime
import decimal
import json

from src.lookup import user_roles as role


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
        {'name': 'weight', 'type': float, 'required': False, 'doc': 'user\'s weight'},
        {'name': 'height', 'type': float, 'required': False, 'doc': 'user\'s height'},
        {'name': 'systolic_blood_pressure', 'type': int, 'required': False, 'doc': 'systolic blood pressure'},
        {'name': 'diastolic_blood_pressure', 'type': int, 'required': False, 'doc': 'diastolic blood pressure'},
        {'name': 'blood_type', 'type': str, 'required': False, 'doc': 'blood_type'},
    )
    def put(self, pin, weight, height, systolic_blood_pressure, diastolic_blood_pressure, blood_type):
        """user create medical record"""
        return self.ok()

    @params(
        {'name': 'pin', 'type': str, 'required': True, 'doc': 'user\'s pin'},
        {'name': 'record', 'type': json, 'required': True, 'doc': 'record data'},
    )
    def patch(self, pin, record):
        """user write his own data"""
        return self.ok()


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


