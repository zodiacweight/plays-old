/**
 * The functions call to build html-files:
 * walk => setPagesContent
 */
const fs = require('fs'),
    test_node = require('./source/scripts/test_node'),
    html = require('./source/scripts/html'),
    path = `${__dirname}/static/jsons`,
    script_path = './source/scripts/';
// versions of templates
[home, chapters_home, chapter_text] = ['default', 'chapters_home', 'chapter_text'];
/**
 * It travels throung directories and call the function setPagesContent (html.js) 
 * @param {string} part 
 * @param {function name} callback 
 */
function walk(part, callback) {
    //
    const files = fs.readdirSync(part);
    // console.log('files=>', files);
    for(let i in files){
        let file_name = files[i];
        const file_path = `${part}/${file_name}`;
        //
        if (!fs.existsSync(file_path)) {
            console.log(`No file there, skipped: ${file_path}`);
        } else {
            // console.log(`Exists: ${file}`);
            const stat = fs.statSync(file_path);
            if (stat && stat.isDirectory()) { // console.log('Is a dir: ', file);
                walk(file_path);
            } else if (stat.isFile()){
                // object or string
                html.setPagesContent(file_path, fs.readFileSync(file_path, 'utf8'));
            }
        }
    }
}

// Handle contents: make 404.html page, fulfill object with data to populate templates
walk(path);

// -- GENERATION --
// create homepage
if (html.homepageContents) {
    const htmlCompiled = html.populateLayout(
            html.populateHomeTemplate(html.homepageContents.default), 
            'default'
        );  // console.log('output htmlCompiled=>', htmlCompiled);
    fs.writeFileSync('./build/index.html', htmlCompiled);
}
// make reference to the story objects for story homepage
const storyContentObject = html.storyContents[html.storyHome];
console.log('storyContentObject=>',storyContentObject);
// create story home and contents
if (storyContentObject) { // got fullfilled object after loop being finished
    console.log('storyContentObject.keys=>', Object.keys(storyContentObject));
    Object.keys(storyContentObject).forEach(storyName => { // aliases for stories like 'cabalistic_bewitching_hero'
        // create Story Home contents to pass it to the next function
        const htmlStoryHomeCompiled = html.populateStoryTemplate(
                storyContentObject[storyName], 
                html.storyHome
            );
        const storyHomeHTML = html.populateLayout(
                htmlStoryHomeCompiled, storyName,
                storyContentObject[storyName].header
            );
        /* console.log(`
* storyName: ${storyName}`); */
        fs.writeFileSync(`./build/${storyName}.html`, storyHomeHTML);
        // 
        if (storyContentObject[storyName] && storyContentObject[storyName].chapters) {
            //
            const storyChapters = storyContentObject[storyName].chapters;
            Object.keys(storyChapters).forEach(chapterNum => { // console.log('storyName=>', `${chapterNum}. ${storyChapters[chapterNum]}`);
                // set story 
                const storyHomeHTML = html.populateStoryTemplate(
                        storyContentObject[storyName],
                        html.storyChapter, 
                        chapterNum
                    );
                // fixme: title, check bodyclass
                const storyChapterHTML = html.populateLayout(
                        storyHomeHTML, 
                        storyName,
                        storyContentObject[storyName].header
                    );
                // number, header, replics
                fs.writeFileSync(`./build/${html.setFileName(storyName,chapterNum)}`, storyChapterHTML);
            })
        } else {
            console.log(`! has no contents for the story, 
  check the structure of the file: 
  /static/jsons/texts/${storyName}.json`);
        }
    });
}


