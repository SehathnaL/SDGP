import React, { useState, useEffect } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const PaymentForm = ({ trainerPrice }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [clientSecret, setClientSecret] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const createPaymentIntent = async () => {
            try {
                const response = await fetch("http://localhost:3000/create-payment-intent", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ amount: trainerPrice }),
                });

                const data = await response.json();
                if (data.clientSecret) {
                    setClientSecret(data.clientSecret);
                } else {
                    console.error("Failed to get client secret.");
                }
            } catch (error) {
                console.error("Error fetching payment intent:", error);
            }
        };

        createPaymentIntent();
    }, [trainerPrice]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements || !clientSecret) {
            alert("Stripe is not initialized properly!");
            return;
        }

        setLoading(true);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: { name: "John Doe" },
            },
        });

        if (error) {
            console.error(error);
            alert("Payment failed!");
        } else if (paymentIntent.status === "succeeded") {
            alert(`Payment of $${trainerPrice} was successful!`);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? "Processing..." : `Pay $${trainerPrice}`}
            </button>
        </form>
    );
};

export default PaymentForm;
