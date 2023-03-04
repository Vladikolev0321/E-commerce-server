const bcrypt = require('bcryptjs')
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    console.log(req.body);
    try {
        const { name, email, password, conf_password } = req.body;

        const errorMsg = validateUserData(name, email, password, conf_password);
        if (errorMsg) {
            return res.status(400).json({ message: errorMsg });
        }

        // check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'User already exists' });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const newUser = new User({ name, email, password: passwordHash });

        await newUser.save();

        const token = jwt.sign({ _id: newUser._id.toString() }, process.env.JWT_SECRET)
        console.log(newUser);
        res.status(200).json({ message: 'User registered successfully', token: token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }

    // const user = await User.create({
    //     name,
    //     email,
    //     password,
    // });
    // res.status(201).json({user, message: 'User created successfully'});
};

const login = async (req, res) => {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }


    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
    res.status(200).json({ user, token, message: 'User logged in successfully' });


    // const user = await User.findByCredentials(email, password);
    // const token = await user.generateAuthToken();
    // res.status(200).json({ user, token, message: 'User logged in successfully' });
};

const getData = async (req, res) => {
    res.json({
        message: 'Protected Data'
    });

};

const validateUserData = (name, email, password, conf_password) => {
    let errorMsg;
    if (!name || !email || !password || !conf_password) {
        errorMsg = 'Please fill in all fields';
    }

    if (password !== conf_password) {
        errorMsg = 'Passwords do not match';
    }

    if (password.length < 8) {
        errorMsg = 'Password must be at least 8 characters';
    }

    return errorMsg;
};


module.exports = {
    register,
    login,
    getData
};