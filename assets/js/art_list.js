$(function () {
    const layer = layui.layer
    const form = layui.form
    const laypage = layui.laypage
    //模板过滤器
    template.defaults.imports.dataFormat = function (dat) {
        let dd = new Date(dat)
        let y = dd.getFullYear()
        let m = dd.getMonth() + 1
        m = m < 10 ? '0' + m : m
        let d = dd.getDate()
        d = d < 10 ? '0' + d : d

        let hh = dd.getHours()
        hh = hh < 10 ? "0" + hh : hh
        let mm = dd.getMinutes()
        mm = mm < 10 ? "0" + mm : mm
        let ss = dd.getSeconds()
        ss = ss < 10 ? "0" + ss : ss
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }
    let q = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类ID
        state: '', //文章的状态
    }
    init_list()
    //获取文章列表中列表数据
    function init_list() {
        $.ajax({
            method: 'get',
            url: '/my/article/list',
            data: q,
            success: function (res) {
                if (res.status !== 0) {
                    return layer.alert(res.message, {
                        icon: 2
                    });
                }
                let htmlStr = template('article_ui', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }
    //获取文章列表选择框中数据
    $.ajax({
        methon: 'get',
        url: '/my/article/cates',
        success: function (res) {
            if (res.status !== 0) {
                return layer.alert(res.message, {
                    icon: 2
                });
            }
            htmlStr = template('select-data', res)
            $('select[name=cate_id]').html(htmlStr)
            form.render()
        }
    })
    //获取选择框中数据
    $('#form-date').on('submit', function (e) {
        e.preventDefault()
        let cate_id = $('select[name=cate_id]').val()
        let state = $('select[name=state]').val()
        q.cate_id = cate_id
        q.state = state
        init_list()
    })
    //渲染分页
    function renderPage(num) {
        laypage.render({
            elem: 'sorter',
            count: num, //数据总条数
            limit: q.pagesize, //每页默认显示几条数据
            curr: q.pagenum, //默认显示第几页数据
            layout: ['count', 'limit', 'prev', 'page', 'skip', 'next'],
            limits: [2, 5, 10, 15, 20],
            jump: function (obj, first) {
                //obj包含了当前分页的所有参数，比如：
                q.pagenum = obj.curr
                q.pagesize = obj.limit
                //为了防止循环，判断first的值是不是true
                if (!first) {
                    init_list()
                }
            }
        })
    }
    //点击删除
    $('tbody').on('click', ('.btn-delet'), function () {
        let id = $(this).attr("data-id")
        let len = $('.btn-delet').length
        console.log(len);
        layer.confirm('确认删除', {
            icon: 3,
            title: '删除'
        }, function (index) {
            $.ajax({
                method: 'get',
                url: '/my/article/delete/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.alert(res.message, {
                            icon: 2
                        });
                    }
                    layer.alert(res.message, {
                        icon: 1
                    });
                    init_list()
                    if (len == 1) {
                        q.pagenum = q.pagenum == 1 ? 1 : q.pagenum - 1
                    }
                    init_list()
                }
            })
            layer.close(index);
        });
    })
    //点击编辑
    $('body').on("click",'.btn-cceditor',function(){
        let id=$(this).attr('data-id')
        // console.log(id);
        $.ajax({
            method:'get',
            url:'/my/article/'+id,
            success:function(res){
                if(res.status!==0){
                    return layer.alert(res.message, {icon: 2});
                }
                // console.log(res);
                let id=res.data.Id
                // console.log(id);
                // window.parent.modify(id)
                localStorage.setItem('res_id',id)
                location.href='../../user/art_pub.html'
            }
        })
    })
})