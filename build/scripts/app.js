const path = '/scripts/modules/views/';

require([   path + 'default.js',
            path + 'black_parody.js',
            path + 'cabalistic_bewitching_hero.js',
            path + 'not_found.js'            
], (defaultView, blackParodyView, cabalisticBewitchingHeroView, notFoundView) => {

    // views instances
    var viewDefault,
        viewBlackParody,
        viewCabalisticBewitchingHero,
        view404;
    //
    const $container = $('main');
    // 
    const render = (View, contents) => {
        //
        var $viewElement = $(View.self.$el),
            compiled = _.template(contents)(View.data);

        $viewElement.html(compiled); 
        $container.html($viewElement.find(View.selector).html());
    };
    //
    const setView = (view, objectView) =>{
        if (!view) view = objectView['getData'](); 
        $.get(view.path, (contents) => render(view, contents))
    };
    //
    const AppRouter = Backbone.Router.extend({
        routes: {
            '': 'go_home',
            'black_parody': 'run_black_parody',
            'cabalistic_bewitching_hero': 'run_cabalistic_bewitching_hero',
            '*other': 'not_found'
        },
        go_home: () => setView(viewDefault, defaultView),
        run_black_parody: () => setView(viewBlackParody, blackParodyView),
        run_cabalistic_bewitching_hero: () => setView(viewCabalisticBewitchingHero, cabalisticBewitchingHeroView),
        not_found: () => setView(view404, notFoundView)
    });

    const appRouter = new AppRouter();
    Backbone.history.start();

});