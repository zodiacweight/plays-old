var objectWithVariables = /*( */function () {
    var elements = {
        body: document.getElementsByTagName("Body")[0],
        headerLogotip: document.getElementById("headerLogotip"),
        beginning: document.getElementById("beginning"),
        bigImage: document.getElementById("bigImage"),
        divWithLittleImages: document.getElementById("littleImages"),
        littleImages: document.getElementById("littleImages").getElementsByTagName("Img"),
        main_in_preview: document.getElementById("main_in_preview"),
        how_to_open_play: document.getElementById("how_to_open_plays"),
        enter: document.getElementById("enter"),
        contentlist: document.getElementById("contentlist"),
        DivForButtonsToRechoice: document.getElementById("DivForButtonsToRechoice"),
        listOfParts: document.getElementById("listOfParts"),
        rightHalf: document.getElementById("rightHalf"),
        mainArea: document.getElementById("mainArea"),
        checkboxes: [],
        replics_of_choicedpart: {},
        presRolesArray: [],
        presRolesObject: {},
        itemsAboutCharacters: []
    };
    return {
        setHtml: function (element_name, html) {
            elements[element_name].innerHTML = html;
        },
        getElement: function (element_name) {
            return elements[element_name];
        },
        addHTML: function (element_name, html) {
            elements[element_name].innerHTML += html;
        }
        /*
         ,
         setDisplay: function (element_name, displayProperty) {
         elements[element_name].display=displayProperty;
         },
        setStyle: function (element_name, nameOfStyle, propertyOfStyle) {
            elements[element_name].style[nameOfStyle]=propertyOfStyle;
        } */
    };
}/*)()*/; // IIFE Immediately Invoked Function Expression

/*
elements; // stored in closure
objectWithVariables={
        setHtml(),
        get(),
        set()

} */
handleData('Extradecomposers');
handleData('Black_agent');
objectWithVariables().getElement("how_to_open_play").onclick = function () {
    if (objectWithVariables().getElement("enter").innerHTML == "") {
        objectWithVariables().getElement("enter").innerHTML = "<p id='instruction'>Нажать на одну из кнопок и подождать, пока откроются ворота:</p>" +
            "<div id='DivForButtonsToEnter'></div><img id='gate' src='images/on_the_beginning/closed_gate.jpg'>";
        document.getElementById("instruction").style.color = "#0101DF";
        var DivForButtonsToEnter = document.getElementById("DivForButtonsToEnter");
        console.log('Goto setButtonsToChoicePlay');
        setButtonsToChoicePlay("ButtonsToEnter", "Extradecomposers");
    }
};






