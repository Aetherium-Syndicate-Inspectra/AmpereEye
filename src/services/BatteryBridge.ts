import { Capacitor, registerPlugin } from '@capacitor/core';

export interface BatteryTruthPlugin {
  getRealCurrentFlow(): Promise<{ current_ma: number }>;
}

const BatteryTruth = registerPlugin<BatteryTruthPlugin>('BatteryTruth');

export const isBatteryTruthSupported = (): boolean => {
  return Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';
};

export default BatteryTruth;
