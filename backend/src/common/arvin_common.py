import gnupg

from base.common.utils import retrieve_log
from src.config.arvin_config import enc_key_path
from src.config.arvin_config import enc_file_path
from src.config.arvin_config import own_data_file
from src.config.arvin_config import external_data_file
from src.config.arvin_config import enc_key_name


def get_chain_log():

    return retrieve_log('arvin_chain.log')


def have_record(auth_user):
    import base.common.orm
    MR, _session = base.common.orm.get_orm_model('medical_records')
    _q = _session.query(MR).filter(MR.id==auth_user.id)

    return _q.count() != 0


def crypt_enc_password(enc_pass, pin):

    # try:
    if True:
        _enc_pass_str = str(enc_pass)
        _idx = round(len(_enc_pass_str)/len(pin)) + 2
        _xor_pin = (pin * _idx)[:len(_enc_pass_str)]
        _pass_list = [ord(c) for c in _enc_pass_str]
        _pin_list = [int(i) for i in _xor_pin]

        _xor_pin_list = []
        _i = 0
        for _p in _pin_list:
            _xor_pin_list.append(_pass_list[_i] ^ _p)
            _i += 1

        return ''.join([chr(i) for i in _xor_pin_list])
    # except:
    #     return False


def decrypt_enc_password(enc_pass, pin):

    try:
        return crypt_enc_password(enc_pass, pin)
    except:
        return False


def get_record_path(auth_user):

    return '{}/{}'.format(enc_file_path, auth_user.username)


def make_record_path(_path):

    try:
        import os
        if not os.path.exists(_path):
            os.mkdir(_path)
        return True
    except:
        return False


_null_record = {
    "id": "mock_id_user",
    "main": {
        "weight": 0.0,
        "height": 0.0,
        "systolic_blood_pressure": 0,
        "diastolic_blood_pressure": 0,
        "blood_type": ""
    },
    "own_record": [],
    "extern_records": []
}


def pack_medical_record(record=None):

    global _null_record
    if record is None:
        return _null_record


def get_own_file(auth_user):

    return '{}/{}/{}'.format(enc_file_path, auth_user.username, own_data_file)


def get_external_file(auth_user):

    return '{}/{}/{}'.format(enc_file_path, auth_user.username, external_data_file)


def get_gpg_key_file_path(key_path):

    return '{}/{}'.format(enc_key_path.format(key_path), enc_key_name)


def generate_gpg_keys(username, password, _data_path):

    key_path = enc_key_path.format(_data_path)
    _key_file = get_gpg_key_file_path(_data_path)
    # CREATE KEY
    gpg = gnupg.GPG(gnupghome=key_path)
    input_data = gpg.gen_key_input(
            name_email=username,
            passphrase=password)

    key = gpg.gen_key(input_data)

    # EXPORT KEYS TO FILE
    ascii_public = gpg.export_keys(str(key.fingerprint))
    ascii_private = gpg.export_keys(str(key.fingerprint), password, True)
    with open(_key_file, 'w') as kf:

        kf.write(ascii_public)
        kf.write(ascii_private)

    return True


def decode_data_file(encoded_file, password, auth_user, file_like_obj, key_path):

    # print('PAAAAAAAAASWORD', type(password), password)
    # file_like_obj='/home/bobane/hackatone/arvin/backend/drk.json'
    # key_path = get_record_path(auth_user)
    gpg = gnupg.GPG(gnupghome=key_path)
    # DECRYPT FILE
    with open(encoded_file, 'rb') as ef:
        status = gpg.decrypt_file(ef,
                                  passphrase=password,
                                  output=file_like_obj)

        print('ok: ', status.ok)
        print('status: ', status.status)
        print('stderr: ', status.stderr)
        if not status.ok:
            return False

    return True


def encode_data_file(file_like_object, recipient, encoded_file, key_path):

    gpg = gnupg.GPG(gnupghome=key_path)
    with open(file_like_object, 'rb') as f:
        status = gpg.encrypt_file(
            f, recipients=[recipient],
            output=encoded_file)

        print('ok: ', status.ok)
        print('status: ', status.status)
        print('stderr: ', status.stderr)
        if not status.ok:
            return False

    return True
