import { registerPlugin } from '@capacitor/core';

export interface BatteryTruthPlugin {
  getRealCurrentFlow(): Promise<{ current_ma: number }>;
}

const BatteryTruth = registerPlugin<BatteryTruthPlugin>('BatteryTruth');

export default BatteryTruth;
