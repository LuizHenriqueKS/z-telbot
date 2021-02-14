import { Chat, ChatLocation, ChatPermissions, ChatPhoto, Message } from '..';

class ChatHandler {
  id!: number;
  type!: string;
  title?: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  photo?: ChatPhoto;
  bio?: string;
  description?: string;
  inviteLink?: string;
  pinnedMessage?: Message;
  permissions?: ChatPermissions;
  slowModeDelay?: number;
  stickerSetName?: string;
  canSetStickerSet?: boolean;
  linkedChatId?: number;
  location?: ChatLocation;

  constructor(chat: Chat) {
    this.id = chat.id;
    this.type = chat.type;
    this.title = chat.title;
    this.username = chat.username;
    this.firstName = chat.firstName;
    this.lastName = chat.lastName;
    this.photo = chat.photo;
    this.bio = chat.bio;
    this.description = chat.description;
    this.inviteLink = chat.inviteLink;
    this.pinnedMessage = chat.pinnedMessage;
    this.permissions = chat.permissions;
    this.slowModeDelay = chat.slowModeDelay;
    this.stickerSetName = chat.stickerSetName;
    this.canSetStickerSet = chat.canSetStickerSet;
    this.linkedChatId = chat.linkedChatId;
    this.location = chat.location;
  }

  get name() {
    if (this.title) {
      return this.title;
    } else if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    } else if (this.firstName) {
      return this.firstName;
    } else if (this.lastName) {
      return this.lastName;
    } else {
      return this.username;
    }
  }
}

export default ChatHandler;
