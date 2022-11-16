import { Update, ZTelBot, ZTelBotListenUpdatesOptions } from '..';
import ZTelBotListenUpdatesExecutionArgs from './update/ZTelBotListenUpdatesExecutionArgs';
import ZTelBotListenUpdatesExecutionResponse from './update/ZTelBotListenUpdatesExecutionResponse';

class ZTelBotUpdateListener {
  #bot: ZTelBot;
  #running: boolean;
  #offset?: number;
  #options: ZTelBotListenUpdatesOptions;
  #interval?: any;
  #lastIteration: number = 0;
  #lastIterationMs: number = 0;

  constructor(bot: ZTelBot, options: ZTelBotListenUpdatesOptions) {
    this.#bot = bot;
    this.#running = false;
    this.#options = { ...options };
    this.#offset = options.offset;
  }

  startListen() {
    this.#running = true;
    this.startNewThread();
    this.startInterval();
  }

  stopListen() {
    this.#running = false;
    if (this.#interval) {
      clearInterval(this.#interval);
      this.#interval = undefined;
    }
  }

  private startNewThread() {
    if (this.#running) {
      if (this.#options.log) {
        console.log('Starting a new thread to telegram bot...');
      }
      this.#lastIteration += 1;
      this.listenUpdates(this.#options, this.#lastIteration + 1);
    }
  }

  private startInterval() {
    const maxTimeout = this.#options.threadTimeout || 10000;
    this.#lastIterationMs = new Date().getTime();
    this.#interval = setInterval(() => {
      const now = new Date().getTime();
      if (now > this.#lastIterationMs + maxTimeout) {
        this.startNewThread();
      }
    }, maxTimeout);
  }

  private listenUpdates(options: ZTelBotListenUpdatesOptions, iteration: number, errors = 0, onceDelay?: number) {
    const defaultDelay = this.#options.delay || 1000;
    setTimeout(async () => {
      const args = {
        options, iteration, errors, defaultDelay, onceDelay
      };
      const response = await this.execute(args);
      if (response.canContinueToListenUpdates && this.#running) {
        options.skipFirstBatch = false;
        this.listenUpdates(options, iteration + 1, args.errors, args.errors >= 3 ? 5000 : undefined);
      }
    }, onceDelay || defaultDelay);
  }

  private async execute(args: ZTelBotListenUpdatesExecutionArgs): Promise<ZTelBotListenUpdatesExecutionResponse> {
    if (this.#running && this.#lastIteration < args.iteration) {
      if (args.onceDelay && args.onceDelay > args.defaultDelay && this.#options.log) {
        console.log('Resuming update...');
      }
      try {
        const updates = await this.getUpdates(args.options);
        if (this.#lastIteration >= args.iteration || !this.#running) {
          return { canContinueToListenUpdates: false };
        }
        this.#lastIterationMs = new Date().getTime();
        this.#lastIteration = args.iteration;
        if (!args.options.skipFirstBatch) {
          this.#bot.fireUpdates(updates);
          args.options.skipFirstBatch = false;
        }
        args.errors = 0;
        this.nextOffset(updates);
      } catch (e: any) {
        this.handleError(e);
        if (e.response && e.response.description && e.response.description === 'Conflict: terminated by other getUpdates request; make sure that only one bot instance is running') {
          return { canContinueToListenUpdates: false };
        }
        args.errors++;
      }
    }
    return { canContinueToListenUpdates: true };
  }

  private async getUpdates(options: ZTelBotListenUpdatesOptions): Promise<Update[]> {
    return await this.#bot.getUpdates({
      offset: this.#offset || options.offset,
      limit: options.limit,
      timeout: options.timeout,
      allowedUpdates: options.allowedUpdates
    });
  }

  private nextOffset(updates: Update[]) {
    for (const update of updates) {
      this.#offset = update.updateId + 1;
    }
  }

  private handleError(e: Error) {
    console.error('handleError');
    console.error(e);
  }
}

export default ZTelBotUpdateListener;
