import UpdateListener from '../listener/UpdateListener';
import MessageListener from '../listener/MessageListener';
import SentMessageListener from '../listener/SentMessageListener';
import TextMessageListener from '../listener/TextMessageListener';
import BotCommandInfo from '../model/BotCommandInfo';
import { ZTelBot, Update, User, CommandListener } from '..';

class FireAllListenersAttrs {
  bot!: ZTelBot;
  update!: Update;
  me!: User;
  updateListeners!: Map<number, UpdateListener>;
  messageListeners!: Map<number, MessageListener>;
  sentMessageListeners!: Map<number, SentMessageListener>;
  textMessageListeners!: Map<number, TextMessageListener>;
  commandListeners!: Map<number, BotCommandInfo>;
  defaultCommandListeners!: Map<number, CommandListener>;
}

export default FireAllListenersAttrs;
