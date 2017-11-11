# coding= utf-8

ERROR = 1000
EXCEPTION = 1001
PASSWORD_ENCRYPTION_ERROR = 1002
GENERATE_RECORD_PATH_ERROR = 1003
CREATE_RECORD_PATH_ERROR = 1004

lmap = {}
lmap[ERROR] = 'Error'
lmap[EXCEPTION] = 'Exception'
lmap[PASSWORD_ENCRYPTION_ERROR] = 'Password encryption error'
lmap[GENERATE_RECORD_PATH_ERROR] = 'Generate record path error'
lmap[CREATE_RECORD_PATH_ERROR] = 'Create record path error'

lrev = {}
for k in lmap:
    lrev[lmap[k]] = k
