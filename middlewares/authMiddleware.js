const jwt = require('jsonwebtoken');
const userModel = require('../models/userModels');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
      return res.status(401).send({
        success: false,
        message: 'Auth token is required'
      });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);
    
    if (!user) {
      return res.status(401).send({
        success: false,
        message: 'Invalid token'
      });
    }
    
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).send({
      success: false,
      message: 'Auth failed',
      error
    });
  }
};

module.exports = authMiddleware; 