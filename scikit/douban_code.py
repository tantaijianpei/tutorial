#coding=utf-8
import sys
reload(sys)
import os
from selenium import webdriver
from lxml import etree
import datetime
from pymongo import *
import re
import time
import urllib

class crawl_douban_code:
    n = 0
    sleep_time = 11 * 60
    html_url = 'https://www.douban.com/accounts/login'

    def getImg(self,img_url):
        print 'img count:',self.n

        urllib.urlretrieve(img_url,'D:\\learn\\img\\codes\\code%d_%d.jpg' % (int(time.time()), self.n))
        self.n += 1

    def crawlBegin(self):
        try:
            chrome_driver = os.path.abspath(r'C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe')
            os.environ["webdriver.chrome.driver"] = chrome_driver
            driver = webdriver.Chrome(chrome_driver)
            driver.get(self.html_url)
            img_url = None
            try:
                img_url = driver.find_element_by_id('captcha_image')
            except Exception,ex:
                print 'sleep time:',time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
                time.sleep(float(self.sleep_time))
                print 'weak up:',time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
                driver.get(self.html_url)
                img_url = driver.find_element_by_id('captcha_image')

            while img_url:
                href = img_url.get_attribute('src')
                self.getImg(href)
                driver.get(self.html_url)
                try:
                    img_url = driver.find_element_by_id('captcha_image')
                except Exception,ex:
                    print 'sleep time:',time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
                    time.sleep(float(self.sleep_time))
                    print 'weak up:',time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
                    driver.get(self.html_url)
                    img_url = driver.find_element_by_id('captcha_image')
        except Exception,ex:
            print str(ex)


if __name__ == '__main__':
    entity = crawl_douban_code()
    entity.crawlBegin()