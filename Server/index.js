import 'dotenv/config';
import express from 'express';
import pgPromise from 'pg-promise';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

/*DB declaration*/
const pgp = pgPromise();
const db = pgp(process.env.DATABASE_URL);


/*Sending DB data to Front-end*/
app.get('/api/products', async (req, res) => {
    try {
        const product = await db.any('SELECT * FROM products;');
        res.json(product);
    } catch (error) {
        console.error('Error fetching product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

/*Order logic*/
app.post('/api/orders', async (req, res) => {
    try{
        const { items, total, date } = req.body;
        console.log("New order", { items, total, date })
        /*There would be logged users id*/
        const userID = 1;
        await db.tx(async t =>{
            /*Recording order in DB*/
            const order = await t.one(
                'INSERT INTO "order" (user_id, status, total) VALUES($1, $2, $3) RETURNING id',
                [userID, 'pending', total, total]
            );
            /*Recording Items in each order*/
            const queries = items.map(item => {
                return t.none(
                    'INSERT INTO order_items (order_id, item_id, quantity, price) VALUES ($1, $2, $3, $4)',
                    [order.id, item.id, item.quantity, item.price]
                );
            });
            return t.batch(queries);
        });
        res.status(200).json({ msg: "Order recieved"})
        
    } catch(er) {
        console.error("Server error", er)
        res.status(500).json({ msg: "Server error!"})
    }
})


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});