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
            window[key] = data[key]; // определены оба объекта
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

var config = {
    viewInit: {
        file_names: ['Black_parody', 'Xmarine']
    }
};

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
             var defer = $.Deferred(), _this = this, cnt = 0;
            // вызывается многократно
            var sttm = setInterval(function () {
                ++cnt;
                if (window[key]) {
                    _this.play_object = window[key];
                    //console.log(_this.play_object);
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
        var xmarineModel = new playsModel("Xmarine"), // getFileContents runs asynchronously
            black_parodyModel = new playsModel("Black_parody"),  // getFileContents runs asynchronously
            resultingHTML,
            file_path = 'templates/primary/';
        console.log(window["Xmarine"]);
        console.log(window["Black_parody"]); 
        // getFileContents start here
        $.when(getTemplate(file_path + "prime_block.html"),
            getTemplate(file_path + "prime_wrapper.html")
        ).done(function (prime_block, prime_wrapper) {
            var beginData, ready_prime_block, ready_prime_blocks = [];
            /*for (var i = 0, j = config.viewInit.file_names.length; i < j; i++) {
                // В цикле вызывается retrieveData, передается i, из этой функции берется то,
                // что функция возвращает: onTheBeginning, один из двух.
                beginData = retrieveData("viewInit", i);
                if (!viewField) viewField = "file_names"; 
                
                // if (!windowField) windowField = "onTheBeginning";
                // var titleOFPlay = config[viewName][viewField];  // 'Black_parody', 'Xmarine'
                // console.log("Black_parody" in window); // true
                // console.log("Xmarine" in window); // false
                // // console.log("i: ", i, "titleOFPlay[i]: ", titleOFPlay[i]);
                // var beginData = window[titleOFPlay[i]][windowField];
                
                //console.log(beginData); // Xmarine и Black_parody
                ready_prime_block = _.template(prime_block)(beginData);
                ready_prime_blocks.push(ready_prime_block);
                //temp[i] = ready_prime_block;
                //console.log(ready_prime_block); 
            }
            var ready_prime_wrapper = _.template(prime_wrapper)({ "prime_blocks": ready_prime_blocks }); */
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

