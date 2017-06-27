# coding=utf-8
import sys

reload(sys)
sys.setdefaultencoding('utf-8')

import json
import re
import time
import codecs
from pymongo import *


def bra_parse():
    with codecs.open(r'H:\test\test.json', encoding='GBK') as f:
        data = json.load(f)
        print(data)


if __name__ == '__main__':
    try:
        bra_parse()
    except Exception, ex:
        print str(ex)


