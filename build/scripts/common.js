define($(function(){
        var $asides;
        var cnt=0, ntrv = setInterval(function(){
            $asides = $('aside');
            ++cnt;
            if ($asides.length){
                console.log('asides=>', $asides);
                $asides.on('mouseenter', function(){
                    $(this).addClass('fade').removeClass('fade-out');
                    // console.log(this.className);
                });
                $asides.on('mouseleave', function(){
                    $(this).addClass('fade-out');
                    console.log(this.className);
                });
                clearInterval(ntrv);
            }
            if (cnt>10){
                console.warn('Too long...');
                clearInterval(ntrv);
            }
        },200);
    }));