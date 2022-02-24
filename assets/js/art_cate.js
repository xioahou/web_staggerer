$(function(){
    const layer=layui.layer
    const form=layui.form
    ArticleType()
    //*获取文章分类的列表
    function ArticleType(){
        $.ajax({
            type:'get',
            url:'/my/article/cates',
            success:function(res){
                if(res.status!==0){
                    return layer.alert(res.message, {icon: 2});
                }
                let htmlStr=template('table-tmp',res)
                $('tbody').html(htmlStr)
            }
        })
    }
    //点击添加文章
    let index=null;
    $('#additional').on('click',function(){
        index=layer.open({
            type:1,
            area:['400px','300px'],
           title:'添加文章分类',
           content:$('#add-content').html(),
          });     
    })
    //获取添加文章中的表单提交事件
    //*由于表单在script标签中我们无法向平常那样获取，可以通过代理
    $("body").on('submit','#form-style',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/article/addcates',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layer.alert(res.message, {icon: 2});
                }
                ArticleType()
                layer.alert(res.message, {icon: 1});
                //关闭页面弹出层
                layer.close(index)
            }

        })
    })
    //*点击编辑
    let shut=null
    $('tbody').on('click','#editor',function(){
        shut=layer.open({
            type:1,
            area:['400px','300px'],
           title:'编辑文章',
           content:$('#editor-form').html(),
          }); 
          let id=$(this).attr('data-id') 
          $.ajax({
              method:'get',
              url:'/my/article/cates/'+id,
              success:function(res){
                if(res.status !==0){
                    return layer.alert(res.message, {icon: 2});
                }
                form.val('form-ass',res.data)
              }
          })
    })
    //*编辑修改信息表单
    $('body').on('submit','#informazioni',function(e){
        e.preventDefault()
        $.ajax({
            method:'post',
            url:'/my/article/updatecate',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.alert(res.message, {icon: 2});
                }
                layer.alert(res.message, {icon: 1});
                console.log(res);
                ArticleType()
                layer.close(shut)
            }
        })
    })
    //*删除列表
    $('body').on('click','#btn-dele',function(){
        console.log('dd');
       let id=$(this).attr("data-id")
       layer.confirm('确认删除？', {icon: 3, title:'提示'}, function(index){
        $.ajax({
            method:'get',
            url:'/my/article/deletecate/'+id,
            success:function(res){
             if(res.status !==0){
                 return layer.alert(res.message, {icon: 2});
             }
             ArticleType()
             layer.alert('删除成功', {icon: 1});
            }
        })
      });
      
    })
})