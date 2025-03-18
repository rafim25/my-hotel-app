const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const paypal = require('@paypal/checkout-server-sdk');

// PayPal client configuration
const environment = process.env.NODE_ENV === 'production'
  ? new paypal.core.LiveEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET)
  : new paypal.core.SandboxEnvironment(process.env.PAYPAL_CLIENT_ID, process.env.PAYPAL_CLIENT_SECRET);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

exports.processPayment = async ({ amount, currency, paymentMethod, paymentToken, description }) => {
  try {
    switch (paymentMethod) {
      case 'stripe':
        return await processStripePayment({ amount, currency, paymentToken, description });
      case 'paypal':
        return await processPayPalPayment({ amount, currency, paymentToken });
      case 'google_pay':
        return await processGooglePayPayment({ amount, currency, paymentToken, description });
      case 'apple_pay':
        return await processApplePayPayment({ amount, currency, paymentToken, description });
      default:
        throw new Error('Unsupported payment method');
    }
  } catch (error) {
    console.error('Payment processing error:', error);
    throw new Error('Payment processing failed');
  }
};

async function processStripePayment({ amount, currency, paymentToken, description }) {
  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    payment_method: paymentToken,
    description,
    confirm: true,
    return_url: process.env.PAYMENT_RETURN_URL
  });

  return {
    provider: 'stripe',
    status: 'success',
    transactionId: paymentIntent.id,
    amount,
    currency
  };
}

async function processPayPalPayment({ amount, currency, paymentToken }) {
  const request = new paypal.orders.OrdersCaptureRequest(paymentToken);
  const capture = await paypalClient.execute(request);

  return {
    provider: 'paypal',
    status: 'success',
    transactionId: capture.result.id,
    amount,
    currency
  };
}

exports.createPayPalOrder = async ({ amount, currency, description }) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: currency,
        value: amount.toString()
      },
      description
    }]
  });

  const order = await paypalClient.execute(request);
  return {
    orderId: order.result.id,
    approvalUrl: order.result.links.find(link => link.rel === 'approve').href
  };
};

exports.refundPayment = async (transactionId, amount, provider = 'stripe') => {
  try {
    switch (provider) {
      case 'stripe':
        return await refundStripePayment(transactionId, amount);
      case 'paypal':
        return await refundPayPalPayment(transactionId, amount);
      default:
        throw new Error('Unsupported payment provider');
    }
  } catch (error) {
    console.error('Refund processing error:', error);
    throw new Error('Refund processing failed');
  }
};

async function refundStripePayment(transactionId, amount) {
  const refund = await stripe.refunds.create({
    payment_intent: transactionId,
    amount: Math.round(amount * 100)
  });

  return {
    provider: 'stripe',
    status: 'success',
    refundId: refund.id,
    amount
  };
}

async function refundPayPalPayment(transactionId, amount) {
  const request = new paypal.payments.CapturesRefundRequest(transactionId);
  request.requestBody({
    amount: {
      value: amount.toString(),
      currency_code: 'USD'
    }
  });

  const refund = await paypalClient.execute(request);
  return {
    provider: 'paypal',
    status: 'success',
    refundId: refund.result.id,
    amount
  };
}

async function processGooglePayPayment({ amount, currency, paymentToken, description }) {
  // Convert Google Pay token to Stripe payment method
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      token: paymentToken
    }
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    payment_method: paymentMethod.id,
    description,
    confirm: true,
    payment_method_types: ['card'],
    metadata: {
      paymentType: 'google_pay'
    }
  });

  return {
    provider: 'google_pay',
    status: 'success',
    transactionId: paymentIntent.id,
    amount,
    currency
  };
}

async function processApplePayPayment({ amount, currency, paymentToken, description }) {
  const paymentMethod = await stripe.paymentMethods.create({
    type: 'card',
    card: {
      token: paymentToken
    }
  });

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(amount * 100),
    currency,
    payment_method: paymentMethod.id,
    description,
    confirm: true,
    payment_method_types: ['card'],
    metadata: {
      paymentType: 'apple_pay'
    }
  });

  return {
    provider: 'apple_pay',
    status: 'success',
    transactionId: paymentIntent.id,
    amount,
    currency
  };
} 