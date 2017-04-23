/**
 * Created by xiezhonghai on 2016/6/21.
 */
$(function () {
    var nds = $(".release-img-group"), margR = 10, itemsWidth = 0, orignX = 0, endX = 0, moveLen = 0, ulLeft = 0, scrollLen = 0, curLeft = 0;
    $(".details-evaluation").ready(function () {
        $(".release-img-box").each(function (index, items) {
            itemsWidth = ($("a", this).outerWidth() * $("a", this).length) + (($("a", this).length - 1) * margR);
            $(this).css("width", itemsWidth + "px");
            nds.attr({"curLeft": "0px"});
        });
    });

    nds.bind('touchstart', function (e) {
        orignX = e.originalEvent.changedTouches[0].clientX;
    });

    nds.bind('touchmove', function (f) {
        prev(f);
        endX = f.originalEvent.changedTouches[0].clientX;
        moveLen = endX - orignX;
        $(".release-img-box", this).stop().animate({"left": (parseFloat($(this).attr("curLeft")) + moveLen) + "px"}, 10);
        ulLeft = $(".release-img-box", this).offset().left - $(this).offset().left;
    });

    nds.bind('touchend', function () {
        scrollLen = $(".release-img-box", this).width() - $(this).width();
        //修复bug 少于3个滑动问题
        if (scrollLen > 0) {
            curLeft = curLeft + moveLen;
            if (ulLeft > 0) {
                $(".release-img-box", this).stop().animate({"left": "0px"}, 200);
                curLeft = 0;
                $(this).attr("curLeft", curLeft);
            } else if (Math.abs(ulLeft) > scrollLen) {
                $(".release-img-box", this).stop().animate({"left": "-" + scrollLen + "px"}, 200);
                curLeft = (-scrollLen);
                $(this).attr("curLeft", curLeft);
            } else {
                $(".release-img-box", this).stop().animate({"left": "-" + curLeft + "px"}, 200);
                $(this).attr("curLeft", curLeft);
            }
        } else {
            if (ulLeft > 0) {
                $(".release-img-box", this).stop().animate({"left": "0px"}, 200);
                curLeft = 0;
                $(this).attr("curLeft", curLeft);
            } else {
                $(".release-img-box", this).stop().animate({"left": "0px"}, 200);
                curLeft = 0;
                $(this).attr("curLeft", curLeft);
            }
        }
    });

//获取所有的当前图片 遮罩层图片js
    var ww = 0, cIndex = 0;
    $(".release-img-box a", nds).click(function () {
        $(".cursor").empty();
        cIndex = $(this).index();
        ww = window.screen.availWidth;
        $(".imgLayer").show();
        $(".imgLayer ul").empty();
        $(this).parent().find("a").each(function (it, dt) {
            $(".imgLayer ul").append("<li><img src='" + $(this).parent().find("a").eq(it).data("src") + "'/></li>");
            if(it==0){$(".cursor").append("<a href='' class='active'></a>");}else{$(".cursor").append("<a href=''></a>");}
        });
        $(".imgLayer ul").css({"width": ww * parseInt($(this).parent().find("a").length) + "px", "left": "-" + cIndex * ww + "px"});
        $(".imgLayer ul li").css("width", (ww) + "px");
        $($(".cursor a").eq(cIndex)).addClass("active").siblings().removeClass("active");
    });

//遮罩层滑动
    $(".imgLayer").click(function () {
        $(".imgLayer").hide();
        $("body").unbind("touchmove");
    });

    $(".imgLayer ul").bind('touchstart', function (h) {
        $("body").bind('touchmove',function(b){b.preventDefault()});
        orignX = h.originalEvent.changedTouches[0].clientX;
    });

    $(".imgLayer ul").bind('touchend', function (g) {
        endX = g.originalEvent.changedTouches[0].clientX;
        $("body").unbind('touchmove');
        moveL = Math.abs(orignX - endX);
        if ((orignX - endX) < 0 && (moveL > 60)) {
            if ($(this).offset().left >= 0) {
                $(".imgLayer ul").stop().animate({"left": "0px"}, 300);
                cIndex=0;
            } else {
                $(".imgLayer ul").stop().animate({"left": "-" + (--cIndex) * ww + "px"}, 300);
            }

        } else if ((orignX - endX) > 0 && (moveL > 60)) {
            if (Math.abs($(this).offset().left) < ($(this).width() - ww)) {
                cIndex++;
                $(".imgLayer ul").stop().animate({"left": "-" + cIndex * ww + "px"}, 300);
            } else {
                cIndex=$("li",this).length-1;
                $(".imgLayer ul").stop().animate({"left": "-" + ($(this).width() - ww) + "px"}, 300);
            }
        }
        $($(".cursor a").eq(cIndex)).addClass("active").siblings().removeClass("active");
    });

});

