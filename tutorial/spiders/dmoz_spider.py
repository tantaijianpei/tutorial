from scrapy.selector import HtmlXPathSelector
from scrapy.spider import BaseSpider


class DmozSpider(BaseSpider):
    name = "dmoz"
    allowed_domains = ["dmoz.org"]
    start_urls = [
        "http://www.dmoz.org/Computers/Programming/Languages/Python/Books/",
        "http://www.dmoz.org/Computers/Programming/Languages/Python/Resources/"
]    
  
    def parse(self, response):
        hxs = HtmlXPathSelector(response)
        sites = hxs.select('//fieldset/ul/li')
        #sites = hxs.path('//ul/li')
        for site in sites:
            title = site.select('a/text()').extract()
            link = site.select('a/@href').extract()
            desc = site.select('text()').extract()
            #print title, link, desc
            print title, link
