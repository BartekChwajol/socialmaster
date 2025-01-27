import React from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { DashboardStats } from '../../types/dashboard';

// Rejestracja komponentów Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsTabProps {
  stats: DashboardStats;
}

export default function AnalyticsTab({ stats }: AnalyticsTabProps) {
  const chartData = {
    labels: ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nd'],
    datasets: [
      {
        label: 'Zaangażowanie',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: 'rgb(86, 255, 252)',
        tension: 0.1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'white'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-effect rounded-xl p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Statystyki</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-effect rounded-lg p-4">
          <h3 className="text-gray-300 text-sm">Wszystkie posty</h3>
          <p className="text-2xl font-bold text-accent">{stats.totalPosts}</p>
        </div>
        <div className="glass-effect rounded-lg p-4">
          <h3 className="text-gray-300 text-sm">Opublikowane</h3>
          <p className="text-2xl font-bold text-accent">{stats.publishedPosts}</p>
        </div>
        <div className="glass-effect rounded-lg p-4">
          <h3 className="text-gray-300 text-sm">Zaplanowane</h3>
          <p className="text-2xl font-bold text-accent">{stats.scheduledPosts}</p>
        </div>
        <div className="glass-effect rounded-lg p-4">
          <h3 className="text-gray-300 text-sm">Zaangażowanie</h3>
          <p className="text-2xl font-bold text-accent">{stats.engagement}%</p>
        </div>
      </div>
      <div className="mt-8 bg-white/5 p-4 rounded-lg">
        <Line data={chartData} options={chartOptions} />
      </div>
    </motion.div>
  );
}