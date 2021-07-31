import InputFile from '../model/InputFile';
import InputFilePath from '../model/InputFilePath';
import p from 'path';

function fileFromPath(path: string, name?: string): InputFile {
  name = name || p.basename(path);
  const result: InputFilePath = {
    path,
    name
  };
  return result;
}

export default fileFromPath;
