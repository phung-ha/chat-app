import path from "path";
import express from "express";
import { WebSocketServer } from "ws";
import http from "http";

// Get the directory name of the current module file
const __dirname = path.dirname(new URL(import.meta.url).pathname);

// set up an express server
const app = express();
const server = http.createServer(app);

// Serve static files from the "client" directory
app.use(express.static(path.resolve(__dirname, "../client")));

// set up a websocket server
const wss = new WebSocketServer({ server });

wss.on("connection", ws => {
  console.log("New client connected");

  ws.on("message", message => {
    console.log(`Received message => ${message}`);
    // broadcast the message to all clients
    wss.clients.forEach(client => {
      if (client.readyState === ws.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", () => {
    console.log("Client disconnected");
  });
});

// Start the server
server.listen(process.env.PORT || 3001, () =>
  console.log(`server started on http://localhost:${server.address().port}`)
);
