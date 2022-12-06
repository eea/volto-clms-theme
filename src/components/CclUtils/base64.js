export const toBase64 = (value) => {
  return Buffer(value).toString('base64');
};

export const fromBase64 = (value) => {
  return Buffer(value).toString('ascii');
};
