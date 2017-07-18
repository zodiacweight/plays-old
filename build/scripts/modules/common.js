define($(function(){
    const classFade = 'fade';
    const classFadeOut = 'fade-out';
    $('main').on('mouseenter mouseleave', '#asides aside', (event) => {
        if (event.type === 'mouseenter'){
            $(this).addClass(classFade).removeClass(classFadeOut);
        } else {
            $(this).addClass(classFadeOut);
        }
    });
}));