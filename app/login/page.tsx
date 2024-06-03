'use client'
import React, { useState } from 'react';
import { TextField, Button, Paper, Box, Typography, Alert } from '@mui/material';
import useAuth from '@/app/hooks/useAuth';
import { useRouter } from 'next/navigation';

const LoginPage: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login, error, setError } = useAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }
        await login(username, password);
        if (!error) router.push('/dashboard');
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <Paper sx={{ maxWidth: '500px', p: 4, m: 2 }}>
                <form onSubmit={handleLogin}>
                    <Typography variant="h4" component="h2" gutterBottom>
                        Login
                    </Typography>
                    {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
                    <TextField
                        label="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        variant="outlined"
                        color="primary"
                        type="text"
                        value={username}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <TextField
                        label="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        variant="outlined"
                        color="primary"
                        type="password"
                        value={password}
                        fullWidth
                        sx={{ mb: 3 }}
                    />
                    <Button variant="contained" color="primary" type="submit" fullWidth>
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
};

export default LoginPage;
