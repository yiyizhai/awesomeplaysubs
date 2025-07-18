/*
  This data model is designed to be flexible and scalable.
  It can be used to store subscription and prepaid plan information for different countries and regions.
*/

const catalog = {
  subscriptions: [
    {
      productId: 'monthly_subscription_1099',
      basePlan: {
        duration: 'P1M', // 1 month
        type: 'recurring',
      },
      regionalConfigs: [
        {
          regionCode: 'US',
          price: {
            amountMicros: '10990000',
            currency: 'USD',
          },
          offers: [
            {
              offerId: 'free_trial_7d',
              type: 'free_trial',
              duration: 'P7D', // 7 days
            },
          ],
        },
        // Add more regional configurations here
      ],
    },
  ],
  prepaidPlans: [
    {
      productId: 'prepaid_plan_20',
      type: 'one_time',
      regionalConfigs: [
        {
          regionCode: 'US',
          price: {
            amountMicros: '20000000',
            currency: 'USD',
          },
        },
        // Add more regional configurations here
      ],
    },
  ],
};

module.exports = catalog;
