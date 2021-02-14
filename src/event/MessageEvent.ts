import {
  Message,
  Update,
  ZTelBot,
  ZTelBotSender,
  BotCommandHandler,
  InvalidMessageException,
  ChatHandler,
  UserHandler
} from '..';
import buildBotCommandHandler from '../util/buildBotCommandHandler';
import buildChatHandler from '../util/buildChatHandler';
import buildUserHandler from '../util/buildUserHandler';

class MessageEvent {
  #bot: ZTelBot;
  #update: Update;
  #message: Message;
  #chat: ChatHandler;
  #from?: UserHandler;
  #command?: BotCommandHandler;
  #commandFound?: string;

  constructor(bot: ZTelBot, update: Update, commandFound?: string) {
    this.#bot = bot;
    this.#update = update;
    this.#command = buildBotCommandHandler(update.message);
    this.#from = buildUserHandler(update.message, 'from');
    this.#chat = buildChatHandler(update.message)!;
    this.#commandFound = commandFound;
    if (update.message) {
      this.#message = update.message;
    } else {
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

  get chat(): ChatHandler {
    return this.#chat;
  }

  get from(): UserHandler | undefined {
    return this.#from;
  }

  get command(): BotCommandHandler | undefined {
    return this.#command;
  }

  get message(): Message | undefined {
    return this.#message;
  }

  get update(): Update {
    return this.#update;
  }

  get bot(): ZTelBot {
    return this.#bot;
  }

  get commandFound(): string | undefined {
    return this.#commandFound;
  }
}

export default MessageEvent;
