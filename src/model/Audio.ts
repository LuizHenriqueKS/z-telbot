import {
  PhotoSize
} from '../index';

class Audio {
  fileId!: string;
  fileUniqueId!: string;
  duration!: number;
  performer?: string;
  title?: string;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
  thumb?: PhotoSize;
}

export default Audio;
