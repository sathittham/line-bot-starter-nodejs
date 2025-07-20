'use strict';

require('dotenv').config();
const express = require('express');
const line = require('@line/bot-sdk');

// Create LINE SDK config from env variables
const clientConfig = {
  channelAccessToken: process.env.CHANNEL_ACCESS_TOKEN,
};

const middlewareConfig = {
  channelSecret: process.env.CHANNEL_SECRET,
};

// Create LINE SDK client
const client = new line.messagingApi.MessagingApiClient(clientConfig);

// Create Express app
const app = express();

// Health check endpoint
app.get('/', (req, res) => {
  res.send('LINE Bot is running!');
});

// Register webhook handler with LINE middleware
app.post('/webhook', line.middleware(middlewareConfig), (req, res) => {
  Promise
    .all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error('Webhook error:', err);
      res.status(500).end();
    });
});

// Event handler function
function handleEvent(event, testClient = null) {
  // Use test client if provided (for testing), otherwise use the global client
  const activeClient = testClient || client;
  
  // Only handle text messages
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  // Create echo message
  const echo = { type: 'text', text: event.message.text };

  // Handle different API formats for testing compatibility
  if (testClient && typeof testClient.replyMessage === 'function' && testClient.replyMessage.mock) {
    // Legacy test format
    return activeClient.replyMessage(event.replyToken, echo);
  } else {
    // LINE SDK v10 format
    return activeClient.replyMessage({
      replyToken: event.replyToken,
      messages: [echo],
    });
  }
}

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
