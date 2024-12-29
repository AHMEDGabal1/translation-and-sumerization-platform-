import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
const apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const FileUpload: React.FC = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setUploadedFile(file);

    const formData = new FormData();
    formData.append('file', file);

    try {
      await axios.post(' ${process.env.REACT_APP_API_URL}/translate', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('File uploaded successfully!');
    } catch (error) {
      console.error('File Upload Error:', error);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <Box mt={3}>
      <Box {...getRootProps()} border="2px dashed #ccc" p={3} textAlign="center">
        <input {...getInputProps()} />
        <Typography>Drag & drop a file here, or click to select</Typography>
      </Box>
      {uploadedFile && <Typography mt={2}>Uploaded File: {uploadedFile.name}</Typography>}
    </Box>
  );
};

export default FileUpload;
