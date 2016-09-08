// implement: Сделать следующее:
// todo: hello
// Щелкнуть на вкладке > move to opposite group
var Extradecomposers, Black_agent, black_agent;
var body = document.getElementsByTagName("Body")[0],
    headerLogotip = document.getElementById("headerLogotip"),
    beginning = document.getElementById("beginning"),
    bigImageWithHeader = document.getElementById("bigImageWithHeader"),
    header = document.getElementById("header"),
    bigImage= document.getElementById("bigImage"),
    littleImages = document.getElementById("littleImages"),
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
            "<div id='buttonsToEnter'></div><img id='gate' src='images/на%20заставку/закрытые%20ворота.jpg'>";
        var DivForButtonsToEnter = document.getElementById("buttonsToEnter");
        /*alert (typeof(arrayOfButtonsToEnter));
        alert(Object.keys(arrayOfButtonsToEnter)); */
        setButtonsToEnter(DivForButtonsToEnter /*, arrayOfButtonsToEnter */); // функция делает кнопки на заставке
    }
    /*document.getElementById("buttonsToEnter").innerHTML = '<button data-source="Extradecomposers">' +
        'Extra-decomposers</button><button data-source="Black_agent">Black agent</button>';
    buttonsToChoicePlays = document.getElementById("preview_and_enter").getElementsByTagName("Button");*/
     // функция вызывается для того, чтобы дать клик кнопкам на заставке
};






