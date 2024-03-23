

// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const stripe = require('stripe')('sk_test_51OmcM5SB7qAnVMOrLeWwvQIMIzr1nXBF1bHLsJRp2VPAVIiGNq5Z6htQrvf9PPel76LIiV687tF0i8gRDtY4hoU900Iuy7ghnc')

///-App config
const app = express();

// Middleware
app.use(cors({ origin: true }));
app.use(express.json());
// APi routes
app.get("/", (request, response) => {
    response.status(200).send("Hello world");
})

app.post('/payments/create', async (request, response) => {
    const total = request.query.total;
    console.log('Payment request received for this total >>>', total);

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: "usd",
        });

        response.status(201).send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        response.status(500).send({
            error: {
                message: 'Failed to create payment intent'
            }
        });
    }
});

// Listen command

exports.api = functions.https.onRequest(app);


///http://127.0.0.1:5001/clone-c2c30/us-central1/api