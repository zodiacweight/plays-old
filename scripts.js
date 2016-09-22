// var sum = 2 * 4;
// console.log("Hello, sum = " + sum);
function handlerInterface(){
    var data = {
        x : 'X',
        y : 'Y'
    };

    return {
        get: function(name){
            return data[name];
        },
        set: function(name, value){
            data[name] = value;
        }
    }
}

//var getter = handler()["get"];
// должно вернуть свойство объекта data.
//console.log(getter("x"));

var handler = handlerInterface();
console.log(handler.get("x"));
handler.set("x", "new value of x");
handler.set("y", "new value of y");

console.log(handler.get("x")+"; "+handler.get("y"));