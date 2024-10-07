import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import ApiRoutes from '../utils/ApiRoutes';
import axios from 'axios';
import { BASE_URL } from '../utils/Constants';

const styles = {
    container: {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundImage: "url('https://img.freepik.com/free-vector/realistic-style-technology-particle-background_23-2148426704.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1727654400&semt=ais_hybrid')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
    backgroundText: {
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '4rem',
        fontWeight: 'bold',
        color: 'white', // Set FitFlex text color to white
        opacity: 0.8, // Adjust opacity for better visibility
        zIndex: 0,
    },
    formContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '2rem',
        borderRadius: '0.5rem',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '24rem',
        zIndex: 1,
        position: 'relative',
    },
    title: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginBottom: '1.5rem',
        textAlign: 'center',
        color: '#1f2937',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
    },
    input: {
        width: '100%',
        padding: '0.5rem 0.75rem',
        border: '1px solid #d1d5db',
        borderRadius: '0.375rem',
        outline: 'none',
    },
    button: {
        width: '100%',
        backgroundColor: '#3b82f6',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '0.375rem',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
    },
    toggleButton: {
        width: '100%',
        marginTop: '1rem',
        color: '#3b82f6',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
    },
};

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [role, setRole] = useState('user');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onRegisterSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            let register_payload = {
                "name": name,
                "email": email,
                "password": password,
                "role": role
            }
            const success = await axios.post(BASE_URL + ApiRoutes.REGISTER.path, register_payload)
            if (success) {
                toast.success('Registered successfully');
                navigate('/login')
            } else {
                toast.error('Registration failed. Please check your information and try again.');
            }
        } catch (error) {
            console.log("error: ", error)
            toast.error('An error occurred during registration. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            {/* Background FitFlex Text */}
            <div style={styles.backgroundText}>FitFlex</div>

            <div style={styles.formContainer}>
                <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />

                {/* Form Title */}
                <h1 style={styles.title}>Register</h1>

                <form onSubmit={onRegisterSubmit} style={styles.form}>
                    <>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Name"
                            required
                            style={styles.input}
                        />

                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            style={styles.input}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        required
                        style={styles.input}
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        style={styles.input}
                    />
                    <button
                        type="submit"
                        disabled={isLoading}
                        style={{ ...styles.button, opacity: isLoading ? 0.5 : 1 }}
                    >
                        {isLoading ? 'Processing...' : ( 'Register')}
                    </button>
                </form>
                <button
                    onClick={() => navigate('/login')}
                    disabled={isLoading}
                    style={styles.toggleButton}
                >
                    {'Already have an account? Login'}
                </button>
            </div>
        </div>
    );
};

export default Register;