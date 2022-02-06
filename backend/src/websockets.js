const WebSocket = require('ws');

const initServer = (port, emitter) => {
  const wss = new WebSocket.Server({
    port: port,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3,
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024,
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024, // Size (in bytes) below which messages
      // should not be compressed if context takeover is disabled.
    },
  });
  wss.on('connection', (ws) => {
    ws.isAlive = true;
    ws.on('pong', heartbeat);
    ws.on('message', (data) => {
      console.log('received: %s', data);
      ws.send(data);
    });
    ws.on('close', () => {});
    ws.send('something');
  });

  const interval = setInterval(() => {
    wss.clients.forEach((ws) => {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping();
    });
  }, 30000);

  wss.on('close', function close() {
    clearInterval(interval);
  });

  emitter.on('new-diss', (diss) => {
    broadcast(wss, { newDiss: diss });
    console.log('new diss broadcasted');
  });
  emitter.on('new-diss-reply', (diss) => {
    broadcast(wss, { 'new-diss-reply': diss });
    console.log('new diss reply broadcasted');
  });
  return wss;
};

const heartbeat = (ws) => {
  ws.alive = true;
};

const broadcast = (wss, msg) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(msg));
    }
  });
};

module.exports = initServer;
