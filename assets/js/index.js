$(function () {
    getuserInfo()
})
//*获取用户的基本信息
function getuserInfo() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        //在bassApi文件中传入token值验证用户信息
        success: function (res) {
            // console.log(res);
            // resUserInfo(res)
            if (res.status !== 0) {
                layer.alert(res.message, {
                    icon: 1
                })
            } 
            resUserInfo(res)
            console.log(res);
        },
        // *不论成功还是失败都会调用baseApi中complete
       
       
    })
}
//点击退出
$('#quit').on('click', function () {
    layer.confirm('是否退出', {
        icon: 3,
        title: '提示'
    }, function (index) {
        //退出后要清除token
        localStorage.removeItem('token')
        location.href = './login.html'

        layer.close(index);
    });
})
//封装用户返回的信息
function resUserInfo(user) {
    let name =user.data.nickname || user.data.username
    let first = name[0].toUpperCase()
    $('#welcome').html('欢迎  ' + name)
    if (user.data.user_pic !== null) {
        $('.text-avatar').hide()
        $('.layui-nav-img').show().attr('src', user.data.user_pic)
    } else {
        $('.text-avatar').show().html(first)
        $('.layui-nav-img').hide()

    }
}
//无论成功还是失败都会调用complete
// complete: function(){

// }