import api

from textgenrnn import textgenrnn

textgen = textgenrnn()
textgen.reset()
textgen.train_from_file("./corpus.txt", num_epochs=1)
textgen.generate_samples()
