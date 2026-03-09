import React from 'react';
import { History, MoreVertical, Gauge, Repeat, LineChart, Zap } from 'lucide-react';

const Memory: React.FC = () => {
  const sessions = [
    { date: 'May 24, 2026', charge: '15% → 80%', amount: '+3250mAh', type: 'Fast Charge' },
    { date: 'May 23, 2026', charge: '42% → 95%', amount: '+2650mAh', type: 'Standard' },
    { date: 'May 21, 2026', charge: '5% → 100%', amount: '+4750mAh', type: 'Full Cycle' },
  ];

  return (
    <div className="flex flex-col">
      <header className="px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <History className="text-primary w-6 h-6" />
          <h1 className="text-xl font-bold tracking-tight">The Memory</h1>
        </div>
        <button className="p-2 rounded-full hover:bg-primary/10 transition-colors">
          <MoreVertical className="text-slate-400 w-5 h-5" />
        </button>
      </header>

      <main className="flex-1 overflow-y-auto pb-6">
        {/* Health Score Section */}
        <section className="p-6">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6">
            <div className="flex justify-between items-end mb-4">
              <div>
                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">Battery Health Status</p>
                <h2 className="text-5xl font-bold text-primary">85%</h2>
              </div>
              <div className="text-right">
                <p className="text-slate-100 text-lg font-bold">4250 <span className="text-sm font-normal text-slate-400">mAh</span></p>
                <p className="text-slate-500 text-xs">of 5000 mAh design</p>
              </div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-3 mb-2">
              <div className="bg-primary h-3 rounded-full shadow-[0_0_10px_rgba(0,230,119,0.5)]" style={{ width: '85%' }}></div>
            </div>
            <p className="text-slate-400 text-xs mt-4 leading-relaxed">
              Your battery has undergone <span className="text-primary font-medium">500 complete cycles</span>. Degradation is within expected professional parameters for Li-ion cells.
            </p>
          </div>
        </section>

        {/* Stats Cards */}
        <section className="px-6 grid grid-cols-2 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <Gauge className="text-primary w-5 h-5 mb-2" />
            <p className="text-slate-400 text-xs font-medium">Wear Level</p>
            <p className="text-xl font-bold text-slate-100">15.0%</p>
          </div>
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4">
            <Repeat className="text-primary w-5 h-5 mb-2" />
            <p className="text-slate-400 text-xs font-medium">Total Cycles</p>
            <p className="text-xl font-bold text-slate-100">500</p>
          </div>
        </section>

        {/* Degradation Graph */}
        <section className="p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <LineChart className="text-primary w-5 h-5" />
            Capacity Retention
          </h3>
          <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-4 h-64 relative overflow-hidden">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 400 200">
              <defs>
                <linearGradient id="areaGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#00e677" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00e677" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,20 L50,25 L100,35 L150,45 L200,60 L250,65 L300,75 L350,85 L400,90 L400,200 L0,200 Z" fill="url(#areaGradient)" />
              <path d="M0,20 L50,25 L100,35 L150,45 L200,60 L250,65 L300,75 L350,85 L400,90" fill="none" stroke="#00e677" strokeWidth="3" strokeLinecap="round" />
              <circle cx="0" cy="20" r="4" fill="#00e677" />
              <circle cx="200" cy="60" r="4" fill="#00e677" />
              <circle cx="400" cy="90" r="4" fill="#00e677" />
            </svg>
            <div className="absolute bottom-2 left-4 right-4 flex justify-between text-[10px] text-slate-500 font-medium uppercase">
              <span>0 Cycles</span>
              <span>250 Cycles</span>
              <span>500 Cycles</span>
            </div>
          </div>
        </section>

        {/* Cycle Logs */}
        <section className="px-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Zap className="text-primary w-5 h-5" />
            Charging Sessions
          </h3>
          <div className="space-y-3">
            {sessions.map((session, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-slate-900/50 border border-slate-800 p-4 rounded-xl">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Zap className="text-primary w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-100">{session.date}</p>
                  <p className="text-xs text-slate-400">{session.charge}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{session.amount}</p>
                  <p className="text-[10px] text-slate-500 uppercase">{session.type}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 border border-slate-800 rounded-lg text-slate-400 text-sm font-medium hover:bg-slate-900 transition-colors">
            View All History
          </button>
        </section>
      </main>
    </div>
  );
};

export default Memory;
