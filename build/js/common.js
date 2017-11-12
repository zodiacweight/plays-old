
$(function(){
    const classFade = 'fade';
    const classFadeOut = 'fade-out';
    const persons = [];
    const contentsBlockId = 'chapter_filters';
    const classAlien = 'alien';
    const parentTagName = 'main';
    const inputBox = 'input[type="checkbox"]';

    let personName; 

    $(parentTagName).on('mouseenter mouseleave', '#asides aside', event => {
        (event.type === 'mouseenter') ?
            $(event.currentTarget).addClass(classFade).removeClass(classFadeOut)
            : $(event.currentTarget).addClass(classFadeOut);
    }).on('click', `#${contentsBlockId} ${inputBox}`, event => {
        // if there are no checked boxes, make all unmarked
        // main chapter_filters input[type="checkbox"]:checked
        if (!$(`${parentTagName} #${contentsBlockId} ${inputBox}:checked`).length){
            // .alien
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
    const titleTagName = "span",
        $chaptersContainer = $("#chapters"),
        $chaptersListMenu = $chaptersContainer.find("#chapters-list-menu"),
        $chaptersParagraphs = $chaptersContainer.find("p"),
        noOverflowClass = "no-overflow";
    $chaptersParagraphs.on('mouseenter mouseleave', function(event){
        const $p = $(this);
        //
        if (event.type === "mouseenter"){
            const $pA = $p.find("a");
            if (parseInt($p.css("width")) < parseInt($pA.css("width"))){
                const offsetLeft = $p.offset().left,
                    offsetTop = $p.position().top,
                    title = $(`<${titleTagName}></${titleTagName}>`)
                        .text($pA.text())
                        .addClass("title")
                        .css({
                            position: "fixed",
                            left: `${offsetLeft}px`,
                            top: `${offsetTop}px`
                        });
                $p.append(title);
                $chaptersListMenu.addClass(noOverflowClass);
            }
        } else {
            $p.find(titleTagName).remove();
            $chaptersListMenu.removeClass(noOverflowClass);
        }
    });
    $('p').on('click', titleTagName, function(){
        // either trigger nor triggerHandler don't work :( https://stackoverflow.com/questions/20928915/jquery-triggerclick-not-working
        $(this).parent('p').find('a')[0].click();
     });
});