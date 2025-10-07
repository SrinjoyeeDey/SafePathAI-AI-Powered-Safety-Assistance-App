import type React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

interface ChartCardProps {
  title: string;
  children?: React.ReactNode;
}

export const ChartCard: React.FC<ChartCardProps> = ({ title, children }) => {
  return (
    <div className="p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-lg rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-sm">
      <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-white">{title}</h3>
      <div className="h-56">
        {children}
      </div>
    </div>
  );
};

export const COLORS = ['#4F46E5', '#EF4444', '#F59E0B', '#10B981', '#3B82F6'];

export const SmallLineChart: React.FC<{data:any, dataKey:string}> = ({data,dataKey}) => (
  <ResponsiveContainer width="100%" height="100%">
    <LineChart data={data}>
      <XAxis dataKey="name" stroke="#9CA3AF" />
      <YAxis stroke="#9CA3AF" />
      <Tooltip />
      <Line type="monotone" dataKey={dataKey} stroke="#4F46E5" strokeWidth={3} dot={{ r: 2 }} />
    </LineChart>
  </ResponsiveContainer>
);

export const SmallBarChart: React.FC<{data:any, dataKey:string}> = ({data,dataKey}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <XAxis dataKey="name" stroke="#9CA3AF" />
      <YAxis stroke="#9CA3AF" />
      <Tooltip />
      <Bar dataKey={dataKey} fill="#4F46E5" />
    </BarChart>
  </ResponsiveContainer>
);

export const SmallPieChart: React.FC<{data:any, dataKey?:string}> = ({data}) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie data={data} dataKey="value" nameKey="name" outerRadius={70} fill="#4F46E5">
        {data.map((_entry:any, index:number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

export default ChartCard;
