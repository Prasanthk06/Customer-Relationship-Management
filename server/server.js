const express = require('express');
require('dotenv').config();
const mysql  = require('mysql2');
const cors = require('cors');
const db = require('./database/db')


const app = express();
app.use(express.json())
app.use(cors());
app.get('/',(req,res)=>{
    res.send('Hello world')
})
const data = async () =>{
    try{
         const connection = await db.getConnection();
         console.log('Connected to database');
         connection.release();
    }catch(err){
        console.log('Server Error')
    }
}

data();
app.listen(3000);

