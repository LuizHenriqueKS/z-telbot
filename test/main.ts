import { InlineKeyboardMarkup, MessageForm, ParseMode, ZTelBot } from '../src/';
import getApiToken from './util/getApiToken';

const telBot = new ZTelBot({ token: getApiToken() });

telBot.addTextMessageListener(evt => {
  console.log(`[${evt.chat.name} (ID: ${evt.chat.id})] ${evt.from?.name}(ID: ${evt.from?.id}): ${evt.message?.text}`);
});

telBot.addCommandListener({ command: 'out', description: 'Send a hi for you' }, async (evt) => {
  await evt.reply().text('Out');
});

telBot.addCommandListener({ command: 'hi', description: 'Send a hi for you' }, async (evt) => {
  await evt.reply().text({ text: `Hi: ${evt.command.argsText}` });
});

telBot.addCommandListener('ping', async (evt) => {
  await evt.reply().text('Ping');
});

telBot.addDefaultCommandListener(async (evt) => {
  if (!evt.commandFound) {
    await evt.reply().text({ text: `Comando inválido: ${evt.command.commandName}` });
  }
});

telBot.addCommandListener('options', async (evt) => {
  const receivedMessage = evt.message;
  const replyMarkup: InlineKeyboardMarkup = {
    inlineKeyboard: [
      [
        { text: 'X', callbackData: 'x' },
        { text: 'O', callbackData: 'o' }
      ]
    ]
  };
  const message: MessageForm = {
    chatId: receivedMessage.chat.id || 0,
    text: 'Escolha uma <b>opção</b>:',
    parseMode: ParseMode.HTML,
    replyToMessageId: receivedMessage.messageId,
    replyMarkup
  };
  await telBot.sendMessage(message);
});

telBot.sendCommands().then();

telBot.listenUpdates({ skipFirstBatch: true }).then((botInfo) => {
  console.log(`Bot iniciado com sucesso: ${botInfo.username}`);
});
