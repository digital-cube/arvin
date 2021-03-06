# coding: utf-8
"""
API hooks, functions that will override default base hooks. Possible hooks are
listed in the 'hooks' list, just uncomment and define function with the same
name as in the 'hooks' list.

Possible hooks:

pack_user(AuthUser) -> [dict, None]:
        - return users data as dictionary
check_password_is_valid(password) -> bool:
        - check for password validation
register_user(id_user, username, password, data) -> [dict, str, convertible to string, None]:
        - register user on system
        - populate auth_users and users tables here
pre_register_user(username, password, data) -> [None]:
        - process user's data before user registration
post_register_process(id_user, username, password, data, session_token) -> [dict, None]:
        - process user's data after user registration
user_exists(username, password, data, handler) -> [User object]
        - check if username exists in the system
check_username_and_password(username, password, Auth_user) -> [bool]
        - check username / password match
pre_login_process(Auth_user, json_data) -> [dict, str, None]
        - pre login data processing
        - on error raise PreLoginError
post_login_process(Auth_user, json_data, token) -> [dict, str, None]
        - after login processing
        - on error raise PostLoginError
save_hash(hash_data) -> [dict, str]
        - save hash data
get_hash_data(hash) -> [dict, None]
        - retrieve data from hash
save_mail_queue(sender, sender_name, receiver, receiver_name, subject, message, data, get_data) -> [dict, None]
        - save mail queue
pre_logout_process(Auth_user) -> [dict, None]
        - pre logout data processing
post_logout_process(Auth_user, session_token) -> [dict, None]
        - post logout data processing
check_user(Auth_user) -> [dict]
        - check user process
get_mail_from_queue(id_message) -> [dict]
        - get mail data
forgot_password(AuthUser, data) -> [bool]
        - save forgot password request and message
class Tokenizer
        - tokenizer prototype
class SqlTokenizer
        - tokenizer for sql token storage
class RedisTokenizer
        - tokenizer for redis token storage
"""

hooks = [
    'pack_user',
    'check_password_is_valid',
    # 'register_user',
    # 'pre_register_user',
    # 'post_register_process',
    # 'user_exists',
    # 'pre_login_process',
    # 'post_login_process',
    # 'save_hash',
    # 'get_hash_data',
    # 'save_mail_queue',
    # 'pre_logout_process',
    # 'post_logout_process',
    'check_user',
    # 'get_mail_from_queue',
    # 'forgot_password',
    # 'Tokenizer',
    # 'SqlTokenizer',
    # 'RedisTokenizer',
]

import json

from base.application.api_hooks.api_hooks import format_password

import src.lookup.user_roles as role
from src.common import arvin_common


def check_password_is_valid(password):
    return True


def pack_user(user):
    """
    Prepare user's data
    :param user: orm Auth_user
    :return: dict with user's data
    """
    _user = {}
    _user['id'] = user.id
    _user['username'] = user.username
    _user['role'] = user.role_flags

    import base.common.orm
    User, _session = base.common.orm.get_orm_model('users')

    _q = _session.query(User).filter(User.id == user.id)

    if _q.count() == 1:
        _db_user = _q.one()

        _user['first_name'] = _db_user.first_name
        _user['last_name'] = _db_user.last_name
        _user['picture'] = _db_user.user_picture if \
            _db_user.user_picture is not None else \
            ('dummy_pic.jpg' if user.role_flags & role.USER else 'dummy_pic2.jpg')
        if user.role_flags & role.ADMIN:
            _user['id_admin'] = _db_user.admin_id
            _user['has_pin'] = _db_user.enc_key is not None
        if user.role_flags & role.USER:
            _user['have_data'] = arvin_common.have_record(user)

    return _user


def check_user(auth_user):
    """
    Check logged user and return it's data.
    On error raise CheckUserError exception
    :param auth_user:
    :return: dict with user's data
    """

    # res = {
    #     'id': auth_user.id,
    #     'username': auth_user.username,
    #     'first_name': auth_user.user.first_name,
    #     'last_name': auth_user.user.last_name
    # }

    return pack_user(auth_user)


def register_user(id_user, username, password, data):
    """
    Save user into database
    :param id_user: database user id
    :param username: user's username
    :param password: user's password
    :param data: user's data
    :return: bool success
    """
    import base.common.orm
    from base.common.utils import log
    AuthUser, _session = base.common.orm.get_orm_model('auth_users')
    User, _ = base.common.orm.get_orm_model('users')

    password = format_password(username, password)

    import base.application.lookup.user_roles as user_roles
    role_flags = int(data['role_flags']) if 'role_flags' in data else user_roles.USER

    if role_flags not in user_roles.lmap:
        log.critical('Wrong role type: {}'.format(role_flags))
        return 'Wrong user role type {}'.format(role_flags)

    _auth_user = AuthUser(id_user, username, password, role_flags, True)
    _session.add(_auth_user)
    _session.commit()

    first_name = data['first_name'] if 'first_name' in data else None
    last_name = data['last_name'] if 'last_name' in data else None
    from base.common.sequencer import sequencer
    admin_id = sequencer().new('a') if role_flags & role.ADMIN else None
    _data = json.dumps(data)
    _user = User(id_user, first_name, last_name, _data, admin_id)
    _session.add(_user)
    _session.commit()

    return True

