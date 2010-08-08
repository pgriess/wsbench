This example benchmarks an echo server: the client opens a connection, sends
a message, waits for a message to be received, and then closes the
connection. For this, we use the support for sessions via `wsbench -S`.

The server requires a working installation of
[node-websocket-server](http://github.com/miksago/node-websocket-server).
