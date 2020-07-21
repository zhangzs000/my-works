$(function(){
    var box=$(".box");
    var copy=$(".copy");
    var canvas=$("canvas");
    var cobj=canvas[0].getContext("2d")
    canvas.attr({
        width:copy.width(),
        height:copy.height()
    })


    $(".hasson").hover(function(){
        $(this).find(".son").finish()
        $(this).find(".son").animate({width:"300px"},300)
    },function(){
        $(this).find(".son").finish()
        $(this).find(".son").animate({width:"0px"},300)
    })
    $(".son").delegate("li","click",function(){
        var ss= $(this).parent();
        //console.log(ss)
        ss.animate({width:"0px"},300)
    })

    var obj=new shape(copy[0],canvas[0],cobj)

    var shapes=$(".parent:eq(1)").find(".son li");
    shapes.click(function(){
        obj.shapes=$(this).attr("data-rol");
        obj.draw();
    })

    var type=$(".parent:eq(2)").find(".son li");
    type.click(function(){
        obj.type=$(this).attr("data-rol");
        obj.draw();
    })

    var linecolor=$(".parent:eq(3)").find(".son li input");
    linecolor.change(function(){
        obj.bordercolor=$(this).val()
        obj.draw();
    })

    var bgcolor=$(".parent:eq(4)").find(".son li input");
    bgcolor.change(function(){
        obj.bgcolor=$(this).val()
        obj.draw();
    })

    var linwidth=$(".parent:eq(5)").find(".son li");
    linwidth.click(function(){
        var lw=parseInt($(this).attr("data-rol"))
        obj.linewidth=lw;
        console.log(obj.linewidth)
        obj.draw();
    })

    obj.draw();

    var back=$(".back");
    back.click(function(){
        $(this).css({
            background:"#92b1f4",
            color:"#fff"
        })
        obj.back();
        var that=this;
        setTimeout(function(){
            $(that).css({
                background:"#fff",
                color:"#92b1f4"
            })
        },300)
        obj.draw();
    })


    var linwidth=$(".parent:eq(6)").find(".son li");
    linwidth.click(function(){
        var lw=parseInt($(this).attr("data-rol"))
        obj.eros($(".xp"),lw,lw)
    })



    var file=$(".parent:eq(0)").find(".son li");
    file.click(function(){
        var index=$(this).index()
        if(index==1){
            obj.save();
        }else if(index==0){
            if(obj.pagedata.length>0){
                var yes=window.confirm("是否保存?");
                if(yes){
                    location.href=(canvas[0].toDataURL().replace("data:image/png","data:stream/octet"));
                }
            }
            obj.pagedata=[];
            cobj.clearRect(0,0,obj.canvas1.width,obj.canvas1.height);

        }
        obj.draw();
    })

    $(".choice").click(function(){
        obj.select($(".select"));
    })

})