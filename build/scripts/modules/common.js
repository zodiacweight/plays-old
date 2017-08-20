define(function(){
    const classFade = 'fade';
    const classFadeOut = 'fade-out';
    const persons = [];
    const contentsBlockId = 'chapter_filters';
    const classAlien = 'alien';
    const parentTagName = 'main';
    const inputBox = 'input[type="checkbox"]';
    let personName; 

    $(function(){
        $(parentTagName).on('mouseenter mouseleave', '#asides aside', event => {
            (event.type === 'mouseenter') ?
                $(event.currentTarget).addClass(classFade).removeClass(classFadeOut)
                : $(event.currentTarget).addClass(classFadeOut);
        }).on('click', `#${contentsBlockId} ${inputBox}`, event => {
            // if there are no checked boxes, make all unmarked
            if (!$(`${parentTagName} #${contentsBlockId} ${inputBox}:checked`).length){
                $(`.${classAlien}`).removeClass(classAlien);
                return;
            }
            personName = event.currentTarget.name; //console.log('checked, event ', $(`${parentTagName} #${contentsBlockId} ${inputBox}:checked`).length, event);
            // add or remove block
            (event.currentTarget.checked) ? persons.push(personName) : persons.splice(persons.indexOf(personName));            
            $('[data-person]').each((index, personTag) => {
                //
                let action = (persons.indexOf(personTag.dataset.person) === -1) ? 'addClass' : 'removeClass';
                $(personTag)[action](classAlien);
                $(personTag).next()[action](classAlien);
            });
        });
    });
    return {
        contentsBlockId: contentsBlockId
    };
});