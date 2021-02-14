import {
  KeyboardButton
} from '../index';

class ReplyKeyboardMarkup {
  keyboard!: KeyboardButton[][];
  resizeKeyboard?: boolean;
  oneTimeKeyboard?: boolean;
  selective?: boolean;
}

export default ReplyKeyboardMarkup;
