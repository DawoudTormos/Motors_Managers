const WebSocket = require('ws');
const { verifyToken } = require('./utils/jwt');

function setupWebSocketServer(server) {
    const wss = new WebSocket.Server({ noServer: true });


    // Handle upgrade requests (HTTP -> WebSocket)
server.on('upgrade', async function upgrade(request, socket, head) {
    try {
        await authenticateWebSocket(request);// verfies and decrypts the token
        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    } catch (err) {
        console.error('WebSocket authentication failed:', err.message);
        socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
        socket.destroy();
    }
});


    // Handle WebSocket connection
    wss.on('connection', function connection(ws, request) {
        const user = request.user; // User data from authentication

        console.log(`WebSocket connected for user: ${user.id}`);

        ws.on('message', function incoming(message) {
            try {
                // Echo the received message back to the client
                ws.send(JSON.stringify({
                    type: 'message',
                    data: message.toString(),
                    userId: user.id,
                    timestamp: new Date().toISOString()
                }));
                
            } catch (error) {
                console.error('WebSocket message error:', error);
            }
        });

        ws.on('close', () => {
            console.log(`WebSocket closed for user: ${user.id}`);
        });
    });

   // return wss;
}

// WebSocket authentication middleware
function authenticateWebSocket(request) {
    return new Promise((resolve, reject) => {
        const token = request.headers['sec-websocket-protocol'];
        
        if (!token) {
            reject(new Error('No token provided'));
            return;
        }

        try {
            const decoded = verifyToken(token);
            request.user = decoded;
            resolve();
        } catch (err) {
            reject(new Error('Invalid token'));
        }
    });
}

module.exports = { setupWebSocketServer, authenticateWebSocket };
