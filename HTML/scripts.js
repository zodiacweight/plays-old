// Щелкнуть на вкладке > move to opposite group
var Extradecomposers, maniac, headers;
// Извлечь файл json и сохранить в эти переменные объекты, которые находятся в этом файле.
// 1. Создаём новый объект XMLHttpRequest
var xhr = new XMLHttpRequest();
// 2. Конфигурируем его: GET-запрос на URL 'replicsobjects.json'
xhr.open('GET', 'replicsobjects.json');
// 3. Отсылаем запрос
xhr.send();
xhr.onload = function () {
    console.log('%c console.log', 'background-color:yellow');
    console.info('%c console.info', 'color:blue'); // Ctrl+D --скопировать строку без выделения ниже (курсор должен быть на строке)
    console.warn('console.warn'); // Ctrl+ ↑, ↓ -- переместить строку вверх/вниз (курсор должен быть на строке)
    console.error('console.error');
    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found

    } else {
        var data = JSON.parse(xhr.responseText);
        Extradecomposers = data.ExtraDecomposers;
        maniac = data.Maniac;
        headers = data.headers;
        // вывести результат
        // responseText -- текст ответа.
    }
};
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
                //console.log('case: authorwords', 'subjectName = '+subjectName);
                replics_of_choicedpart.authorwords.push(innerContent);
                break;

            case "words_of_char":
                replics_of_choicedpart.wordsofchar.push(innerContent);
                break;
        }
        /*    replics_of_choicedpart.replicsdivs.push("<div class='"+innerContent.class+"'> <h4>" + innerContent.h4 +
         "</h4><p>" + innerContent.contents[0] + "</p></div>"); */
        // В список реплик героев выбранной части добавляется
        // новый объект innerContent. Этот же объект заносится в переменную innerContent ниже, где вызывается эта функция.
        return innerContent;
    },
    addInnerHtml = function (html, innerContent, replics, partn) {
        var i = 0, number_of_replics = partn.length;
        var intv = setInterval(function () { // Переменная intv - номер счетчика.
            if (i < number_of_replics) {
                html.innerHTML += "<div class='" + innerContent.class + "'> <h4>" + innerContent.h4 +
                    "</h4><p>" + innerContent.contents[0] + "</p></div>";
                i++;
            } else {
                clearInterval(intv);
            }
        }, 400);
    };
var groups_of_items = document.getElementsByClassName("items-paragraphs"),
    titlesOfPlays = document.getElementById("contentlist").getElementsByTagName("H2"),
    itemsAboutCharacters = [];
for (var runItems = 0; runItems < groups_of_items.length; runItems++) { // пробег по groups_of_items
    groups_of_items[runItems].style.display = "none";
    itemsAboutCharacters[runItems] = groups_of_items[runItems].getElementsByTagName("P")[0];
    itemsAboutCharacters[runItems].onmouseover = function () {
        this.classList.add("mouseOnItem2");
    };
    itemsAboutCharacters[runItems].onmouseout = function () {
        this.classList.remove("mouseOnItem2");
    }
}
for (var runtitles = 0; runtitles < titlesOfPlays.length; runtitles++) {
    titlesOfPlays[runtitles].onmouseover = function () {
        this.classList.add("mouseOnItem1");
    };
    titlesOfPlays[runtitles].onmouseout = function () {
        this.classList.remove("mouseOnItem1");
    };
}
function loadAboutCharacters(play, about_characters) {
    if (roleslist.innerHTML != "") {
        roleslist.innerHTML = "";
    }
    text.innerHTML = "<h2>About Characters</h2>" + "<p>" + play['about_characters'] + "</p>";
    /*if (play['about_characters'].length > 1) {
        //alert(play['about_characters'].length);
        text.innerHTML+="<p>"+play['about_characters'][1]+"</p>";
    } */
}
function regularVisibility(indexOfItemsGroup) {
    var vis_of_items = groups_of_items[indexOfItemsGroup].style.display;
    switch (vis_of_items) {
        case "none":
            groups_of_items[indexOfItemsGroup].style.display = "block";
            break;
        case "block":
            groups_of_items[indexOfItemsGroup].style.display = "none";
            break;
    }
}
function showPlay(indexOfItemsGroup, replics) {
    regularVisibility(indexOfItemsGroup);
    for (var part in replics) {
        if (part != "about_characters") {
            document.getElementById(part).onmouseover = function getStylesForItem2() {
                this.classList.add("mouseOnItem2");
            };
            document.getElementById(part).onmouseout = function looseStylesForItem2() {
                this.classList.remove("mouseOnItem2");
            };
            document.getElementById(part).onclick = function () // назначается обработчик события -- ВНУТРИ ЦИКЛА!
            {   // выполняется функция, привязанная к обработчику события -- ПОСЛЕ ВЫПОЛНЕНИЯ ЦИКЛА!!!
                //console.log({id:this.id, part:this.id});
                var replics_of_choicedpart = {}, // реплики выбранной части.
                    innerContent, contentlist = document.getElementById("contentlist");
                var presrolesobject = {}, presrolesarray = [];
                area_forcontent.style.borderLeft = "3px solid #345693";
                contentlist.style.borderRight = "none";
                roleslist.innerHTML = "<strong>There are the following characters in this part:</strong>";
                var number = this.id.substring(4);
                if (indexOfItemsGroup > 0) {
                    number = parseInt(number);
                }
                text.innerText = "";
                text.innerHTML = "<h2>" + "Part " + number + "<span id = \"title_of_episode\">" + headers[this.id] + "</span>" + "</h2>";
                replics_of_choicedpart.authorwords = []; // Для объектов со свойствами реплик
                replics_of_choicedpart.wordsofchar = [];
                replics_of_choicedpart.authorwords_divs = []; // Divs, выведенные на страницу при клике по part,
                replics_of_choicedpart.replicsofchar_divs = []; //содержащие в себе реплики
                for (var index in replics[this.id]) { // пробег по partn (replics[this.id]) от arrayElementObject
                    // (реплики одного героя) к arrayElementObject(реплике другого героя) replics[this.id][index] - реплика
                    arrayElementObject = replics[this.id][index]; // реплика героя: {}
                    //console.log({arrayElementObject: arrayElementObject});
                    subjectName = Object.keys(arrayElementObject)[0]; // ключ (единственный) из объекта arrayElementObject:
                    // image, author или наименование героя.
                    if (subjectName == "image") {
                        text.innerHTML += arrayElementObject[subjectName];
                    }
                    else {
                        if (!(subjectName in presrolesobject) && subjectName.indexOf('&') < 0 && subjectName.indexOf('letter') < 0) {
                            presrolesobject[subjectName] = true;
                            presrolesarray.push(subjectName);
                            if (subjectName == "Snake") {
                                roleslist.innerHTML += "<p><input type='checkbox' class='checkcharacter'><span id='Snake'>"+
                                    subjectName + "</span></p>";
                            }
                            else {roleslist.innerHTML += "<p><input type='checkbox' class='checkcharacter'>"
                                + subjectName + "</p>";
                            }
                        }
                        if (subjectName == "Author's words") {
                            className = 'authorwords';
                        } else {
                            className = 'words_of_char';
                        }
                        // innerContent получает очередной объект innerContent. В функции этот объект добавляется в
                        // replics_of_choicedpart.authorwords  или replics_of_choicedpart.wordsofchar.
                        innerContent = setContents(replics_of_choicedpart, [arrayElementObject[subjectName]], subjectName, className);
                        //console.log('innerContent', innerContent);
                        addInnerHtml(text, innerContent, replics, replics[part]); // В содержимое элемента text добавляется innerContent, судя по содержанию.
                        console.log({
                            className: className,
                            subjectName: subjectName,
                            '[arrayElementObject[subjectName]': arrayElementObject[subjectName],
                            replics_of_choicedpart: replics_of_choicedpart,
                            text: text
                        });
                    }
                }
                if (number=="16") {
                   var SnakeRole = document.getElementById("Snake");
                    if (SnakeRole !== null) {
                        SnakeRole.innerText+=" (Woman-devil)";
                    }
                }
                roleslist.innerHTML += '<div><input id="paintreplics" type="button" value="paint replics"></div>';
                checkboxes = document.getElementsByClassName("checkcharacter");
                replics_of_choicedpart.authorreplics_divs = document.getElementsByClassName("authorwords");
                replics_of_choicedpart.replicsofchar_divs = document.getElementsByClassName("words_of_char");
                document.getElementById("paintreplics").onclick = function () {
                    var rundivs, name_in_h4, name_in_checkbox, checkedroles = {},
                        length_of_checks = checkboxes.length,
                        length_authorwords = replics_of_choicedpart['authorwords'].length,
                        length_charwords = replics_of_choicedpart['wordsofchar'].length;
                    // Пробег по списку чекбоксов
                    for (var runchecks = 0; runchecks < length_of_checks; runchecks++) {
                        name_in_checkbox = presrolesarray[runchecks];
                        if (checkboxes[runchecks].checked) {
                            checkedroles[name_in_checkbox] = true;
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
                                    console.log(' name_in_h4 = ' + name_in_h4);
                                    if (name_in_h4.indexOf(name_in_checkbox) > -1) {
                                        replics_of_choicedpart.replicsofchar_divs[rundivs].classList.add("paintedreplicsofchar");
                                    }
                                }
                            }
                        }
                        else { // Если элемент не чекнут в этом клике
                            if (name_in_checkbox == "Author's words") {
                                for (rundivs = 0; rundivs < length_authorwords; rundivs++) {
                                    if (replics_of_choicedpart.authorreplics_divs[rundivs].classList.contains("paintedauthorreplics")) {
                                        replics_of_choicedpart.authorreplics_divs[rundivs].classList.remove("paintedauthorreplics");
                                    }
                                }
                            }
                            else {
                                for (rundivs = 0; rundivs < length_charwords; rundivs++) {
                                    name_in_h4 = replics_of_choicedpart.replicsofchar_divs[rundivs].getElementsByTagName('H4')[0].innerText;
                                    if (name_in_h4.indexOf(" &") == -1) {
                                        if (name_in_h4.indexOf(name_in_checkbox) >= 0) {
                                            if (replics_of_choicedpart.replicsofchar_divs[rundivs].classList.contains("paintedreplicsofchar")) {
                                                replics_of_choicedpart.replicsofchar_divs[rundivs].classList.remove("paintedreplicsofchar");
                                            }
                                        }
                                    }
                                    else {

                                        var names_in_con = name_in_h4.split(" & ");
                                        for (var runNames_in_con = 0; runNames_in_con < names_in_con.length; runNames_in_con++) {
                                            if (names_in_con[runNames_in_con] in checkedroles) {
                                                break;
                                            }
                                        }
                                        if (runNames_in_con == names_in_con.length) {
                                            if (replics_of_choicedpart.replicsofchar_divs[rundivs].classList.contains("paintedreplicsofchar")) {
                                                replics_of_choicedpart.replicsofchar_divs[rundivs].classList.remove("paintedreplicsofchar");
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                //  }

            }
        }

    }
}



