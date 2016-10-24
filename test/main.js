/**
 * @File:      server启动
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V0.0.1
 * @Date:      2016-10-23 17:12:07
 */
var _ = require('lodash');
var app = require('lg-server');
var static_dir = './web';
var curlProxy = require('../index.js');
var headers = {
    host: 'www.163.com'
};
app.setHeaders(headers);
app.createServer(static_dir, function (req, res) {
    var protocol = req.headers.protocol;
    if (protocol === 'https') {
        headers = {
            host: 'github.com',
            protocol: 'https'
        };
        req.headers = _.assign(req.headers, headers);
    }
    app.req = req;
    app.res = res;
    curlProxy.request(app);
});