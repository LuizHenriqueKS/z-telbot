import ZTelBotListenUpdatesOptions from './ZTelBotListenUpdatesOptions';

interface ZTelBotListenUpdatesExecutionArgs {
  options: ZTelBotListenUpdatesOptions;
  iteration: number;
  errors: number;
  defaultDelay: number;
  onceDelay?: number;
}

export default ZTelBotListenUpdatesExecutionArgs;
