import {
  User,
  Location
} from '../index';

class ChosenInlineResult {
  resultId!: string;
  from!: User;
  location?: Location;
  inlineMessageId?: string;
  query!: string;
}

export default ChosenInlineResult;
