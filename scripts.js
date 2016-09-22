// var sum = 2 * 4;
// console.log("Hello, sum = " + sum);
function cls1(){
    var // x = 'X',
        y = 'Y';
    return function(v, s){
        console.log('I am back!');
        if(s){
            y = v;
            console.log('y = '+y);
        }else {
            console.log('y: '+y);
            return y;
        }
    }
}
var func = cls1();
func ('Z', true);
func(true);