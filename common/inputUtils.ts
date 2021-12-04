import { readFile, PathOrFileDescriptor } from 'fs';

function readFullFile(dir: PathOrFileDescriptor, filename: PathOrFileDescriptor): Promise<string> {
  return new Promise((resolve, reject) => {
    readFile(dir + '/' + filename, function (err, data) {
      if (err) {
          reject(console.error(err));
      }
      resolve(data.toString());
    });
  });
};

export async function readFullFileNumbers(dir: PathOrFileDescriptor, filename: PathOrFileDescriptor = 'input') {
  const data = await readFullFile(dir, filename);
  return data.split('\n').slice(0, -1).map(Number);
}