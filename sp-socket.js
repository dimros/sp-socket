// ----------------------------------------------------------------------
// socket.io & serialport
var serialport = require('serialport');
var SerialPort = serialport.SerialPort;

var log_level = 3;
var log_output = function(data, flag){
    switch(log_level){
      case 3:
      case 2:
        if(!flag){console.log(data)};
      case 1:
      case 0:
        if(flag === 'err'){console.error(data);}
    };
};
function checkObject(_obj){
    for(var key in _obj){
        if(key === 'log level'){
            log_level = _obj[key];
        }
    }
}

var sp-socket = function(listenPort, maxSocket, socketName, options){
    var listen_port = listenPort || 80;
    var max_socket = maxSocket || 5;
    var socket_name = socketName || 'serialport';
    var opts = options || {};
    checkObject(options);
    var io = require('socket.io').listen(listen_port, opts);

    for(var i=0; i < max_socket; i++){
        io.of('/' + socket_name + i )
            .on('connection', function(socket){
                sp_select(socket);
            });
    };
};

var sp_select = function(socket){
    serialport.list(function (err, ports){
        if(err){return;}
        socket.emit('port', ports);
    });
    socket.on('com_open', function(data){
        var portName  = data.portName;
        var options = {};
        options.baudRate = data.baudRate || 19200;
        options.dataBits = data.dataBits || 8;
        options.parity = data.parity || 'none';
        options.stopBits = data.stopBits || 1;
        options.flowControl = data.flowControl || false;
        options.buffersize = data.buffersize || 255;
        if(data.parser){
            options.parser = (data.parser === '') ? serialport.parsers.raw : serialport.parsers.readline(data.parser);  
        }
        var encoding = data.encoding || 'hex';
        sp_connect(socket, portName, options, encoding);
    });
};

var sp_connect = function(socket, portName, options, encoding){
    var sp = new SerialPort(portName ,options, true);

    sp.on('error', function(err){
        log_output(err, 'err');
        socket.emit('err', err.toString());
    });

    sp.on('open', function(){
        log_output('port opend : ' + portName);
        socket.emit('open');

        sp.on('data', function(data){
            log_output(data);
            var buffer = data.toString(encoding);
            log_output('data received:' + buffer);
            socket.emit('read', buffer);
        });

        sp.on('close',function(err){
            if(err){log_output(err, 'err');}
            log_output('port closed.');
            socket.emit('close');
        });

        socket.on('close', function(){
            sp.close();
        });

        socket.on('disconnect', function(){
            sp.close();
        });

        socket.on('write', function(data){
            sp.write(data.command, function(err, results){
                if(err){
                    log_output(err,'err')
                    socket.emit('err', err.toString());
                };
                log_output('byte written : ' + results);
            });
        });
    });
};

module.exports = sp-socket;
