import { BotCommand, Message, ZTelBot, fileFromPath } from '../../src';
import getApiToken from '../util/getApiToken';
import path from 'path';

it('should get info of bot', async () => {
  const telBot = new ZTelBot({ token: getApiToken() });
  const response = await telBot.getMe();
  expect(response.username).toMatch(/bot/gi);
  expect(response).toHaveProperty('firstName');
});

it('should get updates of bot', async () => {
  const telBot = new ZTelBot({ token: getApiToken() });
  await telBot.getUpdates();
});

it('should send a message', async () => {
  const telBot = new ZTelBot({ token: getApiToken() });
  const message = await telBot.sendMessage({
    chatId: process.env.TEST_CHAT_ID || '',
    text: 'Teste'
  });
  expect(message).toHaveProperty('text');
});

it('should send an audio', async () => {
  const telBot = new ZTelBot({ token: getApiToken() });
  const message = await telBot.sendAudio({
    chatId: process.env.TEST_CHAT_ID || '',
    audio: fileFromPath(path.resolve('./test/resources/test.mp3'))
  });
  expect(message).toBeDefined();
});

it('should send a javascript code', async () => {
  const telBot = new ZTelBot({ token: getApiToken() });
  const message = await telBot.sendMessage({
    chatId: process.env.TEST_CHAT_ID || '',
    text: '```javascript\r\nconsole.log("Hello world");\r\n```',
    parseMode: 'MarkdownV2'
  });
  expect(message).toHaveProperty('text');
});

it('should listen a sent message', async () => {
  const telBot = new ZTelBot({ token: getApiToken() });
  const text = '2 + 2 + 0';
  let result: Message = new Message();
  telBot.addSentMessageListener(evt => {
    result = evt.message || result;
  });
  await telBot.sendMessage({
    chatId: process.env.TEST_CHAT_ID || '',
    text
  });
  expect(result.text).toBe(text);
});

it('should set and get my commands', async () => {
  const telBot = new ZTelBot({ token: getApiToken() });
  const commands: BotCommand[] = [
    {
      command: 'hi',
      description: 'Send hi'
    },
    {
      command: 'test',
      description: 'test some thing'
    }
  ];
  const response = await telBot.setMyCommands(commands);
  const myCommands = await telBot.getMyCommands();
  expect(response).toBeTruthy();
  expect(commands).toStrictEqual(myCommands);
});
