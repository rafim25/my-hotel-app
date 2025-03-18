const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Booking = require('../models/Booking');
const { sendBookingConfirmation, sendPaymentFailedEmail } = require('../utils/emailService');

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await handlePaymentSuccess(event.data.object);
        break;
      
      case 'payment_intent.payment_failed':
        await handlePaymentFailure(event.data.object);
        break;

      case 'charge.refunded':
        await handleRefund(event.data.object);
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook processing error:', error);
    res.status(500).send('Webhook processing failed');
  }
};

async function handlePaymentSuccess(paymentIntent) {
  const booking = await Booking.findByPaymentIntent(paymentIntent.id);
  if (!booking) return;

  await Booking.updatePaymentStatus(booking.id, 'paid');
  await sendBookingConfirmation(booking);
}

async function handlePaymentFailure(paymentIntent) {
  const booking = await Booking.findByPaymentIntent(paymentIntent.id);
  if (!booking) return;

  await Booking.updatePaymentStatus(booking.id, 'failed');
  await sendPaymentFailedEmail(booking);
}

async function handleRefund(charge) {
  const booking = await Booking.findByPaymentIntent(charge.payment_intent);
  if (!booking) return;

  await Booking.updatePaymentStatus(booking.id, 'refunded');
}

exports.handlePayPalWebhook = async (req, res) => {
  const { event_type, resource } = req.body;
  const webhookId = req.headers['paypal-auth-algo'];

  try {
    // Verify webhook signature
    const isValid = await verifyPayPalWebhook(req.body, webhookId);
    if (!isValid) {
      return res.status(400).send('Invalid webhook signature');
    }

    switch (event_type) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        await handlePayPalPaymentSuccess(resource);
        break;

      case 'PAYMENT.CAPTURE.DENIED':
        await handlePayPalPaymentFailure(resource);
        break;

      case 'PAYMENT.CAPTURE.REFUNDED':
        await handlePayPalRefund(resource);
        break;

      default:
        console.log(`Unhandled PayPal event type: ${event_type}`);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('PayPal webhook processing error:', error);
    res.status(500).send('Webhook processing failed');
  }
};

async function handlePayPalPaymentSuccess(resource) {
  const booking = await Booking.findByPayPalOrderId(resource.id);
  if (!booking) return;

  await Booking.updatePaymentStatus(booking.id, 'paid');
  await sendBookingConfirmation(booking);
}

async function handlePayPalPaymentFailure(resource) {
  const booking = await Booking.findByPayPalOrderId(resource.id);
  if (!booking) return;

  await Booking.updatePaymentStatus(booking.id, 'failed');
  await sendPaymentFailedEmail(booking);
}

async function handlePayPalRefund(resource) {
  const booking = await Booking.findByPayPalOrderId(resource.id);
  if (!booking) return;

  await Booking.updatePaymentStatus(booking.id, 'refunded');
} 