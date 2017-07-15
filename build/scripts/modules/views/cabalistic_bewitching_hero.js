define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: 'cabalistic_bewitching_hero',
                self: this,
                selector: '#cabalistic_bewitching_hero',
                data: {
                    part: "cabalistic_bewitching_hero"
                }
            };
        }
    }))();
});