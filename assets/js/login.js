$(function () {

    // 点击“去注册账号”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    // 点击“去登录”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    var form = layui.form; // 导入表单模块
    var layer = layui.layer; // 导入弹出层模块
    // 自定义表单验证
    form.verify({
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $(".reg-box [name=password]").val();
            if (pwd != value) {
                return '两次输入不一致,请重新输入'
            }

        }
    })

    // 注册用户
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }
        $.post('/api/reguser', data, function (res) {

            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            console.log(res);
            layer.msg(res.message)
            $('#link_login').click();
        })
    })

    // 登录
    $("#form_login").on("submit", function (e) {
        e.preventDefault();
        $.ajax({
            method: 'post',
            url: '/api/login',
            data: $(this).serialize(),
            success(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg(res.message)
                // 将服务器返回的用户唯一表示保存到本地存储
                localStorage.setItem('token', res.token)
                // 跳转后台主页
                location.href = '/index.html'
            }
        })
    })
})
