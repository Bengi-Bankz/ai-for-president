// @ts-ignore
import config from 'config-vite';
import tailwindcss from '@tailwindcss/vite';

export default () => {
  const baseConfig = config();
  baseConfig.plugins = [
    ...(baseConfig.plugins || []),
    tailwindcss(),
  ];
  return baseConfig;
};
