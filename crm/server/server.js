const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');

const contactRoute = require('./routes/contactRoutes')
require('./config/database');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(express.json());
app.use(cors({origin:true, credentials:true}));


app.get('/', (req, res) => {
    res.send('Hello world');
});


app.use('/api/auth', authRoutes);
app.use('/api/contacts',contactRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});