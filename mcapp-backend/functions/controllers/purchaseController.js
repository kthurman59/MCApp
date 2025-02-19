// controllers/purchasesController.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createPurchase = async (req, res) => {
  try {
    // Example: expecting { comicId: '1', amount: 500 } in the request body
    const { comicId, amount, currency } = req.body;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // in cents
      currency: currency || 'usd',
      metadata: { comicId }
    });

    // Return client secret to complete the purchase on the client-side
    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Purchase creation error:', error);
    res.status(500).json({ message: 'Purchase failed', error: error.message });
  }
};

