import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Box, Typography } from '@mui/material';
const apiBaseUrl = process.env.REACT_APP_API_URL;

const TranslationHistory: React.FC = () => {
  const [history, setHistory] = useState<{ text: string; translated: string }[]>([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('translationHistory') || '[]');
    setHistory(savedHistory);
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Translation History</Typography>
      <List>
        {history.map((entry, index) => (
          <ListItem key={index}>
            <ListItemText primary={`Original: ${entry.text}`} secondary={`Translated: ${entry.translated}`} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TranslationHistory;
