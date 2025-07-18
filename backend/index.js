const { google } = require('googleapis');

const packageName = 'com.example.awesomeplaysubs';
const subscriptionId = 'test_subscription_id';

async function main() {
  const auth = new google.auth.GoogleAuth({
    keyFile: 'path/to/your/key.json', // TODO: Replace with your service account key file
    scopes: ['https://www.googleapis.com/auth/androidpublisher'],
  });

  const androidpublisher = google.androidpublisher({
    version: 'v3',
    auth: auth,
  });

  // Create a new subscription
  const res = await androidpublisher.inappproducts.insert({
    packageName: packageName,
    resource: {
      sku: subscriptionId,
      status: 'active',
      subscriptionPeriod: 'P1M',
      title: 'Awesome Play Subscription',
      purchaseType: 'subscription',
      defaultPrice: {
        priceMicros: '10990000',
        currency: 'USD',
      },
      prices: {
        'US': {
          priceMicros: '10990000',
          currency: 'USD',
        },
      },
      listings: {
        'en-US': {
          title: 'Awesome Play Subscription',
          description: 'Get access to all the awesome features.',
        },
      },
      // Add a 1-week free trial
      trialPeriod: 'P7D',
    },
  });
  console.log(res.data);

  // Create a prepaid plan
  const prepaidRes = await androidpublisher.inappproducts.insert({
    packageName: packageName,
    resource: {
      sku: 'prepaid_plan_20',
      status: 'active',
      purchaseType: 'oneTime',
      defaultPrice: {
        priceMicros: '20000000',
        currency: 'USD',
      },
      prices: {
        'US': {
          priceMicros: '20000000',
          currency: 'USD',
        },
      },
      listings: {
        'en-US': {
          title: 'Prepaid Plan $20',
          description: 'Get $20 worth of awesome features.',
        },
      },
    },
  });
  console.log(prepaidRes.data);
}

main().catch(console.error);
