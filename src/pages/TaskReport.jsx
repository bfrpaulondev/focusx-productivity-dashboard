// src/pages/TaskReport.jsx
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import ProductivityChart from '../components/ProductivityChart'; // Exibirá um gráfico de barras, p. ex.

function TaskReport() {
  const { token } = useAuth();
  const [dataInicio, setDataInicio] = useState('');
  const [dataFim, setDataFim] = useState('');
  const [report, setReport] = useState(null);

  const handleGenerateReport = async () => {
    try {
      const res = await axios.get('https://api-task-manager-jd6o.onrender.com/tarefas/relatorio/produtividade', {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          dataInicio,
          dataFim
        }
      });
      setReport(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>Relatório de Produtividade</Typography>
      <TextField
        label="Data Início"
        type="date"
        value={dataInicio}
        onChange={(e) => setDataInicio(e.target.value)}
        sx={{ mr: 2 }}
      />
      <TextField
        label="Data Fim"
        type="date"
        value={dataFim}
        onChange={(e) => setDataFim(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={handleGenerateReport}>
        Gerar Relatório
      </Button>

      {report && (
        <>
          <Typography variant="h6" sx={{ mt: 4 }}>
            Total de tarefas concluídas no período: {report.totalConcluidas}
          </Typography>
          {/* Exemplo: usar ProductivityChart para exibir esse dado */}
          <ProductivityChart
            data={{
              // Se quisermos apenas exibir as concluídas:
              pendentes: 0,
              concluidas: report.totalConcluidas,
            }}
          />
        </>
      )}
    </Container>
  );
}

export default TaskReport;
