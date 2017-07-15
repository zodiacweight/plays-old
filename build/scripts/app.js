const common_path = 'scripts/modules/views/';
const build_path = (location.href.indexOf('/build') === -1) ? '' : 'build/';
const path = build_path + common_path;

console.log('path=>', path);

const chapters = {
    black_parody: 'black_parody'
    , cabalistic_bewitching_hero: 'cabalistic_bewitching_hero'
    , joshua_world: 'joshua_world'
    , junbalanced: 'unbalanced'
};

require([   path + 'default.js',
            path + 'black_parody.js',
            path + 'cabalistic_bewitching_hero.js',
            path + 'joshua_world.js',
            path + 'unbalanced.js',
            path + 'not_found.js'            
    ], (    defaultView, 
            blackParodyView, 
            cabalisticBewitchingHeroView, 
            joshuaWorldView,
            unbalancedView,
            notFoundView    ) => {

    // views instances. Values to be set after. 
    // (Look carefully: not the same as params above)
    var viewDefault,
        viewBlackParody,
        viewCabalisticBewitchingHero,
        viewJoshuaWorld,
        viewUnbalanced,
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
    const views_path = build_path + 'contents/views/';
    console.log('views_path=>', views_path);
    // set page content
    const setView = (view, objectView) =>{
        if (!view) view = objectView['getData'](); 
        console.log('get=>', views_path + view.path + '.html');
        $.get(views_path + view.path + '.html', (contents) => render(view, contents));
    };
    //
    const AppRouter = Backbone.Router.extend({
        routes: {
            '': 'go_home',
            'black_parody': 'run_black_parody',
            'cabalistic_bewitching_hero': 'run_cabalistic_bewitching_hero',
            'joshua_world': 'run_joshua_world',
            'unbalanced': 'run_unbalanced',
            '*other': 'not_found'
        },
        go_home:            () => setView(viewDefault, defaultView),
        run_black_parody:   () => setView(viewBlackParody, blackParodyView),
        run_cabalistic_bewitching_hero: () => setView(viewCabalisticBewitchingHero, cabalisticBewitchingHeroView),
        run_joshua_world: () => setView(viewJoshuaWorld, joshuaWorldView),
        run_unbalanced: () => setView(viewUnbalanced, unbalancedView),
        not_found:          () => setView(view404, notFoundView)
    });

    const appRouter = new AppRouter();
    Backbone.history.start();

});