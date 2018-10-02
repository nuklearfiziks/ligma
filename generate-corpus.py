import api
from utils import clean

CORPUS = {}

### Grap as many toots as possible
with open('corpus.txt', 'a') as file:
    for user in api.getUsers():
        # statuses = CORPUS[user] = {}
        for status in api.getUserStatuses(user):
            # statuses[id] = status
            if isinstance(status, str):
                file.write(status + '\n')

### Write them back after removing duplicates
lines = []
with open('corpus.txt', 'r') as file:
    lines = set([line.rstrip('\n').strip() for line in file])
    print(f"Number of lines: {len(lines)}")

with open('corpus.txt', 'w') as file:
    for line in lines:
        file.write(line + '\n')
