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
    fireCallbackQueryListeners(attrs);
  } else {
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

function fireCallbackQueryListeners(attrs: FireAllListenersAttrs) {
  for (const listener of attrs.callbackQueryListeners.values()) {
    listener(new CallbackQueryEvent(attrs.bot, attrs.update));
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
