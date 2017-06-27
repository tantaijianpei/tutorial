#coding=utf-8
import sys
reload(sys)

from scrapy.contrib.spiders import CrawlSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.selector import HtmlXPathSelector
from tutorial.items import MovieItem
import re


class MovieSpider(CrawlSpider):
    name = "movie"

    allowed_domains = ["movie.douban.com"]

    start_urls=["https://movie.douban.com/"]

    rules = [
        Rule(SgmlLinkExtractor(allow='.*/subject/\d*/(\\?[^/]*$)?$'),  callback='parse_url', follow=True),
    ]

    def parse_url(self, response):
        item = MovieItem()
        hxs = HtmlXPathSelector(response)
        item['code'] = response.url.split(r'/')[-2]
        name = hxs.select('//*[@id="content"]/h1/span[1]/text()').extract()
        score = hxs.select('//*[@id="interest_sectl"]/div[1]/div[2]/strong/text()').extract()
        item['name'] = ''.join(name).strip().strip().replace(',',';').replace('\'','\\\'').replace('\"','\\\"').replace(':',';')
        item['url'] = response.url
        item['score'] = ''.join(score)

        movie_detail = hxs.select('//*[@id="info"]').extract()
        movie_detail_str = ''.join(movie_detail).strip()

        movie_language_str = ".*语言:</span> (.+?)<br><span.*".decode("utf8")
        movie_date_str = ".*上映日期:</span> <span property=\"v:initialReleaseDate\" content=\"(\S+?)\">(\S+?)</span>.*".decode("utf8")
        movie_long_str = ".*片长:</span> <span property=\"v:runtime\" content=\"(\d+).*".decode("utf8")

        pattern_language =re.compile(movie_language_str,re.S)
        pattern_date = re.compile(movie_date_str,re.S)
        pattern_long = re.compile(movie_long_str,re.S)

        movie_language = re.search(pattern_language,movie_detail_str)
        movie_date = re.search(pattern_date,movie_detail_str)
        movie_long = re.search(pattern_long,movie_detail_str)
        item['language'] = ""
        if movie_language:
            item['language'] = movie_language.group(1).strip().replace(',',';').replace('\'','\\\'').replace('\"','\\\"').replace(':',';')

        item['date'] = ""
        if movie_date:
            item['date'] = movie_date.group(1).strip().replace(',',';').replace('\'','\\\'').replace('\"','\\\"').replace(':',';')

        item['long'] = ""
        if movie_long:
            item['long'] = movie_long.group(1)
        yield item
