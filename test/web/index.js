/**
 * @file:      curl 测试
 * @author:    花夏(liubiao@itoxs.com)
 * @version:   V0.0.1
 * @date:      2016-10-23 16:47:36
 */

$(function () {
    $('.httpGet').click(function () {
        http.get(function (data) {
            $('.content').html(data);
        });
    });
    $('.httpsGet').click(function () {
        https.get(function (data) {
            $('.content').html(data);
        });
    });
    // $('.httpsPost').click(function () {
    //     https.post(function (data) {
    //         $('.content').html(data);
    //     });
    // });
});
var http = {
    get: function (cal) {
        $.ajax({
            url: '/special/00774IMH/n_house_bj_01_201405.html',
            // url: '/a/b',
            type: 'GET',
            beforeSend: function( xhr ) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.setRequestHeader('protocol', 'http');
            }
        })
        .done(function(json) {
            cal && cal(json);
        })
        .fail(function() {
            
        });
    }
};
var https = {
    get: function (cab) {
        $.ajax({
            url: '/liubiao0810/curl-proxy/blob/master/README.md?_pjax=%23js-repo-pjax-container',
            type: 'GET',
            beforeSend: function( xhr ) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.setRequestHeader('protocol', 'https');
            }
        })
        .done(function(json) {
            cab && cab(json);
        })
        .fail(function() {
            
        });
    },
    post: function () {
        $.ajax({
            url: '/collect',
            type: 'POST',
            beforeSend: function( xhr ) {
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.setRequestHeader('protocol', 'https');
                xhr.setRequestHeader('method', 'POST');
            }
        })
        .done(function(json) {
            cab && cab(json);
        })
        .fail(function() {
            
        });
    }
};