const express = require("express");
const http = require("http");
const app = express();

app.get("/", function (req, res) {
    res.sendFile("index.html", { root: __dirname });
});

const server = http.createServer(app);

server.listen(3000, function () {
    console.log("listening on port 3000");
});

/* Close the server and also shutdown the database when ctrl+c passed in */
process.on("SIGINT", () => {
    wss.clients.forEach(function each(client) {
        client.close();
    });
    server.close(() => shutdownDB());
});

/** Websocket **/
const WebSocketServer = require("ws").Server;

const wss = new WebSocketServer({ server: server });

wss.on("connection", function connection(ws) {
    const numClients = wss.clients.size;

    console.log("clients connected: ", numClients);

    wss.broadcast(`Current visitors: ${numClients}`);

    if (ws.readyState === ws.OPEN) {
        ws.send("welcome!");
    }

    db.run(`INSERT INTO visitors (count, time)
      VALUES (${numClients}, datetime('now'))
    `);

    ws.on("close", function close() {
        wss.broadcast(`Current visitors: ${wss.clients.size}`);
        console.log("A client has disconnected");
    });

    ws.on("error", function error(err) {
        console.log("WebSocket Error:", err);
    });
});

/**
 * Broadcast data to all connected clients
 * @param  {Object} data
 * @void
 */
wss.broadcast = function broadcast(data) {
    console.log("Broadcasting: ", data);
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};
/** End Websocket **/

/* Database Start */

const sqlite = require("sqlite3");
const db = new sqlite.Database(":memory:");

db.serialize(() => {
    db.run(`
      CREATE TABLE visitors (
        count INTEGER,
        time TEXT
      )
  
  `);
});

function getCounters() {
    db.each("SELECT * FROM visitors", (err, row) => {
        console.log(row);
    });
}

function shutdownDB() {
    getCounters();
    console.log("shutting down DB");
    db.close();
}
