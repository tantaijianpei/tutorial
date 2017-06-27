#coding=utf-8
import sys
reload(sys)

from tutorial.spiders.crawl_new import CrawlNewSpider, Rule
from scrapy.contrib.linkextractors.sgml import SgmlLinkExtractor
from scrapy.selector import HtmlXPathSelector
from tutorial.items import BookItem
import re


class BookSpider(CrawlNewSpider):
    name = "book"

    allowed_domains = ["book.douban.com"]

    start_urls = ["https://book.douban.com/"]

    rules = [
        Rule(SgmlLinkExtractor(allow='.*/subject/\d*/(\\?[^/]*$)?$'),  callback='parse_url', follow=True),
    ]

    def parse_url(self, response):
        item = BookItem()
        hxs = HtmlXPathSelector(response)
        item['code'] = response.url.split(r'/')[-2]
        name = hxs.select('//*[@id="wrapper"]/h1/span[1]/text()').extract()
        score = hxs.select('//*[@id="interest_sectl"]/div[1]/div[2]/strong/text()').extract()
        author = hxs.select('//*[@id="info"]/span[1]/a/text()').extract()
        item['name'] = ''.join(name).strip().strip().replace(',',';').replace('\'','\\\'').replace('\"','\\\"').replace(':',';')
        item['score'] = ''.join(score)
        item['author'] = ''.join(author).strip()
        item['url'] = response.url

        book_detail = hxs.select('//*[@id="info"]').extract()
        book_detail_str = ''.join(book_detail).strip()

        publisher_str = ".*出版社:</span> (.+?)<br><span.*".decode("utf8")
        date_str = ".*出版年:</span> (.+?)<br><span.*".decode("utf8")
        pages_str = ".*页数:</span> (.+?)<br><span.*".decode("utf8")
        price_str = ".*定价:</span> (.+?)<br><span.*".decode("utf8")
        isbn_str = ".*ISBN:</span> (.+?)<br>.*".decode("utf8")

        pattern_publisher =re.compile(publisher_str,re.S)
        pattern_date = re.compile(date_str,re.S)
        pattern_page = re.compile(pages_str,re.S)
        pattern_price = re.compile(price_str,re.S)
        pattern_isbn = re.compile(isbn_str,re.S)

        book_publisher = re.search(pattern_publisher,book_detail_str)
        book_date = re.search(pattern_date,book_detail_str)
        book_pages = re.search(pattern_page,book_detail_str)
        book_price = re.search(pattern_price,book_detail_str)
        book_isbn = re.search(pattern_isbn,book_detail_str)
        item['date'] = ""
        if book_date:
            item['date'] = book_date.group(1).strip().replace(',',';').replace('\'','\\\'').replace('\"','\\\"').replace(':',';')

        item['publisher'] = ""
        if book_publisher:
            item['publisher'] = book_publisher.group(1).strip().replace(',',';').replace('\'','\\\'').replace('\"','\\\"').replace(':',';')

        item['pages'] = ""
        if book_pages:
            item['pages'] = book_pages.group(1)

        item['price'] = ""
        if book_price:
            item['price'] = book_price.group(1)

        item['ISBN'] = ""
        if book_isbn:
            item['ISBN'] = book_isbn.group(1)
        yield item
