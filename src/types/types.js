/**
 * @typedef {Object} UserData
 * @property {number} age - User's age in years
 * @property {'male' | 'female' | 'other'} gender - User's gender
 * @property {number} weight - Weight in kilograms
 * @property {number} height - Height in centimeters
 * @property {'sedentary' | 'light' | 'moderate' | 'active' | 'very_active'} activityLevel - Daily activity level
 * @property {'weight_loss' | 'weight_gain' | 'muscle_gain' | 'maintain' | 'general_health'} healthGoal - Primary health objective
 * @property {'omnivore' | 'vegetarian' | 'vegan' | 'pescatarian' | 'keto' | 'mediterranean'} dietaryPreference - Dietary preference
 * @property {string[]} healthConditions - Array of health conditions
 * @property {string[]} allergies - Array of food allergies
 * @property {string[]} eatingHabits - Array of eating habits
 * @property {'poor' | 'fair' | 'good' | 'excellent'} sleepQuality - Sleep quality rating
 * @property {'low' | 'moderate' | 'high'} stressLevel - Stress level rating
 */

/**
 * @typedef {Object} NutritionAdvice
 * @property {Object} calorieRange - Daily calorie range
 * @property {number} calorieRange.min - Minimum calories
 * @property {number} calorieRange.max - Maximum calories
 * @property {Object} macroRatios - Macronutrient percentages
 * @property {number} macroRatios.protein - Protein percentage
 * @property {number} macroRatios.carbs - Carbohydrates percentage
 * @property {number} macroRatios.fats - Fats percentage
 * @property {string[]} recommendations - Personalized recommendations
 * @property {string[]} foodsToAvoid - Foods to limit or avoid
 * @property {Object} mealIdeas - Sample meal ideas
 * @property {string[]} mealIdeas.breakfast - Breakfast ideas
 * @property {string[]} mealIdeas.lunch - Lunch ideas
 * @property {string[]} mealIdeas.dinner - Dinner ideas
 * @property {string[]} mealIdeas.snacks - Snack ideas
 * @property {string[]} supplements - Recommended supplements
 * @property {string} hydration - Hydration guidance
 * @property {string} exerciseAdvice - Exercise recommendations
 */

/**
 * @typedef {Object} Rule
 * @property {string} id - Unique rule identifier
 * @property {function} condition - Function that returns true if rule applies
 * @property {function} action - Function that returns partial nutrition advice
 * @property {number} priority - Rule execution priority (higher = first)
 */
