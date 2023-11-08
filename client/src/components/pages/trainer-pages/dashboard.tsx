import React, { useState, useEffect, useRef } from 'react';
import { AxiosError } from 'axios';
import { notify, ToastContainer } from '../../../utils/notificationUtils';
import { getRevenueByProgram } from '../../../api/endpoints/trainer';
import { RevenueData } from '../../../types/trainerTypes';
import Chart from 'chart.js/auto';

const TrainerDashboard: React.FC = () => {
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  const fetchRevenueByProgram = async () => {
    try {
      const response = await getRevenueByProgram();
      console.log(response.data.result);
      setRevenueData(response.data.result);
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        notify(error.response.data.error, "error");
      } else {
        notify("Something went wrong loading notifications.", "error");
      }
    }
  }

  useEffect(() => {
    fetchRevenueByProgram();
  }, []);

  useEffect(() => {
    if (revenueData.length > 0 && canvasRef.current) {
      if (chartRef.current) {
        // If there's an existing chart, destroy it
        chartRef.current.destroy();
      }

      chartRef.current = new Chart(canvasRef.current, {
        type: 'bar',
        data: {
          labels: revenueData.map(item => item.courseName),
          datasets: [
            {
              label: 'Revenue',
              data: revenueData.map(item => item.revenue),
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              type: 'linear',
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [revenueData]);

  return (
    <div className='grid'>
      <h1 className='text-xl font-semibold'>Revenue by Courses</h1>
      <div className='mx-auto mt-4 w-3/4'>
        <canvas ref={canvasRef}></canvas>
      </div>
      <ToastContainer />
    </div>
  )
}

export default TrainerDashboard;
