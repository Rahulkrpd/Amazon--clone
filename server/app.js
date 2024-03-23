const express =require("express")
const app = express();
const cors = require("cors")
const stripe = require("stripe")("sk_test_51OmcM5SB7qAnVMOrLeWwvQIMIzr1nXBF1bHLsJRp2VPAVIiGNq5Z6htQrvf9PPel76LIiV687tF0i8gRDtY4hoU900Iuy7ghnc")


app.use(express.json());
app.use(cors());

// checkout api
// checkout api
// checkout api
app.post("/api/create-checkout-session", async (req, res) => {
    const products = req.body?.products; // Using optional chaining to handle undefined products
    const currency = req.body?.currency; // Extract currency from the request body

    if (!products || !currency) {
        return res.status(400).json({ error: "Products or currency not provided" });
    }

    const lineItems = products.map(product => ({
        price_data: {
            currency: currency === 'INR' ? "inr" : currency.toLowerCase(),
            product_data: {
                name: product.title
            },
            unit_amount: product.price * 100
        },
        quantity: 1
    }));

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            // Collect address information based on currency and Indian regulations
            billing_address_collection: currency === 'INR' ? 'required' : 'auto',
            shipping_address_collection: {
                allowed_countries: currency === 'INR' ? ['IN'] : undefined
            }
        });

        res.json({ id: session.id });
    } catch (error) {
        console.error("Error creating checkout session:", error);
        res.status(500).json({ error: "Failed to create checkout session" });
    }
});



app.listen(7000,()=>{
    console.log("server start")
})