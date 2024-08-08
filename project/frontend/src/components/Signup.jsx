import { useState } from "react";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import "./Signup.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSignup = async (event) => {
        event.preventDefault();
        setError(null);

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await axios.post("http://127.0.0.1:8000/api/register/", {
                username,
                email,
                password,
            });
            console.log("Signup success", response.data);

            // Clear input fields
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            navigate('/');
            
        } catch (err) {
            console.error(err);
            setError("Signup failed. Please change the username or try again.");
        }
    };

    const renderLoginpage = () => {
        navigate('/');
    }

    return (
        <div className="signup-container">
            <h2 className="form-title">Signup</h2>
            {error && <Alert severity="error">{error}</Alert>}
            <form className="signup-form" onSubmit={handleSignup}>
                <div className="form-field">
                    <TextField
                        id="username"
                        label="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        variant="outlined"
                        className="text-field"
                    />
                </div>
                <div className="form-field">
                    <TextField
                        id="email"
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        variant="outlined"
                        className="text-field"
                    />
                </div>
                <div className="form-field">
                    <TextField
                        id="password"
                        type="password"
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        className="text-field"
                    />
                </div>
                <div className="form-field">
                    <TextField
                        id="confirmPassword"
                        type="password"
                        label="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        variant="outlined"
                        className="text-field"
                    />
                </div>
                <div className="button-group">
                    <Button variant="contained" className="button login-button" onClick={renderLoginpage}>
                        Login
                    </Button>
                    <Button
                        color="success"
                        type="submit"
                        variant="contained"
                        className="button signup-button"
                        disabled={password !== confirmPassword}
                    >
                        Signup
                    </Button>
                </div>
            </form>
        </div>
    );
}
