var iconv = require('iconv-lite');
var logger = require('./logger');
var https = require('https');

function get(host, path, finish) {
    const options = {
        hostname: host,
        port: 443,
        path: path,
        method: 'GET',
        headers: {
            'User-Agent': 'LightBlog'
        }
    };
    logger.log('* request:' + options.hostname + path);
    const req = https.request(options, (res) => {
        var data = '';
        res.on('data', (d) => {
            data += d;
        });
        res.on('end', () => {
            finish(data);
        });
    });
    req.on('error', (err) => { console.log(err.message); });
    req.end();
}
var user = '';
var repo = '';
var root = '';

function fetchRepoInfo(finish) {
    get('api.github.com', '/repos/' + user + '/' + repo,
        (data) => finish(JSON.parse(iconv.decode(data, 'gbk').toString())));
}

function fetchFileList(path, finish) {
    get('api.github.com', '/repos/' + user + '/' + repo + '/contents/' + root + '/' + path,
        (data) => finish(JSON.parse(iconv.decode(data, 'gbk').toString())));
}

function fetchFileInfo(path, finish) {
    get('api.github.com', '/repos/' + user + '/' + repo + '/contents/' + root + '/' + path,
        (data) => finish(JSON.parse(iconv.decode(data, 'gbk').toString())));
}

function fetchFile(path, finish) {
    get('raw.githubusercontent.com', '/' + user + '/' + repo + '/master/' + root + '/' + path,
        (data) => finish(iconv.decode(data, 'gbk').toString()));
}

function init(github_user, github_repo, repo_root) {
    user = github_user;
    repo = github_repo;
    root = repo_root;
}
exports.init = init;
exports.fetchFileList = fetchFileList;
exports.fetchFileInfo = fetchFileInfo;
exports.fetchFile = fetchFile;