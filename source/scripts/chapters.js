let part = 'nihilistic_parody',
paragraphs = [
    {
        "title": "In the Stevenson's family"
    },
    {
        "title": "A nihilistic parody"
    }
],
html = '';

paragraphs.forEach((chapter, index)=>{
html += `    <p class="chapter-title">
<a href="${part}/${index+1}" title="${chapter.title}">
    <span>${index+1}. </span>${chapter.title}
</a>
</p>`;
});
document.querySelectorAll('.chapters-list').forEach(item => {
    item.innerHTML = `   <div class="menu" id="chapters-list-menu">
        <h4 class="chapters-overview">Chapters:</h4>
        <h5 class="chapters-go-home">
            <a href="#">Home</a>
        </h5>
        ${html}
    </div>`;
});