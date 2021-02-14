import { User } from '..';

class UserHandler {
  id!: number;
  isBot!: boolean;
  firstName!: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  canJoinGroups?: boolean;
  canReadAllGroupMessages?: boolean;
  supportsInlineQueries?: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.isBot = user.isBot;
    this.username = user.username;
    this.languageCode = user.languageCode;
    this.canJoinGroups = user.canJoinGroups;
    this.supportsInlineQueries = user.supportsInlineQueries;
    this.canReadAllGroupMessages = user.canReadAllGroupMessages;
  }

  get name() {
    if (this.firstName && this.lastName) {
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

export default UserHandler;
