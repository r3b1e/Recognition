import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/Card'; // Fixed import path
import { Apple, Heart, Zap, Target, Users, Award } from 'lucide-react';

const Landing = ({ onStartQuiz }) => {
  const features = [
    {
      icon: <Target className="w-8 h-8 text-[var(--accent)]" />,
      title: 'Personalized Goals',
      description:
        'Get nutrition advice tailored to your specific health goals and lifestyle',
    },
    {
      icon: <Heart className="w-8 h-8 text-[var(--increasing)]" />,
      title: 'Health Conditions',
      description:
        'Expert recommendations for diabetes, hypertension, and other conditions',
    },
    {
      icon: <Zap className="w-8 h-8 text-[var(--stable)]" />,
      title: 'Activity-Based',
      description:
        'Nutrition plans that match your activity level and exercise routine',
    },
    {
      icon: <Apple className="w-8 h-8 text-[var(--increasing)]" />,
      title: 'Diet Preferences',
      description:
        'Support for vegetarian, vegan, keto, Mediterranean, and more',
    },
    {
      icon: <Users className="w-8 h-8 text-[var(--accent)]" />,
      title: 'Expert System',
      description:
        'Rule-based recommendations from certified nutrition principles',
    },
    {
      icon: <Award className="w-8 h-8 text-[var(--stable)]" />,
      title: 'Comprehensive Plan',
      description:
        'Complete meal ideas, calorie targets, and supplement guidance',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[var(--dark-bg)]">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative overflow-hidden"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--darker-bg)]/50 to-[var(--card-bg)]/50">
          <div className="absolute inset-0 opacity-30">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 25px 25px, rgba(24, 239, 199, 0.1) 2px, transparent 2px)',
                backgroundSize: '50px 50px',
              }}
            ></div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              variants={itemVariants}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] rounded-full flex items-center justify-center shadow-xl shadow-[var(--accent)]/25">
                  <Apple className="w-10 h-10 text-[var(--dark-bg)]" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-[var(--stable)] rounded-full flex items-center justify-center shadow-lg">
                  <Zap className="w-3 h-3 text-[var(--dark-bg)]" />
                </div>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl md:text-6xl font-bold text-[var(--text)] mb-6 leading-tight"
            >
              Smart Nutrition
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)]">
                {' '}
                Advisor
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Get personalized nutrition advice based on your health goals,
              activity level, and dietary preferences. Our expert system
              provides science-based recommendations tailored just for you.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button
                onClick={onStartQuiz}
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-[var(--dark-bg)] shadow-xl hover:shadow-2xl hover:from-[var(--accent-hover)] hover:to-[var(--accent)] transform hover:scale-105 transition-all duration-200 font-semibold border-0"
              >
                Start Nutrition Check
                <Apple className="ml-2 w-5 h-5" />
              </Button>

              <div className="text-sm text-[var(--text-secondary)] flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-[var(--accent)] rounded-full border-2 border-[var(--card-bg)]"></div>
                  <div className="w-8 h-8 bg-[var(--stable)] rounded-full border-2 border-[var(--card-bg)]"></div>
                  <div className="w-8 h-8 bg-[var(--increasing)] rounded-full border-2 border-[var(--card-bg)]"></div>
                </div>
                <span>Trusted by 10,000+ users</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-4">
            Why Choose Our Nutrition Advisor?
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Our advanced rule-based system considers all aspects of your health
            and lifestyle to provide the most accurate and personalized
            nutrition recommendations.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="h-full hover:shadow-2xl hover:shadow-[var(--accent)]/10 transition-all duration-300 transform hover:-translate-y-2 border-0 bg-[var(--card-bg)]/80 backdrop-blur-sm border-[var(--card-bg)]/50">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-[var(--darker-bg)]/50 rounded-full border border-[var(--card-bg)]/50">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text)] mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] py-16"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '15+', label: 'Expert Rules' },
              { number: '6', label: 'Diet Types' },
              { number: '10+', label: 'Health Conditions' },
              { number: '100%', label: 'Personalized' },
            ].map((stat, index) => (
              <motion.div key={index} variants={itemVariants}>
                <div className="text-3xl md:text-4xl font-bold mb-2 text-[var(--dark-bg)]">
                  {stat.number}
                </div>
                <div className="text-[var(--dark-bg)]/90 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
      >
        <motion.div variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-6">
            Ready to Transform Your Nutrition?
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            Take our comprehensive questionnaire and receive your personalized
            nutrition plan in minutes.
          </p>
          <Button
            onClick={onStartQuiz}
            size="lg"
            className="text-lg px-10 py-6 bg-gradient-to-r from-[var(--accent)] to-[var(--accent-hover)] text-[var(--dark-bg)] shadow-xl hover:shadow-2xl hover:shadow-[var(--accent)]/50 hover:from-[var(--accent-hover)] hover:to-[var(--accent)] transform hover:scale-105 transition-all duration-200 font-semibold border-0"
          >
            Get Started Now
            <Heart className="ml-2 w-5 h-5 text-[var(--dark-bg)]" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Landing;
