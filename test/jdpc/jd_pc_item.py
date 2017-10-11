#coding=utf-8
import sys
reload(sys)
import os
import codecs
import json
from selenium import webdriver
from lxml import etree

def parse_items(fileName):
    try:
        chrome_driver = os.path.abspath(r'C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe')
        os.environ["webdriver.chrome.driver"] = chrome_driver
        driver = webdriver.Chrome(chrome_driver)
        # driver.set_page_load_timeout(20)
        driver
        wf = codecs.open(r'D:\learn\laptop\record.dat',mode='ab',encoding='utf-8')
        with codecs.open(fileName,encoding='utf-8') as f:
            for line in f:
                url_index = line.find("url:")
                sku_index = line.find("sku:")
                rank_index = line.find("rank:")
                price_index = line.find("price:")
                if url_index > 0 and sku_index > 0 and rank_index > 0 and price_index > 0:
                    url = line[url_index + 4 : ].strip()
                    sku = line[sku_index + 4 : rank_index].strip()
                    price = line[price_index + 6 : sku_index].strip()
                    if url == '': continue
                    try:
                        if url.find("http") >=0:
                            driver.get(url)
                        else:
                            driver.get("https:"+url)
                    except Exception,exxx:
                        print 'timeout',url
                        continue
                    html = driver.page_source
                    tree=etree.HTML(html)
                    items=tree.xpath('//*[@class="parameter2 p-parameter-list"]/li')
                    size=len(items)
                    record = {}
                    record['sku'] = sku
                    record['price'] = price
                    i=0
                    while i < size:
                        i=i+1
                        try:
                            xpath=r'//*[@class="parameter2 p-parameter-list"]/li['+str(i)+r']/text()'
                            item_str = ''.join(tree.xpath(xpath)).strip()
                            item_name = item_str[:item_str.find(u'：')].strip()
                            item_content = item_str[item_str.find(u'：')+1:].strip()
                            record[item_name] = item_content
                            xpath1 = r'//*[@id="parameter-brand"]/li[1]/a/text()'
                            brand = ''.join(tree.xpath(xpath1))
                            record['brand'] = brand
                        except Exception,exx:
                            print 'intfor',str(exx),line
                    res = json.dumps(dict(record))+'\n'
                    print res.decode("unicode_escape")
                    wf.write(res.decode("unicode_escape"))

    except Exception,ex:
        print str(ex)

if __name__ == '__main__':
    parse_items(r'D:\learn\laptop\laptop20171008.dat')