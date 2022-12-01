use std::fs;
use std::str::FromStr;

fn main() {

    let contents = fs::read_to_string("./data/input.txt")
        .expect("Couldn't read the file");

    let arr = contents.split("\n\n");
    let mut elves = Vec::new();

    for x in arr {
        elves.push(calorie_sum(x));
    }

    elves.sort();
    elves.reverse();

    println!("{:?}", elves[0] + elves[1] + elves[2]);
}

fn calorie_sum(calories: &str) -> i32 {
    let cal_arr = calories.split("\n");
    let mut total = 0;
    for cal in cal_arr {
        total += i32::from_str(cal).unwrap();
    }
    total
}
