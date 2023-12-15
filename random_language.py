import random

def main():
    langauges = ["Python", "C++", "C", "Ruby", "Javascript", "C#", "Rust", "Java", "Haskell"]
    print(f"The language selected was {random.choice(langauges)}")

if __name__ == '__main__':
    main()