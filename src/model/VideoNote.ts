import {
  PhotoSize
} from '../index';

class VideoNote {
  fileId!: string;
  fileUniqueId!: string;
  length!: number;
  duration!: number;
  thumb?: PhotoSize;
  fileSize?: number;
}

export default VideoNote;
