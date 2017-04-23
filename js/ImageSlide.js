/**
 * Created by xiezhonghai on 2016/7/8.
 */

/*首页图片滑动组件*/
var index = 0, moveLen = 0, slideLen = 50,cleft = 0,//默认手指屏幕滑动的距离
    delayTime = 3000, len = 0, timer, origX, lastX;
    scrW = window.screen.availWidth;
    window.onload = function () {
    len = $(".slideItems a").length;
    $(".slideItems").css({"width": len * scrW * 2 + "px", "left": "0"});
    $(".slideItems").append($(".slideItems").html());
    $(".slideItems a").css("width", scrW + "px");
}

function slide() {
    $($(".items-cursor li").eq(index)).addClass("active").siblings().removeClass("active");
    $(".slideItems").stop().animate({"left": "-" + (index * scrW) + "px"}, 400, function () {
        if (index >= len) {
            index = 0;
            $(".slideItems").css("left", "0px");
            $($(".items-cursor li").eq(index)).addClass("active").siblings().removeClass("active");
        }
    });
}

function startSlide() {
    index++;
    slide();
}

timer = setInterval("startSlide()", delayTime);

$("#slideBox").bind('touchstart',function(e){
    clearInterval(timer);
    origX = e.originalEvent.changedTouches[0].clientX;
});

$("#slideBox").bind('touchmove',function(t){
    prev(t);
    lastX = t.originalEvent.changedTouches[0].clientX;
    moveLen = lastX-origX;
    if(moveLen>0){
        if(parseInt($(".slideItems").css("left"))==0){
            index=len;
            $(".slideItems").css("left","-"+index*scrW+"px");
        }
        $(".slideItems").css("left",(-index*scrW)+moveLen+"px");
    }
    if(moveLen<0) {
        if (index >= len) {
            index = 0;
            $(".slideItems").css("left", "0px");
            $($(".items-cursor li").eq(index)).addClass("active").siblings().removeClass("active");
        }
        $(".slideItems").css("left",(-index*scrW)+moveLen+"px");
    }
});

$("#slideBox").bind('touchend',function(){
    if(moveLen>0&&Math.abs(moveLen)>=scrW/3){
        index--;
        slide();
    }else{
        slide();
    }
    if(moveLen<0&&Math.abs(moveLen)>=scrW/3){
        index++;
        slide();
    }else{
        slide();
    }
    moveLen=0;
    timer = setInterval("startSlide()", delayTime);
});

/*加载*/
var dTime = 2000;
setTimeout("hide()", dTime);
function hide() {
    $("#layer").stop().animate({"opacity": "0"}, 300, function () {
        $("#layer").hide()
    });
}
