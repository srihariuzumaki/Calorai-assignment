import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import IntroScreen from './pages/IntroScreen';
import SwipeScreen from './pages/SwipeScreen';
import ResultsScreen from './pages/ResultsScreen';

function App() {
  return (
    <Routes>
      <Route path="/" element={<IntroScreen />} />
      <Route path="/swipe" element={<SwipeScreen />} />
      <Route path="/results" element={<ResultsScreen />} />
      {/* Redirect any unknown paths to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
