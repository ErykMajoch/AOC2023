const fs = require('fs');
const file = fs.readFileSync("part_one_input.txt", "utf-8").replace(/[\r]+/g, '').split("\n");
const width = file[0].length - 1
const height = file.length - 1

const isDigit = char => /[0-9]/.test(char);
const isSymbol = char => char !== '.' && !isDigit(char);


// function part_one() {
//     let sum = 0;

    // let symbols = [];
    // for (let y = 0; y < height; y++) {
    //     for (let x = 0; x < width; x++) {
    //         if (isSymbol(file[y][x])) {
    //             symbols.push({x,y});
    //         }
    //     }
    // }

//     console.log(symbols)
    
//     for (let i = 0; i < height; i++) {

//         number_started = false;
//         current_number = "";
//         valid_digits = [];
//         found_symbols = 0;
//         for (let j = 0; j < width; j++) {
//             let current = file[i][j];
//             // If the current character is a digit
//             if (isDigit(current)) {
//                 if (number_started === false) {
//                     number_started = true;
//                     current_number = "";
//                     valid_digits = [];
//                 }
                
//                 // Check surrounding cells for symbols
//                 for (let y = Math.max(0,i-1); y <= Math.min(i+1, height - 1); y++) {
//                     for (let x = Math.max(0,j-1); x <= Math.min(j+1, width - 1); x++) {
//                         if (x !== j || y !== i) {
//                             for (sym of symbols) {
//                                 if (sym.x === x && sym.y === y) {
//                                     found_symbols += 1;
//                                 }
//                             }
//                         }
//                     }
//                 }
//                 // file[i][j] = "X";
//                 current_number += current;
//             }
//             // If the current digit is not a digit
//             else {
//                 if (number_started) {
                    
//                     // let valid = valid_digits.includes(true)
                    
//                     if (found_symbols > 0) {
//                         // let t = ;
//                         sum += Number(current_number) * found_symbols;
//                     }
                    
//                     // console.log(`Current Number: ${current_number} Valid? ${valid}`)
//                     number_started = false;
//                     current_number = "";
//                     valid_digits = [];
//                     found_symbols = 0;
//                 }
//             }
//         }
//     }
//     return sum;
// }

// // function part_one() {

// //     let numbers = [];
    
//     // let symbols = [];
//     // for (let y = 0; y < height; y++) {
//     //     for (let x = 0; x < width; x++) {
//     //         if (isSymbol(file[y][x])) {
//     //             symbols.push({x,y});
//     //         }
//     //     }
//     // }

// //     for ({x,y} of symbols) {
// //         for (let ny = Math.max(0,y-1); ny <= Math.min(y+1, height - 1); ny++) {
// //             for (let nx = Math.max(0,x-1); nx <= Math.min(x+1, width - 1); nx++) {
// //                 if (nx !== x || ny !== y) {
// //                     // 
// //                 }
// //             }
// //         }
// //     }

// //     console.log(symbols);

// //     return numbers.reduce((a,b) => a + b, 0);
// // }

function coord_not_checked(coord_array, coord) {
    for ({x,y} of coord_array) {
        if (x === coord.x && y === coord.y) {
            return false;
        }
    }
    return true;
}

function part_one() {
    let sum = 0;
    console.log(`Width: ${width} Height: ${height}`)
    let symbols = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (isSymbol(file[y][x])) {
                symbols.push({x,y});
            }
        }
    }

    for ({x,y} of symbols) {
        tested_spaces = [];
        neighbours = []

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {
                // console.log(`(${dx},${dy})`)
                let new_y = y+dy;
                let new_x = x+dx;
                let possile_number = "";
                // Check if not out of bounds
                if (new_y >= 0 && new_y < height && new_x >= 0 && new_x < width) {
                    let current = file[new_y][new_x];
                    // console.log(`Current: (${new_x},${new_y})`)
                    if (isDigit(file[new_y][new_x])) {
                        // console.log(file[new_y][new_x]);
                        tested_spaces.push({x: new_x, y: new_y});
                        possile_number = current;

                        if (new_x > 0) {
                            for (let left = new_x - 1; left >= 0; left--) {
                                coord = {x: left, y: new_y};
                                if (isDigit(file[new_y][left])) {
                                    possile_number = file[new_y][left] + possile_number;
                                    tested_spaces.push(coord);
                                } else {
                                    break;
                                }
                            }
                        }

                        if (new_x < width) {
                            for (let right = new_x + 1; right <= width; right++) {
                                coord = {x: right, y: new_y};
                                if (isDigit(file[new_y][right])) {
                                    possile_number = possile_number + file[new_y][right];
                                    tested_spaces.push(coord);
                                } else {
                                    break;
                                }
                            }
                        }
                    }
                    // console.log(possile_number);
                    if (possile_number !== "") {
                        neighbours.push(Number(possile_number));
                    }
                }
            }
        }
        console.log(`Symbol: ${file[y][x]} Neighbours: ${[...new Set(neighbours)]}`)
        sum += [...new Set(neighbours)].reduce((x,y) => x + y);
    }
    // console.log(symbols)
    return sum;
}

console.log(`Part One Answer: ${part_one()}`)