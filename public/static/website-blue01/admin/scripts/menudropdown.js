/*左侧菜单栏事件绑定*/
var menuDropDown=function () {

    var methods={
        init:function () {
            // alert('init');
            var vlist=document.querySelector(".menu_dropdown").querySelectorAll('dl');
            var array = [];
            [].forEach.call(vlist, function(v) {
                array.push(v);
            });
            array.forEach(function(v,i){
               console.log('v',v);
                v.onclick=function(e){
                    // methods.currentMenu(this);
                  /*  console.log($(this).hasClass('selected'));
                    console.log($(this).children('dt'));
                    $(this).children('dt').onclick=function(){
                        if($(this).hasClass('selected')){
                            $(this).removeClass('selected');
                            $(this).siblings().css('display','none');

                        }
                    }*/
                    // if($(this).children('dt').hasClass('selected')){
                    //     // $(this).children('dt').removeClass('selected');
                    //     // $(this).children('dd').css('display','none');
                    // }else{
                        $(this).children('dt').addClass('selected').siblings().removeClass('selected');
                        $(this).children('dd').css('display','block');
                        $(this).siblings().children('dt').removeClass('selected');
                        $(this).siblings().children('dd').css('display','none');

                    // }
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
        }
    };
    return methods;
};

(function () {
    var ctrl = menuDropDown();
    //将ctrl对象挂到window上，供页面上使用。
    window._ctrl=ctrl;
})();