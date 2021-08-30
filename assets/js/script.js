// Tab
const tabs = document.querySelectorAll(".tab");
const tab_disactive_all = (tab) => {
    const items = tab.querySelectorAll("ul.tab-header li");
    for(let item of items) {
        item.classList.remove("active");
    }
};
const tab_click = (elm) => {
    console.log(elm);
    tab_disactive_all(elm.parentElement);
    elm.classList.toggle("active");
};
for(let tab of tabs) {
    console.log("Tab", tab);
    const items = tab.querySelectorAll("ul.tab-header li");
    const contents = tab.querySelectorAll("ul.tab-content li");
    for(let item of items) {
        console.log("Item", item);
        item.addEventListener("click", function(){tab_click(this)});
    }
}
