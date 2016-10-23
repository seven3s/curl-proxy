/**
 * @file:      curl 测试
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V0.0.1
 * @date:      2016-10-23 16:47:36
 */

$(function () {
    $('.httpGet').click(function () {
        http.get(function (data) {
            $('.http-content').html(data);
        });
    });
    $('.httpsGet').click(function () {
        https.get();
    });
});
var http = {
    get: function (cal) {
        $.ajax({
            url: 'http://www.163.com',
            type: 'GET',
        })
        .done(function(json) {
            console.log(json);
            cal && cal(data);
        })
        .fail(function() {
            
        });
    }
};
var https = {
    get: function () {
        $.ajax({
            url: 'https://www.baidu.com',
            type: 'GET',
        })
        .done(function(JSON) {
            console.log(json);
        })
        .fail(function() {
            
        });
    }
};