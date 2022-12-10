import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

interface Folder {
  name: string;
  parent: Folder;
  contents: (Folder | File)[];
  folderSize: number;
}

interface File {
  name: string;
  filesize: number;
}

class Folder {
  constructor(name: string, parent: Folder | null) {
    this.name = name;
    this.parent = parent;
    this.contents = [];
    this.folderSize = 0;
  }
}

class File {
  constructor(name: string, filesize: number) {
    this.name = name;
    this.filesize = filesize;
  }
}
interface Log {
  name: string;
  size: number;
}

const results: Log[] = [];

const folderSizes = (struct: Folder): Folder => {
  const structCopy = { ...struct };
  let contentsSum = 0;
  structCopy.contents.forEach((child, i) => {
    if (child['folderSize'] === 0) {
      const childFolder = folderSizes(child as Folder);
      results.push({ name: childFolder.name, size: childFolder.folderSize });
      contentsSum += childFolder.folderSize;
    } else {
      contentsSum += (child as File).filesize;
    }
  });
  return { ...structCopy, folderSize: contentsSum };
};

const puzzle = (input: string[]) => {
  const fileStruct = new Folder('/', null);
  let curRef: Folder = fileStruct;
  let cursor = 0;
  while (cursor < input.length) {
    if (input[cursor] === '$ cd /') {
      curRef = fileStruct;
    } else if (input[cursor] === '$ cd ..') {
      curRef = curRef.parent;
    } else if (input[cursor].includes('$ cd ')) {
      const targetFilename = input[cursor].slice(5);
      const contents = curRef.contents;
      const idx = contents.findIndex(
        (item: File | Folder) => item.name === targetFilename
      );

      if (idx > -1) {
        curRef = curRef.contents[idx] as Folder;
      }
    }

    if (input[cursor].slice(0, 4) === 'dir ') {
      const folderName = input[cursor].slice(4);
      const newFolder = new Folder(folderName, curRef);
      curRef.contents.push(newFolder);
    }

    if (!isNaN(+input[cursor].slice(0, 1))) {
      const [size, name] = input[cursor].split(' ');
      const newFile = new File(name, Number(size));
      curRef.contents.push(newFile);
    }

    cursor++;
  }
  folderSizes(fileStruct);
};

puzzle(input);

const answer = results
  .filter((log) => log.size <= 100000)
  .reduce((acc, val) => acc + val.size, 0);

console.log('answer:', answer);
