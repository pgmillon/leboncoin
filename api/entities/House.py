import datetime
from datetime import datetime


class House:

    def __init__(self, url):
        self._url = url
        self._title = ""
        self._city = ""
        self._zipCode = ""
        self._description = ""
        self._price = 0
        self._coord = []
        self._images = []
        self._date = datetime.now()

    @property
    def url(self):
        return self._url

    @property
    def title(self):
        return self._title

    @title.setter
    def title(self, value):
        self._title = value

    @property
    def price(self):
        return self._price

    @price.setter
    def price(self, value):
        self._price = value

    @property
    def city(self):
        return self._city

    @city.setter
    def city(self, value):
        self._city = value

    @property
    def zipCode(self):
        return self._zipCode

    @zipCode.setter
    def zipCode(self, value):
        self._zipCode = value

    @property
    def description(self):
        return self._description

    @description.setter
    def description(self, value):
        self._description = value

    @property
    def images(self):
        return self._images

    @images.setter
    def images(self, value):
        self._images = value

    @property
    def coord(self):
        return self._coord

    @coord.setter
    def coord(self, value):
        self._coord = value

    @property
    def date(self):
        return self._date

    @date.setter
    def date(self, value):
        self._date = value
