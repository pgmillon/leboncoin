import unittest
import logging
import json
from api.CustomJSONEncoder import CustomJSONEncoder
import os
from api.providers.leboncoin import LeBonCoinProvider
from bs4 import BeautifulSoup
from mock import Mock

logging.basicConfig(level=logging.DEBUG)


def side_effect(*args, **kwargs):
    url = args[0]
    print url
    if url == 'http://www.leboncoin.fr/ventes_immobilieres/offres/nord_pas_de_calais/pas_de_calais/?o=1&ps=4&pe=8&ret=1':
        return BeautifulSoup(open(os.path.dirname(os.path.realpath(__file__)) + '/leboncoin-list.html'))
    if url == 'http://www.leboncoin.fr/ventes_immobilieres/offres/nord_pas_de_calais/pas_de_calais/?ps=4&pe=8&ret=1':
        return BeautifulSoup(open(os.path.dirname(os.path.realpath(__file__)) + '/leboncoin-list.html'))
    if url == 'http://www.leboncoin.fr/ventes_immobilieres/793130014.htm?ca=17_s':
        return BeautifulSoup(open(os.path.dirname(os.path.realpath(__file__)) + '/leboncoin-view.html'))
    return None


class LeBonCoinTest(unittest.TestCase):

    def testFetchOne(self):
        provider = LeBonCoinProvider()
        provider.fetch = Mock(side_effect=side_effect)
        houses = provider.list(page=1)
        self.assertEqual(1, len(houses))

    def testSerialize(self):
        provider = LeBonCoinProvider()
        provider.fetch = Mock(side_effect=side_effect)
        houses = provider.list(page=1)
        json._default_encoder = CustomJSONEncoder()
        print json.dumps(houses)

    def testCount(self):
        provider = LeBonCoinProvider()
        provider.fetch = Mock(side_effect=side_effect)
        print provider.count()
