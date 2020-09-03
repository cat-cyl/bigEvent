$(function () {
    getUserInfo();
    var layer = layui.layer;
    $('#tuichu').on('click', function () {
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 1. 清空恩地存储中的token
            localStorage.removeItem('token')
            // 重新跳转登录页面
            location.href = '/login.html'
            // 关闭confirm询问框
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象 , 在baceAPI.js中统一设置请求头
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败')
            }
            console.log(res);
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data);
        },
        // complete(res) {
        //     if (res.responseJSON.status !== 0 || res.responseJSON.message === '身份认证失败') {
        //         // 1. 清空恩地存储中的token
        //         localStorage.removeItem('token')
        //         // 重新跳转登录页面
        //         location.href = '/login.html'
        //     }
        //     console.log(res);

        // }
    })
}

// 渲染用户头像
function renderAvatar(user) {
    // 1. 获取 昵称 或 用户名
    var name = user.nickname || user.username;
    console.log(name);
    // 2. 设置欢迎的文本
    $('#welcome').html('欢迎 &nbsp;&nbsp;' + name);
    // 3. 按需渲染用户头像
    if (user.user_pic != null) {
        // 渲染图片头像并渲染 显示头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide(); //隐藏文字头像
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide(); //隐藏图片头像
        var first = name[0].toUpperCase(); // 获取用户名的第一个首字母并设置大写
        // 显示文字头像的显示内容, 并显示
        $('.text-avatar').html(first).show();
    }
}