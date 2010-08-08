var ws = require('websocket-server');

var srv = ws.createServer();
srv.addListener('connection', function(c) {
    c.addListener('message', function(m) {
        console.log(m);
        c.write(m);
    });
});
srv.listen(8000);
