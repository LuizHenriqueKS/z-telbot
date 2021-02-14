import {
  PhotoSize,
  MessageEntity,
  Animation
} from '../index';

class Game {
  title!: string;
  description!: string;
  photo!: PhotoSize[];
  text?: string;
  textEntities?: MessageEntity[];
  animation?: Animation;
}

export default Game;
