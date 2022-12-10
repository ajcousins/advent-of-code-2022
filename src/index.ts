import fs from 'fs';

const input = fs.readFileSync('input.txt', 'utf-8').split('\n');

interface Tree {
  height: number;
  score: number;
}

type Grid = Tree[][];

const isOutside = (grid: Grid, x: number, y: number): boolean =>
  x === -1 || x === grid[0].length || y === -1 || y === grid.length;

const checkViews = (grid: Grid, y: number, x: number): Grid => {
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
  const scores = [];
  dirs.forEach((dir) => {
    let origin = { y, x };
    let dirScore = 0;
    while (true) {
      origin.y = origin.y + dir[0];
      origin.x = origin.x + dir[1];
      if (isOutside(grid, origin.x, origin.y)) break;
      if (grid[y][x].height <= grid[origin.y][origin.x].height) {
        dirScore++;
        break;
      }
      dirScore++;
    }
    scores.push(dirScore);
  });
  const gridCopy = [...grid];
  gridCopy[y][x].score = scores.reduce((acc, val) => acc * val, 1);

  return gridCopy;
};

const puzzle = (input: string[]) => {
  let grid = input.map((row) =>
    row.split('').map((cell) => ({ height: Number(cell), score: 0 } as Tree))
  );

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      grid = checkViews(grid, i, j);
    }
  }

  return grid
    .map((row) =>
      row.reduce((acc, tree) => (tree.score > acc ? tree.score : acc), 0)
    )
    .reduce((acc, val) => (val > acc ? val : acc), 0);
};
console.log(puzzle(input));
