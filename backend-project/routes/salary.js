const express = require('express');
const router = express.Router();

// Get all salary records
router.get('/', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [salaries] = await connection.query(
      `SELECT s.*, e.first_name, e.last_name, e.employee_number 
       FROM salary s 
       JOIN employees e ON s.employee_id = e.employee_id 
       ORDER BY s.salary_id DESC`
    );

    await connection.release();
    res.json(salaries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get single salary record
router.get('/:id', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [salary] = await connection.query(
      `SELECT s.*, e.first_name, e.last_name, e.employee_number 
       FROM salary s 
       JOIN employees e ON s.employee_id = e.employee_id 
       WHERE s.salary_id = ?`,
      [req.params.id]
    );

    await connection.release();
    
    if (salary.length === 0) {
      return res.status(404).json({ error: 'Salary record not found' });
    }
    
    res.json(salary[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Create salary record (INSERT)
router.post('/', async (req, res) => {
  try {
    const {
      employee_id,
      gross_salary,
      total_deduction,
      net_salary,
      payment_month
    } = req.body;

    if (!employee_id || !gross_salary || !total_deduction || !net_salary || !payment_month) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();

    // Insert salary record
    await connection.query(
      'INSERT INTO salary (employee_id, gross_salary, total_deduction, net_salary, payment_month) VALUES (?, ?, ?, ?, ?)',
      [employee_id, gross_salary, total_deduction, net_salary, payment_month]
    );

    await connection.release();
    res.status(201).json({ message: 'Salary record added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update salary record (UPDATE)
router.put('/:id', async (req, res) => {
  try {
    const {
      gross_salary,
      total_deduction,
      net_salary,
      payment_month
    } = req.body;

    if (!gross_salary || !total_deduction || !net_salary || !payment_month) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'UPDATE salary SET gross_salary = ?, total_deduction = ?, net_salary = ?, payment_month = ? WHERE salary_id = ?',
      [gross_salary, total_deduction, net_salary, payment_month, req.params.id]
    );

    await connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Salary record not found' });
    }

    res.json({ message: 'Salary record updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Delete salary record (DELETE)
router.delete('/:id', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'DELETE FROM salary WHERE salary_id = ?',
      [req.params.id]
    );

    await connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Salary record not found' });
    }

    res.json({ message: 'Salary record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
