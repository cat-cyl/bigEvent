
$(function () {
    // 发送请求之前执行
    // options:请求参数对象
    $.ajaxPrefilter(function (options) {
        // console.log(options);
        // 在发真正的Ajax请求之前 , 统一拼接请求根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url;

        // 统一为有权限的接口 , 设置headers请求头
        if (options.url.indexOf('/my/') !== -1)
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }


        // 当请求结束后 , 判断用户的设置访问权限
        options.complete = function (res) {
            // 当用户身份认证失败后
            if (res.responseJSON.status !== 0 || res.responseJSON.message === '身份认证失败') {
                // 1. 清空恩地存储中的token
                localStorage.removeItem('token')
                // 重新跳转登录页面
                location.href = '/login.html'
            }
        }
    })


})
