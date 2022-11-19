import {
  ForceReply, InlineKeyboardMarkup, InputFile, MessageEntity, ParseMode, ReplyKeyboardMarkup,
  ReplyKeyboardRemove
} from '../index';

class DocumentMessageForm {
  chatId!: number | string;
  document!: InputFile | string;
  caption?: string;
  parseMode?: ParseMode;
  captionEntities?: MessageEntity[];
  disableNotification?: boolean;
  replyToMessageId?: number;
  allowSendingWithoutReply?: boolean;
  replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}

export default DocumentMessageForm;
