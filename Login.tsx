import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Tabs, Tab, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@mui/material';
const apiBaseUrl = process.env.REACT_APP_API_URL;

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleLogin = () => {
    if (username && password) {
      localStorage.setItem('user', JSON.stringify({ username }));
      navigate('/translate');
    } else {
      alert('Please enter valid credentials');
    }
  };

  const handleRegister = () => {
    if (username && password && email) {
      alert('Registration successful! You can now log in.');
      setIsRegistering(false);
    } else {
      alert('Please fill out all fields for registration.');
    }
  };

  const handleResetPassword = () => {
    if (resetEmail) {
      alert(`Password reset link sent to ${resetEmail}`);
      setResetDialogOpen(false);
      setResetEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <Box
      sx={{
        padding: isMobile ? '16px' : '32px',
        margin: isMobile ? '8px' : '16px',
        width: isMobile ? '90%' : '50%',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}
    >
      <Tabs
        value={isRegistering ? 1 : 0}
        onChange={(_, newValue) => setIsRegistering(newValue === 1)}
        centered
      >
        <Tab label="Login" />
        <Tab label="Register" />
      </Tabs>

      {isRegistering ? (
        <Box>
          <Typography variant="h4" gutterBottom>Register</Typography>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
            Register
          </Button>
        </Box>
      ) : (
        <Box>
          <Typography variant="h4" gutterBottom>Login</Typography>
          <TextField
            fullWidth
            label="Username"
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            fullWidth
            label="Password"
            type="password"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleLogin} sx={{ mt: 2 }}>
            Login
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={() => setResetDialogOpen(true)}
            sx={{ mt: 1 }}
          >
            Forgot Password?
          </Button>
        </Box>
      )}

      <Dialog open={resetDialogOpen} onClose={() => setResetDialogOpen(false)}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Enter your email"
            margin="normal"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setResetDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleResetPassword} color="primary">
            Send Reset Link
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Login;
