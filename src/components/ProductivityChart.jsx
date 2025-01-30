// src/components/ProductivityChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ProductivityChart({ data }) {
  const chartData = {
    labels: ['Tarefas'],
    datasets: [
      {
        label: 'Pendentes',
        data: [data.pendentes],
        backgroundColor: '#c21d03',
      },
      {
        label: 'Concluídas',
        data: [data.concluidas],
        backgroundColor: '#fd5732',
      }
    ]
  };

  const options = {
    responsive: true,
    indexAxis: 'y',
  };

  return <Bar data={chartData} options={options} />;
}

export default ProductivityChart;
