const express = require('express');
const { login, register,updateuser,deleteuser, getallusers } = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);


router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

router.get('/users',authMiddleware,getallusers)
router.post('/users/:id/role',authMiddleware,updateuser);
router.delete('/users/:id',authMiddleware,deleteuser);

module.exports = router;