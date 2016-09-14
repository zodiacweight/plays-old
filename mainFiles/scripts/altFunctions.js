/**
 * Created by User on 26.08.2016.
 */
function handleData(key) { // key == 'Extradecomposers' или 'Black_agent'
// Извлечь файл json и сохранить в эти переменные объекты, которые находятся в этом файле.
// 1. Создаём новый объект XMLHttpRequest
    var xhr = new XMLHttpRequest();
// 2. Конфигурируем его: GET-запрос на URL 'special_scavengers.json'
    xhr.open('GET', handleJson[key].path);// путь к тому или иному json
// 3. Отсылаем запрос
    xhr.send();
    xhr.onload = function () {
        // 4. Если код ответа сервера не 200, то это ошибка
        if (xhr.status != 200) {
            // обработать ошибку
            console.log(xhr.status + ': ' + xhr.statusText); // пример вывода: 404: Not Found
        } else {
            var data = JSON.parse(xhr.responseText);
            window[key] = data[key];//Объект window['Extradecomposers'] или window['Black_agent'];
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
            handleJson[key].handle(data); // вызов функции handle, находящейся в объекте handleJson.
        }
    };
    xhr.onerror = function (event) {
        console.log(event);
    };
}
var handleJson = {
    Extradecomposers: {
        path: 'mainFiles/jsons/special_scavengers.json',
        handle: function (data) {
            this.data = data;
            //console.log('initUI: ', data);
            contentlist.style.display = "none";
            rightHalf.style.display = "none";
            setComponentsOfBeginning(Extradecomposers);
            //preview_and_enter.style.color = "mediumvioletred";
            main_in_preview.style.color = "mediumvioletred";
            how_to_open_plays.style.color = "mediumblue";
            setTimeout(function () {
                $("#beginning").fadeIn(2400);
            }, 1800);
        },
        /* setColor: function(){
         body.setAttribute('id', 'backgroundForSpecScavengers');
         //contentlist.style.backgroundColor = "rgba(0, 087, 990, 0.30)";
         }, */
        data:null,
        buttonText: 'Extra-decomposers'
    },
    Black_agent: {
        path: 'mainFiles/jsons/black_agent.json',
        handle: function (data) {
            this.data = data;
            console.log('Black agent works!');
        },
        /*setColor: function(){
         if (body.hasAttribute('id')) {
         body.removeAttribute('id');
         }
         //body.style.backgroundColor="#0B2161";
         //contentlist.style.backgroundColor = "rgba(0.1, 0.1, 0.2, 0.25)";
         }, */
        data:null,
        buttonText: 'Black_agent'

    }
};

function fakeFunction(data) {
    console.log('Fake: ', data);
}
function setComponentsOfBeginning (chosenPlay) {
    var componentsOfBeginning = chosenPlay['onTheBeginning']; //Black_agen: chosenPlay == undefined
    //header = document.getElementById("header"),
    document.getElementById("header").InnerText = chosenPlay['onTheBeginning'].header;
    //alert(header.InnerText);
    bigImage.innerHTML = componentsOfBeginning["images"][0];
    littleImages.innerHTML = componentsOfBeginning["images"][0];
    document.getElementById("main_in_preview").innerText = componentsOfBeginning["preview"];
    for (var addLittleImages = 1; addLittleImages < componentsOfBeginning["images"].length; addLittleImages++) {
        littleImages.innerHTML += componentsOfBeginning["images"][addLittleImages];
    }
    changeBigImageWithHeader();
    //alert(header.InnerText);
}
function changeBigImageWithHeader() {
    var arrayOfLittleImages = littleImages.getElementsByTagName("Img");
    for (var runLittleImages = 0; runLittleImages < arrayOfLittleImages.length; runLittleImages++) {
        arrayOfLittleImages[runLittleImages].onmouseover = function () {
            bigImage.getElementsByTagName("Img")[0].src = this.src;
        }
    }
}
// Устанавливаются кнопки для открытия ворот и входа
function setButtonsToEnter(DivForButtons, instruction) {
    var btn, btnText, arrayOfButtons=[];
    for (var field in handleJson) {
        btn = document.createElement('button'); // заносит в переменную btn значение: тег <button></button>
        btn.dataset['source']=field; // устанавливает атрибут data-source со значением field для btn. Текстовая строка.
        btnText = document.createTextNode(handleJson[field].buttonText);
        btn.appendChild(btnText);
        btn.onclick = function () {
            console.log('this bnt:', this);
            moveActive(this, arrayOfButtons, instruction);
        };
        arrayOfButtons.push(btn);
        DivForButtons.appendChild(btn);
    }
}

function moveActive(clickedButton, arrayOfButtons, instruction) {
    var nameOfPlay = clickedButton.getAttribute('data-source'); // строка - атрибут data-source из кнопки
    var chosenPlay = window[nameOfPlay];
    clickedButton.setAttribute("disabled", "true");
    clickedButton.classList.add("disabledButton");
    switch (clickedButton) {
        case arrayOfButtons[0]:
            otherElement = arrayOfButtons[1];
            break;
        case arrayOfButtons[1]:
            otherElement = arrayOfButtons[0];
            break;
    }
    if ((otherElement.hasAttribute("disabled"))&&(otherElement.classList.contains("disabledButton"))) {
        otherElement.removeAttribute("disabled");
        otherElement.classList.remove("disabledButton");
    }
    if (beginning.style.display !== "none") { // когда была кликнута одна из кнопок на заставке
        setComponentsOfBeginning(chosenPlay);
        openGates();
        var DivForButtonsToRechoice = document.getElementById("DivForButtonsToRechoice");
        //var arrayOfButtonsToRechoice = DivForButtonsToRechoice.getElementsByTagName("Button");
        if (DivForButtonsToRechoice.innerHTML=="") {
            setButtonsToEnter(DivForButtonsToRechoice/* , arrayOfButtonsToRechoice*/); // функция устанавливает кнопки в
            // ContentList
        }
    }
    addPartsToContentList(chosenPlay, nameOfPlay);
    loadAboutCharacters(chosenPlay);
    setColors(chosenPlay,  nameOfPlay, instruction);
    headerLogotip.innerHTML = chosenPlay["headerLogotip"];
}
function openGates() {
    setTimeout(function () {
        document.getElementById("instruction").innerText = 'Открыто!';
        document.getElementById('gate').src="images/на%20заставку/открытые%20ворота.jpg";
        document.getElementById("gate").onmouseover = function () {
            beginning.style.display = "none";
            contentlist.style.display = "block";
            rightHalf.style.display = "block";
            contentlist.style.borderRight = "3px solid";
        };
    }, 3200);
}

function setColors(chosenPlay,  nameOfPlay,  instruction) {
    switch (chosenPlay) {
        case Extradecomposers:
            if (beginning.style.display!=="none") {
                //preview_and_enter.style.color = "mediumvioletred";
                how_to_open_plays.style.color = "mediumblue";
                main_in_preview.style.color = "mediumvioletred";
                instruction.style.color = "#08088A";
            }
            rightHalf.style.color="black";
            contentlist.style.borderColor = "#345693";
            contentlist.style.backgroundColor="rgba(0, 087, 990, 0.30)";
            //alert("setColors вызвана!");
            break;
        case Black_agent:
            if (beginning.style.display!=="none") {
                //preview_and_enter.style.color = "#F5BCA9";
                how_to_open_plays.style.color = "#2ECCFA";
                main_in_preview.style.color = "#BCA9F5";
                //alert("setColors вызвана!");
                instruction.style.color = "#4B088A";
            }
            rightHalf.style.color="lightgoldenrodyellow";
            contentlist.style.borderColor = "lightblue";
            contentlist.style.backgroundColor="rgba(80, 00, FF, 0.25)";  /* #8000FF */
            break;
    }
    body.setAttribute("id", "backgroundFor"+nameOfPlay);
    if (body.hasAttribute("id")) {
        body.removeAttribute("id");
        body.setAttribute("id", "backgroundFor"+nameOfPlay);
    }

}

function addPartsToContentList(chosenPlay, nameOfPlay) {
    listOfParts = document.getElementById("listOfParts");
    if (listOfParts.innerHTML != "") {
        listOfParts.innerHTML = "";
    }
    for (var part in chosenPlay["Parts"]) {
        var numberOfPart = chosenPlay["Parts"][part]["number"];
        //  alert(chosenPlay["Parts"][part]["number"]);
        listOfParts.innerHTML += "<p id='Part" + numberOfPart + "'>Part " + numberOfPart  + "</p>";
    }
    listOfParts.innerHTML += "<p id='about_characters'>About characters</p>";
    //listOfParts.getElementsByTagName("P")[part].style.color = "#0B0B61";
    setClickToLoadPart(chosenPlay, nameOfPlay);
}

function loadAboutCharacters(chosenPlay) {
    if (contentlist.style.borderRight == "") {
        contentlist.style.borderRight = "3px solid";
        rightHalf.style.borderLeft = "none";
    }
    mainArea.innerHTML = "<h2>About Characters</h2>";
    for (var addPartAboutCharacters = 0; addPartAboutCharacters < chosenPlay['About characters'].length; addPartAboutCharacters++) {
        mainArea.innerHTML += "<p>" + chosenPlay['About characters'][addPartAboutCharacters] + "</p>";
    }
}
/**
 *
 * @param part
 * @param playName
 */
function setClickToLoadPart(chosenPlay,  nameOfPlay) { // PlayName и ChosenPlays должно быть равно объекту Extradecomposers или Black_agent
    var paragraphsInContentList = contentlist.getElementsByTagName("P"), parts_with_numbers = [];
    for (var runPars=0; runPars < paragraphsInContentList.length; runPars++) {
        if (paragraphsInContentList[runPars].innerText.indexOf("Part")==0) {
            if (parts_with_numbers.indexOf(paragraphsInContentList[runPars].innerText)==-1) {
                parts_with_numbers.push(paragraphsInContentList[runPars].innerText);
            }
        }
    }
    var curPart, countClicks = 0;
    for (var index_of_part in chosenPlay["Parts"]) {
        // Part 1, Part 2
        // Избавиться от id id содержащих пробелов
        curPart = paragraphsInContentList[index_of_part];
        curPart.onmouseover = function() {
            this.classList.add("mouseOnItem");
        };
        curPart.onmouseout = function() {
            this.classList.remove("mouseOnItem");
        };
        curPart.onclick = function () // назначается обработчик события -- ВНУТРИ ЦИКЛА!
        {
            countClicks++;
            var PartNumber = this.innerText; index_of_part = parts_with_numbers.indexOf(PartNumber);
            if (contentlist.style.borderRight != "") {
                contentlist.style.borderRight = "";
                rightHalf.style.borderLeft = "3px solid";
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
            changePart(PartNumber, index_of_part, chosenPlay, addedHTMLToContainPart); // добавка реплик какой-то части в content_of_play
            // при клике по кнопке назад PartNumber не изменяется index_of_part - изменяются
            document.getElementById("scrollBack").onclick = function () {
                if (index_of_part == 0) {
                    index_of_part = parts_with_numbers.length - 1;
                }
                else {
                    index_of_part--;
                }
                PartNumber = parts_with_numbers[index_of_part];
                changePart(PartNumber, index_of_part, chosenPlay, addedHTMLToContainPart);
            };
            document.getElementById("scrollFront").onclick = function () {
                if (index_of_part == parts_with_numbers.length - 1) {
                    index_of_part = 0;
                }
                else {
                    index_of_part++;
                }
                PartNumber = parts_with_numbers[index_of_part];
                changePart(PartNumber, index_of_part, chosenPlay, addedHTMLToContainPart);
            };
            var wordsfromVocabulary = document.getElementsByClassName("from_vocabulary");
            document.getElementById("paintWordsFromVocab").onclick = function () {
                for (var runWords = 0; runWords < wordsfromVocabulary.length; runWords++) {
                    wordsfromVocabulary[runWords].classList.toggle("paintedWordsFromVocabulary_"+nameOfPlay);
                }
            };
            checkboxes = document.getElementsByClassName("checkcharacter");
            replics_of_choicedpart.authorreplics_divs = document.getElementsByClassName("authorwords");
            replics_of_choicedpart.replicsofchar_divs = document.getElementsByClassName("words_of_char");
            document.getElementById("paintreplics").onclick = function () {
                var name_in_h4, nameInCheckbox, checkedRoles = {},
                    length_of_checks = checkboxes.length,
                    length_authorwords = replics_of_choicedpart['authorwords'].length,
                    length_charwords = replics_of_choicedpart['wordsofchar'].length;
                // Пробег по списку чекбоксов
                for (var runchecks = 0; runchecks < length_of_checks; runchecks++) {
                    // alert(runchecks);
                    nameInCheckbox = presRolesArray[runchecks];
                    if (checkboxes[runchecks].checked) {
                        checkedRoles[nameInCheckbox] = true;
                        if (presRolesArray[runchecks] == "Author's words") {
                            for (var rundivs = 0; rundivs < length_authorwords; rundivs++) {
                                if (!(replics_of_choicedpart.authorreplics_divs[rundivs].classList.contains("paintedAuthorReplics"))) {
                                    replics_of_choicedpart.authorreplics_divs[rundivs].classList.add("paintedAuthorReplics");
                                }
                            }
                        }
                        else {
                            for (var rundivs = 0; rundivs < length_charwords; rundivs++) {
                                name_in_h4 = replics_of_choicedpart.replicsofchar_divs[rundivs].getElementsByTagName('H4')[0].innerText;
                                console.log(' name_in_h4 = ' + name_in_h4);
                                if((PartNumber=="Part 1.17"&&name_in_h4==nameInCheckbox)||
                                    (PartNumber!=="Part 1.17"&&name_in_h4.indexOf(nameInCheckbox) >= 0)) {
                                    replics_of_choicedpart.replicsofchar_divs[rundivs].classList.add("paintedReplicsOfChar_"+nameOfPlay);
                                }
                                /*  if (PartNumber=="Part 1.17") {
                                 if (name_in_h4==nameInCheckbox) {
                                 replics_of_choicedpart.replicsofchar_divs[rundivs].classList.add("paintedReplicsOfChar_"+nameOfPlay); //
                                 }
                                 }
                                 else {
                                 if (name_in_h4.indexOf(nameInCheckbox) > -1) {
                                 replics_of_choicedpart.replicsofchar_divs[rundivs].classList.add("paintedReplicsOfChar_"+nameOfPlay); //
                                 }
                                 } */
                                if ((nameInCheckbox == "Beatrix") && (name_in_h4 == "Being")) {
                                    replics_of_choicedpart.replicsofchar_divs[rundivs].classList.add("paintedReplicsOfChar_"+nameOfPlay); //
                                }
                            }
                        }
                    }
                    else { // Если элемент не чекнут в этом клике \ \\\ |
                        if (nameInCheckbox == "Author's words") {
                            for (rundivs = 0; rundivs < length_authorwords; rundivs++) {
                                if (replics_of_choicedpart.authorreplics_divs[rundivs].classList.contains("paintedAuthorReplics")) {
                                    replics_of_choicedpart.authorreplics_divs[rundivs].classList.remove("paintedAuthorReplics");
                                }
                            }
                        }
                        else {
                            for (rundivs = 0; rundivs < length_charwords; rundivs++) {
                                name_in_h4 = replics_of_choicedpart.replicsofchar_divs[rundivs].getElementsByTagName('H4')[0].innerText;
                                if (name_in_h4.indexOf(" &") == -1) {
                                    if ((PartNumber=="Part 1.17"&&name_in_h4==nameInCheckbox)||
                                        (PartNumber!=="Part 1.17"&&name_in_h4.indexOf(nameInCheckbox) >= 0)) {
                                        if (replics_of_choicedpart.replicsofchar_divs[rundivs].classList.contains("paintedReplicsOfChar_"+nameOfPlay)) {
                                            replics_of_choicedpart.replicsofchar_divs[rundivs].classList.remove("paintedReplicsOfChar_"+nameOfPlay);
                                        }
                                    }
                                    if ((nameInCheckbox == "Beatrix") && (name_in_h4 == "Being")) {
                                        if (replics_of_choicedpart.replicsofchar_divs[rundivs].classList.contains("paintedReplicsOfChar_"+nameOfPlay)) {
                                            replics_of_choicedpart.replicsofchar_divs[rundivs].classList.remove("paintedReplicsOfChar_"+nameOfPlay);
                                        }
                                    }
                                }
                                else {
                                    var namesInConjuction = name_in_h4.split(" & ");
                                    for (var runNamesInConjuction = 0; runNamesInConjuction < namesInConjuction.length; runNamesInConjuction++) {
                                        if (namesInConjuction[runNamesInConjuction] in checkedRoles) {
                                            break;
                                        }
                                    }
                                    if (runNamesInConjuction == namesInConjuction.length) {
                                        if (replics_of_choicedpart.replicsofchar_divs[rundivs].classList.contains("paintedReplicsOfChar_"+nameOfPlay)) {
                                            replics_of_choicedpart.replicsofchar_divs[rundivs].classList.remove("paintedReplicsOfChar_"+nameOfPlay);
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
        this.classList.add("mouseOnItem");
    };
    curPart.onmouseout = function looseStylesForItem2() {
        this.classList.remove("mouseOnItem");
    };
    curPart.onclick = function () {
        countClicks = 0;
        loadAboutCharacters(chosenPlay);
    };
}
function changePart(PartNumber, index_of_part, chosenPlay, addedHTMLToContainPart) { // PartNumber = "Part номер"
    presRolesObject = {};
    presRolesArray = [];
    replics_of_choicedpart.authorwords = [];
    replics_of_choicedpart.wordsofchar = [];
    addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML = "";
    addedHTMLToContainPart.top_of_play.titleOfPart.innerText = PartNumber + " " + chosenPlay["Parts"][index_of_part]["header"];
    addedHTMLToContainPart.content_of_play.innerHTML = "";
    //alert("В теле функции: PartNumber = "+PartNumber+" index_of_part = "+index_of_part);
    for (var index in chosenPlay["Parts"][index_of_part]["replics"]) { // пробег по репликам какой-то части
        // chosenPlay["Parts"][PartNumber] - part,
        // chosenPlay["Parts"][PartNumber][index] - объект-реплика
        arrayElementObject =chosenPlay["Parts"][index_of_part]["replics"][index]; // реплика героя: {}
        subjectName = Object.keys(arrayElementObject)[0]; // ключ (единственный) из объекта arrayElementObject:
        if (subjectName == "image") {
            addedHTMLToContainPart.content_of_play.innerHTML += arrayElementObject[subjectName];
        }
        else {
            if (!(subjectName in presRolesObject) && subjectName !== "Being" && subjectName.indexOf(' &') < 0 &&
                subjectName.indexOf("as answer") < 0) {
                presRolesObject[subjectName] = true; // роль, добавленная в список чек-боксов, добавляется в объект
                presRolesArray.push(subjectName);  // роль, добавленная в список чек-боксов, добавляется в массив
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
                        if ((PartNumber == "Part 1.2") && (subjectName == "Beatrix")) {
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
            addInnerHtml(addedHTMLToContainPart.content_of_play, innerContent); // В содержимое элемента text добавляется innerContent, судя по содержанию.
        }
    }
}
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
/*function commonCodeFor2arrows (PartNumber, index_of_part, choicedPlays, content_of_play) {
 PartNumber = parts_with_numbers[index_of_part];
 document.getElementById("headerForPart").innerText = PartNumber + " " + choicedPlays.headers[PartNumber];
 content_of_play.innerHTML = "";
 document.getElementById("listOfCheckboxes").innerHTML = "";
 changePart(PartNumber, choicedPlays, content_of_play);
 }*/