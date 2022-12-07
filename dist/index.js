import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');
const value = (char) => char.charCodeAt(0) < 97 ? char.charCodeAt(0) - 38 : char.charCodeAt(0) - 96;
const halve = (line) => {
    const midpoint = line.length / 2;
    return [line.substring(0, midpoint), line.substring(midpoint)];
};
const partOne = (input) => input
    .map((line) => halve(line))
    .map((halves) => {
    const [first, second] = halves;
    let odd;
    first.split('').forEach((char) => {
        if (second.includes(char)) {
            odd = char;
        }
    });
    return value(odd);
})
    .reduce((acc, val) => {
    return acc + val;
}, 0);
console.log("Part One:", partOne(input));
//# sourceMappingURL=index.js.map