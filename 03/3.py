import re

with open("./input.txt", "r") as input:
    enabled = True
    sum = 0
    cond_sum = 0
    for line in input:
        instructions = re.findall(
            "mul\((\d{1,3})\,(\d{1,3})\)|(do\(\))|(don't\(\))", line)
        for a, b, y, n in instructions:
            if a and b:
                sum += int(a) * int(b)
            if y:
                enabled = True
            elif n:
                enabled = False
            elif enabled == True:
                cond_sum += int(a) * int(b)
    print(sum)
    print(cond_sum)