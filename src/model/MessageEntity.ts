import {
  User
} from '../index';

class MessageEntity {
  type!: string;
  offset!: number;
  length!: number;
  url?: string;
  user?: User;
  language?: string;
}

export default MessageEntity;
