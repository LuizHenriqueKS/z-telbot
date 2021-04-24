import {
  MessageEntity,
  InlineKeyboardMarkup,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove,
  ForceReply,
  ParseMode,
  InputFile
} from '../index';

class AnimationMessageForm {
  chatId!: number | string;
  animation!: InputFile | string;
  duration?: number;
  width?: number;
  height?: number;
  thumb?: InputFile | string;
  caption?: string;
  parseMode?: ParseMode;
  captionEntities?: MessageEntity[];
  disableNotification?: boolean;
  replyToMessageId?: number;
  allowSendingWithoutReply?: boolean;
  replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export default AnimationMessageForm;
