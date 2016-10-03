handleData('Extradecomposers');
handleData('Black_parody');
objectWithVariablesAndFunctions.getElement("how_to_open_play").onclick = function () {
    var enter = objectWithVariablesAndFunctions.getElement("enter");
    if (objectWithVariablesAndFunctions.getElement("enter").innerHTML == "") {
        var afterEnter = [
            "<p id='instruction'>Нажать на одну из кнопок и подождать, пока откроются ворота:</p>",
            "<div id='DivForButtonsToEnter'></div>",
            "<img id='gate' src='images/on_the_beginning/closed_gate.jpg'>"
        ];
        objectWithVariablesAndFunctions.setHtmlIntoStaticElement("enter", afterEnter);
        document.getElementById("instruction").style.color = "#0101DF";
        var DivForButtonsToEnter = document.getElementById("DivForButtonsToEnter");
        setButtonsToChoicePlay("ButtonsToEnter", "Extradecomposers");
    }
};






