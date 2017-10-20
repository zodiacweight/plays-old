/**
 * The functions call to build html-files:
 * walk => setPagesContent
 */
const test_node = require('./source/scripts/test_node');
// get templates
// populateLayout, populateHomeTemplate, 
const html = require('./source/scripts/html');
const populateLayout = html.populateLayout;
const setPagesContent = html.setPagesContent;
const homepageContents = html.homepageContents;
const chaptersContents = html.chaptersContents;
// console.log('Check functions=>', {populateLayout:populateLayout, setPagesContent:setPagesContent});
const fs = require('fs');
const path = `${__dirname}/static/jsons`;
const done = function(err, results) {
    if (err !== null){

        console.log(`
done, return
got err =>`, err, `
-----------------`);
        if (results) {
            console.log(`results=>
`, results, `
-----------------`);
        } 
    }
};

const script_path = './source/scripts/';
// versions of templates
[home, chapters_home, chapter_text] = ['default', 'chapters_home', 'chapter_text'];
// const chaptersMod = require(`${script_path}chapters`);
// console.log('build', {__dirname: __dirname, chaptersMod:chaptersMod});
// chaptersMod.testData();
function walk(part, callback) {
    //
    const files = fs.readdirSync(part);
    // console.log('files=>', files);
    for(let i in files){
        let file_name = files[i];
        const file = `${part}/${file_name}`;
        //
        if (!fs.existsSync(file)) {
            console.log(`No file there, skipped: ${file}`);
        } else {
            // console.log(`Exists: ${file}`);
            const stat = fs.statSync(file);
            if (stat && stat.isDirectory()) { // console.log('Is a dir: ', file);
                walk(file);
            } else {
                if (!stat.isFile()){
                    // console.log('NOT a file: ', file);
                } else {
                    // console.log('IS A FILE: ', file);
                    // object or string
                    const page_html = setPagesContent(file, fs.readFileSync(file, 'utf8'));
                    if (!page_html) {
                        // console.log('Aggregating default, homepageContents => ', homepageContents);
                    } else {
                        console.log('get compiled html');
                    }
                }
            }
        }
    }
}

walk(path);
// create homepage
if (homepageContents) {
    const htmlCompiled = html.populateLayout(html.populateHomeTemplate(homepageContents.default), 'default');
    // console.log('output htmlCompiled=>', htmlCompiled);
    fs.writeFileSync('./build/index.html', htmlCompiled);
}
// create chapters
if (chaptersContents) {
    // console.log('chaptersContents.keys=>', Object.keys(chaptersContents));
    Object.keys(chaptersContents).forEach((chapter) => {
        console.log(chapter, '******************');
        Object.keys(chaptersContents[chapter]).forEach((header) => {
            console.log(header, ' => ', chaptersContents[chapter][header]);
        });
    });
    // const htmlInnerChapterContents = html.populateChaptersTemplate(chapters);
    // const htmlCompiledChapters = html.populateLayout(htmlInnerChapterContents, '');
    // console.log('output htmlCompiled=>', htmlCompiled);
    // fs.writeFileSync('./build/index.html', htmlCompiled);
}
// create other pages
console.log('Compile other contents...');


