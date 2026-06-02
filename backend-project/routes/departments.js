const express = require('express');
const router = express.Router();

// Get all departments
router.get('/', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [departments] = await connection.query(
      'SELECT * FROM departments ORDER BY department_id DESC'
    );

    await connection.release();
    res.json(departments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get single department
router.get('/:id', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();
    
    const [department] = await connection.query(
      'SELECT * FROM departments WHERE department_id = ?',
      [req.params.id]
    );

    await connection.release();
    
    if (department.length === 0) {
      return res.status(404).json({ error: 'Department not found' });
    }
    
    res.json(department[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Create new department (INSERT only)
router.post('/', async (req, res) => {
  try {
    const { department_code, department_name } = req.body;

    if (!department_code || !department_name) {
      return res.status(400).json({ error: 'Department code and name are required' });
    }

    const pool = req.app.locals.pool;
    const connection = await pool.getConnection();

    // Check if department_code already exists
    const [existing] = await connection.query(
      'SELECT * FROM departments WHERE department_code = ?',
      [department_code]
    );

    if (existing.length > 0) {
      await connection.release();
      return res.status(400).json({ error: 'Department code already exists' });
    }

    // Insert department
    await connection.query(
      'INSERT INTO departments (department_code, department_name) VALUES (?, ?)',
      [department_code, department_name]
    );

    await connection.release();
    res.status(201).json({ message: 'Department added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
