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

  async text(message: SenderMessageForm): Promise<Message> {
    const form: MessageForm = {
      chatId: this.#options.chatId,
      replyToMessageId: this.#options.replyToMessageId,
      ...message
    };
    return await this.#bot.sendMessage(form);
  }
}

export default ZTelBotSender;
