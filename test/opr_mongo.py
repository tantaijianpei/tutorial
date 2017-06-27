#coding=utf-8
import sys
reload(sys)
import datetime
from pymongo import *
import time
import re
import codecs

def mv_data():
    try:
        digit_pat = re.compile(r'.*(//d+).*')
        client1 = MongoClient("192.168.1.25", 27017)
        client2 = MongoClient("127.0.0.1", 27017)
        collection1 = client1.jd_db.laptop
        collection2 = client2.jd.laptop
        start=time.time()
        count = 0;
        f = codecs.open(r'D:\learn\test.dat',mode='wb',encoding='utf-8')
        for entity in collection1.find():
            try:
                count=count+1
                name = ''.join(entity['name'])
                date = datetime.datetime.strptime(entity['date'],'%Y%m%d')
                sku = ''.join(entity['sku'])

                url = ''.join(entity['url'])

                entity2 = {'name':name,'date':date,'sku':sku,'url':url}
                re1 = re.search(digit_pat,''.join(entity['rank']))
                if re1:
                    entity2['rank'] = int(re1.group(1))

                # collection2.insert(entity2)
            except Exception, exc:
                print str(exc),entity


        print "expend time:", time.time()-start,"sum count:",count
    except Exception, ex:
        print str(ex), 'spend:', time.time()-start

def file2mongo():
    try:
        date_str = '20170305'
        date = datetime.datetime.strptime(date_str,'%Y%m%d')

        client = MongoClient("127.0.0.1", 27017)
        collection = client.jd.laptop

        f_name = r'D:\learn\laptop\laptop'+date_str+r'.dat'
        f = codecs.open(f_name,encoding='utf-8')
        for line in f:
            arr = line.split('\t')
            if len(arr) == 5:
                res = {}
                ns = arr[0].split(':')
                if len(ns) == 2 and ns[1] and len(ns[1]) > 0:
                    res['name'] = ns[1]

                res['date'] = date

                ss = arr[2].split(':')
                if len(ss) == 2 and ss[1] and len(ss[1]) > 0:
                    res['sku'] = ss[1]
                us = arr[4].split(':')
                if len(us) == 2 and us[1] and len(us[1]) > 0:
                    res['url'] = us[1]
                ps = arr[1].split(':')
                if len(ps) == 2 and ps[1] and len(ps[1]) > 0:
                    res['price'] = ps[1]
                rs =arr[3].split(':')
                if len(rs) == 2 and rs[1] and len(rs[1]) > 0:
                    res['rank'] = rs[1]

                if len(res) > 0:
                    collection.insert(res)
                    # print str(res)

            else:
                print "不完整的实体 ",line
    except Exception, ex:
        print str(ex)

if __name__ == '__main__':
    file2mongo()