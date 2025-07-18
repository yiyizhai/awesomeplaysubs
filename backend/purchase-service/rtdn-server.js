const express = require('express');
const { PubSub } = require('@google-cloud/pubsub');
const { updateSubscriptionState } = require('./subscription-state');

const app = express();
const pubsub = new PubSub();

app.use(express.json());

app.post('/rtdn', async (req, res) => {
  try {
    const message = Buffer.from(req.body.message.data, 'base64').toString('utf-8');
    const notification = JSON.parse(message);

    console.log('Received RTDN:', notification);
    updateSubscriptionState(notification);

    // Acknowledge the message
    res.status(200).send();
  } catch (error) {
    console.error('Error processing RTDN:', error);
    res.status(500).send();
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`RTDN handler is running on port ${PORT}`);
});
