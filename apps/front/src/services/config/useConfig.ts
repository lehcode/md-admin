import { computed } from 'vue';
import { configService } from './configService';
import type { AppConfig } from './types';

export function useConfig() {
  const config = computed(() => configService.get());
  
  const updateConfig = (newConfig: Partial<AppConfig>) => {
    configService.update(newConfig);
  };

  return {
    config,
    updateConfig
  };
}