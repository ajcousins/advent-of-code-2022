use std::fs;
use std::str::FromStr;

fn main() {

    let contents = fs::read_to_string("./data/input.txt")
        .expect("Couldn't read the file");

    let arr = contents.split("\n\n");
    let mut elves = Vec::new();

    for x in arr {
        let elf = Elf {
            total_calories: calorie_sum(x),
        };
        elves.push(elf);
    }

    let mut highest = 0;

    for elf in elves {
        if elf.total_calories > highest {
            highest = elf.total_calories;
        }
    }

    println!("{}", highest);
}

#[derive(Debug)]
struct Elf {
    total_calories: i32,
}

fn calorie_sum(calories: &str) -> i32 {
    let cal_arr = calories.split("\n");
    let mut total = 0;
    for cal in cal_arr {
        total += i32::from_str(cal).unwrap();
    }
    total
}
