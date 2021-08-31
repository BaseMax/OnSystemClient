// Elements
const tabs = document.querySelectorAll(".tab");
const header = document.querySelector("header");
const main = document.querySelector("main");
const aside = main.querySelector("main aside");
const asideTab = aside.querySelector(".tab");
const asideTabHeader = asideTab.querySelector(".tab-header");
const asideTabContent = asideTab.querySelector(".tab-content");
const asideTabContentItems = asideTabContent.querySelectorAll(".tab-content-item");
const figure = main.querySelector("figure");

// Window
const get_size = () => {
    const width  = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;
    return [width, height];
}
const resize = () => {
    const sizes = get_size();
    const width = sizes[0];
    const height = sizes[1];
    console.log("New size:", width, height);

    const finalSize = height - header.offsetHeight - asideTabHeader.offsetHeight;
    asideTabContent.querySelector(".user-list").style.height = (finalSize - 28) + "px";

    const submitMessage = asideTabContent.querySelector(".submit-message");
    asideTabContent.querySelector(".chat-list").style.height = (finalSize - submitMessage.offsetHeight - 30) + "px";

    figure.style.height = finalSize + "px";
    aside.style.height = finalSize + "px";
};
const load = () => {
    resize();
};
window.addEventListener("load", load);
window.addEventListener("resize", resize);

// Tab
const tab_disactive_all = (tab) => {
    const items = tab.querySelectorAll("ul.tab-header li");
    for(let item of items) {
        item.classList.remove("active");
    }
};
const tab_click = (elm) => {
    console.log("Tab click: ", elm);
    tab_disactive_all(elm.parentElement);
    elm.classList.toggle("active");
    const index = elm.getAttribute("data-tab-index");
    change_tab_content(index);
};
const tab_close_all_content = () => {
    for(let content of asideTabContentItems) {
        content.classList.remove("active");
    }
};
const change_tab_content = (index) => {
    console.log("Index newTab: ", index);

    const content = asideTabContentItems[index-1];
    if(content === undefined) return;

    tab_close_all_content();
    console.log("Content newTab: ", content);
    content.classList.add("active");
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
