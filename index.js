var http = require('http');
var https = require('https');
var iconv = require('iconv-lite');
var fs = require('fs');
var cheerio = require('cheerio');
var storgePath = './';
var mdPath = 'https://github.com/Yoorkin/blog-stroage/tree/master/article';
var server = http.createServer(function(req, ret) {
    $ = cheerio.load(fs.readFileSync(storgePath + 'index.html').toString());
    var sourceString = '';
    var req = https.request(mdPath, function(res) {
        res.on('data', function(chunk) {
            sourceString += chunk; //iconv.decode(chunk, 'gbk');
        });
        res.on('end', function() {
            console.log("end");
            var source = cheerio.load(sourceString);
            source('a.js-navigation-open ').each(function(i, e) {
                console.log($(this).html());
            });
            ret.write($.html());
            ret.end();
        });
    }).on('error', function(err) { console.log(err.message); });
    req.end();
});
server.listen('5050', function(err) {
    if (err) {
        console.log(err);
        throw err;
    }
});