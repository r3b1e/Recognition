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

const calculateBMR = (userData) => {
  const { age, gender, weight, height } = userData;
  
  // Mifflin-St Jeor Equation
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
};

const getActivityMultiplier = (activityLevel) => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  return multipliers[activityLevel] || 1.2;
};

const calculateTDEE = (userData) => {
  const bmr = calculateBMR(userData);
  const multiplier = getActivityMultiplier(userData.activityLevel);
  return bmr * multiplier;
};

export const nutritionRules = [
  // Rule 1: Weight Loss Goal
  {
    id: 'weight_loss',
    priority: 9,
    condition: (userData) => userData.healthGoal === 'weight_loss',
    action: (userData) => {
      const tdee = calculateTDEE(userData);
      return {
        calorieRange: { min: Math.round(tdee - 500), max: Math.round(tdee - 200) },
        macroRatios: { protein: 30, carbs: 35, fats: 35 },
        recommendations: [
          'Create a moderate calorie deficit of 300-500 calories per day',
          'Focus on high-protein foods to maintain muscle mass',
          'Include plenty of fiber-rich vegetables',
          'Practice portion control and mindful eating'
        ],
        foodsToAvoid: ['Sugary drinks', 'Processed snacks', 'Fried foods', 'High-calorie desserts']
      };
    }
  },

  // Rule 2: Muscle Gain Goal
  {
    id: 'muscle_gain',
    priority: 9,
    condition: (userData) => userData.healthGoal === 'muscle_gain',
    action: (userData) => {
      const tdee = calculateTDEE(userData);
      return {
        calorieRange: { min: Math.round(tdee + 200), max: Math.round(tdee + 500) },
        macroRatios: { protein: 25, carbs: 45, fats: 30 },
        recommendations: [
          'Consume 1.6-2.2g protein per kg body weight',
          'Eat protein within 2 hours post-workout',
          'Include complex carbohydrates for energy',
          "Don't skip meals - eat every 3-4 hours"
        ],
        supplements: ['Whey protein powder', 'Creatine monohydrate'],
        mealIdeas: {
          breakfast: ['Greek yogurt with berries and nuts', 'Oatmeal with protein powder'],
          lunch: ['Grilled chicken with quinoa', 'Salmon with sweet potato'],
          dinner: ['Lean beef with vegetables', 'Tofu stir-fry with brown rice'],
          snacks: ['Protein shake with banana', 'Cottage cheese with fruit']
        }
      };
    }
  },

  // Rule 3: Sedentary Lifestyle
  {
    id: 'sedentary_lifestyle',
    priority: 7,
    condition: (userData) => userData.activityLevel === 'sedentary',
    action: (userData) => ({
      recommendations: [
        'Focus on nutrient-dense, lower-calorie foods',
        'Include more vegetables and lean proteins',
        'Consider standing or walking meetings',
        'Take short activity breaks every hour'
      ],
      exerciseAdvice: 'Aim for at least 150 minutes of moderate activity per week'
    })
  },

  // Rule 4: Diabetic Conditions
  {
    id: 'diabetes_management',
    priority: 10,
    condition: (userData) => userData.healthConditions.includes('diabetes'),
    action: () => ({
      macroRatios: { protein: 25, carbs: 40, fats: 35 },
      recommendations: [
        'Focus on low glycemic index carbohydrates',
        'Eat regular, balanced meals',
        'Monitor portion sizes carefully',
        'Choose whole grains over refined grains'
      ],
      foodsToAvoid: ['White bread', 'Sugary cereals', 'Pastries', 'Fruit juices', 'Candy'],
      mealIdeas: {
        breakfast: ['Steel-cut oats with nuts', 'Scrambled eggs with vegetables'],
        lunch: ['Quinoa salad with grilled chicken', 'Lentil soup with vegetables'],
        dinner: ['Grilled fish with broccoli', 'Chicken and vegetable stir-fry'],
        snacks: ['Raw almonds', 'Greek yogurt with berries']
      }
    })
  },

  // Rule 5: Hypertension
  {
    id: 'hypertension_management',
    priority: 10,
    condition: (userData) => userData.healthConditions.includes('hypertension'),
    action: () => ({
      recommendations: [
        'Follow DASH diet principles',
        'Limit sodium intake to less than 2300mg per day',
        'Include potassium-rich foods',
        'Limit alcohol consumption'
      ],
      foodsToAvoid: ['Processed meats', 'Canned soups', 'Fast food', 'Pickled foods', 'Salted nuts'],
      hydration: 'Drink 8-10 glasses of water daily'
    })
  },

  // Rule 6: Vegetarian Diet
  {
    id: 'vegetarian_diet',
    priority: 8,
    condition: (userData) => userData.dietaryPreference === 'vegetarian',
    action: () => ({
      recommendations: [
        'Combine legumes and grains for complete proteins',
        'Include vitamin B12 fortified foods',
        'Focus on iron-rich plant foods with vitamin C',
        'Include omega-3 rich foods like walnuts and flax seeds'
      ],
      supplements: ['Vitamin B12', 'Iron (if deficient)', 'Omega-3 algae oil'],
      mealIdeas: {
        breakfast: ['Smoothie bowl with protein powder', 'Avocado toast with hemp seeds'],
        lunch: ['Chickpea curry with brown rice', 'Quinoa buddha bowl'],
        dinner: ['Black bean and sweet potato tacos', 'Lentil bolognese with pasta'],
        snacks: ['Hummus with vegetables', 'Trail mix with nuts and seeds']
      }
    })
  },

  // Rule 7: Vegan Diet
  {
    id: 'vegan_diet',
    priority: 8,
    condition: (userData) => userData.dietaryPreference === 'vegan',
    action: () => ({
      recommendations: [
        'Ensure adequate vitamin B12 intake',
        'Include variety of plant proteins daily',
        'Focus on iron-rich foods with vitamin C sources',
        'Include calcium-fortified plant milks',
        'Get adequate vitamin D and omega-3 fatty acids'
      ],
      supplements: ['Vitamin B12', 'Vitamin D3 (algae-based)', 'Omega-3 algae oil', 'Calcium (if needed)'],
      mealIdeas: {
        breakfast: ['Oatmeal with nut butter and fruit', 'Tofu scramble with vegetables'],
        lunch: ['Buddha bowl with tahini dressing', 'Lentil and vegetable soup'],
        dinner: ['Stuffed bell peppers with quinoa', 'Mushroom and bean chili'],
        snacks: ['Nut butter with apple slices', 'Roasted chickpeas']
      }
    })
  },

  // Rule 8: Elderly Nutrition
  {
    id: 'elderly_nutrition',
    priority: 9,
    condition: (userData) => userData.age >= 65,
    action: () => ({
      recommendations: [
        'Focus on nutrient-dense foods',
        'Include adequate protein to prevent muscle loss',
        'Ensure sufficient fiber for digestive health',
        'Stay well hydrated throughout the day',
        'Include calcium and vitamin D rich foods'
      ],
      supplements: ['Vitamin D', 'Calcium', 'Vitamin B12'],
      foodsToAvoid: ['Excessive fatty or fried foods', 'High sodium processed foods']
    })
  },

  // Rule 9: High Activity Level
  {
    id: 'high_activity',
    priority: 7,
    condition: (userData) => userData.activityLevel === 'very_active' || userData.activityLevel === 'active',
    action: (userData) => {
      const tdee = calculateTDEE(userData);
      return {
        calorieRange: { min: Math.round(tdee - 100), max: Math.round(tdee + 200) },
        macroRatios: { protein: 20, carbs: 55, fats: 25 },
        recommendations: [
          'Consume carbohydrates before and after workouts',
          'Ensure adequate protein for recovery',
          'Stay well hydrated during exercise',
          'Consider electrolyte replacement for long sessions'
        ],
        hydration: 'Drink 10-12 glasses of water daily, more during exercise'
      };
    }
  },

  // Rule 10: Poor Sleep Quality
  {
    id: 'poor_sleep',
    priority: 6,
    condition: (userData) => userData.sleepQuality === 'poor',
    action: () => ({
      recommendations: [
        'Avoid large meals 3 hours before bedtime',
        'Limit caffeine after 2 PM',
        'Include magnesium-rich foods',
        'Consider tart cherry juice for natural melatonin'
      ],
      foodsToAvoid: ['Late-night heavy meals', 'Excessive caffeine', 'Alcohol before bed']
    })
  },

  // Rule 11: High Stress Level
  {
    id: 'high_stress',
    priority: 6,
    condition: (userData) => userData.stressLevel === 'high',
    action: () => ({
      recommendations: [
        'Include omega-3 rich foods for brain health',
        'Focus on complex carbohydrates for stable mood',
        'Include magnesium and B-vitamin rich foods',
        'Limit processed foods and excess sugar'
      ],
      supplements: ['Omega-3 fish oil', 'Magnesium', 'B-complex vitamins']
    })
  },

  // Rule 12: Breakfast Skipping
  {
    id: 'skips_breakfast',
    priority: 5,
    condition: (userData) => userData.eatingHabits.includes('skips_breakfast'),
    action: () => ({
      recommendations: [
        'Start with small, protein-rich breakfast options',
        'Prepare grab-and-go breakfast items',
        'Consider intermittent fasting approach if preferred',
        'Ensure first meal includes protein and fiber'
      ],
      mealIdeas: {
        breakfast: ['Greek yogurt parfait', 'Hard-boiled eggs with fruit', 'Protein smoothie', 'Overnight oats'],
        lunch: [],
        dinner: [],
        snacks: []
      }
    })
  },

  // Rule 13: Late Night Eating
  {
    id: 'late_night_eating',
    priority: 5,
    condition: (userData) => userData.eatingHabits.includes('eats_late_at_night'),
    action: () => ({
      recommendations: [
        'Finish eating 3 hours before bedtime',
        'Have a substantial dinner earlier in the evening',
        'Choose light, easy-to-digest snacks if needed',
        'Address underlying causes like stress or boredom'
      ],
      foodsToAvoid: ['Heavy, fatty meals before bed', 'Spicy foods in the evening']
    })
  },

  // Rule 14: Weight Gain Goal
  {
    id: 'weight_gain',
    priority: 9,
    condition: (userData) => userData.healthGoal === 'weight_gain',
    action: (userData) => {
      const tdee = calculateTDEE(userData);
      return {
        calorieRange: { min: Math.round(tdee + 300), max: Math.round(tdee + 500) },
        macroRatios: { protein: 20, carbs: 50, fats: 30 },
        recommendations: [
          'Eat frequent, nutrient-dense meals',
          'Include healthy fats like nuts, avocado, and olive oil',
          "Don't skip meals or snacks",
          'Consider liquid calories like smoothies'
        ],
        mealIdeas: {
          breakfast: ['Peanut butter banana smoothie', 'Avocado toast with eggs'],
          lunch: ['Pasta with olive oil and vegetables', 'Sandwich with nut butter'],
          dinner: ['Salmon with quinoa', 'Chicken thigh with sweet potato'],
          snacks: ['Trail mix', 'Greek yogurt with granola']
        }
      };
    }
  },

  // Rule 15: Default Maintenance
  {
    id: 'maintenance_default',
    priority: 1,
    condition: (userData) => userData.healthGoal === 'maintain' || userData.healthGoal === 'general_health',
    action: (userData) => {
      const tdee = calculateTDEE(userData);
      return {
        calorieRange: { min: Math.round(tdee - 100), max: Math.round(tdee + 100) },
        macroRatios: { protein: 20, carbs: 50, fats: 30 },
        recommendations: [
          'Follow a balanced, varied diet',
          'Include all food groups in moderation',
          'Stay consistent with meal timing',
          'Focus on whole, minimally processed foods'
        ],
        hydration: 'Drink 8 glasses of water daily'
      };
    }
  }
];

export const generateNutritionAdvice = (userData) => {
  // Sort rules by priority (higher priority first)
  const sortedRules = nutritionRules.sort((a, b) => b.priority - a.priority);
  
  // Initialize default advice
  let advice = {
    calorieRange: { min: 1500, max: 2000 },
    macroRatios: { protein: 20, carbs: 50, fats: 30 },
    recommendations: [],
    foodsToAvoid: [],
    mealIdeas: {
      breakfast: ['Oatmeal with fruit', 'Greek yogurt with berries'],
      lunch: ['Grilled chicken salad', 'Quinoa bowl with vegetables'],
      dinner: ['Baked fish with vegetables', 'Lean meat with brown rice'],
      snacks: ['Apple with almond butter', 'Mixed nuts']
    },
    supplements: [],
    hydration: 'Drink 8 glasses of water daily',
    exerciseAdvice: 'Aim for 30 minutes of moderate activity most days'
  };

  // Apply rules that match the user data
  sortedRules.forEach(rule => {
    if (rule.condition(userData)) {
      const ruleAdvice = rule.action(userData);
      
      // Merge rule advice with existing advice
      advice = {
        calorieRange: ruleAdvice.calorieRange || advice.calorieRange,
        macroRatios: ruleAdvice.macroRatios || advice.macroRatios,
        recommendations: [...advice.recommendations, ...(ruleAdvice.recommendations || [])],
        foodsToAvoid: [...advice.foodsToAvoid, ...(ruleAdvice.foodsToAvoid || [])],
        mealIdeas: {
          breakfast: [...advice.mealIdeas.breakfast, ...(ruleAdvice.mealIdeas?.breakfast || [])],
          lunch: [...advice.mealIdeas.lunch, ...(ruleAdvice.mealIdeas?.lunch || [])],
          dinner: [...advice.mealIdeas.dinner, ...(ruleAdvice.mealIdeas?.dinner || [])],
          snacks: [...advice.mealIdeas.snacks, ...(ruleAdvice.mealIdeas?.snacks || [])]
        },
        supplements: [...advice.supplements, ...(ruleAdvice.supplements || [])],
        hydration: ruleAdvice.hydration || advice.hydration,
        exerciseAdvice: ruleAdvice.exerciseAdvice || advice.exerciseAdvice
      };
    }
  });

  // Remove duplicates
  advice.recommendations = [...new Set(advice.recommendations)];
  advice.foodsToAvoid = [...new Set(advice.foodsToAvoid)];
  advice.supplements = [...new Set(advice.supplements)];

  return advice;
};
