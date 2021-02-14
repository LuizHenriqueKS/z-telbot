import {
  MessageEntity,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  ForceReply,
  ParseMode
} from '../index';

class MessageForm {
  chatId!: number | string;
  text!: string;
  parseMode?: ParseMode;
  entities?: MessageEntity[];
  disableWebPagePreview?: boolean;
  disableNotification?: boolean;
  replyToMessageId?: number;
  allowSendingWithoutReply?: boolean;
  replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export default MessageForm;
