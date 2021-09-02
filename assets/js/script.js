// Auth
const ROOM_ID = prompt("Please enter room name", "step");
const USER_ID = prompt("Please enter your username", "");
const PASSWORD = prompt("Please enter your password", "");

console.log("Auth:ROOM_ID", ROOM_ID);
console.log("Auth:USER_ID", USER_ID);
console.log("Auth:PASSWORD", PASSWORD);

// Database
var database = {};
database.auth = {
    username:"dfgdfgdfg",
    password:"dfgdfgdfg",
    name:"محمدیه",
    image:"https://i.pravatar.cc/90?img=81",
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
database.chat.push({
    username: 'on',
    name: 'آن سیستم',
    datetime: '10:24',
    messages: [
        'سلام دوست عزیز، به جلسه خوش آمدید.',
    ],
    image: 'file:///project/OnSystemClient/image/avatar.jpg',
});
database.users = [];
database.users.push({
    username: 'max',
    name: 'مکس بیس',
    role: 'user',
    access: {
        microphone: true,
        webcam: true,
        screen: false,
    },
    image: 'https://i.pravatar.cc/90?img=50',
});
for(let i=0;i<25;i++) {
    database.users.push({
        username: 'test'+i,
        name: 'علیرضا حمییدی',
        role: 'user',
        access: {
            microphone: false,
            webcam: false,
            screen: false,
        },
        image: 'https://i.pravatar.cc/90?img='+i,
    });
}
for(let i=0;i<9;i++) {
    database.chat.push({
        username: 'test1',
        name: 'حمید رضوی',
        datetime: '10:24',
        messages: [
            'سلام بچه ها! :)',
            'خوب هستید؟ چه خبرا',
        ],
        image: 'https://i.pravatar.cc/90?img=50',
    });
    database.chat.push({
        username: 'test2',
        name: 'میلاد نورانی',
        datetime: '10:24',
        messages: [
            'مرسی قربانت. اوضاع خوبه!',
        ],
        image: 'https://i.pravatar.cc/90?img=44',
    });
    database.chat.push({
        username: 'test3',
        name: 'مجتبی ابراهیمی',
        datetime: '10:24',
        messages: [
            'پس کی مراسم شروع میشه؟',
        ],
        image: 'https://i.pravatar.cc/90?img=43',
    });
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

const userListTitleSpan = aside.querySelector(".tab-item-users span");

// Update layout
const clear_users = () => {
    userList.innerHTML = '';
}
const clear_chat = () => {
    chatList.innerHTML = '';
};
const chat_create_message = (message) => {
    return `<li>${message}</li>`
};
const chat_append_new_message = (message_group, init = false) => {
    let messages = ``;
    for(let message of message_group.messages) {
        messages += chat_create_message(message);
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
    if(init === false) {
        database.chat.push(message_group);
    }
};
const chat_append_already_message = (message_group, init = false) => {
    const last_child = chatList.lastChild;
    // console.log("last is", last_child);
    const messages = last_child.querySelector("ul.chat-list-item-messages");

    for(let message of message_group.messages) {
        const new_message = document.createElement("li");
        new_message.innerText = message;
        messages.appendChild(new_message);
        if(init === false) {
            database.chat[database.chat.length-1].messages.push(message);
        }
    }
};
const chat_append_message = (message_group, init = false) => {
    if(database.chat.length > 0) {
        const last = database.chat[database.chat.length-1];
        // console.log("last check", last);
        // console.log("last message_group", message_group);
        if(last.username === message_group.username) {
            chat_append_already_message(message_group, init);
            scroll_down();
            return;
        }
    }
    chat_append_new_message(message_group, init);
    scroll_down();
};
const users_append_user = (user, init = false) => {
    const element = document.createElement("li");
    element.classList.add("chat-list-item");
    element.innerHTML = `<img class="avatar right" src="${user.image}">
        <span class="right">
            ${user.name}
        </span>
        <div class="user-action">
            <svg class="" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
        </div>
        <div class="user-icons">
            <!-- microphone -->
            <svg class="user-icons-microphone mute" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/></svg>
            <svg class="user-icons-microphone unmute active" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0zm0 0h24v24H0z" fill="none"/><path d="M19 11h-1.7c0 .74-.16 1.43-.43 2.05l1.23 1.23c.56-.98.9-2.09.9-3.28zm-4.02.17c0-.06.02-.11.02-.17V5c0-1.66-1.34-3-3-3S9 3.34 9 5v.18l5.98 5.99zM4.27 3L3 4.27l6.01 6.01V11c0 1.66 1.33 3 2.99 3 .22 0 .44-.03.65-.08l1.66 1.66c-.71.33-1.5.52-2.31.52-2.76 0-5.3-2.1-5.3-5.1H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c.91-.13 1.77-.45 2.54-.9L19.73 21 21 19.73 4.27 3z"/></svg>
            <!-- webcam -->
            <svg class="user-icons-webcam mute" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M15 8v8H5V8h10m1-2H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4V7c0-.55-.45-1-1-1z"/></svg>
            <svg class="user-icons-webcam unmute active" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9.56 8l-2-2-4.15-4.14L2 3.27 4.73 6H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.21 0 .39-.08.55-.18L19.73 21l1.41-1.41-8.86-8.86L9.56 8zM5 16V8h1.73l8 8H5zm10-8v2.61l6 6V6.5l-4 4V7c0-.55-.45-1-1-1h-5.61l2 2H15z"/></svg>
        </div>`;
    userList.appendChild(element);
    if(init === false) {
        database.users.push(user);
    }
};
const scroll_down = () => {
    setTimeout(() => {
        chatList.scrollTo(0, chatList.scrollHeight);
    }, 50);
};
const update_users_count = () => {
    userListTitleSpan.innerText = database.users.length;
};
const update_users = () => {
    clear_users();
    for(let user of database.users) {
        users_append_user(user, true)
    }
    update_users_count();
    scroll_down();
};
const update_chat = () => {
    clear_chat();
    for(let message_group of database.chat) {
        chat_append_message(message_group, true)
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
};
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
    update_users();
};

// Chat
const chat_submit = () => {
    const msg = {
        username: database.auth.username,
        name: 'مکس بیس',
        image: 'https://avatars.githubusercontent.com/u/2658040?v=4',
        datetime: '16:03',
        messages: [
            chatListInput.value,
        ],
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
const recive_user_join = () => {

};
const recive_user_left = () => {

};
const send_chat = (message_group) => {
    // TODO: send to server
};
const recive_chat = (message_group) => {
    if(!message_group) return;
    chat_append_message(message_group);
};
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
