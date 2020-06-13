var querystring = require('querystring');
var github = require('./githubAPI');
var cheerio = require('cheerio');
var iconv = require('iconv-lite');

function route(pathname, queryString, respone) {
    function homePage() {
        github.fetchFile('index.html', (buffer) => {
            var source = iconv.decode(buffer, 'gbk');
            $ = cheerio.load(source);
            github.fetchFileList('articles', (articles) => {
                articles.forEach((element, index) => {
                    $('ul.list').append('<li><a href="/articles?title=' + element['name'].split('.')[0] + '">' + element['name'].split('.')[0] + '</a></li>');
                });
                respone.write($.html());
                respone.end();
            });
        })
    }

    function articles(queryString) {
        var query = querystring.parse(queryString);
        if (query['title'] == undefined) {

        } else {
            github.fetchFile('articles/' + query['title'] + '.md', (buffer) => {
                var source = iconv.decode(buffer, 'gbk');
                respone.write(source);
                respone.end();
            })
        }

    }

    function extendPage() {

    }

    function notfound() {

    }

    if (pathname == '/') homePage();
    else if (pathname == '/articles') articles(queryString);
    // else if () extendPage();
    else notfound();
}
exports.route = route;