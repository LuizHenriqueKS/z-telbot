import InputFile from '../model/InputFile';
import InputFilePath from '../model/InputFilePath';

function fileFromPath(path: string): InputFile {
  const result: InputFilePath = {
    path
  };
  return result;
}

export default fileFromPath;
