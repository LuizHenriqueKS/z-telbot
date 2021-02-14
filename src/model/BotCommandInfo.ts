import CommandEvent from '../event/CommandEvent';

class BotCommandInfo {
  command!: string;
  hidden!: boolean;
  description!: string;
  listener!: (evt: CommandEvent) => void;
}

export default BotCommandInfo;
