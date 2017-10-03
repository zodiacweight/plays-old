const test_node = require('./source/scripts/test_node');
const html = require('./source/scripts/html');
const populateTemplate = html.populateTemplate;
const setPagesContent = html.setPagesContent;
const htmlContents = html.htmlContents;
// console.log('Check functions=>', {populateTemplate:populateTemplate, setPagesContent:setPagesContent});
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
            if (stat && stat.isDirectory()) {
                // console.log('Is a dir: ', file);
                walk(file);
            } else {
                if (!stat.isFile()){
                    console.log('NOT a file: ', file);
                } else {
                    // console.log('IS A FILE: ', file);
                    // object or string
                    const page_html = setPagesContent(file, fs.readFileSync(file, 'utf8'));
                    if (!page_html) {
                        // console.log('Aggregating default, htmlContents => ', htmlContents);
                    } else {
                        // 
                        // console.log('html=>', html);
                    }
                }
            }
        }
    }
}

/* if ('file' in test_node['args']) {
    //console.log('Want file!');
    let file = `${__dirname}/${test_node.args.file}`;
    console.log(`Check file ${file}`, fs.existsSync(file));
} */


walk(path);

if (htmlContents) {
    const htmlInnerContents = html.populateHomeTemplate(htmlContents.default);
    //const htmlCompiled = html.populateTemplate(htmlInnerContents, 'default');
    //console.log('html output=>', {htmlInnerContents:htmlInnerContents, htmlCompiled:htmlCompiled});
    console.log('html output=>', htmlInnerContents);
}
// walk(`${path}texts`);
// walk(`${path}texts`);

/* const template = populateTemplate('<h1>Hello, Dude</h1><p>Content comes here!</p>');
console.log(template);
const file_to_save = `${__dirname}/static/index.html`;
fs.writeFile(file_to_save, template, function(error) {
    if (error) {
      console.error(`write error: ${error.message}`);
    } else {
      console.log(`Successful Write to ${file_to_save}`);
    }
}); */