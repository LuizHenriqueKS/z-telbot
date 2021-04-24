import {
  AnimationMessageForm,
  Message,
  MessageForm,
  PhotoMessageForm,
  SenderAnimationMessageForm,
  SenderMessageForm,
  SenderPhotoMessageForm,
  ZTelBot,
  ZTelBotSenderOptions
} from '..';

class ZTelBotSender {
  #bot: ZTelBot;
  #options: ZTelBotSenderOptions;

  constructor(bot: ZTelBot, options: ZTelBotSenderOptions) {
    this.#bot = bot;
    this.#options = options;
  }

  async text(message: SenderMessageForm | string): Promise<Message> {
    let form: MessageForm;
    const arg: any = message;
    if (typeof (message) === 'string') {
      form = {
        chatId: this.#options.chatId,
        replyToMessageId: this.#options.replyToMessageId,
        text: arg
      };
    } else {
      form = {
        chatId: this.#options.chatId,
        replyToMessageId: this.#options.replyToMessageId,
        ...arg
      };
    }
    return await this.#bot.sendMessage(form);
  }

  async photo(message: SenderPhotoMessageForm): Promise<Message> {
    const arg: any = message;
    const form: PhotoMessageForm = {
      chatId: this.#options.chatId,
      replyToMessageId: this.#options.replyToMessageId,
      ...arg
    };
    return await this.#bot.sendPhoto(form);
  }

  async animation(message: SenderAnimationMessageForm): Promise<Message> {
    const arg: any = message;
    const form: AnimationMessageForm = {
      chatId: this.#options.chatId,
      replyToMessageId: this.#options.replyToMessageId,
      ...arg
    };
    return await this.#bot.sendAnimation(form);
  }
}

export default ZTelBotSender;
