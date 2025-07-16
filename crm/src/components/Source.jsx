import React from "react";
import {PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer} from 'recharts'; 

const data = [
  {name: 'Landing Page', value: 9000},
  {name: 'FaceBook', value: 4000},
  {name: 'Missed Call', value: 4000},
  {name: 'Walk In', value: 8000},
  {name: 'Existing Customer', value: 9000},
  {name: 'Web Enquiry', value: 6000}
]; 
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Source = () => {
    return (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => new Intl.NumberFormat().format(value)} />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
    );
};

export default Source;