import api
import datetime
from textgenrnn import textgenrnn

textgen = textgenrnn()
textgen = textgenrnn(weights_path='robogirls/v2/robotgirl_ebooks_weights.hdf5',
                       vocab_path='robogirls/v2/robotgirl_ebooks_vocab.json',
                       config_path='robogirls/v2/robotgirl_ebooks_config.json')

textgen.generate_samples(max_gen_length=1000)
textgen.generate_to_file(f'output/robogirls_{datetime.datetime.utcnow().isoformat()}.txt', temperature=0.4, n=1000, max_gen_length=100)
