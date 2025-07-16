const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User')

exports.login = async (req, res) => {
  try {
    console.log('Login attempt:', req.body);
    const { username, password , role } = req.body;
    
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Uszername and password are required' });
    }
    
    
    console.log('Checking if user exists:', username);
    const user = await User.findOne({username}); 
    console.log('User found:', user ? 'Yes' : 'No');
        
    if (!user) { 
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  
    
    console.log('Verifying password');
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username , role:user.role },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn:'2h' }
    ); 
    
    res.json({ 
      token, 
      user: { 
        id: user._id, 
        username: user.username,
        role : user.role
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Registration function
exports.register = async (req, res) => {
  try {
    const { username, password , role } = req.body;
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const existingUsers = await User.findOne({username});
    
    if (existingUsers) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Insert user into database
    await User.create({username,password:hashedPassword,role});
    
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



exports.getallusers = async (req,res) => {
  try{
    if(req.user.role !== "Admin"){
     return res.status(403).json({message:"Acess Denied"}); 
    }
    const users = await User.find({},{password:0});
    res.json(users)
  }catch(err)
  {
    console.log("Error Fetching Error");
    res.status(500).json({message:"Error Fetching Data"})
  }
} 

exports.updateuser = async (req,res) =>{
  try{
    if(req.user.role !== "Admin"){
      return res.status(403).json({message:"Acess Denied"}); 
     }
     
     const {id} = req.params;
     const {role} = req.body;
    
     const up = await User.findByIdAndUpdate(
      id,
      {role},
      {new:true,select:'-password'}
     );

     if(!up)
     {
      return res.status(400).json({message:"User Not found"})
     }
     res.json(up);
  }catch(err)
  {
     console.log("ERROR Updating Data",err);
     res.status(404).json({message:"Error Updating Data"})
  }
}

exports.deleteuser = async (req,res) =>
  {
    try{
      if(req.user.role !== "Admin"){
        return res.status(403).json({message:"Acess Denied"}); 
       }

       const {id} = req.params;
       
     
      
       const deletedUser = await User.findByIdAndDelete(id);
       if(!deletedUser)
       {
        return res.status(400).json({message:"User Not found"})
       }
       res.json({message:"Deleted Successfully"});
    }catch(err)
    {
       console.log("ERROR Deleting Data",err);
       res.status(404).json({message:"Error Deleting  Data"})
    }
  }