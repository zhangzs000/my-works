function shape(canvas,canvas1,cobj){
    this.canvas1=canvas1;
    this.canvas=canvas;
    this.cobj=cobj;
    this.bgcolor="#000";
    this.bordercolor="#000";
    this.linewidth=1;
    this.type="stroke";
    this.shapes="line";
    this.pagedata=[];
    this.magicdata;
    this.width=canvas.width;
    this.height=canvas.height;
}

shape.prototype={
    init:function(){
        $(".select").css("display","none")
        if (this.magicdata) {
            this.pagedata.push(this.cobj.getImageData(0, 0, 1500,1500));
            this.magicdata = null;
        }
        this.cobj.fillStyle=this.bgcolor;
        this.cobj.strokeStyle=this.bordercolor;
        this.cobj.lineWidth=this.linewidth;
    },
    line:function(x,y,x1,y1){
        var that=this;
        that.init();
        that.cobj.beginPath();
        that.cobj.moveTo(x,y);
        that.cobj.lineTo(x1,y1);
        that.cobj.closePath();
        that.cobj.stroke();
    },
    rect:function(x,y,x1,y1){
        var that=this;
        that.init();
        that.cobj.beginPath();
        that.cobj.rect(x,y,x1-x,y1-y);
        //that.cobj.lineTo(x1,y1);
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    circle:function(x,y,x1,y1){
        var that=this;
        that.init();
        that.cobj.beginPath();
        var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))
        that.cobj.arc(x,y,r,0,Math.PI*2)
        that.cobj.closePath();
        that.cobj[that.type]();
    },
    pen:function(x,y,x1,y1){
        var that=this;
        //that.init();
        that.cobj.lineTo(x1,y1);
        //that.cobj.closePath();
        that.cobj.stroke();
    },
    five:function(x,y,x1,y1){
        var that=this;   //圆滚滚的五角星
        that.init();
        var l=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y)) //外圆的半径
        var l1=l/2;    //内圆的半径
        that.cobj.beginPath();
        that.cobj.moveTo(x+l,y);
        for(var i=1;i<10;i++){
            if(i%2==0){
                that.cobj.lineTo(Math.cos(i*36*Math.PI/180)*l+x,Math.sin(i*36*Math.PI/180)*l+y)
            }else{
                that.cobj.lineTo(Math.cos(i*36*Math.PI/180)*l1+x,Math.sin(i*36*Math.PI/180)*l1+y)
            }
        }

        //var that=this;    //尖尖的五角星
        //that.init();
        //var l=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y))
        //var rad1 = Math.sin(0.4*Math.PI);     //sin(72)
        //var rad2 = Math.cos(0.4*Math.PI);     //cos(72)
        //var rad3 = Math.sin(0.2*Math.PI);     //sin(36)
        //var rad4 = Math.cos(0.2*Math.PI);     //cos(36)
        //that.cobj.beginPath();
        //that.cobj.moveTo(0+x,-l*rad1+y);
        //that.cobj.lineTo(l*rad2+x,0+y);
        //that.cobj.lineTo(l+l*rad2+x,0+y);
        //that.cobj.lineTo(l*rad2+2*l*rad2*rad2+x,l*rad3+y);
        //that.cobj.lineTo(l*rad4+x,2*l*rad1*rad1-l*rad1+l*rad3+y);
        //that.cobj.lineTo(0+x,2*l*rad1*rad1-l*rad1+y);
        //that.cobj. lineTo(-l*rad4+x,2*l*rad1*rad1-l*rad1+l*rad3+y);
        //that.cobj. lineTo(-l*rad2-2*l*rad2*rad2+x,l*rad3+y);
        //that.cobj. lineTo(-l-l*rad2+x,0+y);
        //that.cobj. lineTo(-l*rad2+x,0+y);
        //that.cobj. lineTo(0+x,-l*rad1+y);

        that.cobj.closePath();
        that.cobj[that.type]();
    },
    draw:function(){
        var that=this;
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY;
            if(that.shapes=="pen"){
                that.init();
                that.cobj.beginPath();
                that.cobj.moveTo(startx,starty);
            }
            that.canvas.onmousemove=function(e){
                that.cobj.clearRect(0,0,that.canvas1.width,that.canvas1.height)
				if(that.pagedata.length!=0){
					that.cobj.putImageData(that.pagedata[that.pagedata.length-1],0,0)
				}
                var endx= e.offsetX;
                var endy= e.offsetY;
                that[that.shapes](startx,starty,endx,endy)
            }
            that.canvas.onmouseup=function(){
                if(that.shapes=="pen"){
                    that.cobj.closePath();
                }
                that.pagedata.push(that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height))
                that.canvas.onmousemove=null;
                that.canvas.onmouseup=null;
            }
        }
    },
    back:function(){
        this.cobj.clearRect(0,0,1500,1500);
        if(this.pagedata.length==0){
            return;
        }
        var last=this.pagedata.pop();

        this.cobj.putImageData(last,0,0);
    },
    eros:function(xpobj,w,h){
        var that=this;

        that.canvas.onmousemove=function(e){
            xpobj.css({
                width:w,
                height:h,
                display:"block"
            })
            var endx= e.offsetX;
            var endy= e.offsetY;
            var lefts=endx-w/2;
            var tops=endy-h/2
            if(lefts<0){
                lefts=0
            }
            if(lefts>that.width-w){
                lefts=that.width-w
            }
            if(tops<0){
                tops=0
            }
            if(tops>that.height-h){
                tops=that.height-h
            }
            xpobj.css({
                top:tops,
                left:lefts,
            })
        }
        that.canvas.onmousedown=function(e){
            //alert(1)
            that.canvas.onmousemove=function(e){
                xpobj.css({
                    width:w,
                    height:h,
                    display:"block"
                })
                var endx= e.offsetX;
                var endy= e.offsetY;
                var lefts=endx-w/2;
                var tops=endy-h/2
                if(lefts<0){
                    lefts=0
                }
                if(lefts>that.width-w){
                    lefts=that.width-w
                }
                if(tops<0){
                    tops=0
                }
                if(tops>that.height-h){
                    tops=that.height-h
                }
                xpobj.css({
                    top:tops,
                    left:lefts
                })

                that.cobj.clearRect(lefts,tops,w,h)
            }
            that.canvas.onmouseup=function(e){
                //alert(1)
                that.pagedata.push(that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height))

                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                xpobj.css("display","none")
                //that.canvas.onmouseup=null;
            }
        }
    },
    save:function(){
        location.href=(this.canvas1.toDataURL().replace("data:image/png","data:stream/octet"));

    },
    //select:function(sobj){
    //   var that=this;
    //    that.canvas.onmousedown=function(e){
    //        var startx= e.offsetX;
    //        var starty= e.offsetY;
    //        var xx,yy,w,h;
    //        that.canvas.onmousemove=function(e){
    //            var endx= e.offsetX;
    //            var endy= e.offsetY;
    //
    //            w=Math.abs(endx-startx);
    //            h=Math.abs(endy-starty);
    //            xx=endx<startx?endx:startx;
    //            yy=endy<starty?endy:starty;
    //
    //            sobj.css({
    //                display:"block",
    //                width:w,
    //                height:h,
    //                top:yy,
    //                left:xx
    //            })
    //
    //            that.canvas.onmouseup=function(){
    //                that.magicdata=that.cobj.getImageData(xx,yy,w,h);
    //
    //                that.cobj.clearRect(xx,yy,w,h);
    //
    //                that.pagedata.push(that.cobj.getImageData(0,0,that.canvas.width,that.canvas.height))
    //                that.cobj.putImageData(that.magicdata,xx,yy)
    //                alert(2)
    //
    //                that.drag(xx,yy,w,h,sobj);
    //
    //
    //
    //                that.canvas.onmouseup=null;
    //                that.canvas.onmousemove=null;
    //
    //
    //
    //
    //
    //
    //
    //
    //            }
    //        }
    //    }
    //},
    //drag:function(xx,yy,w,h,sobj){
    //    alert(1)
    //    var that=this;
    //    that.canvas.onmousemove=function(e){
    //        var ox= e.offsetX;
    //        var oy= e.offsetY;
    //        if(ox>=xx&&ox<=(xx+w)&&oy>=yy&&oy<=(yy+h)){
    //            //console.log(1)
    //            $(that.canvas).css("cursor","move");
    //        }else{
    //            $(that.canvas).css("cursor","default");
    //            return;
    //        }
    //    }
    //    that.canvas.onmousedown=function(e){
    //        var startx= e.offsetX;
    //        var starty= e.offsetY;
    //        var xxx,yyy;
    //        that.canvas.onmousemove=function(e){
    //            that.cobj.clearRect(0,0,that.canvas.width,that.canvas.height)
    //            if(that.pagedata.length!=0){
    //                that.cobj.putImageData(that.pagedata[that.pagedata.length-1],0,0)
    //            }
    //            var endx= e.offsetX;
    //            var endy= e.offsetY;
    //
    //
    //            sobj.css({
    //                left:xx+(endx-startx),
    //                top:yy+(endy-starty),
    //            })
    //             xxx=xx+(endx-startx);
    //            yyy=yy+(endy-starty);
    //
    //            that.cobj.putImageData(that.magicdata,xxx,yyy)
    //        }
    //        that.canvas.onmouseup=function(){
    //            that.canvas.onmousemove=null;
    //            that.canvas.onmouseup=null;
    //            that.drag(xxx,yyy,w,h,sobj);
    //
    //        }
    //    }
    //}
    select:function(selectareaobj){
        var that=this;
        that.init();
        that.canvas.onmousedown=function(e){
            var startx= e.offsetX;
            var starty= e.offsetY,minx,miny, w,h;
            that.init();
            that.canvas.onmousemove=function(e){
                that.init();
                var endx= e.offsetX;
                var endy= e.offsetY;
                minx=startx>endx?endx:startx;
                miny=starty>endy?endy:starty;
                w=Math.abs(startx-endx);
                h=Math.abs(starty-endy);
                selectareaobj.css({
                    display:"block",
                    left:minx,
                    top:miny,
                    width:w,
                    height:h

                })

            }
            that.canvas.onmouseup=function(){
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.magicdata=that.cobj.getImageData(minx,miny,w,h);
                that.cobj.clearRect(minx,miny,w,h);
                that.pagedata.push(that.cobj.getImageData(0,0,1500,1500));
                that.cobj.putImageData(that.magicdata,minx,miny);
                that.drag(minx,miny,w,h,selectareaobj);

            }
        }

    },
    drag:function(x,y,w,h,selectareaobj){
        var that=this;
        that.canvas.onmousemove=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor="move";
            }else{
                that.canvas.style.cursor="default";
            }
        }

        that.canvas.onmousedown=function(e){
            var ox= e.offsetX;
            var oy= e.offsetY;
            var cx=ox-x;
            var cy=oy-y;
            if(ox>x&&ox<x+w&&oy>y&&oy<y+h){
                that.canvas.style.cursor="move";
            }else{
                that.canvas.style.cursor="default";
                return;
            }

            that.canvas.onmousemove=function(e){

                that.cobj.clearRect(0,0,that.width,that.height);
                if(that.pagedata.length!==0){
                    that.cobj.putImageData(that.pagedata[that.pagedata.length-1],0,0);
                }
                var endx= e.offsetX;
                var endy= e.offsetY;
                var lefts=endx-cx;
                var tops=endy-cy;
                if(lefts<0){
                    lefts=0;
                }
                if(lefts>that.width-w){
                    lefts=that.width-w
                }

                if(tops<0){
                    tops=0;
                }
                if(tops>that.height-h){
                    tops=that.height-h
                }
                selectareaobj.css({
                    left:lefts,
                    top:tops
                });
                x=lefts;
                y=tops;
                that.cobj.putImageData(that.magicdata,lefts,tops);


            }

            that.canvas.onmouseup=function(){
                that.canvas.onmouseup=null;
                that.canvas.onmousemove=null;
                that.pagedata.push(that.cobj.getImageData(0,0,that.canvas1.width,that.canvas1.height))
                that.drag(x,y,w,h,selectareaobj)

            }
        }


    }






}
