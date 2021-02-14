import {
  KeyboardButtonPollType
} from '../index';

class KeyboardButton {
  text?: string;
  requestContact?: boolean;
  requestLocation?: boolean;
  requestPoll?: KeyboardButtonPollType;
}

export default KeyboardButton;
