/*
elements; // stored in closure
objectWithVariables={
        setHtml(),
        get(),
        set()

} */
handleData('Extradecomposers');
handleData('Black_agent');
objectWithVariables.getElement("how_to_open_play").onclick = function () {
    if (objectWithVariables.getElement("enter").innerHTML == "") {
        objectWithVariables.getElement("enter").innerHTML = "<p id='instruction'>Нажать на одну из кнопок и подождать, пока откроются ворота:</p>" +
            "<div id='DivForButtonsToEnter'></div><img id='gate' src='images/on_the_beginning/closed_gate.jpg'>";
        document.getElementById("instruction").style.color = "#0101DF";
        var DivForButtonsToEnter = document.getElementById("DivForButtonsToEnter");
        console.log('Goto setButtonsToChoicePlay');
        setButtonsToChoicePlay("ButtonsToEnter", "Extradecomposers");
    }
};






