import {
  User,
  Chat,
  MessageEntity,
  Animation,
  Audio,
  Document,
  PhotoSize,
  Sticker,
  Video,
  VideoNote,
  Voice,
  Contact,
  Dice,
  Game,
  Poll,
  Venue,
  Location,
  Invoice,
  SuccessfulPayment,
  PassportData,
  ProximityAlertTriggered,
  InlineKeyboardMarkup
} from '../index';

class Message {
  messageId!: number;
  from?: User;
  senderChat?: Chat;
  date!: number;
  chat!: Chat;
  forwardFrom?: User;
  forwardFromChat?: Chat;
  forwardFromMessageId?: number;
  forwardSignature?: string;
  forwardSenderName?: string;
  forwardDate?: number;
  replyToMessage?: Message;
  viaBot?: User;
  editDate?: number;
  mediaGroupId?: string;
  authorSignature?: string;
  text?: string;
  entities?: MessageEntity[];
  animation?: Animation;
  audio?: Audio;
  document?: Document;
  photo?: PhotoSize[];
  sticker?: Sticker;
  video?: Video;
  videoNote?: VideoNote;
  voice?: Voice;
  caption?: string;
  captionEntities?: MessageEntity[];
  contact?: Contact;
  dice?: Dice;
  game?: Game;
  poll?: Poll;
  venue?: Venue;
  location?: Location;
  newChatMembers?: User[];
  leftChatMember?: User;
  newChatTitle?: string;
  newChatPhoto?: PhotoSize[];
  deleteChatPhoto?: boolean;
  groupChatCreated?: boolean;
  supergroupChatCreated?: boolean;
  channelChatCreated?: boolean;
  migrateToChatId?: number;
  migrateFromChatId?: number;
  pinnedMessage?: Message;
  invoice?: Invoice;
  successfulPayment?: SuccessfulPayment;
  connectedWebsite?: string;
  passportData?: PassportData;
  proximityAlertTriggered?: ProximityAlertTriggered;
  replyMarkup?: InlineKeyboardMarkup;
}

export default Message;
