define({
    parse: (data, isText) => {
        console.groupCollapsed('data here');
        const setData =(dataArr, callback) => {
            dataArr.forEach((row) => {
                callback(row);
            });
        };
        var templateData;
        if (isText){
            templateData={
                html: '',
                filters: ''
            };
            var contents = '',
                personage,
                personages = [];
            //
            setData(data, (row) => {
                // array(Object, Object)
                for(let prop in row){
                    contents = row[prop]
                    switch (prop) {
                        case 'header': // string
                            templateData.html += `<h4>${contents}</h4>`;
                            break;
                        case 'replics': // array(Object(line)=>paragraph)
                            setData(contents, (line) => {
                                personage = Object.keys(line)[0];
                                templateData.html += `<strong>${personage}</strong>`;
                                if (personages.indexOf(personage)===-1){
                                    personages.push(personage);
                                    templateData.filters += `<label><input type="checkbox" name="${personage}">${personage}</label>`;
                                }
                                setData(line[personage], (paragraph) => {
                                    templateData.html += `<p>${paragraph}</p>`;
                                });
                            });
                            break;
                    }
                }
            });

        } else {
            // 
            for(let prop in data){
                console.log('get data=>', { prop:prop, data:data[prop]});
                switch (prop) {
                    case 'about_characters':
                        var about_characters = '';
                        setData(data[prop], (row) =>{
                            about_characters += `<p>${row}</p>`;
                        });
                        break;
                }
            }
            templateData = {
                aside: 'Something for aside',
                header: data['header'],
                preview: data['preview'],
                about_characters: about_characters
            };
        }   
        
        console.groupCollapsed();

        return templateData;
    }
});