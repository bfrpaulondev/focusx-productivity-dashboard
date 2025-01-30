// src/components/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

function Header() {
  const { token, logout, userName } = useAuth(); 
  // Agora, armazenamos userName no hook useAuth, por exemplo
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="static"
      sx={{
        // Gradiente “luxuoso”
        background: 'linear-gradient(to right, #c21d03, #fd5732)'
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box
          component="img"
          src="/logo.png"
          alt="Logo FocusX"
          sx={{ height: 40, marginRight: 2 }}
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          FocusX Productivity
        </Typography>
        {token ? (
          <>
            <Typography variant="body1" sx={{ mr: 2 }}>
              Olá, {userName}!
            </Typography>
            <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
            <Button color="inherit" component={Link} to="/report">Relatório</Button>
            <Button color="inherit" component={Link} to="/reminders">Lembretes</Button>
            <Button color="inherit" onClick={handleLogout}>Sair</Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login">Login</Button>
            <Button color="inherit" component={Link} to="/register">Cadastro</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
