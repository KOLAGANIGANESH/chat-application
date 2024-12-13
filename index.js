import express from 'express';  // Import Express library
import http from 'http';        // Import HTTP module
import { Server } from 'socket.io';  // Import Socket.IO

// Create instances of Express and HTTP server
const app = express();
const server = http.createServer(app);
const io = new Server(server);  // Create a Socket.IO server

// Serve static files (like index.html) from the "public" folder
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
    console.log('User connected');  // Log when a user connects

    // Listen for a "chat message" event from the client
    socket.on('chat message', (msg) => {
        // Emit the message to all connected clients
        io.emit('chat message', msg);
    });

    // Log when the user disconnects
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// Start the server and listen on port 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
