$(function () {
    const layer = layui.layer
    const form = layui.form
    classification()
    // 初始化富文本编辑器
    initEditor()
    //获取选择框选项
    function classification() {
        $.ajax({
            method: 'get',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.alert(res.message, {
                        icon: 2
                    });
                }
                let htmlStr = template('article', res)
                $('[name=cate_id]').html(htmlStr)
                //laiyu ，form表单动态插入一定要指定render
                form.render()
            }
        })
    }
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)
    //点击选择粉面
    $('#select_cover').on('click', function () {
        $('#coverfile').click()
    })
    $('#coverfile').on('change', function (e) {
        var file = e.target.files[0]
        if (file.length === 0) {
            return
        }
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })
    //定义保存的方式
    let btn_save = '发布'
    $('#draft').on('click', function () {
        btn_save = '草稿'
    })
    //为表单创建formdata值
    $('#form-fast').on('submit', function (e) {
        e.preventDefault()
        //转为dom元素
        let fd = new FormData($(this)[0])
        fd.append('state', btn_save)
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                //将图像文件存储到fd中
                console.log(blob);
                fd.append('cover_img', blob)
                console.log(fd);
                //调用
                upload_pub(fd)
            })
           
    })
    //发起请求上传数据
    function upload_pub(fd) {
        $.ajax({
            method: 'post',
            url: '/my/article/add',
            data: fd,
            //注意向服务器发送formdata数据必须要加这个属性
            contentType: false,
            processData: false,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.alert(res.message, {
                        icon: 2
                    });
                }
                layer.msg('发表成功');
                location.href = '../../user/art_list.html'
            }
        })
    }
    //获取编辑数据
    modify()
    function modify(){
        let id=localStorage.getItem('res_id')
        console.log(id);
        
        $.ajax({
            method:'get',
            url:'/my/article/'+id,
            success:function(res){
                if(res.status !==0){
                    return layer.alert(res.message, {icon: 2});
                }
                // console.log(res);
                form.val('formfast',res.data)
                

            }
        })
    }
})