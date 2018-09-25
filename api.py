from mastodon import Mastodon
from utils import clean
import settings

mastodon = Mastodon(
    access_token = settings.ACCESS_TOKEN,
    api_base_url = settings.API_URL
)

def getUsers():
    user_ids = []
    for account in mastodon.list_accounts(settings.USER_LIST_ID, limit=0):
        user_ids.append(account.id)

    return user_ids


def getUserStatuses(id):
    statuses = []
    res = mastodon.account_statuses(id, limit=1)

    for status in mastodon.fetch_remaining(res[0]._pagination_next):
        if hasattr(status, 'content'):
            content = clean(status.content)
            statuses.append(content)

    return statuses


def postMessage(text):
    mastodon.toot(text)
