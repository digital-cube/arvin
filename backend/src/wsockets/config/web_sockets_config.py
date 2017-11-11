# coding: utf-8

import logging
from logging.handlers import TimedRotatingFileHandler

LOG_DIR = '/var/log/base'
w_logger = 'MBS_W'


log_filename = "{}/arvin_web_sockets.log".format(LOG_DIR)
log_handler = TimedRotatingFileHandler(log_filename, when="midnight")
log_formatter = logging.Formatter(
    '%(asctime)-6s %(name)s %(module)s %(funcName)s %(lineno)d - %(levelname)s %(message)s')
log_handler.setFormatter(log_formatter)

log = logging.getLogger(w_logger)
log.propagate = False
log.addHandler(log_handler)
log.setLevel(logging.DEBUG)

redis_host = 'localhost'
redis_port = 6379
redis_block_timeout = 1

ws_redis_channel = 'arvin2user'
PREFIX = 'arvin'

ws_messages_channel = ''
ws_messages_cmd = 'msg'
