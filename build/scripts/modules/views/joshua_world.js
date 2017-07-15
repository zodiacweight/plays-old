define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: '/contents/views/joshua_world.html',
                self: this,
                selector: '#joshua_world',
                data: {
                    part: "joshua_world"
                }
            };
        }
    }))();
});