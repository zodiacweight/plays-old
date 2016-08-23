// Щелкнуть на вкладке > move to opposite group
var Extradecomposers, black_agent /*playsByDefault */;
//var playsByDefault = {name: "Kelly"};
var header = document.getElementById("header"),
    beginning = document.getElementById("beginning"),
    mainImage = document.getElementById("mainImage"),
    littleImages = document.getElementById("littleImages"),
    enter = document.getElementById("enter"),
    contentlist = document.getElementById("contentlist"), toChooseRoles = document.getElementById("toChooseRoles"),
    forLoadingPart = document.getElementById("forLoadingPart"),
    areaForPart = document.getElementById("areaForPart"),
    // groups_of_items = document.getElementsByClassName("items-paragraphs"),
    //titlesOfPlays = document.getElementById("contentlist").getElementsByTagName("H2"),
    listOfCheckboxes, arrayElementObject, checkboxes = [], replics_of_choicedpart={}, parts_with_numbers =[],
    subjectName, className, itemsAboutCharacters = [], presrolesobject = {}, /* buttonsToChoicePlays, */
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
        black_agent = data.Black_agent;
        // вывести результат
        // responseText -- текст ответа.
    }
};
xhr.onerror = function(event){
    console.log(event);
};
beginning.style.display="none";
contentlist.style.display="none";
forLoadingPart.style.display="none";
setTimeout(function() {
    beginning.style.display = "block";
}, 1000);
/*
setComponentsOfBiginningByDefault();
function setComponentsOfBiginningByDefault () {
}*/

window.onload = function () {
   var playsByDefault = Extradecomposers;
    //alert(playsByDefault===undefined);
    setComponentsOfBiginning(playsByDefault);
};
function setComponentsOfBiginning (choicedPlays) {
   mainImage.innerHTML = "<h2>"+choicedPlays["onTheBiginning"]["header"]+"</h2>"+choicedPlays["onTheBiginning"]["images"][0];
    littleImages.innerHTML=choicedPlays["onTheBiginning"]["images"][0];
    document.getElementById("preview").getElementsByTagName("P")[0].innerText=choicedPlays["onTheBiginning"]["text"];
    for (var addLittleImages=1; addLittleImages < choicedPlays["onTheBiginning"]["images"].length; addLittleImages++) {
        littleImages.innerHTML+=choicedPlays["onTheBiginning"]["images"][addLittleImages];
    }
    changeMainImage();
}
function changeMainImage () {
    var arrayOfLittleImages = littleImages.getElementsByTagName("Img");
    for (var runLittleImages=0; runLittleImages < arrayOfLittleImages.length;  runLittleImages++) {
        arrayOfLittleImages[runLittleImages].onmouseover = function () {
            mainImage.getElementsByTagName("Img")[0].src = this.src;
        }
    }
}
document.getElementById("how_to_open_plays").onclick = function () {
    document.getElementById("instruction").innerHTML='<p>Нажать на одну из кнопок и подождать, пока откроются ворота:</p>'+
    '<img src="images/на%20заставку/закрытые%20ворота.jpg">';
    document.getElementById("buttonsToEnter").innerHTML='<button id="enterExD1">'+
    'Extra-decomposers</button><button id="enterBlackAgent1">Black agent</button>';
  buttonsToChoicePlays = document.getElementById("preview_and_enter").getElementsByTagName("Button");
  var thisElement, otherElement, runbuts=0;
    setOnClick (buttonsToChoicePlays);
};
function setOnClick (buttonsToChoicePlays) {
    for (var k=0; k < 2; k++) {
        buttonsToChoicePlays[k].onclick=function() {
            var thisElement=this, otherElement;
            moveActive(thisElement, otherElement, buttonsToChoicePlays);
        };
    }

}
function moveActive (thisElement, otherElement, buttonsToChoiceOrChangePlays) {
    var choicedPlays;
    switch (thisElement) {
        case buttonsToChoiceOrChangePlays[0]:
            otherElement = buttonsToChoiceOrChangePlays[1];
            choicedPlays = Extradecomposers;
            break;
        case buttonsToChoiceOrChangePlays[1]:
            otherElement = buttonsToChoiceOrChangePlays[0];
            choicedPlays = black_agent;
            break;
    }
    thisElement.setAttribute("disabled", "true");
    if (otherElement.hasAttribute("disabled")) {
        otherElement.removeAttribute("disabled");
    }
    if (beginning.style.display!=="none") { // когда была кликнута одна из кнопок на заставке
      setComponentsOfBiginning(choicedPlays);
       openGates();
       addButtonsForRechoice(choicedPlays);
    }
    addPartsToContentList(choicedPlays);
    loadAboutCharacters(choicedPlays);
    header.innerHTML = "<h2>"+fillHeader(choicedPlays)+"</h2>";
}
function openGates () {
    setTimeout( function() {
        document.getElementById("instruction").innerHTML='<p>Открыто!</p>'+
            '<img id="gates" src="images/на%20заставку/открытые%20ворота.jpg">';
        document.getElementById("gates").onmouseover = function () {
            beginning.style.display="none";
            contentlist.style.display="block";
            forLoadingPart.style.display="block";
            contentlist.style.borderRight="3px solid #345693";
        };
    }, 3200);
}
function addButtonsForRechoice(choicedPlays) {
    document.getElementById("buttonsToEnter2").innerHTML="<button id='enterExD2'>Extra-decomposers</button>"+
        "<button id='enterBlackAgent2'>Black agent</button>";
    var buttonsToChoicePlays2 = document.getElementById("buttonsToEnter2").getElementsByTagName("Button");
    setOnClick(buttonsToChoicePlays2);
}
function addPartsToContentList(choicedPlays) {
    var listOfParts =  document.getElementById("listOfParts");
    if (listOfParts.innerHTML!="") {
        listOfParts.innerHTML="";
    }
    for (var part in choicedPlays) {
        if ((part.indexOf("Part")!==-1)) {
            listOfParts.innerHTML+="<p id='"+part+"'>"+part+"</p>";
        }
        if (part=="About characters") {
            listOfParts.innerHTML+="<p id='about_characters'>"+part+"</p>";
        }
    }
    //addButtonsForRechoice();
    //areaForPart.innerHTML="<h2>About characters</h2><p>"+choicedPlays["about_characters"]+"</p>";
    showPart(part, choicedPlays);
}
function loadAboutCharacters(play) {
    toChooseRoles.innerHTML = "";
    toChooseRoles.style.backgroundColor="";
   if(contentlist.style.borderRight=="") {
        contentlist.style.borderRight="3px solid #345693";
        forLoadingPart.style.borderLeft="none";
    }
    /* if(toChooseRoles.innerHTML!=="") {
        toChooseRoles.innerHTML="";
    } */
    areaForPart.innerHTML = "<h2>About Characters</h2>";
    for (var addPartAboutCharacters=0; addPartAboutCharacters <  play['About characters'].length; addPartAboutCharacters++) {
        areaForPart.innerHTML+="<p>" + play['About characters'][addPartAboutCharacters] + "</p>";
    }
}
function fillHeader(choicedPlays) {
    switch (choicedPlays) {
        case Extradecomposers:
            return "Extra-decomposers";
        case black_agent:
            return "Black agent";
    }
}
function showPart(part, choicedPlays) {
    parts_with_numbers = Object.keys(choicedPlays);
    var curPart;
    for (part in choicedPlays) {
        if (part.indexOf("Part")!==-1) {
            curPart=document.getElementById(part);
            curPart.onmouseover = function getStylesForItem2() {
                this.classList.add("mouseOnItem2");
            };
            curPart.onmouseout = function looseStylesForItem2() {
                this.classList.remove("mouseOnItem2");
            };
            curPart.onclick = function () // назначается обработчик события -- ВНУТРИ ЦИКЛА!
            {
                if(toChooseRoles.style.backgroundColor=="") {
                    toChooseRoles.style.backgroundColor="rgba(11, 82, 97, 0.25)";
                }
                if (!(forLoadingPart.classList.contains("addStylesForContent"))) {
                    forLoadingPart.classList.add("addStylesForContent");
                  //  contentlist.style.borderRight = "none";
                }
                toChooseRoles.innerHTML = "<h4>There are the following characters in this part:</h4>"+
                "<div id='listOfCheckboxes'></div>";
                areaForPart.innerHTML = "<div id='top_of_play'></div><div id='content_of_play'></div>";
                var top_of_play = document.getElementById("top_of_play"), content_of_play = document.getElementById("content_of_play");
                top_of_play.innerHTML = "<div><h2 id='headerForPlay'>" + this.id + " " + choicedPlays.headers[this.id] + "</h2></div>" +
                    "<div id='buttons'><input type='button' value='<' id='scrollBack'><input type='button' value='>' id='scrollFront'>" +
                    "<input type='button' id='paintWordsFromVocab'></div>";
                if (contentlist.style.borderRight != "") {
                    contentlist.style.borderRight = "";
                    forLoadingPart.style.borderLeft = "3px solid #345693";
                    // Действует только при клике по part
                }
              var idOfPlay=this.id;
              changePart(idOfPlay, choicedPlays, content_of_play);
                toChooseRoles.innerHTML += '<div><input id="paintreplics" type="button" value="paint choicedPlays"></div>';
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
                    commonCodeFor2arrows(PartNumber, countPlay, choicedPlays, content_of_play);

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
                        commonCodeFor2arrows(PartNumber, countPlay, choicedPlays, content_of_play);

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
        else { // если был сделан клик по "About characters"
            if (part=="About characters") {
                curPart=document.getElementById("about_characters");
                curPart.onmouseover = function getStylesForItem2() {
                    this.classList.add("mouseOnItem2");
                };
                curPart.onmouseout = function looseStylesForItem2() {
                    this.classList.remove("mouseOnItem2");
                };
                curPart.onclick=function () {
                    loadAboutCharacters(choicedPlays);
                };
            }
        }
    }
}
function changePart (idOfPlay, choicedPlays, content_of_play) {
    presrolesobject={}; presrolesarray=[];
    listOfCheckboxes = document.getElementById("listOfCheckboxes");
    replics_of_choicedpart.authorwords = []; // Для объектов со свойствами реплик
    replics_of_choicedpart.wordsofchar = [];
    for (var index in choicedPlays[idOfPlay]) { // choicedPlays[this.id] - part, choicedPlays[this.id][index] - объект-реплика
        arrayElementObject = choicedPlays[idOfPlay][index]; // реплика героя: {}
        //console.log({arrayElementObject: arrayElementObject});
        subjectName = Object.keys(arrayElementObject)[0]; // ключ (единственный) из объекта arrayElementObject:
        // Добавка каждой реплики в areaForPart:
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
function commonCodeFor2arrows (PartNumber, countPlay, choicedPlays, content_of_play) {
    PartNumber = parts_with_numbers[countPlay];
    document.getElementById("headerForPlay").innerText = PartNumber + " " + choicedPlays.headers[PartNumber];
    content_of_play.innerHTML = "";
    document.getElementById("listOfCheckboxes").innerHTML = "";
    changePart(PartNumber, choicedPlays, content_of_play);
}



