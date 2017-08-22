// console.log('build here');
const fs = require('fs');
const path = `${__dirname}/static/jsons/`;
const done = function(err) {
    console.log(err);
}

console.log('__dirname=>', __dirname);

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

walk(`${path}default`);
// walk(`${path}texts`);
