// 每次调用$.get()$.post()$.ajax()的时候
// 会先调用ajaxPrefilter这个函数
// 在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3008'+options.url,
    options.complete=function(res){
        //    console.log(res);
        if(res.responseJSON.code===1 && res.responseJSON.message==='身份认证失败！' ){
            localStorage.removeItem('token')
            location.href='./login.html'
        }
        }
    
})