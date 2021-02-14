import { ZTelBot } from '../src/';
import getApiToken from './util/getApiToken';

const telBot = new ZTelBot({ token: getApiToken() });

telBot.addTextMessageListener(evt => {
  console.log(`[${evt.chat.name} (ID: ${evt.chat.id})] ${evt.from?.name}(ID: ${evt.from?.id}): ${evt.message?.text}`);
});

telBot.addCommandListener('hi', evt => {
  evt.reply().text({ text: `Hi: ${evt.command.argsText}` });
});

telBot.addDefaultCommandListener(evt => {
  if (!evt.commandFound) {
    evt.reply().text({ text: `Comando inválido: ${evt.command.commandName}` });
  }
});

telBot.listenUpdates().then((botInfo) => {
  console.log(`Bot iniciado com sucesso: ${botInfo.username}`);
});
