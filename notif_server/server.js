const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const WebSocket = require('ws'); 

const app = express(); 
const PORT = 3002;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
const hostname = '127.0.0.1';
const corsOptions = {
    origin: 'http://127.0.0.1:3000'
}

app.use(bodyParser.json())
wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        console.log(`RECEIVED: ${message}`);
    });
    ws.on('close', () => {
        console.log('WebSocket disconnected');
    });
});

app.post('/send-message',(cors(corsOptions)), (req, res) => {
    const { message, name } = req.body 

    if(!name || !message){
        return res.status(422).json({
            message: 'name and message are required'
        })
    }
    try {
        wss.clients
    
        res.json ({
            success: true,
            message: 'Message sent successfully',
            contentMessage: message,
            name:   name,
        })
    
    } catch (error) {
        console.log(`error sending notif: ${error}`) 
        res.status(200).json({
            message: 'ERR',
            error: error
        })
    }
})


server.listen(PORT, () => console.log(`WEBSOCKET RUNING AT http://${hostname}:${PORT}`));