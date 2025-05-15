require('dotenv').config();

const express = require('express');
const prisma = require('./prismaClient');
const cors = require('cors');

const userRoutes = require ('./src/routes/userRoutes.js');
const parcelRoutes = require('./src/routes/parcelRoutes.js');
const orderRoutes = require('./src/routes/orderRoutes.js');
const paymentRoutes = require('./src/routes/paymentRoutes.js');
const reviewRoutes = require('./src/routes/reviewRoutes.js');

// initialise the app 
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); //middleware to parse Json requests
app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
);// Middleware to allow cross-origin requests

// Check if .env variables are loaded
console.log('JWT_SECRET:', process.env.JWT_SECRET); 

app.get('/', async (req, res) => {
    try {
        // Test if Prisma can fetch something from the database, for example, the User model
        const users = await prisma.user.findMany();
        console.log('Connected to the database and fetched users:', users);
        res.send('Hello Carry Bee!');
    } catch (error) {
        console.error('Error with Prisma:', error);
        res.status(500).send('Error with database connection');
    }
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/parcels', parcelRoutes); 
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong'});
});

//Server running
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));