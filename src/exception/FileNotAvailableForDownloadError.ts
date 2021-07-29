class FileNotAvailableForDownloadError extends Error {
  constructor() {
    super('File not available for download');
  }
}

export default FileNotAvailableForDownloadError;
