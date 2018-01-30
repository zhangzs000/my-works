
    //3、解决回调嵌套（回调地狱）观察者模式
    var washBowl = function (cb) {
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve('washBowl')
            },5000)    
        })
    }
    var prepareTea = function (cb) {
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                // console.log('停')
                resolve('prepareTea')
            },1000)    
        })
    }
    var boilWater = function (cb) {
        return new Promise(function(resolve, reject){
            setTimeout(function(){
                resolve('boilWater')
            },2000)    
        })
    }
    console.time('time6')

    var tea = async function(){
        var result = await Promise.all([
             washBowl(), 
             prepareTea(), 
             boilWater()
        ]) 
        console.log('result: ',result)
        console.timeEnd('time6')     
    }
    tea()
    
    
