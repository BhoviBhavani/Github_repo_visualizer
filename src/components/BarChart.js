import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const repoNames = data.map(repo => repo.name);
  const starsCount = data.map(repo => repo.stargazers_count);

  const chartData = {
    labels: repoNames,
    datasets: [
      {
        label: 'Stars Count',
        data: starsCount,
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-2">Stars Count for Repositories</h2>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BarChart; 
