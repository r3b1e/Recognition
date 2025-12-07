const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
  // return jwt.sign({id: userId}, process.env.JWT_SECRET, {expiresIn: '7d'});
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register a new user
// @route POST /api/auth/register
// @access public

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      age,
      gender,
      weight,
      height,
      activityLevel,
      healthGoal,
      dietaryPreference,
      healthConditions,
      allergies,
      eatingHabits,
      sleepQuality,
      stressLevel,
    } = req.body;

    // Basic required checks (extend as needed)
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "username, email and password are required" });
    }

    // Check if username or email already exists
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    }).lean();

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "Username or email already in use" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user document
    const user = new User({
      username,
      email,
      password: hashedPassword,
      age,
      gender,
      weight,
      height,
      activityLevel,
      healthGoal,
      dietaryPreference,
      healthConditions: healthConditions || [],
      allergies: allergies || [],
      eatingHabits: eatingHabits || [],
      sleepQuality,
      stressLevel,
    });

    await user.save(); // Mongoose validation will run here

    // Do not return password
    const { password: _, ...safeUser } = user.toObject();

    return res.status(201).json({
      message: "User registered successfully",
      user: safeUser,
      token: generateToken(user._id),
    });
  } catch (err) {
    // Handle duplicate key or other DB errors
    if (err.code === 11000) {
      return res
        .status(409)
        .json({ message: "Username or email already in use" });
    }
    console.error("Registration error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// @desc Login an existing user
// @route POST /api/auth/login
// @access public

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: 'Invalid email or password' });
    }

    // Strip password before sending user back
    const { password: _, ...safeUser } = user.toObject();

    return res.json({
      message: 'Login successful',
      user: safeUser,
      token: generateToken(user._id),
      // token: 'generated-jwt-here' // add JWT here if you use it
    });
  } catch (error) {
    console.error('Login error:', error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private (Requires JWT)

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc Update an existing user
// @route PUT /api/auth/profile
// @access Private (Requires JWT)

const updateUserProfile = async (req, res) => {
  try {
    // req.user.id should be set by your auth middleware (e.g. from JWT)
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update allowed fields only
    user.username          = req.body.username          || user.username;
    user.email             = req.body.email             || user.email;
    user.age               = req.body.age               ?? user.age;
    user.gender            = req.body.gender            || user.gender;
    user.weight            = req.body.weight            ?? user.weight;
    user.height            = req.body.height            ?? user.height;
    user.activityLevel     = req.body.activityLevel     || user.activityLevel;
    user.healthGoal        = req.body.healthGoal        || user.healthGoal;
    user.dietaryPreference = req.body.dietaryPreference || user.dietaryPreference;
    user.healthConditions  = req.body.healthConditions  ?? user.healthConditions;
    user.allergies         = req.body.allergies         ?? user.allergies;
    user.eatingHabits      = req.body.eatingHabits      ?? user.eatingHabits;
    user.sleepQuality      = req.body.sleepQuality      || user.sleepQuality;
    user.stressLevel       = req.body.stressLevel       || user.stressLevel;

    // Handle password change if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10); // cost factor
      user.password = await bcrypt.hash(req.body.password, salt); 
    }

    const updatedUser = await user.save();

    const { password, ...safeUser } = updatedUser.toObject();

    return res.json({
      message: 'Profile updated successfully',
      user: safeUser,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return res
      .status(500)
      .json({ message: 'Server error', error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };
