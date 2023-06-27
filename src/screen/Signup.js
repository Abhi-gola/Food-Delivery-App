import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });

        const json = await response.json()
        console.log(json);

        if (!json.success) {
            alert("Enter Valid Credentials")
        }
        else {
            localStorage.setItem("authToken", json.authToken)
            navigate("/");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    };

    return (
        <div style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1498522271744-cdd435c13f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1175&q=80")', height: '100vh', backgroundSize: 'cover'}}>
            <div>
                <Navbar />
            </div>
            <div style={styles.container}>
                <form className='bg-light' style={styles.form} onSubmit={handleSubmit}>
                    <h2 style={styles.heading}>SignUp</h2>
                    <div style={styles.formGroup}>
                        <label htmlFor="exampleInputName1" style={styles.label}>
                            Name
                        </label>
                        <input
                            type="string"
                            style={styles.input}
                            className="form-control"
                            name="name"
                            value={credentials.name}
                            onChange={onChange}
                            id="exampleInputName1"
                            aria-describedby="nameHelp"
                            required
                        />
                    </div>
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
                    <div style={styles.formGroup}>
                        <label htmlFor="exampleInputAddress1" style={styles.label}>
                            Address
                        </label>
                        <input
                            type="string"
                            style={styles.input}
                            className="form-control"
                            name="geolocation"
                            value={credentials.geolocation}
                            onChange={onChange}
                            id="exampleInputLocation1"
                            required
                        />
                    </div>
                    <div className='d-flex'>
                    <button className='mb-1 me-2' type="submit" style={styles.submitButton}>
                        Submit
                    </button>
                    <Link to="/login" style={styles.newUserButton}>
                        Already a User
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
        minHeight: '80vh',
    },
    form: {
        margin: '20px',
        marginTop: '70px',
        width: '500px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '15px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        border: '2px solid black'
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
        // display: 'block',
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
