import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf-8').split('\n\n');
class Monkey {
    constructor({ id, items, op, test, ifTrue, ifFalse }) {
        this.id = id;
        this.items = items;
        this.op = op;
        this.test = test;
        this.ifTrue = ifTrue;
        this.ifFalse = ifFalse;
        this.count = 0;
    }
    inspectItems(allMonkeys) {
        const allMonkeysCopy = [...allMonkeys];
        while (this.items.length) {
            let curItem = this.items.shift();
            const opVal = this.op.split(' ').slice(-1)[0] === 'old'
                ? curItem
                : Number(this.op.split(' ').slice(-1)[0]);
            curItem = Math.floor((this.op.split(' ')[1] === '*' ? curItem * opVal : curItem + opVal) / 3);
            if (curItem % this.test === 0) {
                allMonkeysCopy[this.ifTrue].items.push(curItem);
            }
            else {
                allMonkeysCopy[this.ifFalse].items.push(curItem);
            }
            this.count++;
        }
        return allMonkeysCopy;
    }
}
const buildMonkey = (text) => {
    const init = {};
    text.split('\n').forEach((line, i) => {
        switch (i) {
            case 0:
                init.id = Number(line.split(' ')[1].slice(0, 1));
                break;
            case 1:
                init.items = line
                    .trim()
                    .split(' ')
                    .slice(2)
                    .join('')
                    .split(',')
                    .map((x) => Number(x));
                break;
            case 2:
                init.op = line.trim().split(' ').slice(3).join(' ');
                break;
            case 3:
                init.test = Number(line.trim().split(' ').slice(-1));
                break;
            case 4:
                init.ifTrue = Number(line.split(' ').slice(-1));
                break;
            case 5:
                init.ifFalse = Number(line.split(' ').slice(-1));
        }
    });
    return new Monkey(init);
};
const puzzle = (input) => {
    let monkeys = input.map((text) => buildMonkey(text));
    let round = 20;
    while (round > 0) {
        for (let i = 0; i < monkeys.length; i++) {
            monkeys = monkeys[i].inspectItems(monkeys);
        }
        round--;
    }
    return monkeys
        .sort((a, b) => (a.count < b.count ? 1 : -1))
        .slice(0, 2)
        .reduce((acc, val) => acc * val.count, 1);
};
console.log(puzzle(input));
//# sourceMappingURL=index.js.map