import React from 'react';
import { Activity, Database, ShieldCheck } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'pulse', label: 'The Pulse', icon: Activity },
    { id: 'memory', label: 'The Memory', icon: Database },
    { id: 'enforcer', label: 'The Enforcer', icon: ShieldCheck },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t border-slate-800 bg-background-dark/80 backdrop-blur-md px-6 pb-8 pt-4 z-50">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "flex flex-col items-center gap-1 transition-colors",
              activeTab === tab.id ? "text-primary" : "text-slate-500 hover:text-slate-300"
            )}
          >
            <tab.icon size={28} className={cn(activeTab === tab.id && "fill-primary/20")} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;
