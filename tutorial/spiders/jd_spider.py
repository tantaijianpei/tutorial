#coding=utf-8
import sys
reload(sys)

sys.setdefaultencoding("utf-8")
from scrapy.spider import BaseSpider
from scrapy.http import Request
from scrapy.selector import HtmlXPathSelector
from tutorial.items import IphoneItem


class JDSpider(BaseSpider):
    name = "jd"
    allowed_domains = ["jd.com"]
    start_urls = []

    def start_requests(self):
        file_object = open('good.txt','r')
        try:
            url_head = "http://search.jd.com/Search?keyword="
            for line in file_object:
                line = line.replace(" ","+")
                self.start_urls.append(url_head + line)
            for url in self.start_urls:
                yield self.make_requests_from_url(url)
        finally:
            file_object.close()

    def parse(self, response):
        file_name = "body.html"
        with open(file_name,'wb') as f:
            f.write(response.body)

        hxs = HtmlXPathSelector(response)
        links = hxs.select('//*[@id="J_goodsList"]/ul/li/div/div[1]/a/@href').extract()
        print 'links:',links

        for link in links:
            link = "https:"+link
            yield Request(link,callback=self.parse_item)

    def parse_item(self,response):
        file_name = "H:\\test\\"+response.url.split(r'/')[-1].split(r'.')[0]+".html"
        with open(file_name,'wb') as f:
            f.write(response.body)
        hxs = HtmlXPathSelector(response)
        good_name = hxs.select('//*[@class="sku-name"]/text()').extract()
        ll = hxs.select('//*[@class="summary-price J-summary-price"]/div[2]/span[1]')
        good_price = hxs.select('//*[@class="summary-price J-summary-price"]/div[2]/span[1]/span[2]/text()').extract()
        item = IphoneItem()
        item['good'] = response.url.split(r'/')[-1].split(r'.')[0]
        item['name'] = ''.join(good_name).strip().replace(',',';').replace('\'','\\\'').replace('\"','\\\"').replace(':',';')
        item['price'] = ''.join(good_price).strip()
        item['url'] = response.url
        return item
