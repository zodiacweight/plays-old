const modules_path = 'scripts/modules/';
const contents_path = 'contents/';
const jsons_path = 'data/jsons/';
var temp_param = '?param=' + new Date().getTime();
// const path = modules_path + 'modules/views/';

require([   modules_path + 'common.js' + temp_param, 
            modules_path + 'json_parser.js'], 
            (   jqueryResponse, 
                jsonParser  ) => {

    var Views = {};
    
    const $body = $('body');
    //
    const $container = $('main');
    // 
    const render = (View, no_text) => {
        //
        var $viewElement = $(View.$el), // Backbone.View instance
            contents = no_text ? View.data : jsonParser.parse(View.data),
            compiled = _.template(View.tmpl)(contents);
        $viewElement.html(compiled); 
        console.log('Data=>', {
            compiled:compiled, View:View, contents:contents
        });
        $container.html($viewElement.find('script[type="text/template"]').html());
    };

    const setView = (view, no_text) => {
        /* if undefined (i.e. ─ at a first run), store a reference to object 
        from <view>.js in the local variable */
        //if (!Views[view]){
            var template, json_full_path = jsons_path;
            if (no_text){
                template = view;
            } else {
                template = 'chapter';
                json_full_path += 'texts/';
            }
            // get template and json
            // *** We need only 3 templates! ─ home (default), chapter and 404
            $.when( $.get(contents_path + 'templates/' + template + '.html' + temp_param), // template
                    $.getJSON(contents_path + json_full_path + view + '.json' + temp_param) // data
            ).then((tmpl, contents) => {
                    //console.log('%cDone=>', 'background-color: lightgreen', {tmpl:tmpl, contents:contents});
                    // store View instance for further using
                    Views[view] =  new (Backbone.View.extend({
                        data: contents[0],
                        tmpl: tmpl[0]
                    })); // console.log('check View', {view: view, 'Views[view]': Views[view]});
                    // console.log('test no_text, location =>', { no_text: no_text, location: /\/[\d]{1,}(\.\d{1,})?$/g.test(location.href) });
                    render(Views[view], no_text);
                    // get text
                    const $textBlock = $('#text');
                    
                    if (!no_text){
                        var templateData = jsonParser.parse(contents[0], view);
                        // check chapter
                        if (/\/[\d]{1,}(\.\d{1,})?$/g.test(location.href)){
                            var chapterNumber = location.href.split('/').pop();
                            $.getJSON(contents_path + json_full_path + view + '/' + chapterNumber + '.json' + temp_param)
                                .then((text) => {
                                    var templateDataText = jsonParser.parse(text, true);
                                    console.log('got text! =>', { text: text, templateDataText: templateDataText });
                                    $('#chapter_filters').html(templateDataText.filters);
                                    $('#heroes-filter').fadeIn(500);
                                    $textBlock.html(templateDataText.html);
                                }, () => { // console.warn('Someting went terribly wrong...');
                                    setView('404', true);
                                });                        
                        } else { // not a chapter, just a title page
                            // check if the URL is correct...  
                            var rgxp = new RegExp('\/#'+view+'$', 'g'); // \/#nihilistic_parody$
                            if (rgxp.test(location.href)){
                                // console.log('%cCheck article', 'pink', { templateData: templateData, chapters: templateData.chapters, box: $textBlock});
                                $textBlock.html(templateData.chapters);
                                $('#stories-preview').fadeIn(500, () => {
                                    $('#about-characters').fadeIn(800);
                                });
                            } else {                                
                                setView('404', true);
                            }
                        }
                        const $chaptersListMenu = $('#chapters-list-menu');
                        if ($chaptersListMenu.length) {
                            $chaptersListMenu.html(templateData.chapters);
                        }
                    }
            }, (mess) => {
                console.warn('Something went wrong...');
            });
        /* } else {
            console.log('Use Views[' + view + '] stored before=>', Views[view]);
            render(Views[view], no_text);
        } */
        // set background image to body:after
        $body.removeClass().addClass(view);

        // console.log('view=>', view);
    };

    //
    const AppRouter = Backbone.Router.extend({
        routes: {
            '': () => setView('default', true),
            'nihilistic_parody(/:chapter)': () => setView('nihilistic_parody'),
            'cabalistic_bewitching_hero(/:chapter)': () => setView('cabalistic_bewitching_hero'),
            'joshua_world': () => setView('joshua_world'),
            'unbalanced': () => setView('unbalanced'),
            '*other': () => setView('404', true)
        }
    });

    const appRouter = new AppRouter();
    Backbone.history.start();
});