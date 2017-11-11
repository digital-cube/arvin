from base.common.utils import retrieve_log
from src.config.arvin_config import enc_file_path


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
