var replix = [
    {},
    {},
    {},
    {},
    {},
    {},
    {}
];
window.onload=function() {
    var introduction = document.getElementById("introduction"),
        words = document.getElementsByClassName("words"),
        checks = document.getElementsByClassName('check_character'),
        wLength = words.length,
        personageName;
    introduction.style.dispaly = "none";
    console.log({checks: checks, words: words});
    // персонажи
    var personages = [];
    for (var i = 0, length_of_checks = checks.length; i < length_of_checks; i++) {
        personages.push(checks[i].value);
    }

    for (i = 0; i < wLength; i++) {
        personageName = words[i].getElementsByTagName('H4')[0].innerText;
        console.log('personageName: %c' + personageName, 'color: orange');
    }

    // выяснить, какие из чекбоксов отмечены и обработать связанные с ними блоки
    for (i = 0, length_of_checks = checks.length; i < length_of_checks; i++) {
        // если чекбокс отмечен:
        if (checks[i].checked) {
            for (var j = 0, numb_of_replics = words.length; j < numb_of_replics; j++) {
                /*if(checks[i].value==){

                 }*/
            }
        }
        console.log({
            checks: checks,
            check: checks[i]
        });
    }
    /*for (i=0;i<4;i++) {
     checks[i]=document.getElementsByClassName("checkbox[i]");
     } */
    document.getElementById("choice").onclick = function () {

    };
    document.getElementById("button").onclick = function () {
        if (introduction.style.display == "none") { // если текст скрыт, он открывается
            this.style.color = "#084B8A"; // посветлее
            this.value = "Закрыть";
            introduction.style.display = "block";
        }
        else { // если текст открыт, он закрывается, подчеркивание исчезает
            this.style.color = "#black";  // потемнее
            this.value = "About characters";
            introduction.style.display = "none";
        }
    };
};