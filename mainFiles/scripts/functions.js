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
        buttonText: 'Extradecomposers'
    },
    Black_agent: {
        path: 'mainFiles/jsons/black_agent.json',
        handle: function (data) {
            this.data = data;
            //console.log('Black agent works!');
        },
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
    bigImage.innerHTML = componentsOfBeginning["images"][0];
    littleImages.innerHTML = componentsOfBeginning["images"][0];
    document.getElementById("main_in_preview").innerText = componentsOfBeginning["preview"];
    for (var addLittleImages = 1; addLittleImages < componentsOfBeginning["images"].length; addLittleImages++) {
        littleImages.innerHTML += componentsOfBeginning["images"][addLittleImages];
    }
    changeBigImageWithHeader();
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
function setButtonsToChoicePlay(PartOfIdOfDivForButtons, nameOfPlay) {
    //console.trace('setButtonsToChoicePlay, arguments: ', arguments);
    var btn, btnText, objectOfButtons = {}, divForButtons=document.getElementById("DivFor"+PartOfIdOfDivForButtons);
    objectOfButtons[PartOfIdOfDivForButtons] = []; // objectOfButtons[ButtonsToRechoice]
    for (var field in handleJson) {
        btn = document.createElement('button'); // заносит в переменную btn значение: тег <button></button>
        btn.dataset['source']=field; // устанавливает атрибут data-source со значением field для btn. Текстовая строка.
        btnText = document.createTextNode(handleJson[field].buttonText);
        btn.appendChild(btnText);
        if (divForButtons.id=="DivForButtonsToEnter") { // сделать кнопку пассивной
            btn.classList.add("unclickedButton_"+nameOfPlay+"_choiced");
        }
        btn.onclick = function () {
            console.log('this bnt:', this);
            moveActive(this, PartOfIdOfDivForButtons, objectOfButtons);
        };
        objectOfButtons[PartOfIdOfDivForButtons].push(btn); // objectOfButtons[ButtonsToRechoice].push(btn)
        divForButtons.appendChild(btn);
    }
}
function moveActive(clickedButton, PartOfIdOfDivForButtons, objectOfButtons) {
    var nameOfPlay = clickedButton.getAttribute('data-source');

    var chosenPlay = window[nameOfPlay], otherButton;
    switch (clickedButton) {
        case objectOfButtons[PartOfIdOfDivForButtons][0]:
            otherButton = objectOfButtons[PartOfIdOfDivForButtons][1];
            break;
        case objectOfButtons[PartOfIdOfDivForButtons][1]:
            otherButton = objectOfButtons[PartOfIdOfDivForButtons][0];
            break;
    }
    console.log(otherButton);
    //для функции
    var delClass = clickedButton.classList[0];
    clickedButton.setAttribute("disabled", "true");
    clickedButton.classList.remove(delClass); //  Если это Black_agent, то должен
    // удалиться класс, которого нет: "unclickedButton_Black_agent_choiced"
    clickedButton.classList.add("disabledButton");
    if ((otherButton.hasAttribute("disabled"))&&(otherButton.classList.contains("disabledButton"))) {
        otherButton.removeAttribute("disabled");
        otherButton.classList.remove("disabledButton");
        otherButton.classList.add("unclickedButton_"+nameOfPlay+"_choiced");
    }
    ///
    if (beginning.style.display == "none") {// if - была кликнута одна из кнопок в contentList

    } else { // когда была кликнута одна из кнок на заставке
        setComponentsOfBeginning(chosenPlay);
        openGates(); // В этой функции beginning получает значение "none".
        var DivForButtonsToRechoice = document.getElementById("DivForButtonsToRechoice");
        if (DivForButtonsToRechoice.innerHTML=="") {
            setButtonsToChoicePlay("ButtonsToRechoice", nameOfPlay); // 2-й вызов. При нем создаются кнопки в contentList
            console.log({ 'objectOfButtons': objectOfButtons, arguments:arguments  });
        }
        if ((objectOfButtons["ButtonsToRechoice"]!==undefined)&&
            (objectOfButtons["ButtonsToRechoice"].length==2)) {
            for (var runBtns=0; runBtns<2; runBtns++) {
                if(objectOfButtons["ButtonsToRechoice"][runBtns].getAttribute("data-source")==nameOfPlay) {
                    clickedButton=objectOfButtons["ButtonsToRechoice"][runBtns];
                }
                else {
                    otherButton=objectOfButtons["ButtonsToRechoice"][runBtns];
                }
            }
            //для функции
            clickedButton.setAttribute("disabled", "true");
            clickedButton.classList.remove("unclickedButton_"+nameOfPlay+"_choiced");
            clickedButton.classList.add("disabledButton");
            if ((otherButton.hasAttribute("disabled"))&&(otherButton.classList.contains("disabledButton"))) {
                otherButton.removeAttribute("disabled");
                otherButton.classList.remove("disabledButton");
                otherButton.classList.add("unclickedButton_"+nameOfPlay+"_choiced");
            }
            ///
        }
    }
    addPartsToContentList(chosenPlay, nameOfPlay);
    loadAboutCharacters(chosenPlay);
    setColors(chosenPlay, nameOfPlay);
    headerLogotip.innerHTML = chosenPlay["headerLogotip"];
}
function openGates() {
    setTimeout(function () {
        document.getElementById("instruction").innerText = 'Открыто!';
        document.getElementById('gate').src="images/on_the_beginning/opened_gate.jpg";
        document.getElementById("gate").onmouseover = function () {
            beginning.style.display = "none";
            contentlist.style.display = "block";
            rightHalf.style.display = "block";
            contentlist.style.borderRight = "3px solid";
        };
    }, 3200);
}

function setColors(chosenPlay, nameOfPlay) {
    var addedClassForContentList = "contentListFor"+nameOfPlay,
        instruction = document.getElementById("instruction");
    switch (chosenPlay) {
        case Extradecomposers:
            if (beginning.style.display!=="none") {
                how_to_open_plays.style.color = "mediumblue";
                main_in_preview.style.color = "mediumvioletred";
                instruction.style.color = "#08088A";
            }
            rightHalf.style.color="black";
            break;
        case Black_agent:
            if (beginning.style.display!=="none") {
                how_to_open_plays.style.color = "#2ECCFA";
                main_in_preview.style.color = "#A9BCF5";
                instruction.style.color = "lightskyblue";
            }
            rightHalf.style.color="lightgoldenrodyellow";
            break;
    }
    body.backgroundColor="";
    body.setAttribute("id", "backgroundFor"+nameOfPlay);
    if(contentlist.classList.length>0) {
        if(contentlist.classList[0].indexOf(nameOfPlay)==-1) {
            contentlist.classList.remove(contentlist.classList[0]);
        }
    }
    contentlist.classList.add(addedClassForContentList);
}

function addPartsToContentList(chosenPlay, nameOfPlay) {
    listOfParts = document.getElementById("listOfParts");
    if (listOfParts.innerHTML != "") {
        listOfParts.innerHTML = "";
    }
    for (var part in chosenPlay["Parts"]) {
        var numberOfPart = chosenPlay["Parts"][part]["number"];
        listOfParts.innerHTML += "<p id='Part" + numberOfPart + "'>Part " + numberOfPart  + "</p>";
    }
    listOfParts.innerHTML += "<p id='about_characters'>About characters</p>";
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
        curPart = paragraphsInContentList[index_of_part];
        setEventsWithMouse (curPart);
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
                    "<div id='listOfCheckboxes'></div><div><input id='paintreplics' type='button' " +
                    "value='paint roles and / or clear them '></div>";
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
            changePart(PartNumber, index_of_part, chosenPlay, addedHTMLToContainPart);
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
            document.getElementById("paintreplics").onclick = function () {
                var divsWithReplics = document.getElementById("content_of_play").getElementsByTagName("Div"),
                    name_in_h4, checkedRoles = {}, searchedRole;
                for (var runchecks = 0; runchecks < checkboxes.length; runchecks++) {
                    if (checkboxes[runchecks].checked) {
                        checkedRoles[presRolesArray[runchecks]] = true;
                    }
                }
                for (var runDivs = 0; runDivs < divsWithReplics.length; runDivs++) {
                    name_in_h4=divsWithReplics[runDivs].getElementsByTagName("H4")[0].innerText;
                    if (name_in_h4.indexOf(" & ")==-1) {
                        if((name_in_h4.indexOf("'s")!==-1)&&(name_in_h4.indexOf("Christian")==-1)
                            &&(name_in_h4.indexOf("Author")==-1)) { // когда name_in_h4 и searcedRole не соответствуют
                            var posOfAmp = name_in_h4.indexOf("'");
                            searchedRole = name_in_h4.substring(0, posOfAmp);
                        }
                        else { // когда name_in_h4 и searcedRole соответствуют
                            if(name_in_h4=="Being") {
                                searchedRole="Beatrix";
                            }
                            else {
                                searchedRole=name_in_h4;
                            }
                        }
                        if((searchedRole in checkedRoles)&&(divsWithReplics[runDivs].classList.length==1)) {
                            defineNameInClass(searchedRole, divsWithReplics[runDivs], "paint");
                        }
                        else {
                            if((!(searchedRole in checkedRoles))&&(divsWithReplics[runDivs].classList.length==2)) {
                                defineNameInClass(searchedRole,  divsWithReplics[runDivs], "deletePaint");
                            }
                        }
                    }
                    else {
                        var namesInConjuction = name_in_h4.split(" & "),
                            numberOfCheckedRolesInConjuction = 0;
                        for (var runNamesInConjuction in namesInConjuction) { // пробег по именам в конъюнкции
                            if (namesInConjuction[runNamesInConjuction] in checkedRoles) {
                                numberOfCheckedRolesInConjuction++;
                                searchedRole = namesInConjuction[runNamesInConjuction];
                            }
                        }
                        var delClass;
                        switch (numberOfCheckedRolesInConjuction) { // определение того, что должно быть с раскраской реплики.
                            case 0:
                                if (divsWithReplics[runDivs].classList.length==2) {
                                    delClass =  divsWithReplics[runDivs].classList[1];
                                    divsWithReplics[runDivs].classList.remove(delClass);
                                }
                                break;
                            case 1:
                                if (divsWithReplics[runDivs].classList.contains("commonPaint")) {
                                    divsWithReplics[runDivs].classList.remove("commonPaint");
                                }
                                defineNameInClass(searchedRole,  divsWithReplics[runDivs], "paint");
                                if (divsWithReplics[runDivs].classList.length>2) {
                                    var delClass2 = divsWithReplics[runDivs].classList[1];
                                    divsWithReplics[runDivs].classList.remove(delClass2);
                                }
                                break;
                            default:
                                if (divsWithReplics[runDivs].classList.length>1) {
                                    if(divsWithReplics[runDivs].classList[1].indexOf("paintedReplicsOf")==0) {
                                        delClass = divsWithReplics[runDivs].classList[1];
                                        divsWithReplics[runDivs].classList.remove(delClass);
                                    }
                                }
                                if (!(divsWithReplics[runDivs].classList.contains("commonPaint"))) {
                                    divsWithReplics[runDivs].classList.add("commonPaint");
                                }
                        }

                    }
                }
            };
        };
    }
    curPart = document.getElementById("about_characters");
    setEventsWithMouse (curPart);
    curPart.onclick = function () {
        countClicks = 0;
        loadAboutCharacters(chosenPlay);
    };
}
function setEventsWithMouse (curPart) {
    curPart.onmouseover = function getStylesForItem2() {
        this.classList.add("mouseOnItem");
    };
    curPart.onmouseout = function looseStylesForItem2() {
        this.classList.remove("mouseOnItem");
    };
}
function defineNameInClass (searchedRole,  currentReplic, PoC) {
    var nameInClass;
    if (searchedRole=="Author's words") {
        nameInClass = "Author";
        paintOrClearReplic(currentReplic, nameInClass, PoC);
    }
    else {
        switch (searchedRole) {
            case "Woman-devil":
                nameInClass="WomanDevil";
                break;
            case "Mr Stevenson":
                nameInClass="Mr";
                break;
            case "Christian's grandpa":
                nameInClass="Mr";
                break;
            case "Christian's grandma":
                nameInClass="MrsJakins";
                break;
            default:
                if (searchedRole.indexOf(" ")==-1) {
                    nameInClass=searchedRole;
                }
                else {
                    nameInClass = searchedRole[0].toUpperCase();
                    for (var c=1; c < searchedRole.length; c++) {
                        if (searchedRole[c]!==" ") {
                            if (searchedRole[c-1] == " ") {
                                nameInClass+=searchedRole[c].toUpperCase();
                            }
                            else {
                                nameInClass+=searchedRole[c];
                            }
                        }
                    }
                }
                break;
        }
        paintOrClearReplic(currentReplic, nameInClass, PoC);
    }
}
function paintOrClearReplic (currentReplic, nameInClass, PoC) {
    switch (PoC) {
        case "paint":
            if (!(currentReplic.classList.contains("paintedReplicsOf"+nameInClass))) {
                currentReplic.classList.add("paintedReplicsOf"+nameInClass);
            }
            break;
        case "deletePaint":
            if ((currentReplic.classList.contains("paintedReplicsOf"+nameInClass))) {
                currentReplic.classList.remove("paintedReplicsOf"+nameInClass);
            }
            //var j=currentReplic.getElementsByTagName("H4")[0].innerText;
            break;
    }
}
function changePart(PartNumber, index_of_part, chosenPlay, addedHTMLToContainPart) { // PartNumber = "Part номер"
    presRolesObject = {};
    presRolesArray = [];
    replics_of_choicedpart.authorwords = [];
    replics_of_choicedpart.wordsofchar = [];
    addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML = "";
    addedHTMLToContainPart.top_of_play.titleOfPart.innerText = PartNumber + " " + chosenPlay["Parts"][index_of_part]["header"];
    addedHTMLToContainPart.content_of_play.innerHTML = "";
    for (var index in chosenPlay["Parts"][index_of_part]["replics"]) {
        arrayElementObject =chosenPlay["Parts"][index_of_part]["replics"][index];
        subjectName = Object.keys(arrayElementObject)[0];
        if (subjectName == "image") {
            addedHTMLToContainPart.content_of_play.innerHTML += arrayElementObject[subjectName];
        }
        else {
            if (!(subjectName in presRolesObject) && subjectName !== "Being" && subjectName.indexOf(' &') < 0 &&
                subjectName.indexOf("as answer") < 0) {
                presRolesObject[subjectName] = true;
                presRolesArray.push(subjectName);
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
            addInnerHtml(addedHTMLToContainPart.content_of_play, innerContent);
        }
    }
}
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
    return innerContent;
};
addInnerHtml = function (html, innerContent) {
    html.innerHTML += "<div class='" + innerContent.class + "'> <h4>" + innerContent.h4 +
        "</h4><p>" + innerContent.contents[0] + "</p></div>";

};
