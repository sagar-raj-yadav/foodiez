import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const apiUrl = import.meta.env.VITE_API_URL;

function PaymentForm() {
  const [email, setEmail] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [country, setCountry] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const isFormValid = () => {
    return (
      email.trim() !== '' &&
      cardNumber.trim() !== '' &&
      expiryDate.trim() !== '' &&
      cvc.trim() !== '' &&
      cardholderName.trim() !== '' &&
      country.trim() !== ''
    );
  };

  const pay = async () => {
    if (isFormValid()) {
      try {
        const response = await axios.post(`${apiUrl}/api/validate`, {
          email,
          cardNumber,
          expiryDate,
          cvc,
          cardholderName,
          country,
        });
        alert(response.data.message);
        navigate('/my-orders');
      } catch (error) {
        setError(error.response.data.message);
      }
    } else {
      setError('Please fill out all fields correctly.');
    }
  };

  return (
    <div style={styles.container}>
      <label style={styles.label} htmlFor="email">Email</label>
      <input
        style={styles.input}
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label style={styles.label} htmlFor="cardNumber">Card Information</label>
      <div style={styles.card}>
        <input
          style={{ ...styles.input, width: '60%' }}
          type="text"
          id="cardNumber"
          name="cardNumber"
          placeholder="1234 1234 1234 1234"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <input
          style={{ ...styles.input, width: '20%' }}
          type="text"
          id="expiryDate"
          name="expiryDate"
          placeholder="MM/YY"
          value={expiryDate}
          onChange={(e) => setExpiryDate(e.target.value)}
        />
        <input
          style={{ ...styles.input, width: '15%' }}
          type="text"
          id="cvc"
          name="cvc"
          placeholder="CVV"
          value={cvc}
          onChange={(e) => setCvc(e.target.value)}
        />
      </div>

      <label style={styles.label} htmlFor="cardholderName">Cardholder Name</label>
      <input
        style={styles.input}
        type="text"
        id="cardholderName"
        name="cardholderName"
        value={cardholderName}
        onChange={(e) => setCardholderName(e.target.value)}
      />

      <label style={styles.label} htmlFor="country">Country or region</label>
      <select
        style={styles.input}
        id="country"
        name="country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
      >
        <option value="">Select a country</option>
        <option value="India">India</option>
        <option value="USA">USA</option>
        <option value="Canada">Canada</option>
        <option value="Australia">Australia</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        <option value="Japan">Japan</option>
      </select>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button
        style={styles.button}
        onClick={pay}
        type="button"
        disabled={!isFormValid()}
      >
        Pay Now
      </button>

      <div style={styles.poweredBy}>
        Powered by <strong>Stripe</strong>
      </div>

      <div style={styles.sample}>
        <p><u>For Demo use only:</u></p>
        <p>Email: test@example.com</p>
        <p>Card Number: 1234123412341234</p>
        <p>Expiry Date: 12/24</p>
        <p>CVV: 123</p>
        <p>Cardholder Name: sagar</p>
        <p>Country: India</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '100px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
  },
  label: {
    display: 'block',
    margin: '10px 0 5px 0',
  },
  card: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'space-between',
  },
  poweredBy: {
    marginTop: '20px',
    textAlign: 'center',
    color: '#aaa',
  },
  sample: {
    marginTop: '30px',
    border: '2px solid green',
    padding: '10px',
  },
};

export default PaymentForm;
