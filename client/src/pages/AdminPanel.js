import React from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminCard from '../components/admin/AdminCard';
import { Outlet } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';

const AdminPanel = () => {
	const { users, services, appointments } = useAdmin();

	return (
		<div className="flex flex-col lg:flex-row min-h-screen bg-gray-100">
			<AdminSidebar />
			
			<div className="flex-1 min-w-0">
				<AdminHeader />
				
				<main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
					<div className="mb-8">
						<h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
							Admin Dashboard
						</h1>
						<p className="text-gray-600">Manage your platform's users, services and appointments</p>
					</div>
					
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8">
						<AdminCard title="Total Users" count={users.length} />
						<AdminCard title="Total Services" count={services.length} />
						<AdminCard title="Total Appointments" count={appointments.length} />
					</div>
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default AdminPanel;