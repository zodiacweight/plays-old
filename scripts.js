/**
 * Created by User on 23.11.2016.
 * Эта функция осуществляет получение данных из jsons и сохраняет их в поля key объекта window
 */
function getData(key, path) {
    if (!path) path = 'jsons/' + key + '.json';
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
            window[key] = data[key];
            return data;
            //console.log(key); // определено
            //handleJson[key].handle(data);
            //buildHtmlInPrimary(key);
        }
    };
    xhr.onerror = function (event) {
        console.log(event);
    };
}
/**
 * @param file_dir      String
 * @param template_name String
 * @return promise
 * Предположительно: достает шаблон, распарсивает и заполняет нужными данными вместо переменных.
 */

function getTemplate(file_dir, template_name) {
    var defer = $.Deferred(); // установка статуса за дачи
    // ... 
    $.get('templates/' + file_dir + '/' + template_name + '.html', // путь к файлу
        function (template_file) { // все содержимое файла по данному запросу в одну строку
            // преобразует строку в html-элемент
            var tmplHTML = $.parseHTML(template_file), // все содержимое тегов script в файле
                tmplContents = $(tmplHTML).html();
            /*console.log('getTemplate','background-color: lightskyblue',{
                //template_file:template_file,
                //tmplHTML:tmplHTML,
                //tmplContents:tmplContents,
                templateResult: _.template(tmplContents)({data: 'Anything we want to place'})
            }); */
            defer.resolve(tmplContents);
        });
    return defer.promise();
}
/**
 * 
 * @returns Array
 * Эта функция создает массив fileContents из данных - каждый элемент - все, что есть в onTheBeginning 
 * одного из 2-х json.
 */
function retrieveData(viewName, viewField, windowField) {
    if (!viewField) viewField = "file_names";
    if (!windowField) windowField = "onTheBeginning";
    var /** 
        config = { viewInit: { file_names: ['Black_parody', 'Xmarine'] } }*/
        titleOFPlay = config[viewName][viewField],  // 'Black_parody', 'Xmarine'
        fileContents = [];
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
/**
 * В этой функции периодически выполняется проверка, что model[key] имеет значение, отличное от
 * undefined.
 * 
 */
function checkModelData(model, key){
    var cnt=0,  intrvl = setInterval(
        function () {
            if(!key) key = 'play_object';
            cnt++;
            if (model[key]) {
                clearInterval(intrvl);
                cnt=0;
                console.log('model['+key+']=>',model[key]);
            }
            if(cnt>50){
                cnt=0;
                clearInterval(intrvl);
            }
        }, 100);
}
// 
var config = {
    viewInit: {
        file_names: ['Black_parody', 'Xmarine']
    }
};


var viewInit = Backbone.View.extend(
    {
        initialize: function () {
            this.render();
        },
        render: function () {
            var dataprime_wrappers = retrieveData('viewInit'),
                len = dataprime_wrappers.length, blueDiv,
                templateHTML = $("#prime_wrapper").html(),
                makeTemplate = _.template(templateHTML);
            console.log('viewInit', {
                dataprime_wrappers: dataprime_wrappers,
                prime_wrapper: $("#prime_wrapper"),
                templateHTML: templateHTML,
                makeTemplate: makeTemplate
            });
            for (var countData = 0; countData < len; countData++) {
                // 1. определяется каждый из двух похожих шаблонов с данными:
                var prime_wrapper = makeTemplate(dataprime_wrappers[countData]);
                console.log('prime_wrapper', prime_wrapper);
                // console.log($(".prime_wrapper")[countData]); // undefined
                //2. В div с id="divInPrimary" добавляется этот шаблон.
                //prime_wrapper.appendTo($("#divInPrimary"));
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

var playsModel = Backbone.Model.extend(
    {
        initialize: function (key) { // Xmarine, black_parody
            // получить файл
            // проверить сохранённый скачанный файл в window[key]
            this.render(key);
        },
        render: function (key) {
            // getData - универсальный глобальный метод, у getFileContents область видимости в playsModel
            getData(key);
            // console.log(window[key]);
            this.getFileContents(key);  // setInterval
        },
        /**
         * Эта функция каждые 100 милисекунд проверяет, имеет ли window[key] значение, отличное от
         * undefined. Если есть, то текущий экземпляр playsModel получает поле play_object с таким
         * значением, как window[key] (определенным объектом), и проверка прекращается.
         * Если cnt = 50, то проверка так же прерывается.
         */
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
        "": "initView",
        "enter_to_secondary": "buildSecondary",
        "enter_to_plays": "enterToPlays"
    },
    initView: function () {
        console.log("Функция вызвана!");
        // сохраняет полученный JSON-файл в window и 
        // размещает ссылку на него в модели, т.о.
        // мы можем обращаться к ней за данными 
        var xmarineModel = new playsModel("Xmarine"),
            black_parodyModel = new playsModel("Black_parody"),
            resultingHTML;
        getTemplate('primary', 'prime_wrapper').then(function (tmpl) {
                // getPromise().then(function('contents'){ // run code below  }, function(error){ console.log('Error: ', error) })
                resultingHTML = _.template(tmpl)({data:'<div>First block</div><div>Second block</div>'});
                console.log('Got data',{tmpl:tmpl, resultingHTML: resultingHTML});
                // получили HTML шаблона
                console.log('tmplatize!', {
                    tmpl: tmpl, xmarineModel:
                    xmarineModel,
                    black_parodyModel: black_parodyModel,
                    resultingHTML:resultingHTML
                });
                // извлекаем данные модели
                checkModelData(xmarineModel);
                checkModelData(black_parodyModel);
                var $dynamicContent = $('#dynamicContent');
                $dynamicContent.append(resultingHTML)
                    .find('>div').eq(0).slideDown(5000);
            // find('>div').eq(0) - найти в $dynamicContent div[0]? вложенный на 1-м уровне
            //
            //console.log('inner div', $dynamicContent.find('>div').eq(0));
            }, function () {

        });
        //  // Здесь тоже должен быть доступен ключ
    },
    buildSecondary: function () {

    },
    enterToPlays: function () {

    }

});

var appRouter = new AppRouter();
Backbone.history.start();

