var sp-socket = require('../sp-socket/');
var socket_options = {
    'close timeout': 30,
    'heartbeat timeout': 30,
    'heartbeat interval': 15,
    'polling duration': 10,
    'log level': 0,
    'transports': [
        'websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]
};
var sp = new sp-socket(3000, 5, 'serialport', socket_options);
