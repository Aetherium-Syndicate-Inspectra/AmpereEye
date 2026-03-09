export interface BatterySample {
  currentMa: number;
  percentage: number;
  remaining: string;
  tempC: number;
  voltageMv: number;
  health: string;
  source: 'native' | 'mock';
}

interface BatteryNativePlugin {
  readCurrentNow: () => Promise<{
    currentMa: number;
    percentage: number;
    remaining: string;
    tempC: number;
    voltageMv: number;
    health: string;
  }>;
}

const getNativePlugin = (): BatteryNativePlugin | null => {
  const capacitor = (window as Window & {
    Capacitor?: {
      Plugins?: Record<string, unknown>;
    };
  }).Capacitor;

  const plugin = capacitor?.Plugins?.AmpereEyeBattery;
  if (!plugin) {
    return null;
  }

  return plugin as BatteryNativePlugin;
};

const createMockSample = (): BatterySample => {
  const now = Date.now();
  const wave = Math.sin(now / 12000);
  const currentMa = Math.round(1800 + wave * 350);

  return {
    currentMa,
    percentage: 84 + Math.round(wave * 2),
    remaining: '3h 58m',
    tempC: Number((33.7 + wave * 0.4).toFixed(1)),
    voltageMv: 3790 + Math.round(wave * 40),
    health: 'Normal',
    source: 'mock'
  };
};

export const readBatterySample = async (): Promise<BatterySample> => {
  const plugin = getNativePlugin();

  if (!plugin) {
    return createMockSample();
  }

  try {
    const data = await plugin.readCurrentNow();
    return {
      ...data,
      source: 'native'
    };
  } catch {
    return createMockSample();
  }
};
