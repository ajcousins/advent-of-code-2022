import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');
const isOnEdge = (grid, x, y) => x === 0 || x === grid[0].length - 1 || y === 0 || y === grid.length - 1;
const iterateGrid = (grid, xSt, vert) => {
    const gridCopy = [...grid];
    for (let y = 0; y < gridCopy.length; y++) {
        let highest = 0;
        for (let x = xSt; xSt ? x >= 0 : x < gridCopy[0].length; xSt ? x-- : x++) {
            const i = vert ? y : x;
            const j = vert ? x : y;
            if (isOnEdge(gridCopy, i, j)) {
                gridCopy[j][i].isVisible = true;
            }
            if (gridCopy[j][i].height > highest) {
                gridCopy[j][i].isVisible = true;
                highest = gridCopy[j][i].height;
            }
        }
    }
    return gridCopy;
};
const puzzle = (input) => {
    let grid = input.map((row) => row
        .split('')
        .map((cell) => ({ height: Number(cell), isVisible: false })));
    grid = iterateGrid(grid, 0);
    grid = iterateGrid(grid, grid[0].length - 1);
    grid = iterateGrid(grid, 0, true);
    grid = iterateGrid(grid, grid[0].length - 1, true);
    return grid
        .map((row) => row.map((cell) => (cell.isVisible ? 'O' : 'X')).join(''))
        .join('')
        .split('')
        .reduce((acc, val) => (val === 'O' ? acc + 1 : acc), 0);
};
console.log(puzzle(input));
//# sourceMappingURL=index.js.map