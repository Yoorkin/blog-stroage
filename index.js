var http = require('http');
var fs = require('fs');
var server = http.createServer(function(req, res) {
    var html = fs.readFileSync('./index.html');
    res.write(html);
    res.end();
});
server.listen('5050', function(err) {
    if (err) {
        console.log(err);
        throw err;
    }
});