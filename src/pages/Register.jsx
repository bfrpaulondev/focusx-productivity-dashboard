// src/pages/Register.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container } from '@mui/material';

function Register() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setError('');
    try {
      await axios.post('https://api-task-manager-jd6o.onrender.com/usuarios/register', form);
      alert('Usuário cadastrado com sucesso!');
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || 'Erro ao registrar usuário');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" sx={{ my: 2 }}>Cadastro</Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TextField
        label="Nome"
        name="nome"
        value={form.nome}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Senha"
        name="senha"
        type="password"
        value={form.senha}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
        Cadastrar
      </Button>
    </Container>
  );
}

export default Register;
