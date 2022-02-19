
//* 点击去注册切换到注册页面
$("#link_reg").on('click',function(){
    $('.login_box').hide(),
    $(".reg_box").show()
})
//* 点击登录从注册页面切换到登录页面
$('#link_login').on('click',function(){
    $('.login_box').show(),
    $(".reg_box").hide()
})
//* 自定义表单验证
let form=layui.form
form.verify({
    //定义一个叫pwd的校验规则
    pwd:[
        /^[\S]{6,12}$/
    ,'密码必须6到12位，且不能出现空格'
    ],
    checkpass:function(value){
        //value获取表单的值
        //获取密码的value值
       let resvalue= $('.reg_box [name=password]').val()
       //和确认密码框的value值对比
       if(resvalue!==value){
           return '两者密码不相等'
       }
    }
})
//*监听表单注册页面的提交事件
let layer=layui.layer
$('.reg_box').on('submit',function(e){
    //阻止默认事件
    e.preventDefault()
    //向接口发送数据
    $.post('/api/reg',   //*注册接口
        //发送数据
        {username:$('.reg_box [name=username]').val(),password:$('.reg_box [name=password]').val()},function(res){
            if(res.code!==0){
                return layer.alert(res.message, {icon: 2});
            }
            layer.alert(res.message, {icon: 1});
        }
    )
})
//*监听登录页面的提交事件
$('#login_id').on('submit',function(e){
 //阻止默认事件
 e.preventDefault()
 $.ajax({
     method:'post',
     url:"/api/login",
     data:$(this).serialize(),
     success:function(res){
        if(res.code!==0){
          return  layer.alert(res.message, {icon: 2});;
        }
        localStorage.setItem('token',res.token)
        //登录成功跳转页面
        location.href='./index.html'
     }
 })
})