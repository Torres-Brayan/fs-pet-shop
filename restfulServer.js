// connect to modules
const express = require('express');
const app = express();
const { Pool } = require('pg');
const PORT = 8000;

// middleware
app.use(express.json());

// connect server to DB
const pool = new Pool ({
    user: 'brayantorres',
    host: 'localhost',
    database: 'petshop',
    password: '',
    port: 5432,
});

// get all
app.get('/pets', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM petlist');
        res.status(200).json(result.rows);
    } catch {
        res.status(500).send('ERROR FETCHING PET FROM DATABASE');
    }
});

// get 1
app.get('/pets/:id', async (req, res) => {
    const { id } = req.params;
    try{
        const result = await pool.query('SELECT * FROM petlist WHERE id = $1', [id]);
        if (!result.rows[0]) {
            return res.status(400).send('NO PET AT GIVEN ID');
        } else {
            res.status(200).json(result.rows);
        }
    } catch {
        res.status(500).send('ERROR FETCHING PET FROM DATABASE');
    }
});

// post 1
app.post('/pets', async (req, res) => {
    const { age, kind , name } = req.body;
    if (!age || !kind || !name || !Number.isInteger(parseInt(age))) {
        return res.status(400).send('Please Check Request Body for following age must be an integer,kind is not missing,name is not missing')
    }
    try {
        const result = await pool.query('INSERT INTO petlist (age, kind, name) VALUES ($1, $2, $3) RETURNING *', [age, kind, name]);
        res.status(200).json(result.rows[0]);
    } catch {
        res.status(500).send('ERROR FETCHING PET FROM DATABASE');
    }
});

// update 1
app.put('/pets/:id', async (req, res) => {
    const { id } = req.params;
    const { age, kind , name } = req.body;
    if (!age || !kind || !name || !Number.isInteger(parseInt(age))) {
        return res.status(400).send('Please Check Request Body for following age must be an integer,kind is not missing,name is not missing')
    }
    try {
        const result = await pool.query("UPDATE petlist SET age = $1, kind = $2, name = $3 WHERE id = $4 RETURNING *", [age, kind, name, id]);
        if (!result.rows[0]) {
            return res.status(400).send('NO PET AT GIVEN ID');
        } else {
            res.status(200).json(result.rows[0]);
        }
    } catch {
        res.status(500).send('ERROR FETCHING PET FROM DATABASE');
    }
});

// delete 1
app.delete('/pets/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM petlist WHERE id = $1 RETURNING *', [id]);
        if (!result.rows[0]) {
            return res.status(400).send('NO PET AT GIVEN ID');
        } else {
            res.status(200).json(result.rows);
        }
    } catch {
        res.status(500).send('ERROR FETCHING PET FROM DATABASE');
    }
});

// connect to port
app.listen(PORT, ()=> {
    console.log(`STRUCK GOLD ON PORT: ${PORT}`);
});