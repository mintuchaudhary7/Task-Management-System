import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { getAdminStats } from "../../api/admin.api";
import StatCard from "../../components/cards/StatCard";
import ActionCard from "../../components/cards/ActionCard";
import OverviewCard from "../../components/cards/OverviewCard";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoers: 0,
    totalTemplates: 0,
    totalTasks: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await getAdminStats();
        setStats(res.stats);
        toast.success("Dashboard stats loaded successfully!");
      } catch (err) {
        console.error("Failed to load admin stats", err);
        setError("Failed to load dashboard data");
        toast.error("Failed to load dashboard stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <p className="text-center mt-20">Loading dashboard...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto text-text-dark">
      {/* ===== HEADER ===== */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-text-muted mt-1">
          System overview & quick management actions
        </p>
      </div>

      {/* ===== ERROR ===== */}
      {error && (
        <div className="mb-6 card border-l-4 border-danger bg-red-50 text-danger">
          {error}
        </div>
      )}

      {/* ===== STATS ===== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Total Users" value={stats.totalUsers} variant="blue" />
        <StatCard label="Total Doers" value={stats.totalDoers} variant="purple" />
        <StatCard label="Templates" value={stats.totalTemplates} variant="green" />
        <StatCard label="Total Tasks" value={stats.totalTasks} variant="orange" />
      </div>

      <div className="my-10 divider" />

      {/* ===== QUICK ACTIONS ===== */}
      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ActionCard title="Create User" description="Add Admin or Doer accounts" />
          <ActionCard title="Create Template" description="Define reusable task templates" />
          <ActionCard title="Create Instance" description="Assign projects to Doers" />
        </div>
      </div>

      {/* ===== SYSTEM OVERVIEW ===== */}
      <div>
        <h2 className="text-xl font-semibold mb-4">System Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <OverviewCard title="Instances" description="Track project execution across teams" />
          <OverviewCard title="Tasks" description="Monitor task status & completion" />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
