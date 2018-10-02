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

def strip_rts(html):
    return re.sub(r'\s?RT\s?', '', html)

def strip_users(html):
    return re.sub(r'@<span>[a-zA-Z0-9.-_]*</span>?', '', html)

def strip_urls(html):
    return re.sub(r'http\S+', '', html)

## If somebody knows how to do partial application in Python pls tell me k
def clean(html):
    return strip_urls(strip_rts(strip_tags(strip_users(html)))).strip()
