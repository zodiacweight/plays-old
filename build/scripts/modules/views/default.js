define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: '/contents/views/default.html',
                self: this,
                selector: '#default',
                data: {
                    greeting: "Hello, Beautiful Stranger!",
                    subheader: "Look, what wonderful stories wait for you here!",
                    header1: "Cabalistic Bewitching Hero",
                    header2: "Black Parody"
                }
            };
        }
    }))();
});