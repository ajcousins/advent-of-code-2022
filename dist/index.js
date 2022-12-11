import fs from 'fs';
const input = fs.readFileSync('input.txt', 'utf-8').split('\n');
const getFrames = (curHeadPos, dir, magnitude) => {
    let pos = { ...curHeadPos };
    let cmd = {
        x: dir === 'R' ? 1 : dir === 'L' ? -1 : 0,
        y: dir === 'U' ? 1 : dir === 'D' ? -1 : 0,
    };
    let repeat = magnitude;
    const frames = [];
    while (repeat > 0) {
        pos = { x: pos.x + cmd.x, y: pos.y + cmd.y };
        frames.push(pos);
        repeat--;
    }
    return frames;
};
const knotFramesMap = (headFrames) => {
    let curTailPos = { x: 0, y: 0 };
    const frames = headFrames.map((frame, i) => {
        if (i === 0)
            return frame;
        if (frame.x === curTailPos.x && frame.y === curTailPos.y) {
            curTailPos = frame;
            return frame;
        }
        const xDiff = frame.x - curTailPos.x;
        const yDiff = frame.y - curTailPos.y;
        if (Math.abs(xDiff) < 2 && Math.abs(yDiff) < 2) {
            return curTailPos;
        }
        if ((Math.abs(xDiff) === 2 && Math.abs(yDiff) === 0) ||
            (Math.abs(xDiff) === 0 && Math.abs(yDiff) === 2)) {
            curTailPos = {
                x: curTailPos.x + xDiff * 0.5,
                y: curTailPos.y + yDiff * 0.5,
            };
            return curTailPos;
        }
        if (Math.abs(xDiff) >= 1 && Math.abs(yDiff) >= 1) {
            curTailPos = {
                x: curTailPos.x + (Math.abs(xDiff) > 1 ? xDiff * 0.5 : xDiff),
                y: curTailPos.y + (Math.abs(yDiff) > 1 ? yDiff * 0.5 : yDiff),
            };
            return curTailPos;
        }
    });
    return frames;
};
const puzzle = (input) => {
    let curHeadPos = { x: 0, y: 0 };
    let headFrames = [curHeadPos];
    input.forEach((cmd) => {
        const [dir, magnitude] = cmd.split(' ');
        const positions = getFrames(curHeadPos, dir, Number(magnitude));
        curHeadPos = positions[positions.length - 1];
        headFrames = headFrames.concat(positions);
    });
    const knots = Array.apply(null, Array(9)).map((x, i) => i);
    let frames = headFrames;
    knots.forEach(k => {
        frames = knotFramesMap(frames);
    });
    const hash = {};
    frames.forEach((frame) => {
        const idxString = JSON.stringify(frame);
        if (!hash[idxString]) {
            hash[idxString] = 1;
        }
        else {
            hash[idxString] += 1;
        }
    });
    return Object.keys(hash).length;
};
console.log(puzzle(input));
//# sourceMappingURL=index.js.map