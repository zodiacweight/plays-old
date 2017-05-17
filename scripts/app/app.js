const path = '/scripts/modules/views/';

require([   path + 'default.js',
            path + 'black_parody.js',
            path + 'cabalistic_bewitching_hero.js',
            path + 'not_found.js'            
], (defaultView, blackParodyView, cabalisticBewitchingHeroView, notFoundView) => {

    const $container = $('main');
    // views instances
    var viewDefault,
        viewBlackParody,
        viewCabalisticBewitchingHero,
        view404;
    // 
    render = (View, contents) => {
        //
        var $viewElement = $(View.self.$el),
            compiled = _.template(contents)(View.data);

        $viewElement.html(compiled);
        //
        $container.html($viewElement.find(View.selector).html());
    }
    //
    const AppRouter = Backbone.Router.extend({
        routes: {
            '': 'go_home',
            'black_parody': 'run_black_parody',
            'cabalistic_bewitching_hero': 'run_cabalistic_bewitching_hero',
            '*other': 'not_found'
        },
        go_home: () => {
            if (!viewDefault) viewDefault = defaultView.getData();
            $.get(viewDefault.path, (contents) => render(viewDefault, contents));
        },
        run_black_parody: () => {
            if (!viewBlackParody) viewBlackParody = blackParodyView.getData();
            $.get(viewBlackParody.path, (contents) => render(viewBlackParody, contents));
        },
        run_cabalistic_bewitching_hero: () => {
            if (!viewCabalisticBewitchingHero) viewCabalisticBewitchingHero = cabalisticBewitchingHeroView.getData();
            $.get(viewCabalisticBewitchingHero.path, (contents) => render(viewCabalisticBewitchingHero, contents));
        },
        not_found: () => {
            if (!view404) view404 = notFoundView.getData();
            $.get(view404.path, (contents) => render(view404, contents));
        }
    });

    const appRouter = new AppRouter();
    Backbone.history.start();

});