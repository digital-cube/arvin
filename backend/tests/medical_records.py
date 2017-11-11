# coding: utf-8

import os
import json
import shutil
from decimal import Decimal
from tornado.httputil import url_concat
from base.tests.helpers.testing import TestBase
from base.application.lookup import responses


class TestMedicalRecords(TestBase):

    def _remove_user_data_path(self, username):

        from src.config.arvin_config import enc_file_path
        _path = '{}/{}'.format(enc_file_path, username)
        if os.path.exists(_path):
            print('UUUUUUUUUUKLLONI', _path)
            os.system('rm -rf {}'.format(_path))
            # shutil.rmtree(_path)

    # def test_user_open_medical_record(self):
    #
    #     self._register('doctor@test.loc', '123',
    #                    {"first_name": "doctor", "last_name": "test", "phone": "+234234", "role_flags": "2"})
    #     _doc_token = self.token
    #
    #     self._register('user@test.loc', '123',
    #                    {"first_name": "user", "last_name": "test", "phone": "+234234", "role_flags": "1"})
    #
    #     _user_token = self.token
    #
    #     headers = {'Authorization': _user_token}
    #
    #     _body = {
    #         'pin': '1234567890',
    #         'ssn': '1234567890212'
    #     }
    #     _body = json.dumps(_body)
    #
    #     res = self.fetch('/api/medical-record', method='POST', body=_body, headers=headers)
    #     print('RES', res)
    #     self.assertEqual(res.code, 204)
    #
    # def test_password_pin_encryption(self):
    #
    #     passes = [
    #         'ff1be51a-c680-11e7-8be7-b88a60581a29',
    #         'ff1bf5aa-c680-11e7-8be7-b88a60581a29',
    #         'ff1bfdc0-c680-11e7-8be7-b88a60581a29',
    #         'ff1c01bc-c680-11e7-8be7-b88a60581a29',
    #         'ff1c03f6-c680-11e7-8be7-b88a60581a29',
    #         'ff1c05fe-c680-11e7-8be7-b88a60581a29',
    #         'ff1c07e8-c680-11e7-8be7-b88a60581a29',
    #         'ff1c09d2-c680-11e7-8be7-b88a60581a29',
    #         'ff1c0bbc-c680-11e7-8be7-b88a60581a29',
    #         'ff1c0db0-c680-11e7-8be7-b88a60581a29'
    #     ]
    #     pin = '1234123498'
    #     from src.common.arvin_common import crypt_enc_password
    #     from src.common.arvin_common import decrypt_enc_password
    #
    #     for p in passes:
    #
    #         _encrypted_pass = crypt_enc_password(p, pin)
    #         self.assertTrue(_encrypted_pass)
    #         _decrypted_pass = decrypt_enc_password(_encrypted_pass, pin)
    #         self.assertTrue(_decrypted_pass)
    #         self.assertEqual(p, _decrypted_pass)
    #
    # def test_user_save_medical_record_with_empty_data(self):
    #
    #     self._register('doctor@test.loc', '123',
    #                    {"first_name": "doctor", "last_name": "test", "phone": "+234234", "role_flags": "2"})
    #     _doc_token = self.token
    #
    #     self._register('user@test.loc', '123',
    #                    {"first_name": "user", "last_name": "test", "phone": "+234234", "role_flags": "1"})
    #
    #     _user_token = self.token
    #
    #     headers = {'Authorization': _user_token}
    #
    #     _body = {
    #         'pin': '1234567890',
    #         'ssn': '1234567890212'
    #     }
    #     _body = json.dumps(_body)
    #
    #     res = self.fetch('/api/medical-record', method='POST', body=_body, headers=headers)
    #     print('RES', res)
    #     self.assertEqual(res.code, 204)
    #
    #     _body = {
    #         'pin': '1234567890',
    #         'weight': 100.0,
    #         'height': 185.6,
    #         'systolic_blood_pressure': 120,
    #         'diastolic_blood_pressure': 80,
    #         'blood_type': 'A+',
    #         'own_data': json.dumps([])
    #     }
    #     _body = json.dumps(_body)
    #
    #     res = self.fetch('/api/medical-record', method='PUT', body=_body, headers=headers)
    #     self.assertEqual(res.code, 204)
    #
    # def test_user_save_medical_record_with_data(self):
    #
    #     self._register('doctor@test.loc', '123',
    #                    {"first_name": "doctor", "last_name": "test", "phone": "+234234", "role_flags": "2"})
    #     _doc_token = self.token
    #
    #     self._register('user@test.loc', '123',
    #                    {"first_name": "user", "last_name": "test", "phone": "+234234", "role_flags": "1"})
    #
    #     _user_token = self.token
    #
    #     headers = {'Authorization': _user_token}
    #
    #     _body = {
    #         'pin': '1234567890',
    #         'ssn': '1234567890212'
    #     }
    #     _body = json.dumps(_body)
    #
    #     res = self.fetch('/api/medical-record', method='POST', body=_body, headers=headers)
    #     print('RES', res)
    #     self.assertEqual(res.code, 204)
    #
    #     _body = {
    #         'pin': '1234567890',
    #         'weight': 100.0,
    #         'height': 185.6,
    #         'systolic_blood_pressure': 120,
    #         'diastolic_blood_pressure': 80,
    #         'blood_type': 'A+',
    #         'own_data': json.dumps([
    #             {
    #                 "record_id": "234234234_234234",
    #                 "record_time_created": "2017-10-21 15:12:22",
    #                 "record_data": {
    #                     "title": "fuck off",
    #                     "description": "fuck off the beste"
    #                 }
    #             },
    #             {
    #                 "record_id": "234234234_234234",
    #                 "record_time_created": "2017-10-21 18:12:22",
    #                 "record_data": {
    #                     "title": "fuck off 2",
    #                     "description": "fuck off the beste 2"
    #                 }
    #             }
    #         ])
    #     }
    #     _body = json.dumps(_body)
    #
    #     res = self.fetch('/api/medical-record', method='PUT', body=_body, headers=headers)
    #     self.assertEqual(res.code, 204)


    def test_user_get_medical_records(self):

        self._remove_user_data_path('user@test.loc')

        self._register('doctor@test.loc', '123',
                       {"first_name": "doctor", "last_name": "test", "phone": "+234234", "role_flags": "2"})
        _doc_token = self.token

        self._register('user@test.loc', '123',
                       {"first_name": "user", "last_name": "test", "phone": "+234234", "role_flags": "1"})

        _user_token = self.token

        headers = {'Authorization': _user_token}

        _pin = '1234567890'
        _body = {
            'pin': _pin,
            'ssn': '1234567890212'
        }
        _body = json.dumps(_body)

        res = self.fetch('/api/medical-record', method='POST', body=_body, headers=headers)
        print('RES', res)
        self.assertEqual(res.code, 204)

        _body = {
            'pin': _pin,
            'weight': 100.0,
            'height': 185.6,
            'systolic_blood_pressure': 120,
            'diastolic_blood_pressure': 80,
            'blood_type': 'A+',
            'own_data': json.dumps([
                {
                    "record_id": "234234234_234234",
                    "record_time_created": "2017-10-21 15:12:22",
                    "record_data": {
                        "title": "fuck off",
                        "description": "fuck off the beste"
                    }
                },
                {
                    "record_id": "234234234_234234",
                    "record_time_created": "2017-10-21 18:12:22",
                    "record_data": {
                        "title": "fuck off 2",
                        "description": "fuck off the beste 2"
                    }
                }
            ])
        }
        _body = json.dumps(_body)

        res = self.fetch('/api/medical-record', method='PUT', body=_body, headers=headers)
        print('RES', res)
        self.assertEqual(res.code, 204)

        res = self.fetch('/api/medical-record?pin={}'.format(_pin), method='GET', headers=headers)
        print('RES', res)
        self.assertEqual(res.code, 204)
