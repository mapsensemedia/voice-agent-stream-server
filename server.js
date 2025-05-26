const express = require('express');
const { Server } = require('ws');
const http = require('http');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const wss = new Server({ server });

app.use(cors());
app.get('/', (req, res) => res.send('WebSocket AI Server is live.'));

wss.on('connection', (ws) => {
  console.log('🔌 Client connected');

  ws.on('message', (message) => {
    console.log('📩 Received:', message.toString());

    // Echo message for testing:
    ws.send(`Echo: ${message}`);
  });

  ws.on('close', () => {
    console.log('❌ Client disconnected');
  });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
