// src/App.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import TranslationBox from './components/TranslationBox';
import FileUpload from './components/FileUpload';
import Login from './components/Login';
import TranslationHistory from './components/TranslationHistory';
import './App.css';
const apiBaseUrl = process.env.REACT_APP_API_URL;

const App: React.FC = () => {
  return (
    <Container maxWidth="md" className="app-container">
      <Box my={4} textAlign="center">
        <Typography variant="h3" gutterBottom>
          Translation & Summarization Platform
        </Typography>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/translate" element={<><TranslationBox /><FileUpload /></>} />
          <Route path="/history" element={<TranslationHistory />} />
        </Routes>
      </Box>
    </Container>
  );
};

export default App;
