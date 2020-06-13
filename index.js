var http = require('http');
var https = require('https');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');
var url = require('url');

function getmd(url, callback) {
    var quit = false;
    const req = https.request(url, (res) => {
        var data = '';
        res.on('data', (d) => {
            data += d;
        });
        res.on('end', () => {
            callback(iconv.decode(data, 'utf-8'));
            quit = true;
        });
    });
    req.on('error', (e) => {
        console.error(e);
    });
    req.end();
}

const options = {
    hostname: 'api.github.com',
    port: 443,
    path: '/repos/Yoorkin/blog-stroage/contents/article',
    method: 'GET',
    headers: {
        'User-Agent': 'aaa'
    }
};


function getArticles(callback) {
    const req = https.request(options, (res) => {
        var data = '';
        res.on('data', (d) => {
            data += d;
        });
        res.on('end', () => {
            callback(JSON.parse(iconv.decode(data, 'gbk')));
        });
    });
    // req.on('error', (e) => {
    //     console.error(e);
    // });
    req.end();
}


function loadPage(path, callback) {
    //console.log(path);
    if (path == '/') {
        var source = fs.readFileSync('index.html').toString();
        $ = cheerio.load(source);
        getArticles((articles) => {
            articles.forEach((value, index) => {
                //console.log(value);
                var name = value['name'].split('.');
                $('ul.list').append('<li><a href="/articles/' + value['name'] + '.html">' + name[0] + '</a></li>');
            });
            console.log($.html());
            callback($.html());
        });
    } else {
        callback(fs.readFileSync('404.html').toString());
    }
}

var fs = require('fs');
var server = http.createServer(function(req, res) {
    console.log(url.parse(req.url).pathname);
    loadPage(url.parse(req.url).pathname, (html) => {
        res.write(html.toString());
        res.end();
    });
});

server.listen('5051', function(err) {
    if (err) {
        console.log(err);
        throw err;
    }
});