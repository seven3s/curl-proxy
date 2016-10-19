/**
 * @file:      curl-proxy 入口文件
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V0.0.1
 * @date:      2016-10-19 11:10:18
 */
var exec = require('child_process').exec;
module.exports = {
    request: function(me) {
        // hack技巧，不使用koa的reponse，使用原生的
        me.respond = false;
        var params = me.request.body;
        var curlParams = this.convertParams(this.method2params(me));
        var method = me.req.method;
        var url = me.req.headers.referer + me.req.url;
        var cmdStr = 'curl -X ' + method + curlParams + ' "' + url + '"';
        exec(cmdStr, function(err, stdout, stderr) {
            if (err) {
                console.log('远程代理失败:' + stderr);
            } else {
                me.res.writeHead(200, {
                    'Content-Type': 'application/json'
                });
                me.res.write(stdout, 'utf-8');
                me.res.end();
            }
        });
    },

    /**
     * convertParams 将参数转换为curl格式参数
     *
     * @return {String} 返回转换后的参数
     */
    convertParams: function (Params) {
        var curlParams = '';
        for (var item in Params) {
            var tem = '"' + item + '=' + Params[item] + '"';
            curlParams += ' -F ';
            curlParams += tem;
        }
        return curlParams;
    },

    /**
     * method2params 根据method获取参数
     *
     * @param  {Object} me this对象
     *
     * @return {String}    返回参数
     */
    method2params: function (me) {
        var method = me.req.method;
        var url = me.req.url;
        var params = '';
        if (method === 'GET') {
            params = me.query;
        }else {
            params = me.request.body;
        }
        return params;
    }
};