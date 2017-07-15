define(() => {
    //
    return new (Backbone.View.extend({
        getData: function(){
            return {
                path: 'contents/views/default.html',
                self: this,
                selector: '#default',
                data: {
                    greeting: "Hello, Beautiful Stranger!",
                    subheader: "Look, what the wonderful stories are waiting for you right here!",
                    header1: "Cabalistic Bewitching Hero",
                    header2: "Black Parody",
                    header3: "Joshua's Universe",
                    header4: "Unbalanced",
                    text1: "A story about a creature who had originated as a little cruise mermaid and later became a mysterious magic superhero. Also, there are 3 girls who were perceived as human being, but then it turned out that they are the girls-monsters and the omnipotent scientists.",
                    text2: "There is one dangerous mad psychopath among the characters. Some of the episodes are parody to \"Big Lebovsky\", being inspired by that movie, but, perhaps, with much more serious outcomes for the personages.",
                    text3: "There is the story of one guy, Joshua by name, a young scientist, who adored Universe and all the stuff like this. He wanted to go to other worlds. And actually, he did.",
                    text4: "Sometimes you need some extra time to set up your mind if you feel out of balance."
                }
            };
        }
    }))();
});