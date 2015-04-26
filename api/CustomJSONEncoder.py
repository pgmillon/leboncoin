from api.entities.House import House
from flask.json import JSONEncoder


class CustomJSONEncoder(JSONEncoder):

    def default(self, o):
        if isinstance(o, House):
            return {
                'title': o.title,
                'url': o.url,
                'price': o.price,
                'city': o.city,
                'zipCode': o.zipCode,
                'description': o.description,
                'images': o.images,
                'coordinates': o.coord
                }

        return {}
