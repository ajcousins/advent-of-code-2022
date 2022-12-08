import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8');

interface Board {
  [index: string]: string[];
}

const cursor = (col: number): number => (col - 1) * 4 + 1;

const parseStart = (start: string) => {
  const lines = start.split('\n');
  const obj: Board = {};
  const maxCols = (lines[lines.length - 1].length + 1) / 4;
  lines.forEach((line) => {
    let column = 0;
    while (column < maxCols) {
      column++;
      if (line.charAt(1) === '1') break;
      if (line.charAt(cursor(column)) === ' ') continue;
      const char = line.charAt(cursor(column));
      if (!obj[column]) obj[column] = [];
      obj[column].push(char);
    }
  });
  return obj;
};

const mutateBoard = (curBoard: Board, from: string, to: string): Board => {
  let board = { ...curBoard };
  let box = board[from].shift();
  board[to].unshift(box);
  return board;
};

const puzzle = (input: string) => {
  const [start, moves] = input.split('\n\n');
  const board = parseStart(start);
  const end = moves.split('\n').reduce((acc, move) => {
    let curBoard = { ...acc };
    const cmds = move.split(' ');
    let freq = +cmds[1];
    while (freq > 0) {
      curBoard = mutateBoard(curBoard, cmds[3], cmds[5]);
      freq--;
    }
    return curBoard;
  }, board);
  return Object.values(end).reduce((acc, val) => acc + val[0], '');
};

console.log(puzzle(input));
