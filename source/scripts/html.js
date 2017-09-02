//
module.exports = {
    populateTemplate: (main, body_class) => {
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
    },   
    getPagesContent: (part_name, file_contents) => {
        console.log(`getPagesContent
${part_name}
`, file_contents);
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
    }
}