import {
  PhotoSize,
  MaskPosition
} from '../index';

class Sticker {
  fileId!: string;
  fileUniqueId!: string;
  width!: number;
  height!: number;
  isAnimated!: boolean;
  thumb?: PhotoSize;
  emoji?: string;
  setName?: string;
  maskPosition?: MaskPosition;
  fileSize?: number;
}

export default Sticker;
