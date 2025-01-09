import { reactive } from 'vue';
import type { AppConfig, ConfigService } from './types';
import { defaultConfig } from './defaults';

class ConfigServiceImpl implements ConfigService {
  private config: AppConfig;

  constructor() {
    this.config = reactive({ ...defaultConfig });
  }

  get(): AppConfig {
    return this.config;
  }

  update(newConfig: Partial<AppConfig>): void {
    Object.assign(this.config, newConfig);
  }
}

export const configService = new ConfigServiceImpl();