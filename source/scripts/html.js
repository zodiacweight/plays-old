const htmlContents = {

};

function populateTemplate (main, body_class) {
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
</body>
</html>`;
}

function setPagesContent (part_name, file_contents) {
    /* console.log(`
getPagesContent
${part_name}
`); */
    //
    let main, body_class, 
        segments = part_name.split('/'), 
        file_name = segments.pop().split('.json').shift();
    switch (file_name) {
        case 'default':
            // then it will return in another iteration
            // get contents for h1, h4
            htmlContents['default'] = file_contents;
            return; 
            break;
        case '404':
            main = 'Error 404';
            break;
        // what inside dirs 
        // default, 
        // texts, 
        // texts/cabalistic_bewitching_hero 
        // texts/nihilistic_parody 
        default:
            const dir_name = segments.pop();
            console.log(`
Not home, not 404.
Dir name: ${dir_name}, 
File name: ${file_name}
File contents: ${file_contents}
`);
            // get file from directory
            switch (dir_name) {
                case 'default':
                    console.log('Directory default');
                    break;
                    
                case 'texts':
                    console.log('Directory texts');
                    // case chapters_home:
                    // main = 'CHAPTERS_HOME';
                        // body_class = 'chapters_home';
                        // break;
                        // case chapter_text:
                        // main = 'CHAPTER';
                        // body_class = 'chapter_text';
                        // break;
                    break;
                default:
                    console.log(`Directory under texts(?): ${dir_name}`);
            }
    }
    return populateTemplate(main, body_class);
}
module.exports = {
    htmlContents: htmlContents,
    populateTemplate: populateTemplate,
    setPagesContent: setPagesContent
}