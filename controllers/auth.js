const User = require("../schema/user_schema");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

exports.signup = async (req, res, next) => {
  try {
    const exists = await User.find({ email: req.body.email });
    if (exists[0]) {
      return res.status(409).json({success:false, message:"Email in use"})
  }
    const pass = await bcrypt.hash(req.body.password, 12);
    const payload = {
      name: req.body.name,
      email: req.body.email,
      password: pass,
    };
    const u = new User(payload);
    await u.save();
    const responsePayload = {
      email: u.email,
      imageUrl: u.imageUrl,
      name: u.name,
      createAt: u.createAt,
      id: u["_id"]
    }
    return res.status(200).json({success:true, data: responsePayload})

  } catch (err) {
    console.log(err);
    return res.status(500).json({success:false, message:"Something went wrong"})
  }
};

exports.signin = async (req, res, next) => {
  try {
    const user = await User.find({ email: req.body.email });
    if (!user[0]) {
      return res.status(400).json({success:false, message:"Invalid login details"})
    }
    const valid = await bcrypt.compare(req.body.password, user[0].password);
    if (!valid) {
      return res.status(400).json({success:false, message:"Invalid login details"})
    }
    const token = jwt.sign(
      { id: user[0]._id, email: user[0].email, name: user[0].name },
      process.env.JWT_KEY,
      { expiresIn: "30d" }
    );
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    const payload =  {
      userId: user[0]._id,
      token: token,
      email: user[0].email,
      name: user[0].name,
      imageUrl: user[0].imageUrl,
    };
    
    return res.status(200).json(payload) 
  } catch (error) {
    console.log(error);
    return res.status(500).json({message:"Invalid Login Parameters"})
  }
};
