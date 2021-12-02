const express = require('express');
const router = express.Router();

const { body, validationResult } = require('express-validator');

const User = require('../models/User');

// router.get('/',(req,res)=>{
//     console.log(req.body);
//     const user = User(req.body);
//     user.save();
//     res.send(req.body);
// })

router.post('/',[
    body('email','Enter a valid Email').isEmail(),
    body('name','Enter a valid name').isLength({ min: 3 }),
    body('password','Password must be atleast 5 characters').isLength({ min: 5 })

],async (req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let user = User.findOne({ email: req.body.email})
    if(user){
      res.status(400).json({ error : "User with same mail address already exists" });
    }
    user = await User.create({
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
    }).then(user => res.json(user));
})

module.exports=router