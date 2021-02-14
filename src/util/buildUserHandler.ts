import { Message, UserHandler } from '..';

function buildUserHandler(message: Message | undefined, property: string): UserHandler | undefined {
  if (message && message.from) {
    const args: any = message;
    return new UserHandler(args[property]);
  } else {
    return undefined;
  }
}

export default buildUserHandler;
