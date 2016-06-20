// Щелкнуть на вкладке > move to opposite group
var p_aboutcharacters, replics, headers;
// Извлечь файл json и сохранить в эти переменные объекты, которые находятся в этом файле.
// 1. Создаём новый объект XMLHttpRequest
var xhr = new XMLHttpRequest();
// 2. Конфигурируем его: GET-запрос на URL 'replicsobjects.json'
xhr.open('GET', 'replicsobjects.json');
// 3. Отсылаем запрос
xhr.send();
xhr.onload = function(){
    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        console.log( xhr.status + ': ' + xhr.statusText ); // пример вывода: 404: Not Found
    } else {
        // вывести результат
        console.log( xhr.responseText ); // responseText -- текст ответа.
    }
};
/* Roleslist получает стили: border = "2px solid blueviolet"; border-radius: 6px;*/
//  window.onload = function () {
var replics_of_choicedpart = {}, // реплики выбранной части.
    innerContent, contentlist = document.getElementById("contentlist");
var roleslist = document.getElementById("roleslist"),
    area_forcontent = document.getElementById("for_content"),
    text = document.getElementById("text"),
    arrayElementObject, checkboxes = [],
    subjectName, className,
    setContents = function (replics_of_choicedpart, contents, subjectName, className) {
        var innerContent = {
            class: className,
            h4: subjectName,
            contents: contents
        };
        switch (className) {
            case "authorwords":
                replics_of_choicedpart.authorwords.push(innerContent);
                break;

            case "words_of_char":
                replics_of_choicedpart.wordsofchar.push(innerContent);
                break;
        }
        /*replics_of_choicedpart.replicsdivs.push("<div class='"+innerContent.class+"'> <h4>" + innerContent.h4 +
         "</h4><p>" + innerContent.contents[0] + "</p></div>"); */
        // В список реплик героев выбранной части добавляется
        // новый объект innerContent. Этот же объект заносится в переменную innerContent ниже, где вызывается эта функция.
        return innerContent;
    },
    addInnerHtml = function (html, innerContent) {
        html.innerHTML += "<div class='" + innerContent.class + "'> <h4>" + innerContent.h4 +
            "</h4><p>" + innerContent.contents[0] + "</p></div>";
    };
// Клик по "About characters":
document.getElementById("about_characters").onclick = function () {
    if (roleslist.innerHTML != "") {
        roleslist.innerHTML = "";
    }
    text.innerHTML = "<h2>About characters</h2>" + p_aboutcharacters["About_characters"];
    area_forcontent.style.borderLeft = "3px solid #345693";
    contentlist.style.borderRight = "none";
};
// Клик по каждому replics от part до part:
for (var part in replics) {
    document.getElementById(part).onclick = function () // назначается обработчик события -- ВНУТРИ ЦИКЛА!
    {   // выполняется функция, привязанная к обработчику события -- ПОСЛЕ ВЫПОЛНЕНИЯ ЦИКЛА!!!
        //console.log({id:this.id, part:this.id});
        var presrolesobject = {}, presrolesarray = [];
        area_forcontent.style.borderLeft = "3px solid #345693";
        contentlist.style.borderRight = "none";
        roleslist.innerHTML = "<strong>There are the following characters in this part:</strong>";
        text.innerHTML = "<h2>" + this.id + " " + headers[this.id] + "</h2>";
        replics_of_choicedpart.authorwords = []; // Для объектов со свойствами реплик
        replics_of_choicedpart.wordsofchar = [];
        replics_of_choicedpart.authorwords_divs = []; // Divs, выведенные на страницу при клике по part,
        replics_of_choicedpart.replicsofchar_divs = []; //содержащие в себе реплики
        for (var index in replics[this.id]) { // пробег по partn (replics[this.id]) от arrayElementObject
            // (реплики одного героя) к arrayElementObject(реплике другого героя)
            arrayElementObject = replics[this.id][index]; // реплика героя: {}
            //console.log({arrayElementObject: arrayElementObject});
            subjectName = Object.keys(arrayElementObject)[0]; // ключ (единственный) из объекта arrayElementObject:
            // image, author или наименование героя.
            if (subjectName == "image") {
                text.innerHTML += arrayElementObject['image'];
            }
            else {
                if (!(subjectName in presrolesobject) && subjectName.indexOf('&') < 0 && subjectName.indexOf('letter') < 0) {
                    presrolesobject[subjectName] = true;
                    presrolesarray.push(subjectName);
                    roleslist.innerHTML += "<p><input type='checkbox' class='checkcharacter'>" + subjectName + "</p>";
                }
                /*console.log({
                 replic:replics[this.id][index],
                 subjectName:subjectName,
                 'arrayElementObject[subjectName]':arrayElementObject[subjectName]
                 });*/
                if (subjectName == "Author's words") {
                    className = 'authorwords';
                } else {
                    className = 'words_of_char';
                }
                // innerContent получает очередной объект innerContent. В функции этот объект добавляется в
                // replics_of_choicedpart.authorwords  или replics_of_choicedpart.wordsofchar.
                innerContent = setContents(replics_of_choicedpart, [arrayElementObject[subjectName]], subjectName, className);
                console.log('innerContent', innerContent);
                addInnerHtml(text, innerContent); // В содержимое элемента text добавляется innerContent, судя по содержанию.
                console.log({
                    className: className,
                    subjectName: subjectName,
                    '[arrayElementObject[subjectName]': arrayElementObject[subjectName],
                    replics_of_choicedpart: replics_of_choicedpart,
                    text: text
                });
            }
        }
        roleslist.innerHTML += '<div><input id="paintreplics" type="button" value="paint replics"></div>';
        checkboxes = document.getElementsByClassName("checkcharacter");
        replics_of_choicedpart.authorreplics_divs = document.getElementsByClassName("authorwords");
        replics_of_choicedpart.replicsofchar_divs = document.getElementsByClassName("words_of_char");
        // Выбор героя
        /* Клик по кнопке - запускается функция. В этой функции:
         * Если элемент чекнут
         *   Если value == "Author's words"
         *     Проверить, не был ли элемент чекнут при предыдущем клике - проверить наличие в объекте previouschecked
         *      элемента с ключом, равным value чекнутого элемента. Если его там нет, он туда вносится.
         *     Цикл пробегает по replics_of_choicedpart.authorwords, находит элементы c h4, у которых innerText
         *     соответствует value чекнутого элемента, и придает этим элементам текстуру.
         *  То же самое для элементов с другим value.
         * В противном случае
         * Если value == "Author's words"
         * Если элемент есть в объекте previouhecked, он оттуда удаляется. Цикл пробегает по
         * replics_of_choicedpart.authorwords и удаляет текстуру элемента.
         * То же самое для элементов с другим value.
         *
         * Предполагаемый код: */
        document.getElementById("paintreplics").onclick = function () {
            var rundivs, name_in_h4, name_in_checkbox, checkedroles = {},
                length_of_checks = checkboxes.length,
                length_authorwords = replics_of_choicedpart['authorwords'].length,
                length_charwords = replics_of_choicedpart['wordsofchar'].length;
            // Пробег по списку чекбоксов
            for (var runchecks = 0; runchecks < length_of_checks; runchecks++) {
                name_in_checkbox = presrolesarray[runchecks];
                if (checkboxes[runchecks].checked) {
                    checkedroles[presrolesarray[runchecks]] = true;
                    if (presrolesarray[runchecks] == "Author's words") {
                        for (rundivs = 0; rundivs < length_authorwords; rundivs++) {
                            if (!(replics_of_choicedpart.authorreplics_divs[rundivs].classList.contains("paintedauthorreplics"))) {
                                replics_of_choicedpart.authorreplics_divs[rundivs].classList.add("paintedauthorreplics");
                            }
                        }
                    }
                    else {
                        for (rundivs = 0; rundivs < length_charwords; rundivs++) {
                            name_in_h4 = replics_of_choicedpart.replicsofchar_divs[rundivs].getElementsByTagName('H4')[0].innerText;
                            if (name_in_checkbox == name_in_h4 || name_in_h4.indexOf(name_in_checkbox) > -1) {
                                replics_of_choicedpart.replicsofchar_divs[rundivs].classList.add("paintedreplicsofchar");
                            }
                        }
                    }
                }
                else { // Если элемент не чекнут в этом клике
                    if (presrolesarray[runchecks] == "Author's words") {
                        for (rundivs = 0; rundivs < length_authorwords; rundivs++) {
                            if (replics_of_choicedpart.authorreplics_divs[rundivs].classList.contains("paintedauthorreplics")) {
                                replics_of_choicedpart.authorreplics_divs[rundivs].classList.remove("paintedauthorreplics");
                            }
                        }
                    }
                    else {
                        for (rundivs = 0; rundivs < length_charwords; rundivs++) {
                            name_in_h4 = replics_of_choicedpart.replicsofchar_divs[rundivs].getElementsByTagName('H4')[0].innerText;
                            if (name_in_checkbox == name_in_h4 || name_in_h4.indexOf(name_in_checkbox)) {
                                if (replics_of_choicedpart.replicsofchar_divs[rundivs].classList.contains("paintedreplicsofchar")) {
                                    replics_of_choicedpart.replicsofchar_divs[rundivs].classList.remove("paintedreplicsofchar");
                                }
                            }
                        }
                    }
                }
            }
        };
    }

}
//}



