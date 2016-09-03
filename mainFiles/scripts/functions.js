/**
 * Created by User on 26.08.2016.
 */
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
    return innerContent;
};
addInnerHtml = function (html, innerContent) {
    html.innerHTML += "<div class='" + innerContent.class + "'> <h4>" + innerContent.h4 +
        "</h4><p>" + innerContent.contents[0] + "</p></div>";

};

var handleJson = {
    Extradecomposers: {
        path: 'mainFiles/jsons/special_scavengers.json',
        handle: function (data) {
            //console.log('initUI: ', data);
            contentlist.style.display = "none";
            rightHalf.style.display = "none";
            setComponentsOfBeginning('Extradecomposers');
            setTimeout(function () {
                $("#beginning").fadeIn(2400);
            }, 1800);
            this.data = data;
        },
        setColor: function(){
            body.setAttribute('id', 'backgroundForSpecScavengers');
            contentlist.style.backgroundColor = "rgba(0, 087, 990, 0.30)";
        },
        data:null,
        buttonText: 'Extra-decomposers'
    },
    Black_agent: {
        path: 'mainFiles/jsons/black_agent.json',
        handle: function (data) {
            console.log('Black agent works!');
            this.data = data;
        },
        setColor: function(){
            if (body.hasAttribute('id')) {
                body.removeAttribute('id');
            }
            //body.style.backgroundColor="#0B2161";
            contentlist.style.backgroundColor = "rgba(0.1, 0.1, 0.2, 0.25)";
        },
        data:null,
        buttonText: 'Black_agent'

    }
};

function handleData(key) { // Extradecomposers, Black_agent - то же в jsons;
// Извлечь файл json и сохранить в эти переменные объекты, которые находятся в этом файле.
// 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
// 2. Конфигурируем его: GET-запрос на URL 'special_scavengers.json'
    xhr.open('GET', handleJson[key].path);//path
// 3. Отсылаем запрос
    xhr.send();
    xhr.onload = function () {
        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            // обработать ошибку
            console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
        } else {
            var data = JSON.parse(xhr.responseText);
            window[key] = data[key];//Extradecomposers, Black_agent;
            /*if(key=='Extradecomposers'){
             console.log({
             Extradecomposers:Extradecomposers,
             windowExtradecomposers:window['Extradecomposers'],
             key: key,
             dataKey: data[key]
             });
             }else{
             console.log({
             Black_agent:Black_agent,
             windowBlack_agent:window['Black_agent']
             });
             }*/
            //black_agent = data.Black_agent;
            handleJson[key].handle(data); //
        }
    };
    xhr.onerror = function (event) {
        console.log(event);
    };
}
function fakeFunction(data) {
    console.log('Fake: ', data);
}
function setComponentsOfBeginning(playName) {
    console.trace('playName:', playName);
    /*if (playName == "Extradecomposers") {
        playName = Extradecomposers;
        console.log('Condition is applied, playName: ', playName);
    }*/

    var componentsOfBeginning = handleJson[playName].data;
        // playName["onTheBeginning"];
    mainImage.innerHTML = "<h2>" + componentsOfBeginning["header"] + "</h2>" + componentsOfBeginning["images"][0];
    littleImages.innerHTML = componentsOfBeginning["images"][0];
    document.getElementById("preview").getElementsByTagName("P")[0].innerText = componentsOfBeginning["text"];
    for (var addLittleImages = 1; addLittleImages < componentsOfBeginning["images"].length; addLittleImages++) {
        littleImages.innerHTML += componentsOfBeginning["images"][addLittleImages];
    }
    changeMainImage();
}
function changeMainImage() {
    var arrayOfLittleImages = littleImages.getElementsByTagName("Img");
    for (var runLittleImages = 0; runLittleImages < arrayOfLittleImages.length; runLittleImages++) {
        arrayOfLittleImages[runLittleImages].onmouseover = function () {
            mainImage.getElementsByTagName("Img")[0].src = this.src;
        }
    }
}

function setButtons() {
    var btn, btnText, buttonsPace = getButtonsContainer();
    for (var field in handleJson) {
        btn = document.createElement('button');
        btn.dataset['source']=field;
        btnText = document.createTextNode(handleJson[field].buttonText);
        btn.onclick = function () {
            console.log('this bnt:', this);
            moveActive(this);
        };
        buttonsPace.appendChild(btn);
    }
}

function getButtonsContainer(){
    return document.getElementById("preview_and_enter");
}

function moveActive(button) {
    var chosenPlay = button.getAttribute('data-source');
    /*switch (button) {
        case buttonsToChoiceOrChangePlays[0]:
            otherElement = buttonsToChoiceOrChangePlays[1];
            chosenPlay = Extradecomposers;
            break;
        case buttonsToChoiceOrChangePlays[1]:
            otherElement = buttonsToChoiceOrChangePlays[0];
            chosenPlay = black_agent;
            break;
    }

    */
    /*button.setAttribute("disabled", "true");
    button.classList.add("disabledButton");
    if (otherElement.hasAttribute("disabled")) {
        otherElement.removeAttribute("disabled");
    }
    if (otherElement.classList.contains("disabledButton")) {
        otherElement.classList.remove("disabledButton");
    }*/
    if (beginning.style.display !== "none") { // когда была кликнута одна из кнопок на заставке
        //alert(chosenPlay===undefined);

        setComponentsOfBeginning(chosenPlay);
        openGates();
        document.getElementById("buttonsToEnter2").innerHTML = getButtonsContainer().getElementsByTagName('button');
            // setColors(chosenPlay);
        addButtonsForRechoice(chosenPlay);
    }
    /*else { // когда была кликнута одна из кнопок в contentList
     // setColors(chosenPlay);
     }*/
    addPartsToContentList(chosenPlay);
    loadAboutCharacters(chosenPlay);
    handleJson[chosenPlay].setColors();
    header.innerHTML = chosenPlay["headerLogotip"];
}
function openGates() {
    setTimeout(function () {
        document.getElementById("instruction").innerHTML = '<p>Открыто!</p>' +
            '<img id="gates" src="images/на%20заставку/открытые%20ворота.jpg">';
        document.getElementById("gates").onmouseover = function () {
            beginning.style.display = "none";
            contentlist.style.display = "block";
            rightHalf.style.display = "block";
            contentlist.style.borderRight = "3px solid #345693";
        };
    }, 3200);
}
/*function addButtonsForRechoice(choicedPlays) {
    document.getElementById("buttonsToEnter2").innerHTML = "<button id='enterExD2'>Extra-decomposers</button>" +
        "<button id='enterBlackAgent2'>Black agent</button>";
    var buttonsToChoicePlays2 = document.getElementById("buttonsToEnter2").getElementsByTagName("Button");
    setButtons(buttonsToChoicePlays2);
}*/
/*function setColors(playName) {
    switch (playName) {
        case Extradecomposers:
            body.setAttribute('id', 'backgroundForSpecScavengers');
            contentlist.style.backgroundColor = "rgba(0, 087, 990, 0.30)";
            break;
        case black_agent:
            if (body.hasAttribute('id')) {
                body.removeAttribute('id');
            }
            //body.style.backgroundColor="#0B2161";
            contentlist.style.backgroundColor = "rgba(0.1, 0.1, 0.2, 0.25)";
            break;
    }
}*/

function addPartsToContentList(playName) {
    var chosenPlay = handleJson[playName].data,
        listOfParts = document.getElementById("listOfParts");
    if (listOfParts.innerHTML != "") {
        listOfParts.innerHTML = "";
    }
    for (var part in chosenPlay["Parts"]) {
        listOfParts.innerHTML += "<p id='" + part + "'>" + part + "</p>";
    }
    listOfParts.innerHTML += "<p id='about_characters'>About characters</p>";
    setClickToLoadPart(chosenPlay);
}

function loadAboutCharacters(playName) {
    if (contentlist.style.borderRight == "") {
        contentlist.style.borderRight = "3px solid #345693";
        rightHalf.style.borderLeft = "none";
    }
    mainArea.innerHTML = "<h2>About Characters</h2>";
    for (var addPartAboutCharacters = 0; addPartAboutCharacters < handleJson[playName]['About characters'].length; addPartAboutCharacters++) {
        mainArea.innerHTML += "<p>" + playName['About characters'][addPartAboutCharacters] + "</p>";
    }
}
/**
 *
 * @param part
 * @param playName
 */
function setClickToLoadPart(playName) {
    var parts_with_numbers = Object.keys(playName["Parts"]);
    var curPart, countClicks = 0;
    for (var part in handleJson[playName]["Parts"]) {
        // Part 1, Part 2
        // Избавиться от id id содержащих пробелов
        curPart = document.getElementById(part);
        curPart.onmouseover = function() {
            this.classList.add("mouseOnItem2");
        };
        curPart.onmouseout = function() {
            this.classList.remove("mouseOnItem2");
        };

        curPart.onclick = function () // назначается обработчик события -- ВНУТРИ ЦИКЛА!
        {
            countClicks++;
            var PartNumber = this.id, countPlay = parts_with_numbers.indexOf(PartNumber);
            if (contentlist.style.borderRight != "") {
                contentlist.style.borderRight = "";
                rightHalf.style.borderLeft = "3px solid #345693";
            }
            if (countClicks == 1) { //  Если клик первый, то элементы добавляются в html. Независимо от if
                // все эти элементы сохраняются в объект, и вызывается функция changePart, в которую передаются изменяемые
                // элементы этого объекта
                if (!(rightHalf.classList.contains("addStylesForContent"))) {
                    rightHalf.classList.add("addStylesForContent");
                }
                document.getElementById("mainArea").innerHTML = "<div id='toChooseRoles'></div>" +
                    "<div id='top_of_play'></div><div id='content_of_play'></div>";
                document.getElementById("toChooseRoles").innerHTML = "<h4>There are the following characters in this part:</h4>" +
                    "<div id='listOfCheckboxes'></div><div><input id='paintreplics' type='button' value='paint roles'></div>";
                document.getElementById("top_of_play").innerHTML = "<div><h2 id='headerForPart'></h2></div>"
                    + "<div id='buttons'><input type='button' value='<' id='scrollBack'>" +
                    "<input type='button' value='>' id='scrollFront'>" +
                    "<input type='button' id='paintWordsFromVocab'></div>";
            }
            var addedHTMLToContainPart = {};
            addedHTMLToContainPart.toChooseRoles = document.getElementById("toChooseRoles");
            addedHTMLToContainPart.toChooseRoles.listOfCheckboxes = document.getElementById("listOfCheckboxes");
            addedHTMLToContainPart.top_of_play = document.getElementById("top_of_play");
            addedHTMLToContainPart.top_of_play.titleOfPart = document.getElementById("headerForPart");
            addedHTMLToContainPart.content_of_play = document.getElementById("content_of_play");
            changePart(PartNumber, playName, addedHTMLToContainPart); // добавка реплик какой-то части в content_of_play
            // var countPlay = parts_with_numbers.indexOf(PartNumber); // числовой индекс этой part m.n
            // при клике по кнопке назад PartNumber не изменяется countPlay - изменяются
            document.getElementById("scrollBack").onclick = function () {
                if (countPlay == 1) {
                    countPlay = parts_with_numbers.length - 1;
                }
                else {
                    countPlay--;
                }
                PartNumber = parts_with_numbers[countPlay];
                //   alert("Перед вызовом: PartNumber = "+PartNumber+" countPlay = "+countPlay);
                // commonCodeFor2arrows(PartNumber, countPlay, playName, content_of_play);
                changePart(PartNumber, playName, addedHTMLToContainPart);
            };
            document.getElementById("scrollFront").onclick = function () {
                if (countPlay == parts_with_numbers.length - 1) {
                    countPlay = 1;
                }
                else {
                    countPlay++;
                }
                PartNumber = parts_with_numbers[countPlay];
                changePart(PartNumber, playName, addedHTMLToContainPart);
                //alert("Перед вызовом: PartNumber = "+PartNumber+" countPlay = "+countPlay);
                // commonCodeFor2arrows(PartNumber, countPlay, playName, content_of_play);

            };
            var wordsfromVocabulary = document.getElementsByClassName("from_vocabulary");
            document.getElementById("paintWordsFromVocab").onclick = function () {
                for (var runWords = 0; runWords < wordsfromVocabulary.length; runWords++) {
                    wordsfromVocabulary[runWords].classList.toggle("paintedWordsFromVocabulary");
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
                                if ((name_in_checkbox == "Beatrix") && (name_in_h4 == "Being")) {
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
                                    if ((name_in_checkbox == "Beatrix") && (name_in_h4 == "Being")) {
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
        };
    }
    curPart = document.getElementById("about_characters");
    curPart.onmouseover = function getStylesForItem2() {
        this.classList.add("mouseOnItem2");
    };
    curPart.onmouseout = function looseStylesForItem2() {
        this.classList.remove("mouseOnItem2");
    };
    curPart.onclick = function () {
        countClicks = 0;
        loadAboutCharacters(playName);
    };
}
function changePart(idOfPlay, chosenPlay, addedHTMLToContainPart) { // idOfPlay = "Part номер"
    presrolesobject = {};
    presrolesarray = [];
    replics_of_choicedpart.authorwords = [];
    replics_of_choicedpart.wordsofchar = [];
    addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML = "";
    addedHTMLToContainPart.top_of_play.titleOfPart.innerText = idOfPlay + " " + chosenPlay.headers[idOfPlay];
    addedHTMLToContainPart.content_of_play.innerHTML = "";
    for (var index in handleJson[chosenPlay]["Parts"][idOfPlay]) { // chosenPlay["Parts"][idOfPlay] - part,
        // chosenPlay["Parts"][idOfPlay][index] - объект-реплика
        arrayElementObject =handleJson[chosenPlay]["Parts"][idOfPlay][index]; // реплика героя: {}
        subjectName = Object.keys(arrayElementObject)[0]; // ключ (единственный) из объекта arrayElementObject:
        if (subjectName == "image") {
            addedHTMLToContainPart.content_of_play.innerHTML += arrayElementObject[subjectName];
        }
        else {
            if (!(subjectName in presrolesobject) && subjectName !== "Being" && subjectName.indexOf(' &') < 0 &&
                subjectName.indexOf("as answer") < 0) {
                presrolesobject[subjectName] = true;
                presrolesarray.push(subjectName);
                switch (subjectName) {
                    case "Snake":
                        addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML +=
                            "<p><input type='checkbox' class='checkcharacter'>" + subjectName + " (Woman-devil)</p>";
                        break;
                    case "Mrs Jakins":
                        addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML +=
                            "<p><input type='checkbox' class='checkcharacter'>" + subjectName + " (Christian's grandma)</p>";
                        break;
                    default:
                        if ((idOfPlay == "Part 1.2") && (subjectName == "Beatrix")) {
                            addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML +=
                                "<p><input type='checkbox' class='checkcharacter'>" + subjectName +
                                " (a new unfamiliar creature)</p>";
                        }
                        else {
                            addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML +=
                                "<p><input type='checkbox' class='checkcharacter'>" + subjectName + "</p>";
                        }
                }
            }
            if (subjectName == "Author's words") {
                className = 'authorwords';
            } else {
                className = 'words_of_char';
            }
            innerContent = setContents(replics_of_choicedpart, [arrayElementObject[subjectName]], subjectName, className);
            /*При первом клике по part content_of_play существует, при последующих - нет*/
            // alert(content_of_play === undefined);
            addInnerHtml(addedHTMLToContainPart.content_of_play, innerContent); // В содержимое элемента text добавляется innerContent, судя по содержанию.
        }
    }
}
/*function commonCodeFor2arrows (PartNumber, countPlay, choicedPlays, content_of_play) {
 PartNumber = parts_with_numbers[countPlay];
 document.getElementById("headerForPart").innerText = PartNumber + " " + choicedPlays.headers[PartNumber];
 content_of_play.innerHTML = "";
 document.getElementById("listOfCheckboxes").innerHTML = "";
 changePart(PartNumber, choicedPlays, content_of_play);
 }*/