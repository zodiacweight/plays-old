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
                    header2: "Black Parody",
                    text1: "The plays are about a magic hero who was somebody like a little cruise mermaid and later becomes a mysterious magic superhero. Also there are 3 girls who was percieved as human being, but later it turned out that they are girls-monsters and a special scientist not like all the other scientists.",
                    text2: "There is one dangerous mad psychopath among the characters. Some of the episodes are parody to \"Big Lebovsky\", being inspired by that movie, but, perphars, with much more serious outcomes for the personages."
                }
            };
        }
    }))();
});