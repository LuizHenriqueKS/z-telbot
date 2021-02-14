# z-telbot
Client for telegram bots

# Installation

```
npm i z-telbot
```

# Usage

### Javascript

```javascript
const { ZTelBot } = require('z-telbot');
```

### Typescript
```typescript
import { ZTelBot } from 'z-telbot';
```

# Example

```javascript
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

```

# Summary

[constructor](#constructor)
[getMe](#getMe)
[getUpdates](#getUpdates)
[sendMessage](#sendMessage)
[listenUpdates](#listenUpdates)
[addUpdateListener](#addUpdateListener)
[addMessageListener](#addMessageListener)
[addSentMessageListener](#addSentMessageListener)
[addTextMessageListener](#addTextMessageListener)
[addDefaultCommandListener](#addDefaultCommandListener)
[addCommandListener](#addCommandListener)
[removeUpdateListener](#removeListener)
[removeSentMessageListener](#removeListener)
[removeMessageListener](#removeListener)
[removeTextMessageListener](#removeListener)
[removeDefaultCommandListener](#removeListener)
[removeCommandListener](#removeListener)
[sendCommands](#sendCommands)
[setMyCommands](#setMyCommands)
[getMyCommands](#getMyCommands)

# constructor

```javascript
const telBot = new ZTelBot({token: '...'});
```

Parameters:
```typescript
{
  token!: string;
}
```

# getMe

```javascript
const botInfo = await telBot.getMe();
console.log(botInfo);
```

# getUpdates

```javascript
const updates = await telBot.getUpdates();
console.log(updates);
```

Parameters:
```typescript
{
  offset?: number;
  limit?: number;
  timeout?: number;
  allowedUpdates?: string[];
}
```

# sendMessage

```javascript
const messageInfo = telBot.sendMessage({text: 'Oi', chatId: 1234, parseMode: 'MarkdownV2'});
console.log(messageInfo);
```

Parameters:
```typescript
{
  chatId!: number | string;
  text!: string;
  parseMode?: ParseMode;
  entities?: MessageEntity[];
  disableWebPagePreview?: boolean;
  disableNotification?: boolean;
  replyToMessageId?: number;
  allowSendingWithoutReply?: boolean;
  replyMarkup?: InlineKeyboardMarkup | ReplyKeyboardMarkup | ReplyKeyboardRemove | ForceReply;
}
```

# listenUpdates

```javascript
telBot.listenUpdates().then((botInfo) => {
  console.log(`Bot iniciado com sucesso: ${botInfo.username}`);
});
```

Parameters:
```typescript
{
  once?: boolean;
  offset?: number;
  limit?: number;
  timeout?: number;
  allowedUpdates?: string[];
  skipFirstBatch?: boolean;
  delay?: number;
}
```

# addUpdateListener

```javascript
telBot.addUpdateListener((evt)=>{
  console.log(evt);
});
```

# addMessageListener

```javascript
telBot.addMessageListener((evt)=>{
  console.log(evt);
});
```

# addSentMessageListener

```javascript
telBot.addSentMessageListener((evt)=>{
  console.log(evt);
});
```

# addTextMessageListener

```javascript
telBot.addSentMessageListener((evt)=>{
  console.log(evt.text);
});
```

# addDefaultCommandListener

```javascript
telBot.addCommandListener('hi', (evt)=>{
  evt.reply().text({text: 'Hi'});
});

telBot.addDefaultCommandListener((evt)=>{
  if (!evt.commandFound){
    evt.reply().text({text: `Invalid command: ${evt.command.commandName}`});
  }
});
```

# addCommandListener

```javascript
telBot.addCommandListener('hi', (evt)=>{
  evt.reply().text({text: 'Hi'});
});
```

```javascript
const cmd = {command: 'hi', description: 'Send hi'};
telBot.addCommandListener(cmd, (evt)=>{
  evt.reply().text({text: 'Hi'});
});
```

Parameters:
```typescript
{
  command!: string;
  hidden?: boolean;
  description?: string;
}
```

# sendCommands

```typescript
telBot.addCommandListener('test', (evt)=>{
  evt.reply().text({text: 'Test'});
}

const cmd = {command: 'hi', description: 'Send hi'};
telBot.addCommandListener(cmd, (evt)=>{
  evt.reply().text({text: 'Hi'});
});

telBot.sendCommands();
```

```typescript
telBot.addCommandListener('hi', (evt)=>{
  evt.reply().text({text: 'Hi'});
});

telBot.addDefaultCommandListener((evt)=>{
  if (evt.command.commandName==='test'){
    evt.reply().text({text: 'Test'});
  }
});

telBot.sendCommands([{command: 'test', description: 'Test'}]);
```

# removeListener

```typescript
const listenerId = telBot.addCommandListener('test', (evt)=>{
  evt.reply().text({text: 'Test'});
});
telBot.removeCommandListener(listenerId);
```
# getMyCommands

```typescript
const commands: BotCommand[] = await telBot.getMyCommands();
console.log(commands);
```

# setMyCommands

```typescript
telBot.setMyCommands([{
  command: 'hi'
  description: 'Send hi'
}]);
```
