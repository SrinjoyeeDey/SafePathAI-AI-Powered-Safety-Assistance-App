import React from 'react';

interface FiltersProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (v:string)=>void;
  onEndDateChange: (v:string)=>void;
  onSeverityChange: (v:string)=>void;
  severity: string;
}

const Filters: React.FC<FiltersProps> = ({startDate,endDate,onStartDateChange,onEndDateChange,onSeverityChange,severity}) => {
  return (
    <div className="p-4 bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-sm flex flex-col sm:flex-row gap-3 items-center">
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">From</label>
        <input type="date" value={startDate} onChange={e=>onStartDateChange(e.target.value)} className="px-3 py-2 rounded-md border" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">To</label>
        <input type="date" value={endDate} onChange={e=>onEndDateChange(e.target.value)} className="px-3 py-2 rounded-md border" />
      </div>
      <div className="flex items-center gap-2">
        <label className="text-sm text-gray-600 dark:text-gray-300">Severity</label>
        <select value={severity} onChange={e=>onSeverityChange(e.target.value)} className="px-3 py-2 rounded-md border">
          <option value="all">All</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
    </div>
  );
}

export default Filters;
