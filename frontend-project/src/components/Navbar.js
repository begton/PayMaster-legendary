import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold">
              PayMaster
            </Link>
            <div className="hidden md:flex space-x-4 ml-10">
              <Link to="/employees" className="hover:bg-blue-700 px-3 py-2 rounded">
                Employees
              </Link>
              <Link to="/departments" className="hover:bg-blue-700 px-3 py-2 rounded">
                Departments
              </Link>
              <Link to="/salary" className="hover:bg-blue-700 px-3 py-2 rounded">
                Salary
              </Link>
              <Link to="/reports" className="hover:bg-blue-700 px-3 py-2 rounded">
                Reports
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm">Welcome, {user.username}</span>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden pb-4 space-y-2">
          <Link to="/employees" className="block hover:bg-blue-700 px-3 py-2 rounded">
            Employees
          </Link>
          <Link to="/departments" className="block hover:bg-blue-700 px-3 py-2 rounded">
            Departments
          </Link>
          <Link to="/salary" className="block hover:bg-blue-700 px-3 py-2 rounded">
            Salary
          </Link>
          <Link to="/reports" className="block hover:bg-blue-700 px-3 py-2 rounded">
            Reports
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
