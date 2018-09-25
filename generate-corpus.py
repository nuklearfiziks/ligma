import api
from utils import clean

CORPUS = {}

with open('corpus.txt', 'w') as f:
    for user in api.getUsers():
        statuses = CORPUS[user] = {}
        for status in api.getUserStatuses(user):
            # statuses[id] = status
            if isinstance(status, str):
                f.write(status + '\n')
