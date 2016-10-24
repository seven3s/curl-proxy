# curl-proxy
	解决代理转发post请求失败 （0.0.6测试版，本地需支持curl命令）

###版本说明
> 0.0.5: 修复返回实际statusCode  bug
> 
> 0.0.6: 增加测试

### 概述：
> 1.在前后端分离情况下使用http-proxy做请求转发非get请求失败

> 2.目前所有代理模块都存在这一问题，所以换一个思路：使用curl做请求，最后将得到的数据用原生res.white回去即可

#### 1.开始：

	```
	npm install curl-proxy
	```
#### 2.引入调用：

	```
	var curlProxy = require('curl-proxy');
	// 如果node webserver没有设置必须先设置
	curlProxy.lodashHeaders({
        host: '10.95.105.135:8030',
        protocol: 'http' // 默认http，可不用设置
    });
	curlProxy.request(this);
	// 传入this是原生node websever对象
	```
	
###关于windows不支持curl解决方案：
> 1.下载[curl工具](https://pan.baidu.com/s/1mhH0SGC)；

> 2.下载完成后将curl文件夹放在d:\盘下；

> 3.右键单击“我的电脑”——“属性”——“高级”——“环境变量”——“系统变量”——“Path”——“编辑”——加入“;D:\curl;”(注意分号); D:\curl换成你的curl路径也可以)——“确定”加入到系统环境变量后可在命令提示符内直接运行

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
		
>5.如果想要支持https那么就需要安装ssl版本的了，请按照以下方案：
	
~~1).下载[curl-ssl工具](https://pan.baidu.com/s/1o8vsyjK)；

~~2).下载完成后将curl文件夹放在d:\盘下；

~~3).右键单击“我的电脑”——“属性”——“高级”——“环境变量”——“系统变量”——“Path”——“编辑”——加入“;D:\curl;”(注意分号); D:\curl换成你的curl路径也可以)—

~~4).“确定”加入到系统环境变量后,将文件夹中的【Win32OpenSSL_Light-1_1_0b.exe】安装；

~~5).在命令提示符内直接运行
		
		```
		curl -I -k https://www.baidu.com
		
		如果出现：
		HTTP/1.1 200 OK
		Server: bfe/1.0.8.18
		Date: Sat, 22 Oct 2016 06:53:58 GMT
		Content-Type: text/html
		Content-Length: 277
		Connection: keep-alive
		Last-Modified: Mon, 13 Jun 2016 02:50:53 GMT
		ETag: "575e1f8d-115"
		Cache-Control: private, no-cache, no-store, proxy-revalidate, no-transform
		Pragma: no-cache
		Accept-Ranges: bytes
		及说明现在已经支持curl发起https命令了，可以使用本工具发起请求代理了

		```
		
>6.如果是win_64系统请下[curl-ssl_64](https://pan.baidu.com/s/1eS6xZcY)

>7.注意，如果失效可能是：需要安装这个

安装 [Visual C++ 2008 Redistributable Package](http://www.microsoft.com/en-us/download/details.aspx?id=15336)

安装 [Visual C++ 2010 Redistributable Package](http://www.microsoft.com/en-us/download/details.aspx?id=14632)