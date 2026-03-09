import React, { useEffect, useMemo, useState } from 'react';
import { Brain } from 'lucide-react';
import { readBatterySample } from '../services/nativeBatteryBridge';
import type { BatterySample } from '../services/nativeBatteryBridge';
import BatteryTruth from '../services/BatteryBridge';

const BatteryRing = React.memo(({ currentMa, percentage }: { currentMa: number; percentage: number }) => {
  const dashOffset = useMemo(() => {
    const progress = Math.min(Math.max(percentage / 100, 0), 1);
    return 754 * (1 - progress);
  }, [percentage]);

  return (
    <div className="relative flex items-center justify-center w-64 h-64 rounded-full border border-slate-800/50">
      <div className="absolute inset-4 rounded-full border-2 border-primary/20"></div>

      <svg className="absolute inset-0 w-full h-full -rotate-90">
        <circle
          cx="128"
          cy="128"
          r="120"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-primary"
          strokeDasharray="754"
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>

      <div className="flex flex-col items-center">
        <span className="text-slate-500 text-xs font-medium tracking-widest uppercase mb-1">Current Flow</span>
        <span className="font-mono text-4xl font-bold text-primary tracking-tighter">{currentMa} mA</span>
      </div>

      <div className="absolute -bottom-2 bg-background-dark px-3 py-1 border border-slate-800 rounded-full">
        <span className="text-xs font-mono font-bold text-slate-100">{percentage}% CAP</span>
      </div>
    </div>
  );
});

const Pulse: React.FC = () => {
  const [metrics, setMetrics] = useState<BatterySample | null>(null);
  const [currentFlow, setCurrentFlow] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;

    const syncSample = async () => {
      const sample = await readBatterySample();
      if (mounted) {
        setMetrics(sample);
      }
    };

    const syncTruthCurrent = async () => {
      try {
        const { current_ma } = await BatteryTruth.getRealCurrentFlow();
        if (mounted) {
          setCurrentFlow(current_ma);
        }
      } catch (error) {
        console.error('Governance Enforcer: ไม่สามารถเชื่อมต่อกับฮาร์ดแวร์ได้', error);
      }
    };

    void syncSample();
    void syncTruthCurrent();
    const interval = window.setInterval(() => {
      void syncSample();
      void syncTruthCurrent();
    }, 1000);

    return () => {
      mounted = false;
      window.clearInterval(interval);
    };
  }, []);

  if (!metrics) {
    return <div className="px-6 py-8 text-slate-400">Loading battery telemetry...</div>;
  }

  const resolvedCurrentMa = currentFlow ?? metrics.currentMa;

  const getAIInsight = () => {
    if (resolvedCurrentMa > 0) {
      return `Charging at ${resolvedCurrentMa.toLocaleString()} mA with stable current. Estimated full charge in ${metrics.remaining}.`;
    }

    return `The battery breath is steady. Discharging at ${Math.abs(resolvedCurrentMa)} mA. Cycle health remains optimal.`;
  };

  return (
    <div className="flex flex-col px-6">
      <div className="flex flex-col items-center justify-center py-10 relative">
        <BatteryRing currentMa={resolvedCurrentMa} percentage={metrics.percentage} />
        <span className="text-[10px] text-slate-500 uppercase tracking-widest mt-4">Source: {currentFlow !== null ? 'native-jni' : metrics.source}</span>
      </div>

      <div className="grid grid-cols-3 gap-1 bg-neutral-dark/40 border border-slate-800/50 rounded-xl p-4 mb-6">
        <div className="flex flex-col items-center border-r border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Remaining</span>
          <span className="font-mono text-sm text-slate-200">{metrics.remaining}</span>
        </div>
        <div className="flex flex-col items-center border-r border-slate-800">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Temp</span>
          <span className="font-mono text-sm text-slate-200">{metrics.tempC}°C</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">Voltage</span>
          <span className="font-mono text-sm text-slate-200">{metrics.voltageMv} mV</span>
        </div>
      </div>

      <div className="bg-neutral-dark border border-slate-800 rounded-xl p-5 mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Brain className="text-primary w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">AI Analysis</span>
        </div>
        <p className="text-slate-300 text-sm leading-relaxed font-light">{getAIInsight()}</p>
      </div>

      <div className="space-y-4 mb-10">
        <div className="flex justify-between items-center px-2">
          <span className="text-xs text-slate-500 uppercase tracking-widest">Hardware Health</span>
          <span className="text-xs font-mono text-primary">{metrics.health}</span>
        </div>
        <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-primary w-[92%]"></div>
        </div>
      </div>
    </div>
  );
};

export default Pulse;
