// src/pages/Reminders.jsx
import React, { useEffect, useState } from 'react';
import { Container, Typography } from '@mui/material';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import dayjs from 'dayjs';

function Reminders() {
  const { token } = useAuth();
  const [soonTasks, setSoonTasks] = useState([]);

  useEffect(() => {
    const fetchSoonTasks = async () => {
      try {
        // Exemplo: podemos pegar TODAS e filtrar no front. 
        // Ou criar um endpoint /tarefas?filtro=24h (se quiser).
        const res = await axios.get('https://api-task-manager-jd6o.onrender.com/tarefas', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const allTasks = res.data;
        const now = dayjs();
        const soon = allTasks.filter(t => {
          const diff = dayjs(t.dataVencimento).diff(now, 'hour');
          return t.status === 'pendente' && diff <= 24 && diff >= 0;
        });
        setSoonTasks(soon);
      } catch (err) {
        console.error(err);
      }
    };

    fetchSoonTasks();
  }, [token]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Lembretes</Typography>
      {soonTasks.length === 0 ? (
        <Typography>Não há tarefas próximas do vencimento.</Typography>
      ) : (
        soonTasks.map((task) => (
          <Typography key={task._id}>
            A tarefa "{task.titulo}" vence em menos de 24h!
          </Typography>
        ))
      )}
    </Container>
  );
}

export default Reminders;
