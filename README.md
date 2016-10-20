# curl-proxy
	解决代理转发post请求失败 （0.0.3测试版，本地需支持curl命令）
### 诗集概述：
> 1.在前后端分离情况下使用http-proxy做请求转发非get请求失败

> 2.目前所有代理模块都存在这一问题，所以换一个思路：使用curl做请求，最后将得到的数据用原生res.white回去即可

#### 1.开始：

	```
	npm install curl-proxy
	```
#### 2.引入：

	```
	var curlProxy = require('curl-proxy');
	curlProxy.request(this);
	// 传入this是原生对象
	```
#### 3.注意事项：

	```
	// 此句必须添加否则获取不到实际请求地址
	this.req.headers = _.assign(this.req.headers, config.remote.headers);
    var method = this.req.method;
    if (method === 'POST') {
        var curlProxy = require('curl-proxy');
        curlProxy.request(this);
    }else {
        if (this.req.headers['x-requested-with'] !== 'XMLHttpRequest'
            || /\.html$/g.test(this.req.url)) {
            return yield next;
        }
        // hack技巧，不使用koa的reponse，使用原生的
        this.respond = false;
        gutil.log('URL:', base + this.req.url);
        proxy.web(this.req, this.res, {
            target: base
        });
    }
	```
#### 4.关于配置：

	```
	remote: {
        path: 'http://10.95.106.155:8030', // 袁陵开发机
        // path: 'http://10.95.105.135:8030', // 刘大伟开发机
        // path: 'http://172.24.30.171:8888',
        headers: {
            cookie: 'cookie_user_key=xuepeng01',
            // 请配置此项，以获取实际地址
            referer: 'http://10.95.106.155:8030'
        }
    }
	```
