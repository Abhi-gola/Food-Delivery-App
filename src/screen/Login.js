import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });

    const json = await response.json()
    console.log(json);

    if (!json.success) {
      alert("Enter Valid Credentials")
    }
    else {
      localStorage.setItem("authToken", json.authToken);
      localStorage.setItem("userEmail", credentials.email);
      navigate("/");
    }
  }

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498522271744-cdd435c13f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2QlMjBiYWNrZ3JvdW5kfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60")', height: '100vh', backgroundSize: 'cover' }}>
      <div>
        <Navbar />
      </div>
      <div style={styles.container}>
        <form className='bg-light' style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.heading}>Login Your Account</h2>
          <div style={styles.formGroup}>
            <label htmlFor="exampleInputEmail1" style={styles.label}>
              Email address
            </label>
            <input
              type="email"
              style={styles.input}
              className="form-control"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            />
            <div id="emailHelp" style={styles.formText}>
              We'll never share your email with anyone else.
            </div>
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="exampleInputPassword1" style={styles.label}>
              Password
            </label>
            <input
              type="password"
              style={styles.input}
              className="form-control"
              name="password"
              value={credentials.password}
              onChange={onChange}
              id="exampleInputPassword1"
              required
            />
          </div>
          <div className='d-flex'>
            <button className='mb-1 me-2' type="submit" style={styles.submitButton}>
              Submit
            </button>
            <Link to="/signup" style={styles.newUserButton}>
              New User
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

// Inline styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    // alignItems: 'center',
    minHeight: '56vh',
  },
  form: {
    margin: '20px',
    marginTop: '100px',
    width: '650px',
    padding: '20px',
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
    border: '2px solid black',
  },
  
  heading: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: '20px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    fontFamily: 'Helvetica, sans-serif',
    marginBottom: '5px',
    fontWeight: 'bold',
  },
  input: {
    // color:'white',
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  formText: {
    fontSize: '14px',
    color: '#888',
  },
  submitButton: {
    width: '50%',
    padding: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  newUserButton: {
    width: '50%',
    height: '40px',
    textAlign: 'center',
    padding: '8px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#dc3545',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    cursor: 'pointer',
  },
};

