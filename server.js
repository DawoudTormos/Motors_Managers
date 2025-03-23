const app = require('./src/app');
const http = require('http');

const server = http.createServer(app);

const PORT = process.env.PORT ||5000;

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}\nhttp://localhost:${PORT}`)
    console.log(`\nTest route: http://localhost:${PORT}/test`)
}
);
