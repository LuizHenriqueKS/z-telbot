import {
  ChatPhoto,
  Message,
  ChatPermissions,
  ChatLocation
} from '../index';

class Chat {
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
}

export default Chat;
