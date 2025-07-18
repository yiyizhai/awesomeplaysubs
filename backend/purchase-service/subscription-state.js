const subscriptionState = {};

function updateSubscriptionState(notification) {
  const { packageName, subscriptionNotification } = notification;
  const { subscriptionId, userId, eventTimeMillis, expiryTimeMillis } = subscriptionNotification;

  if (!subscriptionState[userId]) {
    subscriptionState[userId] = {};
  }

  const previousState = subscriptionState[userId][subscriptionId];
  const newState = {
    packageName,
    eventTimeMillis,
    expiryTimeMillis,
  };

  subscriptionState[userId][subscriptionId] = newState;

  console.log('Updated subscription state for user:', userId);
  console.log(subscriptionState[userId]);

  // Send in-app notification if the subscription state has changed
  if (JSON.stringify(previousState) !== JSON.stringify(newState)) {
    sendInAppNotification(userId, 'Your subscription has been updated.');
  }
}

function sendInAppNotification(userId, message) {
  // TODO: Implement actual in-app notification logic (e.g., using WebSockets or push notifications)
  console.log(`Sending in-app notification to user ${userId}: ${message}`);
}

module.exports = {
  updateSubscriptionState,
  subscriptionState,
};
