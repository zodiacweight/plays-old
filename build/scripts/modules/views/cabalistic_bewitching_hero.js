define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: '/contents/views/cabalistic_bewitching_hero.html',
                self: this,
                selector: '#cabalistic_bewitching_hero',
                data: {
                    part: "cabalistic_bewitching_hero"
                }
            };
        }
    }))();
});