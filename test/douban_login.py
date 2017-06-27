#coding=utf-8
import sys
reload(sys)
sys.setdefaultencoding('utf8')
from selenium import webdriver
from selenium.webdriver.common.keys import Keys  #需要引入keys包
from lxml import etree
import os
import urllib
import time

email = r'tantaijianpei@gmail.com'
pwd = r'tianyuanjian99'

def begin_parse():
    try:
        begin_url="https://www.douban.com/accounts/login"
        chrome_driver = os.path.abspath(r'C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe')
        os.environ["webdriver.chrome.driver"] = chrome_driver
        driver = webdriver.Chrome(chrome_driver)
        driver.get(begin_url)
        driver.find_element_by_id(r"email").send_keys(email)
        img_url = getImgUrl(driver)
        if img_url:
            import img.code_svm as svm
            while img_url:
                driver.find_element_by_id(r"password").send_keys(pwd)
                img_path = getImg(img_url.get_attribute('src'))
                codes = svm.code_svm(img_path)
                for c in codes:
                    driver.find_element_by_id(r'captcha_field').send_keys(c)
                driver.find_element_by_name(r"login").send_keys(Keys.ENTER)
                time.sleep(1)
                img_url = getImgUrl(driver)
                if img_url: time.sleep(1)
        else:
            driver.find_element_by_id(r"password").send_keys(pwd)
            driver.find_element_by_name(r"login").send_keys(Keys.ENTER)
        driver.get("https://www.douban.com/people/89076795/")
        html=driver.page_source
        tree1=etree.HTML(html)
        content = tree1.xpath('//*[@class="note"]/text()')
        print content[0].encode('utf-8')
    except Exception,ex:
        print str(ex)


def getImg(img_url):
    img_path = 'D:\\learn\\img\\codes\\code%d.jpg' % (int(time.time()))
    urllib.urlretrieve(img_url,img_path)
    return img_path

def getImgUrl(driver):
    img_url = None
    try:
        img_url = driver.find_element_by_id('captcha_image')
    except:
        img_url = None
    return img_url


if __name__ == '__main__':
    begin_parse()