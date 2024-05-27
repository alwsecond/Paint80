const ws = new WebSocket("ws://127.0.0.1:8080");

const mapsx = 8;
const mapsy = 10;

let colors = ['red', 'royalblue', 'limegreen'];
let ncolor = "royalblue";

function fill() {
    const main = document.getElementById("main");
    const ColorDiv = document.querySelectorAll(`#colors div`);
    for (let i = 0; i < mapsx * mapsy; i++) {
        const div = document.createElement("div");
        div.className = "cell";
        div.id = i;
        div.addEventListener('click', () => {
            cellx(i, ncolor);
        })
        main.appendChild(div);
    }
    ColorDiv.forEach((div, i) => {
        const arr = [];
        div.style = `background: ${colors[i]}; transition: .1s;`;
        div.addEventListener("click", () => {
            ncolor = colors[i];
            const currentDiv = document.getElementById("current");
            currentDiv.style.background = ncolor;
        })
    }
)}

ws.onopen = () => {
    console.log('connected!');
    document.getElementById('status').remove();
    ws.send('x');
    fill();
}

ws.onmessage = (message) => {
    const msg = String(message.data).split(' ');
    for (let i = 0; i < msg.length-1; i++) {
        const data = msg[i].split(':');
        cellx(data[0], data[1]);
    }
    if (msg[0] === 'reset') {
        for (let i = 0; i < mapsx * mapsy; i++) {
            const e = document.getElementById(i);
            e.className = "cell";
            e.style = [];
        }
    }
}

function reset() {
    ws.send('reset');
}

function cellx(id, color) {
    const div = document.getElementById(id);
    if (id != "undefined") {
        if (div.className != `cell x`) {
            div.className = `cell x`;
            div.style = `background: ${color};`;
            ws.send('x ' + id + ' ' + color);
        }
    }
}
