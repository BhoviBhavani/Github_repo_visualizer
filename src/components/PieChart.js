// components/PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const PieChart = ({ repositories }) => {
  const languages = repositories.reduce((acc, repo) => {
    const language = repo.language || 'Unknown';
    if (!acc[language]) {
      acc[language] = 1;
    } else {
      acc[language] += 1;
    }
    return acc;
  }, {});

  const data = {
    labels: Object.keys(languages),
    datasets: [
      {
        data: Object.values(languages),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
