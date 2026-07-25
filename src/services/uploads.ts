export const uploadFile = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`https://storage.powerchain.network/mock/${file.name}`);
    }, 1000);
  });
};
