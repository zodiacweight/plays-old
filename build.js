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
                // 
                html.setPagesContent(file_path, fs.readFileSync(file_path, 'utf8'));
            }
        }
    }
}

// -- GENERATION --
// create homepage
(() => {

    // Handle contents: make 404.html page, fulfill object with data to populate templates
    walk(path);

    // console.log(`I am going to stop it!`, html.storyJsonParsed[html.storyHome]);
    // return false;
    
        if (html.homepageJsonParsed) {
        const htmlCompiled = html.populateLayout(
                html.populateHomeTemplate(html.homepageJsonParsed.default), 
                'default'
            );  // console.log('output htmlCompiled=>', htmlCompiled);
        fs.writeFileSync('./build/index.html', htmlCompiled);
    } // storyContentObject[storyName].chapters[num];
    // contents 
    const storyContentObject = html.storyJsonParsed[html.storyHome];
    //console.log('storyContentObject=>', storyContentObject);
        /*
        {
            cabalistic_bewitching_hero: Object,
            joshua_world: Object,
            nihilistic_parody: Object,
            unbalanced: Object
        }
            Object: {
                header: String,
                url: <file_name>,
                preview: String,
                about_characters: [ String, String, ... ],
                chapters: { Number: String, Number: String, ... }
            }
     */
    // console.log('storyContentObject=>',storyContentObject);
    // create story home and contents
    if (storyContentObject) { // got fullfilled object after loop being finished
        //console.log('storyContentObject.keys=>', Object.keys(storyContentObject));
        Object.keys(storyContentObject).forEach(storyName => { // aliases for stories like 'cabalistic_bewitching_hero'
            console.log(`storyName => ${storyName}`);
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
            // create the story page
            fs.writeFileSync(`./build/${storyName}.html`, storyHomeHTML);
            // 
            if ( storyContentObject[storyName] // like Object.cabalistic_bewitching_hero
                 && storyContentObject[storyName].chapters) // like { 1: 'Joshua Ancient World', 2: 'Joshua gonna Europa' }
            {
                // { joshua_world: { chapters: Number: String, Number: String, ...} }
                const storyChapters = storyContentObject[storyName].chapters; // { Number: String, Number: String... }
                // extract keys from { Number: String, Number: String... }, so, get numbers
                Object.keys(storyChapters).forEach(chapter_number => { // like 1, 2 etc
                    console.log(`storyName: ${storyName}, chapter_number: ${chapter_number}`);
                    // set story 
                    const file_name = `${storyName}-${chapter_number}`,
                        storyHomeHTML = html.populateStoryTemplate(
                            storyContentObject[storyName], /* 
                            data container like
                            { 
                                    header:String, url:String, preview:String,
                                    about_characters:[ String, String, ... ], 
                                    chapters: { Number: String, Number: String, ... }
                            } */
                            html.storyChapter, // literal, 'storyChapter'
                            file_name // like joshua-1, joshua-2 etc
                        );
                    // fixme: check bodyclass
                    const storyChapterHTML = html.populateLayout(
                            storyHomeHTML, 
                            storyName,
                            `The story: ${storyContentObject[storyName].chapters[chapter_number]}`
                        );
                    // number, header, replics
                    // fs.writeFileSync(`./build/${html.setFileName(storyName,chapterNum)}`, storyChapterHTML);
                    fs.writeFileSync(`./build/${file_name}.html`, storyChapterHTML);
                })
            } else {
                if (false) console.log(`! has no contents for the story, 
      check the structure of the file: 
      /static/jsons/texts/${storyName}.json`);
            }
        });
    }    
})();


