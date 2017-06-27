#coding=utf-8
import sys
reload(sys)
import os
import time
import codecs

def parse_action(file_name):
    try:
        start=time.time()
        count = 0
        with codecs.open(file_name,mode='rb',encoding='GBK') as f:
            for line in f:
                try:
                    line = line.strip()
                    count += 1

                except Exception,exx:
                    print "内层",count,str(exx)
                    print "sum1 count:",count,"time spend:",time.time()-start
        print "sum count:",count,"time spend:",time.time()-start
    except Exception,ex:
        print "外层",str(ex)

if __name__ == '__main__':
    file_name = 'H:\\JDATA\\data\\JData_Action_0301_0315.csv'
    parse_action(file_name)