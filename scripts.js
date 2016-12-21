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

function getFileContents (key) {
    // setTimeout start
    var defer = $.Deferred(),
        cnt = 0;
    // вызывается многократно
    var sttm = setInterval(function () {
        ++cnt;
        if (window[key]) {
            // this передан через .bind
            console.log('this', this);
            //_this.play_object = window[key];
            this.play_object = window[key]; // (xmarineModel | black_parodyModel).play_object
            //console.log(_this.play_object);
            //defer.resolve(_this.play_object);
            defer.resolve(this.play_object);
            clearInterval(sttm);
        }
        if (cnt >= 50) {
            console.warn('Cannot get file');
            defer.reject("The content is not here yet.");
            clearInterval(sttm);
        }
    }.bind(this), 100);
    return defer.promise();
}

function makeReadyTemplates (xmarineModel, black_parodyModel) {
    var prime_block1, prime_block2,
        searchData = setInterval(
        function() {
            prime_block1 = xmarineModel.defaults.tmpl.prime_block;
            prime_block2 = black_parodyModel.defaults.tmpl.prime_block;
            if((prime_block1!=="")&&(prime_block2!=="")) {
                console.log(prime_block1, ", ", prime_block2);
                clearInterval(searchData);
            }
        },
        50
    );

}

var config = {
    viewInit: {
        file_names: ['Black_parody', 'Xmarine']
    }
};

var playsModel = Backbone.Model.extend(
    {
        defaults: {
            tmpl: {
                "prime_block": "",
                "prime_wrapper": ""
            } //<model_instance>.get(tmpl[key])
        },
        initialize: function (key) {
            this.getTemplatesContents(key);
        },
        getTemplatesContents: function (key) {
            var _this = this;
            // Получает данные из json (асинхронно) и сохраняет в window[key]
            getData(key);
            // Проверяет, сохранены ли данные в window[key] и возвращает их
            getFileContents(key).then(
                function () {
                    var file_path = "templates/primary/", prime_data = [], beginData, ready_prime_block;
                    $.when( getTemplate(file_path + "prime_block.html"),
                            getTemplate(file_path + "prime_wrapper.html")
                        ).done(function (prime_block, prime_wrapper) {
                            _this.defaults.tmpl.prime_block = prime_block;
                            _this.defaults.tmpl.prime_wrapper = prime_wrapper;
                                //beginData = playsObject["onTheBeginning"];
                                //ready_prime_block = _.template(prime_block)(beginData);
                                //console.log(ready_prime_block);
                        // Заполнить prime_block, далее - вставить prime_block в prime_wrapper
                            /*  var beginData, ready_prime_block, ready_prime_blocks = [];
                            for (var i = 0, j = config.viewInit.file_names.length; i < j; i++) {
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
                },
                function (mes) {
                    console.log(mes);
                }
            );
        }
        /**
         * Эта функция каждые 100 милисекунд проверяет, имеет ли window[key] значение, отличное от
         * undefined. Если есть, то текущий экземпляр playsModel получает поле play_object с таким
         * значением, как window[key] (определенным объектом), и проверка прекращается.
         * Если cnt = 50, то проверка так же прерывается.
         */

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
            makeReadyTemplates(xmarineModel, black_parodyModel);
            // Получить оба ready_prime_block через каждый из экземпляров, сложить их в массив и внести в prime_wrapper.

    },
    buildSecondary: function () {

    },
    enterToPlays: function () {

    }

    //

});

var appRouter = new AppRouter();
Backbone.history.start();

