import {
  PhotoSize
} from '../index';

class Animation {
  fileId!: string;
  fileUniqueId!: string;
  width!: number;
  height!: number;
  duration!: number;
  thumb?: PhotoSize;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
}

export default Animation;
