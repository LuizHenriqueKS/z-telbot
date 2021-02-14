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

class CommandEvent {
  #bot: ZTelBot;
  #update: Update;
  #message: Message;
  #from: UserHandler;
  #chat: ChatHandler
  #text: string;
  #command: BotCommandHandler;
  commandFound?: string;

  constructor(bot: ZTelBot, update: Update) {
    this.#bot = bot;
    this.#update = update;
    this.#command = buildBotCommandHandler(update.message)!;
    this.#from = buildUserHandler(update.message, 'from')!;
    this.#chat = buildChatHandler(update.message)!;
    if (update.message) {
      this.#message = update.message;
      this.#text = this.#message.text || '';
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

  get from(): UserHandler | undefined {
    return this.#from;
  }

  get chat(): ChatHandler {
    return this.#chat;
  }

  get command(): BotCommandHandler {
    return this.#command;
  }

  get message(): Message | undefined {
    return this.#message;
  }

  get update(): Update {
    return this.#update;
  }

  get text(): string {
    return this.#text;
  }

  get bot(): ZTelBot {
    return this.#bot;
  }
}

export default CommandEvent;
