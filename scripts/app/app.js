require(['/scripts/modules/views/default.js'], function (defaultView) {
    
    var viewInstance = defaultView.getData(),
        $container = $('main');
    // 
    function render(View, contents) {
        //
        var $viewElement = $(View.self.$el),
            compiled = _.template(contents)(View.data); 
        $viewElement.html(compiled);
        //
        $container.html($viewElement.find(View.selector).html());
    }
    //
    $.get(viewInstance.path, function (contents) {
        render(viewInstance, contents);
    });
});