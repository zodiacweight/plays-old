const fs = require('fs');
const htmlContents = {
};

function populateTemplate(main, body_class) {
    const path_plays = 'plays';
    const path_build = 'build';
    const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>English: Amazing adventures of misterious creatures existed ever</title>
    <script>
        var full_path = '';
        if (location.href.indexOf("/${path_plays}") !== -1) {
            full_path += "/${path_plays}"; // /plays
        }
        if (location.href.indexOf("/${path_build}") !== -1) {
            full_path += "/${path_build}"; // /plays/build
        }    
        if (full_path) {
            // /plays/build/
            document.write('<base href="'+ full_path + '" />');
        }
    </script>
    <link rel="stylesheet" type="text/css" href="styles/libs/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="styles/style.css">
    <script src="js/common.js"></script>
    <script src="js/libs/jquery.min.js"></script>
</head>
<body class="${body_class}">
    <main>
        ${main}
    </main>
    <footer>
        <a href="#">Home </a> &nbsp; | 
        <a href="#how_to_use">How to use </a> &nbsp; | 
        <a href="#contacts">Contacts </a> &nbsp; | 
        <a href="#facebook">Facebook </a>
    </footer>
</body>
</html>`;
    console.log('html=>', html);
    return html;
}

function populateHomeTemplate(asides) {
    //console.log('populateHomeTemplate=>', asides);
    /*
        // default:
        {
            cabalistic_bewitching_hero : "{ 
                "header": "Cabalistic Bewitching Hero", 
                "description": "A story about a creature who had originated as a little cruise mermaid and later became a mysterious magic superhero. Also, there are 3 girls who were perceived as human being, but then it turned out that they are the girls-monsters and the omnipotent scientists." }"

            joshua_world : "{ 
                "header": "Unbalanced", 
                "description": "There is the story of one guy, Joshua by name, a young scientist, who adored Universe and all the stuff like this. He wanted to go to other worlds. And actually, he did." }"

            nihilistic_parody : "{ 
                "header": "Nihilistic parody", 
                "description": "There is one dangerous mad psychopath among the characters. Some of the episodes are parody to \"Big Lebovsky\", being inspired by that movie, but, perhaps, with much more serious outcomes for the personages." }"

            unbalanced : "{ 
                "header": "Joshua's Universe", 
                "description": "Sometimes you need some extra time to set up your mind if you feel out of balance." }"

            home : " { 
                "greeting": "Hello, Beautiful Stranger!", 
                "subheader": "Look, what the wonderful stories are waiting for you right here!", 
                "texts": [ "cabalistic_bewitching_hero", "nihilistic_parody", "joshua_world" ] }"
        }
    */
    let home = Object.assign({}, asides.home),
        html = '',
        link;
    //console.log('home=>', home);
    delete asides.home;

    Object.keys(asides).forEach(function (book_link) {
        //link = Object.keys(item)[0];
        html += `
        <aside class="fade fade-out">
            <a href="#${book_link}">
                <h4>${asides[book_link].header}</h4>
                <p>${asides[book_link].description}</p>
            </a>
        </aside>`;
    });
    return `<div id="home"><h1>${home.greeting}</h1>
    <h4>${home.subheader}</h4>
    <section id="asides">
        ${html}
    </section>
  </div>`;
}

function createContentsBox(name, subName, contents) {
    if (!htmlContents[name]) {
        htmlContents[name] = {};
    }
    htmlContents[name][subName] = JSON.parse(contents);
    //console.log('createContentsBox=>', { htmlContents:htmlContents, contents:contents });
    return htmlContents[name][subName];
}

function setPagesContent(part_name, file_contents) {
    //
    let main, body_class,
        segments = part_name.split('/'),
        file_name = segments.pop().split('.json').shift();
    switch (file_name) {
        case 'default':
            // then it will return in another iteration
            // get contents for h1, h4
            return createContentsBox('default', 'home', file_contents);
            break;
        case '404':
            main = 'Error 404';
            body_class = file_name;
            break;
        /*  what inside dirs 
            default, 
            texts, 
            texts/cabalistic_bewitching_hero 
            texts/nihilistic_parody */
        default:
            const dir_name = segments.pop();
            /*console.log(`
            Not home, not 404.
            path: ${dir_name}/${file_name}
            `);*/
            //File contents: ${file_contents}
            // get file from directory
            switch (dir_name) {
                case 'default':
                    // fill object with data to handle it later
                    //console.log('Directory default');
                    return createContentsBox('default', file_name, file_contents);
                    break;

                case 'texts':
                    console.log('Directory texts=>', { file_name: file_name, file_contents:file_contents });
                    //body_class = 'chapters_home';
                    /*  case chapters_home:
                        main = 'CHAPTERS_HOME';
                        break;
                        case chapter_text:
                        main = 'CHAPTER';
                        body_class = 'chapter_text';
                        break; */
                    break;
                default:
                    console.log(`Directory under texts(?): ${dir_name}`);
                    
            }
    }
    // may not reach this point as there are returns by conditions
    if (main) {
        fs.writeFileSync(`./build/${file_name}.html`, populateTemplate(main, body_class));
        return true;
    } else {
        return false;
    }
}

function parseJsonSource(data, contentsValue) {
    //console.groupCollapsed('data here'); console.log(data);
    const setData = (dataArr, callback) => {
        dataArr.forEach((row) => {
            callback(row);
        });
    };
    let templateData;
    // got json with replics
    if (contentsValue === true) {
        templateData = {
            html: '',
            filters: ''
        };
        let contents = '',
            personage,
            personages = [];
        //
        setData(data, (row) => {
            //console.log('row=>', row);
            // array(Object, Object)
            for (let prop in row) {
                contents = row[prop]
                switch (prop) {
                    case 'header': // string
                        templateData.html += `<h4>${contents}</h4>`;
                        break;
                    case 'replics': // array(Object(line)=>paragraph)
                        setData(contents, (line) => {
                            personage = Object.keys(line)[0];
                            templateData.html += `<strong data-person="${personage}">${personage}</strong>`;
                            if (personages.indexOf(personage) === -1) {
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
        if (contentsValue === 'default') {
            let html = '';
            data.forEach(contents => { // storyData { 'file_name': {header:'', description:''}}
                let link = Object.keys(contents)[0];
                let content = contents[link]; //console.log('see it', {contents:contents, link:link, lnk:Object.keys(contents)[0], keys: Object.keys(contents), content:content});
                html += `
    <aside>
        <a href='#${link}'>
            <h4>${content['header']}</h4>
            <p>${content['description']}</p>
        </a>
    </aside>`;
            });
            templateData = { html: html };
        } else {
            //
            for (let prop in data) {
                //console.log('get data=>', { prop: prop, data: data[prop] });
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
                        //console.log('go chapters, data[' + prop + '] => ' + data[prop]);
                        var chapters = `<h4 class="chapters-overview">Chapters:</h4>
                                        <h5 class="chapters-go-home"><a href="#">Home</a></h5>`,
                            num = 0;
                        for (let number in data[prop]) {
                            ++num;
                            chapters += `<p class="chapter-title"><a href="#${contentsValue}/${number}" title="${data[prop][number]}"><span>${num}. </span>${data[prop][number]}</a></p>`;
                            //console.log('chapters: ' + chapters);
                        }
                        break;
                }
            }
            templateData = {
                header: header || "No header....",
                preview: data['preview'],
                about_characters: about_characters,
                chapters: chapters
            };
        }
    }
    // console.log('%ctemplateData', 'color: darkorange', templateData);
    //console.groupEnd();

    return templateData;
}

module.exports = {
    htmlContents: htmlContents,
    parseJsonSource: parseJsonSource,
    populateHomeTemplate: populateHomeTemplate,
    populateTemplate: populateTemplate,
    setPagesContent: setPagesContent
}