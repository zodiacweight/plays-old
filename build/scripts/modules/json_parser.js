define({
    parse: (data) => {
        console.log('data here');
        const contents = data[Object.keys(data)[0]];
        for(var prop in contents){
            console.log('get data=>', { prop:prop, content:contents[prop]});
        }
    }
});