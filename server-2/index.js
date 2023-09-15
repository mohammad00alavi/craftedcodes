const http = require("http");
const fs = require("fs");
let hi = "";
fs.readFile("./file.sh", "utf-8", (err, data) => {
    if (err) throw err;
    hi = data;
});
const server = http.createServer((req, res) => {
    res.write(hi);
    console.log("listening on Port 3000");
    res.end();
});

server.listen(3000);
