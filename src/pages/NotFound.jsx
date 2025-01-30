// src/pages/NotFound.jsx
import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();
  return (
    <Container sx={{ textAlign: 'center', mt: 10 }}>
      <Typography variant="h3">404</Typography>
      <Typography variant="h5" sx={{ mb: 2 }}>Ops, página não encontrada!</Typography>
      <Button variant="contained" color="primary" onClick={() => navigate('/dashboard')}>
        Ir para o Dashboard
      </Button>
    </Container>
  );
}

export default NotFound;
