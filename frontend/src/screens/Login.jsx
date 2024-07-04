import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/loginuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert('Enter valid credentials');
    }

    if (json.success) {
      localStorage.setItem('authToken', json.authToken);
      alert('Login successful, we will redirect to the home page');
      navigate('/');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.inputGroup}>
          <label htmlFor="exampleInputEmail1" style={styles.label}>Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            style={styles.input}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor="exampleInputPassword1" style={styles.label}>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button}>Login</button>
        <Link to="/signup" style={styles.link}>Signup</Link>
        <p style={styles.demoCredentials}><u>only for demo you can use:-</u> <br/> Email: akash@gmail.com <br/> password: 123456</p>
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
  },
  form: {
    width: '400px',
    padding: '40px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    backgroundColor: '#f7f7f7',
  },
  inputGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  input: {
    width: '100%',
    padding: '11px',
    borderRadius: '12px',
    border: '1px solid #ccc',
    fontSize: '18px',
  },
  button: {
    width: '100%',
    padding: '10px',
    borderRadius: '3px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '18px',
  },
  link: {
    display: 'block',
    textAlign: 'center',
    width: '96%',
    borderRadius: '3px',
    padding: '8px',
    marginTop: '30px',
    textDecoration: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    cursor: 'pointer',
    fontSize: '19px',
  },
  demoCredentials: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#555',
    fontSize: '18px',
    border:"3px solid red"
  },
};

export default Login;
