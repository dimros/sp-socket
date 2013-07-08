# sp-socket
This program communicates with the serialport using the socket.io.
It is possible to communicate with one serialport in one socket.io name.
Therefore, use multiple socket.io in browser, it is possible to communicate with multiple serialport.
Browser's program is refer to [jquery.sp-connector.js](https://github.com/dimros/jquery.sp_connector.js.git).

## install
<pre>
 npm install sp-socket
</pre>

 Please refer to [serialport](https://github.com/voodootiki/serialport.git) install.

## How to use
<pre>
var sp_socket = require('sp-socket');
var sp = new sp_socket(listen_port, socket_name, max_socket, socket_options);
</pre>

* socket.io's listen port.

* socket.io's name

* socket_name0 ... socket_nameX  (X = max_socket - 1)

* Please refer to [socket.io](https://github.com/LearnBoost/socket.io).
  Also this program's 'log level' equal socket.io's 'log level'.

## License
 MIT
