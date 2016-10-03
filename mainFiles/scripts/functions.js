/**
 * Created by User on 26.08.2016.
 */
function handleData(key) {
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
           // console.log(xhr.status + ': ' + xhr.statusText);
        } else {
            var data = JSON.parse(xhr.responseText);
            window[key] = data[key];
            handleJson[key].handle(data);
        }
    };
    xhr.onerror = function (event) {
       // console.log(event);
    };
}
function fakeFunction(data) {
    console.log('Fake: ', data);
}
function setComponentsOfBeginning (chosenPlay) {
    var componentsOfBeginning = chosenPlay['onTheBeginning'];
    document.getElementById("header").InnerText = chosenPlay['onTheBeginning'].header;
    objectWithVariablesAndFunctions.setHtmlIntoStaticElement('bigImage', componentsOfBeginning["images"][0]);
    objectWithVariablesAndFunctions.setHtmlIntoStaticElement("divWithLittleImages", componentsOfBeginning["images"][0]);
    document.getElementById("main_in_preview").innerText = componentsOfBeginning["preview"];
    for (var addLittleImages = 1; addLittleImages < componentsOfBeginning["images"].length; addLittleImages++) {
        objectWithVariablesAndFunctions.addHTML("divWithLittleImages", componentsOfBeginning["images"][addLittleImages]);
    }
    changeBigImageWithHeader();
}
function changeBigImageWithHeader() {
    var arrayOfLittleImages = objectWithVariablesAndFunctions.getElement("littleImages");
    for (var runLittleImages = 0; runLittleImages < arrayOfLittleImages.length; runLittleImages++) {
        arrayOfLittleImages[runLittleImages].onmouseover = function () {
            bigImage.src = this.src;
        }
    }
}
function setButtonsToChoicePlay(PartOfIdOfDivForButtons, nameOfPlay) {
    var btn, btnText, objectOfButtons = {}, divForButtons=document.getElementById("DivFor"+PartOfIdOfDivForButtons);
    objectOfButtons[PartOfIdOfDivForButtons] = [];
    for (var field in handleJson) {
        btn = document.createElement('button');
        btn.dataset['source']=field;
        btnText = document.createTextNode(handleJson[field].buttonText);
        btn.appendChild(btnText);
        if (divForButtons.id=="DivForButtonsToEnter") { // сделать кнопку пассивной
            btn.classList.add("unclickedButton_"+nameOfPlay+"_choiced");
        }
        btn.onclick = function () {
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

    var delClass = clickedButton.classList[0];
    realizeExchangeBetweenButtons (clickedButton, otherButton, nameOfPlay, delClass);
    var beginning = objectWithVariablesAndFunctions.getElement("beginning");
    if (beginning.style.display !== "none") {
        setComponentsOfBeginning(chosenPlay);
        openGates();
        var DivForButtonsToRechoice =objectWithVariablesAndFunctions.getElement("DivForButtonsToRechoice");
        if (DivForButtonsToRechoice.innerHTML=="") {
            setButtonsToChoicePlay("ButtonsToRechoice", nameOfPlay);
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
           realizeExchangeBetweenButtons (clickedButton, otherButton, nameOfPlay, "unclickedButton_"+nameOfPlay+"_choiced");
        }
    }
    addPartsToContentList(chosenPlay, nameOfPlay);
    loadAboutCharacters(chosenPlay);
    setColors(nameOfPlay);
    objectWithVariablesAndFunctions.setHtmlIntoStaticElement("headerLogotip", chosenPlay["headerLogotip"]);
}
function openGates() {
    setTimeout(function () {
        document.getElementById("instruction").innerText = 'Открыто!';
        document.getElementById('gate').src="images/on_the_beginning/opened_gate.jpg";
        document.getElementById("gate").onmouseover = function () {
            objectWithVariablesAndFunctions.regularVisibility([["beginning", "none"],["contentlist","block"],["rightHalf","block"]]);
            objectWithVariablesAndFunctions.setCssProperty([["contentlist", "borderRight", "3px solid"]]);
        };
    }, 3200);
}

function setColors(nameOfPlay) {
    var addedClassForContentList = "contentListFor"+nameOfPlay,
    instruction = document.getElementById("instruction");
    switch (nameOfPlay) {
        case "Extradecomposers":
            if (objectWithVariablesAndFunctions.getElement("beginning").style.display!=="none") {
                objectWithVariablesAndFunctions.setCssProperty([
                                                    ["how_to_open_play","color","mediumblue"],
                                                    ["main_in_preview","color","mediumvioletred"]
                                                   ]);
                if (instruction!==null) {
                    instruction.style.color = "#08088A";
                }
            }
            objectWithVariablesAndFunctions.setCssProperty([["rightHalf", "color", "black"]]);
            break;
        case "Black_parody":
            if (objectWithVariablesAndFunctions.getElement("beginning").style.display!=="none") {
                objectWithVariablesAndFunctions.setCssProperty([
                        ["how_to_open_play","color","#2ECCFA"],
                        ["main_in_preview","color","#A9BCF5"]
                    ]);
                if (instruction!==null) {
                    instruction.style.color = "#08088A";
                }
            }
             objectWithVariablesAndFunctions.setCssProperty([["rightHalf", "color", "lightgoldenrodyellow"]]);
            break;
    }
    objectWithVariablesAndFunctions.getElement("body").backgroundColor="";
    objectWithVariablesAndFunctions.getElement("body").setAttribute("id", "backgroundFor"+nameOfPlay);
    if(objectWithVariablesAndFunctions.getElement("contentlist").classList.length>0) {
        if(objectWithVariablesAndFunctions.getElement("contentlist").classList[0].indexOf(nameOfPlay)==-1) {
            var removedClass=objectWithVariablesAndFunctions.getElement("contentlist").classList[0];
            objectWithVariablesAndFunctions.removeClassForStaticElement("contentList", removedClass);
        }
    }
    objectWithVariablesAndFunctions.addClassForStaticElement("contentlist", addedClassForContentList);

}
function addPartsToContentList(chosenPlay, nameOfPlay) {
    var listOfParts =  objectWithVariablesAndFunctions.getElement("listOfParts");
    if (listOfParts.innerHTML != "") {
        objectWithVariablesAndFunctions.setHtmlIntoStaticElement("listOfParts", "");
    }
    for (var part in chosenPlay["Parts"]) {
        var numberOfPart = chosenPlay["Parts"][part]["number"];
        objectWithVariablesAndFunctions.addHTML("listOfParts", "<p id='Part" + numberOfPart + "'>Part " + numberOfPart  + "</p>");
    }
    objectWithVariablesAndFunctions.addHTML("listOfParts", "<p id='about_characters'>About characters</p>");
    setClickToLoadPart(chosenPlay, nameOfPlay);
}

function loadAboutCharacters(chosenPlay) {
    if (objectWithVariablesAndFunctions.getElement("contentlist").style.borderRight == "") {
        objectWithVariablesAndFunctions.setCssProperty(
            [
                ["contentlist", "borderRight", "3px solid"],
                ["rightHalf", "borderLeft", "none"]
            ]
        );
    }
    objectWithVariablesAndFunctions.setHtmlIntoStaticElement("mainArea", "<h2>About Characters</h2>");
    for (var addPartAboutCharacters = 0; addPartAboutCharacters < chosenPlay['About characters'].length; addPartAboutCharacters++) {
        objectWithVariablesAndFunctions.addHTML("mainArea", "<p>" + chosenPlay['About characters'][addPartAboutCharacters] + "</p>");
    }
}
function setClickToLoadPart(chosenPlay,  nameOfPlay) {
    var paragraphsInContentList = objectWithVariablesAndFunctions.getElement("contentlist").getElementsByTagName("P"), parts_with_numbers = [];
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
        curPart.onclick = function ()
        {
            countClicks++;
            var PartNumber = this.innerText; index_of_part = parts_with_numbers.indexOf(PartNumber);
            if (objectWithVariablesAndFunctions.getElement("contentlist").style.borderRight != "") {
                objectWithVariablesAndFunctions.setCssProperty([
                      ["contentlist", "borderRight", ""],
                      ["rightHalf", "borderLeft", "3px solid"]
                    ]);
            }
            if (countClicks == 1) {
                if (!(objectWithVariablesAndFunctions.getElement("rightHalf").classList.contains("addStylesForContent"))) {
                    objectWithVariablesAndFunctions.addClassForStaticElement("rightHalf", "addedClass");
                }
                    inMainArea= ["<div id='toChooseRoles'></div>",
                    "<div id='top_of_play'></div>",
                    "<div id='content_of_play'></div>"];
                objectWithVariablesAndFunctions.setHtmlIntoStaticElement("mainArea", inMainArea);
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
            var checkboxes = document.getElementsByClassName("checkcharacter");
            document.getElementById("paintreplics").onclick = function () {
                var divsWithReplics = document.getElementById("content_of_play").getElementsByTagName("Div"),
                    name_in_h4, checkedRoles = {}, searchedRole;
                for (var runchecks = 0; runchecks < checkboxes.length; runchecks++) {
                    if (checkboxes[runchecks].checked) {
                        if ((presRoles.Array[runchecks].indexOf("'s")!==-1)&&
                            (presRoles.Array[runchecks].indexOf("Author")==-1)
                            &&(presRoles.Array[runchecks].indexOf("Christian")==-1)) {
                            var posOfAmp = presRoles.Array[runchecks].indexOf("'s");
                            searchedRole = presRoles.Array[runchecks].substring(0, posOfAmp);
                        }
                        else {
                             searchedRole=presRoles.Array[runchecks];
                        }
                        checkedRoles[searchedRole]=true;
                    }
                }
                for (var runDivs = 0; runDivs < divsWithReplics.length; runDivs++) {
                    name_in_h4=divsWithReplics[runDivs].getElementsByTagName("H4")[0].innerText;
                    if (name_in_h4.indexOf(" & ")==-1) {
                        if((name_in_h4.indexOf("'s")!==-1)&&(name_in_h4.indexOf("Christian")==-1)
                           &&(name_in_h4.indexOf("Author")==-1)) {
                            var posOfAmp = name_in_h4.indexOf("'s");
                            searchedRole = name_in_h4.substring(0, posOfAmp);
                        }
                        else {
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
                        switch (numberOfCheckedRolesInConjuction) {
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
function realizeExchangeBetweenButtons (clickedButton, otherButton, nameOfPlay, delClass) {
    clickedButton.setAttribute("disabled", "true");
    clickedButton.classList.remove(delClass);
    clickedButton.classList.add("disabledButton");
    if ((otherButton.hasAttribute("disabled"))&&(otherButton.classList.contains("disabledButton"))) {
        otherButton.removeAttribute("disabled");
        otherButton.classList.remove("disabledButton");
        otherButton.classList.add("unclickedButton_"+nameOfPlay+"_choiced");
    }
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
            break;
    }
}
function changePart(PartNumber, index_of_part, chosenPlay, addedHTMLToContainPart) {
    if (presRoles.Array!==[]&&presRoles.Obj!=={}) {
        presRoles.Array = [];
        presRoles.Obj = {};
    }
    replics_of_choicedpart = {};
    replics_of_choicedpart.authorwords = [];
    replics_of_choicedpart.wordsofchar = [];
    if ((presRoles.Array !== [])&&(presRoles.Obj !== {})) {
        presRoles.Array = [];
        presRoles.Obj = {};
    }
    addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML = "";
    addedHTMLToContainPart.top_of_play.titleOfPart.innerText = PartNumber + " " + chosenPlay["Parts"][index_of_part]["header"];
    addedHTMLToContainPart.content_of_play.innerHTML = "";
    var counterAddReplics= 0;
    for (var index in chosenPlay["Parts"][index_of_part]["replics"]) {
        var arrayElementObject = chosenPlay["Parts"][index_of_part]["replics"][index];
        var subjectName = Object.keys(arrayElementObject)[0], className;
        if (subjectName == "image") {
            addedHTMLToContainPart.content_of_play.innerHTML += arrayElementObject[subjectName];
        }
        else {
            if (!(subjectName in presRoles.Obj) && subjectName !== "Being" && subjectName.indexOf(' &') < 0 &&
                subjectName.indexOf("as answer") < 0) {
                presRoles.Obj[subjectName] = true;
                presRoles.Array.push(subjectName);
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
            innerContent = setContents(replics_of_choicedpart, arrayElementObject[subjectName], subjectName, className);
            counterAddReplics++;
            addDivsWithReplics(addedHTMLToContainPart.content_of_play, innerContent, counterAddReplics);
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
addDivsWithReplics = function (html, innerContent, counterAddReplics) {
    var counterAddParagraphsOfReplic=0;
    html.innerHTML += "<div class='" + innerContent.class + "'> <h4>" + innerContent.h4 +
        "</h4><p>" + innerContent.contents[0] + "</p></div>";
    if (innerContent.contents.length>1) {
        counterAddParagraphsOfReplic=1;
        var replics = html.getElementsByTagName("Div");
        var replicToAddParagraphs = replics[counterAddReplics-1];
        console.log(counterAddReplics);
        console.log(replics.length);
        console.log(replicToAddParagraphs);
        while (counterAddParagraphsOfReplic<innerContent.contents.length) {
            replicToAddParagraphs.innerHTML +="<p>"+innerContent.contents[counterAddParagraphsOfReplic]+"</p>";
            counterAddParagraphsOfReplic++;
        }
    }

};
