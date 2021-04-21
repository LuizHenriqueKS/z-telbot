import {
  Message,
  Update,
  ZTelBot,
  ZTelBotSender,
  ChatHandler,
  UserHandler,
  CallbackQuery
} from '..';
import buildChatHandler from '../util/buildChatHandler';
import buildUserHandler from '../util/buildUserHandler';

class CallbackQueryEvent {
  #bot: ZTelBot;
  #update: Update;
  #message: Message;
  #from: UserHandler;
  #chat: ChatHandler
  #data: string;
  #callbackQuery: CallbackQuery;
  #gameShortName: string;

  callbackQueryFound?: string;

  constructor(bot: ZTelBot, update: Update) {
    this.#bot = bot;
    this.#update = update;
    this.#from = buildUserHandler(update.callbackQuery!.message, 'from')!;
    this.#chat = buildChatHandler(update.callbackQuery!.message)!;
    this.#message = update.callbackQuery!.message!;
    this.#callbackQuery = update.callbackQuery!;
    this.#data = update.callbackQuery!.data!;
    this.#gameShortName = update.callbackQuery!.gameShortName!;
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

  get data(): string {
    return this.#data;
  }

  get callbackQuery(): CallbackQuery {
    return this.#callbackQuery;
  }

  get gameShortName(): string {
    return this.#gameShortName;
  }

  get from(): UserHandler | undefined {
    return this.#from;
  }

  get chat(): ChatHandler {
    return this.#chat;
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
}

export default CallbackQueryEvent;
