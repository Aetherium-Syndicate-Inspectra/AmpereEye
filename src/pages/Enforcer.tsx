import React from 'react';
import { Gavel, Info, TrendingUp, Brain, Settings } from 'lucide-react';

const Enforcer: React.FC = () => {
  const offenders = [
    { name: 'Meta Service', icon: 'M', iconColor: 'from-blue-500 to-indigo-600', details: '1,240 Wakelocks · 182 mAh', action: 'Force Stop' },
    { name: 'System UI', icon: <Settings size={18} />, iconColor: 'from-slate-500 to-slate-700', details: '842 Wakelocks · 64 mAh', action: 'Protected', disabled: true },
    { name: 'SocialStream', icon: 'S', iconColor: 'from-orange-400 to-red-500', details: '512 Wakelocks · 32 mAh', action: 'Force Stop' },
  ];

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="flex items-center bg-background-dark p-4 pb-2 justify-between border-b border-white/5">
        <div className="text-primary flex items-center justify-center w-10 h-10">
          <Gavel size={30} />
        </div>
        <h2 className="text-slate-100 text-lg font-bold leading-tight tracking-tight flex-1 ml-3">The Enforcer</h2>
        <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-white/5 text-slate-100 hover:bg-white/10 transition-colors">
          <Info size={20} />
        </button>
      </div>

      <main className="flex-1 pb-6">
        {/* Energy Consumption Chart Section */}
        <div className="px-4 pt-6 pb-4">
          <h2 className="text-slate-100 text-[22px] font-bold leading-tight tracking-tight mb-4">Screen Energy Impact</h2>
          <div className="bg-[#0a0a0a] border border-[#1a1a1a] rounded-xl p-5 flex flex-col gap-6">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Total Consumption</p>
                <p className="text-primary text-4xl font-bold leading-none tracking-tight">320 <span className="text-lg font-normal text-slate-500">mAh</span></p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-rose-500 text-sm font-bold flex items-center gap-1">
                  <TrendingUp size={14} /> 12%
                </span>
                <p className="text-slate-500 text-xs">vs. Yesterday</p>
              </div>
            </div>
            {/* Simple Bar Chart */}
            <div className="flex items-end justify-around h-32 w-full gap-8 px-2">
              <div className="flex flex-col items-center gap-2 flex-1 h-full">
                <div className="w-full flex-1 flex items-end">
                  <div className="w-full bg-primary rounded-t-lg" style={{ height: '100%' }}></div>
                </div>
                <p className="text-slate-400 text-[11px] font-bold uppercase whitespace-nowrap">Screen On</p>
              </div>
              <div className="flex flex-col items-center gap-2 flex-1 h-full">
                <div className="w-full flex-1 flex items-end">
                  <div className="w-full bg-primary/20 rounded-t-lg border-t border-primary/40" style={{ height: '42%' }}></div>
                </div>
                <p className="text-slate-400 text-[11px] font-bold uppercase whitespace-nowrap">Screen Off</p>
              </div>
            </div>
          </div>
        </div>

        {/* AI Advice */}
        <div className="px-4 py-2">
          <div className="flex flex-col items-start justify-between gap-4 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Brain className="text-primary w-5 h-5" />
                <p className="text-primary text-sm font-bold uppercase tracking-widest">AI Insights</p>
              </div>
              <p className="text-slate-200 text-sm leading-relaxed mt-1">
                <span className="font-bold text-white">Meta Service</span> is causing 450 wakelocks per hour. Recommend restricted background access to save ~45mAh.
              </p>
            </div>
            <button className="flex min-w-[100px] items-center justify-center rounded-full h-9 px-5 bg-primary text-black text-sm font-bold transition-transform active:scale-95 shadow-lg shadow-primary/20">
              Restrict
            </button>
          </div>
        </div>

        {/* The Offenders List */}
        <div className="px-4 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-100 text-lg font-bold">Top Offenders</h3>
            <span className="text-slate-500 text-xs font-medium uppercase tracking-widest">Ranked by Drain</span>
          </div>
          <div className="flex flex-col gap-3">
            {offenders.map((app, idx) => (
              <div key={idx} className="bg-[#0a0a0a] border border-[#1a1a1a] flex items-center justify-between p-4 rounded-xl">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center overflow-hidden bg-gradient-to-br ${app.iconColor}`}>
                    {typeof app.icon === 'string' ? (
                      <span className="text-white font-bold text-xs">{app.icon}</span>
                    ) : (
                      <div className="text-white">{app.icon}</div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <p className="text-slate-100 font-bold text-sm">{app.name}</p>
                    <p className="text-slate-500 text-xs">{app.details}</p>
                  </div>
                </div>
                <button
                  className={cn(
                    "h-8 px-3 rounded-lg text-xs font-bold transition-colors",
                    app.disabled
                      ? "border border-slate-700 text-slate-400 cursor-not-allowed"
                      : "border border-rose-500/30 text-rose-500 hover:bg-rose-500/10"
                  )}
                  disabled={app.disabled}
                >
                  {app.action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

// Simplified cn function for this file
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}

export default Enforcer;
