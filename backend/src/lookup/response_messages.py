# coding= utf-8

ERROR = 1000
EXCEPTION = 1001
PASSWORD_ENCRYPTION_ERROR = 1002
GENERATE_RECORD_PATH_ERROR = 1003
CREATE_RECORD_PATH_ERROR = 1004
MEDICAL_RECORD_EXISTS = 1005
MEDICAL_RECORD_DO_NOT_EXISTS = 1006
PASSWORD_DECRYPTION_ERROR = 1007
FILE_DECODING_ERROR = 1008
FILE_ENCODING_ERROR = 1009
GENERATE_KEYS_ERROR = 1010

lmap = {}
lmap[ERROR] = 'Error'
lmap[EXCEPTION] = 'Exception'
lmap[PASSWORD_ENCRYPTION_ERROR] = 'Password encryption error'
lmap[GENERATE_RECORD_PATH_ERROR] = 'Generate record path error'
lmap[CREATE_RECORD_PATH_ERROR] = 'Create record path error'
lmap[MEDICAL_RECORD_EXISTS] = 'Medical record exists'
lmap[MEDICAL_RECORD_DO_NOT_EXISTS] = 'Medical record do not exists'
lmap[PASSWORD_DECRYPTION_ERROR] = 'Password decryption error'
lmap[FILE_DECODING_ERROR] = 'Error decode file'
lmap[FILE_ENCODING_ERROR] = 'Error encode file'
lmap[GENERATE_KEYS_ERROR] = 'Generate keys error'

lrev = {}
for k in lmap:
    lrev[lmap[k]] = k
