/**
 * Created by xiezhonghai on 2016/8/10.
 */
(function($){
    $.fn.areaLayer = function(options){
        var opt = $.extend({ajaxUrl:'action.do'},options);
        var sreaLayer= {
            "areaLayerStart":function(){
                //绑定阻止默认事件
                $("body").bind('touchmove',function(e){e.preventDefault()});
                //添加节点
                var nds =
                    "<div class='area-layer'>" +
                    "<div class='area-box'>" +
                    "<div class='cfrm-pane padding10'><a href='javascript:void(0);' class='pull-left cancleBtn'>取消</a><a href='javascript:void(0);' class='pull-main yesBtn'>确定</a></div>"+
                    "<div class='area-list'>" +
                    "<div class='layer-top'></div>"+
                    "<div class='layer-btm'></div>"+
                    "<div class='area-item '>"+
                    "<div class='area-prov'><div class='area-sBox'><input type='hidden' name='province' class='provin' value='北京市' /></div></div>"+
                    "<ul cLoc='0' >"+
                    "</ul>"+
                    "</div>"+
                    "<div class='area-item'>"+
                    "<div class='area-city'><div class='area-sBox'><input type='hidden' name='city' class='city' value='北京市' /></div></div>"+
                    "<ul cLoc='0' >"+
                    "</ul>"+
                    "</div>"+
                    "<div class='area-item'>"+
                    "<div class='area-ar'><div class='area-sBox'><input type='hidden' name='ar' class='ar' value=''/></div></div>"+
                    "<ul cLoc='0' >"+
                    "</ul>"+
                    "</div>"+
                    "</div>"+
                    "</div>" +
                    "</div>";
                //初始化节点
                $(".area-layer").remove();
                $("body").append(nds);
                //数据获取
                sreaLayer.getDatas();
                //按钮点击
                sreaLayer.btnClickEvents();
                //页面的滑动
                sreaLayer.touchEvents();
            },
            "touchEvents":function(){
                //绑定元素事件
                $(".area-prov").bind('touchstart',startTouch);
                $(".area-prov").bind('touchmove',moveTouch);
                $(".area-prov").bind('touchend',endTouch);

                $(".area-city").bind('touchstart',startTouch);
                $(".area-city").bind('touchmove',moveTouch);
                $(".area-city").bind('touchend',endTouch);

                $(".area-ar").bind('touchstart',startTouch);
                $(".area-ar").bind('touchmove',moveTouch);
                $(".area-ar").bind('touchend',endTouch);

                var originY= 0,endY= 0,cLoc= 0,moveL= 0,speed=50,cTop= 0,curUlHeight= 0,
                    LineTop = 0,ulBox =0,liHeight = 0;

                //开始滑动
                function startTouch(e){
                    originY = e.originalEvent.changedTouches[0].clientY;
                    cTop = parseFloat($(".area-sBox",this).css("top"));
                    curUlHeight= parseFloat($("ul",$(this).parents(".area-item")).height());
                }

                //滑动
                function moveTouch(f){endY = f.originalEvent.changedTouches[0].clientY;
                    //符合条件允许上下滚动
                    if($("ul li",$(this).parents(".area-item")).length>1){
                        //获取滑动的位置
                        cLoc =  parseFloat($("ul",$(this).parents(".area-item")).attr("cLoc"));
                        //滑动位置
                        $("ul",$(this).parents(".area-item")).css({"top":(endY-originY)+cLoc+cTop+"px"});
                    }
                }

                //结束滑动
                function endTouch(g){
                    if($("ul li",$(this).parents(".area-item")).length>1){
                        LineTop = parseFloat($(".area-sBox",this).offset().top);
                        ulBox = parseFloat($("ul",$(this).parents(".area-item")).offset().top);
                        liHeight = parseFloat($("ul li",$(this).parents(".area-item")).height());
                        //顶部回弹
                        if(parseFloat($("ul",$(this).parents(".area-item")).css("top"))+liHeight>=cTop+30){$("ul",$(this).parents(".area-item")).stop().animate({"top":cTop+"px"},150);cLoc=0; $("ul",$(this).parents(".area-item")).attr("cLoc",cLoc);}
                        //底部回弹
                        else if(ulBox+curUlHeight-liHeight<=LineTop){
                            $("ul",$(this).parents(".area-item")).stop().animate({"top":cTop-(curUlHeight-liHeight)+"px"},speed);
                            cLoc = -(curUlHeight-liHeight);
                            $("ul",$(this).parents(".area-item")).attr("cLoc",cLoc);
                        }else{
                            moveL = g.originalEvent.changedTouches[0].clientY-originY;
                            if(Math.abs(moveL)>2){
                                //获取选中的项
                                var ix = idx(LineTop,ulBox);
                                $("ul",$(this).parents(".area-item")).stop().animate({"top":-(ix*liHeight)+"px"},200);
                                cLoc = -(ix*liHeight);
                                //存储滑动位置
                                $("ul",$(this).parents(".area-item")).attr("cLoc",cLoc);
                                //获取选中项的ID
                                $("ul li",$(this).parents(".area-item")).eq(ix).attr("data-areaID");

                                //根据滑动的区域请求响应的后台数据
                                var ev = window.event|| f, obj = $(ev.srcElement||ev.target);
                                sreaLayer.getCityArDatas($("ul li",$(this).parents(".area-item")).eq(ix).attr("data-areaID"),$("ul li",$(this).parents(".area-item")).eq(ix).attr("data-areaName"),obj.attr('class').trim());

                            }
                        }
                    }

                }

                //计算当前索引
                function  idx(a,b){
                    return Math.round((a-b)/liHeight);
                }

            },
            "btnClickEvents":function(){
                $(".cancleBtn").click(function(){
                    $(".area-layer").remove();
                });

                $(".yesBtn").click(function(){
                    //将获取的值填入输入框中
                    $(".area-layer").remove();
                });

            },
            "getDatas":function(){
                $(".area-prov").ready(function(){
                    //初始化
                    $("ul",$(".area-prov").parents(".area-item")).empty();
                    //页面加载开始请求获取数据库省份数据
                    $.ajax({
                        url:opt.ajaxUrl,
                        async:true,
                        type:"post",
                        success:function(data){
                            var str = "";
                            $.each(data,function(index,items){
                                str = "<li data-areaID='"+items.areaID+"' data-areaName='"+items.areaName+"'>"+items.areaName+"</li>";
                            });
                            $("ul",$(".area-prov").parents(".area-item")).append(str);
                        },
                        error:function(msg){

                        }

                    });
                });
            },
            "getCityArDatas":function(arID,areaName,className){
                //ajax 请求
                $.ajax({
                    url:opt.ajaxUrl,
                    data:"areaID='"+arID+"'",
                    type:"post",
                    async:true,
                    dataType:"json",
                    success:function(data){
                        var str='';
                        if(className=="area-prov"){
                            $("ul",$(".area-city").parents(".area-item")).empty();
                            $("ul",$(".area-ar").parents(".area-item")).empty();
                            $.each(data,function(index,items){
                                str = "<li data-areaID='"+items.areaID+"' data-areaName='"+items.areaName+"'>"+items.areaName+"</li>";
                            });
                            $(".provin").val(areaName);
                            $("ul",$(".area-city").parents(".area-item")).append(str);
                            //设置值
                            $("#areaSopVal").val();
                        }
                        if(className=="area-city"){
                            $("ul",$(".area-ar").parents(".area-item")).empty();
                            $.each(data,function(index,items){
                                str = "<li data-areaID='"+items.areaID+"' data-areaName='"+items.areaName+"'>"+items.areaName+"</li>";
                            });
                            $(".city").val(areaName);
                            $("ul",$(".area-city").parents(".area-item")).append(str);
                            //设置值
                            $("#citySopVal").val();
                        }

                        if(className=="area-ar"){
                            $(".ar").val(areaName);
                            //设置值
                            $("#arSopVal").val();
                        }
                    },
                    error:function(msg){

                    }
                });
            }
        }
        sreaLayer.areaLayerStart();
    }
})(jQuery)