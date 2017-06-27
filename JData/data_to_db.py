#coding=utf-8
import sys
reload(sys)
import os
import time
import codecs
from pymongo import *
import datetime

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

def parse_user(file_name):
    try:
        start=time.time()
        client = MongoClient("127.0.0.1", 27017)
        db = client.jdData
        collection = db.user
        count = 0
        with codecs.open(file_name,mode='rb',encoding='GBK') as f:
            for line in f:
                try:
                    line = line.strip()
                    count += 1
                    ds = line.split(',')
                    if len(ds) == 5:
                        entity = {}
                        userId = ds[0].strip()
                        if userId != '':
                            entity['userId'] = int(userId)
                        age = ds[1].strip()
                        if age == 'NULL': age = '-1'
                        if age != '':
                            entity['age'] = int(age)
                        sex = ds[2].strip()
                        if sex == 'NULL': sex = '2'
                        if sex != '':
                            entity['sex'] = int(sex)
                        userLevel = ds[3].strip()
                        if userLevel != '':
                            entity['userLevel'] = int(userLevel)
                        registerDate = ds[4].strip()
                        if registerDate != '' and registerDate != 'NULL':
                            entity['registerDate'] = registerDate
                        collection.insert(entity)
                    else:
                        print "记录格式不正确",line
                except Exception,exx:
                    print "内层",count,str(exx)
                    print "sum1 count:",count,"time spend:",time.time()-start
        print "sum count:",count,"time spend:",time.time()-start
    except Exception,ex:
        print "外层",str(ex)

def parse_product(file_name):
    try:
        start=time.time()
        client = MongoClient("127.0.0.1", 27017)
        db = client.jdData
        collection = db.product
        count = 0
        with codecs.open(file_name,mode='rb',encoding='GBK') as f:
            for line in f:
                try:
                    line = line.strip()
                    count += 1
                    ds = line.split(',')
                    if len(ds) == 6:
                        entity = {}
                        skuId = ds[0].strip()
                        if skuId != '':
                            entity['skuId'] = int(skuId)
                        attr1 = ds[1].strip()
                        if attr1 != '':
                            entity['attr1'] = int(attr1)
                        attr2 = ds[2].strip()
                        if attr2 != '':
                            entity['attr2'] = int(attr2)
                        attr3 = ds[3].strip()
                        if attr3 != '':
                            entity['attr3'] = int(attr3)
                        cate = ds[4].strip()
                        if cate != '':
                            entity['cate'] = int(cate)
                        brand =ds[5].strip()
                        if brand != '':
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

def parse_comment(file_name):
    try:
        start=time.time()
        client = MongoClient("127.0.0.1", 27017)
        db = client.jdData
        collection = db.comment
        count = 0
        with codecs.open(file_name,mode='rb',encoding='GBK') as f:
            for line in f:
                try:
                    line = line.strip()
                    count += 1
                    ds = line.split(',')
                    if len(ds) == 5:
                        entity = {}
                        date_str = ds[0].strip()
                        if date_str != '':
                            date = datetime.datetime.strptime(date_str,'%Y-%m-%d')
                            entity['date'] = date
                        skuId = ds[1].strip()
                        if skuId != '':
                            entity['skuId'] = int(skuId)
                        commnetNum = ds[2].strip()
                        if commnetNum != '':
                            entity['commnetNum'] = int(commnetNum)
                        badComment = ds[3].strip()
                        if badComment != '':
                            entity['badComment'] = int(badComment)
                        badRate = ds[4].strip()
                        if badRate != '':
                            entity['badRate'] = float(badRate)
                        collection.insert(entity)
                    else:
                        print "记录格式不正确",line
                except Exception,exx:
                    print "内层",count,str(exx)
                    print "sum1 count:",count,"time spend:",time.time()-start
        print "sum count:",count,"time spend:",time.time()-start
    except Exception,ex:
        print "外层",str(ex)

def get_sku():
    try:
        start=time.time()
        client = MongoClient("127.0.0.1", 27017)
        db = client.jdData
        sku_set = set()
        comment = db.comment
        action = db.action
        product = db.product
        coskus = comment.distinct("skuId") ## 评论
        acskus = action.distinct("skuId") ##用户行为
        prskus = product.distinct("skuId") ##候选商品集合
        coset = set(coskus)
        acset = set(acskus)
        prset = set(prskus)

        # sku_set.update(coskus)
        # sku_set.update(acskus)
        # sku_set.update(prset)
        intersect = coset & acset & prset
        # print len(sku_set),len(acset),len(coset),len(prset)
        print len(intersect)
        ## 获取既有用户评论数据/用户行为数据候选商品集中的用户行为数据
        # count = 0
        # skuCount = 0
        # filAction = db.filAction
        # for sku in intersect:
        #     subId = 0
        #     skuCount += 1
        #     for item in action.find({"skuId":sku}):
        #         count += 1
        #         subId += 1
        #         item["subId"] = subId
        #         filAction.insert(item)
        #     print "sku:",sku,"sku count:",skuCount,"sub num:",subId
        #
        # print "sum count:",count,"time spend:",time.time()-start
    except Exception,ex:
        print "get sku exception:",str(ex)

if __name__ == '__main__':
    file_name = 'H:\\JDATA\\data\\JData_Product.csv'
    # parse_action(file_name)
    # parse_user(file_name)
    # parse_product(file_name)
    # parse_comment(file_name)
    get_sku()