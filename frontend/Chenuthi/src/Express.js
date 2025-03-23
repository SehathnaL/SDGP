require("dotenv").config();
const express = require("express");
const cors = require("cors");

// ✅ Check if the environment variable is loaded
if (!process.env.STRIPE_SECRET_KEY) {
    console.error("⚠️ STRIPE_SECRET_KEY is missing in .env file!");
    process.exit(1); // Stop the server if key is missing
}

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Root route for testing
app.get("/", (req, res) => {
    res.send("Stripe Payment API is running 🚀");
});

// ✅ Payment Intent route
app.post("/create-payment-intent", async (req, res) => {
    let { amount, currency = "usd" } = req.body;

    // Validate amount
    if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Invalid amount. Amount must be a positive number." });
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: Math.round(amount * 100), // Convert dollars to cents safely
            currency,
            payment_method_types: ["card"],
        });

        console.log(`✅ Payment Intent Created: ${paymentIntent.id} for $${amount} ${currency}`);

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        console.error("❌ Error creating payment intent:", error.message);
        res.status(500).json({ error: "Failed to create payment intent. Try again later." });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
