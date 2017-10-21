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
// create story home and contents
if (html.StoryContents.home) { // got fullfilled object after loop being finished
    // console.log('StoryContents.keys=>', Object.keys(StoryContents));
    Object.keys(html.StoryContents.home).forEach((storyName) => {
        //
        const htmlStoryHomeCompiled = html.populateStoryTemplate(
                html.StoryContents.home[storyName], 
                html.populateStoryHome
            );
        const chapterHTML = html.populateLayout(
                htmlStoryHomeCompiled, storyName,
                html.StoryContents.home[storyName].header
            );
        console.log(`******************storyName: ${storyName} ******************
`);
        fs.writeFileSync(`./build/${storyName}.html`, chapterHTML);
        if (html.StoryContents.home[storyName] && html.StoryContents.home[storyName].chapters) {
            //
            const chapters = html.StoryContents.home[storyName].chapters;
            Object.keys(chapters).forEach(chapterNum => { // console.log('storyName=>', `${chapterNum}. ${chapters[chapterNum]}`);
                
                const storyChapter = html.populateStoryTemplate(
                        html.StoryContents.home[storyName], 
                        html.populateStoryText, chapterNum
                    );
                // fixme: title, check bodyclass
                const chapterTextHTML = html.populateLayout(
                        storyChapter, storyName,
                        html.StoryContents.home[storyName].header
                    );
                // number, header, replics
                fs.writeFileSync(`./build/${html.setFileName(storyName,chapterNum)}`, chapterTextHTML);
            })
        } else {
            console.log(`Has no contents for the storyName ${storyName}`);
        }
    });
}


