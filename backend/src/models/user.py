import datetime
from sqlalchemy import Column, String, Integer, ForeignKey, Boolean, DateTime, Text, CHAR
from sqlalchemy.orm import relationship
import base.common.orm


class AuthUser(base.common.orm.sql_base):

    __tablename__ = 'auth_users'

    id = Column(CHAR(10), primary_key=True)
    username = Column(String(64), index=True, nullable=False, unique=True)
    password = Column(String(64), nullable=False)
    role_flags = Column(Integer, index=True, nullable=False)
    active = Column(Boolean, index=True, nullable=False, default=False)
    created = Column(DateTime, nullable=False, default=datetime.datetime.now())
    user = relationship('User', uselist=False, back_populates='auth_user')

    def __init__(self, _id, username, password, role_flags=1, active=False):

        self.id = _id
        self.username = username
        self.password = password
        self.role_flags = role_flags
        self.active = active
        self.created = datetime.datetime.now()


class User(base.common.orm.sql_base):

    __tablename__ = 'users'

    id = Column(CHAR(10), ForeignKey(AuthUser.id), primary_key=True)
    first_name = Column(String(64))
    last_name = Column(String(64))
    admin_id = Column(String(64))
    user_picture = Column(String(64))
    data = Column(Text)
    auth_user = relationship("AuthUser", back_populates="user")

    def __init__(self, id_user, first_name, last_name, data, admin_id=None):

        self.id = id_user
        self.first_name = first_name
        self.last_name = last_name
        self.data = data
        self.admin_id = admin_id


class MedicalRecords(base.common.orm.sql_base):

    __tablename__ = 'medical_records'

    id = Column(CHAR(10), ForeignKey(AuthUser.id), primary_key=True)
    time_created = Column(DateTime, nullable=False, default=datetime.datetime.now())
    ssn = Column(String(64), nullable=False, index=True, unique=True)
    # pin = Column(String(16), nullable=False)
    enc_key = Column(String(128), nullable=False)
    record_path = Column(String(256), nullable=False)
    have_personal_data = Column(Boolean, index=True, nullable=False, default=False)
    have_admins_data = Column(Boolean, index=True, nullable=False, default=False)
    personal_data_files = Column(Text, nullable=True)
    admins_data_files = Column(Text, nullable=True)

    def __init__(self, _id, ssn, enc_key, record_path):
        self.id = _id
        self.ssn = ssn
        self.enc_key = enc_key
        self.record_path = record_path


def main():
    pass


if __name__ == '__main__':

    main()
