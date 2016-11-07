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
            buildHtmlInPrimary(key);
        }
    };
    xhr.onerror = function (event) {
        console.log(event);
    };
}
function fakeFunction(data) {
    console.log('Fake: ', data);
}

function buildHtmlInPrimary (key) {
    var divInPrimary = main.getElement("divInPrimary");
    divInPrimary.innerHTML+="<div class='componentsOfPrimary'>"+
                                "<h2></h2>"+
                                "<div class='mainPart'>"+
                                    "<div class='image'></div>"+
                                    "<div class='TextAndEnter'>"+
                                        "<p class='preview'></p><div class='entersToSecondary'></div>"+
                                    "</div>"+
                                "</div>" +
                             "</div>";
    var entrancesToSecondary = primary.getElementsByClassName("entersToSecondary");
    if (entrancesToSecondary.length==2) {
        fillComponentsOfPrimary (key, divInPrimary, entrancesToSecondary);
    }
}
function fillComponentsOfPrimary (key, divInPrimary, entrancesToSecondary) {
    var countElems;
    for (countElems=0; countElems < 2; countElems++) {
        var nameOfPlay;
        switch (countElems) {
            case 0:
                nameOfPlay="Extradecomposers";
                break;
            case 1:
                nameOfPlay="Black_parody";
                break;
        }
        var elemsOfPrimary = window[nameOfPlay]["onTheBeginning"];
        divInPrimary.getElementsByTagName("H2")[countElems].innerText=elemsOfPrimary.header;
        divInPrimary.getElementsByClassName("image")[countElems].innerHTML=elemsOfPrimary["imgOnPrimary"];
        divInPrimary.getElementsByClassName("preview")[countElems].innerText=elemsOfPrimary["preview"];
        divInPrimary.getElementsByClassName("entersToSecondary")[countElems].innerText="Enter";
        main.setEventsOnEnters(nameOfPlay, entrancesToSecondary, countElems);
    }
}
function setComponentsOfSecondary (nameOfPlay) {
    var componentsOfBeginning = window[nameOfPlay]['onTheBeginning'];
    main.setHtmlIntoStaticElement('bigImage', componentsOfBeginning["images"][0]);
    main.setHtmlIntoStaticElement("divWithLittleImages", componentsOfBeginning["images"][0]);
    document.getElementById("main_in_preview").innerText = componentsOfBeginning["preview"];
    for (var addLittleImages = 1; addLittleImages < componentsOfBeginning["images"].length; addLittleImages++) {
        main.addHtmlIntoStaticElement("divWithLittleImages", componentsOfBeginning["images"][addLittleImages]);
    }
    changeBigImageWithHeader();
}
function changeBigImageWithHeader() {
    var arrayOfLittleImages = main.getElement("littleImages");
    var bigImage=main.getElement("bigImage").getElementsByTagName("Img")[0];
    for (var runLittleImages = 0; runLittleImages < arrayOfLittleImages.length; runLittleImages++) {
        arrayOfLittleImages[runLittleImages].onmouseover = function () {
            bigImage.src = this.src;
        }
    }
}
function setButtonsToChoicePlay(PartOfIdOfDivForButtons, nameOfPlay) {
    var btn, btnText, objectOfButtons = {}, divForButtons=document.getElementById("divFor"+PartOfIdOfDivForButtons);
    objectOfButtons[PartOfIdOfDivForButtons] = [];
    for (var field in handleJson) {
        btn = document.createElement('button');
        btn.dataset['source']=field;
        btnText = document.createTextNode(handleJson[field].buttonText);
        btn.appendChild(btnText);
        if (btn.getAttribute("data-source")==nameOfPlay) {
            btn.setAttribute("disabled", "true");
            btn.classList.add("disabledButton");
        }
        else {
            btn.classList.add("unclickedButton_"+nameOfPlay+"_choiced");
        }
        objectOfButtons[PartOfIdOfDivForButtons].push(btn);
        btn.onclick = function () {
            var StatusOfGate = main.getElement("gate").src;
            if(StatusOfGate.indexOf("opened")!==-1) {
                main.getElement("gate").src="images/on_the_beginning/closed_gate.jpg";
            }
            nameOfPlay=this.getAttribute("data-source");
            moveActive(this, PartOfIdOfDivForButtons, objectOfButtons, nameOfPlay);
            main.setClickOnKey(nameOfPlay);
        };
        divForButtons.appendChild(btn);
    }
    main.setClickOnKey(nameOfPlay);
}
function moveActive(clickedButton, PartOfIdOfDivForButtons, objectOfButtons, nameOfPlay) {
    var otherButton;
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
        setComponentsOfSecondary(nameOfPlay);
      /*  if ((objectOfButtons["ButtonsToRechoice"]!==undefined)&&
            (objectOfButtons["ButtonsToRechoice"].length==2)) {
            alert("Попали!");
            for (var runBtns=0; runBtns<2; runBtns++) {
                if(objectOfButtons["ButtonsToRechoice"][runBtns].getAttribute("data-source")==nameOfPlay) {
                    clickedButton=objectOfButtons["ButtonsToRechoice"][runBtns];
                }
                else {
                    otherButton=objectOfButtons["ButtonsToRechoice"][runBtns];
                }
            }
            realizeExchangeBetweenButtons (clickedButton, otherButton, nameOfPlay, "unclickedButton_"+nameOfPlay+"_choiced");
        }*/
    setColors(nameOfPlay);
}
function openGates() {
    setTimeout(function () {
        main.getElement("gate").src="images/on_the_beginning/opened_gate.jpg";
        main.getElement("gate").onmouseover = function () {
            if (this.src.indexOf("closed")==-1) {
                main.regularVisibility([["secondary", "none"],["contentlist","block"],["rightHalf","block"]]);
                main.setCssProperty([["contentlist", "borderRight", "3px solid"]]);
            }
        };
    }, 400);
}
function setColors(nameOfPlay) {
    var addedClassForContentList = "contentListFor"+nameOfPlay,
        instruction = document.getElementById("instruction"),
        colorsForButton = {textColor: "", backgroundColor: ""};
    switch (nameOfPlay) {
        case "Extradecomposers":
            if (main.getElement("secondary").style.display!=="none") {
                main.setCssProperty([
                    ["main_in_preview","color","mediumvioletred"]
                ]);
                if (instruction!==null) {
                    instruction.style.color = "#08088A";
                }
            }
            main.setCssProperty([["rightHalf", "color", "black"]]);
            colorsForButton.textColor="#CEECF5";
            colorsForButton.backgroundColor="#0B3861";
            break;
        case "Black_parody":
            if (main.getElement("secondary").style.display!=="none") {
                main.setCssProperty([
                    ["main_in_preview","color","#A9BCF5"]
                ]);
                if (instruction!==null) {
                    instruction.style.color = "#08088A";
                }
            }
            main.setCssProperty([["rightHalf", "color", "lightgoldenrodyellow"]]);
            colorsForButton.textColor="#2F0B3A";
            colorsForButton.backgroundColor="#BCA9F5";
            break;
    }
    main.getElement("buttonToRechoice").style.backgroundColor=colorsForButton.backgroundColor;
    main.getElement("buttonToRechoice").style.color=colorsForButton.textColor;
    main.getElement("body").backgroundColor="";
    main.getElement("body").setAttribute("id", "backgroundFor"+nameOfPlay);
    if(main.getElement("contentlist").classList.length>0) {
        if(main.getElement("contentlist").classList[0].indexOf(nameOfPlay)==-1) {
            var removedClass=main.getElement("contentlist").classList[0];
            main.removeClassForStaticElement("contentlist", removedClass);
        }
    }
    main.addClassForStaticElement("contentlist", addedClassForContentList);

}
function addPartsToContentList(nameOfPlay) {
    var listOfParts =  main.getElement("listOfParts");
    if (listOfParts.innerHTML != "") {
        main.setHtmlIntoStaticElement("listOfParts", "");
    }
    for (var part in window[nameOfPlay]["Parts"]) {
        var numberOfPart = window[nameOfPlay]["Parts"][part]["number"];
        main.addHtmlIntoStaticElement("listOfParts", "<p id='Part" + numberOfPart + "'>Part " + numberOfPart  + "</p>");
    }
    main.addHtmlIntoStaticElement("listOfParts", "<p id='about_characters'>About characters</p>");
    setClickToLoadPart(nameOfPlay);
}

function loadAboutCharacters(nameOfPlay) {
    if (main.getElement("contentlist").style.borderRight == "") {
        main.setCssProperty(
            [
                ["contentlist", "borderRight", "3px solid"],
                ["rightHalf", "borderLeft", "none"]
            ]
        );
    }
    main.setHtmlIntoStaticElement("mainArea", "<h2>About Characters</h2>");
    for (var addPartAboutCharacters = 0; addPartAboutCharacters < window[nameOfPlay]['About characters'].length; addPartAboutCharacters++) {
        main.addHtmlIntoStaticElement("mainArea", "<p>"+window[nameOfPlay]['About characters'][addPartAboutCharacters]+"</p>");
    }
}
function setClickToLoadPart(nameOfPlay) {
    var paragraphsInContentList = main.getElement("contentlist").getElementsByTagName("P"), parts_with_numbers = [];
    for (var runPars=0; runPars < paragraphsInContentList.length; runPars++) {
        if (paragraphsInContentList[runPars].innerText.indexOf("Part")==0) {
            if (parts_with_numbers.indexOf(paragraphsInContentList[runPars].innerText)==-1) {
                parts_with_numbers.push(paragraphsInContentList[runPars].innerText);
            }
        }
    }
    var curPart, countClicks = 0;
    for (var index_of_part in window[nameOfPlay]["Parts"]) {
        curPart = paragraphsInContentList[index_of_part];
        setEventsWithMouse (curPart);
        curPart.onclick = function ()
        {
            countClicks++;
            var PartNumber = this.innerText; index_of_part = parts_with_numbers.indexOf(PartNumber);
            if (main.getElement("contentlist").style.borderRight != "") {
                main.setCssProperty([
                    ["contentlist", "borderRight", ""],
                    ["rightHalf", "borderLeft", "3px solid"]
                ]);
            }
            if (countClicks == 1) {
                if (!(main.getElement("rightHalf").classList.contains("addStylesForContent"))) {
                    main.addClassForStaticElement("rightHalf", "addedClass");
                }
                inMainArea= ["<div id='toChooseRoles'></div>",
                    "<div id='top_of_play'></div>",
                    "<div id='content_of_play'></div>"];
                main.addHtmlIntoStaticElement("mainArea", inMainArea);
                document.getElementById("toChooseRoles").innerHTML = "<h4>There are the following characters in this part:</h4>" +
                    "<div id='listOfCheckboxes'></div><div><input id='paintreplics' type='button' " +
                    "value='paint roles and / or clear them'></div>";
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
            changePart(PartNumber, index_of_part, window[nameOfPlay], addedHTMLToContainPart);
            document.getElementById("scrollBack").onclick = function () {
                if (index_of_part == 0) {
                    index_of_part = parts_with_numbers.length - 1;
                }
                else {
                    index_of_part--;
                }
                PartNumber = parts_with_numbers[index_of_part];
                changePart(PartNumber, index_of_part, window[nameOfPlay], addedHTMLToContainPart);
            };
            document.getElementById("scrollFront").onclick = function () {
                if (index_of_part == parts_with_numbers.length - 1) {
                    index_of_part = 0;
                }
                else {
                    index_of_part++;
                }
                PartNumber = parts_with_numbers[index_of_part];
                changePart(PartNumber, index_of_part, window[nameOfPlay], addedHTMLToContainPart);
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
                    name_in_h4, checkedRoles = {}, nameInCheck;
                for (var runchecks = 0; runchecks < checkboxes.length; runchecks++) {
                    if (checkboxes[runchecks].checked) {
                        if ((presRoles.Array[runchecks].indexOf("'s")!==-1)&&
                            (presRoles.Array[runchecks].indexOf("Author")==-1)
                            &&(presRoles.Array[runchecks].indexOf("Christian")==-1)) {
                            var posOfAmp = presRoles.Array[runchecks].indexOf("'s");
                            nameInCheck = presRoles.Array[runchecks].substring(0, posOfAmp);
                        }
                        else {
                            nameInCheck=presRoles.Array[runchecks];
                        }
                        checkedRoles[nameInCheck]=true;
                    }
                }
                for (var runDivs = 0; runDivs < divsWithReplics.length; runDivs++) {
                    var headerWithRoles = divsWithReplics[runDivs].getElementsByTagName("H4")[0];
                    name_in_h4=headerWithRoles.innerText;
                    if (name_in_h4.indexOf(" & ")==-1) {
                        var nameInCheck=defineNameInCheckbox(name_in_h4);
                        if((nameInCheck in checkedRoles)&&(divsWithReplics[runDivs].classList.length==1)) {
                            defineNameInClass(nameInCheck, divsWithReplics[runDivs], "paint", nameOfPlay);
                            console.log(nameInCheck);
                        }
                        else {
                            if((!(nameInCheck in checkedRoles))&&(divsWithReplics[runDivs].classList.length==2)) {
                                defineNameInClass(nameInCheck,  divsWithReplics[runDivs], "deletePaint", nameOfPlay);
                            }
                        }
                    }
                    else { // если есть конъюнкция
                        var namesInConjuction = name_in_h4.split(" & "),
                            numberOfCheckedRolesInConjuction = 0, delPaintingClass,
                            h4=divsWithReplics[runDivs].getElementsByTagName("H4")[0];
                        for (var runNamesInConjuction=0; runNamesInConjuction < namesInConjuction.length; runNamesInConjuction++)
                        {
                             if (namesInConjuction[runNamesInConjuction] in checkedRoles) {
                                numberOfCheckedRolesInConjuction++;
                                nameInCheck = namesInConjuction[runNamesInConjuction];
                            }
                        }
                        switch (numberOfCheckedRolesInConjuction) {
                            case 0:
                                if (divsWithReplics[runDivs].classList.length==2) {
                                    delPaintingClass =  divsWithReplics[runDivs].classList[1];
                                    divsWithReplics[runDivs].classList.remove(delPaintingClass);
                                }
                                break;
                            case 1:
                                if (divsWithReplics[runDivs].classList.length>1) {
                                    delPaintingClass=divsWithReplics[runDivs].classList[1];
                                    divsWithReplics[runDivs].classList.remove(delPaintingClass);
                                }
                                defineNameInClass(nameInCheck,  divsWithReplics[runDivs], "paint", nameOfPlay);
                                break;
                            default:
                                if (divsWithReplics[runDivs].classList.length>1) {
                                    if(divsWithReplics[runDivs].classList[1].indexOf("paintedReplicsOf")==0) {
                                        delPaintingClass = divsWithReplics[runDivs].classList[1];
                                        divsWithReplics[runDivs].classList.remove(delPaintingClass);
                                    }
                                }
                                if (!(divsWithReplics[runDivs].classList.contains("commonPaint"))) {
                                    divsWithReplics[runDivs].classList.add("commonPaint");
                                }
                        }
                        var rolesInSpans = headerWithRoles.getElementsByTagName("Span")[0];
                        if(rolesInSpans==undefined) {
                            headerWithRoles.innerText="";
                            for (var runRoles=0; runRoles<namesInConjuction.length; runRoles++) {
                                headerWithRoles.innerHTML+="<span>"+namesInConjuction[runRoles]+"</span>";
                                if(runRoles<namesInConjuction.length-1) {
                                    headerWithRoles.innerHTML+="<span> & </span>";
                                }
                            }
                        }
                        var spans = headerWithRoles.getElementsByTagName("Span"), runRoles;
                        if ((numberOfCheckedRolesInConjuction < namesInConjuction.length)&&(numberOfCheckedRolesInConjuction>0)){
                            for (runRoles=0; runRoles < spans.length; runRoles++) {
                                if(spans[runRoles].innerText!==" & ") {
                                    nameInCheck=spans[runRoles].innerText;
                                    if((nameInCheck in checkedRoles)&&(spans[runRoles].classList.length==0)){
                                        spans[runRoles].classList.add("highlightedOf"+nameInCheck);
                                    }
                                    else {
                                        if((!(nameInCheck in checkedRoles))&&(spans[runRoles].classList.length==1)) {
                                            var deletedClass=spans[runRoles].classList[0];
                                            spans[runRoles].classList.remove(deletedClass);
                                        }
                                    }
                                }

                            }
                        }
                        else {
                                for (runRoles=0; runRoles < spans.length; runRoles++) {
                                        if(spans[runRoles].classList.length>0) {
                                            var deletedClass=spans[runRoles].classList[0];
                                            spans[runRoles].classList.remove(deletedClass);
                                        }
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
        loadAboutCharacters(nameOfPlay);
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
function defineNameInClass (nameInCheck,  currentReplic, whatToDo, nameInPlay) {
    var nameInClass;
    if (nameInCheck=="Author's words") {
        nameInClass = "Author_"+nameInPlay;
        paintOrClearReplic(currentReplic, nameInClass, whatToDo);
    }
    else {
        switch (nameInCheck) {
            case "Woman-devil":
                nameInClass="WomanDevil";
                break;
            case "Christian's grandpa":
                nameInClass="MrJakins";
                break;
            case "Christian's grandma":
                nameInClass="MrsJakins";
                break;
            default:
                if (nameInCheck.indexOf(" ")==-1) {
                    nameInClass=nameInCheck;
                }
                else {
                    nameInClass = nameInCheck[0].toUpperCase();
                    for (var c=1; c < nameInCheck.length; c++) {
                        if (nameInCheck[c]!==" ") {
                            if (nameInCheck[c-1] == " ") {
                                nameInClass+=nameInCheck[c].toUpperCase();
                            }
                            else {
                                nameInClass+=nameInCheck[c];
                            }
                        }
                    }
                }
                break;
        }
        /* Возможно, где-то будут вызовы функции defineNameInClass с аргументом "only define class". Смотря, какие
         * реплики. */
        if (whatToDo=="only define class") {
            return nameInClass;
        }
        else {
            paintOrClearReplic(currentReplic, nameInClass, whatToDo);
        }
    }
}
function paintOrClearReplic (currentReplic, nameInClass, whatToDo) {
    switch (whatToDo) {
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
                if(subjectName.indexOf(" &")==-1){
                    var nameInCheck=defineNameInCheckbox(subjectName);
                      if (!(nameInCheck in presRoles.Obj)) {
                                switch (nameInCheck) {
                                    case "Snake":
                                        addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML +=
                                            "<p><input type='checkbox' class='checkcharacter'>" +  nameInCheck + " (Woman-devil)</p>";
                                        break;
                                    case "Mrs Jakins":
                                        addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML +=
                                            "<p><input type='checkbox' class='checkcharacter'>" +  nameInCheck + " (Christian's grandma)</p>";
                                        break;
                                    default:
                                        if ((PartNumber == "Part 1.2") && ( nameInCheck == "Beatrix")) {
                                            addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML +=
                                                "<p><input type='checkbox' class='checkcharacter'>" +  nameInCheck +
                                                " (a new unfamiliar creature)</p>";
                                        }
                                        else {
                                            addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML +=
                                            "<p><input type='checkbox' " + "class='checkcharacter'>" + nameInCheck + "</p>";
                                        }
                                }
                                presRoles.Obj[nameInCheck]="added";
                                presRoles.Array.push(nameInCheck);
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
function defineNameInCheckbox (name) {
    if((name.indexOf("'s")!==-1)&&(name.indexOf("Author")==-1)&&(name.indexOf("Christian")==-1)
        &&(name.indexOf("Beatrix")==-1)&&(name!=="Being")) {
        var posOfAmp = name.indexOf("'s");
        var nameInCheck=name.substring(0, posOfAmp);
    }
    else {
        if(name=="Being") {
            nameInCheck="Beatrix";
        }
        else {
            nameInCheck=name;
        }
    }
    return nameInCheck;
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
        while (counterAddParagraphsOfReplic<innerContent.contents.length) {
            replicToAddParagraphs.innerHTML +="<p>"+innerContent.contents[counterAddParagraphsOfReplic]+"</p>";
            counterAddParagraphsOfReplic++;
        }
    }
};