import React, { createContext, useContext, useState } from 'react';

const NutritionContext = createContext();

export const NutritionProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [nutritionAdvice, setNutritionAdvice] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);

  const resetData = () => {
    setUserData(null);
    setNutritionAdvice(null);
    setCurrentStep(0);
  };

  const value = {
    userData,
    setUserData,
    nutritionAdvice,
    setNutritionAdvice,
    currentStep,
    setCurrentStep,
    resetData,
  };

  return (
    <NutritionContext.Provider value={value}>
      {children}
    </NutritionContext.Provider>
  );
};

export const useNutrition = () => {
  const context = useContext(NutritionContext);
  if (context === undefined) {
    throw new Error('useNutrition must be used within a NutritionProvider');
  }
  return context;
};
