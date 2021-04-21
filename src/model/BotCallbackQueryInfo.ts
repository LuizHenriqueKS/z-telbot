import CallbackQueryEvent from '../event/CallbackQueryEvent';

class BotCallbackQueryInfo {
  data!: string;
  listener!: (evt: CallbackQueryEvent) => void;
}

export default BotCallbackQueryInfo;
