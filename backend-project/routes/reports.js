const express = require('express');
const router = express.Router();

// Daily report
router.get('/daily/:date', async (req, res) => {
  try {
    const { date } = req.params; // format: YYYY-MM-DD
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [report] = await connection.query(
      `SELECT 
        s.payment_month,
        COUNT(DISTINCT s.employee_id) as total_employees,
        SUM(s.gross_salary) as total_gross_salary,
        SUM(s.total_deduction) as total_deductions,
        SUM(s.net_salary) as total_net_salary,
        e.first_name,
        e.last_name,
        e.employee_number,
        s.gross_salary,
        s.total_deduction,
        s.net_salary
       FROM salary s 
       JOIN employees e ON s.employee_id = e.employee_id 
       WHERE DATE(s.payment_month) = ?
       GROUP BY s.payment_month, e.first_name, e.last_name, e.employee_number, s.gross_salary, s.total_deduction, s.net_salary`,
      [date]
    );

    await connection.release();
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Weekly report
router.get('/weekly/:date', async (req, res) => {
  try {
    const { date } = req.params; // format: YYYY-MM-DD
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [report] = await connection.query(
      `SELECT 
        YEARWEEK(s.payment_month) as week_number,
        COUNT(DISTINCT s.employee_id) as total_employees,
        SUM(s.gross_salary) as total_gross_salary,
        SUM(s.total_deduction) as total_deductions,
        SUM(s.net_salary) as total_net_salary
       FROM salary s 
       WHERE YEARWEEK(s.payment_month) = YEARWEEK(?)
       GROUP BY YEARWEEK(s.payment_month)`,
      [date]
    );

    await connection.release();
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Monthly report
router.get('/monthly/:month', async (req, res) => {
  try {
    const { month } = req.params; // format: YYYY-MM
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [report] = await connection.query(
      `SELECT 
        YEAR(s.payment_month) as year,
        MONTH(s.payment_month) as month,
        COUNT(DISTINCT s.employee_id) as total_employees,
        SUM(s.gross_salary) as total_gross_salary,
        SUM(s.total_deduction) as total_deductions,
        SUM(s.net_salary) as total_net_salary,
        d.department_name,
        COUNT(CASE WHEN e.gender = 'Male' THEN 1 END) as male_count,
        COUNT(CASE WHEN e.gender = 'Female' THEN 1 END) as female_count
       FROM salary s 
       JOIN employees e ON s.employee_id = e.employee_id 
       JOIN departments d ON e.department_id = d.department_id
       WHERE DATE_FORMAT(s.payment_month, '%Y-%m') = ?
       GROUP BY YEAR(s.payment_month), MONTH(s.payment_month), d.department_name`,
      [month]
    );

    await connection.release();
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all employees summary
router.get('/employees/summary/all', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [report] = await connection.query(
      `SELECT 
        COUNT(*) as total_employees,
        COUNT(CASE WHEN gender = 'Male' THEN 1 END) as male_count,
        COUNT(CASE WHEN gender = 'Female' THEN 1 END) as female_count,
        d.department_name,
        COUNT(DISTINCT e.department_id) as departments
       FROM employees e
       LEFT JOIN departments d ON e.department_id = d.department_id
       GROUP BY d.department_name`
    );

    await connection.release();
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get departments summary
router.get('/departments/summary/all', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [report] = await connection.query(
      `SELECT 
        d.department_id,
        d.department_code,
        d.department_name,
        COUNT(e.employee_id) as total_employees,
        COUNT(CASE WHEN e.gender = 'Male' THEN 1 END) as male_employees,
        COUNT(CASE WHEN e.gender = 'Female' THEN 1 END) as female_employees
       FROM departments d
       LEFT JOIN employees e ON d.department_id = e.department_id
       GROUP BY d.department_id, d.department_code, d.department_name`
    );

    await connection.release();
    res.json(report);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
