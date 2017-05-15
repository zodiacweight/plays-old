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
    console.groupCollapsed('%csetButtonsToChoicePlay', 'color:orange');
        console.log({
            // ButtonsToEnter
            //
            PartOfIdOfDivForButtons:PartOfIdOfDivForButtons,
            // Extradecomposers
            //
            nameOfPlay:nameOfPlay
        });
    var btn,
        btnText,
        objectOfButtons = {},
        divForButtons = document.getElementById("DivFor"+PartOfIdOfDivForButtons);
    objectOfButtons[PartOfIdOfDivForButtons] = [];
    /*
     *
     objectOfButtons = {
        PartOfIdOfDivForButtons: []
     }
     */
    //alert(objectOfButtons[PartOfIdOfDivForButtons]==undefined);
    for (var field in handleJson) {
        btn = document.createElement('button'); // заносит в переменную btn значение: тег <button></button>
        btn.dataset['source']=field; // устанавливает атрибут data-source со значением field для btn. Текстовая строка.
        btnText = document.createTextNode(handleJson[field].buttonText);
        btn.appendChild(btnText);
        if (divForButtons.id=="DivForButtonsToEnter") { // сделать кнопку пассивной
            btn.classList.add("unclickedButton_"+nameOfPlay+"_choiced");
        }
        btn.onclick = function () {
            console.log({
                this: this, // button
                objectOfButtons: objectOfButtons
                /* {
                        ButtonsToEnter: [
                            button.disabledButton,
                            button.unclickedButton_Extradecomposers_choiced
                        ]
                 }
                 */
            });
            moveActive(this, PartOfIdOfDivForButtons, objectOfButtons);
        };
        /*
          1. objectOfButtons = {
                ButtonsToEnter: [
                    button.unclickedButton_Extradecomposers_choiced,
                    button.unclickedButton_Extradecomposers_choiced
                ]
             }
         */
        objectOfButtons[PartOfIdOfDivForButtons].push(btn);
        divForButtons.appendChild(btn);
    }
        console.log('objectOfButtons', objectOfButtons);
    console.groupEnd();
    //alert("В теле функции setButtons PartOfIdOfDivForButtons = "+PartOfIdOfDivForButtons);
}
function moveActive(clickedButton, PartOfIdOfDivForButtons, objectOfButtons) { // вызывается при клике на каждую из кнопок
    console.groupCollapsed('%cmoveActive', 'color:violet');
        console.trace('arguments', {
            '1 clickedButton' : clickedButton,
            '2 PartOfIdOfDivForButtons' : PartOfIdOfDivForButtons,
            '3 objectOfButtons': objectOfButtons
        });
    //alert("В теле функции moveActive PartOfIdOfDivForButtons = "+PartOfIdOfDivForButtons);
    var nameOfPlay = clickedButton.getAttribute('data-source'); // nameOfPlay == "Extradecomposers" или "Black_agent"
    // в зависимости от того, какая кнопка была кликнута
    var chosenPlay = window[nameOfPlay], otherButton;
    switch (clickedButton) {
        case objectOfButtons[PartOfIdOfDivForButtons][0]:
            otherButton = objectOfButtons[PartOfIdOfDivForButtons][1];
            break;
        case objectOfButtons[PartOfIdOfDivForButtons][1]:
            otherButton = objectOfButtons[PartOfIdOfDivForButtons][0];
            break;
    }
    //для функции
    clickedButton.setAttribute("disabled", "true");
    clickedButton.classList.remove("unclickedButton_"+nameOfPlay+"_choiced");
    clickedButton.classList.add("disabledButton");
    if ((otherButton.hasAttribute("disabled"))&&(otherButton.classList.contains("disabledButton"))) {
        otherButton.removeAttribute("disabled");
        otherButton.classList.remove("disabledButton");
        otherButton.classList.add("unclickedButton_"+nameOfPlay+"_choiced");
    } //////////////////////
    if (beginning.style.display == "none") {// if - была кликнута одна из кнопок в contentList

    } else { // когда была кликнута одна из кнок на заставке
        setComponentsOfBeginning(chosenPlay);
        openGates(); // В этой функции beginning получает значение "none".
        var DivForButtonsToRechoice = document.getElementById("DivForButtonsToRechoice");
        // buttons block
        // вызывается только один раз
        if (DivForButtonsToRechoice.innerHTML=="") {
            setButtonsToChoicePlay("ButtonsToRechoice", nameOfPlay); // 2-й вызов. При нем создаются кнопки в contentList
            //alert("После 2-го вызова setButtons PartOfIdOfDivForButtons = "+PartOfIdOfDivForButtons);
            //alert(objectOfButtons["ButtonsToRechoice"]!==undefined);
            console.log({ 'objectOfButtons': objectOfButtons, arguments:arguments  });
        }
        if ((objectOfButtons["ButtonsToRechoice"]!==undefined)&&
            (objectOfButtons["ButtonsToRechoice"].length==2)) {
            for (var runBtns=0; runBtns<2; runBtns++) {
                // кнопка в contentList, имеющая data-source соответствующий nameOfButtons.
                if(objectOfButtons["ButtonsToRechoice"][runBtns].getAttribute("data-source")==nameOfPlay) {
                    clickedButton=objectOfButtons["ButtonsToRechoice"][runBtns];
                } else {
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
            } //////////////////////
        }
    }
    addPartsToContentList(chosenPlay, nameOfPlay);
    loadAboutCharacters(chosenPlay);
    setColors(chosenPlay, nameOfPlay);
    headerLogotip.innerHTML = chosenPlay["headerLogotip"];
    console.groupEnd();
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
            //alert("setColors вызвана!");
            break;
        case Black_agent:
            if (beginning.style.display!=="none") {
                //preview_and_enter.style.color = "#F5BCA9";
                how_to_open_plays.style.color = "#2ECCFA";
                main_in_preview.style.color = "#A9BCF5";
                //alert("setColors вызвана!");
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
    /*otherButton.classList.add("unclickedButtonFor"+nameOfPlay);
     otherButton.classList.remove("disabledButton");
     if (clickedButton.classList[0].indexOf("unclicked")==0) {
     clickedButton.classList.remove((clickedButton.classList[0]));
     }
     clickedButton.classList.add("disabledButton"); */
    /*for (var runBtns=0; runBtns<2; runBtns++) {
     if (objectOfButtons[runBtns].classList[0].indexOf(nameOfPlay)==-1) {
     objectOfButtons[runBtns].classList.remove(objectOfButtons[runBtns].classList[1]);
     }
     objectOfButtons[runBtns].classList.add("unclickedButtonFor"+nameOfPlay);
     } */
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
            document.getElementById("paintreplics").onclick = function () {
                /* 1. Пробег по чекбоксам. Чекнутые роли собираются в checkedRoles
                 * 2. Пробег по репликам.
                 * Если нет конъюнкции:
                 *     Новая переменная получает значение name_in_h4.
                 *    Если есть "'s", но нет "Christian" и "Author", то новая переменная получает новое значение из
                 *    name_in_h4: подстрока от нулевого индекса до "'" не включительно.
                 *    В любом случае: новая переменная ищется в объекте checkedRoles.
                 *    Если обнаруживается, а у реплики нет раскраски (2-го класса), то реплика получает раскраску.
                 *    Иначе: если не обнаруживается, а у реплики есть раскраска, то реплика теряет раскраску.
                 * Если есть конъюнкция: готовый фрагмент кода.
                 * */
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
                            searchedRole = name_in_h4.substring(0, posOfAmp)
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
                            //alert("Роль в checkedRoles: "+searchedRole); // роль с пробелом есть в checkedRoles
                            defineNameInClass(searchedRole, divsWithReplics[runDivs], "paint");
                        }
                        else {
                            // реплики нечекнутой роли имеют раскраску и должны ее потерять:
                            if((!(searchedRole in checkedRoles))&&(divsWithReplics[runDivs].classList.length==2)) {
                                defineNameInClass(searchedRole,  divsWithReplics[runDivs], "deletePaint");
                            }
                        }
                    }
                    else { // если есть конъюнкция:
                        var namesInConjuction = name_in_h4.split(" & "),
                            numberOfCheckedRolesInConjuction = 0;
                        for (var runNamesInConjuction in namesInConjuction) { // пробег по именам в конъюнкции
                            if (namesInConjuction[runNamesInConjuction] in checkedRoles) {
                                numberOfCheckedRolesInConjuction++;
                                searchedRole = namesInConjuction[runNamesInConjuction];
                                /*if (numberOfCheckedRolesInConjuction>1) {
                                 break;
                                 } */
                            }
                        }
                        var delClass;
                        switch (numberOfCheckedRolesInConjuction) { // определение того, что должно быть с раскраской реплики.
                            case 0:// Не должно быть никакой раскраски. Если имеется раскраска (2-й класс реплики), то эта
                                // раскраска удаляется.
                                if (divsWithReplics[runDivs].classList.length==2) {
                                    delClass =  divsWithReplics[runDivs].classList[1];
                                    divsWithReplics[runDivs].classList.remove(delClass);
                                }
                                break;
                            case 1: // 2-й класс должен соответствовать чекнутой роли
                                if (divsWithReplics[runDivs].classList.contains("commonPaint")) {
                                    divsWithReplics[runDivs].classList.remove("commonPaint");
                                }
                                defineNameInClass(searchedRole,  divsWithReplics[runDivs], "paint");
                                if (divsWithReplics[runDivs].classList.length>2) {
                                    var delClass2 = divsWithReplics[runDivs].classList[1];
                                    divsWithReplics[runDivs].classList.remove(delClass2);
                                    //alert(divsWithReplics[runDivs].classList);
                                }
                                break;
                            default: // релпика с конъюнкцией должна получить раскраску commonPaint
                                if (divsWithReplics[runDivs].classList.length>1) {
                                    if(divsWithReplics[runDivs].classList[1].indexOf("paintedReplicsOf")==0) {
                                        delClass = divsWithReplics[runDivs].classList[1];
                                        divsWithReplics[runDivs].classList.remove(delClass);
                                    }
                                    // alert(divsWithReplics[runDivs].classList);
                                }
                                if (!(divsWithReplics[runDivs].classList.contains("commonPaint"))) {
                                    divsWithReplics[runDivs].classList.add("commonPaint");
                                }
                            // общая раскраска
                        }

                    }
                }
            };
        };  /*конец */
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
            case "Christian's grandpa"||"Mr Stevenson":
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

    /* передать:
     * 1. replics_of_choicedpart.replicsofchar_divs[rundivs]
     * или replics_of_choicedpart.authorreplics_divs[rundivs]
     * 2. Строку
     * */
}
function changePart(PartNumber, index_of_part, chosenPlay, addedHTMLToContainPart) { // PartNumber = "Part номер"
    presRolesObject = {};
    presRolesArray = [];
    replics_of_choicedpart.authorwords = [];
    replics_of_choicedpart.wordsofchar = [];
    addedHTMLToContainPart.toChooseRoles.listOfCheckboxes.innerHTML = "";
    addedHTMLToContainPart.top_of_play.titleOfPart.innerText = PartNumber + " " + chosenPlay["Parts"][index_of_part]["header"];
    addedHTMLToContainPart.content_of_play.innerHTML = "";
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
