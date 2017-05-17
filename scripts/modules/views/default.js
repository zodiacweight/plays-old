define(() => {
    //
    return new (Backbone.View.extend({
        getData: ()=>{
            return {
                path: '/tmpl/default.html',
                self: this,
                selector: '#default',
                data: {
                    greeting: "Hello, you, Dude!",
                    subheader: "Look, what wonderful stories wait for you here!",
                    header1: "Black Agent",
                    header2: "Special Scavengers"
                }
            };
        }
    }))();
});