const path = '/scripts/modules/views/';

require([   path+'default.js',
            path+'black_parody.js',
            path+'cabalistic_bewitching_hero.js'
    ], function (defaultView, blackParodyView, cabalisticBewitchingHeroView) {
    
    var viewInstance = defaultView.getData(),
        $container = $('main');
    // 
    function render(View, contents) {
        //
        var $viewElement = $(View.self.$el),
            compiled = _.template(contents)(View.data); 
        $viewElement.html(compiled);
        //
        $container.html($viewElement.find(View.selector).html());
    }
    //
    $.get(viewInstance.path, function (contents) {
        render(viewInstance, contents);
    });
});