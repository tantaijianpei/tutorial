#coding=utf-8
import sys
reload(sys)
from sklearn.svm import SVC
X=[[0],[1],[2],[3]]
Y = [0,1,2,3]
clf = SVC(decision_function_shape='ovo') #ovo为一对一
clf.fit(X,Y)
print clf.fit(X,Y)
dec = clf.decision_function([[1]]) #返回的是样本距离超平面的距离
print dec
clf.decision_function_shape = "ovr"
dec =clf.decision_function([1]) #返回的是样本距离超平面的距离
print dec #预测
print clf.predict([5])