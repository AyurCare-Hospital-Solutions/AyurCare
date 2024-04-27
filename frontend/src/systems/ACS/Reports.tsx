import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip } from 'recharts';

interface EmployeeData {
  name: string;
  count: number;
}

const Report = () => {
  // Dummy data for employee count by category
  const data: EmployeeData[] = [
    { name: 'Doctors', count: 10 },
    { name: 'Nurses', count: 15 },
    { name: 'Attendants', count: 8 },
    { name: 'Management', count: 5 },
    { name: 'Minior Staff', count: 20 },
  ];

  // Define colors for each category
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

  return (
    <div>
      <h2>Employee Count by Category</h2>
      <PieChart width={400} height={400}>
        <Pie
          dataKey="count"
          data={data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        >
          {
            data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))
          }
        </Pie>
        <Legend />
        <Tooltip />
      </PieChart>
    </div>
  );
};

export default Report;
