/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

admin.initializeApp();
const db = admin.firestore();

const app = express();

// Middleware
app.use(bodyParser.json());

// -------------------------------
// Comics API Routes
// -------------------------------

// GET /api/v1/comics - list all comics
app.get('/api/v1/comics', async (req, res) => {
  try {
    const comicsSnapshot = await db.collection('comics').get();
    const comics = [];
    comicsSnapshot.forEach(doc => {
      comics.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ comics });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/v1/comics/:comicId - get details for a single comic
app.get('/api/v1/comics/:comicId', async (req, res) => {
  try {
    const { comicId } = req.params;
    const doc = await db.collection('comics').doc(comicId).get();
    if (!doc.exists) {
      return res.status(404).json({ error: 'Comic not found' });
    }
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/v1/comics/:comicId/chapters - list chapters for a comic
app.get('/api/v1/comics/:comicId/chapters', async (req, res) => {
  try {
    const { comicId } = req.params;
    const chaptersSnapshot = await db.collection('comics').doc(comicId).collection('chapters').get();
    const chapters = [];
    chaptersSnapshot.forEach(doc => {
      chapters.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ chapters });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/v1/chapters/:chapterId/pages - get pages for a chapter
app.get('/api/v1/chapters/:chapterId/pages', async (req, res) => {
  try {
    const { chapterId } = req.params;
    // Assume pages are stored in a top-level "pages" collection with a reference to chapterId
    const pagesSnapshot = await db.collection('pages').where('chapterId', '==', chapterId).get();
    const pages = [];
    pagesSnapshot.forEach(doc => {
      pages.push({ id: doc.id, ...doc.data() });
    });
    res.status(200).json({ pages });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// -------------------------------
// Purchases API Route
// -------------------------------

// For purchase processing, you might integrate with Stripe.
// Here’s an example endpoint that creates a payment intent.
// Make sure you have STRIPE_SECRET_KEY in your .env file.
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

app.post('/api/v1/purchases', async (req, res) => {
  try {
    // Expecting: { comicId: '...', amount: 500, currency: 'usd' }
    const { comicId, amount, currency } = req.body;

    // Create a payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // amount in cents
      currency: currency || 'usd',
      metadata: { comicId }
    });

    // Optionally, store purchase intent data in Firestore for record keeping
    await db.collection('purchases').add({
      comicId,
      amount,
      currency: currency || 'usd',
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });

    res.status(201).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Purchase creation error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Export the Express app as a Cloud Function
exports.api = functions.https.onRequest(app);

