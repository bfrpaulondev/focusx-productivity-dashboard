// src/pages/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Button } from '@mui/material';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import TaskFilter from '../components/TaskFilter';
import TaskList from '../components/TaskList';
import TaskHistory from '../components/TaskHistory';

function Dashboard() {
    const navigate = useNavigate();
    const { token, userName } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [filters, setFilters] = useState({
        search: '',
        status: '',
        prioridade: '',
        ordenar: ''
    });
    const [runTour, setRunTour] = useState(false);
    const steps = [
        {
            target: '.new-task-btn',
            content: 'Clique aqui para criar uma nova tarefa.'
        },
        {
            target: '.task-filter',
            content: 'Use estes campos para filtrar ou pesquisar tarefas.'
        },
        {
            target: '.task-list',
            content: 'Liste e gerencie todas as suas tarefas aqui.'
        }
    ];
    const fetchTasks = async () => {
        try {
            const params = {};
            if (filters.status) params.status = filters.status;
            if (filters.prioridade) params.prioridade = filters.prioridade;
            if (filters.ordenar) params.ordenar = filters.ordenar;
            if (filters.search) params.search = filters.search;

            const res = await axios.get('https://api-task-manager-jd6o.onrender.com/tarefas', {
                headers: { Authorization: `Bearer ${token}` },
                params
            });
            setTasks(res.data);
        } catch (err) {
            console.error(err);
            // se token inválido, redireciona para login?
            if (err.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    useEffect(() => {
        if (!token) {
            navigate('/login');
            return;
        }
        fetchTasks();
    }, [token]);

    const handleApplyFilters = () => {
        fetchTasks();
    };

    const handleMarkDone = async (taskId) => {
        try {
            await axios.patch(`https://api-task-manager-jd6o.onrender.com/tarefas/${taskId}/concluir`, null, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleEdit = (taskId) => {
        navigate(`/task/${taskId}/edit`);
    };

    const handleDelete = async (taskId) => {
        if (!window.confirm('Deseja excluir esta tarefa?')) return;
        try {
            await axios.delete(`https://api-task-manager-jd6o.onrender.com/tarefas/${taskId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            fetchTasks();
        } catch (err) {
            console.error(err);
        }
    };

    const handleExportCSV = async () => {
        try {
            const res = await axios.get('https://api-task-manager-jd6o.onrender.com/tarefas/export/csv', {
                headers: { Authorization: `Bearer ${token}` },
                responseType: 'blob' // importante para receber arquivo
            });
            const blob = new Blob([res.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'tarefas.csv');
            document.body.appendChild(link);
            link.click();
        } catch (err) {
            console.error(err);
        }
    };
    const [historyOpen, setHistoryOpen] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState([]);

    const handleShowHistory = (history) => {
        setSelectedHistory(history);
        setHistoryOpen(true);
    };
    return (
        <Container sx={{ mt: 4 }}>
            <Joyride
                steps={steps}
                run={runTour}
                continuous
                showSkipButton
                showProgress
                styles={{
                    options: {
                        primaryColor: '#c21d03'
                    }
                }}
                callback={(data) => {
                    if (['finished', 'skipped'].includes(data.status)) {
                        setRunTour(false);
                    }
                }}
            />
            <Typography variant="h4" sx={{ mb: 2 }}>
                Olá, {userName}! Bem-vindo ao seu Dashboard de Tarefas
            </Typography>

            <Button
                variant="outlined"
                color="secondary"
                sx={{ mb: 2, mr: 2 }}
                className="new-task-btn" // referência para o tour
                onClick={() => navigate('/task/new')}
            >
                Nova Tarefa
            </Button>
            <Button
                variant="contained"
                color="primary"
                sx={{ mb: 2 }}
                onClick={() => setRunTour(true)}
            >
                Iniciar Tour
            </Button>

            <div className="task-filter">
                <TaskFilter
                    filters={filters}
                    setFilters={setFilters}
                    onApply={handleApplyFilters}
                />
            </div>

            <TaskFilter filters={filters} setFilters={setFilters} onApply={handleApplyFilters} />
            <TaskList tasks={tasks} onMarkDone={handleMarkDone} onEdit={handleEdit} onDelete={handleDelete}
                onShowHistory={handleShowHistory} />
            <TaskHistory
                open={historyOpen}
                onClose={() => setHistoryOpen(false)}
                history={selectedHistory}
            />
            <Button variant="contained" color="secondary" onClick={handleExportCSV} sx={{ mb: 2 }}>
                Exportar CSV
            </Button>

        </Container>
    );
}

export default Dashboard;
