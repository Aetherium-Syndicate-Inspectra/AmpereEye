import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ampereeye.app',
  appName: 'AmpereEye',
  webDir: 'dist',
  android: {
    allowMixedContent: false
  }
};

export default config;
