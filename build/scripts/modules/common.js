define($(function(){
    const classFade = 'fade';
    const classFadeOut = 'fade-out';
    const persons = [];
    var $personsNames, person, $replica, classAlien = 'alien';
    $('main').on('mouseenter mouseleave', '#asides aside', (event) => {
        if (event.type === 'mouseenter'){
            $(event.currentTarget).addClass(classFade).removeClass(classFadeOut);
        } else {
            $(event.currentTarget).addClass(classFadeOut);
        }
    }).on('click', '#chapter_filters input[type="checkbox"]', (event) => {
        if (!$personsNames){
            $personsNames = $('[data-person]');
            $('#text p').addClass(classAlien);
        }
        let checkbox = event.currentTarget,
            person = checkbox.name;

        console.log('person: ' + person, ' checkbox: ' + checkbox);

        if (checkbox.checked){
            console.log('checked');
            persons.push(person);
        } else {
            console.log('unchecked');
            persons.splice(persons.indexOf(person));
        }
        $personsNames.each(function(index){ 
            person = this.dataset.person; // console.log('person=>', person);
            $replica = $(this).next();
            if (persons.indexOf(person)===-1){
                $replica.addClass(classAlien);
            } else {
                $replica.removeClass(classAlien);
            }
        });
    });
}));