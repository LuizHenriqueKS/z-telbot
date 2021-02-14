import {
  PassportFile
} from '../index';

class EncryptedPassportElement {
  type!: string;
  data?: string;
  phoneNumber?: string;
  email?: string;
  files?: PassportFile[];
  frontSide?: PassportFile;
  reverseSide?: PassportFile;
  selfie?: PassportFile;
  translation?: PassportFile[];
  hash!: string;
}

export default EncryptedPassportElement;
