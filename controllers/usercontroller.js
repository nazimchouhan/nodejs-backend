const bcrypt = require('bcryptjs');
const express = require('express');
const jwt = require('jsonwebtoken');
const asynchandler = require('express-async-handler');  
const User = require('../model/userModel');
const e = require('express');

//@desc Register a new user
//@route POST /api/users/register
//@access Public
const registeruser = asynchandler(async (req, res) => {
    const {username,email,password } = req.body;
    if (!email || !username || !password) {
        return res.status(400).json({ message: 'Please fill all the fields' });
    }
    const userExists = await User.findOne({ email });
    if(userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user=await User.create
    ({
        username,
        email,
        password: hashedPassword
    }); 
    
    if(user){
        res.status(201).json({ message: "User registered successfully" });
    }
    else{
        res.status(400).json({ message: "User registration failed" });
    }
    
});
    
//@desc login user
//@route POST /api/users/login
//@access Public
const loginuser = asynchandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password,user.password))) {
        const access_token=jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user._id
                }   
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '30d' } // Token expires in 30 days
        )
        return res.status(200).json({ message: 'User logged in successfully', access_token });
    }
    else{
        return res.status(401).json({ message: 'User Not Exist' });
    }
});

//@desc current user
//@route GET /api/users/current
//@access Private
const currentuser = asynchandler(async (req, res) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    res.status(200).json({ user: req.user });
});

module.exports = {
    registeruser,
    loginuser,
    currentuser
};  