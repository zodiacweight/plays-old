define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: '/tmpl/black_parody.html',
                self: this,
                selector: '#black_parody',
                data: {
                    part: "black_parody"
                }
            };
        }
    }))();
});