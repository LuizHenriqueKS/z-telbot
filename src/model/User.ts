class User {
  id!: number;
  isBot!: boolean;
  firstName!: string;
  lastName?: string;
  username?: string;
  languageCode?: string;
  canJoinGroups?: boolean;
  canReadAllGroupMessages?: boolean;
  supportsInlineQueries?: boolean;
};

export default User;
