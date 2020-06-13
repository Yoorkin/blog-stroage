var http = require('http');
var https = require('https');
var url = require('url')

function start(route, logger, port) {
    function onRequest(request, respone) {
        var pathname = url.parse(request.url).pathname;
        var query = url.parse(request.url).query;
        logger.log("Request for '" + pathname + "' received.");
        route(pathname, query, respone);
    }
    var server = http.createServer(onRequest);
    server.on('error', (err) => { console.log(err.message); });
    server.listen(port);
    logger.log("Server has started at " + port + ".");
}

exports.start = start;