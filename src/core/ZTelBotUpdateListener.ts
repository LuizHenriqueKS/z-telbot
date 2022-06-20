import { ZTelBotListenUpdatesOptions, ZTelBot, Update } from '..';

class ZTelBotUpdateListener {
  #bot: ZTelBot;
  #running: boolean;
  #offset?: number;
  #options: ZTelBotListenUpdatesOptions;

  constructor(bot: ZTelBot, options: ZTelBotListenUpdatesOptions) {
    this.#bot = bot;
    this.#running = false;
    this.#options = options;
    this.#offset = options.offset;
  }

  startListen() {
    this.#running = true;
    this.listenUpdates({ ...this.#options });
  }

  stopListen() {
    this.#running = false;
  }

  private listenUpdates(options: ZTelBotListenUpdatesOptions, errors = 0, onceDelay?: number) {
    setTimeout(async () => {
      if (this.#running) {
        try {
          const updates = await this.getUpdates(options);
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
        this.listenUpdates(options, errors, errors >= 3 ? 60000 : undefined);
      }
    }, onceDelay || this.#options.delay || 1000);
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
