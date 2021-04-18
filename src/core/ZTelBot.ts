import {
  User,
  Update,
  Message,
  MessageForm,
  ZTelBotOptions,
  ZTelBotResponse,
  UpdateListener,
  SentMessageEvent,
  ZTelBotListenUpdatesOptions,
  TextMessageListener,
  InvalidResultException,
  UpdateForm,
  MessageListener,
  BotCommand
} from '..';

import axios from 'axios';
import smartFixCamelCase from '../util/smartFixCamelCase';
import smartFixSnakeCase from '../util/smartFixSnakeCase';
import SentMessageListener from '../listener/SentMessageListener';
import ZTelBotUpdateListener from './ZTelBotUpdateListener';
import CommandListener from '../listener/CommandListener';
import BotCommandInfo from '../model/BotCommandInfo';
import BotCommandForm from '../model/BotCommandForm';
import fireAllListeners from './fireAllListeners';

class ZTelBot {
  #me?: User;
  #listener?: ZTelBotUpdateListener;
  #options: ZTelBotOptions;
  #updateListeners: Map<number, UpdateListener>;
  #messageListeners: Map<number, MessageListener>;
  #sentMessageListeners: Map<number, SentMessageListener>;
  #textMessageListeners: Map<number, TextMessageListener>;
  #commandListeners: Map<number, BotCommandInfo>;
  #defaultCommandListeners: Map<number, CommandListener>;

  constructor(options: ZTelBotOptions) {
    this.#options = options;
    this.#updateListeners = new Map();
    this.#messageListeners = new Map();
    this.#sentMessageListeners = new Map();
    this.#textMessageListeners = new Map();
    this.#commandListeners = new Map();
    this.#defaultCommandListeners = new Map();
  }

  async request(methodName: string, data?: any): Promise<ZTelBotResponse> {
    const url = this.getMethodURL(methodName);
    let response;
    if (data) {
      response = await axios.post(url, data);
    } else {
      response = await axios.get(url);
    }
    return response.data;
  }

  addUpdateListener(listener: UpdateListener): number {
    return this.addListener(this.#updateListeners, listener);
  }

  addMessageListener(listener: MessageListener): number {
    return this.addListener(this.#messageListeners, listener);
  }

  addSentMessageListener(listener: SentMessageListener): number {
    return this.addListener(this.#sentMessageListeners, listener);
  }

  addTextMessageListener(listener: TextMessageListener): number {
    return this.addListener(this.#textMessageListeners, listener);
  }

  addDefaultCommandListener(listener: CommandListener): number {
    return this.addListener(this.#defaultCommandListeners, listener);
  }

  addCommandListener(command: BotCommandForm | string, listener: CommandListener) {
    let info: BotCommandInfo;
    const arg: any = command;
    if (typeof (command) === 'string') {
      info = {
        command: arg,
        hidden: false,
        description: '',
        listener
      };
    } else {
      info = {
        command: arg.command,
        hidden: arg.hidden || false,
        description: arg.description || '',
        listener
      };
    }
    const id = Math.random();
    this.#commandListeners.set(id, info);
    return id;
  }

  async sendCommands(extraCommands?: BotCommand[]): Promise<Boolean> {
    const commands: BotCommand[] = [];

    for (const cmd of this.#commandListeners.values()) {
      const command = cmd.command;
      const description = cmd.description;
      commands.push({ command, description });
    }

    if (extraCommands) {
      for (const cmd of extraCommands) {
        const command = cmd.command;
        const description = cmd.description;
        commands.push({ command, description });
      }
    }

    return this.setMyCommands(commands);
  }

  async setMyCommands(commands: BotCommand[]): Promise<Boolean> {
    const realCommands = [];
    for (const cmd of commands) {
      const command = cmd.command;
      const description = cmd.description || `Command ${cmd.command}`;
      realCommands.push({ command, description });
    }
    return await this.requestResult('setMyCommands', { commands: realCommands });
  }

  async getMyCommands(): Promise<BotCommand[]> {
    return await this.requestResult('getMyCommands');
  }

  removeUpdateListener(listenerId: number): boolean {
    return this.#updateListeners.delete(listenerId);
  }

  removeSentMessageListener(listenerId: number): boolean {
    return this.#sentMessageListeners.delete(listenerId);
  }

  removeMessageListener(listenerId: number): boolean {
    return this.#messageListeners.delete(listenerId);
  }

  removeTextMessageListener(listenerId: number): boolean {
    return this.#textMessageListeners.delete(listenerId);
  }

  removeDefaultCommandListener(listenerId: number): boolean {
    return this.#defaultCommandListeners.delete(listenerId);
  }

  removeCommandListener(listenerId: number): boolean {
    return this.#commandListeners.delete(listenerId);
  }

  async listenUpdates(options: ZTelBotListenUpdatesOptions = {}): Promise<User> {
    const me = await this.getMe();
    this.#me = me;
    this.#listener = new ZTelBotUpdateListener(this, options);
    this.#listener.startListen();
    return me;
  }

  async requestResult(methodName: string, data?: any): Promise<any> {
    const response = await this.request(methodName, data);
    const result = this.getResult(response);
    return result;
  }

  async sendMessage(message: MessageForm): Promise<Message> {
    const data = smartFixSnakeCase(message);
    const sentMessage = await this.requestResult('sendMessage', data);
    this.fireSentMessage(sentMessage);
    return sentMessage;
  }

  async getMe(): Promise<User> {
    return this.requestResult('getMe');
  }

  async getUpdates(options: UpdateForm = {}): Promise<Update[]> {
    return await this.requestResult('getUpdates', options);
  }

  fireUpdate(update: Update) {
    const bot = this;
    const updateListeners = this.#updateListeners;
    const messageListeners = this.#messageListeners;
    const sentMessageListeners = this.#sentMessageListeners;
    const textMessageListeners = this.#textMessageListeners;
    const commandListeners = this.#commandListeners;
    const defaultCommandListeners = this.#defaultCommandListeners;
    fireAllListeners({
      bot,
      me: this.#me!,
      update,
      updateListeners,
      messageListeners,
      sentMessageListeners,
      textMessageListeners,
      commandListeners,
      defaultCommandListeners
    });
  }

  fireUpdates(updates: Update[]) {
    for (const update of updates) {
      this.fireUpdate(update);
    }
  }

  getMethodURL(methodName: string): string {
    return `https://api.telegram.org/bot${this.token}/${methodName}`;
  }

  getResult(response: ZTelBotResponse): any {
    if (response.ok) {
      const result = response.result;
      return smartFixCamelCase(result);
    } else {
      throw new InvalidResultException(response.message);
    }
  }

  private fireSentMessage(message: Message) {
    for (const listener of this.#sentMessageListeners.values()) {
      listener(new SentMessageEvent(this, message));
    }
  }

  private addListener<T>(map: Map<number, T>, listener: T): number {
    const id = Math.random();
    map.set(id, listener);
    return id;
  }

  get token(): string {
    return this.#options.token;
  }
}

export default ZTelBot;
