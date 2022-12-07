import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const isContained = (pair: string[]): boolean => {
  const [a, b] = pair;
  const aArr = a.split('-');
  const bArr = b.split('-');
  return (
    (+aArr[0] >= +bArr[0] && +aArr[1] <= +bArr[1]) ||
    (+bArr[0] >= +aArr[0] && +bArr[1] <= +aArr[1])
  );
};

const puzzle = (input: string[]) =>
  input
    .map((pair) => pair.split(','))
    .map(isContained)
    .reduce((acc, bool) => (bool ? acc + 1 : acc), 0);

console.log(puzzle(input));