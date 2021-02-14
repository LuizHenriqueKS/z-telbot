import { BotCommandHandler, Message } from '..';

function buildBotCommandHandler(message?: Message): BotCommandHandler | undefined {
  if (message) {
    return new BotCommandHandler(message);
  }
  return undefined;
}

export default buildBotCommandHandler;
