// src/pages/Dashboard.jsx
import { Users, Database, BarChart3, CreditCard } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import LineChartBox from "../components/ui/LineChartBox";

const Dashboard = () => {
  // Mock chart data
  const apiData = [
    { name: "Mon", calls: 320 },
    { name: "Tue", calls: 410 },
    { name: "Wed", calls: 380 },
    { name: "Thu", calls: 470 },
    { name: "Fri", calls: 520 },
    { name: "Sat", calls: 290 },
    { name: "Sun", calls: 340 },
  ];

  const userData = [
    { name: "Week 1", users: 120 },
    { name: "Week 2", users: 180 },
    { name: "Week 3", users: 250 },
    { name: "Week 4", users: 300 },
  ];

  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard Overview</h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value="2,345"
          icon={Users}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Contacts"
          value="12,870"
          icon={Database}
          color="bg-green-500"
        />
        <StatCard
          title="API Calls Today"
          value="4,562"
          icon={BarChart3}
          color="bg-purple-500"
        />
        <StatCard
          title="Credits Used"
          value="78%"
          icon={CreditCard}
          color="bg-orange-500"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LineChartBox
          title="API Calls Per Day"
          dataKey="calls"
          data={apiData}
          color="#8b5cf6"
        />
        <LineChartBox
          title="Active Users Per Week"
          dataKey="users"
          data={userData}
          color="#10b981"
        />
      </div>
    </div>
  );
};

export default Dashboard;
