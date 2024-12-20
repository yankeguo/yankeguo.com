export const encodeBase64 = (buf: ArrayBufferLike | Uint8Array): string => {
  let binary = "";
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  for (let i = 0, len = bytes.length; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};
