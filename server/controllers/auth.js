import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    console.log('Received registration request:', req.body);
    const salt = await bcrypt.genSalt();
    console.log('Salt:', salt);
    console.log('Password:', password);
    const passwordHash = await bcrypt.hash(password, salt).catch((err) => {
      console.error(err);
    });

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: Math.floor(Math.random() * 10000), // Corrected Math.random()
      impressions: Math.floor(Math.random() * 10000), // Corrected Math.random()
    });

    console.log('Attempting to save user:', newUser); // Add this line to log the user object before saving

    const savedUser = await newUser.save();

    console.log('User saved successfully:', savedUser); // Add this line to log the saved user object

    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// LOGING IN

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ msg: 'User does not exist.' });

    const isMatch = await bcrypt.compare(password, user.password); // Compare with user's hashed password

    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    console.log('User logged in:', user); // Added this line
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};
