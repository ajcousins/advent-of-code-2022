use std::collections::HashMap;

fn main() {
    let contents = include_str!("./data/input.txt").to_string();
    let games: Vec<String> = contents.split("\n").map(|s| s.to_string()).collect();
    let scores: Vec<u32> = games.iter().map(|game| game_to_points(game)).collect();
    println!("scores: {:?}", scores.iter().sum::<u32>());
}

fn game_to_points(game:&String) -> u32 {
    let equiv = HashMap::from([
        ("A", "X"),
        ("B", "Y"),
        ("C", "Z"),
    ]);

    let beats = HashMap::from([
        ("A", "Z"),
        ("B", "X"),
        ("C", "Y"),
    ]);

    let home_value = HashMap::from([
        ("X", 1),
        ("Y", 2),
        ("Z", 3),
    ]);

    let symbols: Vec<&str> = game.split(" ").collect();
    let bonus = home_value[symbols[1]];

    if beats[symbols[0]] == symbols[1] {
        return 0 + bonus;
    } 
    else if equiv[symbols[0]] == symbols[1] {
        return 3 + bonus;
    }
    6 + bonus

}
