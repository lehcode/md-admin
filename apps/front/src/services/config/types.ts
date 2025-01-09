export interface AppConfig {
  contentPath: string;
}

export interface ConfigService {
  get(): AppConfig;
  update(config: Partial<AppConfig>): void;
}