// implement: Сделать следующее:
// todo: hello
// Щелкнуть на вкладке > move to opposite group
var Extradecomposers, Black_agent;
var body = document.getElementsByTagName("Body")[0],
    headerLogotip = document.getElementById("headerLogotip"),
    beginning = document.getElementById("beginning"),
    bigImageWithHeader = document.getElementById("bigImageWithHeader"),
    bigImage= document.getElementById("bigImage"),
    littleImages = document.getElementById("littleImages"),
    //preview_and_enter = document.getElementById("preview_and_enter"),
    main_in_preview = document.getElementById("main_in_preview"),
    how_to_open_plays = document.getElementById("how_to_open_plays"),
    enter = document.getElementById("enter"),
    contentlist = document.getElementById("contentlist"), toChooseRoles = document.getElementById("toChooseRoles"),
    rightHalf = document.getElementById("rightHalf"),
    mainArea = document.getElementById("mainArea"),
    arrayElementObject, checkboxes = [], replics_of_choicedpart = {},
    subjectName, className, itemsAboutCharacters = [], presRolesObject = {}, /* buttonsToChoicePlays, */
    presRolesArray = [];
    handleData('Extradecomposers'); // true
    handleData('Black_agent'); // false
document.getElementById("how_to_open_plays").onclick = function () {
    if (enter.innerHTML == "") {
        enter.innerHTML = "<p id='instruction'>Нажать на одну из кнопок и подождать, пока откроются ворота:</p>"+
            "<div id='DivForButtonsToEnter'></div><img id='gate' src='images/on_the_beginning/closed_gate.jpg'>";
        document.getElementById("instruction").style.color = "#0101DF";
        var DivForButtonsToEnter = document.getElementById("DivForButtonsToEnter");
        setButtonsToChoicePlay("ButtonsToEnter", "Extradecomposers"); // функция делает кнопки на заставке
    }
};






