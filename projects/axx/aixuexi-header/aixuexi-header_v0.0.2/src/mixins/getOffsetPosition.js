/**
 * 计算元素距离混合
 * @author zhangzesheng@gaosiedu.com
 * @date 2017-9-13
 */



export default {

  data() {
    return {
      
    }
  },

  mounted(){
   
  },

  methods: {
     getOffsetPosition (elem){
          if ( !elem ) return {left:0, top:0};
          var top = 0, left = 0;
          if ( "getBoundingClientRect" in document.documentElement ){
              var box = elem.getBoundingClientRect(), 
              doc = elem.ownerDocument, 
              body = doc.body, 
              docElem = doc.documentElement,
              clientTop = docElem.clientTop || body.clientTop || 0, 
              clientLeft = docElem.clientLeft || body.clientLeft || 0,
              top  = box.top  + (self.pageYOffset || docElem && docElem.scrollTop  || body.scrollTop ) - clientTop,
              left = box.left + (self.pageXOffset || docElem && docElem.scrollLeft || body.scrollLeft) - clientLeft;
          }else{
              do{
                  top += elem.offsetTop || 0;
                  left += elem.offsetLeft || 0;
                  elem = elem.offsetParent;
              } while (elem);
        }
          return {left:left, top:top};    
      } 
  }
  
}