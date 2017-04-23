/**
 * Created by xiezhonghai on 2016/8/12.
 */
//下拉选择
$(function(){
    $(".category-nav .category-nav-item span").click(function(){
        $(".list-layer").show();
        $(".category-list-item-sub",$(this).parent()).show();
        $(".category-list-item-sub",$(this).parent().siblings(".category-nav-item")).hide();
        $("body").bind('click',function(f){
            var ev = window.event|| f, obj = $(ev.srcElement||ev.target);
            if(obj.attr('class')=='list-layer'){
                $(".list-layer").hide();
                $(".category-list-item-sub").hide();
                $("body").unbind('click');
            }
        });

    });

    $(".category-nav-item .category-list-item-sub li").click(function(){
        $(".list-layer").css("display","none");
        $(this).parent().hide();
    });

    $(".category-nav-item .category-list-item-sub").bind('touchmove',function(evt){
        evt.stopPropagation()||(evt.cancelBubble=true);
    });


});