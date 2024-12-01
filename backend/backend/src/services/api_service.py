import requests


class APIService:
    _url = None

    def __init__(self, url) -> None:
        self.ulr = url

    @property
    def url(self):
        return self._url

    @url.setter
    def url(self, url):
        self._url = url

    def get_request(url: str) -> requests.Response:
        response = requests.get(url)

        return response
