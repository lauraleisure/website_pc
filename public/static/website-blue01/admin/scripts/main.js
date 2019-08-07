/*左侧菜单栏事件绑定*/
var main=function () {

    var methods={
        showErrInfo: function (val) {
            var _errbox = $('<div></div>').addClass('errInfoBox');
            _errbox.html(val).appendTo($('body'));
            window.setTimeout(function () {
                _errbox.remove();
            }, 2000);
        },
        displayNavbar:function(querySelector){
            // $(".admin-aside").toggle();
            if($(querySelector).hasClass('open')){
                $(querySelector).removeClass('open');
                $(".dislpayArrow").animate({ left:'14.215rem',opacity:1},10,'linear');
                $(".wrapper").animate({ left:'14.215rem',opacity:1},100);
                $('.admin-aside').show();
            }else{
                $(querySelector).addClass('open');
                $(".dislpayArrow").animate({ left:'0',opacity:1},10,'linear');
                $(".wrapper").animate({ left:'0',opacity:1},100);
                $('.admin-aside').hide();
            }

        },
        init:function () {
            methods.initMenuBar();
            methods.initSubMenu();
        },
        initMenuBar:function(){
            // var vlist=document.querySelector(".menu_dropdown").querySelectorAll('dl');
            var vlist=$(".menu_dropdown").find('dt');
            var array = [];
            [].forEach.call(vlist, function(v) {//使用数据的foreach方法，将空数组替换成vlist；
                array.push(v);
            });
            array.forEach(function(v,i){
                v.onclick=function(e){
                    if( $(this).hasClass('selected')){
                        $(this).removeClass('selected');
                        $(this).siblings().css('display','none');
                    }else{
                        $(this).addClass('selected');
                        $(this).siblings().css('display','block');
                        $(this).parent().siblings().find('dt').removeClass('selected');
                        $(this).parent().siblings().find('dd').css('display','none');
                        $('.crumb-part').find('.level1 .txt-title').text($(this).find('.title').text());
                        $('.crumb-part').find('.level2 .txt-title').text($(this).find('.title').text());
                    }
                };
            });
        },
        initSubMenu:function(){
            var vlist=$(".menu_dropdown").find('dd li');
            var array = [];
            [].forEach.call(vlist, function(v) {//使用数据的foreach方法，将空数组替换成vlist；
                array.push(v);
            });
            array.forEach(function(v,i){
                console.log('submenu v',v);
                v.onclick=function(e){
                    $(this).addClass('current').siblings().removeClass('current');
                    $(this).parents().siblings().find('li').removeClass('current');
                    $('.crumb-part').find('.level2 .txt-title').text($(this).find('a').text());
                };
            });
        },
        imgUpload:function(e){
            var files = document.getElementById("photo").files;
            console.log('imgUpload',files);
            var r = /^image/i;
            var r2 = /.jpeg|.png|.gif|.jpg/i;
            var file =files[0];
            console.log('file',file);
            var newImgs = [];
            if (!(!(file.name || "").match(r2) && !(file.name || "").match(r))) {
                var f = new FileReader(); //本地预览
                f.readAsDataURL(file);
                var that = this;
                f.onload = function(e) {
                    var source = e.target.result;
                    $('.upload').before(" <div class='preview-img'><img src='"+source+"'  onclick='_ctrl.viewFullSizeImg(this)' /><span class='img-del' onclick='_ctrl.removeImg(this)'></span></div>");
                }
               /* return new Promise((resolve, reject) => {
                    f.onload = function(e) {
                        var source = e.target.result;
                        resolve({ base64: source, file: file });
                    }
                })*/
            } else {
                return new Promise((resolve, reject) => {
                    reject({ message: '请选择正确格式的文件' });
                })
            }

        },
        removeImg:function(e){

            $(e).parent().remove();
        },
        viewFullSizeImg:function(e){
           var index= layer.open({
                type: 1,
                title: false, //不显示标题
                skin: 'layui-layer-demo', //样式类名
                closeBtn: 1, //显示关闭按钮
                area: ['800px', '600px'],
                anim: 2,
                shadeClose: true, //开启遮罩关闭
                content: '<div class=\"full-size-img\">'+ $(e).parent().html()+'</div>'
            });
            // layer.full(index);
        },
        delData:function(e){
            console.log(e);
            console.log('parent', $(e).parent());
            console.log('parents', $(e).parents());
            console.log('parents', $(e).parents().find('tr'));
            // var layerIndex = layer.load(0, {shade: [0.4, '#000'],});
            //询问框
          var  layerIndex= layer.confirm('是否确认删除？', {
                btn: ['确认','取消'] //按钮
            }, function(){
                layer.msg('删除成功！');
                $(e).parent().parent().parent().remove();
              /*  layer.msg('删除成功！');
                layer.close(layerIndex);*/

            }, function(){
                layer.close(layerIndex);

            });
        },
        currentMenu:function (querySelector) {
            var vlist=document.querySelector(querySelector).querySelectorAll('li');
            var array = [];
            [].forEach.call(vlist, function(v) {
                array.push(v);
            });
            array.forEach(function(v,i){
                v.onclick=function(e){
                    alert($(this));
                };
            })
        },
        getHomeData:function () {/*后台系统首页信息*/
            var postData={}
            $.ajax({
                url: '/api/car/info',
                type: 'POST',
                data: postData,
                success:function (result) {

                },
                fail:function (err) {
                    console.log(err);
                    methods.showErrInfo(err.responseJSON.message);
                }
            });
        },
        getNews:function () {/*咨询管理*/

        },
        getProductsList:function () {/*产品管理*/

        },
        getBrandsList:function () {/*品牌管理*/

        },
        getCategoryList:function () {/*分类管理*/

        },
        getCommentsList:function () {/*评论管理*/

        },
        getMemberList:function () {/*会员管理-会员列表*/

        },
        getAdministrator:function () {/*管理员管理*/

        },
    };
    return methods;
};

(function () {
    var ctrl = main();
    //将ctrl对象挂到window上，供页面上使用。
    window._ctrl=ctrl;
})();