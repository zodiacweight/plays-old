/**
 * Created by User on 23.11.2016.
 */
function getData(key) {
    var path = 'jsons/' + key + '.json';
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
            //buildHtmlInPrimary(key);
        }
    };
    xhr.onerror = function (event) {
        console.log(event);
    };
}
function retrieveData(viewName, viewField, windowField) {
    if (!viewField) viewField = "file_names";
    if (!windowField) windowField = "onTheBeginning";
    var titleOFPlay = config[viewName][viewField], fileContents = [];
    for (var i = 0, j = titleOFPlay.length; i < j; i++) {
        // 1. Разрешаются ли цифры?
        fileContents.push(window[titleOFPlay[i]][windowField]);
        // 2. Втюхать эти элементы в div-обертку, которого еще нет
        // 3. Втюхать этот div-обертку с ее содержимым в body по следующему коду:
        // В скобках написать то, что будет означать обертку.
    }
    //  // ПЕРЕНЕСТИ!
    // $("#myBody").html(); // ПЕРЕНЕСТИ!
    return fileContents;
}
var config = {
    BuildHtmlPrimary: {
        file_names: ['Black_parody', 'Xmarine']
    }
};
var BuildHtmlPrimary = Backbone.View.extend(
    {
        initialize: function () {
            this.render();
        },
        render: function () {
            var dataPrimeTemplates = retrieveData('BuildHtmlPrimary'),
                len = dataPrimeTemplates.length, blueDiv,
                templateHTML = $("#primeTemplate").html(),
                makeTemplate = _.template(templateHTML);
            console.log('BuildHtmlPrimary', {
                dataPrimeTemplates: dataPrimeTemplates,
                primeTemplate:$("#primeTemplate"),
                templateHTML:templateHTML,
                makeTemplate: makeTemplate
            });
            for (var countData=0; countData < len; countData++) {
                // 1. определяется каждый из двух похожих шаблонов с данными:
                var primeTemplate =makeTemplate(dataPrimeTemplates[countData]);
                console.log('primeTemplate', primeTemplate);
               // console.log($(".primeTemplate")[countData]); // undefined
                //2. В div с id="divInPrimary" добавляется этот шаблон.
                //primeTemplate.appendTo($("#divInPrimary"));
            }
            /* var primary = $("#blueDiv");
            // 3. Шаблон с id="blueDiv" вставляется в div-обертку (wrapper)
            $("#wrapper").html(primary);
            // 4. primary постепенно появляется
            setTimeout(function () {
                $("#blueDiv").fadeIn(2400);
            }, 1800); */
        }
    }
);

var Plays = Backbone.Model.extend(
    {
        initialize: function (key) { // Xmarine, black_parody
            // получить файл
            // проверить сохранённый скачанный файл в window[key]
            getData(key);
            // console.log(window[key]);
            this.getFileContents(key);  // setInterval
        },
        getFileContents: function (key) {
            // setTimeout start
            var _this = this, cnt = 0;
            // вызывается многократно
            var sttm = setInterval(function () {
                ++cnt;
                // ..
                if (window[key]) {
                    _this.play_object = window[key];
                    //console.log('%cGot the file', 'color: blue', _this.play_object);
                    clearInterval(sttm);
                }
                if (cnt >= 50) {
                    console.warn('Cannot get file');
                    clearInterval(sttm);
                }
            }, 100);
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



var AppRouter = Backbone.Router.extend({
    routes: {
        "": "buildPrimary",
        "enter_to_secondary": "buildSecondary",
        "enter_to_plays": "enterToPlays"
    },
    buildPrimary: function () {
        console.log("Функция вызвана!");
        var xmarine = new Plays("Xmarine");
        var black_parody = new Plays("Black_parody");
        var val = setInterval(
            function () {
                if ("Xmarine" in window) {
                    clearInterval(val);
                    var primary = new BuildHtmlPrimary();
                }
            }, 300);
        //  // Здесь тоже должен быть доступен ключ
    },
    buildSecondary: function () {

    },
    enterToPlays: function () {

    }

});

var appRouter = new AppRouter();
Backbone.history.start();

