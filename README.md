`wsbench` is a benchmarking tool for Web Socket servers. It requires a working
installation of [NodeJS](http://nodejs.org).

## Usage

At its simplest, `wsbench` can be invoked with a Web Socket URL pointing to the
server. For example, this opens and closes 100 connections in serial to the
server running on localhost, port 8080.

    % wsbench ws://localhost:8080

A parallel, rate-driven model is available using the `-r` option. For example,
the following opens and closes 10 connections per second and runs indefinitely.

    % wsbench -r 10 ws://localhost:8080

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
      -p, --protocol PROTO     set the Web Socket protocol to use (default: empty)
      -r, --rate NUMBER        number of connections per second (default: 0)
