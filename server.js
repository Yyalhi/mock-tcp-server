// Minimal mock TCP server with a 5s delayed response
// Usage: node mock-tcp-server.js

const net = require('net');

const HOST = '127.0.0.1';
const PORT = 4000;

const server = net.createServer((socket) => {
  console.log('Client connected');

  // read whatever the client sends (we don't validate here)
  socket.once('data', (buf) => {
    console.log('Received from client:', buf.toString().trim());

    // simulate processing delay (5 seconds), then send the array
    setTimeout(() => {
      const payload = JSON.stringify(['apple', 'banana', 'orange']) + '\n';
      socket.write(payload, 'utf8', () => {
        console.log('Sent delayed fruits array, closing connection');
        socket.end();
      });
    }, 5000);
  });

  socket.on('end', () => console.log('Client disconnected'));
  socket.on('error', (e) => console.log('Socket error:', e.message));
});

server.listen(PORT, HOST, () => {
  console.log(`Mock TCP server running at ${HOST}:${PORT}`);
  console.log(`Waiting for clients on tcp://${HOST}:${PORT}`);
});
