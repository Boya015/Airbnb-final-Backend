const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const User = require('./models/User'); 
const accommodationRoutes = require('./routes/accommodationRoutes');
const reservationRoutes = require('./routes/reservationRoutes'); // Import the routes
const bcrypt = require('bcrypt');
dotenv.config();

const app = express();
app.use(cors()); 
app.use(express.json()); 

app.post('/api/auth/register', async (req, res) => {
  const { username, password, email } = req.body;

    // Check if all fields are provided
    if (!username || !password || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists (email should be unique)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the password is correct
    await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token or continue with your login flow
    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});



mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 20000,
})
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log(error));

// Use the accommodation routes
app.use('/api/accommodations', accommodationRoutes);
app.use('/api/reservations', reservationRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
