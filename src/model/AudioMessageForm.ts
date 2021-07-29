import {
  MessageEntity,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  ForceReply,
  ParseMode,
  InputFile
} from '../index';

class AudioMessageForm {
  chatId!: number | string;
  audio!: InputFile | string;
  duration?: number;
  width?: number;
  height?: number;
  thumb?: InputFile | string;
  caption?: string;
  parseMode?: ParseMode;
  captionEntities?: MessageEntity[];
  disableNotification?: boolean;
  allowSendingWithoutReply?: boolean;
  replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export default AudioMessageForm;
