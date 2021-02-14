import { CommandEvent } from '..';

type CommandListener = (evt: CommandEvent) => void;

export default CommandListener;
