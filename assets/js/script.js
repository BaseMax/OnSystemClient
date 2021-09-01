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
database.chat = [];
database.chat[database.chat.length++] = {
    name: 'آن سیستم',
    datetime: '10:24',
    messages: [
        'سلام دوست عزیز، به جلسه خوش آمدید.',
    ],
    image: 'file:///project/OnSystemClient/image/avatar.jpg',
};
for(let i=0;i<9;i++) {
    database.chat[database.chat.length++] = {
        name: 'حمید رضوی',
        datetime: '10:24',
        messages: [
            'سلام بچه ها! :)',
            'خوب هستید؟ چه خبرا',
        ],
        image: 'https://i.pravatar.cc/90?img=50',
    };
    database.chat[database.chat.length++] = {
        name: 'میلاد نورانی',
        datetime: '10:24',
        messages: [
            'مرسی قربانت. اوضاع خوبه!',
        ],
        image: 'https://i.pravatar.cc/90?img=44',
    };
    database.chat[database.chat.length++] = {
        name: 'مجتبی ابراهیمی',
        datetime: '10:24',
        messages: [
            'پس کی مراسم شروع میشه؟',
        ],
        image: 'https://i.pravatar.cc/90?img=43',
    };
}

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
const control_sidebar = document.querySelector(".control-button-sidebar");

const userList = aside.querySelector(".user-list");
const chatList = aside.querySelector(".chat-list");
const chatListInput = document.querySelector(".submit-message-input");
const chatListSubmit = document.querySelector(".submit-message-button");

// Update layout
const append_chat = (message_group) => {
    let messages = ``;
    for(let message of message_group.messages) {
        messages += `<li>${message}</li>`;
    }
    const element = document.createElement("li");
    element.classList.add("chat-list-item");
    element.innerHTML = `<img class="avatar right" src="${message_group.image}">
        <label class="name right">${message_group.name}</label>
        <span class="time left">${message_group.datetime}</span>
        <div class="clear"></div>
        <ul class="chat-list-item-messages">
            ${messages}
        </ul>`;
    chatList.appendChild(element);
};
const update_chat = () => {
    chatList.innerHTML = '';
    for(let message_group of database.chat) {
        append_chat(message_group)
    }
};
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
    update_chat();
};

// Chat
const chat_submit = () => {
    const msg = {
        name: 'مکس بیس',
        image: 'https://avatars.githubusercontent.com/u/2658040?v=4',
        datetime: '',
        messages: [chatListInput.value],
    };
    chatListInput.value = "";
    chat_append_message(msg);
};
const chat_keypress = function(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if (code === 13) {
        e.preventDefault();
        chat_submit();
        return false;
    }
    else {
        return true;
    }
};
const chat_append_message = (message) => {
    console.log(message);
};
// const chat_input = function(event) {
//     console.log("event", event);
//     console.log("keycode", event.keyCode);
//     chatListInput.value = chatListInput.value.replace(/\n/g,'');
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         chat_submit();
//     }
// };

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
    if(database.state.screen) {
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
const control_sidebar_toggle = () => {
    aside.style.display = "block";
    figure.style.display = "none";
    bottom.style.display = "none";
};

// Others
const hide_sidebar = () => {
    aside.style.display = "none";
    figure.style.display = "block";
    bottom.style.display = "block";
};

// Events
window.addEventListener("load", load);
window.addEventListener("resize", resize);

control_microphone.addEventListener("click", control_microphone_toggle);
control_webcam.addEventListener("click", control_webcam_toggle);
control_screen.addEventListener("click", control_screen_toggle);
control_record.addEventListener("click", control_record_toggle);
control_sidebar.addEventListener("click", control_sidebar_toggle);

chatListSubmit.addEventListener("click", chat_submit);
// chatListInput.addEventListener("input", chat_input);
chatListInput.addEventListener("keypress", chat_keypress);

oninput="this.value = this.value.replace(/\n/g,'')"

for(let tab of tabs) {
    console.log("Tab", tab);
    const items = tab.querySelectorAll("ul.tab-header li");
    const contents = tab.querySelectorAll("ul.tab-content li");
    for(let item of items) {
        console.log("Item", item);
        item.addEventListener("click", function(){tab_click(this)});
    }
}
