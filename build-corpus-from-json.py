import json
from os import listdir
from os.path import isfile, join
from utils import clean
dumps = [f for f in listdir("training-sets") if isfile(join("training-sets", f))]


with open('corpus.txt', 'w') as f:
    for dump in dumps:
        with open("training-sets/" + dump) as data_file:
            data = json.load(data_file)
            for toot in data['orderedItems']:
                obj = toot['object']
                if obj and isinstance(obj, dict):
                    cleaned = clean(obj['content'])
                    f.write(cleaned + '\n')
