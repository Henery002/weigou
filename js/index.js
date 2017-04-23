/**
 * Created by xiezhonghai on 2016/7/2.
 */


$(function () {
    /*图片轮播*/
    //alt 20160727
    scrW = window.screen.availWidth;
    $(".index-nav .nav-item").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
        $(".index-nav .underLine").stop().animate({"left": $(this).index() * $(this).width() + "px"}, 150);
    });

    /*产品分类*/
    $(".index-category").css("width", 2 * scrW + "px");
    $(".index-category .pagination").css("width", scrW + "px");

    var cX = 0, lX = 0, mL = 0, uL = 0, cL = 0, idx = 0, cLen = $(".index-category .pagination").length,
        sLen = $(".index-category")[0].offsetWidth - scrW;
    $(".wrap").bind('touchstart', function (e) {
        cX = e.originalEvent.changedTouches[0].clientX;
    });
    $(".wrap").bind('touchmove', function (f) {
        lX = f.originalEvent.changedTouches[0].clientX;
        mL = lX - cX;
        uL = $(".index-category").offset().left;

        if (cLen > 1) {
            if (Math.abs(mL) >= 15) {
                $(this).addClass("preventDf");
                prev(f);
            }
            if (uL >= 0) {
                $(".index-category").stop().animate({"left": (cL + mL) / 5 + "px"}, 0);
            } else {
                if (uL < (-sLen)) {
                    $(".index-category").stop().animate({"left": (cL + mL / 5) + "px"}, 0);
                } else {
                    $(".index-category").stop().animate({"left": (cL + mL) + "px"}, 0);
                }
            }
        }

    });
    $(".wrap").bind('touchend', function () {
        if (cLen > 1) {
            $(this).removeClass("preventDf");
            if (sLen > 0) {
                cL = cL + moveLen;
                if (uL >= 0) {
                    $(".index-category").stop().animate({"left": "0px"}, 200);
                    cL = 0;
                    idx = 0;
                    $($(".wrap .category-nav li").eq(idx)).addClass("active").siblings().removeClass("active");
                } else if (Math.abs(uL) > sLen) {
                    $(".index-category").stop().animate({"left": "-" + sLen + "px"}, 200);
                    cL = -sLen;
                    idx = cLen - 1;
                    $($(".wrap .category-nav li").eq(idx)).addClass("active").siblings().removeClass("active");
                } else {
                    if (mL < 0 && (Math.abs(mL) >= 50)) {
                        $(".index-category").stop().animate({"left": "-" + sLen + "px"}, 300, "easeOutSine");
                        cL = -sLen;
                        idx++;
                        if (idx >= cLen) {
                            idx = (cLen - 1);
                        }
                        $($(".wrap .category-nav li").eq(idx % cLen)).addClass("active").siblings().removeClass("active");
                    } else if (mL > 0 && (Math.abs(mL) >= 50)) {
                        $(".index-category").stop().animate({"left": "0px"}, 300, "easeOutSine");
                        cL = 0;
                        idx--;
                        $($(".wrap .category-nav li").eq(idx % cLen)).addClass("active").siblings().removeClass("active");
                    } else if (mL < 0 && (Math.abs(mL) < 50)) {
                        $(".index-category").stop().animate({"left": "-" + (idx * scrW) + "px"}, 300, "easeOutSine");
                        cL = cL + moveLen;
                    } else if (mL > 0 && (Math.abs(mL) < 50)) {
                        cL = cL + moveLen;
                        $(".index-category").stop().animate({"left": "-" + (idx * scrW) + "px"}, 300, "easeOutSine");
                    }

                }
            }
        }

    });

    /*猜你喜欢*/
    $(".love-markup-pane .love-btn").click(function () {
        $(this).addClass("active").siblings().removeClass("active");

    });
    /*加载脚本*/
    var nds = $("body"), layNds = $(".footer-hide-loading");
    touchLoading.Loading(nds, layNds);
});

