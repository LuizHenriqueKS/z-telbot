import { ZTelBotListenUpdatesOptions, ZTelBot, Update } from '..';

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
    this.#options = options;
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
      this.listenUpdates({ ...this.#options }, this.#lastIteration + 1);
    }
  }

  private startInterval() {
    const maxTimeout = 10000;
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
      if (this.#running && this.#lastIteration < iteration) {
        if (onceDelay && onceDelay > defaultDelay) {
          console.log('Resuming update...');
        }
        try {
          const updates = await this.getUpdates(options);
          if (this.#lastIteration >= iteration || !this.#running) {
            return;
          }
          this.#lastIterationMs = new Date().getTime();
          this.#lastIteration = iteration;
          if (!options.skipFirstBatch) {
            this.#bot.fireUpdates(updates);
          }
          errors = 0;
          this.nextOffset(updates);
        } catch (e: any) {
          errors++;
          this.handleError(e);
        }
      }
      if (this.#running) {
        options.skipFirstBatch = false;
        this.listenUpdates(options, iteration + 1, errors, errors >= 3 ? 5000 : undefined);
      }
    }, onceDelay || defaultDelay);
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
