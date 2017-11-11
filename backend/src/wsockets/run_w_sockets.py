#!/usr/bin/env python

import json
import os

import txredisapi as redis
from autobahn.twisted.util import sleep
from autobahn.twisted.wamp import ApplicationSession
from twisted.internet import reactor
from twisted.internet.defer import inlineCallbacks
from twisted.internet.error import ReactorNotRunning

import config.web_sockets_config as cfg


class Redis2WS(ApplicationSession):
    def __init__(self, config=None):
        super(ApplicationSession, self).__init__(config)
        self.log = cfg.log

    def __repr__(self):
        return 'Redis2WS'

    def __str__(self):
        return 'Redis2WS'

    def onConnect(self):
        self.log.info("{} component connected!".format(self))
        self.join(self.config.realm)
    
    def onLeave(self, details):
        self.log.info("{} component left!".format(self))
        self.disconnect()
    
    def onDisconnect(self):
        self.log.info("{} component disconnected!".format(self))
        try:
            reactor.stop()
        except ReactorNotRunning:
            pass
    
    @inlineCallbacks
    def onJoin(self, details):
        self.log.info('{} component details --> (PID {}, Session {})'.format(self.__repr__(), os.getpid(), details.session))
        rdb = yield redis.Connection(host=cfg.redis_host, port=cfg.redis_port)
        
        while True:
            try:
                news = yield rdb.brpop(cfg.ws_redis_channel, cfg.redis_block_timeout)
                if news:
                    news = json.loads(news[1])
                    self.log.debug('wamp session {} ==> {}'.format(details.session, news))
                    yield self.publish(news['channel'], news['msg'])
                yield sleep(0)
            except Exception as e:
                self.log.debug('Exception: {}'.format(e))
