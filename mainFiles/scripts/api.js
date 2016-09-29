var objectWithVariables = (function () {
    var elements = {
        body: document.getElementsByTagName("Body")[0],
        headerLogotip: document.getElementById("headerLogotip"),
        beginning: document.getElementById("beginning"),
        bigImage: document.getElementById("bigImage"),
        divWithLittleImages: document.getElementById("divWithLittleImages"),
        littleImages: document.getElementById("divWithLittleImages").getElementsByTagName("Img"),
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
})(); // IIFE Immediately Invoked Function Expression
var presRoles = {
    Array: [],
    Obj: {}
};
var handleJson = {
    Extradecomposers: {
        path: 'mainFiles/jsons/special_scavengers.json',
        handle: function (data) {
            this.data = data;
            objectWithVariables.getElement("contentlist").style.display = "none";
            objectWithVariables.getElement("rightHalf").style.display = "none";
            setComponentsOfBeginning(data.Extradecomposers);
            setColors("Extradecomposers");
            /* objectWithVariables.variables.main_in_preview.style.color = "mediumvioletred";
             objectWithVariables.variables.how_to_open_play.style.color = "mediumblue"; */
            setTimeout(function () {
                $("#beginning").fadeIn(2400);
            }, 1800);
        },
        data:null,
        buttonText: 'Extradecomposers'
    },
    Black_agent: {
        path: 'mainFiles/jsons/black_agent.json',
        handle: function (data) {
            this.data = data;
        },
        data:null,
        buttonText: 'Black_agent'

    }
};