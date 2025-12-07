const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6, // don't accept weak garbage passwords
    },

    age: {
      type: Number,
      min: 1,
      max: 120,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },

    weight: {
      type: Number, // in kg
      min: 1,
      max: 500,
    },

    height: {
      type: Number, // in cm
      min: 30,
      max: 300,
    },

    activityLevel: {
      type: String,
      enum: ["sedentary", "light", "moderate", "active", "very_active"],
    },

    healthGoal: {
      type: String,
      enum: [
        "weight_loss",
        "weight_gain",
        "muscle_gain",
        "maintain",
        "general_health",
      ],
    },

    dietaryPreference: {
      type: String,
      enum: [
        "omnivore",
        "vegetarian",
        "vegan",
        "pescatarian",
        "keto",
        "mediterranean",
        "other",
      ],
    },

    healthConditions: {
      type: [String], // e.g., ["diabetes", "thyroid"]
      default: [],
    },

    allergies: {
      type: [String], // e.g., ["peanuts", "dairy"]
      default: [],
    },

    eatingHabits: {
      type: [String], // e.g., ["late-night eating", "skipping breakfast"]
      default: [],
    },

    sleepQuality: {
      type: String,
      enum: ["poor", "fair", "good", "excellent"],
    },

    stressLevel: {
      type: String,
      enum: ["low", "moderate", "high"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
