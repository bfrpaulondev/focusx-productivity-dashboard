// src/components/TaskHistory.jsx
import React from 'react';
import { Dialog, DialogTitle, DialogContent, List, ListItem, Typography } from '@mui/material';
import dayjs from 'dayjs';

function TaskHistory({ open, onClose, history }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>Histórico de Alterações</DialogTitle>
      <DialogContent>
        {history && history.length > 0 ? (
          <List>
            {history.map((item, index) => (
              <ListItem
                key={index}
                sx={{ display: 'block', borderBottom: '1px solid #ccc', mb: 2 }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                  Alteração em {dayjs(item.updatedAt).format('DD/MM/YYYY HH:mm')}
                </Typography>
                <Typography variant="body2">
                  <strong>Título:</strong> {item.changes.titulo}
                </Typography>
                <Typography variant="body2">
                  <strong>Descrição:</strong> {item.changes.descricao}
                </Typography>
                <Typography variant="body2">
                  <strong>Prioridade:</strong> {item.changes.prioridade}
                </Typography>
                <Typography variant="body2">
                  <strong>Data de Vencimento:</strong> {dayjs(item.changes.dataVencimento).format('DD/MM/YYYY')}
                </Typography>
                <Typography variant="body2">
                  <strong>Status:</strong> {item.changes.status}
                </Typography>
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>Nenhum histórico encontrado.</Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default TaskHistory;
