#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
import os
import codecs
import json
import re
'''
{
    "待机时长": {
        "count": 10360,
        "value": "5-7小时"
    },
    "内存总容量": {
        "count": 15,
        "value": "8G"
    },
    "操作系统": {
        "count": 15,
        "value": "Windows10"
    },
    "屏幕尺寸": {
        "count": 10357,
        "value": "14.0英寸"
    },
    "特性": {
        "count": 10125,
        "value": "窄边框，触控屏，背光键盘"
    },
    "类别": {
        "count": 6,
        "value": "集线器（HUB）"
    },
    "商品毛重": {
        "count": 10383,
        "value": "1.89kg"
    },
    "支持CPU颗数": {
        "count": 14,
        "value": "1颗"
    },
    "适用机型": {
        "count": 3,
        "value": "笔记本"
    },
    "sku": {
        "count": 10383,
        "value": "1816362977"
    },
    "商品名称": {
        "count": 10383,
        "value": "联想（Lenovo）Yoga710 14英寸PC平板二合一超薄触控翻转游戏笔记本电脑 I5-7200U/8G/256G固态/2G独显金色"
    },
    "分辨率": {
        "count": 10358,
        "value": "全高清屏（1920×1080）"
    },
    "商品产地": {
        "count": 3280,
        "value": "中国大陆"
    },
    "Raid卡缓存": {
        "count": 12,
        "value": "无缓存"
    },
    "硬盘转速": {
        "count": 15,
        "value": "5400 RPM"
    },
    "类型": {
        "count": 14,
        "value": "移动工作站"
    },
    "裸机重量": {
        "count": 10357,
        "value": "1.5-2kg"
    },
    "price": {
        "count": 10383,
        "value": "6399.00"
    },
    "处理器": {
        "count": 10304,
        "value": "Intel i5低功耗版"
    },
    "货号": {
        "count": 1733,
        "value": "D17"
    },
    "硬盘类型": {
        "count": 15,
        "value": "混合硬盘"
    },
    "brand": {
        "count": 10383,
        "value": "联想（Lenovo）"
    },
    "硬盘容量": {
        "count": 10360,
        "value": "256G固态"
    },
    "电源": {
        "count": 14,
        "value": "非冗余"
    },
    "游戏性能": {
        "count": 6319,
        "value": "入门级"
    },
    "显卡类别": {
        "count": 10334,
        "value": "入门级游戏独立显卡"
    },
    "硬盘总容量": {
        "count": 15,
        "value": "1T-2T"
    },
    "配件类型": {
        "count": 3,
        "value": "非原装笔记本配件"
    },
    "显存": {
        "count": 15,
        "value": "2G"
    },
    "厚度": {
        "count": 10343,
        "value": "15.1mm—20.0mm"
    },
    "分类": {
        "count": 9994,
        "value": "游戏本，轻薄本，二合一笔记本，常规笔记本，加固笔记本，其它"
    },
    "系统": {
        "count": 10361,
        "value": "Windows 10"
    },
    "显存容量": {
        "count": 10357,
        "value": "2G"
    },
    "显卡型号": {
        "count": 10354,
        "value": "GT940M"
    },
    "机箱规格": {
        "count": 14,
        "value": "笔记本式"
    },
    "内存类型": {
        "count": 13,
        "value": "Non-ECC"
    },
    "店铺": {
        "count": 9114,
        "value": ""
    },
    "商品编号": {
        "count": 10383,
        "value": "1816362977"
    },
    "内存容量": {
        "count": 10360,
        "value": "4G"
    }
}
'''
def parse_pcs(fileName):
    record = {}
    sset = set()
    p1 = re.compile(r'[^0-9]+')
    try:
        wf = codecs.open(r'D:\learn\laptop\data.dat',mode='wb',encoding='utf-8')
        with codecs.open(fileName,mode='rb',encoding='utf-8') as f:
            for line in f:
                try:
                    data = json.loads(line.strip())
                    if len(data) > 2:
                        res = {}
                        for key in data:
                            ## key总结，见上注释
                            # if record.has_key(key):
                            #     record[key]['count'] += 1
                            #     record[key]['value'] = data[key]
                            # else:
                            #     record[key] = {}
                            #     record[key]['count'] = 1
                            #     record[key]['value'] = data[key]
                            if key == u'待机时长':
                                res['idle'] = avgg(p1.split(data[key])) ## res['idle']
                            elif key == u'内存总容量' or key == u'内存容量':
                                ramdist(data[key],res) ## res['ram']
                            elif key == u'屏幕尺寸':
                                screenopr(data[key],res) ## res['screen']
                            elif key == u'商品毛重':
                                if data[key].find('kg') < 0: continue
                                res['weight'] = weight(data[key]) ## res['weight']
                            elif key == u'sku':
                                res['sku'] = data[key]
                            elif key == u'price':
                                res['price'] = float(data[key])
                                if res['price'] < 500: continue
                                res['price'] /= 1000
                            elif key == u'处理器':
                                coredist(data[key],res) ## res['core']
                            elif key == u'硬盘容量':
                                discdist(data[key],res) ## res['ssd']  res['disc']
                            elif key == u'显卡类别':
                                nvidiadist(data[key],res) ## res['nvidia']
                            elif key == u'brand':
                                branddist(data[key],res) ## res['brand']
                            elif key == u'分辨率':
                                resolutionratio(data[key],res) ## res['resolution']
                            elif key == u'厚度':
                                depthdist(data[key],res) ## res['depth']
                            elif key == u'显存容量':
                                vramdist(data[key],res) ## res['vram']
                            elif key == u'系统':
                                systemdist(data[key],res) ## res['system']
                                key_record(record,key,data)
                        strr = json.dumps(dict(res))+'\n'
                        # print strr.decode("unicode_escape")
                        wf.write(strr.decode("unicode_escape"))
                except Exception,exx:
                    print 'json parse except',str(exx),line
    except Exception,ex:
        print "outter exception",str(ex)

    ress = json.dumps(dict(record))+'\n'
    print ress.decode("unicode_escape")

def avgg(digits):
    i = 0
    s = 0
    av = 0
    for d in digits:
        if d != '':
            s += int(d)
            i += 1
    if i > 0: av = s/i
    return av

def ramdist(value,res):
    if value == u'2G': res['ram'] = 2
    elif value == u'32G': res['ram'] = 32
    elif value == u'4G': res['ram'] = 4
    elif value == u'16G': res['ram'] = 16
    elif value == u'8G': res['ram'] = 8

def screenopr(value,res):
    if value == u'13.3英寸': res['screen'] = 13.3
    elif value == u'14.0英寸': res['screen'] = 14.0
    elif value == u'12.5英寸': res['screen'] = 12.5
    elif value == u'11.6英寸' : res['screen'] = 11.6
    elif value == u'18.4英寸' : res['screen'] = 18.4
    elif value == u'17.3英寸' : res['screen'] = 17.3
    elif value == u'15.6英寸' : res['screen'] = 15.6

def weight(value):
    return float(value[:-2])

def coredist(value,res):
    if value == u'Intel i3': res['core'] = 3
    elif value == u'AMD系列': res['core'] = 1
    elif value == u'Intel CoreM': res['core'] = 2
    elif value == u'桌面级处理器': res['core'] = 4
    elif value == u'至强Xeon-E3': res['core'] = 5
    elif value == u'酷睿Core i5': res['core'] = 7
    elif value == u'Intel i5低功耗版': res['core'] = 8
    elif value == u'Intel 其他': res['core'] = 6
    elif value == u'Intel i5标准电压版': res['core'] = 9
    elif value == u'Intel i7低功耗版': res['core'] = 10
    elif value == u'酷睿Core i7': res['core'] = 11
    elif value == u'Intel i7标准电压版': res['core'] = 12

def discdist(value,res):
    if value == u'512G固态': res['ssd'] = 5.12
    elif value == u'256G固态': res['ssd'] = 2.56
    elif value == u'1T': res['disc'] = 10.24
    elif value == u'256G+1T':res['ssd'] = 2.56; res['disc'] = 10.24
    elif value == u'128G+1T':res['ssd'] = 1.28; res['disc'] = 10.24
    elif value == u'128G固态':res['ssd'] = 1.28
    elif value == u'500G':res['disc'] = 5.00
    elif value == u'128G+500G':res['ssd'] = 1.28; res['disc'] = 5.00
    elif value == u'512G+1T':res['ssd'] = 5.12;res['disc'] = 10.24
    elif value == u'192G固态':res['ssd'] = 1.92
    elif value == u'混合硬盘':res['ssd'] = 2.56; res['disc'] = 2.56

def nvidiadist(value,res):
    if value == u'入门级游戏独立显卡': res['nvidia'] = 1
    elif value == u'集成显卡': res['nvidia'] = 2
    elif value == u'高性能游戏独立显卡':res['nvidia'] = 3

def branddist(value,res):
    if value == u'雷蛇（RAZER）' or value == u'雷蛇（Razer）':res['brand'] = u'雷蛇(Razer)'
    elif value == u'联想（Lenovo）' or value == u'联想' or value == u'联想（lenovo）' or value == u'联想（LENOVO）':res['brand'] = u'联想(lenovo)'
    elif value == u'海尔（haier）' or value == u'海尔（Haier）': res['brand'] = u'海尔(haier)'
    elif value == u'小米' or value == u'小米（MI）': res['brand'] = u'小米(MI)'
    elif value == u'得峰（Deffad）' or value == u'得峰（deffpad）': res['brand'] = u'得峰(Deffad)'
    elif value == u'惠普（HP）' or value == u'惠普（hp）' or value == u'惠普（H P）' or value == u'hp' or value == u'HP': res['brand'] = u'惠普(hp)'
    elif value == u'华为（HUAWEI）' or value == u'华为': res['brand'] = u'华为'
    elif value == u'宏碁（ACER）' or value == u'宏碁（acer）' or value == u'acer': res['brand'] = u'宏碁(acer)'
    elif value == u'戴尔' or value == u'戴尔（DELL）': res['brand'] = u'戴尔(DELL)'
    elif value == u'APPLE' or value == u'苹果（Apple）' or value == u'APPLE苹果' or value == u'Apple': res['brand'] = u'苹果(apple)'
    else:res['brand'] = value.decode("unicode_escape")

def resolutionratio(value,res):
    if value == u'标准屏（1366×768）': res['resolution'] = 1
    elif value == u'高分屏（1600×900）': res['resolution'] = 2
    elif value == u'全高清屏（1920×1080）': res['resolution'] = 3
    elif value == u'超高清屏（2K/3k/4K)': res['resolution'] = 4
    else: res['resolution'] = 0

def depthdist(value,res):
    if value == u'10.0mm—15.0mm': res['depth'] = 3
    elif value == u'20.0mm以上': res['depth'] = 1
    elif value == u'15.1mm—20.0mm': res['depth'] = 2
    elif value == u'10.0mm以下': res['depth'] = 4

def vramdist(value,res):
    if value == u'2G': res['vram'] = 2
    elif value == u'1G': res['vram'] = 1
    elif value == u'6G': res['vram'] = 6
    elif value == u'4G': res['vram'] = 4
    elif value == u'3G': res['vram'] = 3
    elif value == u'8G': res['vram'] = 8
    else:res['vram'] = 0

def systemdist(value,res):
    if value == u'Windows 10': res['system'] = 5
    elif value == u'MAC': res['system'] = 6
    elif value == u'Windows 8': res['system'] = 4
    elif value == u'DOS/Linux': res['system'] = 3
    elif value == u'Windows 7': res['system'] = 2
    else: res['system'] = 1

def key_record(record,key,data):
    if record.has_key(data[key]):
        record[data[key]] += 1
    else:
        record[data[key]] = 1

if __name__ == '__main__':
    parse_pcs(r'D:\learn\laptop\record.dat')