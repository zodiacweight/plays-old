define({
    parse: (data, contentsValue) => {
        console.groupCollapsed('data here');
        const setData =(dataArr, callback) => {
            dataArr.forEach((row) => {
                callback(row);
            });
        };
        var templateData;
        // got json with replics
        if (contentsValue === true){
            templateData = {
                html: '',
                filters: ''
            };
            var contents = '',
                personage,
                personages = [];
            //
            setData(data, (row) => { console.log('row=>', row);
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

        } else { // got description
            // 
            for(let prop in data){
                console.log('get data=>', { prop:prop, data:data[prop]});
                switch (prop) {
                    case 'url':
                        var header = `<a href="#${data[prop]}">${data['header']}</a>`;
                        break;
                    case 'about_characters':
                        var about_characters = '';
                        setData(data[prop], (row) => {
                            about_characters += `<p>${row}</p>`;
                        });
                        break;
                    case 'chapters':
                        console.log('go chapters, data['+prop+'] => '+data[prop]);
                        var chapters = `<h4 class="chapters-overview">Chapters:</h4>
                                        <h5 class="chapters-go-home"><a href="/#">Home</a></h5>`,
                            num = 0;
                        for(let number in data[prop]){
                            ++num;
                            chapters += `<p class="chapter-title"><a href="#${contentsValue}/${number}" title="${data[prop][number]}"><span>${num}. </span>${data[prop][number]}</a></p>`;
                            console.log('chapters: '+chapters);
                        }
                        break;
                }
            }
            templateData = {
                header: header,
                preview: data['preview'],
                about_characters: about_characters,
                chapters: chapters
            };
        }
        console.log('%ctemplateData', 'color: darkorange', templateData);
        console.groupEnd();

        return templateData;
    }
});