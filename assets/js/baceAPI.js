
$(function () {
    // 发送请求之前执行
    // options:请求参数对象
    $.ajaxPrefilter(function (options) {
        console.log(option);

        // 在发真正的Ajax请求之前 , 统一拼接请求根路径
        options.url = 'http://ajax.frontend.itheima.net' + options.url;
    })
})
