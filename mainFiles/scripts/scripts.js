handleData('Extradecomposers');
handleData('Black_parody');
main.getElement("buttonToRechoice").onclick = function () {
    var idOfBody=main.getElement("body").id, nameOfPlay=idOfBody.substring(13);
    var changedNameOfPlay=finishTextOnButton (nameOfPlay);
    main.setHtmlIntoStaticElement("headerLogotip", window[changedNameOfPlay]["headerLogotip"]);
    addPartsToContentList(changedNameOfPlay);
    loadAboutCharacters(changedNameOfPlay);
    setColors(changedNameOfPlay, "no");
};









