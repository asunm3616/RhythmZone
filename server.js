const express = require('express');
const { Pool } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const PORT = 5001;

app.use(cors());
app.use(bodyParser.json());

// Create a PostgreSQL pool
const pool = new Pool({
  user: 'postgres',        // Replace with your PostgreSQL username
  host: 'localhost',
  database: 'fwproject',  // Replace with your database name
  password: 'kirthiga',   // Replace with your password
  port: 5432,
});

// Route to add a song to the admin table
app.post('/Adminpage', async (req, res) => {
  const { title, imageUrl, audioUrl } = req.body;

  const insertSongQuery = `
    INSERT INTO admin (title, imageUrl, audioUrl)
    VALUES ($1, $2, $3) RETURNING *;
  `;

  try {
    const result = await pool.query(insertSongQuery, [title, imageUrl, audioUrl]);
    res.status(201).json({ message: 'Song added successfully', song: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to delete a song from the admin table
app.delete('/admin/songs/:id', async (req, res) => {
  const { id } = req.params;

  const deleteSongQuery = 'DELETE FROM admin WHERE id = $1 RETURNING *;';
  
  try {
    const result = await pool.query(deleteSongQuery, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Song not found' });
    }
    res.json({ message: 'Song deleted successfully', song: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Route to fetch all songs from the admin table
app.get('/admin/songs', async (req, res) => {
  const getAllSongsQuery = 'SELECT * FROM admin;';

  try {
    const result = await pool.query(getAllSongsQuery);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});