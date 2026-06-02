const express = require('express');
const router = express.Router();

// Get all employees
router.get('/', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [employees] = await connection.query(
      'SELECT * FROM employees ORDER BY employee_number DESC'
    );

    await connection.release();
    res.json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get single employee
router.get('/:id', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [employee] = await connection.query(
      'SELECT * FROM employees WHERE employee_id = ?',
      [req.params.id]
    );

    await connection.release();
    
    if (employee.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    res.json(employee[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Create new employee (INSERT only)
router.post('/', async (req, res) => {
  try {
    const {
      employee_number,
      first_name,
      last_name,
      address,
      position,
      telephone,
      gender,
      hired_date,
      department_id
    } = req.body;

    // Validation
    if (!employee_number || !first_name || !last_name || !position || !telephone || !gender || !hired_date || !department_id) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();

    // Check if employee_number already exists
    const [existing] = await connection.query(
      'SELECT * FROM employees WHERE employee_number = ?',
      [employee_number]
    );

    if (existing.length > 0) {
      await connection.release();
      return res.status(400).json({ error: 'Employee number already exists' });
    }

    // Insert employee
    await connection.query(
      'INSERT INTO employees (employee_number, first_name, last_name, address, position, telephone, gender, hired_date, department_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [employee_number, first_name, last_name, address, position, telephone, gender, hired_date, department_id]
    );

    await connection.release();
    res.status(201).json({ message: 'Employee added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
