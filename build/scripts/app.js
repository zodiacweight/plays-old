const path = '/scripts/modules/views/';
const chapters = {
    black_parody: 'black_parody'
    , cabalistic_bewitching_hero: 'cabalistic_bewitching_hero'
    , joshua_world: 'joshua_world'
    //, secret_agent: 'secret_agent',
    //, special_scavangers: 'special_scavangers',
    //, xmarine: 'xmarine'
};

require([   path + 'default.js',
            path + 'black_parody.js',
            path + 'cabalistic_bewitching_hero.js',
            path + 'joshua_world.js',
            path + 'not_found.js'            
    ], (    defaultView, 
            blackParodyView, 
            cabalisticBewitchingHeroView, 
            joshuaWorldView,
            notFoundView    ) => {

    // views instances. Values to be set after. 
    // (Look carefully: not the same as params above)
    var viewDefault,
        viewBlackParody,
        viewCabalisticBewitchingHero,
        viewJoshuaWorld,
        view404;
    //
    const $container = $('main');
    // 
    const render = (View, contents) => {
        //
        var $viewElement = $(View.self.$el),
            compiled = _.template(contents)(View.data);
        // console.log('Data=>', {'View.data':View.data, View:View, $viewElement:$viewElement});
        $viewElement.html(compiled); 
        $container.html($viewElement.find(View.selector).html());
    };
    // set page content
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
            'joshua_world': 'run_joshua_world',
            '*other': 'not_found'
        },
        go_home:            () => setView(viewDefault, defaultView),
        run_black_parody:   () => setView(viewBlackParody, blackParodyView),
        run_cabalistic_bewitching_hero: () => setView(viewCabalisticBewitchingHero, cabalisticBewitchingHeroView),
        run_joshua_world: () => setView(viewJoshuaWorld, joshuaWorldView),
        not_found:          () => setView(view404, notFoundView)
    });

    const appRouter = new AppRouter();
    Backbone.history.start();

});