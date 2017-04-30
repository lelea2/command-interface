import { Glob } from 'glob';
import { fs, fsPath } from './libs';


/**
 * Matches the given glob pattern as a promise.
 */
export function glob(pattern: string): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    new Glob(pattern, {}, (err, matches) => { // tslint:disable-line
      if (err) {
        reject(err);
      } else {
        resolve(matches);
      }
    });
  });
}



/**
 * Walks up the folder tree looking for the given file.
 */
export async function findClosestAncestor(startDir: string, fileName: string) {
  const find = async (dir: string): Promise<string | undefined> => {
    if (!dir || dir === '/') { return; }
    const path = fsPath.join(dir, fileName);
    return (await fs.existsAsync(path))
      ? path
      : (await find(fsPath.resolve(dir, '..')));
  };
  return find(startDir);
}


