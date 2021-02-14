import {
  LoginUrl,
  CallbackGame
} from '../index';

class InlineKeyboardButton {
  text!: string;
  url?: string;
  loginUrl?: LoginUrl;
  callbackData?: string;
  switchInlineQuery?: string;
  switchInlineQueryCurrentChat?: string;
  callbackGame?: CallbackGame;
  pay?: boolean;
}

export default InlineKeyboardButton;
