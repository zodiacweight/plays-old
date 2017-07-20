define($(function(){
    const classFade = 'fade';
    const classFadeOut = 'fade-out';
    $('main').on('mouseenter mouseleave', '#asides aside', (event) => {
        if (event.type === 'mouseenter'){
            $(event.currentTarget).addClass(classFade).removeClass(classFadeOut);
        } else {
            $(event.currentTarget).addClass(classFadeOut);
        }
    });
}));