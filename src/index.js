var server = require('./server');
var router = require('./router');
var logger = require('./logger');
var github = require('./githubAPI');
github.init('Yoorkin', 'blog-stroage', 'storage');
server.start(router.route, logger, 5051);
// var http = require('http ');
// var https = require('https');
// var cheerio = require('cheerio');
// var iconv = require('iconv-lite');
// var url = require('url');
// var downloadHost = '';
// var storageHost = 'api.github.com';
// var storageRoot = '/repos/Yoorkin/blog-stroage/contents/storage';

// function getmd(url, callback) {
//     const req = https.request(url, (res) => {
//         var data = '';
//         res.on('data', (d) => {
//             data += d;
//         });
//         res.on('end', () => {
//             callback(iconv.decode(data, 'utf-8'));
//         });
//     });
//     req.on('error', (e) => {
//         console.error(e);
//     });
//     req.end();
// }

// function getRemoteStorage(hostname, path, callback) {
//     const options = {
//         hostname: hostname,
//         port: 443,
//         path: path,
//         method: 'GET',
//         headers: {
//             'User-Agent': 'LightBlog'
//         }
//     };
//     console.log('request:' + options.hostname + path);
//     const req = https.request(options, (res) => {
//         var data = '';
//         res.on('data', (d) => {
//             data += d;
//         });
//         res.on('end', () => {
//             callback(data);
//         });
//     });
//     req.end();
// }


// function loadStorage(path, callback) {
//     var paths = path.split('/');
//     if (path == '/') { // load home page
//         var source = fs.readFileSync('./storage/index.html').toString();
//         $ = cheerio.load(source);
//         getRemoteStorage(storageRoot + '/articles', (data) => {
//             var articles = JSON.parse(iconv.decode(data, 'gbk'));
//             articles.forEach((value, index) => {
//                 //console.log(value);
//                 var name = value['name'].split('.');
//                 $('ul.list').append('<li><a href="/articles/' + value['name'] + '">' + name[0] + '</a></li>');
//             });
//             console.log($.html());
//             callback($.html().toString());
//         });
//     } else {
//         getRemoteStorage(storageRoot + path, (data) => {
//             var info = JSON.parse(iconv.decode(data, 'gbk'));
//             if (info['message'] == 'Not Found') getRemoteStorage(storageRoot + '/404.html', (html) => callback(html.toString()));
//             else {
//                 getRemoteStorage(info['download_url'], callback);
//             }
//         })
//     }
// }

// var fs = require('fs');
// var server = http.createServer(function(req, res) {
//     console.log(url.parse(req.url).pathname);
//     loadStorage(url.parse(req.url).pathname, (object) => {
//         res.write(object);
//         res.end();
//     });
// });

// server.listen('5051', function(err) {
//     if (err) {
//         console.log(err);
//         throw err;
//     }
// });