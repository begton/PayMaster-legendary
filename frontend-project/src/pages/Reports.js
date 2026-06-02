import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';

const Reports = ({ onLogout }) => {
  const [reportType, setReportType] = useState('monthly');
  const [reportDate, setReportDate] = useState(new Date().toISOString().split('T')[0]);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [summaryType, setSummaryType] = useState('all');

  const fetchReport = async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      const formattedDate = reportDate;

      if (reportType === 'daily') {
        response = await axios.get(`http://localhost:5000/api/reports/daily/${formattedDate}`);
      } else if (reportType === 'weekly') {
        response = await axios.get(`http://localhost:5000/api/reports/weekly/${formattedDate}`);
      } else if (reportType === 'monthly') {
        const monthYear = formattedDate.substring(0, 7); // YYYY-MM
        response = await axios.get(`http://localhost:5000/api/reports/monthly/${monthYear}`);
      }

      setReport(response.data);
    } catch (err) {
      setError('Failed to fetch report: ' + (err.response?.data?.error || err.message));
      setReport([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    setLoading(true);
    setError('');
    try {
      let response;
      if (summaryType === 'employees') {
        response = await axios.get('http://localhost:5000/api/reports/employees/summary/all');
      } else if (summaryType === 'departments') {
        response = await axios.get('http://localhost:5000/api/reports/departments/summary/all');
      }
      setReport(response.data);
    } catch (err) {
      setError('Failed to fetch summary');
      setReport([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onLogout={onLogout} />

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Reports</h1>

          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Payroll Reports */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Payroll Reports</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Report Type</label>
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  >
                    <option value="daily">Daily Report</option>
                    <option value="weekly">Weekly Report</option>
                    <option value="monthly">Monthly Report</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {reportType === 'daily' ? 'Select Date' : reportType === 'weekly' ? 'Select Date (Week)' : 'Select Month'}
                  </label>
                  <input
                    type={reportType === 'monthly' ? 'month' : 'date'}
                    value={reportDate}
                    onChange={(e) => setReportDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  />
                </div>

                <button
                  onClick={fetchReport}
                  disabled={loading}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Report'}
                </button>
              </div>
            </div>

            {/* Summary Reports */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-900">Summary Reports</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Summary Type</label>
                  <select
                    value={summaryType}
                    onChange={(e) => setSummaryType(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-red-500"
                  >
                    <option value="all">All</option>
                    <option value="employees">Employees Summary</option>
                    <option value="departments">Departments Summary</option>
                  </select>
                </div>

                <button
                  onClick={fetchSummary}
                  disabled={loading}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Summary'}
                </button>
              </div>
            </div>
          </div>

          {/* Report Display */}
          {report.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 bg-gray-50 border-b">
                <h3 className="text-lg font-semibold text-gray-900">
                  {reportType === 'daily' && 'Daily Payroll Report'}
                  {reportType === 'weekly' && 'Weekly Payroll Report'}
                  {reportType === 'monthly' && 'Monthly Payroll Report'}
                  {summaryType !== 'all' && `${summaryType.charAt(0).toUpperCase() + summaryType.slice(1)} Summary`}
                </h3>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      {Object.keys(report[0] || {}).map(key => (
                        <th key={key} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                          {key.replace(/_/g, ' ')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {report.map((row, idx) => (
                      <tr key={idx} className="hover:bg-gray-50">
                        {Object.values(row).map((value, i) => (
                          <td key={i} className="px-6 py-4 text-sm text-gray-900">
                            {typeof value === 'number' ? parseFloat(value).toLocaleString() : value}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Summary Statistics */}
              {(reportType === 'monthly' || summaryType !== 'all') && (
                <div className="px-6 py-4 bg-gray-50 border-t">
                  <h4 className="font-semibold text-gray-900 mb-3">Summary Statistics</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {report[0] && (
                      <>
                        {report[0].total_gross_salary && (
                          <div className="bg-blue-50 p-3 rounded">
                            <p className="text-gray-600 text-sm">Total Gross Salary</p>
                            <p className="text-lg font-bold text-blue-600">
                              {parseFloat(report[0].total_gross_salary || 0).toLocaleString()}
                            </p>
                          </div>
                        )}
                        {report[0].total_deductions && (
                          <div className="bg-yellow-50 p-3 rounded">
                            <p className="text-gray-600 text-sm">Total Deductions</p>
                            <p className="text-lg font-bold text-yellow-600">
                              {parseFloat(report[0].total_deductions || 0).toLocaleString()}
                            </p>
                          </div>
                        )}
                        {report[0].total_net_salary && (
                          <div className="bg-green-50 p-3 rounded">
                            <p className="text-gray-600 text-sm">Total Net Salary</p>
                            <p className="text-lg font-bold text-green-600">
                              {parseFloat(report[0].total_net_salary || 0).toLocaleString()}
                            </p>
                          </div>
                        )}
                        {report[0].total_employees && (
                          <div className="bg-purple-50 p-3 rounded">
                            <p className="text-gray-600 text-sm">Total Employees</p>
                            <p className="text-lg font-bold text-purple-600">
                              {report[0].total_employees}
                            </p>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="px-6 py-4 bg-gray-50 border-t flex gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Print Report
                </button>
                <button
                  onClick={() => {
                    const csv = [
                      Object.keys(report[0] || {}).join(','),
                      ...report.map(row => Object.values(row).join(','))
                    ].join('\n');
                    const blob = new Blob([csv], { type: 'text/csv' });
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `report-${new Date().toISOString()}.csv`;
                    a.click();
                  }}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Export as CSV
                </button>
              </div>
            </div>
          )}

          {!loading && report.length === 0 && (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Generate a report to see results
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reports;
