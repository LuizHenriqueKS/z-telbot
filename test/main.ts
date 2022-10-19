import { EditMessageTextForm, fileFromPath, InlineKeyboardMarkup, MessageForm, ZTelBot } from '../src/';
import getApiToken from './util/getApiToken';
import path from 'path';
import fs from 'fs';

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

telBot.addCommandListener('img', async (evt) => {
  evt.reply().photo({ photo: 'https://media.giphy.com/media/xUPGcqaVH1cDeKZTBS/giphy.gif' });
});

telBot.addCommandListener('gif', async (evt) => {
  evt.reply().animation({ animation: 'https://media.giphy.com/media/xUPGcqaVH1cDeKZTBS/giphy.gif' });
});

telBot.addCommandListener('audio', evt => {
  evt.reply().audio({ audio: fileFromPath(path.resolve('./test/resources/test.mp3')), caption: 'Áudio enviado' });
});

telBot.addCommandListener('download_audio', async evt => {
  const fileId = evt.message!.replyToMessage!.audio!.fileId;
  const file = await telBot.downloadFileById(fileId);
  evt.reply().text(fs.readFileSync(file) ? 'Downloaded' : 'Download failed');
});

telBot.addCommandListener('ping', async (evt) => {
  await evt.reply().text('Ping');
});

telBot.addCommandListener('delete', async (evt) => {
  const result = await telBot.deleteMessage(evt.message!.replyToMessage!);
  console.log(result);
});

telBot.addCommandListener('show_audio_info', async (evt) => {
  const fileId = evt.message!.replyToMessage!.audio!.fileId;
  if (typeof (fileId) === 'string') {
    const fileInfo = await telBot.getFile(fileId);
    let text = '';
    for (const key of Object.keys(fileInfo)) {
      text += `<b>${key}</b>: ${fileInfo[key]}\r\n`;
    }
    evt.reply().text({ text: text.trim(), parseMode: 'HTML' });
  } else {
    evt.reply().text('Arquivo não encontrado');
  }
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
    chatId: receivedMessage!.chat.id || 0,
    text: 'Escolha uma <b>opção</b>:',
    parseMode: 'HTML',
    replyToMessageId: receivedMessage!.messageId,
    replyMarkup
  };
  await telBot.sendMessage(message);
});

telBot.addCallbackQueryListener('x', evt => {
  const msg: EditMessageTextForm = {
    chatId: evt.chat.id,
    messageId: evt.message!.messageId,
    text: 'Opção escolhida: 1'
  };
  telBot.editMessageText(msg);
  evt.answerCallbackQuery('Opção escolhida: 1');
});

telBot.addDefaultCallbackQueryListener(evt => {
  if (!evt.callbackQueryFound) {
    evt.reply().text(`Opção escolhida: ${evt.data}`);
    evt.answerCallbackQuery({
      text: `Opção escolhida: ${evt.data}`,
      showAlert: true
    });
  }
});

telBot.sendCommands().then();

telBot.listenUpdates({ skipFirstBatch: true }).then((botInfo) => {
  console.log(`Bot iniciado com sucesso: ${botInfo.username}`);
}).catch(err => {
  console.error(err);
});
