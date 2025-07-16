const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../database/db');

exports.register = async (req , res)=>{
     const {username, password} = req.body;
    try{
      const ex = await db.query('SELECT * FROM data where username = ?',[username]);

      if(ex.length  >0)
      {
        return res.status(401).json({message:"Register With A different Name"})
      }

      const hashedPassword = await bcrypt.hash(password,10);
      await db.query('INSERT INTO data VALUES(?,?)',[username,hashedPassword]);

      return res.status(200).json({message:"User Registered Successfully"});


    }catch(err)
    {
        return res.status(500).json({message:"Server Error"})
    }

} 

exports.login = async (req,res)=>{
    const {username,password} = req.body;
    try {
        const [users] = await db.query('SELECT * FROM data WHERE username = ?',[username]);
        
        if(users.length === 0)
        {
          return res.status(401).json({message:'Invalid Credentials'})
        }

        const user = users[0];

        const match = await bcrypt.compare(password,user.password);

        if(!match)
        {
          return res.status(401).json({message:'Invalid Credentials'})
        }

        const token = jwt.sign({userid:user.id,username:user.username},process.env.JWT_SECERT,{expiresIn:'1h'})

        res.json({
          token,
          user:{
            user:user.id,
            username:user.username
          }
        })
    } catch (error) {
      return res.status(500).json({message:"Server Error"})   
    }
}