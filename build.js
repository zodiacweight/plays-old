// console.log('build here');
const fs = require('fs');
const path = `${__dirname}/static/jsons/`;
const done = function(err) {
    console.log(err);
};

const script_path = './source/scripts/';

function populateTemplate(top_part, main){
    return `<!DOCTYPE html>
<html lang="en">
<head>
    ${top_part}
</head>
<body class="default">
    <main>
        ${main}
    </main>
    <footer>
        <a href="#">Home </a> &nbsp; | 
        <a href="#how_to_use">How to use </a> &nbsp; | 
        <a href="#contacts">Contacts </a> &nbsp; | 
        <a href="#facebook">Facebook </a>
    </footer>
    <script src="scripts/app.js" data-main="app"></script>
</body>
</html>`;
}

const chaptersMod = require(`${script_path}chapters.js`);

console.log('build', {__dirname: __dirname, chaptersMod:chaptersMod});
chaptersMod.testData();

const walk = (dir) => {
    //
    const results = [];
    fs.readdir(dir, (err, list) => {
        if (err) return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, (err1, stat) => {
                if (stat && stat.isDirectory()) {
                    walk(file, (err2, res) => {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    fs.readFile(file, 'utf8', (err3, contents) => {
                        if (err3) {
                            return console.log(err3);
                        }
                        let jsonParsed = JSON.parse(contents);
                        let tmpl = `<h1>${jsonParsed.description}</h1>`;
                        console.log('tmpl=>\n', tmpl);
                    });
                    next();
                }
                console.log('file=>', file);
            });
        })();
    });
};

// walk(`${path}default`);
// walk(`${path}texts`);
// walk(`${path}texts`);

const template = populateTemplate('Some top content', '<h1>Hello, Dude</h1><p>Content comes here!</p>');
console.log(template);
const file_to_save = `${__dirname}/source/html/output/index.html`;
fs.writeFile(file_to_save, template, function(error) {
    if (error) {
      console.error(`write error: ${error.message}`);
    } else {
      console.log(`Successful Write to ${file_to_save}`);
    }
});