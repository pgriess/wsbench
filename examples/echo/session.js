module.exports = function(ws) {
    ws.onopen = function() {
        ws.send('biff');
    };

    ws.onmessage = function(m) {
        console.log(m);
        ws.close();
    };
};
