// src/pages/TaskForm.jsx
import React, { useState, useEffect } from 'react';
import { Container, TextField, Button, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import dayjs from 'dayjs';

function TaskForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();

  const [task, setTask] = useState({
    titulo: '',
    descricao: '',
    prioridade: 'baixa',
    dataVencimento: dayjs().format('YYYY-MM-DD'),
    status: 'pendente',
    assignedTo: ''
  });

  const [users, setUsers] = useState([]);

  useEffect(() => {
    // 1) Buscar usuários caso seja admin
    const fetchUsers = async () => {
      // se a rota for /usuarios (listar)
      const res = await axios.get('https://sua-api.onrender.com/usuarios', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data); // [{_id, nome, ...}]
    };
    fetchUsers();

    // 2) Se for edição, buscar a tarefa
    if (id) {
      const fetchTask = async () => {
        const res = await axios.get(`https://sua-api.onrender.com/tarefas/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const t = res.data;
        setTask({
          titulo: t.titulo,
          descricao: t.descricao,
          prioridade: t.prioridade,
          dataVencimento: dayjs(t.dataVencimento).format('YYYY-MM-DD'),
          status: t.status,
          assignedTo: t.assignedTo || ''
        });
      };
      fetchTask();
    }
  }, [id, token]);

  const handleChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      if (id) {
        await axios.put(`https://sua-api.onrender.com/tarefas/${id}`, task, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Tarefa atualizada!');
      } else {
        await axios.post(`https://sua-api.onrender.com/tarefas`, task, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('Tarefa criada!');
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar tarefa');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {id ? 'Editar Tarefa' : 'Nova Tarefa'}
      </Typography>
      <TextField
        label="Título"
        name="titulo"
        value={task.titulo}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Descrição"
        name="descricao"
        value={task.descricao}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <FormControl fullWidth margin="normal">
        <InputLabel>Prioridade</InputLabel>
        <Select
          name="prioridade"
          value={task.prioridade}
          onChange={handleChange}
          label="Prioridade"
        >
          <MenuItem value="baixa">Baixa</MenuItem>
          <MenuItem value="media">Média</MenuItem>
          <MenuItem value="alta">Alta</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Data de Vencimento"
        name="dataVencimento"
        type="date"
        value={task.dataVencimento}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      {/* ASSIGN A USUÁRIO */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Atribuir a</InputLabel>
        <Select
          name="assignedTo"
          value={task.assignedTo}
          onChange={handleChange}
          label="Atribuir a"
        >
          <MenuItem value="">Sem atribuição</MenuItem>
          {users.map(u => (
            <MenuItem key={u._id} value={u._id}>
              {u.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth margin="normal">
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={task.status}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value="pendente">Pendente</MenuItem>
          <MenuItem value="concluida">Concluída</MenuItem>
        </Select>
      </FormControl>

      <Button variant="contained" color="primary" onClick={handleSave} sx={{ mt: 2 }}>
        Salvar
      </Button>
    </Container>
  );
}

export default TaskForm;
