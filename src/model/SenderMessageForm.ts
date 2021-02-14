import {
  ForceReply,
  InlineKeyboardMarkup,
  MessageEntity,
  ParseMode,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove
} from '..';

class SenderMessageForm {
  text!: string;
  parseMode?: ParseMode;
  entities?: MessageEntity[];
  disableWebPagePreview?: boolean;
  disableNotification?: boolean;
  allowSendingWithoutReply?: boolean;
  replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export default SenderMessageForm;
