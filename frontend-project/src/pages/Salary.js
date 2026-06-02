import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Salary = ({ onLogout }) => {
  const [salaries, setSalaries] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    employee_id: '',
    gross_salary: '',
    total_deduction: '',
    net_salary: '',
    payment_month: '',
  });

  useEffect(() => {
    fetchSalaries();
    fetchEmployees();
  }, []);

  const fetchSalaries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/salary');
      setSalaries(response.data);
    } catch (err) {
      setError('Failed to fetch salary records');
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (err) {
      setError('Failed to fetch employees');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      // Auto-calculate net salary
      ...(name === 'gross_salary' || name === 'total_deduction' ? {
        net_salary: (name === 'gross_salary' ? parseFloat(value) : parseFloat(formData.gross_salary)) - 
                    (name === 'total_deduction' ? parseFloat(value) : parseFloat(formData.total_deduction))
      } : {})
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (editingId) {
        await axios.put(`http://localhost:5000/api/salary/${editingId}`, formData);
        setSuccess('Salary record updated successfully!');
        setEditingId(null);
      } else {
        await axios.post('http://localhost:5000/api/salary', formData);
        setSuccess('Salary record added successfully!');
      }

      setFormData({
        employee_id: '',
        gross_salary: '',
        total_deduction: '',
        net_salary: '',
        payment_month: '',
      });
      setShowForm(false);
      fetchSalaries();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to save salary record');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (salary) => {
    setEditingId(salary.salary_id);
    setFormData({
      employee_id: salary.employee_id,
      gross_salary: salary.gross_salary,
      total_deduction: salary.total_deduction,
      net_salary: salary.net_salary,
      payment_month: salary.payment_month,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this salary record?')) {
      try {
        await axios.delete(`http://localhost:5000/api/salary/${id}`);
        setSuccess('Salary record deleted successfully!');
        fetchSalaries();
      } catch (err) {
        setError('Failed to delete salary record');
      }
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      employee_id: '',
      gross_salary: '',
      total_deduction: '',
      net_salary: '',
      payment_month: '',
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={onLogout} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Salary Management</h1>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
            >
              {showForm ? 'Cancel' : 'Add Salary Record'}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-4 bg-green-100 text-green-700 rounded">
              {success}
            </div>
          )}

          {showForm && (
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">{editingId ? 'Update' : 'Add'} Salary Record</h2>
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Employee</label>
                  <select
                    name="employee_id"
                    value={formData.employee_id}
                    onChange={handleChange}
                    required
                    disabled={editingId}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500 disabled:bg-gray-100"
                  >
                    <option value="">Select Employee</option>
                    {employees.map(emp => (
                      <option key={emp.employee_id} value={emp.employee_id}>
                        {emp.employee_number} - {emp.first_name} {emp.last_name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Payment Month</label>
                  <input
                    type="date"
                    name="payment_month"
                    value={formData.payment_month}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Gross Salary</label>
                  <input
                    type="number"
                    name="gross_salary"
                    value={formData.gross_salary}
                    onChange={handleChange}
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Total Deduction</label>
                  <input
                    type="number"
                    name="total_deduction"
                    value={formData.total_deduction}
                    onChange={handleChange}
                    step="0.01"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2">Net Salary (Auto-calculated)</label>
                  <input
                    type="number"
                    name="net_salary"
                    value={formData.net_salary}
                    onChange={handleChange}
                    step="0.01"
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                  />
                </div>

                <div className="md:col-span-2 flex gap-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    {loading ? 'Processing...' : editingId ? 'Update Record' : 'Add Record'}
                  </button>
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="flex-1 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Employee</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Month</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Gross Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Deduction</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Net Salary</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {salaries.map(salary => (
                    <tr key={salary.salary_id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {salary.first_name} {salary.last_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(salary.payment_month).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{parseFloat(salary.gross_salary).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{parseFloat(salary.total_deduction).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{parseFloat(salary.net_salary).toLocaleString()}</td>
                      <td className="px-6 py-4 text-sm space-x-2">
                        <button
                          onClick={() => handleEdit(salary)}
                          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(salary.salary_id)}
                          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-xs"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {salaries.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No salary records found. Add your first salary record!
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Salary;
