with open("a.txt", "r") as file:
    for line in file:
        # print(line.strip())
        line = line.strip()
        t = line.split(":")
        if (t[0] != t[1]):
            print(f"{t[0]} is not equal to {t[1]}")
            break