const http = require('http');
const app = require('./src/app');// HTTP Server
const { setupWebSocketServer } = require('./src/appWS');// WS Server

const server = http.createServer(app);
setupWebSocketServer(server);


const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`)
    console.log(`WebSocket server running on ws://localhost:${PORT}`)
}
);
