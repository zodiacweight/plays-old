define(function () {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: '/tmpl/default.html',
                element: this.$el,
                data: {
                    greeting: "Hello, you, Dude!",
                    subheader: "Look, what wonderful stories wait for you here!",
                    header1: "Black Agent",
                    header2: "Special Scavengers"
                }
            };
        }
        /*getElement:function(){
            console.log('element=>', this.$el);
            console.log('data=>', this.data);
            console.log('path=>', this.path);
        },
        data: {
            greeting: "Hello, you, Dude!",
            subheader: "Look, what wonderful stories wait for you here!",
            header1: "Black Agent",
            header2: "Special Scavengers"
        },
        path: '/tmpl/default.html'*/
    }))();
    //new ()();
    /*return {
        path: '/tmpl/default.html',
        element: this.$el,
        data: {
            greeting: "Hello, you, Dude!",
            subheader: "Look, what wonderful stories wait for you here!",
            header1: "Black Agent",
            header2: "Special Scavengers"
        }
    }*/
});