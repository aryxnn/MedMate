import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the user
    user = new User({
      name,  // Store name here
      email,
      password: hashedPassword,
    });
    await user.save();

    // Create a JWT token with name
    const token = jwt.sign(
      { id: user._id, name: user.name },  // Include name in token
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// login.js (Backend Controller)
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if the password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create a JWT token with name in the payload
    const token = jwt.sign(
      { id: user._id, name: user.name },  // Add the name in the payload
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login Successful',
      token,
      name: user.name
    });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
