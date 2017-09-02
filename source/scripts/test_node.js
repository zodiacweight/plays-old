// console.log(process.argv);
const len = process.argv.length;
const args = {};
for(let i = 2, block; i<len; i++){
    if (process.argv[i].indexOf('=')!=-1){
        block = process.argv[i].split('=');
        args[block[0]] = block[1];
    }
}
console.log(args);
module.exports = {
    args: args
}