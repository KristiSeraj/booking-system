require('dotenv').config();
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register
const register = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: 'User already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        user = await new User({ name, email, password: hashedPassword, role });
        await user.save();
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3h' });
        return res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.log('Error during register', error)
        return res.status(500).json({ errors: [error] });
    }
}

// Login
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3h' });
        return res.status(200).json({ message: 'Login successful', token, user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        console.log('Error during login', error)
        return res.status(500).json({ errors: [error] });
    }
}

// Get authenticated user
const getAuthUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.log('Error during getting authenticated user', error);
        res.status(500).json({ errors: [error] })
    }
}

// Update name of user
const updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user.id,{ name: req.body.name }, { new: true });
        if (!user) {
            return res.status(404).json({ message: 'User not found!' });
        }
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (error) {
        console.log('Error during update authenticated user', error);
        return res.status(500).json({ errors: [error] });
    }
}

module.exports = { register, login, getAuthUser, updateUser };