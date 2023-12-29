import re
regex = r"Card (\d+):( \d+)+ |( \d+)+"

with open("input.txt", "r") as file:
    contents = file.readlines()
    for line in contents:
        result = re.search(regex, line.strip())
        # print(result.group(0))
        print(result)