// Щелкнуть на вкладке > move to opposite group
var Extradecomposers, maniac, headers;
var contentlist = document.getElementById("contentlist"), toChooseRoles = document.getElementById("toChooseRoles"),
    area_forcontent = document.getElementById("for_content"),
    text = document.getElementById("text"),
    groups_of_items = document.getElementsByClassName("items-paragraphs"),
    titlesOfPlays = document.getElementById("contentlist").getElementsByTagName("H2"),
    listOfCheckboxes,
    arrayElementObject, checkboxes = [], replics_of_choicedpart={}, parts_with_numbers =[],
    subjectName, className, itemsAboutCharacters = [], presrolesobject = {},
    presrolesarray = [];
    setContents = function (replics_of_choicedpart, contents, subjectName, className) {
        var innerContent = {
            class: className,
            h4: subjectName,
            contents: contents // слова героя
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
    };
    addInnerHtml = function (html, innerContent) {
        html.innerHTML += "<div class='" + innerContent.class + "'> <h4>" + innerContent.h4 +
            "</h4><p>" + innerContent.contents[0] + "</p></div>";

    };
// Извлечь файл json и сохранить в эти переменные объекты, которые находятся в этом файле.
// 1. Создаём новый объект XMLHttpRequest
var xhr = new XMLHttpRequest();
// 2. Конфигурируем его: GET-запрос на URL 'replicsobjects.json'
xhr.open('GET', 'HTML/replicsobjects.json');
// 3. Отсылаем запрос
xhr.send();
xhr.onload = function () {
    //console.log('%c console.log', 'background-color:yellow');
    //console.info('%c console.info', 'color:blue'); // Ctrl+D --скопировать строку без выделения ниже (курсор должен быть на строке)
    //console.warn('console.warn'); // Ctrl+ ↑, ↓ -- переместить строку вверх/вниз (курсор должен быть на строке)
    //console.error('console.error');
    // 4. Если код ответа сервера не 200, то это ошибка
    if (xhr.status != 200) {
        // обработать ошибку
        console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found

    } else {
        var data = JSON.parse(xhr.responseText);
        Extradecomposers = data.ExtraDecomposers;
        maniac = data.Maniac;
        headers = data.headers;
        text.innerHTML="<h2>About characters</h2><p>"+Extradecomposers["about_characters"]+"</p>";
        // вывести результат
        // responseText -- текст ответа.
    }
};
xhr.onerror = function(event){
    console.log(event);
};
contentlist.style.borderRight="3px solid #345693";
contentlist.style.height="530px";
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
    if (toChooseRoles.innerHTML != "") {
        toChooseRoles.innerHTML = "";
    }
    if(contentlist.style.borderRight=="") {
        contentlist.style.borderRight="3px solid #345693";
        area_forcontent.style.borderLeft="none";
    }
    text.innerHTML = "<h2>About Characters</h2>" + "<p>" + play['about_characters'] + "</p>";
}
function regularVisibility(indexOfItemsGroup) {
    var vis_of_items = groups_of_items[indexOfItemsGroup].style.display;
    switch (vis_of_items) {
        case "none":
            groups_of_items[indexOfItemsGroup].style.display = "block";
            if (indexOfItemsGroup==0) {
                contentlist.style.height="";
            }
            break;
        case "block":
            groups_of_items[indexOfItemsGroup].style.display = "none";
            break;
    }
}

function loadPart (idOfPlay, replics, content_of_play) {
    presrolesobject={}; presrolesarray=[];
    listOfCheckboxes = document.getElementById("listOfCheckboxes");
    replics_of_choicedpart.authorwords = []; // Для объектов со свойствами реплик
    replics_of_choicedpart.wordsofchar = [];
    for (var index in replics[idOfPlay]) { // replics[this.id] - part, replics[this.id][index] - объект-реплика
        arrayElementObject = replics[idOfPlay][index]; // реплика героя: {}
        //console.log({arrayElementObject: arrayElementObject});
        subjectName = Object.keys(arrayElementObject)[0]; // ключ (единственный) из объекта arrayElementObject:
        // Добавка каждой реплики в text:
        if (subjectName == "image") {
            content_of_play.innerHTML += arrayElementObject[subjectName];
        }
        else {
            if (!(subjectName in presrolesobject) && subjectName.indexOf(' &') < 0 && subjectName.indexOf("as answer") < 0) {
                presrolesobject[subjectName] = true;
                presrolesarray.push(subjectName);
                switch (subjectName) {
                    case "Snake":
                        listOfCheckboxes.innerHTML += "<p><input type='checkbox' class='checkcharacter'>"+
                            subjectName + " (Woman-devil)</p>";
                        break;
                    case "Mrs Jakins":
                        listOfCheckboxes.innerHTML += "<p><input type='checkbox' class='checkcharacter'>" + subjectName+" (Christian's grandma)</p>";
                        break;
                    case "Mr Jakins":
                        listOfCheckboxes.innerHTML +="<p><input type='checkbox' class='checkcharacter'>" + subjectName+" (Christian's grandpa)</p>";
                        break;
                    default:
                        listOfCheckboxes.innerHTML += "<p><input type='checkbox' class='checkcharacter'>" + subjectName+"</p>";
                }
            }
            if (subjectName == "Author's words") {
                className = 'authorwords';
            } else {
                className = 'words_of_char';
            }
            innerContent = setContents(replics_of_choicedpart, [arrayElementObject[subjectName]], subjectName, className);
            addInnerHtml(content_of_play, innerContent); // В содержимое элемента text добавляется innerContent, судя по содержанию.
        }
    }
}
function commonCodeFor2arrows (PartNumber, countPlay, replics, content_of_play) {
    PartNumber = parts_with_numbers[countPlay];
    document.getElementById("headerForPlay").innerText = PartNumber + " " + headers[PartNumber];
    content_of_play.innerHTML = "";
    document.getElementById("listOfCheckboxes").innerHTML = "";
    loadPart(PartNumber, replics, content_of_play);
   // alert("В теле: PartNumber = "+PartNumber+" countPlay = "+countPlay);
}
function showPlay(indexOfItemsGroup, replics) {
    regularVisibility(indexOfItemsGroup);
    parts_with_numbers = Object.keys(replics);
    for (var part in replics) {
        if (part != "about_characters") {
            document.getElementById(part).onmouseover = function getStylesForItem2() {
                this.classList.add("mouseOnItem2");
            };
            document.getElementById(part).onmouseout = function looseStylesForItem2() {
                this.classList.remove("mouseOnItem2");
            };
            document.getElementById(part).onclick = function () // назначается обработчик события -- ВНУТРИ ЦИКЛА!
            {
                if (!(area_forcontent.classList.contains("addStylesForContent"))) {
                    area_forcontent.classList.add("addStylesForContent");
                    contentlist.style.borderRight = "none";
                }
                toChooseRoles.style.backgroundColor="rgba(11, 82, 97, 0.25)";
                toChooseRoles.innerHTML = "<h4>There are the following characters in this part:</h4>"+
                "<div id='listOfCheckboxes'></div>";
                text.innerHTML = "<div id='top_of_play'></div><div id='content_of_play'></div>";
                var top_of_play = document.getElementById("top_of_play"), content_of_play = document.getElementById("content_of_play");
                top_of_play.innerHTML = "<div><h2 id='headerForPlay'>" + this.id + " " + headers[this.id] + "</h2></div>" +
                    "<div id='buttons'><input type='button' value='<' id='scrollBack'><input type='button' value='>' id='scrollFront'>" +
                    "<input type='button' id='paintWordsFromVocab'></div>";
                if (contentlist.style.borderRight != "") {
                    contentlist.style.borderRight = "";
                    area_forcontent.style.borderLeft = "3px solid #345693";
                }
              var idOfPlay=this.id;
              loadPart(idOfPlay, replics, content_of_play);
                toChooseRoles.innerHTML += '<div><input id="paintreplics" type="button" value="paint replics"></div>';
                var PartNumber = this.id, // part m.n
                    countPlay = parts_with_numbers.indexOf(PartNumber); // числовой индекс этой part m.n
                // при клике по кнопке назад PartNumber не изменяется countPlay - изменяются
                document.getElementById("scrollBack").onclick = function () {
                    if (countPlay == 1) {
                        countPlay = parts_with_numbers.length - 1;
                    }
                    else {
                        countPlay--;
                    }
                    //   alert("Перед вызовом: PartNumber = "+PartNumber+" countPlay = "+countPlay);
                    commonCodeFor2arrows(PartNumber, countPlay, replics, content_of_play);

                };
                    document.getElementById("scrollFront").onclick = function () {
                        if (countPlay == parts_with_numbers.length - 1) {
                            countPlay = 1;
                        }
                        else {
                            countPlay++;
                        }
                        PartNumber = parts_with_numbers[countPlay];
                        //alert("Перед вызовом: PartNumber = "+PartNumber+" countPlay = "+countPlay);
                        commonCodeFor2arrows(PartNumber, countPlay, replics, content_of_play);

               };
                    var fromVocabulary = document.getElementsByClassName("from_vocabulary");
                    document.getElementById("paintWordsFromVocab").onclick = function () {
                        for (var runWords = 0; runWords < fromVocabulary.length; runWords++) {
                            fromVocabulary[runWords].classList.toggle("paintedWordsFromVocabulary");
                        }
                    };
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
                    }

            }; // закрывается if, сразу выше должен закрываться onclick по part
        }

    }
}



