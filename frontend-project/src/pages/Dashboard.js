import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = ({ onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={onLogout} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Welcome to PayMaster
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="text-blue-600 text-3xl mb-2">👥</div>
              <h3 className="text-lg font-semibold text-gray-900">Employees</h3>
              <p className="text-gray-600 text-sm mt-2">Manage employee information and records</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="text-green-600 text-3xl mb-2">🏢</div>
              <h3 className="text-lg font-semibold text-gray-900">Departments</h3>
              <p className="text-gray-600 text-sm mt-2">Create and organize departments</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="text-purple-600 text-3xl mb-2">💰</div>
              <h3 className="text-lg font-semibold text-gray-900">Salary</h3>
              <p className="text-gray-600 text-sm mt-2">Process and manage employee salaries</p>
            </div>

            <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
              <div className="text-red-600 text-3xl mb-2">📊</div>
              <h3 className="text-lg font-semibold text-gray-900">Reports</h3>
              <p className="text-gray-600 text-sm mt-2">Generate daily, weekly, and monthly reports</p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">System Information</h2>
            <div className="space-y-3">
              <p className="text-gray-700"><span className="font-semibold">System Name:</span> Employee Payroll Management System (EPMS)</p>
              <p className="text-gray-700"><span className="font-semibold">Organization:</span> PayMaster Ltd</p>
              <p className="text-gray-700"><span className="font-semibold">Location:</span> Rubavu District, Western Province, Rwanda</p>
              <p className="text-gray-700"><span className="font-semibold">Purpose:</span> To efficiently manage employee information, departments, payroll processing, and generate payroll reports</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
