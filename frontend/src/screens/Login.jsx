import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // Reset error message on new submit

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
      });

      const loginData = await response.json();

      if (response.ok) {
        localStorage.setItem('token', loginData.token);
        navigate("/");
        alert("Login Successful");
        setEmail("");
        setPassword("");
      } else {
        setError(loginData.error || "Login failed. Please try again.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email address</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            aria-required="true"
            aria-describedby="emailHelp"
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={styles.input}
            aria-required="true"
          />
        </div>
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button} disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </button>
        <Link to="/signup" style={styles.link}>Signup</Link>
        <p style={styles.demoCredentials}>
          <u>Only for demo use:</u> <br />
          Email: akash@gmail.com <br />
          Password: 123456
        </p>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0', // Added background color for better visibility
  },
  form: {
    width: '400px',
    padding: '40px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '16px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    width: '100%',
    borderRadius: '4px',
    padding: '10px',
    marginTop: '20px',
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s',
  },
  demoCredentials: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#555',
    fontSize: '16px',
  },
  error: {
    color: 'red',
    fontSize: '14px',
    textAlign: 'center',
  },
};

export default Login;
