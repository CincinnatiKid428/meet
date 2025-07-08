// src/components/EventGenresChart.jsx

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const genres = ['React', 'Node', 'JavaScript', 'jQuery', 'Angular'];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#7B30AD'];

const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent, index }) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius;
  const x = cx + radius * Math.cos(-midAngle * RADIAN) * 1.3;
  const y = cy + radius * Math.sin(-midAngle * RADIAN) * 1.3;
  return percent ? (
    <text
      x={x}
      y={y}
      fill="#8884d8"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {/*Based on screen size, omit genre name on lable for less than 600px width (mobile devices) */}
      {window.innerWidth < 600 ? `${(percent * 100).toFixed(0)}%` : `${genres[index]} ${(percent * 100).toFixed(0)}%`}
    </text>
  ) : null;
};

const EventGenresChart = ({ events }) => {
  const [data, setData] = useState([]);

  useEffect(() => {

    //Builds data set object for pie chart
    const getData = () => {

      const data = genres.map((genre) => {
        const value = events.filter((event) => event.summary.includes(genre)).length
        const name = genre;
        return { name, value };
      });

      return data;
    };

    setData(getData());
  }, [events]);



  return (
    <ResponsiveContainer width="99%" height={400}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={true}
          label={renderCustomizedLabel}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value, name, props) => [value, `${props.payload.name} events`]} />
        <Legend layout="horizontal" />
      </PieChart>
    </ResponsiveContainer>
  );
}

export default EventGenresChart;