// StockChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const StockChart = ({ products }) => {
  const productNames = products.map(product => product.name);
  const productQuantities = products.map(product => product.quantity);

  const data = {
    labels: productNames,
    datasets: [
      {
        label: 'Stock Levels',
        data: productQuantities,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default StockChart;
