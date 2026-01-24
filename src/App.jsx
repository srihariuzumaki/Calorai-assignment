import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import IntroScreen from './pages/IntroScreen';
import SwipeScreen from './pages/SwipeScreen';
import ResultsScreen from './pages/ResultsScreen';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<IntroScreen />} />
          <Route path="/swipe" element={<SwipeScreen />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
