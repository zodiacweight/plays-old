define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: 'joshua_world',
                self: this,
                selector: '#joshua_world',
                data: {
                    part: "joshua_world"
                }
            };
        }
    }))();
});