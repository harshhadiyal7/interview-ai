const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
/** 
 * @desc registerUserController 
 * @description Controller to handle user registration
 * @access Public
*/

async function registerUserController(req, res) {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const isUserAlreadyExists = await userModel.findOne({ 
        $or: [
            { email }, { username }
        ]
     });
     if (isUserAlreadyExists) {
        return res.status(400).json({ message: 'User with this email or username already exists' });
     }

     const hash = await bcrypt.hash(password, 10);
     const user = await userModel.create({
        username,
        email,
        password: hash
     });
     
 }

module.exports = {
    registerUserController
}