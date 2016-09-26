var Extradecomposers, Black_agent;
var body = document.getElementsByTagName("Body")[0],
    headerLogotip = document.getElementById("headerLogotip"),
    beginning = document.getElementById("beginning"),
    bigImage= document.getElementById("bigImage"),
    littleImages = document.getElementById("littleImages"),
    main_in_preview = document.getElementById("main_in_preview"),
    how_to_open_plays = document.getElementById("how_to_open_plays"),
    enter = document.getElementById("enter"),
    contentlist = document.getElementById("contentlist"),
    rightHalf = document.getElementById("rightHalf"),
    mainArea = document.getElementById("mainArea"),
    arrayElementObject, checkboxes = [], replics_of_choicedpart = {},
    subjectName, className, itemsAboutCharacters = [], presRolesObject = {},
    presRolesArray = [];

handleData('Extradecomposers');
handleData('Black_agent');
how_to_open_plays.onclick = function () {
    if (enter.innerHTML == "") {
        enter.innerHTML = "<p id='instruction'>Нажать на одну из кнопок и подождать, пока откроются ворота:</p>"+
            "<div id='DivForButtonsToEnter'></div><img id='gate' src='/images/on_the_beginning/closed_gate.jpg'>";
        document.getElementById("instruction").style.color = "#0101DF";
        var DivForButtonsToEnter = document.getElementById("DivForButtonsToEnter");
        console.log('Goto setButtonsToChoicePlay');
        setButtonsToChoicePlay("ButtonsToEnter", "Extradecomposers");
    }
};






