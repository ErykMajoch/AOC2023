import Data.List
import Data.List.Split
import Data.Char

trim xs = dropSpaceTail "" $ dropWhile isSpace xs

dropSpaceTail maybeStuff "" = ""
dropSpaceTail maybeStuff (x:xs)
        | isSpace x = dropSpaceTail (x:maybeStuff) xs
        | null maybeStuff = x : dropSpaceTail "" xs
        | otherwise       = reverse maybeStuff ++ x : dropSpaceTail "" xs

formatSpace :: String -> String
formatSpace = foldr go ""
  where
    go x acc = x:if x == ' ' then dropWhile (' ' ==) acc else acc

prepareLine :: String -> [String]
prepareLine input = splitOn " | " (getNumbers input)
    where
        getNumbers (c:rest)
            | c == ':' = tail rest
            | otherwise = getNumbers rest
    

partOne :: [String] -> Int
partOne ls = sum [countContains (prepareLine (formatSpace (trim x))) | x <- ls]
    where
        countContains l 
            | length (intersect winners' mine') == 0 = 0
            | otherwise = 2 ^ ((length (intersect winners' mine')) - 1)
            where
                winners' = splitOn " " (l !! 0)
                mine' = splitOn " " (l !! 1)

main :: IO ()
main = do
    text <- readFile "input.txt"
    print(partOne (lines text))
