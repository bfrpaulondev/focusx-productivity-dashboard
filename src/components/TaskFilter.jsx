// src/components/TaskFilter.jsx
import React from 'react';
import { Box, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function TaskFilter({ filters, setFilters, onApply }) {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <TextField
        label="Pesquisar"
        name="search"
        value={filters.search}
        onChange={handleChange}
      />
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Status</InputLabel>
        <Select
          name="status"
          value={filters.status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="">Todos</MenuItem>
          <MenuItem value="pendente">Pendente</MenuItem>
          <MenuItem value="concluida">Concluída</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Prioridade</InputLabel>
        <Select
          name="prioridade"
          value={filters.prioridade}
          label="Prioridade"
          onChange={handleChange}
        >
          <MenuItem value="">Todas</MenuItem>
          <MenuItem value="baixa">Baixa</MenuItem>
          <MenuItem value="media">Média</MenuItem>
          <MenuItem value="alta">Alta</MenuItem>
        </Select>
      </FormControl>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Ordenar</InputLabel>
        <Select
          name="ordenar"
          value={filters.ordenar}
          label="Ordenar"
          onChange={handleChange}
        >
          <MenuItem value="">Nenhum</MenuItem>
          <MenuItem value="dataVencimento">Data de Vencimento</MenuItem>
          <MenuItem value="prioridade">Prioridade</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={onApply}>Aplicar</Button>
    </Box>
  );
}

export default TaskFilter;
