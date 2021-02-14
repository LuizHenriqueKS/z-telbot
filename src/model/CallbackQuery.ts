import {
  User,
  Message
} from '../index';

class CallbackQuery {
  id!: string;
  from!: User;
  message?: Message;
  inlineMessageId?: string;
  chatInstance!: string;
  data?: string;
  gameShortName?: string;
}

export default CallbackQuery;
