import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');
const isContained = (pair) => {
    const [a, b] = pair;
    const aArr = a.split('-');
    const bArr = b.split('-');
    // console.log("pair:", pair);
    // console.log("(+aArr[0] < +bArr[0] && +aArr[1] < +bArr[1]):", (+aArr[0] < +bArr[0] && +aArr[1] < +bArr[1]));
    // console.log("(+aArr[0] > +bArr[0] && +aArr[1] > +bArr[1]):", (+aArr[0] > +bArr[0] && +aArr[1] > +bArr[1]));
    const result = (+aArr[1] < +bArr[0] || +aArr[0] > +bArr[1]);
    return !result;
};
const puzzle = (input) => input
    .map((pair) => pair.split(','))
    .map(isContained)
    .reduce((acc, bool) => (bool ? acc + 1 : acc), 0);
console.log(puzzle(input));
//# sourceMappingURL=index.js.map