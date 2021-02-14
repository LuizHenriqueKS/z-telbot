import {
  BotCommandHandler,
  ChatHandler,
  InvalidMessageException,
  Message,
  UserHandler,
  ZTelBot,
  ZTelBotSender
} from '..';
import buildBotCommandHandler from '../util/buildBotCommandHandler';
import buildChatHandler from '../util/buildChatHandler';
import buildUserHandler from '../util/buildUserHandler';

class SentMessageEvent {
  #bot: ZTelBot;
  #message: Message;
  #command?: BotCommandHandler;
  #chat: ChatHandler;
  #from?: UserHandler;

  constructor(bot: ZTelBot, message: Message) {
    this.#bot = bot;
    this.#message = message;
    this.#command = buildBotCommandHandler(message);
    this.#from = buildUserHandler(message, 'from')!;
    this.#chat = buildChatHandler(message)!;
    if (!message) {
      throw new InvalidMessageException();
    }
  }

  reply(): ZTelBotSender {
    const chatId = this.#message.chat.id;
    const replyToMessageId = this.#message.messageId;
    return new ZTelBotSender(this.#bot, { chatId, replyToMessageId });
  }

  send(): ZTelBotSender {
    const chatId = this.#message.chat.id;
    return new ZTelBotSender(this.#bot, { chatId });
  }

  get from(): UserHandler | undefined {
    return this.#from;
  }

  get chat(): ChatHandler {
    return this.#chat;
  }

  get command(): BotCommandHandler | undefined {
    return this.#command;
  }

  get message(): Message | undefined {
    return this.#message;
  }

  get bot(): ZTelBot {
    return this.#bot;
  }
}

export default SentMessageEvent;
