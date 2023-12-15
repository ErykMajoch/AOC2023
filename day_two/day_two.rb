def part_one
    lines = File.read("input.txt").split("\n")
    sum = 0
    for line in lines do
        m = line.match /Game (?<id>\d+):(?<games>(( \d+ [a-z]+,?)+;?)+)/m
        games = m[:games].split(";")
        line_valid = true
        for game in games do
            red = 0
            green = 0
            blue = 0
            tokens = game.strip.split(",")
            for token in tokens do
                current = token.split(" ")
                quantity = current[0].to_i
                colour = current[1]
                case colour
                when "red"
                    red += quantity
                when "green"
                    green += quantity
                when "blue"
                    blue += quantity
                end
            end
            if red > 12 or green > 13 or blue > 14
                line_valid = false
                break
            end
        end
        if line_valid
            sum += m[:id].to_i
        end
    end
    sum
end

def part_two
    lines = File.read("input.txt").split("\n")
    powers = []
    for line in lines do
        m = line.match /Game (?<id>\d+):(?<games>(( \d+ [a-z]+,?)+;?)+)/m
        games = m[:games].split(";")

        red_minumum = 0
        green_minium = 0
        blue_minimum = 0

        for game in games do            
            tokens = game.strip.split(",")
            for token in tokens do
                current = token.split(" ")
                quantity = current[0].to_i
                colour = current[1]
                case colour
                when "red"
                    if quantity > red_minumum
                        red_minumum = quantity
                    end
                when "green"
                    if quantity > green_minium
                        green_minium = quantity
                    end
                when "blue"
                    if quantity > blue_minimum
                        blue_minimum = quantity
                    end
                end
            end
        
        end
        powers.append(red_minumum * green_minium * blue_minimum)
    end
    powers.inject(0, :+)
end

puts "Part One Answer: #{part_one}"
puts "Part Two Answer: #{part_two}"