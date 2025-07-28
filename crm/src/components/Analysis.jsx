import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";

import "../App.css";

// Register ChartJS components
//test
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const Analysis = () => {
  return (
    <div className="App">
      <div className="dataCard revenueCard">
        <Bar
          data={{
            labels: ['A', 'B', 'C'],
            datasets: [
              {
                label: 'Revenue',
                data: [200, 300, 400],
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
              }
            ]
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Revenue Data',
              },
            },
          }}
        />
      </div>
      <div className="dataCard customerCard">
        <Line
          data={{
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
            datasets: [
              {
                label: 'Customers',
                data: [65, 59, 80, 81, 56],
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Customer Growth',
              },
            },
          }}
        />
      </div>
      <div className="dataCard categoryCard">
        <Doughnut
          data={{
            labels: ['Red', 'Blue', 'Yellow'],
            datasets: [
              {
                label: 'Categories',
                data: [300, 50, 100],
                backgroundColor: [
                  'rgba(255, 99, 132, 0.5)',
                  'rgba(54, 162, 235, 0.5)',
                  'rgba(255, 206, 86, 0.5)',
                ],
                borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                ],
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: true,
                text: 'Category Distribution',
              },
            },
          }}
        />
      </div>
    </div>
  );
};