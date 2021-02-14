import {
  Message,
  MessageForm,
  SenderMessageForm,
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
    if (message instanceof SenderMessageForm) {
      form = {
        chatId: this.#options.chatId,
        replyToMessageId: this.#options.replyToMessageId,
        ...message
      };
    } else {
      form = {
        chatId: this.#options.chatId,
        replyToMessageId: this.#options.replyToMessageId,
        text: message
      };
    }
    return await this.#bot.sendMessage(form);
  }
}

export default ZTelBotSender;
