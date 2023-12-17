const fs = require('fs');
const file = fs.readFileSync("part_one_input.txt", "utf-8").replace(/[\r]+/g, '').split("\n");
const width = file[0].length
const height = file.length

const isDigit = char => /[0-9]/.test(char);
const isSymbol = char => char !== '.' && !isDigit(char);

// function part_one() {
//     let sum = 0;
    
//     for (let i = 0; i < height; i++) {

//         number_started = false;
//         current_number = "";
//         valid_digits = [];
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
                // for (let y = Math.max(0,i-1); y <= Math.min(i+1, height - 1); y++) {
                //     for (let x = Math.max(0,j-1); x <= Math.min(j+1, width - 1); x++) {
                //         if (x !== j || y !== i) {
//                             let neighbor = file[y][x];
//                             valid_digits.push(isSymbol(neighbor));
//                             // file[y][x] = "X";
//                         }
//                     }
//                 }
//                 // file[i][j] = "X";
//                 current_number += current;
//             }
//             // If the current digit is not a digit
//             else {
//                 if (number_started) {
                    
//                     let valid = valid_digits.includes(true)
                    
//                     if (valid) {
//                         let t = Number(current_number);
//                         sum += t;
//                     }
                    
//                     console.log(`Current Number: ${current_number} Valid? ${valid}`)
//                     number_started = false;
//                     current_number = "";
//                     valid_digits = []
//                 }
//             }
//         }
//     }
//     return sum;
// }

function part_one() {

    let numbers = [];
    
    let symbols = [];
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            if (isSymbol(file[y][x])) {
                symbols.push({x,y});
            }
        }
    }

    for ({x,y} of symbols) {
        for (let ny = Math.max(0,y-1); ny <= Math.min(y+1, height - 1); ny++) {
            for (let nx = Math.max(0,x-1); nx <= Math.min(x+1, width - 1); nx++) {
                if (nx !== x || ny !== y) {
                    // 
                }
            }
        }
    }

    console.log(symbols);

    return numbers.reduce((a,b) => a + b, 0);
}

console.log(`Part One Answer: ${part_one()}`)