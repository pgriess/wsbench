`wsbench` is a scriptable benchmarking tool for Web Socket servers.

An installation of [NodeJS](http://nodejs.org) is required, but there are no
other external dependencies. See [Benchmarking Web Socket servers with
wsbench](http://blog.std.in/2010/09/24/benchmarking-web-socket-servers/) for
more background on the motivation and intended usage of this tool.

## Basic usage

At its simplest, `wsbench` can be invoked with a Web Socket URL pointing to the
server. For example, this opens and closes 100 connections in serial to the
server running on localhost, port 8080. No messages are sent down the
connections.

    % wsbench ws://localhost:8080

A parallel, rate-driven model is available using the `-r` option. For example,
the following opens and closes 10 connections per second and runs indefinitely.
This uses `-c NNN` to specify termination after `NNN` connections, with 0
indicating no limit.

    % wsbench -r 10 ws://localhost:8080

We can also send messages over each connection using the `-m NNN` option to
indicate how many messages to send. The `-s NNN` option can be used to set the
size of each message in bytes. When operating in this mode, the websocket
connection is guaranteed to remain open until all messages have been
transmitted.

## Session scripting

The `wsbench` tool supports execution of arbitrary JavaScript code to drive the
interaction over open connections (e.g. to send and receive messages) using the
`-S FILE` option. This allows testing of rich, application-specific behavior.
As a trivial example, the following file will send a `Hello` message for the
first 10 connections and `world!` for each connection after and then close the
connection. Note that the session function is invoked once for each web socket
opened, so we keep our counter in the module scope.

    var cnt = 0;
    
    module.exports = function(ws) {
        ws.onopen = function() {
            ws.send((++cnt <= 10) ? 'Hello' : 'world!');
            ws.close();
        };
    };

A more involved example is available in the `examples/echo/`
[directory](http://github.com/pgriess/wsbench/tree/master/examples/echo/).

Finally, the session logic can use any NodeJS module installed in the
system. Significantly, this provides access to the built-in HTTP stack;
constructing heterogeneous workloads consisting of a mix of Web Socket and
HTTP requests is trivial.

## Full usage

The complete usage is

    usage: wsbench [options] <url>
    
    Kick off a benchmarking run against the given ws:// URL.
    
    We can execute our workload in one of two ways: serially, wherein each
    connection is closed before the next is initiated; or in parallel, wherein
    a desired rate is specified and connections initiated to meet this rate,
    independent of the state of other connections. Serial execution is the
    default, and parallel execution can be specified using the -r <rate>
    option. Parallel execution is bounded by the total number of connections
    to be made, specified by the -c option.
    
    Available options:
      -c, --num-conns NUMBER   number of connections to open (default: 100)
      -h, --help               display this help
      -m, --num-msgs NUMBER    number of messages per connection (dfeault: 0)
      -p, --protocol PROTO     set the Web Socket protocol to use (default: empty)
      -r, --rate NUMBER        number of connections per second (default: 0)
      -s, --msg-size NUMBER    size of messages to send, in bytes (default: 32)
      -S, --session FILE       file to use for session logic (default: None)
