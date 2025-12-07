// index.js - FIXED VERSION
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');

const app = express();

app.use(cors({
  origin: '*',  // Allow all origins during development
  credentials: false,
}));

const upload = multer({ storage: multer.memoryStorage() });

const LOGMEAL_BASE_URL = 'https://api.logmeal.com/v2';
const LOGMEAL_TOKEN = process.env.LOGMEAL_API_USER_TOKEN;

if (!LOGMEAL_TOKEN) {
  console.warn('⚠️ LOGMEAL_API_USER_TOKEN is not set in .env');
}

/**
 * Extract nutrition values from LogMeal's nested structure
 * and scale them to user's weight
 */
function mapNutrition(nutritionalInfo, userWeightGrams) {
  if (!nutritionalInfo || !nutritionalInfo.totalNutrients) {
    return {
      calories: null,
      protein: null,
      carbohydrates: null,
      fats: null,
      fiber: null,
      sugars: null,
      sodium: null,
    };
  }

  const nutrients = nutritionalInfo.totalNutrients;
  const servingSize = nutritionalInfo.serving_size || 100; // LogMeal's detected serving size
  
  // Calculate scaling factor
  const scaleFactor = userWeightGrams / servingSize;

  // Extract values (LogMeal provides total for the serving_size)
  const calories = nutrients.ENERC_KCAL?.quantity || null;
  const protein = nutrients.PROCNT?.quantity || null;
  const carbs = nutrients.CHOCDF?.quantity || null;
  const fats = nutrients.FAT?.quantity || null;
  const fiber = nutrients.FIBTG?.quantity || null;
  const sugars = nutrients.SUGAR?.quantity || null;
  const sodium = nutrients.NA?.quantity || null;

  // Scale everything to user's actual weight
  return {
    calories: calories ? Math.round(calories * scaleFactor) : null,
    protein: protein ? (protein * scaleFactor).toFixed(1) : null,
    carbohydrates: carbs ? (carbs * scaleFactor).toFixed(1) : null,
    fats: fats ? (fats * scaleFactor).toFixed(1) : null,
    fiber: fiber ? (fiber * scaleFactor).toFixed(1) : null,
    sugars: sugars ? (sugars * scaleFactor).toFixed(1) : null,
    sodium: sodium ? Math.round(sodium * scaleFactor) : null,
  };
}

/**
 * POST /analyze
 * Expects: image (file) + weight (number in grams)
 */
app.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const weight = parseFloat(req.body.weight);

    if (!file) {
      return res.status(400).json({ message: 'Image is required' });
    }
    if (!weight || weight <= 0) {
      return res.status(400).json({ message: 'Weight must be > 0' });
    }
    if (!LOGMEAL_TOKEN) {
      return res.status(500).json({ message: 'LogMeal token not configured on server' });
    }

    // STEP 1: Send image for segmentation
    const form = new FormData();
    form.append('image', file.buffer, {
      filename: file.originalname,
      contentType: file.mimetype,
    });

    const segmentationResponse = await axios.post(
      `${LOGMEAL_BASE_URL}/image/segmentation/complete`,
      form,
      {
        headers: {
          ...form.getHeaders(),
          Authorization: `Bearer ${LOGMEAL_TOKEN}`,
          Accept: 'application/json',
        },
      }
    );

    const seg = segmentationResponse.data;
    // console.log('SEGMENTATION RESPONSE', JSON.stringify(seg, null, 2));

    const imageId = seg.imageId || seg.image_id || seg.id;
    if (!imageId) {
      return res.status(500).json({ message: 'LogMeal did not return an imageId' });
    }

    // Extract food name and confidence from first detection
    let predictedClass = 'Unknown Food';
    let confidence = null;

    try {
      const firstRegion = seg.segmentation_results?.[0];
      const firstRec = firstRegion?.recognition_results?.[0];
      if (firstRec) {
        predictedClass = firstRec.name || 'Unknown Food';
        confidence = firstRec.prob || null;
      }
    } catch (e) {
      console.warn('Could not extract food name from segmentation:', e.message);
    }

    // STEP 2: Get nutrition info
    const nutritionResponse = await axios.post(
      `${LOGMEAL_BASE_URL}/nutrition/recipe/nutritionalInfo`,
      { imageId },
      {
        headers: {
          Authorization: `Bearer ${LOGMEAL_TOKEN}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    const nutData = nutritionResponse.data;
    // console.log('NUTRITION RESPONSE', JSON.stringify(nutData, null, 2));

    // Use the overall nutritional_info (covers all detected food items)
    const logmealNutrition = nutData.nutritional_info;

    // Map and scale to user's weight
    const mapped = mapNutrition(logmealNutrition, weight);

    // STEP 3: Return in frontend's expected format
    return res.json({
      food_name: predictedClass,
      confidence: confidence,
      calories: mapped.calories,
      protein: mapped.protein,
      carbohydrates: mapped.carbohydrates,
      fats: mapped.fats,
      fiber: mapped.fiber,
      sugars: mapped.sugars,
      sodium: mapped.sodium,
    });
  } catch (err) {
    console.error('Error in /analyze:', err.response?.data || err.message);
    return res.status(500).json({
      message: 'Failed to analyze image',
      error: err.response?.data || err.message,
    });
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://127.0.0.1:${PORT}`);
  console.log(`✅ LogMeal API token: ${LOGMEAL_TOKEN ? 'Configured' : 'MISSING'}`);
});