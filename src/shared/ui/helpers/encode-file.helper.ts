/**
 * Encodes a file as a base64 string, suitable for sending to the API
 * @param file a File object
 * @returns The encoded file data
 */
export function encodeFile(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve((reader.result as string).split(",")[1]);
    reader.readAsDataURL(file);
  });
}

