import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');
const puzzle = (input) => {
    let X = 1;
    const V = [0];
    const record = [];
    const cyclesOfInterest = [20, 60, 100, 140, 180, 220];
    let cycleNum = 1;
    while (cycleNum < 221) {
        const line = input[cycleNum - 1];
        const signalStrength = cycleNum * X;
        if (cyclesOfInterest.includes(cycleNum)) {
            record.push({ cycleNum, signalStrength });
        }
        if (line === 'noop') {
            V.push(0);
        }
        else {
            const val = line?.split(' ')[1] ?? 0;
            V.push(Number(val));
            V.push(0);
        }
        X += V.shift();
        cycleNum++;
    }
    return record.reduce((acc, val) => acc + val.signalStrength, 0);
};
console.log(puzzle(input));
//# sourceMappingURL=index.js.map