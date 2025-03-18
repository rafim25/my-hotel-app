'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FaUsers,
  FaBed,
  FaMoneyBillWave,
  FaChartLine,
  FaDownload
} from 'react-icons/fa';
import { LineChart, BarChart, PieChart } from '@/components/Charts';
import { formatCurrency } from '@/utils/format';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, bookingsRes, chartRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/admin/bookings'),
        fetch('/api/admin/visualization-data')
      ]);

      const [stats, bookings, chartData] = await Promise.all([
        statsRes.json(),
        bookingsRes.json(),
        chartRes.json()
      ]);

      setStats(stats);
      setBookings(bookings);
      setChartData(chartData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <StatsCard
          title="Total Users"
          value={stats.totalUsers}
          icon={<FaUsers />}
          color="bg-blue-500"
        />
        <StatsCard
          title="Active Bookings"
          value={stats.activeBookings}
          icon={<FaBed />}
          color="bg-green-500"
        />
        <StatsCard
          title="Monthly Revenue"
          value={formatCurrency(stats.monthlyRevenue)}
          icon={<FaMoneyBillWave />}
          color="bg-yellow-500"
        />
        <StatsCard
          title="Occupancy Rate"
          value={`${stats.occupancyRate}%`}
          icon={<FaChartLine />}
          color="bg-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Revenue Trend</h3>
          <LineChart data={chartData.revenue} />
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Booking Statistics</h3>
          <BarChart data={chartData.bookings} />
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Recent Bookings</h3>
          <button
            onClick={() => downloadReport('bookings')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
          >
            <FaDownload /> Download Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="p-4 text-left">Booking ID</th>
                <th className="p-4 text-left">Guest</th>
                <th className="p-4 text-left">Room</th>
                <th className="p-4 text-left">Check-in</th>
                <th className="p-4 text-left">Check-out</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Amount</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr key={booking.id} className="border-t">
                  <td className="p-4">{booking.reference}</td>
                  <td className="p-4">{booking.guest_name}</td>
                  <td className="p-4">{booking.room_name}</td>
                  <td className="p-4">{formatDate(booking.check_in)}</td>
                  <td className="p-4">{formatDate(booking.check_out)}</td>
                  <td className="p-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="p-4">{formatCurrency(booking.total_amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 