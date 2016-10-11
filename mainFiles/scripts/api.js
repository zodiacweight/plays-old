var main = (function () {
    var elements = {
        body: document.getElementsByTagName("Body")[0],
        headerLogotip: document.getElementById("headerLogotip"),
        beginning: document.getElementById("beginning"),
        primary: document.getElementById("primary"),
        secondary: document.getElementById("secondary"),
        bigImage: document.getElementById("bigImage"),
        divWithLittleImages: document.getElementById("divWithLittleImages"),
        littleImages: document.getElementById("divWithLittleImages").getElementsByTagName("Img"),
        main_in_preview: document.getElementById("main_in_preview"),
        how_to_open_play: document.getElementById("how_to_open_plays"),
        enter: document.getElementById("enter"),
        buttonToEnter:  document.getElementById("buttonToEnter"),
        gate: document.getElementById("gate"),
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
        setHtmlIntoStaticElement: function (element_name, html) {
            elements[element_name].innerHTML = html;
        },
        getElement: function (element_name) {
            return elements[element_name];
        },
        addHTML: function (element_name, html) {
            elements[element_name].innerHTML += html;
        },
        regularVisibility: function (arr) {
            for (var runElems=0; runElems<3; runElems++) {
                elements[arr[runElems][0]].style.display=arr[runElems][1];
            }
        },
        setCssProperty: function (arr) {
            for (var clue=0; clue < arr.length; clue++) {
                elements[arr[clue][0]].style[arr[clue][1]]=arr[clue][2];
            }
        },
        addClassForStaticElement: function (element_name, addedClass) {
            elements[element_name].classList.add(addedClass);
        },
        removeClassForStaticElement: function (element_name, removedClass) {
            elements[element_name].classList.remove(removedClass);
        },
        setClickOnBeginningDivs: function (nameOfPlay, entrancesToSecondary, countElems) {
                entrancesToSecondary[countElems].onclick = function () {
                    setColors(nameOfPlay);
                    setComponentsOfPrimary(nameOfPlay);
                    $("#primary").fadeOut(670);
                    elements["secondary"].classList.remove("hidden");
                    setButtonsToChoicePlay("ButtonsToChoicePlay", nameOfPlay);
                };

        },
        setClickOnKey: function (nameOfPlay) {
            this.getElement("buttonToEnter").onclick = function () {
                main.setHtmlIntoStaticElement("headerLogotip", window[nameOfPlay]["headerLogotip"]);
                addPartsToContentList(nameOfPlay);
                loadAboutCharacters(nameOfPlay);
                openGates();
            }
        }
    };
})();
var presRoles = {
    Array: [],
    Obj: {}
};
var handleJson = {
    Extradecomposers: {
        path: 'mainFiles/jsons/special_scavengers.json',
        handle: function (data) {
            this.data = data;
            main.getElement("contentlist").style.display = "none";
            main.getElement("rightHalf").style.display = "none";
            setTimeout(function () {
                $("#primary").fadeIn(2400);
            }, 1800);
        },
        data:null,
        buttonText: 'Extradecomposers'
    },
    Black_parody: {
        path: 'mainFiles/jsons/black_parody.json',
        handle: function (data) {
            this.data = data;
        },
        data:null,
        buttonText: 'Black_parody'
    }
};