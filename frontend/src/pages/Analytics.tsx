import { useMemo, useState } from 'react';
import { ChartCard, SmallLineChart, SmallBarChart, SmallPieChart } from '../components/Analytics/ChartCard';
import Filters from '../components/Analytics/Filters';
import { Link } from 'react-router-dom';

// Mock data for charts - replace with API calls to backend when available
const weeklyAlerts = [
  { name: 'Mon', alerts: 5 },
  { name: 'Tue', alerts: 8 },
  { name: 'Wed', alerts: 6 },
  { name: 'Thu', alerts: 10 },
  { name: 'Fri', alerts: 4 },
  { name: 'Sat', alerts: 2 },
  { name: 'Sun', alerts: 3 },
];

const locationActivity = [
  { name: 'Central Park', value: 12 },
  { name: 'Main St', value: 8 },
  { name: 'Riverside', value: 6 },
  { name: 'Downtown', value: 4 },
  { name: 'Uptown', value: 3 },
];

const alertTypes = [
  { name: 'Accident', value: 10 },
  { name: 'Suspicious', value: 6 },
  { name: 'Medical', value: 8 },
  { name: 'Other', value: 4 },
];

export default function Analytics() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [severity, setSeverity] = useState('all');

  // Simple filtered datasets (mock - in real app filter server-side)
  const filteredWeekly = useMemo(() => weeklyAlerts, [startDate, endDate, severity]);
  const filteredLocations = useMemo(() => locationActivity, [startDate, endDate, severity]);
  const filteredTypes = useMemo(() => alertTypes, [startDate, endDate, severity]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Analytics</h1>
            <p className="text-gray-600 dark:text-gray-400">Detailed insights about alerts and locations</p>
          </div>
          <Link to="/dashboard" className="text-sm text-blue-600 dark:text-blue-400 underline">Back to Dashboard</Link>
        </div>

        <Filters
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          severity={severity}
          onSeverityChange={setSeverity}
        />

        <div className="grid lg:grid-cols-3 gap-6 mt-6">
          <ChartCard title="Alerts This Week">
            <SmallLineChart data={filteredWeekly} dataKey="alerts" />
          </ChartCard>

          <ChartCard title="Most Active Locations">
            <SmallBarChart data={filteredLocations} dataKey="value" />
          </ChartCard>

          <ChartCard title="Alert Types">
            <SmallPieChart data={filteredTypes} />
          </ChartCard>
        </div>

        {/* Additional detailed section */}
        <div className="mt-8 p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl border border-white/40 dark:border-gray-700/40 shadow-sm">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Detailed Table</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">Replace this with a paginated table of alerts (time, type, severity, location) coming from the backend.</p>
        </div>
      </div>
    </div>
  );
}
