const form = layui.form
const layer = layui.layer
form.verify({

    nickname: [
        /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
    ],
    samePwd:function(value){
        if(value===$('[name=oldPwd]').val()){
            return '新旧密码不能相同'
        }
    },
    repwd:function(value){
        if(value!==$("[name=newPwd]").val()){
            return '两次密码不一致'
        }
    }

})
//发起请求
$('.layui-form').on('submit',function(e){
    e.preventDefault()
    $.ajax({
        type:'post',
        url:"/my/updatepwd",
        data:$(this).serialize(),
        success:function(res){
            if(res.status!==0){
                return layer.alert(res.message, {icon: 2});
            }
            layer.alert(res.message, {icon: 1});
            //重置表单
            $('.layui-form')[0].reset()
        }
    })
})
