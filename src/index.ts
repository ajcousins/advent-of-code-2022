import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8');

const puzzle = (input: string) => {
  const chars = input.split('');
  let cursor = 0;
  while (cursor < chars.length) {
    const window = chars.slice(cursor, cursor + 4);
    if (new Set(window).size === window.length) break;
    cursor++;
  }
  return cursor + 4;
};

console.log(puzzle(input));
