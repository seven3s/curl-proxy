/**
 * @file:      curl-proxy 入口文件
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V0.0.1
 * @date:      2016-10-19 11:10:18
 */
var util = require('./lib/util');
var exec = require('child_process').exec;
module.exports = {
    request: function(me) {
        // hack技巧，不使用koa的reponse，使用原生的
        me.respond = false;
        var curlParams = util.convertParams(me);
        var method = me.req.method;
        var headers = me.req.headers;
        var protocol = headers.referer.split(':')[0] || 'http';
        var url = protocol + '://' +  headers.host + me.req.url;
        var cmdStr = 'curl -X ' + method + ' -s -w %{http_code}' + curlParams + ' "' + url + '"';
        var contentType = me.req.headers.accept.split(',')[0] || 'application/json';
        var encoding = !(/charset/.test(contentType)) ? 'utf-8' : (function () {
            var s = contentType.search(/charset/);
            return contentType.substr(s).split('=')[1];
        })();
        exec(cmdStr, function(err, stdout, stderr) {
            var len = stdout.length;
            // 获取实际的statusCode
            var statusCode = stdout.slice(-3, len) - 0;
            console.log(util.getColorStatusCode(statusCode + ' ' +method) + ' ' + url);
            var data = stdout.slice(0, -3);
            if (err) {
                console.log('远程代理失败:' + stderr);
            } else {
                me.res.writeHead(statusCode, {
                    'Content-Type': contentType
                });
                me.res.write(data, encoding);
                me.res.end();
            }
        });
    }
};