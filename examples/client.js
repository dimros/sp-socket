var sp_socket = require('../index.js');
var socket_options = {
    'close timeout': 30,
    'heartbeat timeout': 30,
    'heartbeat interval': 15,
    'polling duration': 10,
    'log level': 3,
    'transports': [
        'websocket',
        'flashsocket',
        'htmlfile',
        'xhr-polling',
        'jsonp-polling'
    ]
};
var sp = new sp_socket(3030, 5, 'serialport', socket_options);
