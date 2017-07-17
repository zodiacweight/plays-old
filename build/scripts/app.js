const scripts_path = 'scripts/';
const contents_path = 'contents/';
const path = scripts_path + 'modules/views/';

require([scripts_path + 'common.js'], (jqueryResponse) => {

    var Views = {};
    //
    const $container = $('main');
    // 
    const render = (View) => {
        //
        var $viewElement = $(View.$el), // Backbone.View instance
            compiled = _.template(View.tmpl)(View.data);
        $viewElement.html(compiled); 
        console.log('Data=>', {
            compiled:compiled, 
            'View.data':View.data,
            '$viewElement.html':$viewElement.html(),
            View:View, 
            $viewElement:$viewElement
        });
        $container.html($viewElement.find(View.selector).html());
    };

    const setView = (view) => {
        /* if undefined (i.e. ─ at a first run), store a reference to object 
        from <view>.js in the local variable */
        if (!Views[view]){
            // get template and json
            $.when( $.get(contents_path + 'views/' + view + '.html'), // template
                    $.get(contents_path + 'data/jsons/' + view + '.json') // data
            ).then((tmpl, contents) => {
                    // console.log('Done=>', {tmpl:tmpl, contents:contents});
                    // store View instance for futher using
                    Views[view] =  new (Backbone.View.extend({
                        selector: '#' + view,
                        data: contents[0],
                        tmpl: tmpl[0]
                    })); // console.log('check View', {view: view, 'Views[view]': Views[view]});
                    render(Views[view]);
            }, (mess) => {
                console.warn('Something went wrong...');
            });
        } else {
            render(Views[view]);
        }
        console.log('view=>', view);
    };

    //
    const AppRouter = Backbone.Router.extend({
        routes: {
            '':                             () => setView('default'),
            'black_parody':                 () => setView('black_parody'),
            'cabalistic_bewitching_hero':   () => setView('cabalistic_bewitching_hero'),
            'joshua_world':                 () => setView('joshua_world'),
            'unbalanced':                   () => setView('unbalanced'),
            '*other':                       () => setView('not_found')
        }
    });

    const appRouter = new AppRouter();
    Backbone.history.start();

    console.log(jqueryResponse);
});