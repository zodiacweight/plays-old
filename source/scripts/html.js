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
    console.log(`
getPagesContent
${part_name}
`);
    //
    let main, body_class, 
        segments = part_name.split('/'), 
        file_name = segments.pop().split('.json').shift();
    switch (file_name) {
        case 'default':
            // then it will return in another iteration
            // get contents for h1, h4
            htmlContents['default'] = 'HOME';
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
            // get file from directory
            switch (segments.pop()) {
                case 'default':
                    
                    break;
            
                case 'texts':
                        // case chapters_home:
                        // main = 'CHAPTERS_HOME';
                        // body_class = 'chapters_home';
                        // break;
                        // case chapter_text:
                        // main = 'CHAPTER';
                        // body_class = 'chapter_text';
                        // break;
                    break;
            }
    }
    return populateTemplate(main, body_class);
}
module.exports = {
    populateTemplate: populateTemplate,
    setPagesContent: setPagesContent
}