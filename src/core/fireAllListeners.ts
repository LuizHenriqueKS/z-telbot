import FireAllListenersAttrs from './FireAllListenersAttrs';
import BotCommandInfo from '../model/BotCommandInfo';
import CallbackQueryEvent from '../event/CallbackQueryEvent';

import {
  UpdateEvent,
  CommandEvent,
  MessageEvent,
  TextMessageEvent,
  BotCommandHandler
} from '..';

export default function fireAllListeners(attrs: FireAllListenersAttrs) {
  fireUpdateListeners(attrs);
  if (attrs.update.callbackQuery) {
    const callbackEvt = new CallbackQueryEvent(attrs.bot, attrs.update);
    fireCallbackQueryListeners(attrs, callbackEvt);
    fireDefaultCallbackQueryListeners(attrs, callbackEvt);
  } else if (attrs.update.message) {
    const cmdEvt = new CommandEvent(attrs.bot, attrs.update);
    fireCommandListeners(attrs, cmdEvt);
    fireDefaultCommandListeners(attrs, cmdEvt);
    fireMessageListeners(attrs, cmdEvt);
    fireTextMessageListeners(attrs, cmdEvt);
  }
};

function fireUpdateListeners(attrs: FireAllListenersAttrs) {
  for (const listener of attrs.updateListeners.values()) {
    listener(new UpdateEvent(attrs.bot, attrs.update));
  }
}

function fireCallbackQueryListeners(attrs: FireAllListenersAttrs, callEvt: CallbackQueryEvent) {
  for (const listener of attrs.callbackQueryListeners.values()) {
    if (callEvt.callbackQuery.data && callEvt.callbackQuery.data === listener.data) {
      listener.listener(callEvt);
      callEvt.callbackQueryFound = callEvt.data;
    }
  }
}

function fireDefaultCallbackQueryListeners(attrs: FireAllListenersAttrs, callEvt: CallbackQueryEvent) {
  for (const listener of attrs.defaultCallbackQueryListeners.values()) {
    listener(callEvt);
  }
}

function fireCommandListeners(attrs: FireAllListenersAttrs, cmdEvt: CommandEvent) {
  if (cmdEvt.command) {
    for (const listener of attrs.commandListeners.values()) {
      if (isToThisBot(attrs, cmdEvt.command)) {
        if (isThisCommand(cmdEvt.command, listener)) {
          listener.listener(cmdEvt);
          cmdEvt.commandFound = cmdEvt.command?.commandName;
        }
      }
    }
  }
}

function fireDefaultCommandListeners(attrs: FireAllListenersAttrs, cmdEvt: CommandEvent) {
  for (const listener of attrs.defaultCommandListeners.values()) {
    if (cmdEvt.command.isValid) {
      listener(cmdEvt);
    }
  }
}

function fireMessageListeners(attrs: FireAllListenersAttrs, cmdEvt: CommandEvent) {
  for (const listener of attrs.messageListeners.values()) {
    listener(new MessageEvent(attrs.bot, attrs.update, cmdEvt.commandFound));
  }
}

function fireTextMessageListeners(attrs: FireAllListenersAttrs, cmdEvt: CommandEvent) {
  if (attrs.update.message && attrs.update.message.text) {
    for (const listener of attrs.textMessageListeners.values()) {
      listener(new TextMessageEvent(attrs.bot, attrs.update, cmdEvt.commandFound));
    }
  }
}

function isToThisBot(attrs: FireAllListenersAttrs, command: BotCommandHandler) {
  return command.botName.toLowerCase() === attrs.me.username?.toLowerCase() || command.botName === '';
}

function isThisCommand(command: BotCommandHandler, listener: BotCommandInfo) {
  return command.commandName.toLowerCase() === listener.command.toLowerCase();
}
