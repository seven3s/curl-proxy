/**
 * @File:      server启动
 * @Author:    花夏(liubiao@itoxs.com)
 * @Version:   V0.0.1
 * @Date:      2016-10-23 17:12:07
 */
var app = require('lg-server');
var static_dir = './web';
var curlProxy = require('../index.js');
app.createServer(static_dir, function (req, res) {
    // console.log(this);
    // curlProxy.request(this);
});