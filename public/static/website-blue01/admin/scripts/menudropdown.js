/*左侧菜单栏事件绑定*/
var menuDropDown=function () {

    var methods={
        showErrInfo: function (val) {
            var _errbox = $('<div></div>').addClass('errInfoBox');
            _errbox.html(val).appendTo($('body'));
            window.setTimeout(function () {
                _errbox.remove();
            }, 2000)
        },
        displayNavbar:function(querySelector){
            console.log('displayNavbar',$(this));
            console.log('displayNavbar',$(querySelector));
            // $(".admin-aside").toggle();
            if($(querySelector).hasClass('open')){
                $(querySelector).removeClass('open');
                $(".dislpayArrow").animate({ left:'14.215rem',opacity:1},10);
                $(".wrapper").animate({ left:'14.215rem',opacity:1},100);
                $('.admin-aside').show('slow');
            }else{
                $(querySelector).addClass('open');

                $(".dislpayArrow").animate({ left:'0',opacity:1},10);
                $(".wrapper").animate({ left:'0',opacity:1},100);
                $('.admin-aside').hide('fast');
            }

        },
        init:function () {
            // var vlist=document.querySelector(".menu_dropdown").querySelectorAll('dl');
            var vlist=$(".menu_dropdown").find('dt');
            var array = [];
            [].forEach.call(vlist, function(v) {//使用数据的foreach方法，将空数组替换成vlist；
                array.push(v);
            });
            array.forEach(function(v,i){
               console.log('v',v);
                v.onclick=function(e){
                   if( $(this).hasClass('selected')){
                          $(this).removeClass('selected');
                          $(this).siblings().css('display','none');
                    }else{
                        $(this).addClass('selected');
                        $(this).siblings().css('display','block');
                    }

                 /*   // methods.currentMenu(this);
                  /!*  console.log($(this).hasClass('selected'));
                    console.log($(this).children('dt'));
                    $(this).children('dt').onclick=function(){
                        if($(this).hasClass('selected')){
                            $(this).removeClass('selected');
                            $(this).siblings().css('display','none');

                        }
                    }*!/
                    // if($(this).children('dt').hasClass('selected')){
                    //     // $(this).children('dt').removeClass('selected');
                    //     // $(this).children('dd').css('display','none');
                    // }else{
                        $(this).children('dt').addClass('selected').siblings().removeClass('selected');
                        $(this).children('dd').css('display','block');
                        $(this).siblings().children('dt').removeClass('selected');
                        $(this).siblings().children('dd').css('display','none');

                    // }*/
                };
            })
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
            $.ajax({
                url: '/api/car/info',
                type: 'POST',
                data: {url:'/resource/cities/online'},
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
    var ctrl = menuDropDown();
    //将ctrl对象挂到window上，供页面上使用。
    window._ctrl=ctrl;
})();