import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./PaymentPage.css";

const PaymentPage = () => {
    const location = useLocation();
    const trainer = location.state?.trainer || null;

    const [cardDetails, setCardDetails] = useState({
        cardNumber: "",
        expiryDate: null,
        cvv: "",
        cardholderName: "",
    });

    const [loading, setLoading] = useState(false);

    const isFormValid =
        cardDetails.cardholderName.trim() !== "" &&
        cardDetails.cardNumber.trim().length === 19 && // Assuming card number format "1111 - 2222 - 3333 - 4444"
        cardDetails.expiryDate !== null &&
        cardDetails.cvv.trim().length === 3; // Assuming 3-digit CVV

    const handlePay = () => {
        if (!isFormValid) return;

        setLoading(true);
        setTimeout(() => {
            alert(`Payment of $${trainer.price} for ${trainer.name} is successful!`);
            setLoading(false);
        }, 2000);
    };

    if (!trainer) {
        return <div className="error-message">No trainer selected. Please go back and choose a trainer.</div>;
    }

    return (
        <div className="payment-container">
            <div className="payment-content">
                <div className="trainer-details">
                    <p className="trainer-header">Trainer Details</p>
                    <img src={trainer.imgSrc} alt={trainer.name} className="trainer-image" />
                    <h2>{trainer.name}</h2>
                    <p className="trainer-service">{trainer.title} at {trainer.company}</p>
                    <p className="trainer-description">{trainer.description}</p>
                    <div className="price-box">
                        <p className="trainer-price">Reserved Price: ${trainer.price}</p>
                    </div>
                    <div className="price-box">
                        <p className="full-amount">Full Amount: ${trainer.price}</p>
                    </div>
                </div>

                <div className="payment-form">
                    <h3 className="checkout-header">Checkout</h3>
                    <img src="./Images/5_Card_CUP_color_horizontal.png" className="creditcard" alt="Credit Card" />
                    <div className="card-details">
                        <label htmlFor="cardholder-name">Cardholder Name:</label>
                        <input
                            type="text"
                            id="cardholder-name"
                            placeholder="John Doe"
                            value={cardDetails.cardholderName}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                        />
                        <label htmlFor="card-number">Card Number:</label>
                        <input
                            type="text"
                            id="card-number"
                            placeholder="1111 - 2222 - 3333 - 4444"
                            value={cardDetails.cardNumber}
                            onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                        />
                        <div className="expiry-cvv">
                            <div className="expiry">
                                <label htmlFor="expiry-date">Expiry Date:</label>
                                <DatePicker
                                    selected={cardDetails.expiryDate}
                                    onChange={(date) => setCardDetails({ ...cardDetails, expiryDate: date })}
                                    dateFormat="MM/yyyy"
                                    showMonthYearPicker
                                    className="custom-datepicker"
                                />
                            </div>
                            <div className="cvv">
                                <label htmlFor="cvv">CVV:</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    placeholder="123"
                                    value={cardDetails.cvv}
                                    onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                                />
                            </div>
                        </div>
                    </div>
                    <button className="pay-button" onClick={handlePay} disabled={!isFormValid || loading}>
                        {loading ? "Processing..." : `Pay $${trainer.price}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentPage;
