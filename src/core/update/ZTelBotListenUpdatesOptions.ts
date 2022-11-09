class ZTelBotListenUpdatesOptions {
  once?: boolean;
  offset?: number;
  limit?: number;
  timeout?: number;
  threadTimeout?: number;
  allowedUpdates?: string[];
  skipFirstBatch?: boolean;
  delay?: number;
  log?: boolean;
}

export default ZTelBotListenUpdatesOptions;
