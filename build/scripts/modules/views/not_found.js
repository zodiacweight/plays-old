define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: '404',
                self: this,
                selector: '#not_found',
                data: {
                    part: "Not found, error 404"
                }
            };
        }
    }))();
});