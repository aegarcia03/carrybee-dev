const express = require('express');
const { PrismaClient } = require ('@prisma/client');
const bcrypt = require('bcrypt');
const userRoutes = require ('./src/routes/userRoutes.js')
const parcelRoutes = require('./src/routes/parcelRoutes.js');
const cors = require('cors');


const prisma = new PrismaClient();
// initialise the app 
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
//middleware
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello Carry Bee!');
});

// Routes
app.use('/api', userRoutes);
app.use('/api', parcelRoutes); 

//Server running

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));