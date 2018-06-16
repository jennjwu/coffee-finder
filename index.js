const http = require("http");
const port = 3000;
const server = http.createServer();

server.on("request", (request, response) => {
    response.writeHead(200, {"Content-Type": "application/json"});
    response.write("Hello world");
    response.end();
});

server.listen(port, () => {
    console.log("Node server created at port", port);
});