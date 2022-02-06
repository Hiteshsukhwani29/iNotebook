const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const User = require('../models/User');

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const JWT_SECRET = 'abc$d';

var fetchuser = require('../middleware/fetchuser');

// router.get('/',(req,res)=>{
//     console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// })


router.post('/createuser', [
  body('email', 'Enter a valid Email').isEmail(),
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 })
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = await User.findOne({ email: req.body.email })
  if (user) {
    res.status(400).json({ error: "User with same mail address already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const secPass = await bcrypt.hash(req.body.password, salt)

  user = await User.create({
    name: req.body.name,
    password: secPass,
    email: req.body.email
  });
  const data = {
    user: {
      id: user.id
    }
  }
  const authtoken = jwt.sign(data, JWT_SECRET);

  res.json({ authtoken })
})



router.post('/login', async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: "Invalid Credentials" });
    }

    const comp = await bcrypt.compare(password, user.password);
    if (!comp) {
      return res.status(400).json({ errors: "Invalid Pass" });
    }

    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({ authtoken })


  } catch (error) {

  }

})


router.post('/getuser', fetchuser, async (req,res) => {

  
  try{
    userId = req.user.id;
    const user = await User.findById(userId).select('-password');
    res.send(user);
  }
  catch(error){
    return res.status(500).json({ errors: "Internal Error, Try Again" });
  }

})



module.exports = router