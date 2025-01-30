"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const httpserver = app.listen(3000);
const wss = new ws_1.WebSocketServer({ server: httpserver });
wss.on('connection', (ws) => {
    ws.on('error', console.error);
    //  console.log(wss.clients)
    ws.on('message', (data, isBinary) => {
        const message = JSON.parse(String(data));
        console.log(message);
        wss.clients.forEach((socket) => {
            socket.send(JSON.stringify(message));
        });
    });
});
