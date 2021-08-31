// Database
var database = {};
database.auth = {
    "token":"dfgdfgdfg",
    "name":"محمدیه",
    "image":"https://i.pravatar.cc/90?img=81",
};
database.room = {
    name: "کلاس درس آموزش معادلات دیفرانسیل - جلسه 44",
    shortname: "معادلات دیفرانسیل",
    subname: "دانشگاه کاشان",
    image:"assets/image/logo-white.png",
    record: true,
};
database.state = {
    microphone: false,
    webcam: false,
    screen: false,
};

// Elements
const tabs = document.querySelectorAll(".tab");

const header = document.querySelector("header");
const headerRoomName = header.querySelector(".room-name");
const headerRoomSubName = header.querySelector(".room-presenter");
const headerRoomImage = header.querySelector(".room-logo");

const main = document.querySelector("main");
const aside = main.querySelector("main aside");
const asideTab = aside.querySelector(".tab");
const asideTabHeader = asideTab.querySelector(".tab-header");
const asideTabContent = asideTab.querySelector(".tab-content");
const asideTabContentItems = asideTabContent.querySelectorAll(".tab-content-item");
const figure = main.querySelector("figure");
const bottom = document.querySelector(".bottom");

const control_microphone = document.querySelector(".control-button-microphone");
const control_webcam = document.querySelector(".control-button-webcam");
const control_record = document.querySelector(".control-button-record");
const control_screen = document.querySelector(".control-button-sharescreen");

// Update layout
const update_controlls = () => {
    // microphone
    if(database.state.microphone) {
        control_microphone.classList.add("active");
    }
    else {
        control_microphone.classList.remove("active");
    }
    // webcam
    if(database.state.webcam) {
        control_webcam.classList.add("active");
    }
    else {
        control_webcam.classList.remove("active");
    }
    // screen
    if(database.state.screen) {
        control_screen.classList.add("active");
    }
    else {
        control_screen.classList.remove("active");
    }
};
const update_room = () => {
    headerRoomName.innerText = database.room.name;
    headerRoomSubName.innerText = database.room.subname;
    headerRoomImage.src = database.room.image;

    if(database.room.record) {
        control_record.classList.add("active");
    }
    else {
        control_record.classList.remove("active");
    }
};

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
    // bottom.style.marginRight = aside.offsetWidth + "px";
    bottom.style.width = "calc(100% - " + aside.offsetWidth + "px)";
};
const load = () => {
    resize();
    update_room();
};

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

// Socket relateds
// microphone
const microphone_start = () => {
    database.state.microphone = true;
    update_controlls();
};
const microphone_stop = () => {
    database.state.microphone = false;
    update_controlls();
};
// webcam
const webcam_start = () => {
    database.state.webcam = true;
    update_controlls();
};
const webcam_stop = () => {
    database.state.webcam = false;
    update_controlls();
};
// screen
const screen_start = () => {
    database.state.screen = true;
    update_controlls();
};
const screen_stop = () => {
    database.state.screen = false;
    update_controlls();
};

// Socket
const send_record_stop = () => {
    // TODO: send to server
    recive_record_stop();
};
const send_record_start = () => {
    // TODO: send to server
    recive_record_start();
};
const recive_record_stop = () => {
    database.room.record = false;
    update_room();
};
const recive_record_start = () => {
    database.room.record = true;
    update_room();
};

// Controls
const control_microphone_toggle = () => {
    if(database.state.microphone) {
        microphone_stop();
    }
    else {
        microphone_start();
    }
};
const control_webcam_toggle = () => {
    if(database.state.webcam) {
        webcam_stop();
    }
    else {
        webcam_start();
    }
};
const control_screen_toggle = () => {
    if(database.room.screen) {
        screen_stop();
    }
    else {
        screen_start();
    }
};
const control_record_toggle = () => {
    if(database.room.record) {
        send_record_stop();
    }
    else {
        send_record_start();
    }
};

// Events
window.addEventListener("load", load);
window.addEventListener("resize", resize);

control_microphone.addEventListener("click", control_microphone_toggle);
control_webcam.addEventListener("click", control_webcam_toggle);
control_record.addEventListener("click", control_record_toggle);
control_screen.addEventListener("click", control_screen_toggle);

for(let tab of tabs) {
    console.log("Tab", tab);
    const items = tab.querySelectorAll("ul.tab-header li");
    const contents = tab.querySelectorAll("ul.tab-content li");
    for(let item of items) {
        console.log("Item", item);
        item.addEventListener("click", function(){tab_click(this)});
    }
}
