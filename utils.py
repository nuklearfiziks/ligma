from html.parser import HTMLParser
import re

class MLStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.reset()
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()

def strip_rts_and_users(html):
    return re.sub(r'\s?(RT\s?)?@[^\s]+\s?', '', html, re.I)

## If somebody knows how to do partial application in Python pls tell me k
def clean(html):
    return strip_tags(strip_rts_and_users(html))
