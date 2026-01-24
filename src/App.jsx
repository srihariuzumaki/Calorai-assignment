import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import IntroScreen from './pages/IntroScreen';
import SwipeScreen from './pages/SwipeScreen';
import ResultsScreen from './pages/ResultsScreen';
import SearchScreen from './pages/SearchScreen';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <div className="min-h-screen w-full relative overflow-x-hidden flex justify-center selection:bg-primary/30">
      {/* Background is fixed and spans whole screen */}
      <AnimatedBackground />

      {/* Responsive App Container */}
      <main className="w-full max-w-[430px] min-h-screen flex flex-col relative z-10 shadow-[20px_0_100px_rgba(0,0,0,0.8)] border-x border-white/[0.05]">
        <Routes>
          <Route path="/" element={<IntroScreen />} />
          <Route path="/swipe" element={<SwipeScreen />} />
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/search" element={<SearchScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
