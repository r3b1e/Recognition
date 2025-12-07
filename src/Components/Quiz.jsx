import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  User,
  Activity,
  Target,
  Utensils,
  Heart,
  Clock,
  Bed,
  Zap,
} from 'lucide-react';

const Quiz = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    age: undefined,
    gender: undefined,
    weight: undefined,
    height: undefined,
    activityLevel: undefined,
    healthGoal: undefined,
    dietaryPreference: undefined,
    healthConditions: [],
    allergies: [],
    eatingHabits: [],
    sleepQuality: undefined,
    stressLevel: undefined,
  });

  const totalSteps = 9;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const updateUserData = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value) => {
    setUserData(prev => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onComplete(userData);
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 0:
        return userData.age && userData.gender;
      case 1:
        return userData.weight && userData.height;
      case 2:
        return userData.activityLevel;
      case 3:
        return userData.healthGoal;
      case 4:
        return userData.dietaryPreference;
      case 5:
        return true;
      case 6:
        return true;
      case 7:
        return true;
      case 8:
        return userData.sleepQuality && userData.stressLevel;
      default:
        return false;
    }
  };

  const stepIcons = [
    <User style={{ width: '24px', height: '24px', color: '#10b981' }} />,
    <Activity style={{ width: '24px', height: '24px', color: '#10b981' }} />,
    <Zap style={{ width: '24px', height: '24px', color: '#10b981' }} />,
    <Target style={{ width: '24px', height: '24px', color: '#10b981' }} />,
    <Utensils style={{ width: '24px', height: '24px', color: '#10b981' }} />,
    <Heart style={{ width: '24px', height: '24px', color: '#10b981' }} />,
    <Activity style={{ width: '24px', height: '24px', color: '#10b981' }} />,
    <Clock style={{ width: '24px', height: '24px', color: '#10b981' }} />,
    <Bed style={{ width: '24px', height: '24px', color: '#10b981' }} />,
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
      padding: '2rem 1rem',
    },
    maxWidth: {
      maxWidth: '672px',
      margin: '0 auto',
    },
    header: {
      marginBottom: '2rem',
    },
    title: {
      fontSize: '1.875rem',
      fontWeight: 'bold',
      color: '#f8fafc',
      marginBottom: '0.5rem',
      textAlign: 'center',
    },
    subtitle: {
      color: '#94a3b8',
      textAlign: 'center',
    },
    progressBar: {
      width: '100%',
      height: '12px',
      backgroundColor: '#1e293b',
      borderRadius: '9999px',
      overflow: 'hidden',
      marginBottom: '0.5rem',
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
      transition: 'width 0.5s ease',
    },
    stepIndicators: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: '1rem',
    },
    stepIcon: (isActive) => ({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      fontSize: '0.75rem',
      transition: 'all 0.3s',
      backgroundColor: isActive ? '#10b981' : '#1e293b80',
      color: isActive ? '#0f172a' : '#94a3b8',
    }),
    card: {
      minHeight: '400px',
      backgroundColor: '#1e293be6',
      backdropFilter: 'blur(12px)',
      borderRadius: '12px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 25px 50px -12px rgba(16, 185, 129, 0.1)',
    },
    questionContainer: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5rem',
    },
    questionHeader: {
      textAlign: 'center',
    },
    questionTitle: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#f8fafc',
      marginBottom: '0.5rem',
    },
    questionDesc: {
      color: '#94a3b8',
    },
    inputLabel: {
      display: 'block',
      fontSize: '0.875rem',
      fontWeight: '500',
      color: '#f8fafc',
      marginBottom: '0.5rem',
    },
    input: {
      width: '100%',
      padding: '0.75rem',
      borderRadius: '8px',
      backgroundColor: 'transparent',
      border: '1px solid #1e293b4d',
      color: '#f8fafc',
      fontSize: '1rem',
      transition: 'all 0.3s',
    },
    gridContainer: (cols) => ({
      display: 'grid',
      gridTemplateColumns: `repeat(${cols}, 1fr)`,
      gap: '0.75rem',
    }),
    button: (isSelected) => ({
      padding: '0.75rem',
      borderRadius: '8px',
      border: isSelected ? '2px solid #10b981' : '2px solid #1e293b66',
      backgroundColor: isSelected ? '#d1fae5' : 'transparent',
      color: isSelected ? '#065f46' : '#e2e8f0',
      textTransform: 'capitalize',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontWeight: isSelected ? '600' : '400',
    }),
    activityButton: (isSelected) => ({
      width: '100%',
      padding: '1rem',
      borderRadius: '8px',
      border: isSelected ? '2px solid #10b981' : '2px solid #1e293b66',
      backgroundColor: isSelected ? '#d1fae5' : 'transparent',
      color: isSelected ? '#065f46' : '#cbd5e1',
      textAlign: 'left',
      cursor: 'pointer',
      transition: 'all 0.3s',
    }),
    activityLabel: {
      fontWeight: '500',
    },
    activityDesc: {
      fontSize: '0.875rem',
      color: '#94a3b8',
      marginTop: '0.25rem',
    },
    goalButton: (isSelected) => ({
      padding: '1rem',
      borderRadius: '8px',
      border: isSelected ? '2px solid #10b981' : '2px solid #1e293b66',
      backgroundColor: isSelected ? '#d1fae5' : 'transparent',
      color: isSelected ? '#065f46' : '#e2e8f0',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'all 0.3s',
    }),
    emoji: {
      fontSize: '2rem',
      marginBottom: '0.5rem',
    },
    goalLabel: {
      fontWeight: '500',
    },
    navigation: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    navButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 1.5rem',
      borderRadius: '8px',
      border: '1px solid #1e293b80',
      backgroundColor: '#0f172a',
      color: '#94a3b8',
      cursor: 'pointer',
      transition: 'all 0.3s',
      fontSize: '1rem',
      fontWeight: '500',
    },
    submitButton: (disabled) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.75rem 2rem',
      borderRadius: '8px',
      border: 'none',
      background: disabled ? '#1e293b' : 'linear-gradient(90deg, #10b981 0%, #059669 100%)',
      color: disabled ? '#64748b' : '#0f172a',
      cursor: disabled ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s',
      fontSize: '1rem',
      fontWeight: '600',
      boxShadow: disabled ? 'none' : '0 10px 15px -3px rgba(16, 185, 129, 0.3)',
      opacity: disabled ? 0.6 : 1,
    }),
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <div style={styles.questionContainer}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionTitle}>Basic Information</h2>
              <p style={styles.questionDesc}>Tell us about yourself to get started</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={styles.inputLabel}>Age</label>
                <input
                  type="number"
                  placeholder="Enter your age"
                  value={userData.age || ''}
                  onChange={e => updateUserData('age', parseInt(e.target.value, 10) || '')}
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.inputLabel}>Gender</label>
                <div style={styles.gridContainer(3)}>
                  {['male', 'female', 'other'].map(gender => (
                    <button
                      key={gender}
                      type="button"
                      onClick={() => updateUserData('gender', gender)}
                      style={styles.button(userData.gender === gender)}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div style={styles.questionContainer}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionTitle}>Physical Stats</h2>
              <p style={styles.questionDesc}>Help us calculate your nutritional needs</p>
            </div>

            <div style={styles.gridContainer(2)}>
              <div>
                <label style={styles.inputLabel}>Weight (kg)</label>
                <input
                  type="number"
                  placeholder="Enter weight"
                  value={userData.weight || ''}
                  onChange={e =>
                    updateUserData('weight', e.target.value === '' ? '' : parseFloat(e.target.value))
                  }
                  style={styles.input}
                />
              </div>

              <div>
                <label style={styles.inputLabel}>Height (cm)</label>
                <input
                  type="number"
                  placeholder="Enter height"
                  value={userData.height || ''}
                  onChange={e =>
                    updateUserData('height', e.target.value === '' ? '' : parseFloat(e.target.value))
                  }
                  style={styles.input}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div style={styles.questionContainer}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionTitle}>Activity Level</h2>
              <p style={styles.questionDesc}>How active are you on a typical day?</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { value: 'sedentary', label: 'Sedentary', desc: 'Little to no exercise, desk job' },
                { value: 'light', label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
                { value: 'moderate', label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
                { value: 'active', label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
                { value: 'very_active', label: 'Extra Active', desc: 'Very hard exercise, physical job' },
              ].map(activity => (
                <button
                  key={activity.value}
                  type="button"
                  onClick={() => updateUserData('activityLevel', activity.value)}
                  style={styles.activityButton(userData.activityLevel === activity.value)}
                >
                  <div style={styles.activityLabel}>{activity.label}</div>
                  <div style={styles.activityDesc}>{activity.desc}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div style={styles.questionContainer}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionTitle}>Health Goals</h2>
              <p style={styles.questionDesc}>What's your primary health objective?</p>
            </div>

            <div style={styles.gridContainer(2)}>
              {[
                { value: 'weight_loss', label: 'Weight Loss', icon: '⬇️' },
                { value: 'weight_gain', label: 'Weight Gain', icon: '⬆️' },
                { value: 'muscle_gain', label: 'Muscle Gain', icon: '💪' },
                { value: 'maintain', label: 'Maintain Weight', icon: '⚖️' },
                { value: 'general_health', label: 'General Health', icon: '❤️' },
              ].map(goal => (
                <button
                  key={goal.value}
                  type="button"
                  onClick={() => updateUserData('healthGoal', goal.value)}
                  style={styles.goalButton(userData.healthGoal === goal.value)}
                >
                  <div style={styles.emoji}>{goal.icon}</div>
                  <div style={styles.goalLabel}>{goal.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div style={styles.questionContainer}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionTitle}>Dietary Preference</h2>
              <p style={styles.questionDesc}>What type of diet do you follow?</p>
            </div>

            <div style={styles.gridContainer(2)}>
              {[
                { value: 'omnivore', label: 'Omnivore', icon: '🍽️' },
                { value: 'vegetarian', label: 'Vegetarian', icon: '🥬' },
                { value: 'vegan', label: 'Vegan', icon: '🌱' },
                { value: 'pescatarian', label: 'Pescatarian', icon: '🐟' },
                { value: 'keto', label: 'Keto', icon: '🥑' },
                { value: 'mediterranean', label: 'Mediterranean', icon: '🫒' },
              ].map(diet => (
                <button
                  key={diet.value}
                  type="button"
                  onClick={() => updateUserData('dietaryPreference', diet.value)}
                  style={styles.goalButton(userData.dietaryPreference === diet.value)}
                >
                  <div style={styles.emoji}>{diet.icon}</div>
                  <div style={styles.goalLabel}>{diet.label}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 5:
        return (
          <div style={styles.questionContainer}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionTitle}>Health Conditions</h2>
              <p style={styles.questionDesc}>Select any that apply (optional)</p>
            </div>

            <div style={styles.gridContainer(2)}>
              {[
                'diabetes',
                'hypertension',
                'heart_disease',
                'high_cholesterol',
                'thyroid_issues',
                'digestive_issues',
                'arthritis',
                'osteoporosis',
              ].map(condition => (
                <button
                  key={condition}
                  type="button"
                  onClick={() => toggleArrayField('healthConditions', condition)}
                  style={{
                    ...styles.button(userData.healthConditions && userData.healthConditions.includes(condition)),
                    textAlign: 'left',
                  }}
                >
                  {condition.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div style={styles.questionContainer}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionTitle}>Allergies</h2>
              <p style={styles.questionDesc}>Select any allergies you have (optional)</p>
            </div>

            <div style={styles.gridContainer(3)}>
              {['nuts', 'dairy', 'eggs', 'soy', 'gluten', 'shellfish', 'fish', 'sesame', 'peanuts'].map(allergy => (
                <button
                  key={allergy}
                  type="button"
                  onClick={() => toggleArrayField('allergies', allergy)}
                  style={{
                    ...styles.button(userData.allergies && userData.allergies.includes(allergy)),
                    textAlign: 'center',
                  }}
                >
                  {allergy}
                </button>
              ))}
            </div>
          </div>
        );

      case 7:
        return (
          <div style={styles.questionContainer}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionTitle}>Eating Habits</h2>
              <p style={styles.questionDesc}>Select any that describe your eating patterns</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { value: 'skips_breakfast', label: 'Often skips breakfast' },
                { value: 'eats_late_at_night', label: 'Eats late at night' },
                { value: 'frequent_snacking', label: 'Frequent snacking' },
                { value: 'emotional_eating', label: 'Emotional eating' },
                { value: 'irregular_meals', label: 'Irregular meal times' },
                { value: 'fast_food_frequent', label: 'Frequent fast food consumption' },
              ].map(habit => (
                <button
                  key={habit.value}
                  type="button"
                  onClick={() => toggleArrayField('eatingHabits', habit.value)}
                  style={{
                    ...styles.button(userData.eatingHabits && userData.eatingHabits.includes(habit.value)),
                    width: '100%',
                    textAlign: 'left',
                  }}
                >
                  {habit.label}
                </button>
              ))}
            </div>
          </div>
        );

      case 8:
        return (
          <div style={styles.questionContainer}>
            <div style={styles.questionHeader}>
              <h2 style={styles.questionTitle}>Lifestyle Factors</h2>
              <p style={styles.questionDesc}>Help us understand your sleep and stress levels</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={styles.inputLabel}>Sleep Quality</label>
                <div style={styles.gridContainer(4)}>
                  {['poor', 'fair', 'good', 'excellent'].map(quality => (
                    <button
                      key={quality}
                      type="button"
                      onClick={() => updateUserData('sleepQuality', quality)}
                      style={{
                        ...styles.button(userData.sleepQuality === quality),
                        textAlign: 'center',
                      }}
                    >
                      {quality}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label style={styles.inputLabel}>Stress Level</label>
                <div style={styles.gridContainer(3)}>
                  {['low', 'moderate', 'high'].map(level => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => updateUserData('stressLevel', level)}
                      style={{
                        ...styles.button(userData.stressLevel === level),
                        textAlign: 'center',
                      }}
                    >
                      {level}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.maxWidth}>
        <div style={styles.header}>
          <div style={{ opacity: 1 }}>
            <h1 style={styles.title}>Nutrition Assessment</h1>
            <p style={styles.subtitle}>Step {currentStep + 1} of {totalSteps}</p>
          </div>

          <div style={styles.progressBar}>
            <div style={{ ...styles.progressFill, width: `${progress}%` }} />
          </div>

          <div style={styles.stepIndicators}>
            {Array.from({ length: totalSteps }, (_, index) => (
              <div key={index} style={styles.stepIcon(index <= currentStep)}>
                {index < currentStep ? '✓' : stepIcons[index]}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.card}>{renderStep()}</div>

        <div style={styles.navigation}>
          <button
            onClick={currentStep === 0 ? onBack : prevStep}
            style={styles.navButton}
          >
            <ChevronLeft style={{ width: '16px', height: '16px' }} />
            {currentStep === 0 ? 'Back to Home' : 'Previous'}
          </button>

          {currentStep === totalSteps - 1 ? (
            <button
              onClick={handleSubmit}
              disabled={!isStepComplete()}
              style={styles.submitButton(!isStepComplete())}
            >
              Get My Nutrition Plan
              <Target style={{ width: '16px', height: '16px' }} />
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={!isStepComplete()}
              style={styles.submitButton(!isStepComplete())}
            >
              Next
              <ChevronRight style={{ width: '16px', height: '16px' }} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;