#coding=utf-8
import sys
reload(sys)
import os
import time
import codecs
from selenium import webdriver
from lxml import etree
import datetime
from pymongo import *
import re

def begin_parse():
    try:
        digit_pat = re.compile(r'.*(//d+).*')
        start=time.time()
        begin_url="https://list.jd.com/list.html?cat=670,671,672"
        chrome_driver = os.path.abspath(r'C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe')
        os.environ["webdriver.chrome.driver"] = chrome_driver
        driver = webdriver.Chrome(chrome_driver)
        # driver = webdriver.PhantomJS()
        driver.get(begin_url)
        next_a=driver.find_element_by_class_name('pn-next')
        page=1
        count=0
        date_str=datetime.datetime.now().strftime('%Y%m%d')
        fname=r'laptop'+date_str+r'.dat'
        errname = r'err'+date_str+r'.dat'
        # client = MongoClient("192.168.1.25", 27017)
        client = MongoClient("127.0.0.1", 27017)
        db = client.jd
        collection = db.laptop
        date = datetime.datetime.strptime(date_str,'%Y%m%d')
        # err_file = codecs.open('D:\\learn\\error\\'+errname,mode='wb',encoding='utf-8')
        with codecs.open('D:\\learn\\laptop\\'+fname,mode='wb',encoding='utf-8') as f:
            f.write(begin_url+'\n')
            while next_a:
                ##method 1:
                # items=driver.find_elements_by_class_name('gl-item')
                # if items and len(items)>0:
                #     for item in items:
                #         count=count+1
                #         print item.page_source
                #         parse_item(item,f)
                ##method 2:
                # page_data=driver.page_source
                # tree=etree.HTML(page_data)
                # nodes=tree.xpath('//*[@class="gl-item"]')
                # if nodes and len(nodes)>0:
                #     for node in nodes:
                #         count=count+1
                #         parse_node(node,f)

                html=driver.page_source
                tree=etree.HTML(html)
                items=tree.xpath('//*[@class="gl-item"]')
                size=len(items)
                i=0
                while i < size:
                    i=i+1
                    try:
                        xpath=r'//*[@id="plist"]/ul/li['+str(i)+r']/div'
                        name = tree.xpath(xpath+'/div[3]/a/em/text()')
                        price = tree.xpath(xpath+'/div[2]/strong[1]/i/text()')
                        sku = tree.xpath(xpath+'/@data-sku')
                        rank = tree.xpath(xpath+'/div[5]/strong/a/text()')
                        url = tree.xpath(xpath+'/div[3]/a/@href')
                        line='name:'+''.join(name)+'\t'+'price:'+''.join(price)+'\t'+'sku:'+''.join(sku)+'\t'+'rank:'+''.join(rank)+'\t'+'url:'+''.join(url)+'\n'
                        f.write(line)

                        entity = {'name':''.join(name),'date':date,'sku':''.join(sku),'url':''.join(url)}
                        try:
                            entity['price'] = float(''.join(price))
                        except :
                            pass

                        re1 = re.search(digit_pat,''.join(rank))
                        if re1:
                            entity['rank'] = int(re1.group(1))
                        collection.insert(entity)
                        count = count + 1
                    except Exception,ex:
                        print '循环获取列表内容时错误',str(ex),line
                        # err_file.write('循环获取列表内容时错误 '+str(ex)+' '+line)


                href=next_a.get_attribute('href')
                driver.get(href)
                page=page+1
                next_a=driver.find_element_by_class_name('pn-next')
                print 'page num',page
        print '总页数为:',page,"总个数为：",count,"time spend:",time.time()-start
    except Exception,ex:
        print '总页数为:',page,"总个数为：",count,"time spend:",time.time()-start
        print str(ex)
        # err_file.write('stop for error:'+str(ex)+'\n')


def parse_item(item,file):
    try:
        sts=item.text.split('\n')
        line = 'name:'+sts[1]+'\tprice:'+sts[0]+'\n'
        file.write(line)
        #print 'name:',sts[1],'price:',sts[0]
    except Exception,ex:
        print str(ex)

def parse_node(node,file):
    try:
        sku=''.join(node)
        venderid=node.xpath('//*[@class="gl-i-wrap j-sku-item"]/@venderid')[0]
        href=node.xpath('//*[@class="p-name"]/a[1]/@href')[0]
        name=node.xpath('//*[@class="p-name"]/a[1]/em[1]/text()')[0]
        extras=node.xpath('//*[@class="p-name"]/a[1]/i[1]/text()')
        extra=''
        if extras and len(extras)>0:
            extra=extras[0]
        line=sku+'\t'+venderid+'\t'+href+'\t'+name+'\t'+extra+'\n'
        file.write(line)

    except Exception,ex:
        print str(ex)

if __name__ == '__main__':
    begin_parse()