/**
 * Created by xiezhonghai on 2016/7/14.
 */
$(function () {
    $(".underLine").stop().animate({"width": "76px", "left": $(".menu-mid a.active").offset().left + "px"}, 10, 'easeOutSine');
    $(".menu-mid a").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".underLine").stop().animate({"width": "76px", "left": $(this).offset().left + "px"}, 100, 'easeOutSine');
    });
    /*消费者权益详情遮罩层*/
    $(".customer-btn").click(function () {
        $(".customer-btn-layer").show().bind('touchmove', function (e) {
            e.preventDefault()
        });
        $(".customer-btn-pane").stop().animate({"bottom": "0"}, 400);
    });

    $(".customer-btn-layer").click(function () {
        $(".customer-btn-pane").stop().animate({"bottom": "-55rem"}, 300, function () {
            $(".customer-btn-layer").hide().unbind('touchmove');
        });
    });

    /*优惠选择*/
   /* $(".cxyx-btn").click(function () {
        $(".cxyx-btn-layer").show().bind('touchmove', function (e) {
            e.preventDefault()
        });
        $(".cxyx-btn-pane").stop().animate({"bottom": "0"}, 400);
    });

    $(".cxyx-btn-layer").click(function () {
        $(".cxyx-btn-pane").stop().animate({"bottom": "-55rem"}, 300, function () {
            $(".cxyx-btn-layer").hide().unbind('touchmove');
        });
    });*/

    /*加入购物车*/
    $(".addToCart").click(function () {
        $(".sp-btn-layer").show().bind('touchmove', function (e) {e.preventDefault();});
        $(".sp-btn-layer").show();
        $(".sp-btn-pane").stop().animate({"bottom": "0"}, 400);
    });

    //buyNow 立即购买
    $(".buyNow").click(function () {
        $(".sp-btn-layer").show().bind('touchmove', function (e) {e.preventDefault();});
        $(".sp-btn-layer").show();
        $(".sp-btn-pane").stop().animate({"bottom": "0"}, 400);
    });




    $(".sp-btn-layer").bind('touchstart',function (f) {
        var ev = window.event|| f, obj = $(ev.srcElement||ev.target);
        if(obj.attr('class')=='customer-layer sp-btn-layer')
        $(".sp-btn-pane").stop().animate({"bottom": "-55rem"}, 300, function () {$(".sp-btn-layer").hide().unbind('touchmove');} );
    });

    /*商品属性左侧导航栏点击*/
    $(".choose-table .choose-left li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });

    /*左侧导航栏处理*/

    $(".audit-btn").click(function () {
        $(".audit-layer").show().bind('touchmove', function (e) {e.preventDefault();});
        $(".audit-pane").stop().animate({"bottom": "0"}, 400);
    });

    //审核
    $(".audit-layer").ready(function () {
        var wth = window.screen.availWidth;
        $(".audit-floor ul").css("width", $(".audit-floor ul li").length * wth + "px");
        $(".audit-floor ul li").css("width", wth + "px");
    });

    $(".audit-layer").click(function () {
        $(".audit-pane").stop().animate({"bottom": "-55rem"}, 300, function () {
            $(".audit-layer").hide().unbind('touchmove');
        });
    });

    var ww = window.screen.availWidth, cIndex = 0, orignX = 0, endX = 0, moveL = 0;
    $(".audit-floor ul").bind('touchstart', function (h) {
        orignX = h.originalEvent.changedTouches[0].clientX;
    });

    $(".audit-floor ul").bind('touchend', function (g) {
        endX = g.originalEvent.changedTouches[0].clientX;
        moveL = Math.abs(orignX - endX);
        if ((orignX - endX) < 0 && (moveL > 60)) {
            if ($(this).offset().left >= 0) {
                $(".audit-floor ul").stop().animate({"left": "0px"}, 300);
            } else {
                $(".audit-floor ul").stop().animate({"left": "-" + (--cIndex) * ww + "px"}, 300);
            }

        } else if ((orignX - endX) > 0 && (moveL > 60)) {
            if (Math.abs($(this).offset().left) < ($(this).width() - ww)) {
                cIndex++;
                $(".audit-floor ul").stop().animate({"left": "-" + cIndex * ww + "px"}, 300);
            } else {
                $(".audit-floor ul").stop().animate({"left": "-" + ($(this).width() - ww) + "px"}, 300);
            }
        }
        $($(".img-cursor a").eq(cIndex % $(".audit-floor ul li").length)).addClass("active").siblings().removeClass("active");
    });

});

function blurs(GG){
    var reg = /^[0-9]+$/;
    if(!reg.test($(GG).val())){
        $(GG).val(1);
    }
}

function minus(MM){
    if(parseInt($("input",$(MM).parent()).val())>0){
        var tt = parseInt($("input",$(MM).parent()).val());
        tt-=1;
        $("input",$(MM).parent()).val(tt);
    }
}

function plus(XX){
    $(".order-pro-name",$(XX).parents(".order-cart")).html();
    var max=999;
    if(parseInt($("input",$(XX).parent()).val())<max){
        var tt = parseInt($("input",$(XX).parent()).val());
        tt+=1;
        $("input",$(XX).parent()).val(tt);
    }
}



