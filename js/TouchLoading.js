/**
 * Created by xiezhonghai on 2016/6/24.
 * nds 包裹内容模块
 * lNds 显示正在加载的样式模块
 */
var touchLoading = {
    "Loading": function (nds, lNds) {
        var origY = 0, endY = 0, srollTop = 0, sw = 0, delayTime = 1000,$height=0;
        nds.css({"position":"relative"/*,"marginBottom":"4.4rem"*/});

        $("body").bind('touchstart', function (e) {
            origY = parseFloat(e.originalEvent.changedTouches[0].clientY);
        });
        $("body").bind('touchmove', function (f) {
            tempY = parseFloat(f.originalEvent.changedTouches[0].clientY);
            //滚动条的高度
            srollTop = parseFloat($(window).scrollTop()), $height = parseFloat($(document).height());
            sw = parseFloat($(window).height());
            if (((srollTop + sw) == $height) && ((origY - tempY) >0)){
                nds.stop().animate({"bottom": (origY - tempY)+"px"}, 10);
            }

            if (((srollTop + sw) >= $height) && ((endY - origY) < 0)) {
                nds.stop().animate({"bottom": (origY - tempY)+"px"}, 10);
                lNds.show();
            }
            if(srollTop>=-20){
                nds.stop().animate({"bottom": "0px"},200);
            }
        });

        $("body").bind('touchend', function (g) {
            endY = g.originalEvent.changedTouches[0].clientY;
            if (((srollTop + sw) >= $height) && ((endY - origY) < 0)) {

               // nds.stop().animate({}, 50,function(){
                    //alt 20160727
                    //$(".icon-loading",lNds).addClass("rotating");
                    setTimeout(function () {
                        lNds.hide();
                        nds.stop().animate({"bottom": "0px"},300,function(){
                            //$(".icon-loading",lNds).removeClass("rotating");
                        });
                        //ajax 异步请求
                        //TODO
                    }, delayTime);
               // });
            }
        });
    }
}