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
 * 
 * @param {*} part 
 * @param {*} callback 
 */
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
            } else if (stat.isFile()){
                // object or string
                const page_html = html.setPagesContent(file, fs.readFileSync(file, 'utf8'));
            }
        }
    }
}

walk(path);
// create homepage
if (html.homepageContents) {
    const htmlCompiled = html.populateLayout(
            html.populateHomeTemplate(html.homepageContents.default), 
            'default'
        );  // console.log('output htmlCompiled=>', htmlCompiled);
    fs.writeFileSync('./build/index.html', htmlCompiled);
}
// make reference to the story objects for story homepage
const storyContentsHome = html.StoryContents[html.storyHome];
// create story home and contents
if (storyContentsHome) { // got fullfilled object after loop being finished
    // console.log('StoryContents.keys=>', Object.keys(StoryContents));
    Object.keys(storyContentsHome).forEach((storyName) => {
        //
        const htmlStoryHomeCompiled = html.populateStoryTemplate(
                storyContentsHome[storyName], 
                html.storyHome
            );
        const storyHomeHTML = html.populateLayout(
                htmlStoryHomeCompiled, storyName,
                storyContentsHome[storyName].header
            );
        console.log(`******************storyName: ${storyName} ******************
`);
        fs.writeFileSync(`./build/${storyName}.html`, storyHomeHTML);
        if (storyContentsHome[storyName] && storyContentsHome[storyName].chapters) {
            //
            const storyChapters = storyContentsHome[storyName].chapters;
            Object.keys(storyChapters).forEach(chapterNum => { // console.log('storyName=>', `${chapterNum}. ${storyChapters[chapterNum]}`);
                // set story 
                const storyHomeHTML = html.populateStoryTemplate(
                        storyContentsHome[storyName],
                        html.storyChapter, chapterNum
                    );
                // fixme: title, check bodyclass
                const storyChapterHTML = html.populateLayout(
                        storyHomeHTML, storyName,
                        storyContentsHome[storyName].header
                    );
                // number, header, replics
                fs.writeFileSync(`./build/${html.setFileName(storyName,chapterNum)}`, storyChapterHTML);
            })
        } else {
            console.log(`Has no contents for the storyName ${storyName}`);
        }
    });
}


