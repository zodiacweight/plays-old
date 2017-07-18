const modules_path = 'scripts/modules/';
const contents_path = 'contents/';
// const path = modules_path + 'modules/views/';

require([   modules_path + 'common.js', 
            modules_path + 'json_parser.js'], 
            (   jqueryResponse, 
                jsonParser  ) => {

    var Views = {};
    //
    const $container = $('main');
    // 
    const render = (View) => {
        //
        var $viewElement = $(View.$el), // Backbone.View instance
            contents = "chapter" in View.data ? {chapter:jsonParser.parse(View.data.chapter)} : View.data,
            compiled = _.template(View.tmpl)(contents);
        $viewElement.html(compiled); 
        console.log('Data=>', {
            compiled:compiled, View:View, contents:contents
            //'$viewElement.html':$viewElement.html(),
            //$viewElement:$viewElement,
            //'View.data':View.data,            
        });
        $container.html($viewElement.find('script[type="text/template"]').html());
    };

    const setView = (view, no_text) => {
        /* if undefined (i.e. ─ at a first run), store a reference to object 
        from <view>.js in the local variable */
        if (!Views[view]){
            var template = no_text ? view : 'chapter';
            // get template and json
            // *** We need only 3 templates! ─ home (default), chapter and 404
            $.when( $.get(contents_path + 'templates/' + template + '.html'), // template
                    $.get(contents_path + 'data/jsons/' + view + '.json') // data
            ).then((tmpl, contents) => {
                    //console.log('Done=>', {tmpl:tmpl, contents:contents});
                    // store View instance for further using
                    Views[view] =  new (Backbone.View.extend({
                        data: no_text ? contents[0] : { chapter: contents[0] },
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