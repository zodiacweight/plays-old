define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: '/tmpl/404.html',
                self: this,
                selector: '#not_found',
                data: {
                    part: "Not found, error 404"
                }
            };
        }
    }))();
});