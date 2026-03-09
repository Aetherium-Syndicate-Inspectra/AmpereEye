import React from 'react';

const NotificationSim: React.FC = () => {
  return (
    <section className="bg-android-dark rounded-2xl p-4 shadow-2xl border border-white/5 flex flex-col gap-1 w-full max-w-md mx-auto" id="notification-body">
      {/* App Header */}
      <header className="flex items-center justify-between mb-2 px-1">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-electric-green/20 flex items-center justify-center">
            <span className="text-[10px] text-electric-green">👁️</span>
          </div>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">AmpereEye • Active</span>
        </div>
        <div className="text-[10px] text-gray-500 uppercase tracking-tighter">Persistent</div>
      </header>

      {/* High-Density Metric Bar */}
      <article className="bg-black/20 rounded-lg p-3 flex items-center justify-between border border-white/5">
        <div className="flex items-center gap-1.5" title="Battery Level">
          <span className="text-electric-green text-sm">🔋</span>
          <span className="font-mono text-electric-green font-bold text-base">78%</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10"></div>
        <div className="flex items-center gap-1.5" title="Current Flow">
          <span className="text-discharge-orange text-sm">⚡</span>
          <span className="font-mono text-discharge-orange font-bold text-base">-450 mA</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10"></div>
        <div className="flex items-center gap-1.5" title="Temperature">
          <span className="text-gray-400 text-sm">🌡️</span>
          <span className="font-mono text-gray-200 font-medium text-base">34°C</span>
        </div>
        <div className="h-4 w-[1px] bg-white/10"></div>
        <div className="flex items-center gap-1.5" title="Remaining Time">
          <span className="text-gray-400 text-sm">⏱️</span>
          <span className="font-mono text-gray-200 font-medium text-base">4h 20m</span>
        </div>
      </article>

      <footer className="mt-2 flex justify-end">
        <div className="flex gap-4">
          <button className="text-xs text-blue-400 font-medium px-2 py-1">DETAILS</button>
          <button className="text-xs text-blue-400 font-medium px-2 py-1">STOP</button>
        </div>
      </footer>
    </section>
  );
};

export default NotificationSim;
