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
    <div className="p-4 bg-white/60 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-sm">
      <h3 className="text-md font-semibold mb-3 text-gray-800 dark:text-gray-100">{title}</h3>
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
      <XAxis dataKey="name" stroke="#6B7280" tick={{ fill: '#111827', fontSize: 12 }} tickLine={{ stroke: '#6B7280' }} axisLine={{ stroke: '#6B7280' }} />
      <YAxis stroke="#6B7280" tick={{ fill: '#111827', fontSize: 12 }} tickLine={{ stroke: '#6B7280' }} axisLine={{ stroke: '#6B7280' }} />
      <Tooltip contentStyle={{ background: '#1F2937', color: '#F3F4F6', border: '1px solid #4F46E5' }} labelStyle={{ color: '#F3F4F6' }} itemStyle={{ color: '#F3F4F6' }} />
      <Line type="monotone" dataKey={dataKey} stroke="#4F46E5" strokeWidth={3} dot={{ r: 2 }} />
    </LineChart>
  </ResponsiveContainer>
);

export const SmallBarChart: React.FC<{data:any, dataKey:string}> = ({data,dataKey}) => (
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={data}>
      <XAxis dataKey="name" stroke="#6B7280" tick={{ fill: '#111827', fontSize: 12 }} tickLine={{ stroke: '#6B7280' }} axisLine={{ stroke: '#6B7280' }} />
      <YAxis stroke="#6B7280" tick={{ fill: '#111827', fontSize: 12 }} tickLine={{ stroke: '#6B7280' }} axisLine={{ stroke: '#6B7280' }} />
      <Tooltip contentStyle={{ background: '#1F2937', color: '#F3F4F6', border: '1px solid #4F46E5' }} labelStyle={{ color: '#F3F4F6' }} itemStyle={{ color: '#F3F4F6' }} />
      <Bar dataKey={dataKey} fill="#4F46E5" />
    </BarChart>
  </ResponsiveContainer>
);

export const SmallPieChart: React.FC<{data:any, dataKey?:string}> = ({data}) => (
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={70}
        fill="#4F46E5"
        label={({ name, x, y }: any) => (
          <text x={x} y={y} fill="#F3F4F6" fontSize={12} textAnchor="middle" dominantBaseline="central">
            {name}
          </text>
        )}
      >
        {data.map((_entry:any, index:number) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip contentStyle={{ background: '#1F2937', color: '#F3F4F6', border: '1px solid #4F46E5' }} labelStyle={{ color: '#F3F4F6' }} itemStyle={{ color: '#F3F4F6' }} />
      <Legend wrapperStyle={{ color: '#F3F4F6' }} />
    </PieChart>
  </ResponsiveContainer>
);

export default ChartCard;
