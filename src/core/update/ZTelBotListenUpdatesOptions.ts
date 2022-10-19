class ZTelBotListenUpdatesOptions {
  once?: boolean;
  offset?: number;
  limit?: number;
  timeout?: number;
  allowedUpdates?: string[];
  skipFirstBatch?: boolean;
  delay?: number;
  log?: boolean;
}

export default ZTelBotListenUpdatesOptions;
