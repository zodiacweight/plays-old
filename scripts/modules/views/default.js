define(function () {
    //
    return new (Backbone.View.extend({
        initialize: function () {
            // get template
            $.get('/tmpl/default.html', function (data) {
                this.render($(data).html());
            }.bind(this));
        },
        template: _.template('Hello!'),
        render: function (html) {
            //console.log('html=>', html);
            this.$el.html(_.template(html)({ 
                greeting: "Hello, you, Dude!",
                subheader: "Look, what wonderful stories wait for you here!",
                header1: "Black Agent",
                header2: "Special Scavengers"
            }));
            $('main').html(this.$el);
            return this;
        }
    }))();
});