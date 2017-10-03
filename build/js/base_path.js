const path_plays = 'plays';
const path_build = 'build';
var full_path = '';

if (location.href.indexOf(`/${path_plays}`) !== -1) {
    full_path += `/${path_plays}`; // /plays
}
if (location.href.indexOf(`/${path_build}`) !== -1) {
    full_path += `/${path_build}`; // /plays/build
}    
if (full_path) {
    // /plays/build/
    return `<base href="${full_path}/" />`;
}