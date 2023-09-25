import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'lucky-pick',
  webDir: 'build',
  server: {
    androidScheme: 'https'
  }
};

export default config;
