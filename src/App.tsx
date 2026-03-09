import React, { useState } from 'react';
import BottomNav from './components/BottomNav';
import Pulse from './pages/Pulse';
import Memory from './pages/Memory';
import Enforcer from './pages/Enforcer';
import NotificationSim from './components/NotificationSim';

function App() {
  const [activeTab, setActiveTab] = useState('pulse');
  const [showNotification, setShowNotification] = useState(false);

  const renderPage = () => {
    switch (activeTab) {
      case 'pulse':
        return <Pulse />;
      case 'memory':
        return <Memory />;
      case 'enforcer':
        return <Enforcer />;
      default:
        return <Pulse />;
    }
  };

  return (
    <div className="bg-background-dark min-h-screen text-slate-100 font-display flex flex-col pb-24">
      <header className="flex items-center justify-between px-6 pt-6 pb-2 sticky top-0 bg-background-dark/80 backdrop-blur-md z-40">
        <button className="text-slate-400" onClick={() => setShowNotification(!showNotification)}>
          <div className="w-6 h-6 flex flex-col justify-around">
            <span className="w-full h-0.5 bg-current"></span>
            <span className="w-full h-0.5 bg-current"></span>
            <span className="w-full h-0.5 bg-current"></span>
          </div>
        </button>
        <h1 className="text-sm font-bold tracking-[0.2em] uppercase text-slate-500">AmpereEye</h1>
        <div className="text-primary">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m7 2 10 0 0 20-10 0z"/><path d="M11 7 11 11"/><path d="M11 15 11 15.01"/></svg>
        </div>
      </header>

      {showNotification && (
        <div className="px-4 py-2">
          <NotificationSim />
        </div>
      )}

      <main className="flex-1">
        {renderPage()}
      </main>

      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
