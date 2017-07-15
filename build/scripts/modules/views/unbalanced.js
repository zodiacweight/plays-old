define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: 'contents/views/unbalanced.html',
                self: this,
                selector: '#unbalanced',
                data: {
                    part: "unbalanced"
                }
            };
        }
    }))();
});