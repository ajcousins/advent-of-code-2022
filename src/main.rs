use std::collections::HashMap;

fn main() {
    let contents = include_str!("./data/input.txt").to_string();
    let games: Vec<String> = contents.split("\n").map(|s| s.to_string()).collect();
    let scores: Vec<u32> = games.iter().map(|game| game_to_points(game)).collect();
    println!("scores: {:?}", scores.iter().sum::<u32>());
}

fn game_to_points(game:&String) -> u32 {
    let lose = HashMap::from([
        ("A", "B"),
        ("B", "C"),
        ("C", "A"),
    ]);

    let win = HashMap::from([
        ("A", "C"),
        ("B", "A"),
        ("C", "B"),
    ]);

    let game_points = HashMap::from([
        ("X", 0),
        ("Y", 3),
        ("Z", 6),
    ]);

    let home_value = HashMap::from([
        ("A", 1),
        ("B", 2),
        ("C", 3),
    ]);

    let symbols: Vec<&str> = game.split(" ").collect();
    let mut score = 0;

    match symbols[1] {
        "X" => {
            score = home_value[win[symbols[0]]];
        }
        "Y" => {
            score = home_value[symbols[0]];
        }
        "Z" => {
            score = home_value[lose[symbols[0]]];
        }
        _ => {
            ()
        }
    }

    score + game_points[symbols[1]]
}
