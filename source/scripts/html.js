// todo: convert to import
const fs = require('fs');
// set story object structure names
const storyHome = 'storyHome',
    storyChapter = 'storyChapter';
// container for template variables. Is used for default page yet
const homepageJsonParsed = {},
    storyJsonParsed = {};
// configure story object
// will be fullfilled with files contents like
// storyJsonParsed[storyHome]['joshua_world'] = <HTML>
// storyJsonParsed[storyChapter]['joshua_world'] = <HTML>
storyJsonParsed[storyHome] = {};
storyJsonParsed[storyChapter] = {};
/**
 * Create layout html
 * @param {*} main 
 * @param {*} body_class 
 */
function populateLayout(main, body_class, title = "Read about amazing adventures of wonderful heroes and mysterious creatures existed ever") {
    const path_plays = 'plays';
    const path_build = 'build';
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Learn English! ${title}</title>
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
    <script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({
        google_ad_client: "ca-pub-9339669833563376",
        enable_page_level_ads: true
      });
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
        <a href="https://www.facebook.com/groups/englisn.comics">Facebook </a>
    </footer>
    </body>
    </html>`; // console.log('html=>', html);
    /* 
    <link rel="stylesheet" type="text/css" href="styles/libs/jquery.mCustomScrollbar.css">
    <script src="js/libs/jquery.mCustomScrollbar.concat.min.js"></script>
    <a href="how_to_use.html">How to use</a> &nbsp; | 
    <a href="contacts.html">Contacts</a> &nbsp; | */
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
 * Set name for file which is going to be stored
 * @param {*} segment1 
 * @param {*} segment2 
 */
function setFileName(segment1,segment2){
   return `${segment1}-${segment2}.html`; 
}
/**
 * Set wrapper for header and article blocks
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
            `<section id="stories-preview">
                ${contents['preview']}
            </section>
            <section id="about-characters">
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
                <div id="chapter_filters">${content.filters}
                </div>
            </section>`,
            `<h4>${content.header}</h4>
            ${content.replics}`);
    }
}
/**
 * Set html for chapters both home and texts
 * @param {object} contents -- from story home, mostly chapters names
 * @param {string} templateName
 * @param {string | number} file_name 
 */
function populateStoryTemplate(contents, templateName, file_name){
    if (!contents.chapters) {
        return false;
    }
    // set chapters links
    let content = '',
        links = '',
        path;
    try {
        Object.keys(contents.chapters).forEach(num => {
            path = setFileName(contents['url'], num);
            links += `
        <p><a href="${path}">${num}. ${contents.chapters[num]}</a></p>`;
        });        
    } catch (error) {
        console.warn(`! ${error.message}
chapter chapterNum: ${file_name}`);
    }

    switch (templateName) {
        case storyHome:
            content = links;
            break;
    
        case storyChapter:
            // fixme: remove "filters" field from .jsons
            // retrieve data from the global object
            // storyJsonParsed[storyChapter][<json_file_number>] = {};
            try {
                content = storyJsonParsed[storyChapter][file_name][0];
            } catch (error) {
                console.warn(error.message, `file_name 188 => ${file_name} => `, 'storyJsonParsed[storyChapter]=> ',storyJsonParsed[storyChapter]);
            } 
            // console.log(storyJsonParsed);
            let replix = "",
                filter = "",
                characters = [];
            if (!Array.isArray(content.replics)){
                console.warn(`${templateName} content.replics is NOT array =>`, { 
                    'storyJsonParsed[storyChapter]': storyJsonParsed[storyChapter]
                });
                return false;
            } else {
                // console.log(`${templateName} content.replics IS array => `, content.replics);
            }
            //
            try {
                content.replics.forEach(replica => {
                    const name = Object.keys(replica)[0];
                    replix +=`
        <strong data-person="${name}">
            ${name}
        </strong>
        <p>
            ${replica[name]}
        </p>`;
                    if (characters.indexOf(name) === -1){
                        filter += `
    <label>
        <input type="checkbox" name="${name}">${name}
    </label>`;
                        characters.push(name);
                    }
                });
                    
            } catch (error) {
                console.warn(`! ${error.message}
chapter [storyChapter][chapterNum]: [${storyChapter}][${file_name}]`);
            }
            // filter, header, replix
            content.replics = replix;
            content.filters = filter; // console.log("check content=>", {chapterNum:chapterNum, content:content});
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
 * @return {Object}
 */
function storeHomepageDataObject(name, subName, contents) {
    if (!homepageJsonParsed[name]) {
        homepageJsonParsed[name] = {};
    }
    homepageJsonParsed[name][subName] = JSON.parse(contents); //console.log('storeHomepageData=>', { homepageJsonParsed:homepageJsonParsed, contents:contents });
    return homepageJsonParsed[name][subName];
}
/**
 * Store story homepage | text contents
 * @param {*} subfield storyHome | storyChapter
 * @param {*} file_name all names for all files 
 * @param {*} contents
 * @return {Object} or false
 */
function storeStoryContentdObject(subfield, file_name, file_contents){
    try {
        // see below
        if (!storyJsonParsed[subfield]) {
            // 
            // storyJsonParsed[storyHome][joshua_world] = {};
            // storyJsonParsed[storyChapter][joshua_world] = {};
            storyJsonParsed[subfield] = {};
        }
        storyJsonParsed[subfield][file_name] = JSON.parse(file_contents);
        // got contents for all files, then will place them in the root
        // console.log('storeStoryData=>', storyJsonParsed[subfield][chapter_name]);
        return storyJsonParsed[subfield][file_name];
    } catch (error) {
        console.log(error.message, `file_name 280=> ${file_name}`);
        return false;
    }
}
/**
 * Creates HTML file contents for the 404 page
 * or 
 * returns data as object to populate template later
 * @param {string} part_name 
 * @param {string} file_contents 
 */
function setPagesContent(part_name, file_contents) { // console.log(`part_name: ${part_name}`);
    //
    let segments = part_name.split('/'),
        file_name = segments.pop().split('.json').shift();
    if (/^[\d]{1,}(\.?\d)*$/.test(file_name)) {
        var file_alias = segments[segments.length - 1];
        // console.log('file_alias=>', file_alias);
    }
    switch (file_name) {
        case 'default':
            // then it will return in another iteration
            // get contents for h1, h4
            return storeHomepageDataObject(file_name, 'home', file_contents);
            break;
        case '404':
            // create error page, ommiting storing data as this one is simple
            fs.writeFileSync(`./build/${file_name}.html`, populateLayout('Error 404', file_name, "There is way around, don't think otherwise! :)"));
            return true;
            break;
        default: // fulfill objects with data to create HTML later
            const dir_name = segments.pop();
            // get file from directory
            return (dir_name == 'default') ? 
                storeHomepageDataObject(dir_name, file_name, file_contents)
                : (dir_name == 'texts') ?
                    storeStoryContentdObject(storyHome, file_name, file_contents)
                    : storeStoryContentdObject(storyChapter, `${file_alias}-${file_name}`, file_contents);
    }
    return false;
}

module.exports = {
    homepageJsonParsed: homepageJsonParsed,
    storyJsonParsed: storyJsonParsed,
    populateHomeTemplate: populateHomeTemplate,
    populateStoryTemplate: populateStoryTemplate,
    storyHome: storyHome,
    storyChapter: storyChapter,
    populateLayout: populateLayout,
    setFileName: setFileName,
    setPagesContent: setPagesContent
}