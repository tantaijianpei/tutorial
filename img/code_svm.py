#coding=utf-8
import sys
reload(sys)
import os
import time
from PIL import Image
import codecs
import numpy as np
from sklearn.svm import SVC
import matplotlib.pyplot as plt

sys.setrecursionlimit(1000000) ##递归层数限制
WHITE = (255,255,255)
BLACK = (0,0,0)
LIMIT_N = 10  ##噪点面积

def pre(img):
    width, height = img.size
    frame = img.load()
    threshold = 30
    for i in range(0, width):
        for j in range(0, height):
            p = frame[i, j]
            r, g, b = p
            if r > threshold or g > threshold or b > threshold:
                frame[i, j] = WHITE
            else:
                frame[i, j ] = BLACK


def check_black(point,more=False):
    if not more:
        r, g, b = point
        if r < 30 and g < 30 and b < 30:
            return True
        else:
            return False
    else:
        r, g, b, m = point
        if r < 30 and g < 30 and b < 30:
            return True
        else:
            return False

def calc_area(frame,x,y,x_size,y_size,n,r):
    '''
    递归求解各个黑色区域面积
    frame图片帧
    x高度坐标，y宽度坐标，注意frame先宽后高
    x_size图片的高度，y_size图片的宽度
    n二维数组内区域计数，第几个黑色区域，0为白色区域
    r区域标记二维数组
    '''
    s = 0
    point_n = frame[y,x]
    try:
        if check_black(point_n) and r[x][y] == 0:
            r[x][y] = n
            s += 1
            if x-1 >= 0:
                s += calc_area(frame,x-1,y,x_size,y_size,n,r)
            if x+1 < x_size:
                s += calc_area(frame,x+1,y,x_size,y_size,n,r)
            if y-1 >= 0:
                s += calc_area(frame,x,y-1,x_size,y_size,n,r)
            if y+1 < y_size:
                s += calc_area(frame,x,y+1,x_size,y_size,n,r)
            if x-1 >= 0 and y-1 >= 0:
                s += calc_area(frame,x-1,y-1,x_size,y_size,n,r)
            if x-1 >= 0 and y+1 < y_size:
                s += calc_area(frame,x-1,y+1,x_size,y_size,n,r)
            if x+1 < x_size and y-1 >= 0:
                s += calc_area(frame,x+1,y-1,x_size,y_size,n,r)
            if x+1 < x_size and y+1 < y_size:
                s += calc_area(frame,x+1,y+1,x_size,y_size,n,r)
    except Exception,ex:
        print str(ex)
    return s

def noise_remove(img):
    width, height = img.size
    frame = img.load()
    records = [([0] * width) for i in xrange(height)] ##区域标记二维数组
    res = [0]  ##标记黑色区域面积
    n = 1
    for i in xrange(width):
        for j in xrange(height):
            try:
                if check_black(frame[i,j]):
                    area_size = calc_area(frame,j,i,height,width,n,records)
                    if area_size > 0:
                        res.append(area_size)
                        n += 1
            except Exception,ex:
                print str(ex),ex

    x_min = [250 for i in xrange(n)]
    x_max = [0 for i in xrange(n)]
    y_min = [40 for i in xrange(n)]
    y_max = [0 for i in xrange(n)]
    ratio = [0.0 for i in xrange(n)] ##面积占方形区域的面积比例
    hdw = [0.0 for i in xrange(n)] ##高宽比例
    for i in xrange(width):
        for j in xrange(height):
            if res[records[j][i]] > 20:
                if x_min[records[j][i]] > i: x_min[records[j][i]] = i
                if x_max[records[j][i]] < i: x_max[records[j][i]] = i
                if y_min[records[j][i]] > j: y_min[records[j][i]] = j
                if y_max[records[j][i]] < j: y_max[records[j][i]] = j

    for i in xrange(n):
        if res[i] > 20:
            h = float(y_max[i] - y_min[i] + 1)
            w = float(x_max[i] - x_min[i] + 1)
            ratio[i] = float(res[i])/(h * w)
            hdw[i] = w/h
    # print "res:",res
    # print "ratio:",ratio
    # print "hdw:",hdw
    # print "xmin:",x_min
    # print "xmax:",x_max
    # print "ymin:",y_min
    # print "ymax:",y_max

    ##去除噪点，黑色区域面积小于LIMIT_N的为噪点
    for i in xrange(width):
        for j in xrange(height):
            try:
                if res[records[j][i]] < LIMIT_N or ratio[records[j][i]] > 0.5 and hdw[records[j][i]] > 1.5 \
                        or x_min[records[j][i]] == 0 or y_min[records[j][i]] == 0 and res[records[j][i]] > 25 or x_max[records[j][i]] == width -1 \
                        or x_max[records[j][i]] - x_min[records[j][i]] >35 and y_max[records[j][i]] - y_min[records[j][i]] > 25 \
                        or x_max[records[j][i]] - x_min[records[j][i]] >20 and y_max[records[j][i]] - y_min[records[j][i]] > 35: ##小于噪点面积 面积(所在方形区域)占比大于0.5且宽高比例大于0.5 都要去掉
                    frame[i,j] = WHITE
            except Exception,ex:
                print str(ex)
                # print "n:",n
                # print "records:"
                # for i in range(len(records)):
                #     print records[i]

def clear_img(img):
    width, height = img.size
    frame = img.load()
    records = [([0] * width) for i in xrange(height)] ##区域标记二维数组
    res = [0]  ##标记黑色区域面积
    n = 1
    for i in xrange(width):
        for j in xrange(height):
            try:
                if check_black(frame[i,j]):
                    area_size = calc_area(frame,j,i,height,width,n,records)
                    if area_size > 0:
                        res.append(area_size)
                        n += 1
            except Exception,ex:
                print str(ex),ex

    x_min = [width for i in xrange(n)]
    x_max = [0 for i in xrange(n)]
    for i in xrange(width):
        for j in xrange(height):
            if x_min[records[j][i]] > i: x_min[records[j][i]] = i
            if x_max[records[j][i]] < i: x_max[records[j][i]] = i

    for i in xrange(n):
        if x_min[i] == width:
            x_min[i] = 0

    sum_size = 0
    for i in xrange(len(res)): sum_size += res[i]

    areas = [] ##区域
    x_pre = x_post = 0
    ## n的序号是随着横向坐标的增长而增长的
    for i in xrange(n):
        if x_min[i] > 0:
            if x_pre == 0:
                x_pre = x_min[i]
                x_post = x_max[i]
                areas.append(i)
            else:
                if x_min[i] - x_post > 20 or len(areas) == 1 and res[areas[0]] < 20:
                    tmp_size = 0
                    for j in xrange(len(areas)): tmp_size += res[areas[j]]
                    if float(tmp_size)/float(sum_size) > 0.5: break ## 有效区域的面积占比肯定大于0.5
                    else:
                        areas = []
                        x_pre = x_min[i]
                        x_post = x_max[i]
                        areas.append(i)
                else:
                    x_post = x_post if x_post > x_max[i] else x_max[i]
                    areas.append(i)
    # print areas

    ## for 循环出来之后areas中存储的是字符所在的区域

    # 用此for函数可以更加优化图片的显示
    for i in xrange(width):
        for j in xrange(height):
            if records[j][i] not in areas:
                frame[i,j] = WHITE

def get_letter(img,img_code):
    width, height = img.size
    frame = img.load()
    records = [([0] * width) for i in xrange(height)] ##区域标记二维数组
    res = [0]  ##标记黑色区域面积
    n = 1
    for i in xrange(width):
        for j in xrange(height):
            try:
                if check_black(frame[i,j]):
                    area_size = calc_area(frame,j,i,height,width,n,records)
                    if area_size > 0:
                        res.append(area_size)
                        n += 1
            except Exception,ex:
                print str(ex),ex

    x_min = [width for i in xrange(n)]
    x_max = [0 for i in xrange(n)]
    for i in xrange(width):
        for j in xrange(height):
            if x_min[records[j][i]] > i: x_min[records[j][i]] = i
            if x_max[records[j][i]] < i: x_max[records[j][i]] = i

    for i in xrange(n):
        if x_min[i] == width:
            x_min[i] = 0

    sum_size = 0
    for i in xrange(len(res)): sum_size += res[i]

    areas = [] ##区域
    x_pre = x_post = 0
    ## n的序号是随着横向坐标的增长而增长的
    for i in xrange(n):
        if x_min[i] > 0:
            if x_pre == 0:
                x_pre = x_min[i]
                x_post = x_max[i]
                areas.append(i)
            else:
                if x_min[i] - x_post > 20 or len(areas) == 1 and res[areas[0]] < 20:
                    tmp_size = 0
                    for j in xrange(len(areas)): tmp_size += res[areas[j]]
                    if float(tmp_size)/float(sum_size) > 0.5: break ## 有效区域的面积占比肯定大于0.5
                    else:
                        areas = []
                        x_pre = x_min[i]
                        x_post = x_max[i]
                        areas.append(i)
                else:
                    x_post = x_post if x_post > x_max[i] else x_max[i]
                    areas.append(i)
    # print areas

    bufs = [] ##标记各分开区域
    sizes = [] ##记录各分开区域的黑色区域大小
    combine = []
    for i in xrange(len(areas)):
        combine.append(areas[i])
        w = 0
        tmp_min = width
        tmp_max = 0
        for tmp in combine:
            tmp_min = tmp_min if x_min[tmp] > tmp_min else x_min[tmp]
            tmp_max = tmp_max if x_max[tmp] < tmp_max else x_max[tmp]
        w = tmp_max -tmp_min + 1
        if w < 40:
            pre_tmp_max = tmp_max
            if i != len(areas) -1 and x_min[areas[i+1]] < tmp_min:
                tmp_min = x_min[areas[i+1]]
            if i != len(areas) -1 and x_max[areas[i+1]] > tmp_max:
                tmp_max = x_max[areas[i+1]]
            w_tmp = tmp_max -tmp_min + 1 ## 加上后区域之后的总宽度
            ## 第一种or 预防字母i的情况发生
            #if w_tmp < 40 and i != len(areas) -1 and ( w_tmp <= w + 5 or w <= 5 ) or  i != len(areas) -1 and (w < 15 or w_tmp < 34 and x_min[areas[i+1]] < pre_tmp_max -1) and w_tmp - w < 15: ## 18和15必须分开拍之
            if w_tmp < 40 and i != len(areas) -1 and ( w_tmp <= w + 5 or w <= 5 ) or  i != len(areas) -1 and (w < 15 ) and w_tmp - w < 14:
                continue
            else:
                mi = x_min[areas[i]]
                ma = x_max[areas[i]]
                for tmp in combine:
                    mi = mi if mi < x_min[tmp] else x_min[tmp]
                    ma = ma if ma > x_max[tmp] else x_max[tmp]
                buff = [([0] * (ma - mi + 1)) for j in xrange(40)] ##需要标记的二维数组
                tmp_n = 0 ##记录本区域的黑色面积
                for x in xrange(40):
                    for y in xrange(ma - mi + 1):
                        if records[x][y+mi] in combine:
                            buff[x][y] = 1
                            tmp_n += 1
                combine = [] ##千万记得要清空啊
                bufs.append(buff)
                sizes.append(tmp_n)
                # img = create_img(buff,True)
                # img.show()
        else:
            print 'len exceed',img_code
    # dest_dir = 'D:\\learn\\img\\letter\\scale\\'
    imgs = []
    sum_size = 0
    for i in areas: sum_size += res[i] ##求得保留区域的总面积
    for i in xrange(len(bufs)):
        if float(sizes[i])/float(sum_size) > 1.0/(float(len(sizes))*3.0):
            img = create_img(bufs[i],True)
            imgs.append(img)
            # img.save(dest_dir+img_code+"_"+ str(i) +".jpg")
            # img.show()
    return imgs

def create_img(buff, scale):
    size = (40,40)
    scale_size = 25
    if scale: size = (scale_size, scale_size)
    img = Image.new('RGBA',size,WHITE)
    frame = img.load()
    if not scale or len(buff) <= scale_size and len(buff[0]) <= scale_size:
        for i in xrange(len(buff)):
            for j in xrange(len(buff[0])):
                if buff[i][j] == 1:
                    frame[j,i] = BLACK
    else:
        len_i = len(buff)
        len_j = len(buff[0])
        for i in xrange(scale_size):
            for j in xrange(scale_size):
                m = int(float(i) * float(len_i) / float(scale_size))
                n = int(float(j) * float(len_j) / float(scale_size))
                if buff[m][n] == 1:
                    frame[j,i] = BLACK
    return img

def get_img_array(img,more=False):
    width, height = img.size
    frame = img.load()
    res = []
    for j in xrange(height):
        for i in xrange(width):
            if check_black(frame[i,j],more):
                res.append(1)
            else:
                res.append(0)
    return res

def get_train_data(path):
    train_data = []
    files = os.listdir(path)
    dict = {}
    for f in files:
        pre = int(f.split('_')[0])
        post = int(f.split('_')[1].split('.')[0])
        if dict.has_key(pre):
            dict[pre].append(post)
        else:
            dict[pre] = [post]
    correct_list = []
    for i in xrange(300):
        if dict.has_key(i):
            dict[i].sort()
            for j in dict[i]:
                try:
                    correct_list.append(str(i)+'_'+str(j)+'.jpg')
                except:
                    print "except"
    for f in correct_list:
        img = Image.open(path+f)
        train_data.append(get_img_array(img))
    return train_data

def get_train_label(path):
    labels = []
    with codecs.open(path,mode='rb',encoding='utf-8') as f:
        for line in f:
            tmp = 0
            for le in line:
                if le != '\t' and le != '\n' and le != '\r': labels.append(le)
    return labels


##获取测试验证码，并分解
def get_test(img_path):
    img = Image.open(img_path)
    pre(img)
    noise_remove(img)
    clear_img(img)
    imgs = get_letter(img,'1')
    return imgs

def plot_gallery(images, titles, h=0, w=0, n_row=1, n_col=4):
    """Helper function to plot a gallery of portraits"""
    plt.figure(figsize=(1.8 * n_col, 2.4 * n_row))
    plt.subplots_adjust(bottom=0, left=.01, right=.99, top=.90, hspace=.35)
    for i in range(n_row * n_col):
        plt.subplot(n_row, n_col, i + 1)
        plt.imshow(images[i])
        plt.title(titles[i], size=12)
        plt.xticks(())
        plt.yticks(())

x = np.array(get_train_data('D:\\learn\\img\\letter\\scale\\'))
y = np.array(get_train_label('D:\\learn\\img\\letter\\label.txt'))
clf = SVC(decision_function_shape='ovo',kernel='rbf',C=100.0)
clf.fit(x,y)
print clf.fit(x,y)

def code_svm(path):
    test_imgs = get_test(path)
    predicts = []
    for img in test_imgs:
        # img.show()
        arr = get_img_array(img,True)
        predicts.append(clf.predict(arr))
    return predicts


if __name__ == '__main__':
    start=time.time()
    # img_path = 'D:\\learn\\img\\letter\\scale\\0_0.jpg'
    # get_test(img_path)
    # get_train_data('D:\\learn\\img\\letter\\scale\\')
    # img = Image.open(img_path)
    # print get_img_array(img)
    # get_train_label('D:\\learn\\img\\letter\\label.txt')
    x = np.array(get_train_data('D:\\learn\\img\\letter\\scale\\'))
    y = np.array(get_train_label('D:\\learn\\img\\letter\\label.txt'))
    clf = SVC(decision_function_shape='ovo',kernel='rbf',C=100.0)
    clf.fit(x,y)
    print clf.fit(x,y)
    test_imgs = get_test('D:\\learn\\img\\verify\\369.jpg')
    predicts = []
    for img in test_imgs:
        # img.show()
        arr = get_img_array(img,True)
        predicts.append(clf.predict(arr))

    print 'time spend:',time.time()-start
    plot_gallery(test_imgs,predicts,n_col=len(test_imgs))
    plt.show()
