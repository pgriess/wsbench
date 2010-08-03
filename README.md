`wsbench` is a benchmarking tool for Web Socket servers. It requires a working
installation of [NodeJS](http://nodejs.org).

## Usage

At its simplest, `wsbench` can be invoked with a Web Socket URL pointing to the
server. For example, this opens and closes 100 connections to the server
running on localhost, port 8080.

    % wsbench -c 100 ws://localhost:8080

The complete usage is

    usage: wsbench [options] <url>
    
    Kick off a benchmarking run against the given ws:// URL.
    
    Available options:
      -c, --num-conns NUMBER   number of connections to open (default: 100)
      -h, --help               display this help
      -p, --protocol PROTO     set the Web Socket protocol to use (default: empty)
