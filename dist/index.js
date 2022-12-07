import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');
const value = (char) => char.charCodeAt(0) < 97 ? char.charCodeAt(0) - 38 : char.charCodeAt(0) - 96;
const removeDups = (ref, check) => {
    const common = [...ref];
    let i = 0;
    while (i < common.length) {
        if (check.indexOf(common[i]) === -1) {
            common.splice(i, 1);
            continue;
        }
        i++;
    }
    return common;
};
const partTwo = (input) => {
    const chars = [];
    let cursor = 0;
    while (cursor < input.length) {
        const chunk = input.slice(cursor, cursor + 3);
        const common = chunk[0].split("");
        chars.push(removeDups(removeDups(common, chunk[1]), chunk[2])[0]);
        cursor += 3;
    }
    return chars.reduce((acc, char) => acc + value(char), 0);
};
console.log(partTwo(input));
//# sourceMappingURL=index.js.map