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
        } else {
            var data = JSON.parse(xhr.responseText);
            window[key] = data[key];
            return data;
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
 * Эта функция получает шаблон, определяет его внутреннее содержимое
 */

function getTemplate(fileWay) {
    var defer = $.Deferred();
    // ... 
    $.get(fileWay, function (template_file) { // все содержимое файла по данному запросу в одну строку
            // преобразует строку в html-элемент
            var tmplHTML = $.parseHTML(template_file), // все содержимое тегов script в файле
                tmplContents = $(tmplHTML).html();
            //console.groupCollapsed('Got template');
            //console.log({ template_file: template_file,
                          //  tmplHTML: tmplHTML, tmplContents: tmplContents });
            //console.groupEnd();
            defer.resolve(tmplContents);
        });
    //console.log(defer.promise());    
    return defer.promise();
}
/**
 *
 * @returns Array
 * Эта функция создает массив fileContents из данных - каждый элемент - все, что есть в onTheBeginning
 * одного из 2-х json.
 */
function retrieveData(viewName, i, viewField, windowField) {
    if (!viewField) viewField = "file_names";
    if (!windowField) windowField = "onTheBeginning";
        var titleOFPlay = config[viewName][viewField];  // 'Black_parody', 'Xmarine'
        console.log("Black_parody" in window);
        console.log("i: ", i, "titleOFPlay[i]: ", titleOFPlay[i]);
        var beginData = window[titleOFPlay[i]][windowField];
    /*for (var i = 0, j = titleOFPlay.length; i < j; i++) {
        fileContents.push(window[titleOFPlay[i]][windowField]);
    }*/
    return beginData; 
}
/**
 * В этой функции периодически выполняется проверка, что model[key] имеет значение, отличное от
 * undefined.
 *
 */
function checkModelData(model, key) {
    var cnt = 0, intrvl = setInterval(
        function () {
            if (!key) key = 'play_object';
            cnt++;
            if (model[key]) {
                clearInterval(intrvl);
                cnt = 0;
            }
            if (cnt > 50) {
                cnt = 0;
                clearInterval(intrvl);
            }
        }, 100);
}
var config = {
    viewInit: {
        file_names: ['Black_parody', 'Xmarine']
    }
};


/*var viewInit = Backbone.View.extend(
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
                var prime_wrapper = makeTemplate(dataprime_wrappers[countData]);
                console.log('prime_wrapper', prime_wrapper);
                //prime_wrapper.appendTo($("#divInPrimary"));
            }
        }
    }
); */

var playsModel = Backbone.Model.extend(
    {
        initialize: function (key) {
            this.render(key);
        },
        render: function (key) {
            getData(key);
            this.getFileContents(key);
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
                if (window[key]) {
                    _this.play_object = window[key];
                    clearInterval(sttm);
                }
                if (cnt >= 50) {
                    console.warn('Cannot get file');
                    clearInterval(sttm);
                }
            }, 100);
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
        var xmarineModel = new playsModel("Xmarine"),
            black_parodyModel = new playsModel("Black_parody"),
            resultingHTML;
            $.when( getTemplate("templates/primary/prime_block.html"), 
                    getTemplate("templates//primary/prime_wrapper.html")
            ).done(function(prime_block, prime_wrapper){
                // Код для заполнения шаблонов данными
                for (var i=0; i<config.viewInit.file_names.length; i++) {
                    // В цикле вызывается retrieveData, передается i, из этой функции берется то,
                    // что функция возвращает: onTheBeginning, один из двух.
                      var beginData = retrieveData("viewInit", i);
                    //console.log(beginData);
                      prime_block = _.template(prime_block)(beginData);  
                      console.log(prime_block);
                }
               
            });

        /*getTemplate('primary', 'prime_block').then(function (prime_block_raw) {
            console.groupCollapsed('getTemplate');
                console.log('%cthen prime_block', 'color:rebeccapurple', prime_block_raw);
            console.groupEnd();
            // получили HTML "сырого" шаблона
            return '<div>First block</div><div>Second block</div>';  // Возвращение здесь и getTemplate.
            }, function () {

        }); 
        //console.log('Look here, it says: ', data);
        getTemplate('primary', 'prime_wrapper').then(function (prime_wrapper_raw) {
            console.groupCollapsed('getTemplate');
            console.log('%cthen prime_wrapper', 'color:orange', prime_wrapper_raw);
            console.groupEnd();
            return '<div>Third block</div><div>Fourth block</div>';
        }); */
    },
    buildSecondary: function () {

    },
    enterToPlays: function () {

    }

    //

});

var appRouter = new AppRouter();
Backbone.history.start();

