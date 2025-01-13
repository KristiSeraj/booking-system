import React from 'react';
import AdminHeader from '../components/AdminHeader';
import AdminSidebar from '../components/AdminSidebar';
import AdminCard from '../components/AdminCard';
import { Outlet } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminPanel = () => {
	const { users } = useAdmin();

  return (
    <div className="flex min-h-screen bg-gray-100">
		<AdminSidebar />
		
		<div className="flex-1">
			<AdminHeader />
			
			<main className="p-6">
				<h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
				
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
					<AdminCard title="Total Users" count={users.length} />
					<AdminCard title="Total Services" count="120" />
					<AdminCard title="Total Appointments" count="540" />
                </div>

				{/* <div className="mt-12 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
				</div> */}
				<Outlet />
			</main>
		</div>
    </div>
  );
}

export default AdminPanel;