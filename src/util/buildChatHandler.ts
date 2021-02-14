import { Message, ChatHandler } from '..';

function buildChatHandler(message?: Message): ChatHandler | undefined {
  if (message) {
    return new ChatHandler(message.chat);
  } else {
    return undefined;
  }
}

export default buildChatHandler;
