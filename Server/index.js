import 'dotenv/config';
import express from 'express';
import pgPromise from 'pg-promise';
import cors from 'cors';

const app = express();
const pgp = pgPromise();

const db = pgp(process.env.DATABASE_URL);


app.use(cors());

app.get('/api/products', async (req, res) => {
    try {
        const product = await db.any('SELECT * FROM products;');
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});