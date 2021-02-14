import { Update, ZTelBot } from '..';

class UpdateEvent {
  #bot: ZTelBot;
  #update: Update;

  constructor(bot: ZTelBot, update: Update) {
    this.#bot = bot;
    this.#update = update;
  }

  get update(): Update {
    return this.#update;
  }

  get bot(): ZTelBot {
    return this.#bot;
  }
}

export default UpdateEvent;
