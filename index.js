'use strict';

require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');

// Create LINE SDK config from env variables
const config = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.CHANNEL_SECRET,
};

// Create LINE SDK client
const client = new line.Client(config);

// Create Express app
const app = express();

// Register a webhook handler with middleware
// about the middleware, please refer to doc
app.post('/webhook', line.middleware(config), (req, res) => {
  Promise
    .all(req.body.events.map(event => handleEvent(event, client)))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// Event handler function
function handleEvent(event, client) {
  // This is a simple echo bot that only handles text messages
  if (event.type !== 'message' || event.message.type !== 'text') {
    // ignore non-text-message event
    return Promise.resolve(null);
  }

  // Create a echoing text message
  const echo = { type: 'text', text: event.message.text };

  // Use replyMessage() to send a reply message
  return client.replyMessage(event.replyToken, echo);
}

// Health check endpoint
app.get('/', (req, res) => {
    res.send('LINE Bot is running!');
});


// Only start the server if this file is run directly
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`listening on ${port}`);
  });
}

// Export for testing
module.exports = {
  handleEvent,
};
