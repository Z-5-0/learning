const WebSocket = require('ws');

const PORT = 3000;
const wss = new WebSocket.Server({ port: PORT });

console.log(`WebSocket server is running on ws://localhost:${PORT}`);

wss.on('connection', (ws) => {
    // console.log('New client connected');

    ws.on('message', (message) => {
        // console.log(`Received: ${message}`);

        if (Buffer.isBuffer(message)) {     // ellenőrizzük, hogy a kapott üzenet egy Buffer típusú adat-e
            const textMessage = message.toString('utf-8');      // ha bináris üzenet érkezett, alakítsuk szöveggé
            // Broadcast minden kliensnek
            wss.clients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(textMessage);       // szöveges üzenet küldése
                }
                /* if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                } */
            });
        } else {
            wss.clients.forEach((client) => {       // ha szöveges üzenet jött, broadcast szöveges üzenetként
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        }
    });

    ws.on('close', () => {
        // console.log('Client disconnected');
    });
});

