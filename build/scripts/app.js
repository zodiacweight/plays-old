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
        $container.html($viewElement.find('script[type="text/template"]').html());
    };

    const setView = (view, no_text) => {
        /* if undefined (i.e. ─ at a first run), store a reference to object 
        from <view>.js in the local variable */
        if (!Views[view]){
            var template = no_text ? view : 'text';
            // get template and json
            // *** We need only 3 templates! ─ home (default), text and 404
            $.when( $.get(contents_path + 'templates/' + template + '.html'), // template
                    $.get(contents_path + 'data/jsons/' + view + '.json') // data
            ).then((tmpl, contents) => {
                    var data;
                    console.log('Done=>', {tmpl:tmpl, contents:contents});
                    if (no_text) {
                        data = contents[0];
                        console.log('data tmpl=>', data);
                    } else {
                        data = { text: contents[0] };
                        console.log('data no tmpl=>', data);
                    }   
                    // store View instance for further using
                    Views[view] =  new (Backbone.View.extend({
                        // selector: '#' + view,
                        data: data,
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
            '':                             () => setView('default', true),
            'black_parody':                 () => setView('black_parody'),
            'cabalistic_bewitching_hero':   () => setView('cabalistic_bewitching_hero'),
            'joshua_world':                 () => setView('joshua_world'),
            'unbalanced':                   () => setView('unbalanced'),
            '*other':                       () => setView('404', true)
        }
    });

    const appRouter = new AppRouter();
    Backbone.history.start();

    console.log(jqueryResponse);
});