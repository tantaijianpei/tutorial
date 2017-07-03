#coding=utf8

import httplib
def getHttpResponse(host,path):
    httpClient = None
    res = ''
    try:
        httpClient = httplib.HTTPConnection(host, timeout=30)
        httpClient.request('GET', path)

        #response是HTTPResponse对象
        response = httpClient.getresponse()
        print response.status
        print response.reason
        res = response.read()
    except Exception, e:
        print e
    finally:
        if httpClient:
            httpClient.close()
        return res

if __name__ == '__main__':
    # host = 'trade.jr.jd.com'
    # path = '/ajaxFinance/financeMainData.action?type=0&_dc=1498392460636'
    str = getHttpResponse('hq2fls.eastmoney.com','/EM_Quote2010PictureApplication/Flash.aspx?Type=CR&ID=6008281&lastNum=3&csum=E87E0399&cnum=239&ctype=0')
    # str = getHttpResponse(host,path)
    print str