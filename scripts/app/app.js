const path = '/scripts/modules/views/';

require([   path+'default.js',
            path+'black_parody.js',
            path+'cabalistic_bewitching_hero.js'
    ], (defaultView, blackParodyView, cabalisticBewitchingHeroView) => {
    
    
    const   viewInstance = defaultView.getData(),
            $container = $('main');
    // 
    render = (View, contents) => {
        //
        const $viewElement = $(View.self.$el),
            compiled = _.template(contents)(View.data); 
        
        $viewElement.html(compiled);
        //
        $container.html($viewElement.find(View.selector).html());
    }
    //
    $.get(viewInstance.path, (contents) => render(viewInstance, contents));
});