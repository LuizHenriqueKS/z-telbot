import {
  AnimationMessageForm, AnswerCallbackQueryForm, AudioMessageForm, BotCommand,
  EditMessageTextForm, FileInfo, FileNotAvailableForDownloadError, InvalidResultException, Message,
  MessageForm, MessageListener, PhotoMessageForm, SentMessageEvent, TextMessageListener, Update, UpdateForm, UpdateListener, User, ZTelBotListenUpdatesOptions, ZTelBotOptions,
  ZTelBotResponse, DocumentMessageForm
} from '..';

import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import tmp from 'tmp';
import CallbackQueryListener from '../listener/CallbackQueryListener';
import CommandListener from '../listener/CommandListener';
import SentMessageListener from '../listener/SentMessageListener';
import BotCallbackQueryInfo from '../model/BotCallbackQueryInfo';
import BotCommandForm from '../model/BotCommandForm';
import BotCommandInfo from '../model/BotCommandInfo';
import smartFixCamelCase from '../util/smartFixCamelCase';
import smartFixSnakeCase from '../util/smartFixSnakeCase';
import fireAllListeners from './fireAllListeners';
import ZTelBotUpdateListener from './ZTelBotUpdateListener';
// import FormData from 'form-data';

const FormData = require('form-data');

class ZTelBot {
  #me?: User;
  #listener?: ZTelBotUpdateListener;
  #options: ZTelBotOptions;
  #updateListeners: Map<number, UpdateListener>;
  #messageListeners: Map<number, MessageListener>;
  #sentMessageListeners: Map<number, SentMessageListener>;
  #textMessageListeners: Map<number, TextMessageListener>;
  #commandListeners: Map<number, BotCommandInfo>;
  #callbackQueryListeners: Map<number, BotCallbackQueryInfo>;
  #defaultCallbackQueryListeners: Map<number, CallbackQueryListener>;
  #defaultCommandListeners: Map<number, CommandListener>;

  constructor(options: ZTelBotOptions) {
    this.#options = options;
    this.#updateListeners = new Map();
    this.#messageListeners = new Map();
    this.#sentMessageListeners = new Map();
    this.#textMessageListeners = new Map();
    this.#commandListeners = new Map();
    this.#callbackQueryListeners = new Map();
    this.#defaultCallbackQueryListeners = new Map();
    this.#defaultCommandListeners = new Map();
  }

  async request(methodName: string, data?: any, formData?: boolean): Promise<ZTelBotResponse> {
    const url = this.getMethodURL(methodName);
    let response;
    // console.log(url, data, formData);
    if (formData) {
      const fdata = await this.createFormData(data);
      response = await fetch(url, { method: 'POST', body: fdata });
    } else if (data) {
      response = await fetch(url, { method: 'POST', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } });
    } else {
      response = await fetch(url);
    }
    return response.json();
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

  addDefaultCallbackQueryListener(listener: CallbackQueryListener): number {
    return this.addListener(this.#defaultCallbackQueryListeners, listener);
  }

  addDefaultCommandListener(listener: CommandListener): number {
    return this.addListener(this.#defaultCommandListeners, listener);
  }

  addCallbackQueryListener(data: string, listener: CallbackQueryListener) {
    const info: BotCallbackQueryInfo = {
      data,
      listener
    };
    const id = Math.random();
    this.#callbackQueryListeners.set(id, info);
    return id;
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

  removeDefaultCallbackQueryListener(listenerId: number): boolean {
    return this.#defaultCallbackQueryListeners.delete(listenerId);
  }

  removeDefaultCommandListener(listenerId: number): boolean {
    return this.#defaultCommandListeners.delete(listenerId);
  }

  removeCommandListener(listenerId: number): boolean {
    return this.#commandListeners.delete(listenerId);
  }

  removeCallbackQueryListener(listenerId: number): boolean {
    return this.#callbackQueryListeners.delete(listenerId);
  }

  async listenUpdates(options: ZTelBotListenUpdatesOptions = {}): Promise<User> {
    const me = await this.getMe();
    this.#me = me;
    this.#listener = new ZTelBotUpdateListener(this, options);
    this.#listener.startListen();
    return me;
  }

  async requestResult(methodName: string, data?: any, formData?: boolean): Promise<any> {
    const response = await this.request(methodName, data, formData);
    const result = this.getResult(response);
    return result;
  }

  async sendMessage(message: MessageForm): Promise<Message> {
    const data = smartFixSnakeCase(message);
    const sentMessage = await this.requestResult('sendMessage', data);
    this.fireSentMessage(sentMessage);
    return sentMessage;
  }

  async sendAudio(message: AudioMessageForm): Promise<Message> {
    const data = smartFixSnakeCase(message);
    const sentMessage = await this.requestResult('sendAudio', data, true);
    this.fireSentMessage(sentMessage);
    return sentMessage;
  }

  async deleteMessageByIds(chatId: number, messageId: number): Promise<boolean> {
    const data = smartFixSnakeCase({ chatId, messageId });
    return await this.requestResult('deleteMessage', data);
  }

  async deleteMessage(message: Message): Promise<boolean> {
    const chatId = message.chat.id;
    const messageId = message.messageId;
    return await this.deleteMessageByIds(chatId, messageId);
  }

  async getFile(fileId: string): Promise<FileInfo> {
    const data = smartFixSnakeCase({ fileId });
    const file = await this.requestResult('getFile', data);
    return file;
  }

  async downloadFile(fileInfo: FileInfo, destFile?: string): Promise<string> {
    if (fileInfo.filePath) {
      const url = `https://api.telegram.org/file/bot${this.token}/${fileInfo.filePath}`;
      const response = await fetch(url);
      const realFile = this.getRealFile(destFile, path.basename(fileInfo.filePath));
      const writer = fs.createWriteStream(realFile);
      response.body.pipe(writer);
      let error: any = null;
      return new Promise((resolve, reject) => {
        writer.on('error', err => {
          error = err;
          writer.close();
          reject(err);
        });
        writer.on('close', () => {
          if (!error) {
            resolve(realFile);
          }
        });
      });
    } else {
      throw new FileNotAvailableForDownloadError();
    }
  }

  async downloadFileById(fileId: string, destFile?: string): Promise<string> {
    const fileInfo = await this.getFile(fileId);
    return await this.downloadFile(fileInfo, destFile);
  }

  async sendPhoto(message: PhotoMessageForm): Promise<Message> {
    const data = smartFixSnakeCase(message);
    const sentMessage = await this.requestResult('sendPhoto', data, true);
    this.fireSentMessage(sentMessage);
    return sentMessage;
  }

  async sendDocument(message: DocumentMessageForm): Promise<Message> {
    const data = smartFixSnakeCase(message);
    const sentMessage = await this.requestResult('sendDocument', data, true);
    this.fireSentMessage(sentMessage);
    return sentMessage;
  }

  async sendAnimation(message: AnimationMessageForm): Promise<Message> {
    const data = smartFixSnakeCase(message);
    const sentMessage = await this.requestResult('sendAnimation', data, true);
    this.fireSentMessage(sentMessage);
    return sentMessage;
  }

  async editMessageText(message: EditMessageTextForm): Promise<Message> {
    const data = smartFixSnakeCase(message);
    const sentMessage = await this.requestResult('editMessageText', data);
    this.fireSentMessage(sentMessage);
    return sentMessage;
  }

  async answerCallbackQuery(answer: AnswerCallbackQueryForm): Promise<boolean> {
    const data = smartFixSnakeCase(answer);
    return await this.requestResult('answerCallbackQuery', data);
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
    const callbackQueryListeners = this.#callbackQueryListeners;
    const defaultCallbackQueryListeners = this.#defaultCallbackQueryListeners;
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
      callbackQueryListeners,
      defaultCallbackQueryListeners,
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
      throw new InvalidResultException(response);
    }
  }

  private getRealFile(destFile: string | undefined, basename: string): string {
    if (destFile) {
      return destFile;
    } else {
      const dir = tmp.dirSync();
      return path.join(dir.name, basename);
    }
  }

  private async createFormData(data: any): Promise<any> {
    const result = new FormData();
    for (const key of Object.keys(data)) {
      if (data[key] && data[key].path) {
        const file = fs.createReadStream((data[key].path as string));
        result.append(key, file, data[key].name);
      } else {
        result.append(key, data[key]);
      }
    }
    return result;
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
