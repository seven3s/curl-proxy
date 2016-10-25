/**
 * @file:      工具包
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V0.0.1
 * @date:      2016-10-22 15:41:03
 */
var chalk = require('chalk');
module.exports = {
    /**
     * convertParams 将参数转换为curl格式参数
     *
     * @return {String} 返回转换后的参数
     */
    convertParams: function (me) {
        var Params = this.method2params(me);
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
            params = me.request && me.request.body;
        }
        return params;
    },

    /**
     * getColorStatusCode 根据状态码返回有颜色的状态码
     *
     * @param  {Number} statusCode 入参是1~6打头的状体码
     *
     * @return {String}   返回添加颜色后的状态码
     */
    getColorStatusCode: function (statusCode) {
        statusCode += ''; 
        var statusCode0 = statusCode[0];
        var colorStatusCode = chalk.green(statusCode);
        switch (statusCode0) {
            case '1':
                colorStatusCode = chalk.blue(statusCode);
            break;
            case '2':
                colorStatusCode = chalk.green(statusCode);
            break;
            case '3':
                colorStatusCode = chalk.yellow(statusCode);
            break;
            case '4':
                colorStatusCode = chalk.red(statusCode);
            break;
            case '5':
                colorStatusCode = chalk.red(statusCode);
            break;
            case '6':
                colorStatusCode = chalk.red(statusCode);
            break;
        }
        return colorStatusCode;
    }
};