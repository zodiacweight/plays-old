define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: 'unbalanced.html',
                self: this,
                selector: '#unbalanced',
                data: {
                    part: "unbalanced"
                }
            };
        }
    }))();
});