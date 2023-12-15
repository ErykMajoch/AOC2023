#include <iostream>
#include <fstream>
#include <map>
#include <string>

const std::map<std::string, std::string> STRING_TO_NUMBER = {
    {"one", "one1one"},
    {"two", "two2two"},
    {"three", "three3three"},
    {"four", "four4fourr"},
    {"five", "five5five"},
    {"six", "six6six"},
    {"seven", "seven7seven"},
    {"eight", "eight8eight"},
    {"nine", "nine9nine"}
};

int part_one() {

    int sum = 0;

    std::ifstream input("input.txt");    
    std::string line;

    while (std::getline(input, line)) {

        int first = 0;
        int last = 0;
        int length = line.length();
        
        // Find first digit
        for (int i = 0; i < length; i++) {
            int c = line[i];
            if (c >= 49 && c <= 57) {
                first = c - 48;
                break;
            }
        }

        // Find last digit
        for (int i = length; i >= 0; i--) {
            int c = line[i];
            if (c >= 49 && c <= 57) {
                last = c - 48;
                break;
            }
        }
        sum += (first * 10) + last;
    }    

    input.close();
    return sum;
}

int part_two() {
    int sum = 0;


    std::ifstream input("input.txt");
    std::string line;

    while (std::getline(input, line)) {
        int first = 0;
        int last = 0;

        std::string replaced_line = line;

        for (const auto& [key,value] : STRING_TO_NUMBER) {
            std::string buffer = "";
            std::size_t position = 0;
            std::size_t previous_position = -1;
            buffer.reserve(replaced_line.size());
            while (true) {
                previous_position = position;
                position = replaced_line.find(key, position);

                if (position == std::string::npos) {
                    break;
                }

                buffer.append(replaced_line, previous_position, position - previous_position);
                buffer += value;
                position += key.size();
            }

            buffer.append(replaced_line, previous_position, replaced_line.size() - previous_position);
            replaced_line = buffer;
        }

        int length = replaced_line.size();

        // Find first digit
        for (int i = 0; i < length; i++) {
            int c = replaced_line[i];
            if (c >= 49 && c <= 57) {
                first = c - 48;
                break;
            }
        }

        // Find last digit
        for (int i = length; i >= 0; i--) {
            int c = replaced_line[i];
            if (c >= 49 && c <= 57) {
                last = c - 48;
                break;
            }
        }
        sum += (first * 10) + last;
    }
    return sum;
}

int main() {
    std::cout << "Part One Answer: " << part_one() << "\n";
    std::cout << "Part Two Answer: " << part_two() << "\n";
}