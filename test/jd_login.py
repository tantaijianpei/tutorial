#coding=utf-8
import sys
reload(sys)
from selenium import webdriver
from selenium.webdriver.common.keys import Keys  #需要引入keys包
from lxml import etree
import os
import time

username = ''
pwd = ''

def begin_parse():
    try:
        begin_url="https://passport.jd.com/uc/login"
        chrome_driver = os.path.abspath(r'C:\Program Files (x86)\Google\Chrome\Application\chromedriver.exe')
        os.environ["webdriver.chrome.driver"] = chrome_driver
        driver = webdriver.Chrome(chrome_driver)
        driver.get(begin_url)
        elem = driver.find_element_by_class_name(r"login-tab-r")
        elem.click()
        driver.find_element_by_id(r"loginname").send_keys(username)
        driver.find_element_by_id(r"nloginpwd").send_keys(pwd)
        driver.find_element_by_id(r"loginsubmit").send_keys(Keys.ENTER)
        time.sleep(2)
        driver.get("http://trade.jr.jd.com/ajaxFinance/financeMainData.action?type=0&_dc=1498401305341")
        html=driver.page_source
        print html
    except Exception,ex:
        print str(ex)

if __name__ == '__main__':
    begin_parse()