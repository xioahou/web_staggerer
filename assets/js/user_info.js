//jquery入口函数
const form=layui.form
const layer=layui.layer
form.verify({
    nickname: function(value){ //value：表单的值、item：表单的DOM对象
        if(value.length>6){
          return '用户昵称必须小于六个字符';
        }
    }
})
initUserInfo()
//
function initUserInfo(){
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        //在bassApi中传入token值验证用户信息
        success:function(res){
          if(res.status!==0){
              return layer.msg('用户验证失败', {icon: 2});
          }
            //调用form。val快速为表单赋值
            console.log(res);
            form.val('forminfo',res.data)
            layer.msg('用户验证成功', {icon: 1});
        }
    })
}

// //重置表单
$('#reset').on('click',function(e){
    e.preventDefault()
//     //将表单重置为第一次的信息
    initUserInfo()
})
// 获取表单用户信息
$('.layui-form').on('submit',function(e){
    e.preventDefault()
   $.ajax({
       type:'post',
       url:'/my/userinfo',
       data:$(this).serialize(),
       success:function(res){
           if(res.status !==0){
               return layer.msg('更新用户失败')
           }
           layer.msg('更新用户成功')
           window.parent.getuserInfo() 
       }
   })

})
