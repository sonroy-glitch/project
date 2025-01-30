import {WebSocketServer,WebSocket} from "ws"
import express from "express"

const app = express();
const httpserver= app.listen(3000);

const wss= new WebSocketServer({server:httpserver});

wss.on('connection',(ws)=>{
     ws.on('error',console.error);
    //  console.log(wss.clients)
     ws.on('message',(data,isBinary)=>{
        const message = JSON.parse(String(data));
        console.log(message);
        wss.clients.forEach((socket:WebSocket)=>{
            socket.send(JSON.stringify(message))
        })
     })
})