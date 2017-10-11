#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
import os
import codecs
import json
import numpy as np
from sklearn.cluster import KMeans

def get_data(fileName,attrs):
    result = []
    datas = []
    with codecs.open(fileName,mode='rb') as f:
        for line in f:
            items = []
            try:
                data = json.loads(line.strip())
                if attrs['idle']:
                    if data.has_key('idle'): items.append(data['idle'])
                    else: items.append(0);data['idle'] = 0

                if attrs['ram']:
                    if data.has_key('ram'): items.append(data['ram'])
                    else: items.append(1);data['ram'] = 0

                if attrs['screen']:
                    if data.has_key('screen'): items.append(data['screen'])
                    else: items.append(13.3);data['screen'] = 13.3

                if attrs['weight']:
                    if data.has_key('weight'): items.append(data['weight'])
                    else: items.append(2.0);data['weight'] = 2.0

                if attrs['core']:
                    if data.has_key('core'): items.append(data['core'])
                    else: items.append(0);data['core'] = 0

                if attrs['ssd']:
                    if data.has_key('ssd'): items.append(data['ssd'])
                    else: items.append(0);data['ssd'] = 0

                if attrs['disc']:
                    if data.has_key('disc'): items.append(data['disc'])
                    else: items.append(0);data['disc'] = 0

                if attrs['nvidia']:
                    if data.has_key('nvidia'): items.append(data['nvidia'])
                    else: items.append(0);data['nvidia'] = 0

                if attrs['resolution']:
                    if data.has_key('resolution'): items.append(data['resolution'])
                    else: items.append(0);data['resolution'] = 0

                if attrs['depth']:
                    if data.has_key('depth'): items.append(data['depth'])
                    else:items.append(0);data['depth'] = 0

                if attrs['vram']:
                    if data.has_key('vram'): items.append(data['vram'])
                    else:items.append(0);data['vram'] = 0

                if attrs['system']:
                    if data.has_key('system'): items.append(data['system'])
                    else:items.append(0);data['system'] = 0

                if not data.has_key('price'):data['price'] = 0
                if attrs['price']:
                    if data.has_key('price'): items.append(data['price'])
                    else: items.append(0.0)
                result.append(items)
                datas.append(data)
            except Exception,ex:
                print 'file parse except',str(ex)



    return np.array(result),datas

def label_count(labels,n,datas):
    cs = n * [0]
    details = [[] for i in range(n)]
    index = 0
    for i in labels:
        cs[i] += 1
        details[i].append(datas[index]['sku'])
        index += 1
    return cs,details

def get_details(fileName):
    result = {}
    with codecs.open(fileName,mode='rb') as f:
        for line in f:
            try:
                data = json.loads(line.strip())
                result[data['sku']]=data
            except Exception,ex:
                print 'get details except',str(ex)

    return result

def get_mapdata(datas):
    mmp = {}
    for d in datas:
        mmp[d['sku']] = d
    return  mmp

def analyse(ds,css,datas,attrs):
    res = []
    index = 0
    for dd in ds:
        '''dd 是某一类别的sku列表'''
        mp = {'num':css[index]}
        idle_min = 100.0
        idle_max = 0.0
        idle_sum = 0.0
        ramInfo = {'2G':0,'32G':0,'4G':0,'16G':0,'8G':0,'otr':0}
        screenInfo = {11.6:0,12.5:0,13.3:0,14.0:0,15.6:0,17.3:0,18.4:0}
        weightInfo = {'weight_min':100.0,'weight_max':0.0,'weight_avg':0.0}
        coreInfo = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,}
        ssdInfo = {'ssd_min':100.0,'ssd_max':0.0,'ssd_avg':0.0}
        discInfo = {'disc_min':100.0,'disc_max':0.0,'disc_avg':0.0}
        nvidiaInfo = {0:0,1:0,2:0,3:0}
        resolutionInfo = {0:0,1:0,2:0,3:0,4:0}
        depthInfo = {0:0,1:0,2:0,3:0,4:0}
        vramInfo = {0:0,1:0,2:0,3:0,4:0,6:0,8:0}
        systemInfo = {0:0,1:0,2:0,3:0,4:0,5:0,6:0}
        priceInfo = {'price_min':10000.0,'price_max':0.0,'price_avg':0.0}
        
        for sku in dd:
            try:
                if attrs['idle']:
                    idle_min = min(idle_min,datas[sku]['idle'])
                    idle_max = max(idle_max,datas[sku]['idle'])
                    idle_sum += datas[sku]['idle']

                if attrs['ram']:
                    if datas[sku]['ram'] == 2: ramInfo['2G'] += 1
                    elif datas[sku]['ram'] == 32: ramInfo['32G'] += 1
                    elif datas[sku]['ram'] == 4: ramInfo['4G'] += 1
                    elif datas[sku]['ram'] == 16: ramInfo['16G'] += 1
                    elif datas[sku]['ram'] == 8: ramInfo['8G'] += 1
                    else: ramInfo['otr'] += 1
                if attrs['screen']:
                    screenInfo[datas[sku]['screen']] += 1

                if attrs['weight']:
                    weightInfo['weight_min'] = min(weightInfo['weight_min'],datas[sku]['weight'])
                    weightInfo['weight_max'] = max(weightInfo['weight_max'],datas[sku]['weight'])
                    weightInfo['weight_avg'] += datas[sku]['weight']

                if attrs['core']:
                    coreInfo[datas[sku]['core']] += 1

                if attrs['ssd']:
                    ssdInfo['ssd_min'] = min(ssdInfo['ssd_min'],datas[sku]['ssd'])
                    ssdInfo['ssd_max'] = max(ssdInfo['ssd_max'],datas[sku]['ssd'])
                    ssdInfo['ssd_avg'] += datas[sku]['ssd']

                if attrs['disc']:
                    discInfo['disc_min'] = min(discInfo['disc_min'],datas[sku]['disc'])
                    discInfo['disc_max'] = max(discInfo['disc_max'],datas[sku]['disc'])
                    discInfo['disc_avg'] += datas[sku]['disc']

                if attrs['nvidia']:
                    nvidiaInfo[datas[sku]['nvidia']] += 1
                if attrs['resolution']:
                    resolutionInfo[datas[sku]['resolution']] += 1
                if attrs['depth']:
                    depthInfo[datas[sku]['depth']] += 1
                if attrs['vram']:
                    vramInfo[datas[sku]['vram']] += 1
                if attrs['system']:
                    systemInfo[datas[sku]['system']] += 1

                # if attrs['price']:
                priceInfo['price_min'] = min(priceInfo['price_min'],datas[sku]['price'])
                priceInfo['price_max'] = max(priceInfo['price_max'],datas[sku]['price'])
                priceInfo['price_avg'] += datas[sku]['price']
            except Exception,exxx:
                print 'exxx',str(exxx)

        if attrs['idle']:
            idle_avg = idle_sum / len(dd)
            idleInfo = {'idle_min':idle_min,'idle_max':idle_max,'idle_avg':idle_avg}
            mp['idleInfo'] = idleInfo
        if attrs['ram']:
            mp['ramInfo'] = ramInfo
        if attrs['screen']:
            mp['screenInfo'] = screenInfo
        if attrs['weight']:
            weightInfo['weight_avg'] = weightInfo['weight_avg'] / len(dd)
            mp['weightInfo'] = weightInfo
        if attrs['core']:
            mp['coreInfo'] = coreInfo
        if attrs['ssd']:
            ssdInfo['ssd_avg'] = ssdInfo['ssd_avg'] / len(dd)
            ssdInfo['ssd_min'] *= 100
            ssdInfo['ssd_max'] *= 100
            ssdInfo['ssd_avg'] *= 100
            mp['ssdInfo'] = ssdInfo
        if attrs['disc']:
            discInfo['disc_avg'] = discInfo['disc_avg'] / len(dd)
            discInfo['disc_min'] *= 100
            discInfo['disc_max'] *= 100
            discInfo['disc_avg'] *= 100
            mp['discInfo'] = discInfo
        if attrs['nvidia']:
            mp['nvidiaInfo'] = nvidiaInfo
        if attrs['resolution']:
            mp['resolutionInfo'] = resolutionInfo
        if attrs['depth']:
            mp['depthInfo'] = depthInfo
        if attrs['vram']:
            mp['vramInfo'] = vramInfo
        if attrs['system']:
            mp['systemInfo'] = systemInfo
        # if attrs['price']:
        priceInfo['price_avg'] = priceInfo['price_avg'] / len(dd)
        priceInfo['price_min'] *= 1000
        priceInfo['price_max'] *= 1000
        priceInfo['price_avg'] *= 1000
        mp['priceInfo'] = priceInfo
        res.append(mp)
        index += 1

    return res



if __name__ == '__main__':
    attrs = {
        'idle':False,
        'ram':True,
        'screen':False,
        'weight':False,
        'core':True,
        'ssd':False,
        'disc':False,
        'nvidia':False,
        'resolution':False,
        'depth':False,
        'vram':False,
        'system':True,
        'price':False
    }
    arr,datas = get_data(r'D:\learn\laptop\data.dat',attrs)
    n_class = 3
    kmeans = KMeans(n_clusters=n_class,random_state=0).fit(arr)
    # print kmeans.labels_,kmeans.cluster_centers_
    css,ds = label_count(kmeans.labels_,n_class,datas) ## css 各类别中的个数，ds 各类别包含的sku列表
    # mapDetails = get_details(r'D:\learn\laptop\record.dat')
    dmp = get_mapdata(datas)
    resMap = analyse(ds,css,dmp,attrs)
    i = 0
    for m in resMap:
        print '>>>>>>>>>>>>>>>类别',i
        i += 1
        print json.dumps(m,sort_keys=True, indent=2) ## json格式化输出

