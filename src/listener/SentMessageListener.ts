import { SentMessageEvent } from '..';

type SentMessageListener = (evt: SentMessageEvent) => void;

export default SentMessageListener;
