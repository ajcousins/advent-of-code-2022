import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

const limit = (val: number, max: number): number => {
  let v = val;
  while (v > max - 1) {
    v -= max;
  }
  return v;
};

const chunk = (arr, size) => {
  const res = [];
  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size);
    res.push(chunk);
  }
  return res;
};

const puzzle = (input: string[]) => {
  let X = 1;
  const V = [0];
  const output = [];
  let cycleNum = 1;
  const spriteWidth = [-1, 0, 1];
  while (cycleNum < 241) {
    const isLit = spriteWidth.some((px) => {
      if (limit(cycleNum - 1, 40) === X + px) return true;
      return false;
    });
    output.push(isLit ? '#' : '.');
    const line = input[cycleNum - 1];

    if (line === 'noop') {
      V.push(0);
    } else {
      const val = line?.split(' ')[1] ?? 0;
      V.push(Number(val));
      V.push(0);
    }
    X += V.shift();
    cycleNum++;
  }

  return chunk(output, 40).map((chunk) => chunk.join(''));
};

console.log(puzzle(input));
