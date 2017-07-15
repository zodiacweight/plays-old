define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: 'unbalanced',
                self: this,
                selector: '#unbalanced',
                data: {
                    part: "unbalanced"
                }
            };
        }
    }))();
});