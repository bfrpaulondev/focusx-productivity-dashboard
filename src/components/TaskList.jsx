// src/components/TaskList.jsx
import React from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button
} from '@mui/material';
import dayjs from 'dayjs';

function TaskList({ tasks, onMarkDone, onEdit, onDelete, onShowHistory }) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Título</TableCell>
            <TableCell>Descrição</TableCell>
            <TableCell>Prioridade</TableCell>
            <TableCell>Data Vencimento</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(task => (
            <TableRow key={task._id}>
              <TableCell>{task.titulo}</TableCell>
              <TableCell>{task.descricao}</TableCell>
              <TableCell>{task.prioridade}</TableCell>
              <TableCell>{dayjs(task.dataVencimento).format('DD/MM/YYYY')}</TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell>
                {task.status === 'pendente' && (
                  <Button
                    variant="outlined"
                    color="success"
                    onClick={() => onMarkDone(task._id)}
                  >
                    Concluir
                  </Button>
                )}{' '}
                <Button variant="outlined" onClick={() => onEdit(task._id)}>Editar</Button>{' '}
                <Button variant="outlined" color="error" onClick={() => onDelete(task._id)}>Excluir</Button>{' '}
                {/* Novo botão de histórico */}
                {task.history && task.history.length > 0 && (
                  <Button
                    variant="outlined"
                    onClick={() => onShowHistory(task.history)}
                  >
                    Histórico
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TaskList;
