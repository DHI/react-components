const accepts = (file: File, acceptedFiles: string | string[]) => {
  if (file && acceptedFiles) {
    const acceptedFilesArray = Array.isArray(acceptedFiles)
      ? acceptedFiles
      : acceptedFiles.split(',');
    const fileName = file.name || '';
    const mimeType = (file.type || '').toLowerCase();
    const baseMimeType = mimeType.replace(/\/.*$/, '');

    return acceptedFilesArray.some((type) => {
      const validType = type.trim().toLowerCase();
      if (validType.charAt(0) === '.') {
        return fileName.toLowerCase().endsWith(validType);
      }
      if (validType.endsWith('/*')) {
        // This is something like a image/* mime type
        return baseMimeType === validType.replace(/\/.*$/, '');
      }
      return mimeType === validType;
    });
  }
  return true;
};

const fileAccepted = (file: File, accept: string | string[]) =>
  file.type === 'application/x-moz-file' || accepts(file, accept);

const validateFiles = (
  transferFiles: File[],
  accept: string | string[] | undefined
) => {
  if (!accept) {
    return [transferFiles, []];
  }

  const rejectedFiles = [] as File[];
  let theFiles = transferFiles;

  theFiles.forEach((file) => {
    if (!fileAccepted(file, accept)) {
      theFiles = theFiles.filter((f) => file.name !== f.name);
      rejectedFiles.push(file);
    }
  });

  return [theFiles, rejectedFiles];
};

export { accepts, fileAccepted, validateFiles };
