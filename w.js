const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });
console.log('server started on port 8080');

valid = "";

wss.on('connection', (ws) => {
    console.log('user connected! ' + Math.random());
    
    ws.on('message', (message) => {
        const msg = message.toString('utf8').split(' ');
        if (msg[0] === 'x' && msg[1] != undefined) {
            wss.clients.forEach((client) => {
                valid += msg[1] + ':' + msg[2] + ' ';
                client.send(valid);
            })
        }
        if (msg[1] === undefined) {
            wss.clients.forEach((client) => {
                client.send(valid);
            })
        }
        if (msg[0] === 'reset') {
            valid = "";
            wss.clients.forEach((client) => {
                client.send('reset');
            })
        }
    })
})