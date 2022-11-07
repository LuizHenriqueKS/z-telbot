import { Message } from '..';

class BotCommandHandler {
  #message: Message;
  #commandName?: string;
  #botName?: string;
  #argsText?: string;
  #args?: string[];

  constructor(message: Message) {
    this.#message = message;
  }

  get isValid(): boolean {
    if (this.#message.text) {
      return this.#message.text.startsWith('/');
    } else {
      return false;
    }
  }

  get botName(): string {
    if (!this.#botName) {
      const index = this.#message.text?.indexOf('@');
      if (index && index >= 0) {
        const regex = /^(\w+) |$/g;
        const str = this.#message.text?.substr(index + 1)!;
        const args = regex.exec(str);
        this.#botName = args![1];
      } else {
        this.#botName = '';
      }
    }
    return this.#botName || '';
  }

  get commandName(): string {
    if (!this.#commandName) {
      const regex = /\/(\w+)(@| |$|\n|\r)/gm;
      const response = regex.exec(this.#message.text || '');
      this.#commandName = response ? response[1] : '';
    }
    return this.#commandName || '';
  }

  get args(): string[] {
    if (!this.#args) {
      this.#args = this.argsText.split(' ');
    }
    return this.#args;
  }

  get argsText(): string {
    if (!this.#argsText) {
      const index = this.#message.text?.indexOf(' ');
      if (index && index >= 0) {
        this.#argsText = this.#message.text?.substr(index + 1);
      } else {
        this.#argsText = '';
      }
    }
    return this.#argsText || '';
  }
}

export default BotCommandHandler;
