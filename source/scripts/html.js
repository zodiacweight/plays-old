// todo: convert to import
const fs = require('fs');
// set story object structure names
const storyHome = 'storyHome',
    storyChapter = 'storyChapter';
// container for template variables. Is used for default page yet
const homepageContents = {
    },
    StoryContents = {

    };
// configure story object
StoryContents[storyHome] = {};
StoryContents[storyChapter] = {};
/**
 * Create layout html
 * @param {*} main 
 * @param {*} body_class 
 */
function populateLayout(main, body_class, title = "English: Amazing adventures of misterious creatures existed ever") {
    const path_plays = 'plays';
    const path_build = 'build';
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${title}</title>
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
    <script src="js/libs/jquery.min.js"></script>
    <script src="js/common.js"></script>
</head>
<body class="${body_class}">
    <main>
        ${main}
    </main>
    <footer>
        <a href="index.html">Home</a> &nbsp; | 
        <a href="how_to_use.html">How to use</a> &nbsp; | 
        <a href="contacts.html">Contacts</a> &nbsp; | 
        <a href="https://www.facebook.com">Facebook </a>
    </footer>
</body>
</html>`;
    // console.log('html=>', html);
    return html;
}
/**
 * Create hompage template
 * @param {*} asides 
 */
function populateHomeTemplate(asides) {
    //console.log('populateHomeTemplate=>', asides);
    let home = Object.assign({}, asides.home),
        html = "",
        link;
    //console.log('home=>', home);
    delete asides.home;

    Object.keys(asides).forEach(function (book_link) {
        //link = Object.keys(item)[0];
        html += `
        <aside class="fade fade-out">
            <a href="${book_link}.html">
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
/**
 * 
 * @param {*} segment1 
 * @param {*} segment2 
 */
function setFileName(segment1,segment2){
   return `${segment1}-${segment2}.html`; 
}
/**
 * 
 * @param {*} contents 
 * @param {*} contentsHeader 
 * @param {*} contentsArticle 
 */
function setChapterCommon(contents, contentsHeader, contentsArticle){
    return `
    <header>
        <h1>
            <a href="${contents['url']}.html">${contents['header']}</a>
        </h1>
        ${contentsHeader}
    </header>
    <article id="text">
        ${contentsArticle}
    </article>`;
}
/**
 * Store templates for story -- homepage and texts
 */
const populateStoryContents = {
    storyHome: function (contents, content){
        //
        return setChapterCommon(contents, 
            `<section id="stories-preview" style="display: block;">
                ${contents['preview']}
            </section>
            <section id="about-characters" style="display: block;">
                ${contents['about_characters']}
            </section>`, 
            `<h4 class="chapters-overview">Chapters:</h4>
            <h5 class="chapters-go-home"><a href="index.html">Home</a></h5>
            ${content}`);
        },
    storyChapter: function (contents, content){
        return setChapterCommon(contents,
            `<section id="heroes-filter">
                <h4>Check out heroes which roles you want to read of <span>?</span></h4>
                <div id="chapter_filters">
                ${contents["filters"]}
                </div>
            </section>`,
            `<h4>${content.header}</h4>
            ${content.replics}`);
    }
}
/**
 * Set html for chapters both home and texts
 * @param {*} contents -- from story home, mostly chapters names
 * @param {*} templateName 
 */
function populateStoryTemplate(contents, templateName, chapterNum){
    if (!contents.chapters) {
        return false;
    }
    // set chapters links
    let content = '',
        links = '',
        path;
    Object.keys(contents.chapters).forEach(num => {
        path = setFileName(contents['url'], num);
        links += `
    <div><a href="${path}">${num}. ${contents.chapters[num]}</div>`;
    });
    switch (templateName) {
        case 'storyHome':
            content = links;
            break;
    
        case 'storyChapter':
            //
            content = StoryContents.texts[chapterNum][0];
            let replix = '';
            content.replics.forEach(replica => {
                const name = Object.keys(replica)[0];
                replix +=`
    <strong>
        ${name}
    </strong>
    <p>
        ${replica[name]}
    </p>`;
            });
            content.replics = replix;
            console.log('check content=>', {chapterNum:chapterNum, content:content});
            break;
    }
    //
    let htmlContents = `
<aside id="chapters">
    <div class="menu" id="chapters-list-menu">
        <h4 class="chapters-overview">Chapters:</h4>
        <h5 class="chapters-go-home"><a href="index.html">Home</a></h5>
        ${links}
    </div>
</aside>
<div id="chapter-contents">
    ${populateStoryContents[templateName](contents, content)}
</div>`;
    return htmlContents;
}
/**
 * Store site homepage contents
 * @param {*} name 
 * @param {*} subName 
 * @param {*} contents 
 */
function storeHomepageData(name, subName, contents) {
    if (!homepageContents[name]) {
        homepageContents[name] = {};
    }
    homepageContents[name][subName] = JSON.parse(contents);
    //console.log('storeHomepageData=>', { homepageContents:homepageContents, contents:contents });
    return homepageContents[name][subName];
}
/**
 * Store story homepage | text contents
 * @param {*} subfield 
 * @param {*} chapter_name 
 * @param {*} contents 
 */
function storeStoryData(subfield, chapter_name, contents){
    try {
        if (!StoryContents[subfield][chapter_name]) {
            StoryContents[subfield][chapter_name] = {};
        }
        StoryContents[subfield][chapter_name] = JSON.parse(contents);
        //console.log('storeStoryData=>', StoryContents[subfield][chapter_name]);
        return StoryContents[subfield][chapter_name];        
    } catch (error) {
        console.log(error.message, `file_name=> ${chapter_name}`);
        return false;
    }
}
/**
 * Returns data to populate homepage or creates other files. 
 * In the latter case you need to store HTML in mainHTML variable
 * @param {*} part_name 
 * @param {*} file_contents 
 */
function setPagesContent(part_name, file_contents) {
    //
    let mainHTML, 
        body_class,
        segments = part_name.split('/'),
        file_name = segments.pop().split('.json').shift();
    switch (file_name) {
        case 'default':
            // then it will return in another iteration
            // get contents for h1, h4
            return storeHomepageData(file_name, 'home', file_contents);
            break;
        case '404':
            // create error page
            fs.writeFileSync(`./build/${file_name}.html`, populateLayout('Error 404', file_name));
            return true;
            break;
        default:
            const dir_name = segments.pop(); //File contents: ${file_contents}
            // get file from directory
            switch (dir_name) {
                //
                case 'default': // fill object with data to handle it later
                    //console.log('Directory default');
                    return storeHomepageData(dir_name, file_name, file_contents);
                    break;
                //
                case 'texts': 
                    // get chapters home, see files jsons/texts/(cabalistic_bewitching_hero|nihilistic_parody).json 
                    // console.log('Directory texts=>', { file_name: file_name, file_contents:file_contents });
                    return storeStoryData(storyHome, file_name, file_contents);
                    break;
                default: // get chapter contents, just chapter number and replics
                    // console.log(`Directory under texts(?): ${dir_name}`, { file_name: file_name, file_contents: file_contents });
                    return storeStoryData(storyChapter, file_name, file_contents);
            }
    }
    return false;
}

module.exports = {
    homepageContents: homepageContents,
    StoryContents: StoryContents,
    populateHomeTemplate: populateHomeTemplate,
    populateStoryTemplate: populateStoryTemplate,
    populateStoryHome: storyHome,
    populateStoryText: storyChapter,
    populateLayout: populateLayout,
    setFileName: setFileName,
    setPagesContent: setPagesContent
}