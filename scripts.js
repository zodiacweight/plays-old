// var sum = 2 * 4;
// console.log("Hello, sum = " + sum);
function handler(){
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

var getter = handler()["get"]; // эквивалентно function(name){
                                                /*  return data[name];
                                                 }, */
// должно вернуть свойство объекта data.
console.log(getter("x"));