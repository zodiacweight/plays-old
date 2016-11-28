/**
 * Created by User on 23.11.2016.
 */
function getData(key) {
    var path = 'jsons/'+key+'.json';
    //console.log('%cpath', 'backgroun-color: lightskyblue', path);
    // 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
    // 2. Конфигурируем его: GET-запрос на URL 'Xmarine.json'
    xhr.open('GET', path);// путь к тому или иному json
    // 3. Отсылаем запрос
    xhr.send();
    xhr.onload = function () {
        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            // обработать ошибку
            //console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            var data = JSON.parse(xhr.responseText);
            //console.log('%cGot file contents!', 'background-color:lightgreen', data);
            //return data;
            window[key] = data[key];
            //console.log(key); // определено
            //handleJson[key].handle(data);
            console.log(data);
            //buildHtmlInPrimary(key);
        }
    };
    xhr.onerror = function (event) {
        console.log(event);
    };
}
function generatePrimeComponents(viewName) {
    for (var i=0; i <2; i++) {
        var titleOFPlay = config[viewName]["file_names"];
        console.log('current',{
            titleOFPlay:titleOFPlay,
            'titleOFPlay[i]':titleOFPlay[i], // "Black_parody", "Xmarine"
            'i':i
        });
        var comps = window[titleOFPlay[i]]["onTheBeginning"];
        //console.log({viewName:viewName, titleOFPlay:titleOFPlay, comps:comps});
        // $("h2")[i].$el.html(comps["header"]);
        //$(".image")[i].$el.html(comps["imgOnPrimary"]);
        //$(".preview")[i].$el.html(comps["preview"]);
    }
}
var config = {
    LoadHtmlPrimary: {
        file_names:['Black_parody','Xmarine']            
    }
};
var  LoadHtmlPrimary = Backbone.View.extend(
    {
        initialize: function () {
            this.render();
        },
        render: function () {
            //var file_names = config.LoadHtmlPrimary.file_names;
            var data  = generatePrimeComponents('LoadHtmlPrimary'); // 2 вложенных подобных шаблона заполняются данными
            
            //var wrapperDiv = _.template($('#componentsOfPrimary').html())(data);
            
            /*$("body").html(wrapperDiv);
            setTimeout(function () {  
                wrapperDiv.fadeIn(2400); 
            }, 1800);*/

            //var templateHTML = _.template($('#wrapperOfPrimary').html())(/**/);
            //this.$el.html(templateHTML);
            // for 
            // Array 'Black_parody','Xmarine'
            // Здесь должен определяться объект со значениями для X-marine или Black_parody, и должен 
            //быть доступен ключ
        }
    }
);

var Plays = Backbone.Model.extend(
    {
        initialize: function(key){ // Xmarine, black_parody
            // получить файл
            // проверить сохранённый скачанный файл в window[key]
            getData(key); // onLoad (hidden setInterval)
            // console.log(window[key]);
            this.getFileContents(key);  // setInterval
        },
        getFileContents: function(key){
            // setTimeout start
            var _this = this, cnt=0;
            // вызывается многократно
            var sttm = setInterval(function(){
                ++cnt;
                // ..
                if(window[key]) {
                    _this.play_object = window[key];
                    //console.log('%cGot the file', 'color: blue', _this.play_object);
                    clearInterval(sttm);
                }    
                if(cnt>=50){
                    console.warn('Cannot get file');
                    clearInterval(sttm);
                }
            },100);
            /* Все запросы по сети выполняются асинхронно по умолчанию.
            В этот момент вызывается getData, но скрипт не ждет, пока  все, что написано в этой функции,
            выполнится, идет дальше. */
            // setTimeout finish
            //this.play_object = getData(key).then(function callbackOnSuccess(){
                //console.log('_this.play_object', _this.play_object); // не определено
            //}, callbackOnError);
        }
    }
);

var xmarine = new Plays("Xmarine");
var black_parody = new Plays("Black_parody");

var AppRouter = Backbone.Router.extend({
    routes: {
        "": "loadPrimary",
        "enter_to_secondary": "loadSecondary",
        "enter_to_plays": "enterToPlays"
    },
    loadPrimary: function () {
        console.log("Функция вызвана!");
        if(("Xmarine" in window)&&("Black_parody" in window)) {
            alert("достигнуто");
        }
       // var primary = new LoadHtmlPrimary(); // Здесь тоже должен быть доступен ключ
       
        // ...
    },
    loadSecondary: function() {

    },
    enterToPlays: function () {

    }

});

var appRouter = new AppRouter();
Backbone.history.start();

