#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf-8')

import json
import re
import time
import codecs
from pymongo import *


def get_money_unit():
    units = set()
    units_pat = re.compile('^([^\\d]*)\\d+.*')
    unite_pat = re.compile('.*\\d+\\.?([^\\d]*)$')
    with codecs.open(r'D:\learn\scripy\tutorial\book.dat',encoding='utf-8') as f:
        for line in f:
            if line != '':
                try:
                    line=re.sub(r"\\'", r"&'", line)
                    line=re.sub(r"\t", r"&t", line)
                    line=re.sub(r"\\\"","-",line)
                    line=re.sub(r"\\", r"", line)
                    data=json.loads(line)
                    price = data['price'].strip()
                    re1 = re.search(units_pat,price)
                    if re1:
                        d1 = re1.group(1)
                        d1 = d1.strip()
                        if d1 not in units:
                            units.add(d1)
                    re2 = re.search(unite_pat,price)
                    if re2:
                        d2 = re2.group(1)
                        d2 = d2.strip()
                        if d2 not in units:
                            units.add(d2)
                except Exception, ex:
                    print str(ex)

    text = '\n'.join(units)
    with codecs.open(r'D:\learn\scripy\tutorial\unit.dat',mode='wb',encoding='utf-8') as file:
        file.write(text)
    print text

def parse():
    count = 0
    replicate =0
    codes = set()
    client = MongoClient("localhost", 27017)
    db = client.book_db
    collection = db.douban
    start=time.time()
    page_pat = re.compile('[^\\d]*(\\d+)[^\\d]*')
    price_pat = re.compile('[^\\d]*(\\d*\\.?\\d*)[^\\d]*')
    with codecs.open(r'D:\learn\scripy\tutorial\book.dat',encoding='utf-8') as f:
        for line in f:
            if line != '':
                try:
                    line=re.sub(r"\\'", r"&'", line)
                    line=re.sub(r"\t", r"&t", line)
                    line=re.sub(r"\\\"","-",line)
                    line=re.sub(r"\\", r"", line)
                    data=json.loads(line)
                    book_tuple = {}
                    code = data['code'].strip()
                    if code != '' and code in codes:
                        replicate = replicate + 1
                        continue
                    count = count+1
                    codes.add(code)
                    score = data['score'].strip()
                    publisher = data['publisher'].strip()
                    isbn = data['ISBN'].strip()
                    name = data['name'].strip()
                    author = data['author'].strip()
                    date = data['date'].strip()
                    pages = data['pages'].strip()
                    price = data['price'].strip()
                    if publisher != '':
                        book_tuple['publisher'] = publisher
                    if code != '':
                        book_tuple['code'] = code
                    if isbn != '':
                        book_tuple['ISBN'] = isbn
                    if name != '':
                        book_tuple['name'] = name
                    if author != '':
                        book_tuple['author'] = author
                    if score != '':
                        book_tuple['score'] = float(score)
                    if date != '':
                        book_tuple['date'] = date
                    if pages != '':
                        temp = re.search(page_pat, pages)
                        if temp:
                            book_tuple['pages'] = int(temp.group(1))
                    if price != '':
                        temp = re.search(price_pat,price)

                        if temp and temp.group(1) != '':
                            f = float(temp.group(1))
                            e = 1.0

                            if 'NT$' in price or '台幣$' in price or 'TWD' in price or 'twd' in price:
                                e = 0.2167
                            elif 'EUR' in price or 'Eur' in price or 'eur' in price or '€' in price:
                                e = 7.3297
                            elif 'R$' in price:
                                e = 2.1725
                            elif 'GBP' in price or '￡' in price or 'pounds' in price:
                                e = 8.4209
                            elif '卢比' in price:
                                e = 0.1015
                            elif 'HK$' in price:
                                e = 0.8941
                            elif 'JPY' in price or '日元' in price or '円' in price or '日币' in price:
                                e =0.0596
                            elif 'USD' in price or '$' in price:
                                e = 6.9341
                            f = e * f
                            book_tuple['price'] = f
                    # if data['publisher'] != '' and data['code'] != '' and data['ISBN'] != '' and data['name'] !='' and data['author'] != '' and data['price'] != '' and data['score'] != '' and data['date'] != '' and data['pages'] != '':
                    #     count=count+1
                    # if data['publisher'] != '' and data['publisher'] not in publishers:
                    #     publishers.add(data['publisher'])
                    collection.insert(json.loads(json.dumps(book_tuple)))
                except Exception, e:
                    print line, str(e)
                    ##print(str(e))

    print "total count:", count, "replicate count:", replicate, "expend time:", time.time()-start



if __name__ == '__main__':
    try:
        parse()
        #get_money_unit()
    except Exception,e:
        print(str(e))

