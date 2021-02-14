import {
  PhotoSize
} from '../index';

class Video {
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

export default Video;
