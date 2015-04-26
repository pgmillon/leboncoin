import urllib2
import logging
from api.entities.House import House
from bs4 import BeautifulSoup


class LeBonCoinProvider:

    def fetch(self, link):
        logging.debug('Fetching: %s', link)
        page = urllib2.urlopen(link)
        return BeautifulSoup(page)

    def count(self, location=None):
        lbcUrl = "http://www.leboncoin.fr/ventes_immobilieres/offres/nord_pas_de_calais/pas_de_calais/?ps=4&pe=8&ret=1"
        if location is not None:
            lbcUrl += "&location=%s" % (location)
        soup = self.fetch(lbcUrl)

        for type in soup.select('.navlist.type > li'):
            name = type.select('span.name')[0].string
            if 'Toutes' == name:
                return int(type.select('span.value b')[0].string.replace(' ', ''))

    def list(self, location=None, page=1):
        houses = []

        logging.info('Getting LeBonCoin page %d', page)
        lbcUrl = "http://www.leboncoin.fr/ventes_immobilieres/offres/nord_pas_de_calais/pas_de_calais/?o=%s&ps=4&pe=8&ret=1" % (str(page))
        if location is not None:
            lbcUrl += "&location=%s" % (location)

        soup = self.fetch(lbcUrl)

        try:
            announcesLinks = soup.select('.list-lbc > a')
            logging.debug('Found %d announces on the page', len(announcesLinks))
            for announce in announcesLinks:
                house = House(announce['href'])
                itemSoup = self.fetch(house.url).select(".lbcContainer")[0]

                house.images = [url['content'] for url in itemSoup.select('.lbcImages meta')]
                logging.debug('Found %s images', len(house.images))

                if len(itemSoup.select('[itemprop="price"]')) > 0:
                    house.price = itemSoup.select('[itemprop="price"]')[0]['content']
                    logging.debug('Found price : %s', house.price)

                if len(itemSoup.select('[itemprop="name"]')) > 0:
                    house.title = itemSoup.select('[itemprop="name"]')[0].string
                    logging.debug('Found title : %s', house.title)

                if len(itemSoup.select('[itemprop="addressLocality"]')) > 0:
                    house.city = itemSoup.select('[itemprop="addressLocality"]')[0].string
                    logging.debug('Found city : %s', house.city)

                if len(itemSoup.select('[itemprop="postalCode"]')) > 0:
                    house.zipCode = itemSoup.select('[itemprop="postalCode"]')[0].string
                    logging.debug('Found zip code : %s', house.zipCode)

                if len(itemSoup.select('[itemprop="description"]')) > 0:
                    house.description = "".join(itemSoup.select('[itemprop="description"]')[0].stripped_strings)
                    logging.debug('Found description : %s', house.description)

                if len(itemSoup.select('[itemprop="latitude"]')) > 0:
                    house.coord = [itemSoup.select('[itemprop="latitude"]')[0]['content'], itemSoup.select('[itemprop="longitude"]')[0]['content']]
                    logging.debug('Found coordinates : %s', house.coord)
                houses.append(house)
        except Exception, e:
            logging.warning(e)

        return houses
