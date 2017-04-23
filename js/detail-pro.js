
/**
 * Created by xiezhonghai on 2016/7/21.
 */

/*初始化变量*/
var proScroll = {
    "touchScroll":function(nds){
        var tX= 0,eX= 0,moveL= 0,curL= 0,sL= 0,temp= 0;
        nds.bind("touchstart",function(e){ tX = e.originalEvent.changedTouches[0].clientY;sL = parseInt($(this).height())-parseInt($(".box-all",this).height());});
        nds.bind("touchmove",function(f){
            eX = f.originalEvent.changedTouches[0].clientY;
            moveL = eX - tX;
            temp = parseInt($(".box-all",this).offset().top)-parseInt($(this).offset().top);
            if(sL<0&&Math.abs(moveL)>0){
                if(moveL>0){
                    if(temp<35) $(".box-all",this).css("top",(moveL+curL)+"px");
                }
                if(moveL<0){
                    if(temp>(sL-35)) $(".box-all",this).css("top",(moveL+curL)+"px");
                }
            }
        });
        nds.bind("touchend",function(a){
            if(sL<0&&Math.abs(moveL)>0) {
                if (a.originalEvent.changedTouches[0].clientY - tX != 0) {
                    curL = curL + moveL;
                }
                if (temp > 0) {
                    $(".box-all", this).stop().animate({"top": "0px"}, 220);
                    curL = 0;
                }
                if (temp <= sL) {
                    $(".box-all", this).stop().animate({"top": sL + "px"}, 220);
                    curL = sL;
                }
            }
        });
    }
}











