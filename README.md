# curl-proxy
	解决代理转发post请求失败 （0.0.5测试版，本地需支持curl命令）

###关于windows不支持curl解决办法：
> 1.下载[curl工具](https://pan.baidu.com/s/1mhH0SGC)；
> 2.下载完成后将curl文件夹放在d:\盘下；
> 3.右键单击“我的电脑”——“属性”——“高级”——“环境变量”——“系统变量”——“Path”——“编辑”——加入“;D:\curl;”(注意分号);D:\curl换成你的curl路径也可以)——“确定”加入到系统环境变量后可在命令提示符内直接运行如
> 4.测试：
		
		```
		curl -I http://www.163.com
		
		出现：
		HTTP/1.1 200 OK
		Date: Sat, 22 Oct 2016 06:25:01 GMT
		Server: openresty
		Content-Type: text/html; charset=GBK
		Vary: Accept-Encoding,User-Agent,Accept
		Expires: Sat, 22 Oct 2016 06:26:21 GMT
		Cache-Control: max-age=80
		X-Via: 1.1 hbtj81:0 (Cdn Cache Server V2.0), 1.1 		chd33:6 (Cdn Cache Server V2.0), 1.1 bjdxtck20:2 		(Cdn Cache Server V2.0)
		Connection: keep-alive
		及说明现在已经支持curl命令了，可以使用本工具发起请求代理了
		```
>5.如果想要支持https那么就需要安装ssl版本的了，请自行谷歌~~		

###版本说明
> 0.0.5: 修复返回实际statusCode  bug

### 概述：
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
