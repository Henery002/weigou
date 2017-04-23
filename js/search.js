/**
 * Created by xiezhonghai on 2016/7/19.
 */

/*首页搜索*/
var searchBox = {
    "btnClick": function (nd, snd, cnd) {
        nd.click(function () {
            $("body").css("overflowY", "hidden");
            snd.css({"width": window.screen.availWidth + "px"});
            snd.fadeIn(280).addClass("searchBox-layer-rotate");
            snd.fadeIn(280).removeClass("searchBox-layer-rotate-back");
        });
        cnd.click(function (e) {
            $(".searchKeyWords").val("");
            $("body").css("overflowY", "scroll");
            $(".item-wrap").hide();
            $(".less-msg").hide();
            $(".more-msg").hide();
            snd.fadeIn(280).addClass("searchBox-layer-rotate-back");
            snd.fadeOut(280).removeClass("searchBox-layer-rotate");
        });
    },
    "btnCancle": function (nd) {
        //TODO
    }
}


function startSearch(){
    $.ajax({
        url:"search.json",
        async:true,
        type:"post",
        success:function(data){
            $(".item-wrap").empty();
            var ary = new Array();
            $.each(data,function(index,item){
                //将后台的数据暂存储于数组中
                ary[index] = item.name;
            });
            if(ary.length==0){
                $(".less-msg").show();
                $(".item-wrap").hide();
                $(".more-msg").css("display","none");
                $(".less-msg").html("亲，暂时没有找到您想要的宝贝哦!");
            }else{
                $(".less-msg").hide();
                $(".item-wrap").show();
                $(".more-msg").css("display","block");
                for(var i=0;i<ary.length;i++){
                    $(".item-wrap").append(" <a href='' class='list-item'>中国苹果<em>iPhone 7s Plus</em>官方直营店</a>");
                }
            }
        },
        error:function(){
            $(".less-msg").show();
            $(".item-wrap").hide();
            $(".more-msg").css("display","none");
            $(".less-msg").html("很抱歉!搜索功能出现了状况，正在修复中...");
        }

    });
}


