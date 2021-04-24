import {
  ForceReply,
  InlineKeyboardMarkup,
  InputFile,
  MessageEntity,
  ParseMode,
  ReplyKeyboardMarkup,
  ReplyKeyboardRemove
} from '..';

class SenderPhotoMessageForm {
  photo!: InputFile | string;
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

export default SenderPhotoMessageForm;
