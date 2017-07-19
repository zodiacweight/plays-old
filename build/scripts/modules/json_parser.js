define({
    parse: (data) => {
        console.groupCollapsed('data here');
        var setData =(prop, callback) => {
            data[prop].forEach((row) => {
                callback(row);
            });
        };

        for(var prop in data){
            console.log('get data=>', { prop:prop, data:data[prop]});
            switch (prop) {
                case 'about_characters':
                    var about_characters = '';
                    setData(prop, (row) =>{
                        about_characters += `<p>${row}</p>`;
                    });
                    break;
                case 'filters':
                    var chapters_filter = '';
                    setData(prop, (name) =>{
                        chapters_filter += `<label><input type="checkbox" name="${name}">${name}</label>`;
                    });
                    break;
            }
        }   console.groupCollapsed();
        return {
            aside: 'Something for aside',
            header: data['header'],
            preview: data['preview'],
            about_characters: about_characters,
            article: 'Some articles',
            chapters_filter: chapters_filter
        }
    }
});