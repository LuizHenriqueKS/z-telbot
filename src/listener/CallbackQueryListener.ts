import { CallbackQueryEvent } from '..';

type CallbackQueryListener = (evt: CallbackQueryEvent) => void;

export default CallbackQueryListener;
