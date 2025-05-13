const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

// Initialize express
const app = express();
app.use(express.json());
const cors = require('cors');
app.use(cors()); // Enable CORS for all routes
app.use(bodyParser.json());

// Set up PostgreSQL connection pool
const pool = new Pool({
  user: 'postgres',   // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'postgres',  // Replace with your database name
  password: 'MM2931',  // Replace with your PostgreSQL password
  port: 5432,            // Default PostgreSQL port
});

// Route to handle signup form submission
app.post('/Signup', async (req, res) => {
  const { email, userID, password, confirmPassword } = req.body;  // Get the form values from the request body

  // Validate the inputs
  if (!email || !userID || !password || !confirmPassword) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }
  
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  try {
    // Check if the user already exists
    const existingUser = await pool.query('SELECT * FROM signup WHERE email = $1', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    // Insert the form values into the 'Signup1' table
    const result = await pool.query(
      'INSERT INTO signup (email, userID, password, confirmPassword) VALUES ($1, $2, $3, $4) RETURNING *',
      [email, userID, password, confirmPassword]
    );

    await pool.query(
      'INSERT INTO login (userid, password) VALUES ($1, $2)',
      [userID, password]
    );


    // Send the newly created row back to the client
    res.status(201).json({ message: 'User registered successfully!', user: result.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});
//login server
app.post('/Login1', async (req, res) => {
  const { userid, password } = req.body; // Get the form values from the request body

  // Validate the inputs
  if (!userid || !password) {
    return res.status(400).json({ error: 'Please fill all fields' });
  }

  try {
    // Check if the user exists in the 'login' table
    const user = await pool.query('SELECT * FROM login WHERE userid = $1', [userid]);

    if (user.rows.length === 0) {
      return res.status(400).json({ error: 'User not found' });
    }

    // Check if the password matches
    const storedPassword = user.rows[0].password;
    if (password !== storedPassword) {
      return res.status(400).json({ error: 'Incorrect password' });
    }

    // Send success response if login is successful
    res.status(200).json({ message: 'Login successful!', user: user.rows[0] });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

app.post('/Adminlog', async (req, res) => {
    const { userid, password } = req.body; // Get the form values from the request body
  
    // Validate the inputs
    if (!userid || !password) {
      return res.status(400).json({ error: 'Please fill all fields' });
    }
  
    try {
      // Check if the user exists in the 'login' table
      const user = await pool.query('SELECT * FROM adlogin WHERE userid = $1', [userid]);
  
      if (user.rows.length === 0) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      // Check if the password matches
      const storedPassword = user.rows[0].password;
      if (password !== storedPassword) {
        return res.status(400).json({ error: 'Incorrect password' });
      }
  
      // Send success response if login is successful
      res.status(200).json({ message: 'Login successful!', user: user.rows[0] });
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  });
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});