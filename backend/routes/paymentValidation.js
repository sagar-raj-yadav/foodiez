const express = require('express');
const router = express.Router();

router.post('/validate', (req, res) => {
    const { email, cardNumber, expiryDate, cvc, cardholderName, country } = req.body;

    const validData = {
        email: "test@example.com",
        cardNumber: "1234123412341234",
        expiryDate: "12/24",
        cvc: "123",
        cardholderName: "sagar",
        country: "India"
    };

    if (
        email === validData.email &&
        cardNumber === validData.cardNumber &&
        expiryDate === validData.expiryDate &&
        cvc === validData.cvc &&
        cardholderName === validData.cardholderName &&
        country === validData.country
    ) {
        res.json({ message: "Payment Successful and we will redirect to My orders" });
    } else {
        res.status(400).json({ message: "Validation failed. Please check your input." });
    }
});

module.exports = router;
