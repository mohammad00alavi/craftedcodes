const http = require("http");
const fs = require("fs");

const obj1 = { hello: "hello world" };

const server = http.createServer((req, res) => {
    if (req.url === '/') {
        // Serve the HTML file for the root URL
        res.writeHead(200, { "content-type": "text/html" });
        fs.createReadStream("index.html").pipe(res);
    } else if (req.url === '/api') {
        // Respond with JSON for the /api URL
        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify(obj1));
    } else {
        // Handle any other routes (you can expand this as needed)
        res.writeHead(404, { "content-type": "text/plain" });
        res.end("Not Found");
    }
});

server.listen(3004, () => console.log("listening on port 3004"));
