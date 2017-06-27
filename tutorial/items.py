# Define here the models for your scraped items
#
# See documentation in:
# http://doc.scrapy.org/topics/items.html

from scrapy.item import Item, Field


class TutorialItem(Item):
    # define the fields for your item here like:
    # name = Field()
    movie_name = Field()
    movie_director = Field()
    movie_writer = Field()
    movie_roles = Field()
    movie_language = Field()
    movie_date = Field()
    movie_long = Field()
    movie_description = Field()


class IphoneItem(Item):
    good = Field()
    name = Field()
    price = Field()
    url = Field()


class MovieItem(Item):
    code = Field()
    name = Field()
    url = Field()
    score = Field()
    language = Field()
    date = Field()
    long =Field()

class BookItem(Item):
    name = Field()
    score = Field()
    code = Field()
    author = Field()
    publisher = Field()
    date = Field()
    pages = Field()
    price = Field()
    ISBN = Field()
    url = Field()



