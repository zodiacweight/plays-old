const test_node = require('./test_node');

const fs = require('fs');
const path = `${__dirname}/static/jsons`;
const done = function(err, results) {
    if (results) {
        
    }
    if (err !== null)
        console.log(`
done, return
got err =>`, err);
};

const script_path = './source/scripts/';
[home, chapters_home, chapter_text] = ['default', 'chapters_home', 'chapter_text'];

// const chaptersMod = require(`${script_path}chapters`);
// console.log('build', {__dirname: __dirname, chaptersMod:chaptersMod});
// chaptersMod.testData();

function populateTemplate(main, body_class){
    return `<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>English: Amazing adventures of misterious creatures existed ever</title>
    <script src="js/base_path.js"></script>
    <link rel="stylesheet" type="text/css" href="styles/libs/bootstrap.css">
    <link rel="stylesheet" type="text/css" href="styles/style.css">
    <script src="scripts/modules/common.js"></script>
    <script src="scripts/libs/jquery.min.js"></script>
    <!--
        <script src="scripts/modules/json_parser.js"></script>
        <script src="scripts/libs/underscore-min.js"></script>
        <script src="scripts/libs/backbone-min.js"></script>
        <script src="scripts/libs/require.js"></script>
    -->
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
    <!--<script src="scripts/app.js" data-main="app"></script>-->
</body>
</html>`;
}

function walk(part, callback) {
    //
    let results = [];
    //const dir = `${path}${part}`;
    fs.readdir(part, (err, list) => {
        if (err) return done(err);
        var i = 0;
        (function next() {
            let file_name = list[i++];
            
            if (!file_name) return done(null, results);
            
            file = `${part}/${file_name}`;
            //
            if (fs.existsSync(file)) {
                //console.log('Is file! => ', file);
            } else {
                console.log(`No file there, skipped: ${file}`);
            }
            fs.stat(file, (err1, stat) => {
                // console.log('got stat=>', stat);
                if(err1) {
                    console.log(`err1: ${err1}`);
                }
                if (stat && stat.isDirectory()) {
                    //console.log('stat && stat.isDirectory()');
                    walk(file, (err2, res) => {
                        console.log(`err2: ${err2}, 
file: ${file}
isDirectory: `, stat.isDirectory(), `
isFile: `, stat.isFile(), `
`);
                        results = results.concat(res);
                        next();
                    });
                } else {
                    //console.log('stat && stat.isDirectory()');
                    results.push(file);
                    /* fs.readFileSync(file, 'utf8', (err3, contents) => {
                        if (err3) {
                            return console.log(`
readFile: ${file}
err3: ${err3}
contents: ${contents}`);
                        } else {
                            console.log(`
directory: ${part}
file_name: ${file_name}
--------------------------------------------------------------`);
// contents: ${contents}
                        }
                        if (callback) {
                            callback(part, contents);
                        } 
                    }); */
                    let file_contents = fs.readFileSync(file, 'utf8', (file_error) => {
                        console.log('file_error=>', file_error);
                        return false;
                    });

                    if (file_contents) {
                        if (callback) {
                            callback(part, file_contents);
                        }
                    }
                    console.log('file_contents=>', file_contents);                    
                    next();
                } 
                // console.log('file=>', file);
            });
        })();
    });
}

function getPagesContent(part_name, contents){
    console.log('getPagesContent=>', {part_name:part_name});
    //let jsonParsed = JSON.parse(contents);
    //let tmpl = `<h1>${jsonParsed.description}</h1>`;
    //let json_contents;
    //let json;
    switch (part_name) {
        case home:
        /* json = `${path}${home}`;
        json_contents = fs.readFile(`${json}.json`, 'utf8', (err4, json) => {
            console.log('json=>', JSON.parse(json));
                let json_content = walk(home, );
            }); */
            break;
        case chapters_home:
            
            break;
        case chapter_text:
            
            break;
        default:
            break;
    }
    //console.log('contents=>\n', contents);
}

/* if ('file' in test_node['args']) {
    //console.log('Want file!');
    let file = `${__dirname}/${test_node.args.file}`;
    console.log(`Check file ${file}`, fs.existsSync(file));
} */


walk(path, getPagesContent);
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