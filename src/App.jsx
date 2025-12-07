import React, { useState } from 'react';
import { NutritionProvider, useNutrition } from "./context/NutritionContext ";
import { generateNutritionAdvice } from "./utils/nutritionRules";
import Landing from './Components/Loading';
import Quiz from './Components/Quiz';
import Results from './Components/Results';

const AppContent = () => {
  const [currentView, setCurrentView] = useState('landing');
  const { userData, setUserData, nutritionAdvice, setNutritionAdvice, resetData } = useNutrition();
  console.log("User Data:", userData);
  const handleStartQuiz = () => {
    resetData();
    setCurrentView('quiz');
  };

  const handleQuizComplete = (data) => {
    setUserData(data);
    const advice = generateNutritionAdvice(data);
    setNutritionAdvice(advice);
    setCurrentView('results');
  };

  const handleBackToHome = () => {
    setCurrentView('landing');
  };

  const handleRestart = () => {
    resetData();
    setCurrentView('landing');
  };

  switch (currentView) {
    case 'landing':
      return <Landing onStartQuiz={handleStartQuiz} />;
    
    case 'quiz':
      return <Quiz onComplete={handleQuizComplete} onBack={handleBackToHome} />;
    
    case 'results':
      return nutritionAdvice ? (
        <Results advice={nutritionAdvice} onRestart={handleRestart} />
      ) : (
        <Landing onStartQuiz={handleStartQuiz} />
      );
    
    default:
      return <Landing onStartQuiz={handleStartQuiz} />;
  }
};

function App() {
  return (
    <NutritionProvider>
      <AppContent />
    </NutritionProvider>
  );
}

export default App;
