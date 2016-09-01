var Extradecomposers, black_agent /*playsByDefault */;
var body = document.getElementsByTagName("Body")[0],
    header = document.getElementById("header"),
    beginning = document.getElementById("beginning"),
    mainImage = document.getElementById("mainImage"),
    littleImages = document.getElementById("littleImages"),
    enter = document.getElementById("enter"),
    contentlist = document.getElementById("contentlist"), toChooseRoles = document.getElementById("toChooseRoles"),
    forLoadingPart = document.getElementById("forLoadingPart"),
    areaForPart = document.getElementById("areaForPart"),
    listOfCheckboxes, arrayElementObject, checkboxes = [], replics_of_choicedpart={}, parts_with_numbers =[],
    subjectName, className, itemsAboutCharacters = [], presrolesobject = {}, /* buttonsToChoicePlays, */
    presrolesarray = [];

handleData('mainFiles/jsons/special_scavengers.json', 'Extradecomposers', initUI);
handleData('mainFiles/jsons/black_agent.json', 'Black_agent', initUI);
//handleData('mainFiles/jsons/special_scavengers.json', fakeFunction);

document.getElementById("how_to_open_plays").onclick = function () {
    document.getElementById("instruction").innerHTML='<p>Нажать на одну из кнопок и подождать, пока откроются ворота:</p>'+
        '<img src="images/на%20заставку/закрытые%20ворота.jpg">';
    document.getElementById("buttonsToEnter").innerHTML='<button id="enterExD1">'+
        'Extra-decomposers</button><button id="enterBlackAgent1">Black agent</button>';
    buttonsToChoicePlays = document.getElementById("preview_and_enter").getElementsByTagName("Button");
    var thisElement, otherElement, runbuts=0;
    setOnClick (buttonsToChoicePlays);
};
