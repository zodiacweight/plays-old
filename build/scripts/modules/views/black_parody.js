define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: 'black_parody',
                self: this,
                selector: '#black_parody',
                data: {
                    part: "black_parody"
                }
            };
        }
    }))();
});