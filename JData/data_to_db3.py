#coding=utf-8
import sys
reload(sys)
import os
import time
import codecs
from pymongo import *

def parse_action(file_name):
    try:
        start=time.time()
        client = MongoClient("127.0.0.1", 27017)
        db = client.jdData
        collection = db.action
        count = 0
        with codecs.open(file_name,mode='rb',encoding='GBK') as f:
            for line in f:
                try:
                    line = line.strip()
                    count += 1
                    ds = line.split(',')
                    if len(ds) == 7:
                        entity = {}
                        userId = ds[0].strip()
                        if userId != '':
                            entity['userId'] = int(userId)
                        skuId = ds[1].strip()
                        if skuId != '':
                            entity['skuId'] = int(skuId)
                        entity['time'] = ds[2]
                        modelId = ds[3].strip()
                        if modelId != '':
                            entity['modelId'] = int(modelId)
                        type = ds[4].strip()
                        if type != '':
                            entity['type'] = int(type)
                        cate = ds[5].strip()
                        if cate != '':
                            entity['cate'] = int(cate)
                        brand = ds[6].strip()
                        if brand !='':
                            entity['brand'] = int(brand)
                        collection.insert(entity)
                    else:
                        print "记录格式不正确",line
                except Exception,exx:
                    print "内层",count,str(exx)
                    print "sum1 count:",count,"time spend:",time.time()-start
        print "sum count:",count,"time spend:",time.time()-start
    except Exception,ex:
        print "外层",str(ex)

if __name__ == '__main__':
    file_name = 'H:\\JDATA\\data\\JData_Action_0401_0415.csv'
    # parse_action(file_name)