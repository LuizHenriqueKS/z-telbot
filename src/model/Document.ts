import {
  PhotoSize
} from '../index';

class Document {
  fileId!: string;
  fileUniqueId!: string;
  thumb?: PhotoSize;
  fileName?: string;
  mimeType?: string;
  fileSize?: number;
}

export default Document;
