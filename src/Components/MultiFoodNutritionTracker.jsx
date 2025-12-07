import React, { useState, useRef } from 'react';
import { Camera, Upload, X, Plus, Trash2, Scale, TrendingUp, Activity, Flame, Apple } from 'lucide-react';

const MultiFoodNutritionTracker = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentWeight, setCurrentWeight] = useState('');
  const [loading, setLoading] = useState(false);
  const [analyzingIndex, setAnalyzingIndex] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const API_URL = 'https://recognition-syy7.onrender.com/analyze';

  // Add new food item with image
  const handleImageCapture = (e, isCamera = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCurrentImage({
          file,
          preview: reader.result,
          isCamera
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Analyze single food item
  const analyzeFoodItem = async () => {
    if (!currentImage || !currentWeight) {
      alert('Please add an image and enter the weight!');
      return;
    }

    setLoading(true);
    setAnalyzingIndex(foodItems.length);

    try {
      const formData = new FormData();
      formData.append('image', currentImage.file);
      formData.append('weight', currentWeight);

      const response = await fetch(API_URL, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const newItem = {
        id: Date.now(),
        image: currentImage.preview,
        weight: parseFloat(currentWeight),
        foodName: data.food_name || 'Unknown Food',
        confidence: data.confidence,
        nutrition: {
          calories: parseFloat(data.calories) || 0,
          protein: parseFloat(data.protein) || 0,
          carbohydrates: parseFloat(data.carbohydrates) || 0,
          fats: parseFloat(data.fats) || 0,
          fiber: parseFloat(data.fiber) || 0,
          sugars: parseFloat(data.sugars) || 0,
          sodium: parseFloat(data.sodium) || 0,
        }
      };

      setFoodItems([...foodItems, newItem]);
      setCurrentImage(null);
      setCurrentWeight('');
      
    } catch (error) {
      console.error('Analysis error:', error);
      alert('Failed to analyze the food. Please try again!');
    } finally {
      setLoading(false);
      setAnalyzingIndex(null);
    }
  };

  // Remove food item
  const removeFoodItem = (id) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  // Calculate totals
  const calculateTotals = () => {
    return foodItems.reduce((totals, item) => ({
      calories: totals.calories + item.nutrition.calories,
      protein: totals.protein + item.nutrition.protein,
      carbohydrates: totals.carbohydrates + item.nutrition.carbohydrates,
      fats: totals.fats + item.nutrition.fats,
      fiber: totals.fiber + item.nutrition.fiber,
      sugars: totals.sugars + item.nutrition.sugars,
      sodium: totals.sodium + item.nutrition.sodium,
      totalWeight: totals.totalWeight + item.weight,
    }), {
      calories: 0,
      protein: 0,
      carbohydrates: 0,
      fats: 0,
      fiber: 0,
      sugars: 0,
      sodium: 0,
      totalWeight: 0,
    });
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            Multi-Food Nutrition Tracker
          </h1>
          <p className="text-slate-400">Snap photos, track everything, see total nutrition! 📸🍽️</p>
        </div>

        {/* Add Food Section */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-slate-700/50 shadow-xl">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Plus className="w-5 h-5 text-cyan-400" />
            Add Food Item
          </h2>

          {!currentImage ? (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Camera Button */}
              <button
                onClick={() => cameraInputRef.current.click()}
                className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-cyan-500/50 rounded-xl hover:border-cyan-400 hover:bg-slate-700/30 transition-all group"
              >
                <Camera className="w-12 h-12 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-medium">Take Photo</span>
                <span className="text-sm text-slate-400">Use camera</span>
              </button>

              {/* Upload Button */}
              <button
                onClick={() => fileInputRef.current.click()}
                className="flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed border-emerald-500/50 rounded-xl hover:border-emerald-400 hover:bg-slate-700/30 transition-all group"
              >
                <Upload className="w-12 h-12 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-lg font-medium">Upload Photo</span>
                <span className="text-sm text-slate-400">From gallery</span>
              </button>

              <input
                ref={cameraInputRef}
                type="file"
                accept="image/*"
                capture="environment"
                onChange={(e) => handleImageCapture(e, true)}
                className="hidden"
              />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageCapture}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {/* Image Preview */}
              <div className="relative rounded-xl overflow-hidden border-2 border-slate-600">
                <img 
                  src={currentImage.preview} 
                  alt="Food preview" 
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={() => setCurrentImage(null)}
                  className="absolute top-2 right-2 p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Weight Input */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2 text-slate-300">
                    Weight (grams)
                  </label>
                  <div className="relative">
                    <Scale className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      value={currentWeight}
                      onChange={(e) => setCurrentWeight(e.target.value)}
                      placeholder="e.g., 150"
                      className="w-full pl-11 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white"
                      min="1"
                    />
                  </div>
                </div>

                <button
                  onClick={analyzeFoodItem}
                  disabled={loading}
                  className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-lg font-semibold hover:from-cyan-600 hover:to-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all self-end"
                >
                  {loading ? 'Analyzing...' : 'Analyze'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Food Items List */}
        {foodItems.length > 0 && (
          <div className="space-y-4 mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Apple className="w-5 h-5 text-emerald-400" />
              Your Food Items ({foodItems.length})
            </h2>

            {foodItems.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700/50 shadow-lg hover:border-slate-600 transition-all"
              >
                <div className="flex gap-4">
                  {/* Image */}
                  <img 
                    src={item.image} 
                    alt={item.foodName}
                    className="w-24 h-24 rounded-lg object-cover border-2 border-slate-600"
                  />

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-lg font-semibold text-cyan-400">
                          {item.foodName}
                        </h3>
                        <p className="text-sm text-slate-400">
                          {item.weight}g
                          {item.confidence && (
                            <span className="ml-2 text-emerald-400">
                              • {Math.round(item.confidence * 100)}% match
                            </span>
                          )}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFoodItem(item.id)}
                        className="p-2 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Nutrition Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
                      <div className="bg-slate-700/50 rounded-lg p-2">
                        <div className="text-slate-400">Calories</div>
                        <div className="font-semibold text-orange-400">{Math.round(item.nutrition.calories)}</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-2">
                        <div className="text-slate-400">Protein</div>
                        <div className="font-semibold text-blue-400">{item.nutrition.protein.toFixed(1)}g</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-2">
                        <div className="text-slate-400">Carbs</div>
                        <div className="font-semibold text-yellow-400">{item.nutrition.carbohydrates.toFixed(1)}g</div>
                      </div>
                      <div className="bg-slate-700/50 rounded-lg p-2">
                        <div className="text-slate-400">Fats</div>
                        <div className="font-semibold text-purple-400">{item.nutrition.fats.toFixed(1)}g</div>
                      </div>
                    </div>
                  </div>
                </div>

                {analyzingIndex === index && (
                  <div className="mt-3 flex items-center gap-2 text-cyan-400 text-sm">
                    <Activity className="w-4 h-4 animate-pulse" />
                    Analyzing...
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Total Summary */}
        {foodItems.length > 0 && (
          <div className="bg-gradient-to-br from-cyan-900/30 to-emerald-900/30 backdrop-blur-sm rounded-2xl p-6 border-2 border-cyan-500/50 shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
              <TrendingUp className="w-6 h-6 text-cyan-400" />
              Total Nutrition Summary
            </h2>

            <div className="mb-4 text-slate-300">
              <span className="text-lg">Total Weight: </span>
              <span className="text-xl font-bold text-cyan-400">{totals.totalWeight}g</span>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-6">
              <div className="bg-slate-800/70 rounded-xl p-4 border border-orange-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="text-slate-400">Calories</span>
                </div>
                <div className="text-3xl font-bold text-orange-400">
                  {Math.round(totals.calories)}
                </div>
                <div className="text-xs text-slate-400 mt-1">kcal</div>
              </div>

              <div className="bg-slate-800/70 rounded-xl p-4 border border-blue-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-400">Protein</span>
                </div>
                <div className="text-3xl font-bold text-blue-400">
                  {totals.protein.toFixed(1)}
                </div>
                <div className="text-xs text-slate-400 mt-1">grams</div>
              </div>

              <div className="bg-slate-800/70 rounded-xl p-4 border border-yellow-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-yellow-400" />
                  <span className="text-slate-400">Carbs</span>
                </div>
                <div className="text-3xl font-bold text-yellow-400">
                  {totals.carbohydrates.toFixed(1)}
                </div>
                <div className="text-xs text-slate-400 mt-1">grams</div>
              </div>

              <div className="bg-slate-800/70 rounded-xl p-4 border border-purple-500/30">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-purple-400" />
                  <span className="text-slate-400">Fats</span>
                </div>
                <div className="text-3xl font-bold text-purple-400">
                  {totals.fats.toFixed(1)}
                </div>
                <div className="text-xs text-slate-400 mt-1">grams</div>
              </div>
            </div>

            {/* Additional Nutrients */}
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-sm text-slate-400">Fiber</div>
                <div className="text-lg font-semibold text-green-400">{totals.fiber.toFixed(1)}g</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-sm text-slate-400">Sugars</div>
                <div className="text-lg font-semibold text-pink-400">{totals.sugars.toFixed(1)}g</div>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3">
                <div className="text-sm text-slate-400">Sodium</div>
                <div className="text-lg font-semibold text-red-400">{Math.round(totals.sodium)}mg</div>
              </div>
            </div>
          </div>
        )}

        {/* Empty State */}
        {foodItems.length === 0 && !currentImage && (
          <div className="text-center py-16 text-slate-400">
            <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg">Start by adding your first food item!</p>
            <p className="text-sm">Take a photo or upload an image to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MultiFoodNutritionTracker;