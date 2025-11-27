import React from 'react';
import AuroraBackground from './components/AuroraBackground';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';

function App() {
  return (
    <div className="relative w-full min-h-screen text-white selection:bg-[var(--glow-primary)] selection:text-black overflow-hidden flex flex-col">
      <AuroraBackground />
      <Navbar />

      <main className="flex-grow flex items-center justify-center relative z-10">
        <HeroSection />
      </main>

      <footer className="py-6 text-center text-[var(--text-secondary)] text-sm relative z-10">
        <p>© 2025 Built with React & Glass.</p>
      </footer>
    </div>
  )
}

export default App;
