import {
  Message,
  CallbackQuery,
  ChosenInlineResult,
  ShippingQuery,
  Poll,
  PollAnswer
} from '../index';

class Update {
  updateId!: number;
  message?: Message;
  editedMessage?: Message;
  channelPost?: Message;
  editedChannelPost?: Message;
  inlineQuery?: Message;
  chosenInlineResult?: ChosenInlineResult;
  callbackQuery?: CallbackQuery;
  shippingQuery?: ShippingQuery;
  poll?: Poll;
  pollAnswer?: PollAnswer;
}

export default Update;
