import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const TextProcessingService: React.FC = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [serviceType, setServiceType] = useState('translate');
  const [translationType, setTranslationType] = useState('en-to-ar');
  const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const handleProcessing = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      let response;

      if (serviceType === 'translate') {
        const endpoint = translationType === 'en-to-ar' ? '/translate/en2ar' : '/translate/ar2en';
        response = await axios.post<{ translated_text: string }>(
          `${apiBaseUrl}${endpoint}`,
          { text }
        );
        setResult(response.data.translated_text);

        // Save to translation history
        const currentHistory = JSON.parse(localStorage.getItem('translationHistory') || '[]');
        localStorage.setItem(
          'translationHistory',
          JSON.stringify([...currentHistory, { text, result: response.data.translated_text, translationType }])
        );
      } else if (serviceType === 'summarize') {
        response = await axios.post<{ summary: string }>(
          `${apiBaseUrl}/summarize`,
          { text }
        );
        setResult(response.data.summary);

        // Save to summarization history
        const currentHistory = JSON.parse(localStorage.getItem('summarizationHistory') || '[]');
        localStorage.setItem(
          'summarizationHistory',
          JSON.stringify([...currentHistory, { text, result: response.data.summary }])
        );
      }
    } catch (error) {
      console.error('Processing Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box mt={3}>
      <Typography variant="h5" gutterBottom>Choose Service</Typography>
      <Select
        fullWidth
        value={serviceType}
        onChange={(e) => setServiceType(e.target.value as string)}
        sx={{ mb: 2 }}
      >
        <MenuItem value="translate">Translation</MenuItem>
        <MenuItem value="summarize">Summarization</MenuItem>
      </Select>

      {serviceType === 'translate' && (
        <Box>
          <Typography variant="h6" gutterBottom>Choose Translation Type</Typography>
          <Select
            fullWidth
            value={translationType}
            onChange={(e) => setTranslationType(e.target.value as string)}
            sx={{ mb: 2 }}
          >
            <MenuItem value="en-to-ar">English to Arabic</MenuItem>
            <MenuItem value="ar-to-en">Arabic to English</MenuItem>
          </Select>
        </Box>
      )}

      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder={serviceType === 'translate' ? "Enter text to translate" : "Enter text to summarize"}
        variant="outlined"
        value={text}
        onChange={(e) => setText(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color={serviceType === 'translate' ? "primary" : "secondary"}
        onClick={handleProcessing}
        disabled={loading}
      >
        {loading
          ? serviceType === 'translate'
            ? "Translating..."
            : "Summarizing..."
          : serviceType === 'translate'
          ? "Translate"
          : "Summarize"}
      </Button>
      {result && (
        <Typography mt={2}>
          {serviceType === 'translate' ? "Translation:" : "Summary:"} {result}
        </Typography>
      )}
    </Box>
  );
};

export default TextProcessingService;