const modules_path = 'scripts/modules/';
const contents_path = 'contents/';
const jsons_path = 'data/jsons/';
const temp_param = '?param=' + new Date().getTime();
const default_name = 'default';
// const path = modules_path + 'modules/views/';

require([   modules_path + 'common.js' + temp_param, 
            modules_path + 'json_parser.js' + temp_param], 
            (   jqueryResponse, // jquery handler
                jsonParser) => { // console.log('jqueryResponse', jqueryResponse);
                //
    const Views = {};
    //
    const $body = $('body');
    //
    const $container = $('main');
    //
    const render = (View, no_text) => {
        console.log('View=>', View);
        //
        const $viewElement = $(View.$el), // Backbone.View instance
            // View.data = contents[0], json itself
            contents = no_text ? View.data : jsonParser.parse(View.data),
            compiled = _.template(View.tmpl)(contents);
        $viewElement.html(compiled); 
        //console.log('Data=>', { compiled:compiled, View:View, contents:contents });
        $container.html($viewElement.find('script[type="text/template"]').html());
        return contents;
    };

    const setView = (view, no_text) => {
        /* if undefined (i.e. ─ at a first run), store a reference to object 
        from <view>.js in the local variable */
        //if (!Views[view]){
        let template;
        let templateData;
        let json_full_path = jsons_path;

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
            // store View instance for further using
            Views[view] =  new (Backbone.View.extend({
                data: contents[0],
                tmpl: tmpl[0]
            })); // console.log('check View', {view: view, 'Views[view]': Views[view]});
            // console.log('%cDone=>', 'background-color: lightgreen', {tmpl: tmpl, view: view, 'Views[view]': Views[view], contents: contents});
            // console.log('test no_text, location =>', { no_text: no_text, location: /\/[\d]{1,}(\.\d{1,})?$/g.test(location.href) });
            const renderedContents = render(Views[view], no_text);
            // get text
            const $textBlock = $('#text');
            // texts
            if (!no_text){
                // get parsed json data
                templateData = jsonParser.parse(contents[0], view); // console.log('templateData=>', {templateData:templateData, contents:contents, view:view});
                // parse URL, check chapter
                if (/\/[\d]{1,}(\.\d{1,})?$/g.test(location.href)){ //console.log('!No text, jqueryResponse.tagName=>', jqueryResponse.tagName);
                    //
                    const chapterNumber = location.href.split('/').pop();
                    $.getJSON(contents_path + json_full_path + view + '/' + chapterNumber + '.json' + temp_param)
                        .then((text) => {
                            const templateDataText = jsonParser.parse(text, true);
                            // console.log('got text! =>', { text: text, templateDataText: templateDataText });
                            $(`#${jqueryResponse.contentsBlockId}`).html(templateDataText.filters);
                            $('#heroes-filter').fadeIn(500);
                            $textBlock.html(templateDataText.html);
                        }, () => { // console.warn('Someting went terribly wrong...');
                            setView('404', true);
                        });
                } else { // not a chapter, just a title page
                    // check if the URL is correct...  
                    const rgxp = new RegExp('\/#'+view+'$', 'g'); // \/#nihilistic_parody$
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
            } else if (view === default_name) { // default page
                // store promises and texts
                const textsPromises = [],
                    textsContents = [];
                
                function handleTexts() {
                    // console.dir(textsContents);
                    let templateData = jsonParser.parse(textsContents, default_name);
                    // set html
                    $('#asides').html(templateData.html);
                }

                function addQuery(text) {
                    let dfd = $.Deferred();
                    $.get(contents_path + json_full_path + 'default/' + text + '.json' + temp_param, function(data){
                        let storyData = {};
                        storyData[text] = data;
                        textsContents.push(storyData);
                        dfd.resolve();
                    });
                    return dfd.promise();
                }

                renderedContents.texts.forEach( text => {
                    textsPromises.push(addQuery(text));
                });
                // get all the files descriptions, call handler
                $.when.apply($, textsPromises).then(handleTexts, mess => {
                    console.warn('A terrible error has occured!');
                }); 
            }
        }, mess => {
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
            '': () => setView(default_name, true),
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