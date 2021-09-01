// Dear Allahyar
let tags = {
    "feature": (id) => `<feature id=${id}></feature>`,
    "slider": (id) => `<slider id=${id}></slider>`,
    "myown": (id) => `<myown id=${id}></myown>`,
    "your": (id) => `<your id=${id}></your>`,
    "mine": (id) => `<mine id=${id}></mine>`,
};
let input = `<center>[feature:1]</center><br>[feature:2]<hr>[mine:1234]<hr>[your:hi]<hr>[slider:12123]<hr>[myown:234234]<hr>...<p>Hello!</p>`;
let res = input;
for( let tag in tags) {
    const reg = new RegExp(`/\[(\s*|)${tag}(\s*|)(\:(\s*|)([0-9]+)(\s*|)|)\]/g`)
    res = res.replace(reg, function(e) {
        const id = e.match(reg);
        if(!id || id[4] === undefined) {
            id[4] = "";
        }
        return tags[tag](id[4]);
    });
}
