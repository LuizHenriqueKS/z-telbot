import {
  EncryptedPassportElement,
  EncryptedCredentials
} from '../index';

class PassportData {
  data!: EncryptedPassportElement[];
  credentials!: EncryptedCredentials;
}

export default PassportData;
