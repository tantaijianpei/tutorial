/*!Name: common.js
 * Date: 2016-12-27 16:37:33 */
define("MOD_ROOT/common/common", function (require, exports, module) {
    function o(o) {
        o.havestock = null, o.isHeYue = null, o.isKO = a.onAttr("isKO"), o.isBiGouMa = a.onAttr("isJMa"), o.isTuanGou = a.onAttr("isGroupgoods")
    }

    function n() {
        c.checkLogin(function (o) {
            s.fire({type: "onLogin", login: o.IsAuthenticated})
        })
    }

    function t() {
        function o() {
            $(n).scrollTop(r)
        }

        var n = window, t = $(".crumb-wrap"), e = $("#shop-head"), i = $("#nav-2014"), s = $("#discover-nav"), c = $("#nav-2015"), r = 0, l = "#none" === n.location.hash;
        if (!t.length || "#comment" === n.location.hash || l)return !1;
        if (t.length && (r = t.offset().top), s.length && (r = s.offset().top), i.length && (r = i.offset().top), c.length && (r = c.offset().top), e.length && (r = e.offset().top), n.name)$(n).bind("beforeunload", o); else try {
            n.name = a.name + "__scrollTop__flag", o()
        } catch (f) {
        }
    }

    function e(o) {
        if (!/jt=/.test(location.href))return !1;
        var n = a.serializeUrl(location.href).param.jt, t = "";
        "10" === n && (t = "\u7531\u4e8e\u60a8\u9009\u62e9\u7684\u5730\u533a\u4eac\u4e1c\u81ea\u8425\u6682\u65f6\u65e0\u8d27\u6216\u4e0d\u652f\u6301\u914d\u9001\uff0c\u5df2\u4e3a\u60a8\u5207\u6362\u4e3a\u7b2c\u4e09\u65b9\u5546\u5bb6\u7684\u540c\u6b3e\u5546\u54c1\uff0c\u8bf7\u5173\u6ce8\u3002"), "11" !== n && "00" !== n || (t = "\u7531\u4e8e\u60a8\u5730\u5740\u7684\u53d8\u66f4\uff0c\u5df2\u4e3a\u60a8\u5207\u6362\u4e3a\u5728\u8be5\u5730\u533a\u552e\u5356\u7684\u540c\u6b3e\u5546\u54c1\uff0c\u8bf7\u5173\u6ce8\u3002"), "01" === n && (t = "\u7531\u4e8e\u60a8\u9009\u62e9\u7684\u5730\u533a\u7b2c\u4e09\u65b9\u5546\u5bb6\u6682\u65f6\u65e0\u8d27\u6216\u4e0d\u652f\u6301\u914d\u9001\uff0c\u5df2\u4e3a\u60a8\u5207\u6362\u4e3a\u4eac\u4e1c\u81ea\u8425\u540c\u6b3e\u5546\u54c1\uff0c\u8bf7\u5173\u6ce8\u3002 "), t && $(".itemInfo-wrap").prepend('<div class="DJD-tips"><i class="sprite-info"></i> {0} <i onclick="$(\'.DJD-tips\').remove()" class="sprite-close">&times;</i></div>'.format(t))
    }

    function i(i) {
        o(i), n(), t(), e(i)
    }

    var s = require("MOD_ROOT/common/tools/event").Event, c = require("MOD_ROOT/common/tools/tools"), a = require("MOD_ROOT/common/core");
    module.exports.__id = "common", module.exports.init = i
});
/*!Name: address.js
 * Date: 2016-12-27 16:37:32 */
define("MOD_ROOT/address/address", function (require, exports, module) {
    function e(e, t) {
        this.$el = e, this.cfg = t, this.$el.length && this.init()
    }

    function t(e) {
        function a(a, s) {
            e.hasLevel4(a) && 0 === s[3] && e.getNextArea(s[2], function (a) {
                a && a.length && (s[3] = a[0].id, e.setCookie(s), t())
            })
        }

        new d({}, function (t) {
            h.fire({type: "onStockReady", area: {id: this.areas}, stock: t}), h.fire({
                type: "onDefaultStockReady",
                area: {id: this.areas},
                stock: t
            }), e && (a(t.stock, this.areas), e.validateCookie(t.stock))
        })
    }

    function a(e, a) {
        t(a), h.addListener("onNumChange", function () {
            t(a)
        })
    }

    function s() {
        var e = c.getAreaId().areaIds, t = pageConfig.FN_getDomain();
        if (3 == e.length) {
            e.push(0);
            var a = e.join("-");
            createCookie("ipLoc-djd", a, 30, "/;domain=" + t)
        }
    }

    function i(e) {
        function t(t) {
            var a = e.jp || "", s = t.stock.stock, i = {
                webstate: 1,
                delivestate: 5,
                stock: 33
            }, r = 2 == s.code ? -1 : s.StockState, n = {33: 1, 34: 4, 0: 4, 39: 2, 40: 2, 36: 3}, o = {"-1": 6};
            n[r] && (i.webstate = n[r]), o[r] && (i.delivestate = o[r]), i.stock = r;
            var d = {area: t.area.id.join("_"), sku: [[e.skuid, a, i.webstate, i.delivestate, i.stock]]};
            "function" == typeof logJSON && logJSON("pv_stock", "sku", d)
        }

        h.addListener("onStockReady", function (e) {
            setTimeout(function () {
                t(e)
            }, 500)
        })
    }

    function r(e) {
        var t = $("#summary-weight");
        h.addListener("onStockReady", function (e) {
            var a = e.stock.stock;
            a.weightValue ? t.show().find(".dd").text(a.weightValue) : t.hide().find(".dd").text("")
        })
    }

    function n(t) {
        s(), i(t);
        var n = new e($("#stock-address"), t);
        a(t, n), r(t)
    }

    var o = require("MOD_ROOT/address/area"), d = require("MOD_ROOT/address/stock"), h = require("MOD_ROOT/common/tools/event").Event, c = require("MOD_ROOT/common/tools/tools");
    require("MOD_ROOT/EDropdown/EDropdown"), require("MOD_ROOT/ETab/ETab"), e.prototype = {
        init: function () {
            this.VAL_KEY = "data-value", this.RES_ATTR = "data-res", this.AREA_CLICKED = "clicked", this.$tabItems = null, this.$tabTrigs = null, this.$areaTab = this.$el.find(".J-address-tab"), this.$commArea = this.$el.find(".J-common-address"), this.$stockAddressInner = this.$el.find(".inner"), this.$stockAddressArr = this.$el.find(".head .arrow"), this.$stockAddressUsed = this.$el.find(".address-used"), this.$stockAddressSelect = this.$el.find(".address-select"), this.level = 0, this.MAX_LEVEL = 3, this.area = {
                id: [1, 72, 2799, 0],
                uid: null,
                name: ["\u5317\u4eac", "", "", ""]
            }, this.checkCookie(), this.bindEvent(), this.setProvince(), this.areaId = c.getAreaId(), this.area.uid = this.areaId.commonAreaId
        }, onOpen: function () {
            var e = this;
            this.$stockAddressInner.addClass("border"), this.$stockAddressArr.addClass("arr-open"), this.hasSetSelectedAddress || (this.getCommonAddress(), this.setSelectedAddress(function () {
                var t = [e.area.id[0], e.area.id[1], e.area.id[2], 0];
                new d({area: t.join("_")}, function (t) {
                    e.hasLevel4(t.stock) && e.loadLevel4Areas()
                }, null, !0)
            }), this.hasSetSelectedAddress = !0)
        }, loadLevel4Areas: function () {
            var e = this.areaId.areaIds;
            4 === e.length && (this.level = 2, this.getNextArea(e[this.level], $.proxy(this.setLevel4Name, this)))
        }, setLevel4Name: function (e) {
            if (!e || !e.length)return !1;
            var t = null, a = c.getAreaId().areaIds[3];
            if (0 === a)t = e[0]; else for (var s = 0; s < e.length; s++)if (e[s].id === a) {
                t = e[s];
                break
            }
            this.$tabTrigs.eq(3).html(t.name), this.updateSelected(t.id, t.name, 3)
        }, onClose: function () {
            this.$el.removeClass("hover"), this.$stockAddressInner.removeClass("border"), this.$stockAddressArr.removeClass("arr-open"), this.$el.removeAttr("data-disable")
        }, bindEvent: function () {
            var e = this;
            this.$el.undelegate("click.disable_close").delegate('[data-drop="head"],[data-drop="content"]', "click.disable_close", function () {
                e.$el.attr("data-disable", !0)
            }), $(document).unbind("click.address").bind("click.address", function (t) {
                $(t.target).parents("#stock-address").length < 1 && ($.browser.isIE7() || e.onClose())
            }), this.$areaTab.ETab({
                onSwitch: function (t) {
                    e.onSwitch(t)
                }
            }), pageConfig.ADDRESS_TAB = this.$areaTab.data("ETab"), this.$tabItems = this.$areaTab.data("ETab").items, this.$tabTrigs = this.$areaTab.data("ETab").triggers, this.$el.EDropdown({
                onOpen: function () {
                    e.onOpen()
                }, onClose: function () {
                    e.onClose()
                }
            }), this.$dropdown = this.$el.data("EDropdown"), this.$stockAddressUsed.EDropdown({
                event: "click",
                current: "clicked"
            }), this.$stockAddressSelect.data("open", !0).EDropdown({event: "click", current: "clicked"});
            var t = "[" + this.VAL_KEY + "]";
            this.$tabItems.delegate(t, "click.area", $.proxy(this.handleAreaClick, this)), this.$commArea.delegate(t, "click.area", $.proxy(this.handleCommonAddressClick, this))
        }, renderItem: function (e) {
            for (var t = "", a = null, s = 0; s < e.length; s++)a = e[s], a.name.length > 6 && e.push(e.splice(s, 1)[0]);
            for (var s = 0; s < e.length; s++)a = e[s], a.name.length > 12 && e.push(e.splice(s, 1)[0]);
            for (var s = 0, i = e.length; i > s; s++) {
                a = e[s];
                var r = "";
                a.name.length > 6 && (r = "long-area"), a.name.length > 12 && (r = "longer-area"), t += '<li data-name="' + a.name + '" data-value="' + a.id + '" class="' + r + '"><a href="#none">' + a.name + "</a></li>"
            }
            return t
        }, setProvince: function () {
            this.$tabItems.eq(0).html(o.provinceHtml)
        }, validateCookie: function (e) {
            var t = e.area;
            !t || "" !== t.provinceName && "" !== t.cityName && "" !== t.countyName || this.checkCookie()
        }, hasCityId: function (e, t) {
            for (var a = o.data[0][e], s = a.length, i = 0; s > i; i++) {
                var r = a[i];
                if (r.id == t)return !0
            }
            return !1
        }, hasCountyId: function (e, t) {
            for (var a = e.length, s = 0; a > s; s++) {
                var i = e[s];
                if (i.id == t)return !0
            }
            return !1
        }, checkCookie: function () {
            var e = this, a = c.getAreaId(), s = a.areaIds, i = a.commonAreaId, r = s[0], n = s[1], d = s[2];
            if (isNaN(r) || !o.provinceMap[r])return this.setCookie(this.area.id, o.provinceMap[r], i), t(e), !1;
            var h = !1;
            this.hasCityId(r, n) || (n = o.data[0][r][0].id, h = !0), this.getNextArea(n, function (a) {
                e.hasCountyId(a, d) || (d = a[0].id, h = !0), h && (e.setCookie([r, n, d, 0], o.provinceMap[r], i), e.areaId = c.getAreaId(), t(e))
            })
        }, handleAreaClick: function (e) {
            var t = $(e.target).parent(), a = t.data("value"), s = t.text(), i = t.parents('[data-tab="item"]').eq(0).data("level");
            this.area.uid = null, this.setArea(a, i, s)
        }, setPreviousAreasData: function (e) {
            for (var t = 0; e > t; t++) {
                var a = this.$tabTrigs.eq(t);
                this.setAreaData(a.attr("data-id"), a.text(), t)
            }
        }, setArea: function (e, t, a) {
            this.level = Number(t), this.reset(this.level), this.setPreviousAreasData(t), this.setAreaData(e, a, t), this.updateSelected(e, a, t), this.level === this.MAX_LEVEL ? this.getStock($.proxy(this.setResultAddress, this)) : this.level === this.MAX_LEVEL - 1 ? this.checkLevel4(e) : this.getNextArea(e)
        }, getNextArea: function (e, t) {
            var a = this;
            t = t || function () {
                }, this.getNextAreaData(e, function (s) {
                a.onSuccess(s, e), t(s)
            }, function () {
                1 === a.level && (console.log("address server error."), a.setAreaData(o.area[e], "\u8bf7\u9009\u62e9", ++a.level), a.setResultAddress())
            })
        }, hasLevel4: function (e) {
            return e && 4 === e.level && 3 === e.code
        }, checkLevel4: function (e) {
            var t = this;
            this.__stock = new d({area: this.area.id.join("_")}, function (a) {
                t.hasLevel4(a.stock) ? t.getNextArea(e) : (t.__stock.set(a), t.setResultAddress(), t.triggerStockEvent(a))
            }, null, !0)
        }, onSuccess: function (e, t) {
            var a = this.renderItem(e);
            o.data[this.level][t] = e, this.$tabTrigs.eq(this.level + 1).trigger("click.ETab").show(), this.$tabItems.eq(this.level + 1).html(a), this.level >= this.MAX_LEVEL && this.setResultAddress()
        }, setCookie: function (e, t, a) {
            function s(e) {
                return e.replace(/^-+|-+$/g, "")
            }

            e = e || this.area.id, t = t || this.area.name[0], a = a || this.area.uid;
            var i = pageConfig.FN_getDomain(), r = s(e.join("-"));
            this.area.uid && (r += "." + a), createCookie("ipLocation", escape(t), 30, "/;domain=" + i), createCookie("areaId", e[0], 10, "/;domain=" + i), createCookie("ipLoc-djd", r, 30, "/;domain=" + i)
        }, getNextAreaData: function (e, t, a) {
            return a = a || function () {
                }, o.data[this.level][e] ? t(o.data[this.level][e]) : void $.ajax({
                url: "//d.jd.com/area/get",
                data: {fid: e},
                timeout: 1e3,
                dataType: "jsonp",
                cache: !0,
                jsonpCallback: "getAreaListCallback",
                success: $.proxy(t, this),
                error: $.proxy(a, this)
            })
        }, truncateTabName: function (e) {
            return e.length > 5 ? e.substr(0, 5) : e
        }, updateSelected: function (e, t, a) {
            var s = this.AREA_CLICKED;
            this.setTabName(a, e, t), this.$tabItems.eq(a).find("a").removeClass(s).filter("[" + this.VAL_KEY + "=" + e + "]").addClass(s)
        }, setTabName: function (e, t, a) {
            var s = this.truncateTabName(a), i = {};
            t && (i["data-id"] = t), a.length > 5 && (i.title = a), this.$tabTrigs.eq(e).text(s).attr(i)
        }, setResultAddress: function (e) {
            e = e || this.area.name.join(" "), this.$el.find("[" + this.RES_ATTR + "]").text(e), this.close()
        }, setAreaData: function (e, t, a) {
            this.area.id[a] = Number(e), this.area.name[a] = t
        }, handleCommonAddressClick: function (e) {
            for (var t = $(e.target).parent(), a = t.data("value").split("|"), s = a[0], i = s.split(".")[0], r = s.split(".")[1], n = i.split(","), d = a[1], h = 0; h < n.length; h++)n[h] = Number(n[h]);
            this.area.id = n, this.area.uid = Number(r), this.area.name[0] = o.provinceMap[n[0]], this.setResultAddress(d), this.setCookie(), this.getStock($.proxy(this.close, this))
        }, getCommonAddress: function () {
            var e = this;
            $.ajax({
                url: "//cd.jd.com/usual/address", dataType: "jsonp", scriptCharset: "gbk", success: function (t) {
                    t && t.length && e.setCommonAddress(t)
                }
            })
        }, setSelectedAddress: function (e) {
            var t = pageConfig._CURR_AREA, a = this.$tabItems.eq(0).find('[data-name="' + t.provinceName + '"]'), s = a.data("value"), i = o.data[0][s], r = this.renderItem(i);
            this.$tabItems.eq(1).html(r), this.setTabName(0, s, t.provinceName), this.setTabName(1, this.areaId.areaIds[1], t.cityName), this.setTabName(2, this.areaId.areaIds[2], t.countyName), this.setTabName(3, this.areaId.areaIds[3], ""), this.area.id = this.areaId.areaIds, this.level = 1, this.getNextArea(this.areaId.areaIds[this.level], e)
        }, setCommonAddress: function (e) {
            function t(e) {
                return e.addressName = e.addressName.replace("null", "").substring(0, 8), e.addressDefault && (e.addressName = "\uff08\u9ed8\u8ba4\uff09" + e.addressName), '<li {0}="{1},{2},{3},{4}.{5}|{6}"><a title="{7}" href="#none">{8}</a></li>'.format(s, e.provinceId, e.cityId, e.countyId, e.townId, e.id, e.areaName, e.fullAddress, e.addressName)
            }

            var a = "", s = this.VAL_KEY, i = !1;
            a += "<ul>";
            for (var r = 0; r < e.length && 5 > r; r++) {
                var n = e[r];
                n.addressName && (a += t(n), i = !0)
            }
            a += "</ul>", i ? this.$stockAddressUsed.addClass("clicked").data("open", !0).show() : this.$stockAddressUsed.hide(), this.$commArea.html(a)
        }, reset: function (e) {
            0 == e && (this.resetItem(1), this.resetItem(2), this.resetItem(3)), 1 == e && (this.resetItem(2), this.resetItem(3)), 2 == e && this.resetItem(3)
        }, resetItem: function (e) {
            this.area.id[e] = 0, this.area.name[e] = "", this.$tabTrigs.eq(e).text("\u8bf7\u9009\u62e9"), this.$tabTrigs.eq(e + 1).length && this.$tabTrigs.eq(e + 1).hide()
        }, close: function () {
            this.$dropdown.close(), this.setCookie()
        }, onSwitch: function (e) {
            this.level = e
        }, triggerStockEvent: function (e) {
            h.fire({type: "onStockReady", area: this.area, stock: e}), h.fire({
                type: "onAreaChange",
                area: this.area,
                stock: e
            })
        }, getStock: function (e) {
            var t = this;
            new d({area: this.area.id.join("_")}, function (a) {
                e.call(t, a), t.triggerStockEvent(a)
            })
        }
    }, module.exports.__id = "address", module.exports.init = n
});
/*!Name: prom.js
 * Date: 2016-12-27 16:37:35 */
define("MOD_ROOT/prom/prom", function (require, exports, module) {
    function t() {
        var t = $(".J-yijia a");
        pageConfig.product.havestock || p.itemDisabled ? t.show() : t.hide()
    }

    function e(t) {
        function e(e) {
            var o = e.price;
            if (/debug=plus/.test(location.href) && (o.pp = "10.10"), o.pp || o.tpp) {
                var s = "\uffe5" + (o.pp || o.tpp);
                (o.pp <= 0 || o.tpp <= 0) && (s = "\u6682\u65e0\u62a5\u4ef7"), $(".J-p-p-" + t.skuid).text(s), i.show()
            } else i.hide()
        }

        var i = $(".J-plus-price");
        m.addListener("onPriceReady", e)
    }

    function i(t) {
        function e() {
            var t = "\u5c71\u59c6\u4f1a\u5458\u5e97\u662f\u6c83\u5c14\u739b\u65d7\u4e0b\u7684\u9ad8\u7aef\u4f1a\u5458\u5236\u5546\u5e97\uff0c\u5c06\u5c71\u59c6\u4f1a\u5458\u5361\u4e0e\u4eac\u4e1c\u8d26\u53f7\u7ed1\u5b9a\u540e\uff0c\u5373\u53ef\u5728\u5c71\u59c6\u4f1a\u5458\u5546\u5e97\u5b98\u65b9\u65d7\u8230\u5e97\u4eab\u53d7\u4f1a\u5458\u4ef7\u8d2d\u4e70\u5546\u54c1";
            o.find("i").length && o.find("i").ETooltips({close: !1, content: t, width: 230, pos: "bottom", zIndex: 10})
        }

        function i(i) {
            var s = i.price;
            if (s.sp && !isNaN(s.sp)) {
                var n = "\uffe5" + s.sp;
                s.sp <= 0 && (n = "\u6682\u65e0\u62a5\u4ef7"), $(".J-p-s-" + t.skuid).text(n), e(), o.show()
            } else o.hide()
        }

        var o = $(".J-sam-price");
        m.addListener("onPriceReady", i)
    }

    function o(t) {
        var e = $(".J-seckill");
        if (e.length) {
            var i = e.find(".activity-message"), o = t.koBeginTime, s = t.koEndOffset, n = o > 0, a = s > 0, m = n ? "seckill" : "seckilling";
            if (e.addClass(m).find("i").addClass("sprite-" + m), n) {
                var d = "\u9884\u8ba1{0}\u6708{1}\u65e5{2}:{3}\u5f00\u59cb", c = new Date(o), l = new Date;
                c.getMinutes() < 10 ? "0" + c.getMinutes() : c.getMinutes();
                e.show(), l.getFullYear() == c.getFullYear() && l.getMonth() == c.getMonth() && l.getDate() == c.getDate() && (d = "\u9884\u8ba1{2}:{3}\u5f00\u59cb"), i.html(d.format(c.getMonth() + 1, c.getDate(), r.prefix(2, c.getHours()), r.prefix(2, c.getMinutes())))
            } else a ? (e.show(), p.Countdown.init(s / 1e3, function (t) {
                var e = ["\u8ddd\u79bb\u7ed3\u675f"];
                t.d > 0 && e.push("<span>" + t.d + "</span>\u5929"), e.push("<span>" + r.prefix(2, t.h) + "</span>"), e.push(":<span>" + r.prefix(2, t.m) + "</span>"), e.push(":<span>" + r.prefix(2, t.s) + "</span>"), i.html(e.join(""))
            })) : (e.hide(), e.remove())
        }
    }

    function s(s) {
        s.isFeeType || m.addListener("onStockReady", function () {
            c.init()
        }), i(s), e(s), h(s), 5276 != s.cat[1] && u(s), f(s), g(s), m.addListener("onStockReady", t), o(s)
    }

    var n = require("MOD_ROOT/gift/gift"), a = require("MOD_ROOT/lazyinit/lazyinit"), r = require("MOD_ROOT/common/tools/tools"), m = require("MOD_ROOT/common/tools/event").Event, p = require("MOD_ROOT/common/core"), d = require("MOD_ROOT/common/verify/verify");
    require("JDF_UNIT/json/1.0.0/json"), require("JDF_UNIT/trimPath/1.0.0/trimPath"), require("MOD_ROOT/ETooltips/ETooltips");
    var c = {
        init: function (t, e) {
            return this.sku = t || pageConfig.product.skuid, this.shopId = pageConfig.product.shopId, this.venderId = pageConfig.product.venderId, this.ipLoc = r.getAreaId().areaIds.join("_"), this.$el = $("#summary-promotion"), this.$prom = $("#prom"), this.$promOne = $("#prom-one"), this.$gift = $("#prom-gift"), this.$fj = $("#choose-additional"), this.$darkBgEl = $("#J-summary-top"), this.$promPhone = $("#prom-phone"), this.$wrap = this.$el.find(".J-prom-wrap"), this.$moreProm = this.$wrap.find(".J-prom-more"), this.qrcodeLoaded = !1, this.promCount = 0, this.maxPromCount = 2, this.hasBvalue = pageConfig.product.proms && pageConfig.product.proms.length > 0, this.hasBvalue && (this.promCount += pageConfig.product.proms.length), "undefined" == typeof e && (this.get(), this.$prom.html(""), this.$promPhone.html("")), this
        }, get: function () {
            var t = this;
            $.ajax({
                url: "//cd.jd.com/promotion/v2",
                data: {
                    skuId: this.sku,
                    area: this.ipLoc,
                    shopId: this.shopId,
                    venderId: this.venderId,
                    cat: pageConfig.product.cat.join(",")
                },
                dataType: "jsonp",
                scriptCharset: "gbk",
                success: function (e) {
                    t.handleData(e)
                }
            })
        }, handleData: function (t) {
            var e = "";
            if (200 === t.promStatus) {
                var i = t.prom;
                /debug=mpt/.test(location.href) && (i = {mpt: "1477756980"}, this.initMBuy(t, 199)), i.mpt && this.handleMBuy(t), i.tags && i.tags.length ? this.setPromotion(i.tags) : this.emptyGift(), i.pickOneTag && i.pickOneTag.length && (e = this.setOnePromotion(i.pickOneTag)), i.packing && i.packing.length && this.setPackages(i), i.accessories && i.accessories.length && this.setAccessories(i), i.giftPool && this.setGiftPool(i), /debug=sjgo/.test(location.href) && (i.sjgo = {
                    url: "//channel.jd.com/sjgo.html",
                    targetId: "123456"
                }), i.sjgo ? this.setSJG(i.sjgo) : $("#jjg-sjgo").remove(), (p.isPop || i.bargaining) && this.setYiJia(i.bargaining)
            }
            200 === t.adsStatus && this.setAdWords(t.ads), 200 === t.quanStatus && this.setExtraPromotions(t.quan), t.skuCoupon && this.setSkuCoupon(t), e && this.setPickOneTip(e), this.setFoldLayer(), m.fire({
                type: "onPromReady",
                prom: t.prom
            })
        }, setSJG: function (t) {
            function e(t) {
                var e = pageConfig.giftSelectedSkuids ? pageConfig.giftSelectedSkuids.join(",") : "";
                return t.url + "?" + $.param({
                        pid: pageConfig.product.skuid,
                        pcount: $("#buy-num").val(),
                        targetId: t.targetId,
                        ptype: 13,
                        gids: e
                    })
            }

            function i() {
                pageConfig.product.havestock ? r.show() : r.hide()
            }

            function o() {
                num = $("#buy-num").val();
                var t = r.find("a"), e = t.attr("href");
                t.attr("href", e.replace(/(nums|pcount|buyNum)=\d+/g, "$1=" + num))
            }

            var s = $(".itemInfo-wrap"), n = e(t), a = '            <div id="jjg-sjgo" style="clear:both;padding-left:10px;display:none" clstag="shangpin|keycount|product|3chuodongbanner">                <a target="_blank" style="display:inline;" href="' + n + '">                    <img width="360" height="61" src="//img13.360buyimg.com/da/jfs/t2656/312/1769527897/13223/587f8601/574693acNa9a3ef54.png" >                </a>            </div>';
            if (!$("#jjg-sjgo").length) {
                s.append(a);
                var r = $("#jjg-sjgo");
                i(), m.addListener("onStockReady", i), m.addListener("onNumChange", o), m.addListener("onGiftSelected", function () {
                    r.find("a").attr("href", e(t))
                })
            }
        }, setGiftPool: function (t) {
            n && n.init(t)
        }, setSkuCoupon: function (t) {
            var e = '            <div class="dt">\u9886\u3000\u3000\u5238</div>            <div class="dd">                <dl>                    <dt class="fl"></dt>                    <dd class="lh">                        <a class="J-open-tb" href="#none"                             title="${skuCoupon[0].name} ${skuCoupon[0].timeDesc}">                            {var len = skuCoupon.length}                            {for item in skuCoupon}                                {if item_index < 3}                                <span class="quan-item">                                    <s></s><b></b>                                    <span class="text">\u6ee1${item.quota}\u51cf${item.discount}</span>                                </span>                                {/if}                            {/for}                            {if len>=3}<span class="more-btn">\u66f4\u591a>></span>{/if}                        </a>                    </dd>                </dl>            </div>';
            if (t && t.skuCoupon && t.skuCoupon.length) {
                var i = $("#summary-quan");
                i.html(e.process(t)).show(), i.find(".J-open-tb").unbind().bind("click", function () {
                    return pageConfig.toolbar.$trigger.filter("[data-name=coupon]").trigger("click"), !1
                })
            }
        }, setYiJia: function (t) {
            function e(t) {
                var e = "<ul>                    <li>1\u3001\u780d\u4ef7\u6d3b\u52a8\u662f\u9488\u5bf9\u6709\u201c\u53bb\u780d\u4ef7\u201d\u6807\u7b7e\u7684\u5546\u54c1\u8fdb\u884c\u7684\u6d3b\u52a8\uff0c\u65e0\u201c\u53bb\u780d\u4ef7\u201d\u6807\u7b7e\u5546\u54c1\u4e0d\u53c2\u4e0e\u780d\u4ef7\u6d3b\u52a8\uff1b</li>                    <li>2\u3001\u53ef\u901a\u8fc7\u70b9\u51fb\u201c\u53bb\u780d\u4ef7\u201d\u6807\u8bc6\u54a8\u8be2\u5728\u7ebf\u5ba2\u670d\u6216\u8005JIMI\u673a\u5668\u4eba\u53c2\u4e0e\u780d\u4ef7\u6d3b\u52a8\uff1b</li>                    <li>3\u3001\u780d\u4ef7\u6210\u529f\u540e\uff0c\u8bf7\u60a8\u5728\u534a\u4e2a\u5c0f\u65f6\u5185\u8fdb\u884c\u4e0b\u5355\u5b8c\u6210\u7ed3\u7b97\uff0c\u5426\u5219\u780d\u4ef7\u6d3b\u52a8\u5c06\u5931\u6548\u3002</li>                </ul>";
                p.isPop && (e = "<ul>                        <li>1\u3001\u780d\u4ef7\u6d3b\u52a8\u662f\u9488\u5bf9\u6709\u201c\u53bb\u780d\u4ef7\u201d\u6807\u7b7e\u7684\u5546\u54c1\u8fdb\u884c\u7684\u6d3b\u52a8\uff0c\u65e0\u201c\u53bb\u780d\u4ef7\u201d\u6807\u7b7e\u5546\u54c1\u4e0d\u53c2\u4e0e\u780d\u4ef7\u6d3b\u52a8\uff1b</li>                        <li>2\u3001\u53ef\u901a\u8fc7\u70b9\u51fb\u201c\u53bb\u780d\u4ef7\u201d\u6807\u7b7e\uff0c\u4e0e\u5728\u7ebf\u5ba2\u670d\u8fdb\u884c\u6c9f\u901a\u53c2\u4e0e\u780d\u4ef7\u6d3b\u52a8\uff1b</li>                        <li>3\u3001\u6b64\u5546\u54c1\u780d\u4ef7\u65b9\u5f0f\u8bf7\u4e0e\u5ba2\u670d\u540c\u5b66\u786e\u8ba4\uff0c\u5305\u62ec\u4f46\u4e0d\u9650\u4e8e\u4f18\u60e0\u5238\u7b49\u65b9\u5f0f\u3002</li>                    </ul>"), t.find(".hy-btype-tips").ETooltips({
                    close: !1,
                    content: e,
                    width: 270,
                    pos: "bottom",
                    zIndex: 10,
                    x: -7
                })
            }

            function i() {
                var t = ($(".J-jimi-btn a"), pageConfig.IMContact.$el.find("[data-seller]")), e = t.attr("data-code"), i = t.attr("data-seller"), o = t.attr("data-domain");
                p.isPop ? pageConfig.IMContact.open(e, i, o) : window.open("//jimi.jd.com/index.action?source=webproductkanjia&c3=" + pageConfig.product.cat[2] + "&productId=" + pageConfig.product.skuid, "\u54a8\u8be2jimi")
            }

            var o = $(".J-yijia");
            return o.length ? void(p.isPop || t ? (o.show().find("a").eq(0).unbind("click").bind("click", i), e(o)) : o.hide()) : (o.hide(), !1)
        }, showJiaDianQuan: function () {
            var t = $("#summary-jiadian-quan");
            t.length > 0 && (t.show(), $("body").addClass("lingquan"))
        }, setTuanCD: function (t) {
            var e = $("#tuan-banner .time-remain"), i = e.find(".J-tuan-cd");
            t.tr && (t = Number(t.tr), t > 0 && (e.show(), p.Countdown.init(t, function (t) {
                i.html(t.d + "\u5929" + t.h + "\u65f6" + t.m + "\u5206" + t.s + "\u79d2")
            })))
        }, setPromotion: function (t) {
            for (var e = [], i = t.length, o = null, s = 0; i > s; s++) {
                var n = t[s];
                "20" === n.code && this.setTuanCD(n), "10" === n.code ? o = n : e.push(n)
            }
            o ? this.renderGift(o) : this.emptyGift(), this.setProm({proms: e, len: i}, this.$prom)
        }, emptyGift: function () {
            this.$gift.html("").hide()
        }, setOnePromotion: function (t) {
            function e(t) {
                for (var e = [], i = {}, o = 0; o < t.length; o++)i[t[o]] || (e.push(t[o]), i[t[o]] = 1);
                return e
            }

            var i = [], o = "";
            i = i.concat(t);
            for (var s = [], n = 0; n < i.length; n++)"\u6d3b\u52a8\u9884\u544a" != i[n].name && s.push("\u201c" + i[n].name + "\u201d");
            return s.length > 1 && (o = e(s).join(" ") + " \u4ec5\u53ef\u5728\u8d2d\u7269\u8f66\u4efb\u9009\u5176\u4e00"), this.setProm({
                proms: i,
                len: t.length
            }, this.$promOne), o
        }, setAdWords: function (t) {
            if (t && t.length && t[0].ad) {
                $("#p-ad").html(t[0].ad).show();
                var e = t[0].ad.replace(/<.*?>/g, "");
                $("#p-ad").attr("title", e)
            }
        }, setPackages: function (t) {
            var e = "            {for fj in packing}                <li>${fj.nm} \xd7 ${fj.num}</li>            {/for}", i = $("#product-fj");
            i.length || ($("#product-detail-3").append('<div id="product-fj"></div>'), i = $("#product-fj")), i.html(e.process(t))
        }, setAccessories: function (t) {
            var e = '            <div class="dt">\u9644&#12288;&#12288;\u4ef6\uff1a</div>            <div class="dd">                <ul class="product-additional">                    {for fj in accessories}                    <li>                        <a target="_blank" href="//item.jd.com/${fj.sid}.html">                            {if fj.mp}                            <img src="${pageConfig.FN_GetImageDomain(fj.sid)}n5/${fj.mp}" width="25" height="25" class="gift-img">                            {else}                            <img src="//img13.360buyimg.com/da/jfs/t1018/333/196988437/1095/5de66ed7/550948a4N55886e95.png" width="25" height="25" class="gift-img">                            {/if}                            <span class="name" title="${fj.name}">${fj.nm}</span>                            <span class="number"> x <em>${fj.num}</em></span>                        </a>                    </li>                    {/for}                </ul>            </div>';
            this.$fj.html(e.process(t)).show()
        }, setExtraPromotions: function (t) {
            var e = this, i = $("#prom-quan"), o = '&nbsp;<a href="{href}" target="_blank">\u8be6\u60c5 <s class="s-arrow">&gt;&gt;</s></a>';
            return t && t.title ? (o = t.actUrl ? o.replace("{href}", t.actUrl) : "", i.html('<div class="J-prom-quan prom-quan"><em class="hl_red_bg">\u6ee1\u989d\u8fd4\u5238</em><em class="hl_red">' + t.title + "</em>" + o + "</div>"), e.$el.show(), e.promCount++, void e.setFoldLayer()) : void i.html("")
        }, renderGift: function (t) {
            var e = '            <div class="J-prom-gift">                <div class="prom-gifts clearfix">                    <span class="prom-gift-label"><em class="hl_red_bg">${name}</em></span>                    <div class="prom-gift-list">                        {for item in gifts}                        <div class="prom-gift-item" data-count="${pageConfig.isGiftProm = true}">                            <a target="_blank" href="//item.jd.com/${item.sid}.html" title="${item.nm}">                                {if item.mp}                                <img src="${pageConfig.FN_GetImageDomain(item.sid)}n1/s25x25_${item.mp}" width="25" height="25" class="gift-img">                                {else}                                <img src="//img30.360buyimg.com/da/jfs/t1264/236/181850154/1105/14bba6c8/5509488cN2093c2a9.png" width="25" height="25" class="gift-img">                                {/if}                            </a>                            <em class="gift-number">\xd7 ${item.num}</em>                        </div>                        {/for}                        <div class="J-gift-limit gift-limit">${content}</div>                    </div>                </div>            </div>', i = e.process(t), o = i.match(/\[ERROR:.+\]/g);
            o && o[0] && (console.error("[prom gift]Template Rendering error.\n"), console.error(o[0])), this.$gift.html(i).show()
        }, setProm: function (t, e) {
            var i = '            <div class="J-prom">                {for prom in proms}                <div class="prom-item" data-code="${prom.code}">                    {if prom.name}<em class="hl_red_bg">${prom.name}</em>{/if}                    <em class="hl_red">{if prom.tips}<i class="sprite-tips"></i>{/if}${prom.content}</em>                    {if prom.adurl}                    <a href="${prom.adurl}" target="_blank">                        &nbsp;&nbsp;\u8be6\u60c5 <s class="s-arrow">&gt;&gt;</s>                    </a>                    {/if}                    {if prom.link}${prom.link}{/if}                </div>                {/for}            </div>', o = i.process(t), s = o.match(/\[ERROR:.+\]/g);
            s && s[0] && (console.error("[prom item]Template Rendering error.\n"), console.error(s[0])), this.promCount += t.len, e.html(o)
        }, setPickOneTip: function (t) {
            var e = $("#pickOneTip");
            e.length > 0 && e.remove(), this.$el.find(".p-promotions").append('<ins id="pickOneTip"><em class="hl_red"><i class="sprite-tips"></i>' + t + "</em></ins>")
        }, loadQrcode: function (t) {
            require.async("PLG_ROOT/jQuery.qrcode", function () {
                var e = t || "//m.jd.com/product/" + p.sku + ".html?from=qrcode";
                $("#summary-mbuy .qrcode").html("").jdQrcode({render: "image", ecLevel: "L", size: 145, text: e})
            })
        }, handleMBuy: function (t) {
            var e = this;
            $.ajax({
                url: "//pm.3.cn/prices/pcpmgets",
                data: {skuids: this.sku, origin: 2, source: 1, area: this.ipLoc},
                dataType: "jsonp",
                success: function (i) {
                    var o = "\u6682\u65e0\u62a5\u4ef7";
                    i && i.length && i[0].p && i[0].pcp && (o = Number(i[0].pcp) > Number(i[0].p) ? i[0].p : null, e.initMBuy(t, o))
                }
            })
        }, initMBuy: function (t, e) {
            var i = this, o = $("#prom-mbuy"), s = $("#summary-mbuy"), n = o.attr("data-url");
            if (!t.prom)return o.html(""), s.remove(), !1;
            this.promCount++;
            var a = '            <div class="mob-buy J-prom-mbuy">                <em class="hl_red_bg">\u624b\u673a\u4e13\u4eab\u4ef7</em>                <span class="hl_red J-m-price">&#12288;\uffe5</span>                <span class="qrcode-wrap">                    <span class="hl_blue">&#12288;&#12288;\u53bb\u624b\u673a\u8d2d\u4e70</span>                    <span class="icon"><s></s><b></b></span>                </span>            </div>', r = '            <div id="summary-mbuy" class="hide">                <i></i>                <div class="qrcode">                    <div class="loading-style1"><b></b>\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u5019...</div>                </div>            </div>';
            o.html(a), s.length || ($(".summary").eq(0).append(r), s = $("#summary-mbuy"));
            var m = $(".J-prom-mbuy .qrcode-wrap"), p = "mob-buy-curr", d = null, c = null, l = $(".J-m-price");
            return e ? (l.html("\uffe5" + e), m.add(s).unbind("mouseenter mouseover mouseleave mouseout"), m.hover(function () {
                clearTimeout(c), m.parent(".J-prom-mbuy").addClass(p), s.show();
                var t = $(".J-prom-mbuy").offset().top, e = $(".summary").offset().top, o = t - e + 36;
                return s.css("top", o), i.qrcodeLoaded || i.loadQrcode(n), !1
            }, function () {
                d = setTimeout(function () {
                    m.parent(".J-prom-mbuy").removeClass(p), s.hide()
                }, 100)
            }), s.hover(function () {
                clearTimeout(d)
            }, function () {
                c = setTimeout(function () {
                    m.parent(".J-prom-mbuy").removeClass(p), s.hide()
                }, 100)
            }), void this.setFoldLayer()) : o.html("")
        }, showPromotion: function () {
            var t = this.promCount > 0 || c.haveProAdv, e = this.promCount > this.maxPromCount, i = "z-has-more-promotion";
            t ? this.$el.show() : this.$el.hide(), e ? this.$darkBgEl.addClass(i) : this.$darkBgEl.removeClass(i)
        }, setFoldLayer: function () {
            var t = "z-promotions-all-show", e = this, i = $("#summary-promotion");
            e.promCount > 2 ? (e.$moreProm.css("visibility", "visible"), e.$wrap.bind("mouseenter", function () {
                i.addClass(t)
            }).bind("mouseleave", function () {
                i.removeClass(t)
            })) : (e.$moreProm.css("visibility", "hidden"), e.$wrap.unbind("mouseenter mouseleave")), e.showPromotion(), e.appendTagsToPromTags()
        }, appendTagsToPromTags: function () {
            var t = this, e = $(".J-more-prom-ins");
            e.length ? e.html("") : e = $('<div class="J-more-prom-ins more-prom-ins"></div>');
            var i = t.$wrap.find(".hl_red_bg"), o = i.length, s = "";
            if (!(2 >= o)) {
                for (var n = 1; o > n; n++)s += '<em class="hl_red_bg">' + $(i[n]).html() + "</em>";
                e.append(s);
                var a = i.eq(0).parents(".prom-item");
                0 == a.length && (a = i.eq(0).parents("ins")), a.after(e)
            }
        }, clear: function () {
            $("#product-gifts,#prom,#product-prom-ext,#product-tips").remove(), $("#summary-promotion,#summary-promotion-extra,#summary-gifts,#summary-tips").hide()
        }
    }, l = function (t, e) {
        function i() {
            r.priceNum({skus: [e.skuid], text: "{NUM}", pdbp: 1}), $.closeDialog()
        }

        new d({
            onError: function () {
                i()
            }, onComplete: function (t) {
                601 == t ? i() : 602 == t ? this.showMessage("\u9a8c\u8bc1\u7801\u9519\u8bef!") : this.hideMessage()
            }
        })
    }, u = function (t) {
        function e() {
            r.priceNum({
                skus: [t.skuid], text: "{NUM}", callback: function (t, e) {
                    var i = "";
                    if (e) {
                        var o = e.p, s = e.m, n = Number(o), a = Number(s);
                        pageConfig.product.jp = n, pageConfig.product.mp = a, n > 0 && (i = "\uffe5" + o, $("#summary-price .p-discount").html(p.discount(n, a)), $("#page_dpprice").html("\uffe5" + parseFloat(a).toFixed(2)))
                    }
                    i || (i = "\u6682\u65e0\u62a5\u4ef7"), m.fire({type: "onPriceReady", price: e})
                }, onReady: function (e) {
                    e && e.error && "pdos_captcha" == e.error && l(e, t)
                }
            })
        }

        m.addListener("onAreaChange", e), e()
    }, h = function (t) {
        if (t.isFeeType) {
            /debug=txb/.test(location.href) && (t.proms = ['<ins id="prom-bvalue"><div class="J-prom-bvalue"><em class="hl_red_bg">\u901a\u4fe1B</em><em class="hl_red">\u4eac\u4e1c\u901a\u4fe1\u7528\u6237\u900197\u4e2a\u901a\u4fe1B</em><a href="//sale.jd.com/act/mA8nbHJMU2.html" target="_blank">&nbsp;&nbsp;\u8be6\u60c5 <s class="s-arrow">&gt;&gt;</s></a></div></ins>']);
            var e = t.proms, i = e && e.length, o = $("#prom-quan");
            if (i)for (var s = 0; s < e.length; s++)o.after(e[s])
        }
    }, f = function (t) {
        $(".comment-count a").attr("href", "#none").bind("click", a.goToComment), r.commentMeta({
            skus: [t.skuid],
            $el: $(".summary-price-wrap"),
            text: "{NUM}",
            callback: function (e, i) {
                t.commentMeta = i, m.fire({
                    type: "onCommentMeta",
                    commentMeta: i
                }), $("#detail .tab-main s").html("(" + i.CommentCountStr + ")").show(), $(".summary-price .count").unbind("click").bind("click", function () {
                    return $("body,html").scrollTop($("#comment").offset().top - 50), !1
                })
            }
        })
    }, g = function (t) {
        function e(t) {
            for (var e = "", i = 0; i < t.length; i++) {
                if (5 == i) {
                    e += "<div>\u2026\u2026</div>";
                    break
                }
                e += "<div>" + t[i].name + "\uff1a" + t[i].value + "</div>"
            }
            n.ETooltips({close: !1, content: e, width: 150, pos: "bottom", zIndex: 10})
        }

        function i(t) {
            n.html(t.xgzs)
        }

        function o() {
            $.ajax({
                url: "//c.3.cn/product/tag?skuIds=" + t.skuid, dataType: "jsonp", success: function (t) {
                    if (t && t.items && t.items.length) {
                        var o = t.items[0];
                        e(o.detail), i(o), s.show()
                    } else s.hide()
                }
            })
        }

        var s = $("#buy-rate"), n = s.find(".count");
        s.length && o()
    };
    module.exports.__id = "prom", module.exports.init = s, module.exports.Promotions = c, module.exports.getPrice = u
});
/*!Name: colorsize.js
 * Date: 2016-12-27 16:37:33 */
define("MOD_ROOT/colorsize/colorsize", function (require, exports, module) {
    function e(e) {
        var t = e.colorSize, o = e.skuid;
        s.init(t, o, e), s.changeColorSize(!0)
    }

    var t = (require("MOD_ROOT/buybtn/buybtn"), require("MOD_ROOT/common/core")), o = require("MOD_ROOT/common/tools/tools"), s = {
        defaultColor: null,
        defaultSize: null,
        defaultSpec: null,
        alert_choose_color: null,
        alert_choose_size: null,
        alert_choose_spec: null,
        colorSize: null,
        colorSizeSkuIds: null,
        otherCategorySkuIds: [],
        categorySkuIds: [],
        skuCategoryStock: {},
        escapeColorSize: function (e) {
            return e ? e.replace(/\\/g, "\\\\").replace(/\*/g, "\\*").replace(/\./g, "\\.").replace(/\(/g, "\\(").replace(/\)/g, "\\)") : e
        },
        init: function () {
            var e = $("#choose-color .dt").html() || "";
            e = e.replace("\uff1a", "").replace("\u9009\u62e9", "");
            var o = $("#choose-version .dt").html() || "";
            o = o.replace("\uff1a", "").replace("\u9009\u62e9", "");
            var s = $("#choose-spec .dt").html() || "";
            s = s.replace("\uff1a", "").replace("\u9009\u62e9", ""), this.alert_choose_color = "\u6240\u9009" + e + "\u5546\u54c1\u5728\u8be5\u5730\u533a\u65e0\u8d27", this.alert_choose_size = "\u6240\u9009" + e + "\u8be5" + o + "\u5546\u54c1\u5728\u8be5\u5730\u533a\u65e0\u8d27", this.alert_choose_spec = "\u6240\u9009" + e + o + "\u8be5" + s + "\u5546\u54c1\u5728\u8be5\u5730\u533a\u65e0\u8d27";
            var i = pageConfig.product.colorSize || {};
            this.colorSize = i;
            for (var r = {}, a = "*", l = {}, c = {}, n = {}, d = 0, h = i.length; h > d; d++) {
                var u = i[d], S = u.Color || a, f = u.Size || a, p = u.Spec || a, g = u.SkuId;
                g == pageConfig.product.skuid && (0 == $("#choose-color .dd .selected").length && $("#choose-color a[title='" + this.escapeColorSize(S) + "']").parent().addClass(" selected"), 0 == $("#choose-version .dd .selected").length && $("#choose-version a[title='" + this.escapeColorSize(f) + "']").parent().addClass(" selected"), 0 == $("#choose-spec .dd .selected").length && $("#choose-spec a[title='" + this.escapeColorSize(p) + "']").parent().addClass(" selected")), u.Color = S, u.Size = f, u.Spec = p, r[S] || (r[S] = {}), r[S][f] || (r[S][f] = {}), r[S][f][p] = g, l[S] = S, c[f] = f, n[p] = p, this.skuCategoryStock[g] = {
                    Color: S,
                    StockState: null,
                    Size: f,
                    Spec: p
                }, this.categorySkuIds.push(g)
            }
            this.defaultColor = a, this.defaultSize = a, this.defaultSpec = a;
            var k = 0, v = a;
            for (var C in l)k += 1, v = C;
            1 == k && (this.defaultColor = v);
            var z = 0, b = null;
            for (var C in c)z += 1, b = C;
            1 == z && (this.defaultSize = b);
            var m = 0, _ = a;
            for (var C in n)m += 1, _ = C;
            1 == m && (this.defaultSpec = _), this.colorSizeSkuIds = r;
            var I = this, y = function () {
                var e = $(this), t = e.parent();
                if (0 != t.closest("#choose-color").length || !t.is(".disabled") && !t.is(".selected")) {
                    t.parent().find(".selected").attr("class", "item"), t.attr("class", "item selected");
                    var o = I.getSelectedColorSizeSkuId();
                    o > 0 ? window.location = o + ".html" + window.location.search : I.changeColorSize(!1)
                }
            };
            $("#choose-color a").attr("href", "javascript:;").unbind("click").click(y), $("#choose-version a").attr("href", "javascript:;").unbind("click").click(y), $("#choose-spec a").attr("href", "javascript:;").unbind("click").click(y), t.isPop && this.categorySkuIds.length > 0 && this.categorySkuStock()
        },
        categorySkuStock: function () {
            var e = this.categorySkuIds, t = this.skuCategoryStock, i = o.getAreaId().areaIds, r = i.join("_");
            $.ajax({
                url: "//c0.3.cn/stocks?callback=?",
                data: {
                    type: "getstocks",
                    skuIds: e.join(","),
                    area: r,
                    pduid: o.getUUID(),
                    pdpin: readCookie("pin") || ""
                },
                dataType: "jsonp",
                scriptCharset: "gbk",
                success: function (o) {
                    for (var i = 0; i < e.length; i++) {
                        var r = e[i];
                        o[r + ""] && o[r + ""].StockState && (t[r].StockState = o[r + ""].StockState)
                    }
                    s.changeColorSize(!0)
                }
            })
        },
        hasSelectedColorSize: function () {
            return $("#choose-color .item").length > 0 ? !0 : $("#choose-version .item").length > 0 ? !0 : $("#choose-spec .item").length > 0
        },
        _hasColorSize: function (e, t, o) {
            var s = this.hasColorSize(e, t, o);
            return s
        },
        hasColorSize: function (e, o, s) {
            var i = this.colorSizeSkuIds, r = this.skuCategoryStock, a = o, l = s;
            if (e = e || this.defaultColor, o = o || this.defaultSize, s = s || this.defaultSpec, !i[e])return !1;
            if (!a && t.isPop) {
                var c = !1;
                for (var n in i[e]) {
                    var d = i[e][n][s], h = r[d].StockState;
                    if (0 != h && 34 != h) {
                        c = !0;
                        break
                    }
                }
                return c
            }
            if (!i[e][o])return !1;
            if (!l) {
                if (t.isPop) {
                    var c = !1;
                    for (var n in i[e][o]) {
                        var d = i[e][o][n], h = r[d].StockState;
                        if (0 != h && 34 != h) {
                            c = !0;
                            break
                        }
                    }
                    return c
                }
                return !0
            }
            if (i[e][o][s]) {
                if (t.isPop) {
                    var d = i[e][o][s], h = r[d].StockState;
                    return !(0 == h || 34 == h)
                }
                return !0
            }
            return !1
        },
        getColorSizeSkuId: function (e, t, o) {
            return e = e || this.defaultColor, t = t || this.defaultSize, o = o || this.defaultSpec, this.colorSizeSkuIds[e] && this.colorSizeSkuIds[e][t] ? this.colorSizeSkuIds[e][t][o] : null
        },
        getSelectedColorSizeSkuId: function () {
            if (!this.hasSelectedColorSize())return 0;
            var e = $("#choose-color .selected a").attr("title"), t = $("#choose-version .selected a").attr("title"), o = $("#choose-spec .selected a").attr("title"), s = this.getColorSizeSkuId(e, t, o);
            if (!s)return 0;
            var i = this.skuCategoryStock[s].StockState;
            return 0 == i || 34 == i ? 0 : s || 0
        },
        changeColorSize: function (e) {
            if (this.hasSelectedColorSize()) {
                for (var t = $("#choose-color .selected a").attr("title"), o = $("#choose-version .selected a").attr("title"), s = $("#choose-spec .selected a").attr("title"), i = $("#choose-color .item"), r = $("#choose-version .item"), a = $("#choose-spec .item"), l = 0, c = i.length; c > l; l++) {
                    var n = $(i[l]), d = n.find("a").attr("data-text");
                    d == t || this.hasColorSize(d, o) ? (n.is(".disabled") && n.attr("class", "item"), n.find("b").show()) : (r.length < 1 && a.length < 1 && (n.find("a").attr("style", "cursor: not-allowed"), n.find("a").attr("title", this.alert_choose_color), n.find("a").unbind("click")), n.attr("class", "item disabled"), n.find("b").hide())
                }
                t = $("#choose-color .selected a").attr("title"), t ? $("#choose-color").removeClass("item-hl-bg") : $("#choose-color").addClass("item-hl-bg");
                for (var l = 0, c = r.length; c > l; l++) {
                    var h = $(r[l]), u = h.find("a").attr("data-text"), S = $("#choose-color").is(".item-hl-bg");
                    S || !this.hasColorSize(t, u) ? (h.attr("class", "item disabled"), h.find("b").hide(), h.find("a").attr("title", this.alert_choose_size)) : (h.is(".disabled") && h.attr("class", "item"), h.find("b").show(), h.find("a").attr("title", u))
                }
                o = $("#choose-version .selected a").attr("title"), o ? $("#choose-version").removeClass("item-hl-bg") : $("#choose-version").addClass("item-hl-bg");
                for (var l = 0, c = a.length; c > l; l++) {
                    var f = $(a[l]), p = f.find("a").attr("data-text"), g = $("#choose-version").is(".item-hl-bg");
                    g || !this.hasColorSize(t, o, p) ? (f.attr("class", "item disabled"), f.find("b").hide(), f.find("a").attr("title", this.alert_choose_spec)) : (f.is(".disabled") && f.attr("class", "item"), f.find("b").show(), f.find("a").attr("title", p))
                }
                s = $("#choose-spec .selected a").attr("title"), s ? $("#choose-spec").removeClass("item-hl-bg") : $("#choose-spec").addClass("item-hl-bg"), e || (pageConfig.product.oneKeyBuyBtn.hide(), pageConfig.product.addToCartBtn.$el.length > 0 && pageConfig.product.addToCartBtn.disabled())
            }
        }
    };
    module.exports.__id = "colorsize", module.exports.init = e, module.exports.colorSize = s
});
/*!Name: buytype.js
 * Date: 2016-12-27 16:37:33 */
define("MOD_ROOT/buytype/buytype", function (require, exports, module) {
    function t(t) {
        var e = (t.skuid, a.getAreaId().areaIds), i = e[0], s = e[1];
        return t.isFeeType ? (window.CellPhone = r, void r.init(t, i, s, t.mainSkuId, function (t) {
        })) : !1
    }

    var e = require("MOD_ROOT/prom/prom").Promotions, i = require("MOD_ROOT/address/stock"), s = require("MOD_ROOT/common/tools/event").Event, a = (require("MOD_ROOT/buybtn/buybtn"), require("MOD_ROOT/common/tools/tools"));
    require("MOD_ROOT/common/core");
    require("MOD_ROOT/ETooltips/ETooltips"), require("JDF_UNIT/trimPath/1.0.0/trimPath");
    var r = {
        init: function (t, e, i, s, a, h) {
            this.$el = $("#choose-type"), this.$hy = $("#choose-type-hy"), this.$suit = $("#choose-type-suit"), this.$btn = $("#btn-heyue"), this.$qiang = $("#btn-qiang"), this.$onkeybuy = $("#btn-onkeybuy"), this.$tipsTxt = this.$suit.find("#J-suit-tips"), this.$jjg = $("#prom-phone-jjg"), this.$promPhone = $("#prom-phone"), this.$promGift = $("#prom-gift"), this.$phoneAd = $("#p-ad-phone"), this.$amount = $("#choose-amount"), this.$disabled = $("#btype-tip"), this.$yysPlanTips = $(), this.$yysArrow = $(), this.$promiseIcon = $(".J-promise-icon"), this.sku = t.skuid, this.pid = e, this.cid = i, this.mainSkuId = s, this.sp = "", this.cfg = t, this.onReady = a || function () {
                }, this.onError = h || function () {
                }, this.$currBuyType = null, this.$currHeYue = null, this.$currSuit = null, this.url = "//feetype.jd.com/services/queryFeeTypes.action", /debug=yys/.test(location.href) && (this.url = "//yys.worker.jd.com/services/queryFeeTypes.action"), this.buyTypeIndex = null, this.disableClass = "btn-disable", this.dtype = null, this.isHySuit = !1, this.noBuyType = !1, this.destory(), this.bindEvent(), this.getBuyType(this.sku, this.pid, this.cid, this.mainSkuId), pageConfig.matchFeetype = function (t) {
                var e = r.getUrlFeeType(), i = !1, s = 0;
                if (e && t && t.length)for (s = 0; s < t.length; s++)if (t[s].ft == e) {
                    i = !0;
                    break
                }
                return i
            }
        }, bindEvent: function () {
            function t() {
                var t = a.getAreaId().areaIds;
                e.init(e.cfg, t[0], t[1])
            }

            var e = this;
            this.binded || (this.binded = !0, this.$el.undelegate("click").delegate(".item", "click", function () {
                var t = $(this), i = t.hasClass("disabled"), s = t.hasClass("selected");
                i || s || (e.$currBuyType = t, e.handleBuyTypeClick(t))
            }), this.$hy.undelegate("click").delegate(".item", "click", function () {
                var t = $(this), i = t.hasClass("disabled"), s = t.hasClass("selected");
                i || s || (e.$currHeYue = t, e.handleHyTypeClick(t))
            }), this.$suit.undelegate("click").delegate(".J-suit-trigger", "click", function () {
                var t = $(this), i = t.attr("data-url") || e.$currHeYue.attr("data-aurl"), s = e.$currHeYue.attr("data-auth");
                e.$currSuit = t, e.showSuitIframe(i, s)
            }), this.$btn.unbind("click").bind("click", function () {
                return e.hasSuitIframe && !e.suitSelected ? (e.$suit.addClass("item-hl-bg"), e.$tipsTxt.show(), !1) : void 0
            }), s.removeListener("onAreaChange", t), s.addListener("onAreaChange", t))
        }, getTPL: function (t) {
            var e = '            <div class="dt">\u8d2d\u4e70\u65b9\u5f0f</div>            <div class="dd">                {for list in datas}                {var btype = list.feetypes[0]}                <div class="J-btype-item item{if list.che} selected{/if}"                     clstag="shangpin|keycount|product|gmfs-${list.name}"                     data-ind="${list_index}"                     data-matched="${pageConfig.matchFeetype(list.feetypes)}"                    {if !(list.sp===-1&&btype.ft===100)}                    data-ishy="true"                     {/if}                    data-sp="${list.sp}"                     data-count="${list.feetypes.length}"                    clstag="shangpin|keycount|product|goumaifangshi_${list.name}">                    <b></b>                    <a href="#none" title="">${list.name}</a>                </div>                {/for}            </div>', i = '            <div class="dt">\u4f18\u60e0\u7c7b\u578b</div>            <div class="dd">                {for item in datas}                <div class="J-hy-btype {if !item.che} hide{/if}">                    {for list in item.feetypes}                    <div class="item{if list.che||(item.sp===-1&&list.ft===100)} selected{/if}{if !list.stat} disabled{/if}"                         clstag="shangpin|keycount|product|hylx-${list.name}"                         data-aurl="${list.aurl}"                        data-rurl="${list.rurl}"                        data-type="${list.type}"                        data-dtype="${list.dtype}"                        data-id="${list.ft}"                         data-skus="${list.sids}"                         data-ad="${list.ad}"                         data-ind="${list_index}"                         data-sku="${list.sku}"                        data-sp="${item.sp}">                        <b></b>                        <a href="#none" title="${list.tips}">${list.name}</a>                    </div>                    {/for}                </div>                {/for}                {if list.ft!==100}                    <a class="J-hy-btype-tips hy-btype-tips icon question fl"                         href="#none"><i class="sprite-question"></i></a>                {/if}            </div>', s = '            <div class="J-prom-phone-jjg">                <em class="hl_red_bg">${title||"\u52a0\u4ef7\u8d2d"}</em>                <em class="hl_red">${text}</em>                <a title="\u53c2\u52a0\u6d3b\u52a8\u5165\u53e3" clstag="eve|keycount|treaty|JJGDetails" class="J-jjg-btn" href="#none">                    &nbsp;&nbsp;\u70b9\u51fb\u62a2\u8d2d <s class="s-arrow">&gt;</s>                </a>            </div>', a = '            <div id="shf-feetype">                  <dl class="dl-1">                      <dt class="fl">\u60a8\u9700\u6d88\u8d39\uff1a</dt>                      <dd class="lh hl_red">${info.cons}</dd>                  </dl>                  <dl class="dl-2">                      <dt class="fl">\u60a8\u5c06\u5f97\u5230\uff1a</dt>                      <dd class="lh">                          <ul class="hl_red">                              <li>\u624b\u673a <em>&times; 1</em></li>                              <li>${stockArea}\uff08\u624b\u673a\u5361\uff09 <em>&times; 1</em></li>                              <li>\u8d60\u9001\u8bdd\u8d39 ${info.pres}</li>                          </ul><div class="clr"></div>                          <p>${info.pack} </p>                          <table>                              <tr>                                  <td><div><strong>\u8bed\u97f3\u901a\u8bdd(\u5206\u949f)</strong></div>{if info.cal!=="null"}${info.cal}{/if}</td>                                  <td><div><strong>\u56fd\u5185\u77ed\u4fe1(\u6761)</strong></div>{if info.msg!=="null"}${info.msg}{/if}</td>                              </tr>                              <tr>                                  <td><div><strong>\u56fd\u5185\u6d41\u91cf</strong></div>{if info.traf!=="null"}${info.traf}{/if}</td>                                  <td><div><strong>\u63a5\u542c\u514d\u8d39</strong></div>{if info.area!=="null"}${info.area}{/if}</td>                              </tr>                          </table>                          <div class="shf-buy-now">                              <a class="btn-primary J-btn" href="${resLink}" target="_blank" clstag="eve|keycount|treaty|JJGRedirect" class="css3-btn">\u9009\u62e9\u53f7\u7801</a>                          </div>                      </dd>                  </dl><span clstag="eve|keycount|treaty|JJGDetails" id="JJGDetails">\u3000</span>            </div>';
            return "btype" === t ? e : "suit" === t ? i : "jjg-prom" === t ? s : "jjg-iframe" === t ? a : void 0
        }, handleBuyTypeClick: function (t) {
            var e = t.attr("data-ind"), i = (t.attr("data-sp"), "true" === t.attr("data-ishy"));
            this.switchTo(t), this.buyTypeIndex = e, this.isHeYue = i, pageConfig.product.isHeYue = i, this.$currHeYue = this.$hy.find(".J-hy-btype").eq(this.buyTypeIndex).find(".selected"), this.switchBtn(i), this.setResult(this.getParams(this.$currHeYue))
        }, switchBtn: function (t) {
            var e = this;
            t ? this.onHeYue() : this.onNonHeYue();
            var a = {extraParam: '{"originid":"1"}'};
            this.isHeYue && (a.extraParam = '{"originid":"1","heYueJi":"1"}'), new i(a, function (t) {
                e.setBuyBtn()
            }), s.fire({type: "onHeYueReady", bType: this.bType, noBuyType: this.noBuyType})
        }, handleHyTypeClick: function (t) {
            var e = t.attr("data-ind"), i = t.parent().find(".item"), s = i.removeClass("selected").eq(e);
            s.addClass("selected"), this.$currHeYue = s, this.setResult(this.getParams(this.$currHeYue))
        }, switchTo: function (t) {
            var e = t.attr("data-ind"), i = t.parent().find(".J-btype-item"), s = this.$hy.find(".J-hy-btype");
            i.removeClass("selected").eq(e).addClass("selected"), s.hide().eq(e).show()
        }, getBuyType: function (t, e, i, s) {
            var a = this;
            window.fetch_feetype_data = function () {
            }, $.ajax({
                url: this.url,
                dataType: "jsonp",
                scriptCharset: "utf-8",
                timeout: 5e3,
                cache: !0,
                jsonpCallback: "fetch_feetype_data",
                data: {skuId: t, cityId: i, provinceId: e, productId: s},
                error: function (t) {
                    a.onReady.call(this, 100), a.onError.call(this, 100)
                },
                success: function (t) {
                    a.handleBuyTypeData(t)
                }
            })
        }, handleBuyTypeData: function (t) {
            var i = pageConfig.chooseType = !!t && t.datas.length > 0, s = i ? "show" : "hide", a = i && t.promo;
            this.$amount[s](), i ? (this.r = t, this.setBuyType(t), a && this.setJiaJiaGou(t.promo)) : (e.init(pageConfig.product.skuid), this.$el.html("<!--oops, \u6728\u6709\u6570\u636e\u4e86^!^-->"), this.disabled(), this.onReady.call(this, "100"))
        }, setBuyType: function (t) {
            var e = this.getTPL("btype"), i = e.process(t), s = i.match(/\[ERROR:.+\]/g);
            return t && t.sp && (this.sp = t.sp), s && s[0] ? ($("#summary-promotion").hide(), console.error("[BuyType]Template Rendering error.\n"), console.error(s[0]), this.onError.call(this, 100, s)) : (t.dis ? this.$disabled.show() : this.$disabled.hide(), this.$el.html(i), this.noBuyType = 1 == t.datas.length && 1 == t.datas[0].feetypes.length && "-1" === t.datas[0].feetypes[0].name, this.noBuyType ? this.$el.hide() : this.$el.show(), void this.setHyType(t))
        }, setHyType: function (t) {
            var e = this.getTPL("suit"), i = e.process(t), s = i.match(/\[ERROR:.+\]/g);
            s && s[0] && ($("#summary-promotion").hide(), console.error("[BuyType]Template Rendering error.\n"), console.error(s[0])), this.$hy.html(i), this.noBuyType ? this.$hy.hide() : this.$hy.show();
            var a = this.getUrlFeeType();
            if (a) {
                var r = this.$el.find('[data-matched="true"]');
                this.switchTo(r)
            }
            this.$currBuyType = this.$el.find(".selected"), this.buyTypeIndex = this.$currBuyType.attr("data-ind"), this.$currBuyTypes = this.$hy.find(".J-hy-btype").eq(this.buyTypeIndex).find(".item");
            var h = this.$currBuyTypes.filter('[data-id="' + a + '"]');
            a && h ? (this.$currHeYue = h, this.$currBuyTypes.removeClass("selected"), this.$currHeYue.addClass("selected")) : this.$currHeYue = this.$currBuyTypes.filter(".selected"), this.bType = this.$currHeYue.attr("data-id"), this.isHeYue = "true" === this.$currBuyType.attr("data-ishy"), pageConfig.product.isHeYue = this.isHeYue, this.$currHeYue.length || (this.disabledBuy = !0), this.switchBtn(this.isHeYue);
            var n = this.getParams(this.$currHeYue);
            this.setResult(n)
        }, getTips: function () {
            var t = "\u79fb\u52a8\u8001\u7528\u6237\uff0c\u65e0\u9700\u6362\u53f7\uff0c\u53ea\u9700\u627f\u8bfa\u4e1a\u52a1\u5185\u5bb9\uff0c\u5373\u53ef\u6bcf\u6708\u83b7\u5f97\u9ad8\u989d\u7684\u8bdd\u8d39\u8fd4\u8fd8", e = "\u540c\u65f6\u8d2d\u4e70\u624b\u673a\u548c\u65b0\u53f7\u7801\uff0c\u5373\u53ef\u6839\u636e\u6240\u9009\u7684\u5957\u9910\u6863\u4f4d\uff0c\u6309\u6708\u83b7\u5f97\u4e00\u5b9a\u989d\u5ea6\u7684\u8bdd\u8d39\u8d60\u9001", i = {
                name: "\u8054\u901a/\u7535\u4fe1",
                8: "\u540c\u65f6\u8d2d\u4e70\u624b\u673a\u548c\u65b0\u53f7\u7801\uff0c\u5e76\u9884\u5b58\u4e00\u5b9a\u91d1\u989d\u7684\u8bdd\u8d39\uff08\u540e\u7eed\u5c06\u5206\u6708\u8fd4\u8fd8\uff09\uff0c\u5373\u53ef\u62b5\u6263\u7b49\u503c\u7684\u8d2d\u673a\u6b3e\uff0c\u8d2d\u673a\u6b3e\u6700\u9ad8\u53ef\u51cf\u81f30\u5143",
                28: "\u540c\u65f6\u8d2d\u4e70\u624b\u673a\u548c\u65b0\u53f7\u7801\uff0c\u5373\u53ef\u6839\u636e\u6240\u9009\u7684\u5957\u9910\u6863\u4f4d\uff0c\u6309\u6708\u83b7\u5f97\u4e00\u5b9a\u989d\u5ea6\u7684\u8bdd\u8d39\u8d60\u9001",
                27: "\u8d2d\u4e70\u65b0\u624b\u673a\u65f6\u529e\u7406\u4e00\u5f20\u65b0\u7535\u8bdd\u5361\uff0c\u53ef\u4ee5\u81ea\u7531\u9009\u62e9\u5957\u9910\u4e2d\u8bed\u97f3\u3001\u6d41\u91cf\u3001\u77ed\u4fe1\u7684\u642d\u914d\u548c\u7528\u91cf",
                33: "\u7535\u4fe1\u8001\u7528\u6237\uff0c\u4e0d\u6362\u53f7\uff0c\u4e70\u624b\u673a\uff0c\u529e\u7406\u65b0\u5957\u9910\uff0c\u5373\u53ef\u6309\u7167\u4f18\u60e0\u89c4\u5219\u6309\u6708\u83b7\u5f97\u989d\u5916\u7684\u8bdd\u8d39\u8d60\u9001",
                2: e,
                5: e,
                12: e
            }, s = {
                "-1": "",
                1: {
                    name: "\u79fb\u52a8",
                    5: t,
                    12: t,
                    18: "\u5168\u56fd\u79fb\u52a8\u8001\u7528\u6237\u5747\u53ef\u529e\u7406\uff0c\u627f\u8bfa\u5728\u7f51\u65f6\u957f\u548c\u5957\u9910\u5185\u5bb9\uff0c\u5373\u53ef\u6bcf\u6708\u83b7\u8d60\u4e00\u5b9a\u989d\u5ea6\u7684\u8bdd\u8d39",
                    32: "\u4e0a\u6d77\u79fb\u52a8\u8001\u7528\u6237\uff0c\u627f\u8bfa\u6708\u6700\u4f4e\u6d88\u8d39\uff0c\u5373\u53ef\u6bcf\u6708\u4eab\u53d7\u4e00\u5b9a\u989d\u5ea6\u7684\u8bdd\u8d39\u8d60\u9001",
                    34: "\u5317\u4eac\u79fb\u52a8\u8001\u7528\u6237\uff0c\u4e0d\u6362\u53f7\uff0c\u4e70\u624b\u673a\uff0c\u5373\u53ef\u6bcf\u6708\u4eab\u53d7\u4e00\u5b9a\u989d\u5ea6\u7684\u8bdd\u8d39\u8d60\u9001",
                    35: "\u5c71\u897f\u79fb\u52a8\u8001\u7528\u6237\uff0c\u4e0d\u6362\u53f7\uff0c\u4e70\u624b\u673a\uff0c\u5373\u53ef\u6bcf\u6708\u4eab\u53d7\u4e00\u5b9a\u989d\u5ea6\u7684\u8bdd\u8d39\u8d60\u9001",
                    36: "\u798f\u5efa\u79fb\u52a8\u8001\u7528\u6237\uff0c\u4e0d\u6362\u53f7\uff0c\u529e\u5408\u7ea6\uff0c\u5373\u53ef\u6bcf\u6708\u4eab\u53d7\u4e00\u5b9a\u989d\u5ea6\u7684\u8bdd\u8d39\u8d60\u9001"
                },
                2: i,
                3: i
            };
            return s
        }, setTips: function (t) {
            var e = this.$hy.find(".J-hy-btype-tips"), i = t.attr("data-sp") || -1, s = t.attr("data-id") || -1, a = this.getTips()[i][s];
            a ? e.show().ETooltips({close: !1, content: a, width: 200, position: "bottom", zIndex: 10}) : e.hide()
        }, getParams: function (t) {
            return t && t.length ? {
                sku: t.attr("data-sku"),
                skus: t.attr("data-skus"),
                id: t.attr("data-id"),
                ad: t.attr("data-ad"),
                ind: t.attr("data-ind"),
                type: t.attr("data-type"),
                dtype: t.attr("data-dtype")
            } : null
        }, setSuitContent: function (t) {
            this.suitSelected = !0, t && (this.disabledBuy = !1, this.$suit.find(".J-suit-trigger").attr("data-url", this.formatBtypeUrl(t.aurl, t.auth)).addClass("selected").find("a").html(t.message), this.$suit.find(".J-suit-resel").show(), this.$suit.removeClass("item-hl-bg").find(".J-suit-tips").hide(), this.setBuyBtn(this.formatBtypeUrl(t.rurl, t.auth)))
        }, getSuitName: function (t) {
            var e = {0: "\u9009\u62e9\u5957\u9910\u4e0e\u53f7\u7801", 1: "\u9009\u62e9\u5957\u9910\u4e0e\u8d44\u8d39"};
            return e[t]
        }, setSuitName: function (t) {
            this.$suit.find(".J-suit-trigger a").html(this.getSuitName(t))
        }, clearSuit: function () {
            var t = this.getSuitName(this.dtype);
            this.suitSelected = !1, this.$suit.find(".J-suit-resel").hide(), this.$suit.find(".J-suit-trigger").removeClass("selected").removeAttr("data-url").find("a").html(t).attr("title", t)
        }, setResult: function (t) {
            var i = t && t.id;
            if (this.hasSuitIframe = !!this.$currHeYue.attr("data-aurl"), this.bType = i, this.dtype = t.dtype, this.isOnlyNonHeYue = 1 === this.$currBuyTypes.length && "100" === this.bType, this.setTips(this.$currHeYue), this.hasSuitIframe ? (this.clearSuit(), this.setSuitName(t.dtype), this.$suit.show()) : this.$suit.hide(), this.isOnlyNonHeYue ? this.$hy.hide() : this.noBuyType || this.$hy.show(), "function" == typeof this.onReady && this.onReady.call(this, i), this.disabledBuy = !t, this.disabledBuy)return this.setBuyBtn();
            if (t.sku && this.sku !== Number(t.sku) && (location.href = "//" + location.host + "/" + t.sku + ".html"), this.hasSuitIframe && this.suitSelected)return this.setBuyBtn();
            if (t.ad) {
                this.$phoneAd.html(t.ad).show();
                var s = t.ad.replace(/<.*?>/g, "");
                this.$phoneAd.attr("title", s)
            } else this.$phoneAd.html("").hide(), this.$phoneAd.attr("title", "");
            t.skus ? (e.clear(), this.getPhoneProm(t.skus)) : (this.clearPhoneProm(), t.skus !== this.isHySuit && e.init(this.sku)), this.isHySuit = !!t.skus, this.setBuyBtn()
        }, onHeYue: function () {
            this.cfg.addToCartBtn.hide(), this.$btn.show(), this.cfg.isKO && this.cfg.koBtn.hide(), this.$promiseIcon.hide(), this.$qiang.hide(), this.cfg.notifyBtn.show(), this.$yysPlanTips.hide(), this.$yysArrow.hide()
        }, onNonHeYue: function () {
            this.cfg.addToCartBtn.show(), this.$btn.hide(), this.cfg.isKO && this.cfg.koBtn.show(), this.cfg.notifyBtn.show(this.cfg), this.$promiseIcon.show(), this.$yysPlanTips.show(), this.$yysArrow.show()
        }, formatBtypeUrl: function (t, e) {
            var i = t.replace(/{sku}/g, this.sku).replace(/{btype}/g, this.bType).replace(/{pid}/g, this.pid).replace(/{cid}/g, this.cid).replace(/{productId}/g, this.mainSkuId).replace(/{sp}/g, this.sp).replace(/{venderId}/g, pageConfig.product.venderId);
            return e && (i = i.replace(/{auth}/g, e)), i
        }, showSuitIframe: function (t) {
            var e = this.formatBtypeUrl(t), i = this.getSuitName(this.dtype);
            seajs.use("JDF_UI/dialog/1.0.0/dialog", function () {
                $("body").dialog({type: "iframe", autoIframe: !1, width: 710, height: 600, title: i, source: e})
            })
        }, setBuyBtnText: function (t) {
            if (!this.$currHeYue)return !1;
            var t = this.$currHeYue.attr("data-type"), e = "\u4e0d\u6362\u53f7\u529e\u5957\u9910";
            "0" === t && (e = "\u9009\u62e9\u53f7\u7801\u548c\u5957\u9910"), "2" === t && (e = "\u7acb\u5373\u8d2d\u4e70"), this.$btn.html(e).attr("clstag", "shangpin|keycount|product|" + e + "_" + pageConfig.product.pType)
        }, disabled: function () {
            this.$btn.addClass(this.disableClass).attr("href", "#none")
        }, enabled: function (t) {
            var e = this.cfg;
            return e.isClosePCShow || !e.havestock ? !1 : (this.$btn.removeClass(this.disableClass), void(t && this.$btn.attr("href", t)))
        }, setBuyBtn: function (t) {
            var e = "//eve.jd.com/redirect.action?";
            if ((pageConfig.product.havestock === !1 || pageConfig.product.isClosePCShow) && (this.disabledBuy = !0), this.setBuyBtnText(), this.disabledBuy)this.disabled(); else {
                var i = t || e + $.param({
                        wid: this.sku,
                        btype: this.bType,
                        pid: this.pid,
                        cid: this.cid,
                        r: Math.random()
                    });
                this.enabled(i)
            }
        }, getUrlFeeType: function () {
            var t = location.href.toLowerCase(), e = null, i = null;
            return t.indexOf("feetype") > -1 && (e = t.match(/feetype=\w+/g), null !== e && (i = e[0].replace("feetype=", ""))), i
        }, getPhoneProm: function (t) {
            var e = this, i = "//jprice.jd.com/contractsuit/{sku}_{skus}_{pid},0,0_1_1_CellPhone.setPhoneProm_html", s = i.replace("{sku}", this.sku).replace("{skus}", t).replace("{pid}", this.pid);
            $.ajax({
                url: s, dataType: "jsonp", success: function (t) {
                    e.setPhoneProm(t)
                }
            })
        }, setPhoneProm: function (t) {
            var e = [], i = [], s = '        <div class="prom-gifts clearfix">            <span class="prom-gift-label"><em>\u8d60\u54c1</em></span>            <div class="prom-gift-list">                {for item in gs}                {if item.t==2}                <div class="prom-gift-item">                    <a target="_blank" href="//item.jd.com/${item.id}.html" title="${item.name}">                        {if item.img}                        <img src="${pageConfig.FN_GetImageDomain(item.id)}n5/${item.img}" width="25" height="25" class="gift-img">                        {else}                        <img src="//misc.360buyimg.com/product/skin/2012/i/gift.png" width="25" height="25" class="gift-img">                        {/if}                    </a>                    <em class="gift-number">\xd7 ${item.num}</em>                </div>                {/if}                {/for}            </div>        </div>';
            if (t.csl && t.csl.length > 0)for (var a = 0; a < t.csl.length; a++)if (t.csl[a].skuId === t.sid) {
                $("#summary-price strong").html("\uffe5" + t.csl[a].p.toFixed(2));
                break
            }
            if (t.d && e.push('<em class="hl_red_bg">\u76f4\u964d</em><em class="hl_red">\u5df2\u4f18\u60e0\uffe5' + t.d + "\u5143</em>"), t.s && e.push('<em class="hl_red_bg">\u8d60\u4eac\u8c46</em><em class="hl_red">\u8d60' + t.s + "\u4eac\u8c46</em>"), t.gs && t.gs.length > 0 && i.push(s.process(t)), t.cl && t.cl.length > 0) {
                var r = "", h = "", h = "", n = "";
                r += '<em class="hl_red_bg">\u8d60\u5238</em>';
                for (var d = 0; d < t.cl.length; d++)t.cl[d].k && (h = "\u9650\u54c1\u7c7b"), 1 === t.cl[d].t && (n = "\u4eac"), 2 === t.cl[d].t && (n = "\u4e1c"), perfix += t.cl[d].q + "\u5143" + n + h + "\u5238 ";
                r += '<em class="hl_red">\u8d60\u9001' + perfix + "</em>", e.push(r)
            }
            e.length ? this.$promPhone.html('<div class="J-prom-phone">' + e.join("<br/>") + "</div>") : this.$promPhone.html(""), i.length ? this.$promGift.html('<div class="J-prom-phone-gift">' + i.join("<br/>") + "</div>") : this.$promGift.html(""), this.originPromCount = ($("#prom-bvalue").length > 0 ? 1 : 0) + ($("#prom-quan em").length > 0 ? 1 : 0)
        }, setJiaJiaGou: function (t) {
            var i = "//eve.jd.com/redirect.action?" + $.param({
                    wid: this.sku,
                    btype: t.info.ft,
                    pid: this.pid,
                    cid: this.cid,
                    r: Math.random()
                }), s = $("#store-selector .text div").text();
            s.indexOf("\u5e02") > 0 ? t.stockArea = s.substr(0, s.indexOf("\u5e02") + 1) : t.stockArea = s.substr(0, 2), t.resLink = i;
            var a = this.getTPL("jjg-prom"), r = this.getTPL("jjg-iframe");
            this.$jjg.html(a.process(t)), this.$jjg.find(".J-jjg-btn").unbind("click").bind("click", function () {
                seajs.use("JDF_UI/dialog/1.0.0/dialog", function () {
                    $("body").dialog({
                        width: 550,
                        height: 320,
                        title: "\u52a0\u4ef7\u8d2d",
                        source: r.process(t),
                        onReady: function () {
                            var t = $("#shf-feetype a");
                            pageConfig.product.havestock ? t.attr("clstag", "eve|keycount|treaty|JJGRedirect") : t.removeClass("css3-btn").addClass("css3-btn-gray").attr("href", "#none").removeAttr("target").after("<strong>\u3000\u6240\u9009\u5730\u533a\u8be5\u5546\u54c1\u6682\u65f6\u65e0\u8d27\uff0c\u975e\u5e38\u62b1\u6b49\uff01</strong>").removeAttr("clstag")
                        }
                    })
                })
            }), e.init(!1, !0), e.$el.show(), e.promCount++, e.setFoldLayer()
        }, setPlanIframe: function (t) {
            var e = this, i = "z-have-phone-service";
            this.$yysPlanTips = this.$el.find("#yys-plan-tips"), this.$yysArrow = $("#J-yys-arrow"), "100" === t ? (e.$yysPlanTips.show(), e.$yysArrow.show(), e.$el.addClass(i)) : (e.$yysPlanTips.hide(), e.$yysArrow.hide(), e.$el.removeClass(i)), e.$yysPlanTips.undelegate().delegate(".J-popup-iframe", "click", function () {
                var t = "//dj.eve.jd.com/queryCtcPackageInfo.action?", i = $(this).attr("data-url"), s = $.param({
                    skuId: e.sku,
                    provinceId: e.pid,
                    cityId: e.cid,
                    r: Math.random()
                }), a = "";
                a = i ? i.indexOf("?") > -1 ? i + s : i + "?" + s : t + s, seajs.use("JDF_UI/dialog/1.0.0/dialog", function () {
                    pageConfig.bTypeIframe = $("body").dialog({
                        type: "iframe",
                        width: 690,
                        height: 610,
                        title: "\u5957\u9910\u53d8\u66f4",
                        autoIframe: !1,
                        iframeTimestamp: !1,
                        source: a,
                        onReady: function () {
                            var t = $(this.el).width();
                            $(this.el).addClass("popup-phone-service"), $(this.content).width(t)
                        }
                    })
                })
            })
        }, clearPhoneProm: function () {
            this.$promPhone.html(""), this.$promGift.html("")
        }, destory: function () {
            this.$el.html("").hide(), this.$hy.html("").hide(), this.$phoneAd.html("").hide(), this.$jjg.html(""), this.$suit.hide().removeClass("item-hl-bg")
        }
    };
    module.exports.__id = "buytype", module.exports.init = t, module.exports.CellPhone = r
});
/*!Name: baitiao.js
 * Date: 2016-12-27 16:37:33 */
define("MOD_ROOT/baitiao/baitiao", function (require, exports, module) {
    function i(i) {
        var t = $("#choose-baitiao");
        return t.length ? void e.addListener("onPriceReady", function (e) {
            var s = e.price;
            i.baiTiaoFenQi = new n({$el: t, price: s, sku: i.skuid, cat: i.cat, cfg: i})
        }) : !1
    }

    var t = require("MOD_ROOT/common/core"), e = require("MOD_ROOT/common/tools/event").Event, s = require("JDF_UNIT/login/1.0.0/login");
    require("MOD_ROOT/ETooltips/ETooltips"), require("JDF_UNIT/trimPath/1.0.0/trimPath");
    var n = function (i, e) {
        this.$el = i.$el || $("#choose-baitiao"), this.$btn = i.$btn || $("#btn-baitiao"), this.price = i.price, this.cfg = i.cfg, this.onSelected = e || function () {
            }, this.sku = i.sku, this.cat = i.cat, this.shopId = i.cfg.shopId, this.enable = !1, this.did = "", this.disabledBT = t.onAttr("isXnzt") || t.onAttr("YuShou") || this.cfg.isBiGouMa || this.cfg.isKO, this.URL = "//btshow.jd.com/queryBtPlanInfo.do", this.JSONP_CALLBACK_NAME = "queryBtPlanInfo", window.queryBtPlanInfo = function () {
        }, this.init()
    };
    n.TEMPLATE = '    <div class="dt">\u767d\u6761\u5206\u671f</div>    <div class="dd">        <div class="baitiao-list J-baitiao-list">            {for item in planInfos}            <div class="item disabled"                 clstag="shangpin|keycount|product|baitiaofenqi_${item.plan}_${pageConfig.product.cat.join(\'_\')}"                 data-snum="${item.plan}">                <b></b>                <a href="#none">                    <strong>                    {if item.plan===1} 30\u5929\u514d\u606f {else} \uffe5${item.curTotal}&times;${item.plan}\u671f {/if}                    </strong>                    <span style="display:none;">                        {if item.isDiscount}<em>\u60e0</em>{/if}                         {if item.fee>0}\u542b{else}0{/if}\u624b\u7eed\u8d39                    </span>                </a>                <div class="baitiao-tips hide">                    <ul>                        <li>                        {if item.fee>0}                            \u542b\u624b\u7eed\u8d39\uff1a\u8d39\u7387${item.rate}%\uff0c\uffe5${item.planFee}&times;${item.plan}\u671f                        {else}                            \u65e0\u624b\u7eed\u8d39                        {/if}                        </li>                    </ul>                </div>            </div>            {/for}            {if isDiscountAll}            <div class="bt-info-tips">                <a class="J-icon-hui prom icon fl" href="#none">\u3000</a>            </div>            {/if}            <div class="bt-info-tips">                <a class="J-bt-tips question icon fl" href="#none">\u3000</a>            </div>        </div>        <div class="baitiao-text J-baitiao-text"></div>    </div>', n.prototype = {
        init: function () {
            this.bindEvent(), this.get()
        }, bindEvent: function () {
            var i = this;
            this.$el.undelegate(), this.$el.delegate(".item", "click", function () {
                var t = $(this).hasClass("selected"), e = $(this).hasClass("disabled");
                e || (i.$el.find(".item").removeClass("selected"), t ? $(this).removeClass("selected") : $(this).addClass("selected"), i.select($(this), !t))
            }), this.$el.delegate(".J-login", "click", function () {
                i.loginIframe()
            }), this.$el.delegate(".item", "mouseenter", function () {
                $(this).addClass("hover")
            }), this.$el.delegate(".item", "mouseleave", function () {
                $(this).removeClass("hover")
            }), e.addListener("onStockReady", function (t) {
                i.showItem()
            }), e.addListener("onNumChange", function (t) {
                i.disabledBT || i.get()
            }), e.addListener("onGiftSelected", function (t) {
                i.disabledBT || i.setBTLink()
            }), e.addListener("onLDPSelected", function (t) {
                i.did = t.did, i.disabledBT || i.setBTLink()
            }), e.addListener("onHeYueReady", function (t) {
                i.showItem()
            })
        }, log: function (i) {
            "undefined" != typeof errortracker && errortracker.log({filename: "reservation.js", message: i})
        }, loginIframe: function () {
            s({
                modal: !0, complete: function () {
                    window.location.reload(!0)
                }
            })
        }, getNum: function () {
            var i = $("#buy-num").val(), t = Number(i);
            return isNaN(t) ? 1 : t
        }, get: function (i) {
            var e = this, s = this.getNum(), n = this.price.p * Number(s), o = $.extend({}, i, {
                sku: this.sku,
                cId: this.cat.join(","),
                num: this.getNum(),
                amount: n,
                sourceType: "PC-XQ",
                shopId: pageConfig.product.venderId,
                ver: 1,
                isJd: t.isJd
            });
            $.ajax({
                url: this.URL,
                dataType: "jsonp",
                data: o,
                scriptCharset: "utf-8",
                jsonpCallback: this.JSONP_CALLBACK_NAME,
                timeout: 2e3,
                error: function () {
                    console.error("Baitiao service error with timeout."), t.log(null, "baitiao.js", "Baitiao service error with timeout.")
                },
                success: function (i) {
                    /debug=bt/.test(location.href) && (i.isDiscountAll = !0, i.marketingText = "\u6d4b\u8bd5\u6587\u5b57"), i && i.result && i.result.isSuccess ? e.set(i) : t.log(null, "baitiao.js", "Baitiao service error.")
                }
            })
        }, set: function (i) {
            if (i.planInfos && i.planInfos.length) {
                if (this.key = i.key, !i.isAva)return !1;
                this.$el.html(n.TEMPLATE.process(i)), this.showItem(), this.$btn.hide(), this.enabled(), this.setTips(i)
            }
            this.setBTLink()
        }, setTips: function (i) {
            var t = '            <div id="J-bt-tips">                <div class="g-tips-inner">                    <i></i><em></em>                    <ul>                        <li>1\u3001\u5b9e\u9645\u5206\u671f\u91d1\u989d\u53ca\u624b\u7eed\u8d39\u4ee5\u767d\u6761\u5269\u4f59\u989d\u5ea6\u53ca\u6536\u94f6\u53f0\u4f18\u60e0\u4e3a\u51c6</li>                        <li>2\u3001\u4ec0\u4e48\u662f\u767d\u6761\u5206\u671f\uff1f<br />                        \u4eac\u4e1c\u767d\u6761\u662f\u4eac\u4e1c\u63a8\u51fa\u7684\u4e00\u79cd\u201c\u5148\u6d88\u8d39\uff0c\u540e\u4ed8\u6b3e\u201d\u7684\u5168\u65b0\u652f\u4ed8\u65b9\u5f0f\u3002\u4f7f\u7528\u767d\u6761\u8fdb\u884c\u4ed8\u6b3e\uff0c\u53ef\u4ee5\u4eab\u53d7\u6700\u957f30\u5929\u7684\u5ef6\u540e\u4ed8\u6b3e\u671f\u6216\u6700\u957f24\u671f\u7684\u5206\u671f\u4ed8\u6b3e\u65b9\u5f0f\u3002</li>                    </ul>                </div>            </div>';
            this.$el.find(".J-bt-tips").length && this.$el.find(".J-bt-tips").show().ETooltips({
                close: !1,
                content: t,
                width: 300,
                pos: "bottom",
                zIndex: 10
            }), this.$el.find(".J-icon-hui").length && this.$el.find(".J-icon-hui").show().ETooltips({
                close: !1,
                content: i.marketingText,
                pos: "bottom",
                width: 200,
                zIndex: 10
            })
        }, disabled: function () {
            this.$el.find(".item").addClass("disabled").removeClass("selected"), this.showTips("yb"), this.hideBtn()
        }, enabled: function () {
            this.enable = !0, this.enable && this.$el.find(".item").removeClass("disabled"), this.showTips("none")
        }, select: function (i, t) {
            var s = i.attr("data-snum");
            this.hasSelectedItem = !t, t ? (this.snum = s, this.showBtn(), this.clearYbService()) : (this.snum = null, this.hideBtn()), this.setBTLink(), e.fire({
                type: "onBaiTiaoSelect",
                isSelect: t
            }), this.onSelected(t)
        }, clearYbService: function () {
            $("#choose-service .item").each(function () {
                $(this).removeClass("selected")
            })
        }, isDisabledToShow: function (i) {
            return i.isHeYue || i.isYuShou || i.isBiGouMa || !i.havestock || i.__chooseShop && i.__chooseShop.selected
        }, showItem: function () {
            this.isDisabledToShow(this.cfg) ? this.hide() : this.show()
        }, show: function () {
            this.$el.show()
        }, hide: function () {
            this.$el.hide()
        }, hideBtn: function () {
            this.$btn.hide()
        }, showBtn: function () {
            this.isDisabledToShow(this.cfg) || this.$btn.show()
        }, setBTLink: function () {
            var i = "//bttrade.jd.com/shopping/order/getOrderInfo.action?", t = pageConfig.giftSelectedSkuids ? pageConfig.giftSelectedSkuids.join(",") : "", e = {
                pid: this.sku,
                cid: this.cat[2],
                num: this.getNum(),
                snum: this.snum,
                key: this.key,
                gids: t,
                did: this.did
            };
            this.snum ? this.$btn.attr("href", i + $.param(e)) : this.$btn.attr("href", "#none")
        }, showTips: function (i) {
            var t = pageConfig.hasYbService ? "<em>\u589e\u503c\u4fdd\u969c\u4e0d\u652f\u6301\u4e00\u952e\u6253\u767d\u6761 </em>" : "", e = {
                yb: t,
                none: ""
            };
            this.$el.find(".J-baitiao-text").html(e[i])
        }
    }, module.exports.__id = "baitiao", module.exports.init = i
});
/*!Name: o2o.js
 * Date: 2016-12-27 16:37:35 */
define("MOD_ROOT/o2o/o2o", function (require, exports, module) {
    function t(t) {
        var i = $("#choose-shop");
        t.__chooseShop = s.init(i, t)
    }

    var i = require("MOD_ROOT/common/tools/event").Event, e = require("MOD_ROOT/common/tools/tools"), s = (require("MOD_ROOT/buybtn/buybtn"), {
        init: function (t, i) {
            return this.$el = t, this.$btn = $("#choose-btn-shop"), this.$baitiao = $("#choose-baitiao"), this.cfg = i, this.selected = !1, this.$el.length && this.$btn.length ? (this.get(), this.bindEvent(), this) : !1
        }, bindEvent: function () {
            this.$el.undelegate("click"), this.$el.delegate(".item,.J-mod", "click", $.proxy(this.openIframe, this)), this.$el.delegate(".J-cancel", "click", $.proxy(this.reset, this)), i.addListener("onNumChange", $.proxy(this.setBtnLink, this)), i.addListener("onAreaChange", $.proxy(this.handleAreaChange, this))
        }, handleAreaChange: function () {
            this.cfg.havestock && this.selected ? this.enableBtn() : this.disableBtn()
        }, openIframe: function () {
            var t = "//cd.jd.com/locshop?", i = e.getAreaId().areaIds, s = {
                skuId: this.cfg.skuid,
                cat: this.cfg.cat.join(","),
                addrCodeLv1: i[0],
                addrCodeLv2: i[1],
                addrCodeLv3: i[2],
                venderId: this.cfg.venderId,
                modifyFlag: !!this.selected,
                sku: this.sku || "",
                sid: this.sid || "",
                num: this.num || "",
                name: this.name || "",
                price: this.price || "",
                provider: this.provider || "",
                coor: this.coor || ""
            };
            $("body").dialog({
                width: 900,
                height: 520,
                title: "\u9009\u62e9\u95e8\u5e97",
                type: "iframe",
                autoIframe: !1,
                source: t + $.param(s),
                onReady: function () {
                    $("#dialogIframe").css("height", "100%")
                }
            })
        }, setResult: function (t, i, e, s, n, h, o) {
            t = t || "", i = i || "", s = s || "", n = n || 1, e = e || "", h = h || "", this.selected = !0, this.sku = t, this.sid = i, this.num = n, this.name = e, this.price = s, this.provider = h, this.coor = o, e.length > 25 && (e = e.substr(0, 25) + "...");
            var a = "{0} \uffe5{1}&times;{2}".format(e, s, n);
            h = "\u7531 {0} \u63d0\u4f9b\u670d\u52a1".format(h), this.$el.find(".item").addClass("selected"), this.setContent(a, h), this.setBtn(), this.setBtnLink(), this.showResult()
        }, setContent: function (t, i) {
            this.$el.find(".J-service-provider").html(i), this.$el.find(".item a").html(t)
        }, setBtnLink: function () {
            var t = "//cart.jd.com/cart/dynamic/gateForSubFlow.action?", i = $.param({
                wids: this.cfg.skuid + "," + this.sku,
                nums: $("#buy-num").val() + "," + this.num,
                sid: this.sid,
                subType: 47,
                r: Math.random()
            });
            this.buyUrl = t + i, this.$btn.hasClass("btn-disable") || this.$btn.attr("href", this.buyUrl)
        }, showBtn: function () {
            this.$btn.show()
        }, hideBtn: function () {
            this.$btn.hide()
        }, enableBtn: function () {
            this.$btn.removeClass("btn-disable"), this.buyUrl && this.$btn.attr("href", this.buyUrl)
        }, disableBtn: function () {
            this.$btn.addClass("btn-disable"), this.$btn.attr("href", "#none")
        }, setBtn: function () {
            this.showBtn(), this.cfg.havestock ? this.enableBtn() : this.disableBtn(), this.cfg.baiTiaoFenQi.showItem(), this.cfg.baiTiaoFenQi.hideBtn(), this.cfg.addToCartBtn.hide(), this.cfg.oneKeyBuyBtn.hide()
        }, get: function () {
            $.ajax({
                url: "//c.3.cn/locshop/has",
                data: {skuId: this.cfg.skuid, cat: this.cfg.cat.join(",")},
                dataType: "jsonp",
                timeout: 1e3,
                error: $.proxy(this.set, this),
                success: $.proxy(this.set, this)
            })
        }, set: function (t) {
            return t && "true" === t.hasLocShop ? (this.render(), void this.$el.show()) : (this.$el.hide(), this.clear(), !1)
        }, render: function () {
            var t = '                <div class="item"><b></b><a href="#none">\u9009\u62e9\u95e8\u5e97\u53ca\u670d\u52a1</a></div>                <div class="J-operate operate fl hide">                    <a href="#none" class="J-mod">\u4fee\u6539</a>                    <a href="#none" class="J-cancel">\u53d6\u6d88</a>                </div>                <div class="J-service-provider service-provider hide"></div>';
            this.$el.find(".dd").html(t)
        }, showResult: function () {
            this.$el.find(".J-operate,.J-service-provider").show()
        }, hideResult: function () {
            this.$el.find(".J-operate,.J-service-provider").hide()
        }, reset: function () {
            this.selected = !1, this.$el.find(".item").removeClass("selected"), this.render(), this.hideResult(), this.hideBtn(), this.$baitiao.show(), this.cfg.addToCartBtn.show(), this.cfg.oneKeyBuyBtn.showBtn(), this.cfg.baiTiaoFenQi.showItem()
        }, clear: function () {
            this.$el.find(".dd").html("")
        }
    });
    module.exports.__id = "o2o", module.exports.init = t
});
/*!Name: buybtn.js
 * Date: 2016-12-27 16:37:33 */
define("MOD_ROOT/buybtn/buybtn", function (require, exports, module) {
    function t(t) {
        t.addToCartBtn = u.init(t), t.oneKeyBuyBtn = s.init(t), t.notifyBtn = r.init(t), t.bgmBtn = d.init(t), t.jnbtBtn = c.init(t), t.reservationBtn = n.init(t), t.koBtn = a.init(t), l(t), o()
    }

    var i = require("MOD_ROOT/common/tools/event").Event, e = require("MOD_ROOT/common/tools/tools"), s = require("MOD_ROOT/buybtn/onekey"), n = require("MOD_ROOT/buybtn/reservation"), a = require("MOD_ROOT/buybtn/ko"), d = require("MOD_ROOT/buybtn/bigouma"), h = require("JDF_UNIT/notif/1.0.0/notif");
    window.setAmount = {
        init: function () {
            this.min = 1, this.max = 199, this.count = 1, this.disableAdd = !1, this.disableReduce = !0, this.$buyNum = $("#buy-num"), this.$buyBtn = $("#InitCartUrl"), this.$add = $("#choose-btns .btn-add"), this.$reduce = $("#choose-btns .btn-reduce"), this.matchCountKey = ["pcount", "pCount", "num", "buyNum"], /debug=num/.test(location.href) && this.$buyNum.attr("data-min", "5");
            var t = this.$buyNum.data("min");
            t && (this.min = t, this.count = t), this.checkLimit(), this.bindEvent()
        }, bindEvent: function () {
            function t(t, e) {
                t.ETooltips({
                    close: !1,
                    content: '<div class="min-buy-tips"></div>',
                    width: 150,
                    position: "bottom",
                    zIndex: 10,
                    onOpen: function () {
                        var t = '<img src="//img20.360buyimg.com/da/jfs/t2734/145/4239060100/1006/b6d0f0d8/57b4240fN9cc48b02.png" />';
                        this.$tooltips.find(".min-buy-tips").html(e.format(t, i.$buyNum.val()))
                    }
                })
            }

            var i = this;
            this.$buyNum.unbind("change keydown keyup").bind("change keydown keyup", e.throttle($.proxy(this.handleChange, this), 500)), t(this.$reduce, "{0} \u6700\u5c11\u8d2d\u4e70 {1} \u4ef6"), t(this.$add, "{0} \u6700\u591a\u8d2d\u4e70 {1} \u4ef6")
        }, disabledReduce: function (t) {
            this.disableReduce = !0, this.disableAdd = !1, this.$reduce.addClass("disabled"), this.$add.removeClass("disabled"), this.$add.attr("data-disabled", "1"), t ? this.$reduce.removeAttr("data-disabled") : this.$reduce.attr("data-disabled", "1")
        }, disabledAdd: function (t) {
            this.disableAdd = !0, this.disableReduce = !1, this.$add.addClass("disabled"), this.$reduce.removeClass("disabled"), this.$reduce.attr("data-disabled", "1"), t ? this.$add.removeAttr("data-disabled") : this.$add.attr("data-disabled", "1")
        }, enabledAll: function () {
            this.disableAdd = !1, this.disableReduce = !1, this.$reduce.removeClass("disabled").attr("data-disabled", "1"), this.$add.removeClass("disabled").attr("data-disabled", "1")
        }, getVal: function () {
            return this.$buyNum.val()
        }, setVal: function (t) {
            this.$buyNum.val(t)
        }, checkLimit: function () {
            var t = this.$buyNum.data("min"), i = Number(this.getVal());
            1 >= i && this.disabledReduce(), i >= this.max && this.disabledAdd(!0), i > 1 && i < this.max && this.enabledAll(), t && i === this.min && this.disabledReduce(!0)
        }, isEmpty: function (t) {
            return "" == $.trim(t)
        }, isFloat: function (t) {
            return Number(t) === t && t % 1 !== 0
        }, add: function () {
            var t = Number(this.getVal());
            return this.disableAdd || this.isEmpty(t) ? !1 : (t > this.min && (this.disableReduce = !1), t >= this.max ? (this.setDisabled(this.$add), this.disableAdd = !0, !1) : (this.disableAdd = !1, this.setEnabled(this.$add), this.count++, this.setVal(this.count), this.checkLimit(), void this.setBuyLink()))
        }, reduce: function () {
            var t = Number(this.getVal());
            return this.disableReduce || this.isEmpty(t) ? !1 : (t < this.max && (this.disableAdd = !1), t <= this.min ? (this.setDisabled(this.$reduce), this.disableReduce = !0, !1) : (this.setEnabled(this.$reduce), this.disableReduce = !1, this.count--, this.setVal(this.count), this.checkLimit(), void this.setBuyLink()))
        }, handleChange: function () {
            var t = this.getVal(), i = null;
            isNaN(Number(t)) || this.isEmpty(t) || this.isFloat(Number(t)) ? i = this.count : (t < this.min && (i = this.min, this.disabledReduce(1 !== i)), t > this.max && (i = this.max, this.disabledAdd(!0))), i ? (this.count = i, this.$buyNum.val(i)) : this.count = Number(t), this.checkLimit(), this.setBuyLink()
        }, modify: function () {
        }, setDisabled: function (t) {
            t.attr("data-disabled", 1)
        }, setEnabled: function (t) {
            t.removeAttr("data-disabled")
        }, setBuyLink: function () {
            var t = this;
            t.$buyBtn.each(function () {
                var i, e, s = $(this), n = s.attr("href"), a = n.split("?")[1];
                !function () {
                    for (var d = 0; d < t.matchCountKey.length; d++)if (e = new RegExp(t.matchCountKey[d] + "=\\d+"), e.test(a))return i = n.replace(e, t.matchCountKey[d] + "=" + t.count), s.attr("href", i), !1
                }()
            }), i.fire({type: "onNumChange", count: this.count})
        }
    }, setAmount.init();
    var o = function () {
        function t(t, i) {
            t.attr("href", t.attr("href").replace(/(nums|pcount)=\d+/g, "$1=" + i))
        }

        var e = $("#choose-btn-gift");
        /gift=true/.test(location.href) && ($("#choose-btn-gift").show(), i.addListener("onNumChange", function (i) {
            t(e, i.count)
        }))
    }, u = {
        init: function (t) {
            return this.cfg = t, this.$el = $("#InitCartUrl,#InitCartUrl-mini"), this.cName = "btn-disable", this.originHref = this.$el.attr("href"), this.href = this.$el.attr("href"), this.bindEvent(t), this
        }, reInit: function (t) {
            var i = '<a href="' + this.cfg.addToCartUrl + '" id="InitCartUrl" class="btn-special1 btn-lg" clstag="shangpin|keycount|product|\u52a0\u5165\u8d2d\u7269\u8f66_1">\u52a0\u5165\u8d2d\u7269\u8f66</a>';
            $("#InitCartUrl").length < 1 && t.before(i), this.init(this.cfg), this.disabled(), this.enabled()
        }, bindEvent: function (t) {
            function e() {
                t.havestock ? s.enabled() : s.disabled()
            }

            var s = this;
            i.addListener("onStockReady", e)
        }, show: function () {
            var t = this.cfg.isHeYue || this.cfg.isYuShou || this.cfg.isBiGouMa || this.cfg.isKO;
            return t ? !1 : void this.$el.show()
        }, hide: function () {
            this.$el.hide()
        }, updateNum: function (t) {
            var i = $("#buy-num").val();
            return t ? t.replace(/(nums|pcount|buyNum)=\d+/g, "$1=" + i) : void 0
        }, disabled: function () {
            var t = this.$el.attr("href");
            return this.$el.addClass(this.cName), this.$el.attr("href", "#none"), t
        }, enabled: function (t) {
            t = this.updateNum(t || this.href);
            var i = this.cfg.isClosePCShow || !this.cfg.havestock;
            return i ? !1 : (this.$el.removeClass(this.cName), this.$el.attr("href", t), void(this.href = t))
        }
    }, r = {
        init: function (t) {
            return this.cfg = t, this.$el = $("#btn-notify"), h({el: $(".J-notify-sale")}), h({el: $(".J-notify-stock")}), this.bindEvent(), this
        }, show: function () {
            this.cfg.havestock || this.cfg.unSupportedArea ? this.hide() : this.$el.show()
        }, hide: function () {
            this.$el.hide()
        }, bindEvent: function () {
            var t = this;
            i.addListener("onStockReady", function () {
                t.show()
            })
        }
    }, c = {
        init: function (t) {
            return this.cfg = t, this.$el = $("#choose-btn-jnbt"), this.$el.length && this.bindEvent(), this
        }, isTargetArea: function () {
            var t = e.getAreaId().areaIds[0];
            return 1 === t
        }, changeArea: function () {
            var t = this.$el;
            t.length < 1 || (this.show(), this.cfg.havestock ? this.enabled() : this.disabled())
        }, bindEvent: function () {
            i.addListener("onStockReady", $.proxy(this.changeArea, this));
            var t = this.$el, e = "<p>1. \u70b9\u51fb\u53c2\u52a0\u8282\u80fd\u8865\u8d34\u6309\u94ae\u8d2d\u4e70\uff0c\u6700\u9ad8\u53ef\u51cf\u514d800\u5143\uff01</p>                 <p>2. \u8282\u80fd\u8865\u8d34\u9762\u5411\u5317\u4eac\u5730\u533a\u7684\u7528\u6237\uff0c\u9700\u60a8\u6536\u8d27\u5730\u5740\u4e3a\u5317\u4eac\u4e14\u63d0\u4f9b\u76f8\u5e94\u8bc1\u4ef6\u8bc1\u660e\uff0c                \u6700\u9ad8\u53ef\u4eab\u5546\u54c1\u91d1\u989d13%\u7684\u51cf\u514d\uff08\u4e0a\u9650800\u5143\uff09\uff0c\u5e76\u540c\u65f6\u652f\u6301\u4f7f\u7528\u4eac\u4e1c\u4f18\u60e0\u5238\uff0c                \u70b9\u51fb\u53c2\u52a0\u8282\u80fd\u8865\u8d34\u6309\u94ae\u7acb\u5373\u4f53\u9a8c\uff01</p> ";
            seajs.use("MOD_ROOT/ETooltips/ETooltips", function () {
                t.ETooltips({close: !1, content: e, width: 265, position: "bottom", zIndex: 10})
            })
        }, enabled: function () {
            this.cfg.havestock ? (this.$el.removeClass("btn-disable"), this.$el.attr("href", this.$el.attr("dataurl"))) : this.disabled()
        }, disabled: function () {
            this.$el.addClass("btn-disable").attr("href", "#none")
        }, show: function () {
            this.isTargetArea() ? this.$el.show() : this.hide()
        }, hide: function () {
            this.$el.hide()
        }
    }, l = function (t) {
        var e = $("#btn-dqs"), s = "//ding.jd.com/orderPlan/toCreateOrderPlan.action?";
        i.addListener("onStockReady", function () {
            t.havestock ? e.removeClass("btn-disable") : e.addClass("btn-disable")
        }), e.show(), e.bind("click", function () {
            function i() {
                $("body").dialog({
                    type: "iframe",
                    width: 520,
                    height: 320,
                    title: "\u5b9a\u671f\u9001",
                    autoIframe: !1,
                    iframeTimestamp: !1,
                    source: s + $.param(e)
                })
            }

            if (!t.havestock)return !1;
            var e = {skuId: t.skuid, buyNum: $(".buy-num").val(), r: Math.random()};
            require.async(["JDF_UNIT/login/1.0.0/login", "JDF_UI/dialog/1.0.0/dialog"], function (t) {
                t({modal: !0, complete: i})
            })
        })
    };
    module.exports.__id = "buybtn", module.exports.init = t, module.exports.setAmount = setAmount, module.exports.addToCartBtn = u
});
/*!Name: track.js
 * Date: 2016-12-27 16:37:36 */
define("MOD_ROOT/track/track", function (require, exports, module) {
    function i(i) {
        var o = $("#track"), a = pageConfig.compatible && pageConfig.wideVersion;
        a || o.hover(function () {
            $(this).addClass("hover")
        }, function () {
            $(this).removeClass("hover")
        }), new t({
            $el: o.find(".track-con"),
            skuHooks: "SKUS_track",
            template: e,
            ext: {title: "\u770b\u4e86\u53c8\u770b", imgWidth: 180, imgHeight: 180},
            param: {p: i.isCloseLoop ? 902029 : 102004, sku: i.skuid, lim: 15, ck: "pin,ipLocation,atw,aview"},
            callback: function () {
                var i = o.find(".track-con"), t = o.find(".J-prev"), e = o.find(".J-next");
                i.imgScroll({
                    width: 150,
                    height: 170,
                    visible: 3,
                    showControl: !0,
                    step: 3,
                    direction: "y",
                    loop: !0,
                    prev: t,
                    next: e
                })
            }
        })
    }

    var t = require("MOD_ROOT/common/tools/recommend");
    require("PLG_ROOT/jQuery.imgScroll");
    var e = '    <ul clstag="shangpin|keycount|product|kanleyoukan_2">        {for item in data}        <li data-clk="${item.clk}"             data-push="${pageConfig[skuHooks].push(item.sku)}">            <a target="_blank" title="${item.t}" href="//item.jd.com/${item.sku}.html">                <img height="150" width="150" alt="${item.t}" src="${pageConfig.FN_GetImageDomain(item.sku)}n1/s150x150_${item.img}">                <p class="J-p-${item.sku}">\uffe5</p>            </a>        </li>        {/for}    </ul>';
    module.exports.init = i, module.exports.__id = "track"
});
/*!Name: suits.js
 * Date: 2016-12-27 16:37:35 */
define("MOD_ROOT/suits/suits", function (require, exports, module) {
    function t(t) {
        var a = {
            item: '            <div class="item" data-pid="{0}">                <a href="#none" class="title"                     data-drop="head"                     data-pid="{0}"                     clstag="shangpin|keycount|product|xuanzetaozhuang_{1}">{2}</a>                <div class="suits-panel J-suits-panel"></div>            </div>',
            colorAttr: '            {for attr in list}                {if attr.attr=="color" && attr.data.length>0}                <div class="p-pic J-p-pic" data-type="${attr.attr}" data-value="${attr.data[0]}">                    <a href="#none" class="sprite-arrowL J-thumb-prev"></a>                    <a href="#none" class="sprite-arrowR J-thumb-next"></a>                    <div class="J-thumb-scroll thumb-scroll-wrap">                        <ul class="pic-list">                            {for color in attr.data}                            <li class="inner-list {if Number(color_index)==0} current{/if}" data-attr="${color}" data-imgsrc="${colorMap[color]}">                                <a href="#none"><img title="${color}" width="20" height="20" src="//img10.360buyimg.com/n1/s20x20_${colorMap[color]}" alt="${color}"/></a>                            </li>                            {/for}                        </ul>                    </div>                </div>                {else}                    {if attr.data.length}                    <select class="J-attr-check yb-item-cat" data-open="false" data-type="${attr.attr}" data-value="${attr.data[0]}">                        {for item in attr.data}                            <option value="${item}" title="${item}">${item}</option>                        {/for}                    </select>                    {/if}                {/if}            {/for}',
            packList: '            <div class="suits-box"">                <div class="J-scroll">                <ul class="lh clearfix">                    {for pool in poolList}                    {var isLastItem = Number(pool_index)+1==poolList.length}                    {var currItem = pool.colorList[0]}                    <li {if pool.colorList.length>3} data-scroll="true"{/if} class="J-sku-item sku-item {if isLastItem} last{/if} "                        data-push="${pageConfig.SKU_suits.push(currItem.skuId)}">                        <div class="p-img J-p-img">                            <a href="//item.jd.com/${currItem.skuId}.html" target="_blank">                                {if currItem.skuPicUrl}                                <img width="100" height="100" src="${pageConfig.FN_GetImageDomain(currItem.skuId)}n1/s100x100_${currItem.skuPicUrl}">                                {/if}                            </a>                            <div class="no-stock J-no-stock hide">${areaName}\u65e0\u8d27</div>                        </div>                        <div class="J-attrs"></div>                        <div class="p-name J-p-name">                            <a href="//item.jd.com/${currItem.skuId}.html" target="_blank">${currItem.skuName}</a>                        </div>                        <div class="p-check-price-num">                            {if typeof pool.selectState!="undefined"&&pool.selectState!=1}<input type="checkbox" class="p-checkbox J-choose"/>{/if}                            {if typeof packType!="undefined"&&packType==6&&pageConfig.product.cat[2]==798}                                <strong class="p-price">\uffe5${parseFloat(currItem.finalPrice).toFixed(2)}</strong>                            {/if}                            {if typeof currItem.count!="undefined"&&currItem.count>1}<span class="J-count p-count">\xd7${currItem.count}</span>{/if}                            {if typeof pool.num!="undefined"&&pool.num>1}<span class="J-count p-count">\xd7${pool.num}</span>{/if}                        </div>                        <i class="plus">+</i>                    </li>                    {/for}                </ul>                </div>                {if poolList.length>3}                <a href="javascript:;" class="J-arrow arrow-prev disabled"><i class="sprite-arrow-prev"></i></a>                <a href="javascript:;" class="J-arrow arrow-next disabled"><i class="sprite-arrow-next"></i></a>                {/if}            </div>            <div class="suits-detail">                <div class="price-box">                    <div class="suits-price J-suits-price">                        <span class="text">\u5957\u88c5\u4ef7\uff1a</span>                        <span class="p-price">                            <strong {if suitType==1} class="J-p-${packId}"{/if}>\uffe5${parseFloat(packPromotionPrice).toFixed(2)}</strong>                        </span>                    </div>                    {var isHideSavePrice = typeof packType=="undefined" || packType!=6}                    <div class="suits-save-price J-suits-save-price {if isHideSavePrice} hide {/if}">                        <span class="text">\u8282\u7701</span><span class="p-price">                            <strong>{if typeof baseSuitDiscount!="undefined"}\uffe5${parseFloat(baseSuitDiscount).toFixed(2)}{/if}</strong>                        </span>                    </div>                </div>                <div class="btns">                    <a href="#none" class="btn-primary J-btn" clstag="shangpin|keycount|product|xuanzetaozhuang_button">\u8d2d\u4e70\u5957\u88c5</a>                </div>                <div class="suits-tips fr hl_red hide">\u5957\u88c5\u5185\u90e8\u5206\u5546\u54c1\u65e0\u8d27</div>            </div>'
        };
        return a[t]
    }

    function a(t) {
        var a = $("#choose-suits");
        r.init(a, t)
    }

    var e = require("MOD_ROOT/common/tools/event").Event, i = require("MOD_ROOT/common/tools/tools"), s = (require("MOD_ROOT/common/core"), require("MOD_ROOT/address/area"));
    require("MOD_ROOT/EDropdown/EDropdown"), require("PLG_ROOT/jQuery.imgScroll");
    var r = {
        init: function (t, a) {
            var e = this;
            e.$el = t || $("#choose-suits"), e.packList = [], e.cfg = a, e.packData = {}, e.$el.length && (e.getData(), e.bindEvent(), e.isInited = !0)
        }, getData: function () {
            var t = this;
            $.ajax({
                url: "//c.3.cn/recommend",
                data: {
                    sku: t.cfg.skuid,
                    cat: t.cfg.cat.join(","),
                    area: i.getAreaId().areaIds.join("_"),
                    methods: "suitv2",
                    count: 6
                },
                scriptCharset: "gbk",
                dataType: "jsonp",
                success: $.proxy(t.handleData, t)
            })
        }, rePos: function (t) {
            var a = t.find(".J-suits-panel");
            a.css("top", t.position().top + t.height() - 1)
        }, bindEvent: function () {
            var t = this;
            t.isInited || (t.$el.undelegate(), $(document).bind("click.suit", $.proxy(t.handleDocumentClick, t)), t.$el.delegate(".item [data-pid]", "click", $.proxy(t.handleClick, t)), t.$el.delegate(".J-thumb-scroll li", "click", $.proxy(t.handleColorClick, t)), t.$el.delegate(".J-attr-check", "change", $.proxy(t.handleAttrClick, t)), t.$el.delegate(".J-choose", "change", $.proxy(t.handleChooseClick, t)), e.addListener("onHeYueReady", function () {
                var a = t.cfg.isHeYue;
                a ? t.$el.hide() : t.$el.find(".item").length > 0 && t.$el.show()
            }), e.addListener("onAreaChange", function () {
                r.init(t.$el, t.cfg)
            }))
        }, handleData: function (t) {
            var a = this;
            return t && 200 == t.suit.status && t.suit.data.packList && t.suit.data.packList.length ? void a.renderItem(t.suit.data) : (a.$el.find(".dd").empty(), a.$el.hide(), !1)
        }, handleDocumentClick: function (t) {
            var a = this;
            $(t.target).parents(".choose-suits").length < 1 && ($.browser.isIE7() || a.$el.find(".item").removeClass("open"))
        }, handleClick: function (t) {
            var a = this, e = $(t.target), i = e.data("pid"), s = e.parents(".item");
            return s.hasClass("open") ? void s.removeClass("open") : (this.$el.find(".item").removeClass("open"), s.addClass("open"), this.$currSuit = e.next(".J-suits-panel"), e.data("loaded") || (this.setSuitContent(i), e.data("loaded", !0)), void a.rePos(s))
        }, renderItem: function (a) {
            var e = this, i = "", s = t("item");
            e.data = a;
            for (var r = a.packList, n = 0; n < r.length; n++) {
                var o = r[n], c = "";
                c = 1 == a.original ? "\u4f18\u60e0\u5957\u88c5" + (n + 1) : o.packName, i += s.format(o.packId, e.cfg.cat[2], c);
                var l = "";
                if (6 == o.packType && o.suitSkuPriceList)for (var d = 0; d < o.suitSkuPriceList.length; d++) {
                    var u = o.suitSkuPriceList[d];
                    u.skuId == a.mainSkuId && (l = u.finalPrice)
                }
                1 != o.suitType && o.poolList.unshift({
                    selectState: 1,
                    colorList: [{skuPicUrl: a.mainSkuPicUrl, skuName: a.mainSkuName, skuId: a.mainSkuId, finalPrice: l}]
                }), o.poolList.sort(function (t, a) {
                    return t.selectState ? t.selectState - a.selectState : 1
                }), e.packData[o.packId] = o
            }
            e.$el.find(".dd").html(i), e.$el.show()
        }, handleAttrData: function (t) {
            function a(t, a) {
                var e = "\u2299", i = e + t.join(e) + e, s = e + a + e;
                return i.indexOf(s) > -1
            }

            for (var e = t.attrSheme, i = t.colorMap, s = t.colorList, r = 0; r < s.length; r++) {
                var n = s[r];
                i[n.color] = n.skuPicUrl;
                for (var o = 0; o < e.length; o++) {
                    var c = e[o].attr, l = n[c];
                    e[o].data || (e[o].data = []), l && !a(e[o].data, l) && e[o].data.push(l)
                }
            }
        }, handleColorClick: function (t) {
            var a = this, e = $(t.currentTarget), i = e.data("attr"), s = e.data("imgsrc");
            e.parent().find("li").removeClass("current"), e.addClass("current");
            var r = e.parents(".J-sku-item"), n = r.find(".J-p-img img");
            n.attr("src", "//img10.360buyimg.com/n1/s100x100_" + s), e.parents(".J-p-pic").attr("data-value", i);
            var o = e.parents(".item"), c = a.getEqualObjBySkuItem(r);
            r.find(".J-p-img a").attr("href", "//item.jd.com/" + c.skuId + ".html"), r.find(".J-p-name a").attr("href", "//item.jd.com/" + c.skuId + ".html"), r.find(".J-p-name a").html(c.skuName), a.setBuyLink(o)
        }, handleAttrClick: function (t) {
            var a = this, e = $(t.currentTarget), i = e.parents(".J-sku-item");
            e.attr("data-value", e.val());
            var s = e.parents(".item"), r = a.getEqualObjBySkuItem(i);
            s.find(".J-p-img a").attr("href", "//item.jd.com/" + r.skuId + ".html"), a.setBuyLink(s)
        }, handleChooseClick: function (t) {
            var a = this, e = $(t.currentTarget), i = e.parents(".item");
            a.setBuyLink(i)
        }, getEqualObjBySkuItem: function (t) {
            var a = this, e = t.index(), i = t.find(".J-attrs").children(), s = t.parents("[data-pid]").attr("data-pid"), r = {};
            $.each(a.data.packList, function (t, a) {
                a.packId == s && (r = a)
            });
            var n = r.poolList[e].colorList, o = n.slice(), c = null;
            return $.each(o, function (t, a) {
                var e = !0;
                $.each(i, function (t, i) {
                    var s = $(i), r = s.attr("data-type"), n = s.attr("data-value");
                    a[r] != n && (e = !1)
                }), e && (c = a)
            }), c
        }, setSuitContent: function (a) {
            var e = this;
            pageConfig.SKU_suits = [];
            var r = e.packData[a], n = readCookie("areaId");
            r.areaName = s.provinceMap[n];
            var o = t("packList"), c = $(o.process(r));
            e.$currSuit.html(c);
            for (var l = 0; l < r.poolList.length; l++) {
                var d = r.poolList[l];
                if (d.colorList.length > 1) {
                    d.attrSheme = [{attr: "color"}, {attr: "size"}, {attr: "spec"}], d.colorMap = {}, e.handleAttrData(d);
                    var u = t("colorAttr"), p = $(u.process({list: d.attrSheme, colorMap: d.colorMap}));
                    c.find(".J-sku-item").eq(l).find(".J-attrs").html(p)
                }
            }
            var h = e.checkIsAllCanSelect(r.poolList);
            h && e.$currSuit.find(".J-choose").eq(0).click(), this.initScroll(), r.poolList.length > 3 && this.setScroll();
            var f = e.$currSuit.parents(".item");
            e.setBuyLink(f), 1 == r.suitType && i.priceNum({skus: [r.packId], $el: this.$currSuit});
            var m = 0, v = f.find(".J-suits-panel"), k = v.find(".J-sku-item");
            k.each(function (t, a) {
                var e = $(a);
                e.height() > m && (m = e.height())
            }), m += 10, k.parents("ul").height(m), k.parents(".J-scroll").height(m)
        }, checkIsAllCanSelect: function (t) {
            for (var a, e = !0, i = 0; i < t.length; i++)if (a = t[i], 1 == a.selectState) {
                e = !1;
                break
            }
            return e
        }, setBuyLink: function (t) {
            var a = this, e = t.attr("data-pid"), i = t.find(".J-suits-panel"), s = i.find(".J-sku-item"), r = !0, n = [a.cfg.skuid], o = [a.cfg.skuid], c = 1 == a.packData[e].suitType;
            if (!c)for (var l = 1; l < s.length; l++) {
                var d = s.eq(l), u = d.find(".J-choose"), p = !1;
                u.length ? u.is(":checked") && (p = !0) : p = !0;
                var h = d.find(".J-no-stock"), f = a.getEqualObjBySkuItem(d);
                f.stock ? (d.find(".J-choose").attr("disabled"), u.removeProp("disabled"), h.hide(), p && (o.push(f.skuId), n.push(f.skuId))) : (h.show(), u.prop("disabled", "disabled"), p && (o.push(f.skuId), r = !1))
            }
            if (c || a.calPrice(t, e, o), !r)return void a.setBtnDisable(t);
            var m = t.find(".J-btn");
            m.removeClass("btn-disable");
            var v;
            v = c ? "//cart.jd.com/gate.action?pid=" + e + "&pcount=1&ptype=1" : "//cart.jd.com/gate.action?" + $.param({
                pid: e,
                pcount: 1,
                ptype: 3,
                sku: n.join(",")
            }), m.attr("href", v)
        }, calPrice: function (t, a, e) {
            $.ajax({
                url: "//jprice.jd.com/suit/suitprice",
                data: {suitId: a, skuIds: e.join(","), origin: 1, webSite: 1},
                dataType: "jsonp",
                success: function (a) {
                    var e = t.find(".J-suits-price strong"), i = t.find(".J-suits-save-price strong");
                    a && a.packPromotionPrice ? (e.html("\uffe5 " + a.packPromotionPrice.toFixed(2)), i.html("\uffe5 " + a.baseSuitDiscount.toFixed(2))) : (e.html("\u6682\u65e0\u62a5\u4ef7"), i.html("\u6682\u65e0\u62a5\u4ef7"))
                }
            })
        }, setBtnDisable: function (t) {
            var a = t.find(".J-btn");
            a.addClass("btn-disable"), a.attr("href", "#none")
        }, initScroll: function () {
            var t = this.$currSuit.find('[data-scroll="true"]');
            t.each(function () {
                var t = $(this).find(".J-thumb-scroll"), a = $(this).find(".J-thumb-prev"), e = $(this).find(".J-thumb-next");
                t.imgScroll({visible: 3, step: 3, prev: a, next: e, showControl: !0})
            })
        }, setScroll: function () {
            var t = this.$currSuit.find(".J-scroll"), a = this.$currSuit.find(".arrow-prev"), e = this.$currSuit.find(".arrow-next");
            t.imgScroll({visible: 3, step: 3, prev: a, next: e})
        }
    };
    module.exports.__id = "suits", module.exports.init = a
});
/*!Name: crumb.js
 * Date: 2016-12-27 16:37:34 */
define("MOD_ROOT/crumb/crumb", function (require, exports, module) {
    function i(i, e) {
        a || $.ajax({
            url: "//c.3.cn/brand/recommend",
            data: {skuId: i.skuid, cat: i.cat.join(","), brandId: i.brand},
            scriptCharset: "gbk",
            dataType: "jsonp",
            success: function (i) {
                i && i.items.length && (a = !0, pageConfig.crumbBR = [], e.html(t.process(i)).show(), n.priceNum({
                    skus: pageConfig.crumbBR,
                    $el: e
                }))
            }
        })
    }

    function e(e) {
        var n = $(".J-crumb-br");
        return n.length < 1 ? !1 : void n.EDropdown({
            lazyload: "data-src", onOpen: function () {
                i(e, n.find(".content .br-reco"))
            }
        })
    }

    var n = require("MOD_ROOT/common/tools/tools");
    require("MOD_ROOT/EDropdown/EDropdown");
    var t = '        {for item in items}        <li class="fore${pageConfig.crumbBR.push(item.id)}">            <div class="p-img">                <a href="//item.jd.com/${item.id}.html" target="_blank">                    <img width="65" height="65" alt="${item.base_info.name}" src="${pageConfig.FN_GetImageDomain(item.id)}n1/s65x65_${item.base_info.imageUrl}">                </a>            </div>            <div class="p-name">                <a href="//item.jd.com/${item.id}.html" target="_blank">${item.base_info.name}</a>            </div>            <div class="p-price">                <strong class="J-p-${item.id}">\uffe5</strong>            </div>        </li>        {/for}', a = !1;
    module.exports.__id = "crumb", module.exports.init = e
});
/*!Name: fittings.js
 * Date: 2016-12-27 16:37:34 */
define("MOD_ROOT/fittings/fittings", function (require, exports, module) {
    function t(t, i, e) {
        $.ajax({
            url: t,
            dataType: "jsonp",
            data: i,
            scriptCharset: "gbk",
            jsonpCallback: "handleComboCallback",
            success: function (t) {
                if (!t)return !1;
                for (var i in t)t.hasOwnProperty(i) && 200 === t[i].status && t[i].data && e({
                    method: i,
                    data: t[i].data
                })
            }
        })
    }

    function i(i) {
        var e = o.getUUID(), a = o.getAreaId().areaIds[0], s = null, n = i.pType;
        1 === n && (s = 103003), 2 === n && (s = 102001), 3 === n && (s = 104001), 4 === n && (s = 104026);
        var d = {
            methods: "accessories",
            p: s,
            sku: i.skuid,
            cat: i.cat.join(","),
            lid: a,
            uuid: e,
            pin: readCookie("pin") || "",
            ck: "pin,ipLocation,atw,aview",
            lim: i.wideVersion ? 6 : 5,
            cuuid: readCookie("__jdu"),
            csid: readCookie("__jdb")
        };
        t("//c.3.cn/recommend", d, function (t) {
            if (t.method && t.data) {
                if ("accessories" == t.method)return void h.init(i).set(t.data);
                require.async(["MOD_ROOT/" + t.method + "/" + t.method, "MOD_ROOT/" + t.method + "/" + t.method + ".css"], function (e, a) {
                    e ? e(i, t.data, d) : console.error("Method: " + e + " not found. Maybe combo serve error.")
                })
            }
        })
    }

    function e() {
        var t = $("#shopRecSuit");
        t.length && t.ETab()
    }

    function a() {
        var t = $("#shopRecSuit"), i = $("#shop-reco");
        if (!i.length)return !1;
        i.ELazyload({source: "data-lazyload"});
        var e = [];
        i.find("[data-sku]").each(function () {
            e.push($(this).data("sku"))
        }), o.priceNum({
            skus: e,
            $el: i
        }), t.removeClass("hide"), $(".J-shopRec-trigger").removeClass("hide"), $(".J-shopRec-content").removeClass("hide")
    }

    function s(t) {
        e(), a(), i(t)
    }

    var n = require("MOD_ROOT/common/tools/event").Event, o = require("MOD_ROOT/common/tools/tools"), d = require("MOD_ROOT/common/core");
    require("MOD_ROOT/ETab/ETab");
    var c = '    {for item in data}    <li data-push="${pageConfig[skuHooks].push(item.wid)}" class="p-list" onclick=\'log("gz_item", "gz_detail","02","tjpj_sp_${item_index}","","main")\'>        <div class="p-img">            <a href="//item.jd.com/${item.wid}.html" target="_blank">                <img width="100" height="100" src="${pageConfig.FN_GetImageDomain(item.wid)}n4/${item.imageUrl}">            </a>        </div>        <div class="p-name">            <a href="//item.jd.com/${item.wid}.html" target="_blank">${item.wName}</a>        </div>        <div class="p-price">            <input type="checkbox" data-sku="${item.wid}" id="inp-acc-${item.wid}" onclick=\'log("gz_item", "gz_detail","02","tjpj_fxk_${item_index}","","main")\'/>            <label for="inp-acc-${item.wid}"><strong class="J-p-${item.wid}">\uffe5.00</strong></label>        </div>    </li>    {/for}';
    pageConfig.getAccSelectedSkus = function () {
        return pageConfig.accSelectedSkus.join("-") || d.sku
    };
    var h = {
        init: function (t) {
            return this.$el = $("#fittings"), this.$more = this.$el.find(".J-more"), this.$count = this.$el.find(".J-selected-cnt"), this.$btn = this.$el.find(".J-btn"), this.$cmbPrice = this.$el.find(".J_cal_jp"), this.sku = t.skuid, this.cat = t.cat, this.cfg = t, this.skuHooks = "SKUS_Fitting", this.$el.length && this.bindEvent(t), this
        }, switchTo: function (t) {
            var i = this.$tab.items.eq(t), e = this.data[t - 1];
            i.data("loaded") || 0 === t || (pageConfig[this.skuHooks] = [], i.find("ul").html(c.process(e)), this.cfg.isYuYue || this.imgScroll(i), i.data("loaded", !0))
        }, bindEvent: function (t) {
            var i = this;
            return this.$el.undelegate().delegate("input", "change", function () {
                var t = $(this).attr("data-sku");
                i.check(t, $(this))
            }), this.$el.delegate(".J-btn", "click", function () {
                i.setLog()
            }), n.addListener("onStockReady", function () {
                t.havestock && i.data.length ? i.$el.show() : i.$el.hide()
            }), this
        }, check: function (t, i) {
            var e = "//cart.jd.com/reBuyForOrderCenter.action?", a = Number(this.$el.find(".master input").eq(0).data("jp")), s = [this.cfg.skuid];
            this.$el.find(".suits input:checked").each(function () {
                var t = Number($(this).data("jp")), i = Number($(this).data("sku"));
                i && s.push(i), t && (a += t)
            }), this.$cmbPrice.html("\uffe5" + a.toFixed(2)), this.$count.html(s.length - 1), this.$btn.attr("href", e + $.param({
                    wids: s.join(","),
                    nums: 1
                })), pageConfig.accSelectedSkus = s
        }, setLog: function () {
            var t = this.$tab.items.eq(this.$tab.index), i = [];
            t && t.find("input").each(function () {
                var t = $(this).attr("checked");
                t && i.push($(this).attr("data-sku"))
            }), i.length && log("gz_item", "gz_detail", "02", "tjpj_ycgm_ljgm", this.cfg.skuid + "-" + i.join("-"), "main")
        }, set: function (t) {
            var i = this;
            if (!t || !t.list || !this.$el.length)return !1;
            pageConfig[this.skuHooks] = [this.sku], t.skuHooks = this.skuHooks, this.data = [];
            for (var e = {skuHooks: this.skuHooks, data: []}, a = 0; a < t.list.length; a++) {
                var s = t.list[a], n = s.accessoryShows;
                if (n.length && n[0].wid && 6 > a) {
                    n[0].typeName = s.typeName, n[0].typeId = s.typeId, e.data.push(n[0]), this.data.push({
                        skuHooks: this.skuHooks,
                        data: n,
                        typeId: s.typeId,
                        typeName: s.typeName
                    });
                    var o = '<li data-tab="trigger" data-name="{0}" data-id="{1}" onclick=\'log("gz_item", "gz_detail","02","tjpj_pjfl_{0}","","main")\'>{0}</li>', d = '                        <div class="switchable-wrap" data-tab="item">                            <div class="btns">                                <a href="javascript:void(0)" target="_self" class="prev-btn"></a>                                <a href="javascript:void(0)" target="_self" class="next-btn"></a>                            </div>                            <div class="lh-wrap">                                <ul class="lh clearfix"></ul>                            </div>                        </div>';
                    this.$el.find(".suits").append(d), this.$el.find(".tab-main ul").append(o.format(s.typeName, s.typeId))
                }
            }
            if (e.data.length) {
                this.$el.ETab({
                    defaultIndex: 0, onSwitch: function (t) {
                        i.switchTo(t), i.getPrice(t)
                    }
                }), this.$tab = this.$el.data("ETab");
                var h = this.$tab.items.eq(0);
                h.find("ul").html(c.process(e)), this.cfg.havestock && this.$el.show(), i.cfg.isYuYue || i.imgScroll(h), t.transform ? this.$more.hide() : this.$more.show()
            }
        }, getPrice: function (t) {
            var i = this;
            o.priceNum({
                skus: pageConfig[this.skuHooks], $el: this.$tab.items.eq(t), callback: function (t, e) {
                    var a = i.$el.find('input[data-sku="' + t + '"]');
                    a.attr("data-jp", e.p), a.attr("data-mp", e.m)
                }, onReady: function (t) {
                    i.check()
                }
            })
        }, imgScroll: function (t) {
            t.find(".lh-wrap").imgScroll({
                width: t.find(".lh li").eq(0).outerWidth(!0),
                visible: d.wideVersion ? 5 : 4,
                showControl: !0,
                step: d.wideVersion ? 5 : 4,
                loop: !1,
                prev: t.find(".prev-btn"),
                next: t.find(".next-btn")
            })
        }
    };
    module.exports.__id = "fittings", module.exports.init = s
});
/*!Name: detail.js
 * Date: 2016-12-27 16:37:34 */
define("MOD_ROOT/detail/detail", function (require, exports, module) {
    function t() {
        function t() {
            return i.attr("loaded") ? !1 : void require.async("PLG_ROOT/jQuery.qrcode", function () {
                i.find(".content").html("").jdQrcode({
                    render: "image",
                    ecLevel: "L",
                    size: 145,
                    text: a
                }), i.attr("loaded", !0)
            })
        }

        var i = $(".J-nav-qrcode");
        if (0 != i.length) {
            var a = i.attr("data-url");
            i.EDropdown({
                onOpen: function () {
                    var i = this.$el.find(".inner"), a = this.$el.find(".arrow");
                    i.addClass("border"), a.addClass("arr-open"), t()
                }, onClose: function () {
                    var t = this.$el.find(".inner"), i = this.$el.find(".arrow");
                    t.removeClass("border"), i.removeClass("arr-open")
                }
            })
        }
    }

    function i(t) {
        var i = $(".J-addcart-mini");
        i.EDropdown({
            onOpen: function () {
                $(".J-buy-num").html(p.getNum())
            }
        }), f.addListener("onStockReady", function () {
            t.havestock ? i.removeAttr("data-disable") : i.attr("data-disable", "true")
        })
    }

    function a(t) {
        var i = $("#placeholder-floatnav-stop"), a = $("#club"), o = $("#consult"), e = $("#footmark"), n = null;
        o.length && (n = o), a.length && (n = a), e.length && (n = e), i.length && (n = i), t.scroller({
            delay: 0,
            end: n,
            onStart: function () {
                this.$el.find("[data-fixed]").addClass("pro-detail-hd-fixed")
            },
            onEnd: function () {
                this.$el.find("[data-fixed]").removeClass("pro-detail-hd-fixed")
            }
        }), $(".detail").elevator({
            floorClass: "detail-elevator-floor",
            elevatorClass: "detail-elevator",
            handlerClass: "detail-elevator-handler",
            selectClass: "current"
        })
    }

    function o(t) {
        t.ELazyload({
            type: "module", onAppear: function () {
                p.wideVersion && new v({$el: $("#J-detail-nav")})
            }
        })
    }

    function e(t) {
        return /debug=disable_detail/.test(location.href) ? !1 : void $.ajax({
            url: t.desc,
            dataType: "jsonp",
            cache: !0,
            jsonpCallback: "showdesc",
            success: function (i) {
                var a = $("#J-detail-content");
                t.isEBook ? (a.html(h.process({list: i})), $("#illustration img").load(function () {
                    r($("#illustration"))
                }), r(a.find(".formwork_bt"))) : a.html(i.content.replace(/data-lazyload="done"/g, "")), a.ELazyload({source: "data-lazyload"}), o($("#detail"))
            }
        })
    }

    function n(t) {
        if (t.price) {
            var i = $(".J-addcart-mini"), a = parseFloat(t.price.p), o = ".J-p-", e = t.price.id.replace("J_", "");
            a && (a > 0 ? i.find(o + e).html("\uffe5" + t.price.p) : i.find(o + e).html("\u6682\u65e0\u62a5\u4ef7"))
        }
    }

    function s() {
        return $("#parameter-brand").length && pageConfig.product.brand ? void require.async("MOD_ROOT/detail/follow.brand", function (t) {
            t.init($("#parameter-brand .follow-brand"), pageConfig.product.brand)
        }) : !1
    }

    function d(t) {
        var i = t.parents(".formwork_bt").eq(0).offset().top;
        $("body").scrollTop() ? $("body").scrollTop(i) : $("html").scrollTop(i)
    }

    function r(t) {
        t.each(function (t) {
            var i = $(this).find(".more"), a = $(this).find(".con");
            if (0 != i.length && 0 != a.length) {
                var o;
                a.height() > 440 && (o = 440, a.css({height: o, overflow: "hidden"}), i.show().toggle(function () {
                    $(this).html('<a href="javascript:void(0)">\u6536\u8d77\u5168\u90e8\u2191</a>'), a.css({
                        height: "auto",
                        overflow: "hidden"
                    }), d($(this))
                }, function () {
                    $(this).html('<a href="javascript:void(0)">\u67e5\u770b\u5168\u90e8\u2193</a>'), a.css({
                        height: o,
                        overflow: "hidden"
                    }), d($(this))
                }))
            }
        })
    }

    function l(t) {
        function i(t) {
            $.ajax({
                url: "//c.3.cn/quality",
                data: {
                    skuId: p.sku,
                    cat: p.cat.join(","),
                    brand: pageConfig.product.brand,
                    venderId: pageConfig.product.venderId || -1
                },
                dataType: "jsonp",
                success: function (i) {
                    i && i.success && i.url && t(i.url)
                }
            })
        }

        function a() {
            var t = $(".J-ql-iframe"), a = t.attr("data-title");
            return t.length < 1 ? !1 : (i(function () {
                l.show(), t.show()
            }), void t.bind("click", function () {
                i(function (i) {
                    t.dialog({width: 300, height: 300, title: a, type: "iframe", autoIframe: !1, source: i})
                })
            }))
        }

        function o() {
            $.ajax({
                url: pageConfig.product.qualityLife, dataType: "jsonp", success: function (t) {
                    n(t)
                }
            })
        }

        function e(t) {
            var i = $("#detail").data("ETab");
            i.triggers.eq(2).show(), i.items.eq(2).html('<div style="padding: 10px 0" class="ac"><img src="' + t + '" /></div>')
        }

        function n(t) {
            var i = l.find("li");
            if (t && t.objs && t.objs.length)for (var a = 0; a < t.objs.length; a++) {
                var o = t.objs[a];
                o.images && o.images.length && (c[o.type] = o.images, i.filter(".ql-ico-" + o.type).show(), i.filter(".ql-ico-" + o.type).length && l.show(), 6 === o.type && e(o.images[0]))
            }
        }

        function s(t, i) {
            var a = c[t], o = '<p style="padding: 10px 0" class="ac">\u5356\u5bb6\u627f\u8bfa\uff1a\u4ee5\u4e0b\u4e3a\u5b9e\u7269\u62cd\u6444\uff0c\u8d2d\u4e70\u65f6\u4ec5\u4f9b\u53c2\u8003</p>                    <div style="width: 520px;height:720px;margin: 0 auto;overflow:hidden;overflow-y:auto;">';
            if (!a || !a.length)return !1;
            for (var e = 0; e < a.length; e++) {
                var n = a[e], s = /^http:|https:|\/\//.test(n) ? n : "//img20.360buyimg.com/cms/s500x2000_" + n;
                o += '<img style="display:block" width="500" src="' + s + '" />'
            }
            o += "</div>", $("body").dialog({title: i, width: 600, height: 750, type: "html", source: o})
        }

        function d() {
            l.delegate("li", "click", function () {
                var t = $(this).data("type"), i = $(this).data("text");
                1 !== t && s(t, i)
            })
        }

        function r() {
            var t = l.find(".ql-ico-yuan");
            t.length && l.show()
        }

        var l = $("#quality-life"), c = {10: ["//img30.360buyimg.com/popshop/jfs/t2629/66/1341832506/243792/5e7d3e33/573c1169Nf355ce80.jpg", "//img30.360buyimg.com/popshop/jfs/t2875/2/1360087619/1270729/ff0fec44/573c1155N841cd68e.jpg", "//img30.360buyimg.com/popshop/jfs/t2617/247/1362535868/81405/51362531/573c0ffaNda15a3a1.jpg"]};
        p.isJd && (c[10] = ["//img30.360buyimg.com/poprx/s800x562_jfs/t2782/356/3137767914/5139488/a206435a/578317b1Na33c0ca9.jpg", "//img30.360buyimg.com/poprx/s800x562_jfs/t2797/286/3196750150/3418108/b81920dc/578317ccN045f8ee6.jpg", "//img30.360buyimg.com/poprx/s800x1100_jfs/t2977/314/1467566065/1044633/a5a43571/578317e2N2cc82a8e.jpg"]), a(), d(), r(), pageConfig.product.qualityLife && (o(), pageConfig.product.shangjiazizhi && (l.show(), l.find(".ql-ico-10").show()))
    }

    function c(o) {
        function d(t) {
            var i = $("#consult,#comment,#guarantee,#club,#try-report,#askAnswer");
            i.show(), t.is('[data-anchor="#comment"]') ? $("#guarantee").hide() : t.is('[data-anchor="#club"]') ? ($("#consult,#comment,#guarantee,#try-report").hide(), $("#consult,#comment,#guarantee").hide()) : t.is('[data-anchor="#shop-similar-promotion"]') ? $("#consult,#comment,#guarantee,#askAnswer").hide() : i.show()
        }

        function r(t) {
            function i() {
                setTimeout(function () {
                    $("html,body").scrollTop(o.offset().top)
                }, 10)
            }

            var a = t.attr("data-anchor"), o = $(a), e = $("#detail .tab-main").hasClass("pro-detail-hd-fixed");
            return o.length ? void(e && i()) : !1
        }

        f.addListener("onPriceReady", n);
        var c = $("#detail");
        c.ETab({
            onBeforeSwitch: function (t) {
                d(this.triggers.eq(t))
            }, onSwitch: function (t) {
                if (r(this.triggers.eq(t)), this.triggers.eq(t).is('[data-anchor="#comment"]')) {
                    var i = $("#comment").data("ELazyload");
                    $.each(i, function (t, i) {
                        i.check(i.$targets)
                    })
                }
                if (this.triggers.eq(t).is('[data-anchor="#shop-similar-promotion"]')) {
                    var i = $("#shop-similar-promotion").data("ELazyload");
                    $.each(i, function (t, i) {
                        i.check(i.$targets)
                    })
                }
                if (this.triggers.eq(t).is('[data-anchor="#club"]')) {
                    var i = $("#club").data("ELazyload");
                    $.each(i, function (t, i) {
                        i.check(i.$targets)
                    })
                }
            }
        }), $(".J-more-param").bind("click", function () {
            c.data("ETab").go(1)
        }), c.ELazyload({source: "data-lazyload"}), i(o), t(o), e(o), a(c), s(), l(o)
    }

    var f = require("MOD_ROOT/common/tools/event").Event, v = require("MOD_ROOT/detail/nav"), p = require("MOD_ROOT/common/core");
    require("MOD_ROOT/common/tools/tools");
    require("MOD_ROOT/ETab/ETab"), require("MOD_ROOT/EDropdown/EDropdown"), require("MOD_ROOT/ELazyload/ELazyload"), require("PLG_ROOT/jQuery.scroller"), require("JDF_UI/elevator/1.0.0/elevator");
    var h = '    {if list.editorPick}    <div class="formwork_bt" id="editorPick" name="detail-tag-id-0" text="\u7f16\u8f91\u63a8\u8350">        <div class="formwork_bt_it" ><span>\u7f16\u8f91\u63a8\u8350</span></div>        <div class="con">${list.editorPick}</div>        <div class="more"><a href="javascript:void(0)">\u67e5\u770b\u5168\u90e8\u2193</a></div>    </div>    {/if}    {if list.contentInfo}    <div class="formwork_bt" id="contentInfo" name="detail-tag-id-1" text="\u5185\u5bb9\u7b80\u4ecb">        <div class="formwork_bt_it"><span>\u5185\u5bb9\u7b80\u4ecb</span></div>        <div class="con">${list.contentInfo}</div>        <div class="more"><a href="javascript:void(0)">\u67e5\u770b\u5168\u90e8\u2193</a></div>    </div>    {/if}    {if list.authorInfo}    <div class="formwork_bt" id="authorInfo" name="detail-tag-id-2" text="\u4f5c\u8005\u7b80\u4ecb">        <div class="formwork_bt_it"><span>\u4f5c\u8005\u7b80\u4ecb</span></div>        <div class="con">${list.authorInfo}</div>        <div class="more"><a href="javascript:void(0)">\u67e5\u770b\u5168\u90e8\u2193</a></div>    </div>    {/if}    {if list.catalog}    <div class="formwork_bt" id="catalog" name="detail-tag-id-3" text="\u76ee\u5f55">        <div class="formwork_bt_it"><span>\u76ee\u5f55</span></div>        <div class="con">${list.catalog}</div>        <div class="more"><a href="javascript:void(0)">\u67e5\u770b\u5168\u90e8\u2193</a></div>    </div>    {/if}    {if list.mediaComments}    <div class="formwork_bt" id="mediaComments" name="detail-tag-id-4" text="\u5a92\u4f53\u8bc4\u8bba">        <div class="formwork_bt_it"><span>\u5a92\u4f53\u8bc4\u8bba</span></div>        <div class="con">${list.mediaComments}</div>        <div class="more"><a href="javascript:void(0)">\u67e5\u770b\u5168\u90e8\u2193</a></div>    </div>    {/if}    {if list.preface}    <div class="formwork_bt" id="preface" name="detail-tag-id-5" text="\u524d\u8a00">        <div class="formwork_bt_it"><span>\u524d\u8a00</span></div>        <div class="con">${list.preface}</div>        <div class="more"><a href="javascript:void(0)">\u67e5\u770b\u5168\u90e8\u2193</a></div>    </div>    {/if}    {if list.digest}    <div class="formwork_bt" id="digest" name="detail-tag-id-6" text="\u7cbe\u5f69\u4e66\u6458">        <div class="formwork_bt_it"><span>\u7cbe\u5f69\u4e66\u6458</span></div>        <div class="con">${list.digest}</div>        <div class="more"><a href="javascript:void(0)">\u67e5\u770b\u5168\u90e8\u2193</a></div>    </div>    {/if}    {if list.illustration}    <div class="formwork_bt" id="illustration" name="detail-tag-id-7" text="\u7cbe\u5f69\u63d2\u56fe">        <div class="formwork_bt_it"><span>\u7cbe\u5f69\u63d2\u56fe</span></div>        <div class="con">${list.illustration}</div>        <div class="more"><a href="javascript:void(0)">\u67e5\u770b\u5168\u90e8\u2193</a></div>    </div>    {/if}';
    module.exports.__id = "detail", module.exports.init = c
});
/*!Name: contact.js
 * Date: 2016-12-27 16:37:34 */
define("MOD_ROOT/contact/contact", function (require, exports, module) {
    function o() {
        var o = $(".J-pop-score");
        o.length && o.EDropdown({
            onOpen: function () {
                var o = this.$el.find(".inner");
                o.addClass("border")
            }, onClose: function () {
                var o = this.$el.find(".inner");
                o.removeClass("border")
            }
        })
    }

    function e(o, e) {
        var i = '        <div class="jimi">            <a href="//jimi.jd.com/index.action?productId={0}&source={1}" target="_blank">                <i class="sprite-jimi"></i>JIMI            </a>        </div>', n = {
            skuId: e.skuid,
            c1: e.cat[0],
            c2: e.cat[1],
            c3: e.cat[2],
            venderId: e.venderId
        };
        $.ajax({
            url: "//entry-jimi.jd.com/iadshop/checkJimiStatus?" + $.param(n),
            dataType: "jsonp",
            scriptCharset: "utf-8",
            cache: !0,
            success: function (n) {
                /debug=im/.test(location.href) && alert(n.code), n && 1 === n.code && o.html(i.format(e.skuid, e.isJd ? "productself" : "productpop"))
            }
        })
    }

    function i(o) {
        new d({
            $wrap: $(".contact"), vids: [o.shopId], onFollow: function () {
                var e = readCookie("pin") || "", i = readCookie("__jda") ? readCookie("__jda").split(".")[1] : "";
                G.sendRequest("//mercury.jd.com/log.gif?t=shop.100001&v=src=shop$shopid=" + o.shopId + "$action=0&pin=" + e + "&uid=" + i + "&ver=1&rid=" + Math.random() + "&m=UA-J2011-1&ref=" + document.referrer)
            }, onunFollow: function () {
                var e = readCookie("pin") || "", i = readCookie("__jda") ? readCookie("__jda").split(".")[1] : "";
                G.sendRequest("//mercury.jd.com/log.gif?t=shop.100001&v=src=shop$shopid=" + o.shopId + "$action=1&pin=" + e + "&uid=" + i + "&ver=1&rid=" + Math.random() + "&m=UA-J2011-1&ref=" + document.referrer)
            }
        })
    }

    function n(o) {
        function e() {
            var e = $("#J-links-microshop");
            $.ajax({
                url: "//wq.jd.com/weidian/weixin/GetQRCode?venderid=" + o.venderId,
                dataType: "jsonp",
                cache: !0,
                jsonpCallback: "getQRCode",
                success: function (i) {
                    i && 0 == i.errcode && "" != i.data.qrurl ? e.html('<img width="100" height="100" src="' + i.data.qrurl + '" alt="' + o.shopName + '"/>') : e.html('<div class="tip">\u8be5\u5e97\u94fa\u8fd8\u672a\u5f00\u901a\u5fae\u5e97</div>')
                }
            })
        }

        var i = $(".J-weichat-sp");
        i.length && i.find(".EDropdown").EDropdown({
            onOpen: function () {
                var o = this.$el.find(".inner");
                o.addClass("border"), e()
            }, onClose: function () {
                var o = this.$el.find(".inner");
                o.removeClass("border")
            }
        })
    }

    function r(r) {
        o(), pageConfig.IMContact = new t({
            cfg: r,
            $el: $(".J-im-btn"),
            trigger: ".im",
            template: '<div class="im"><i class="sprite-im"></i>{text}</div>'
        }), e($(".J-jimi-btn"), r), i(r), n(r)
    }

    var t = require("MOD_ROOT/contact/im"), d = require("MOD_ROOT/contact/followshop");
    require("MOD_ROOT/EDropdown/EDropdown"), module.exports.__id = "contact", module.exports.init = r
});
/*!Name: popbox.js
 * Date: 2016-12-27 16:37:35 */
define("MOD_ROOT/popbox/popbox", function (require, exports, module) {
    function o(o) {
        new i({
            $wrap: $("#popbox"), vids: [o.shopId], onFollow: function () {
                var e = readCookie("pin") || "", i = readCookie("__jda") ? readCookie("__jda").split(".")[1] : "";
                d.sendRequest("//mercury.jd.com/log.gif?t=shop.100001&v=src=shop$shopid=" + o.shopId + "$action=0&pin=" + e + "&uid=" + i + "&ver=1&rid=" + Math.random() + "&m=UA-J2011-1&ref=" + document.referrer)
            }, onunFollow: function () {
                var e = readCookie("pin") || "", i = readCookie("__jda") ? readCookie("__jda").split(".")[1] : "";
                d.sendRequest("//mercury.jd.com/log.gif?t=shop.100001&v=src=shop$shopid=" + o.shopId + "$action=1&pin=" + e + "&uid=" + i + "&ver=1&rid=" + Math.random() + "&m=UA-J2011-1&ref=" + document.referrer)
            }
        });
        o.IMContact = new r({
            cfg: o,
            $el: $(".J-popbox-im"),
            trigger: ".im",
            template: '<div class="im"><i class="sprite-im"></i></div>'
        }), e($("#popbox"))
    }

    function e(o) {
        o.scroller({
            delay: 0, end: $("#footmark"), onStart: function () {
                this.$el.find("[data-fixed]").addClass("pro-detail-hd-fixed")
            }, onEnd: function () {
                this.$el.find("[data-fixed]").removeClass("pro-detail-hd-fixed")
            }
        })
    }

    var i = require("MOD_ROOT/contact/followshop"), d = require("MOD_ROOT/common/core"), r = require("MOD_ROOT/contact/im");
    require("PLG_ROOT/jQuery.scroller"), module.exports.__id = "popbox", module.exports.init = o
});
/*!Name: preview.js
 * Date: 2016-12-27 16:37:35 */
define("MOD_ROOT/preview/preview", function (require, exports, module) {
    function e(e) {
        function t(t) {
            var o = t.find("img"), l = o.attr("src"), d = o.attr("data-url"), h = o.attr("data-iframe"), m = a.index(t);
            if (c != m) {
                if (c = m, h) {
                    var p, f;
                    e.twoColumn ? p = f = s.wideVersion ? 450 : 300 : e.ctCloth ? s.wideVersion ? (p = 350, f = 449) : (p = 300, f = 384) : p = f = s.wideVersion ? 350 : 300;
                    var w = h + "&width=" + p + "&height=" + f;
                    $("#spec-n1").removeClass("jqzoom").html('<iframe src="' + w + '" scrolling="no" frameborder="0" width="' + p + '" height="' + f + '" allowfullscreen="true"></iframe>')
                } else {
                    $("#spec-n1").addClass("jqzoom").html(n), 0 == m ? $(".p-watermark").show() : $(".p-watermark").hide(), l = l.replace(/54x54/g, "450x450"), l = l.replace(/50x64/g, "350x449"), l = l.replace(/\/n5/g, "/n1");
                    var u = "";
                    u = e.ctCloth ? l.replace(/350x449/g, "800x1026") : i + r + d, $("#spec-n1 img").eq(0).attr({
                        src: l,
                        jqimg: u
                    }).show()
                }
                a.removeClass("img-hover"), t.addClass("img-hover")
            }
        }

        var i = pageConfig.FN_GetImageDomain(e.skuid), o = /isOverseaPurchase-2/.test(e.specialAttrs), r = o ? "/popWaterMark/" : "/n0/", a = $("#spec-list li"), n = $("#spec-n1").html(), c = -1;
        e.ctCloth && $("body").addClass("ctCloth"), a.mouseenter(function () {
            t($(this))
        }), t(a.eq(0));
        var l = $(".jqzoom");
        if (l.find("img").attr("src")) {
            var d = 540, h = 540;
            l.jqueryzoom({xzoom: d, yzoom: h, offset: 10, position: "left", lens: 1})
        }
        var m = s.wideVersion ? 5 : 3;
        $(".spec-items").imgScroll({
            width: $(".spec-items li").eq(0).outerWidth(!0),
            visible: m,
            showControl: !0,
            step: m,
            loop: !1,
            prev: "#spec-forward",
            next: "#spec-backward"
        });
        var p = $("#spec-n1");
        "1" === p.attr("data-big") && p.bind("click", function (t) {
            var i = $(t.target);
            !i.is("#three-d-show") && i.parents("#three-d-show").length < 1 && window.open("//item.jd.com/bigimage.aspx?id=" + e.skuid)
        })
    }

    function t(e) {
        var t = $(".J-follow");
        a.init(t), a.check && a.check([e.skuid], function (e, i) {
            i && t.addClass("followed").find("em").text("\u5df2\u5173\u6ce8")
        })
    }

    function i(e) {
        function t(t) {
            var i = $("#preview .spec-items li img"), o = [], r = $(".J-share");
            i.each(function () {
                var e = $(this).attr("src");
                o.push(e)
            });
            var a = "\u6211\u5728@\u4eac\u4e1c \u53d1\u73b0\u4e86\u4e00\u4e2a\u975e\u5e38\u4e0d\u9519\u7684\u5546\u54c1\uff1a " + e.name + "\u3000\u4eac\u4e1c\u4ef7\uff1a\uffe5 {PRICE}\u3002 \u611f\u89c9\u4e0d\u9519\uff0c\u5206\u4eab\u4e00\u4e0b";
            new t({
                sid: 3,
                rid: 986951,
                $el: r,
                title: a,
                content: a,
                url: location.href,
                imgs: o,
                onbeforeOpen: function (t) {
                    t.jp = e.jp
                }
            }).popUp()
        }

        var i = $(".J-share");
        i.bind("click", function () {
            require.async("MOD_ROOT/preview/combineShare", t)
        })
    }

    function o(e) {
        function t() {
            $("body").dialog({width: 940, height: 500, title: "3D \u5c55\u793a", type: "iframe", source: r})
        }

        var i = $("#three-d-show"), o = $("#spec-n1");
        if (!$("#three-d-show").length)return !1;
        var r = i.attr("data-href");
        o.delegate("#three-d-show", "click", t)
    }

    function r(r) {
        o(r), e(r), t(r), i(r), n.init(null, null, "gbk")
    }

    var a = require("JDF_UNIT/follow/1.0.0/follow"), n = require("MOD_ROOT/preview/contrast"), s = require("MOD_ROOT/common/core");
    require("JDF_UI/dialog/1.0.0/dialog"), require("MOD_ROOT/common/tools/abtest"), require("MOD_ROOT/common/tools/tools");
    require("MOD_ROOT/preview/contrast.css"), require("PLG_ROOT/jQuery.imgScroll"), require("PLG_ROOT/jQuery.zoom"), module.exports.__id = "preview", module.exports.init = r
});
/*!Name: info.js
 * Date: 2016-12-27 16:37:34 */
define("MOD_ROOT/info/info", function (require, exports, module) {
    function t(t, e) {
        this.$el = t, this.len = e, this.items = [], this.items.length = e
    }

    function e(t) {
        function e(t) {
            if (!t || !t.stock)return !1;
            var e = t.stock.stock, o = e.cla;
            if (o && o.length) {
                for (var r = "", s = 0; s < o.length; s++) {
                    var a = o[s];
                    r += n.format(a.id, a.url, a.name)
                }
                i.show().find(".tips-list").html(r)
            } else i.hide().find(".tips-list").html("")
        }

        var i = $("#local-tips"), n = '<li>\xb7<a data-aid="{0}" href="{1}" target="_blank" clstag="shangpin|keycount|product|bendihuodong-{2}">{2} &gt;&gt;</a></li>';
        e(), r.addListener("onStockReady", e)
    }

    function i(t) {
        function e() {
            if (l)for (var t = 0; t < a.length; t++)s.set(a[t].order, a[t].tip)
        }

        function i(e) {
            var i = t.isHeYue;
            i && !e.noBuyType ? s.set(7, '<a target="_blank" href="//sale.jd.com/act/IgFRVepkJKr.html">\u8bf7\u9605\u8bfb\u5408\u7ea6\u673a\u8d2d\u4e70\u8bf4\u660e &gt;&gt;</a>') : s.del(7)
        }

        function n(t) {
            var e = "//authpay.jd.com/auth/toAuthPage.action?source=62&directReturnUrl=" + location.href, i = '\u8be5\u5546\u54c1\u9700\u8981\u5b9e\u540d\u8ba4\u8bc1\u624d\u53ef\u62a2\u8d2d\uff0c<a target="_blank" href="{0}">\u53bb\u5b9e\u540d &gt;&gt;</a>'.format(e);
            t.r && "1" === t.r.shiming ? s.set(9, i) : s.del(9)
        }

        function o(t) {
            var i = t.area.id[0];
            52993 == i ? s.set(3, "\u4e0d\u652f\u63017\u5929\u65e0\u7406\u7531\u9000\u8d27") : e()
        }

        var a = t.tips, l = a && a.length;
        e(), r.addListener("onHeYueReady", i), r.addListener("onKOReady", n), r.addListener("onStockReady", o)
    }

    function n() {
        var t = $(".J-mobile-only"), e = t.find(".qrcode");
        if (t.length) {
            var i = e.attr("data-url"), n = i || "//m.jd.com/product/" + pageConfig.product.skuid + ".html?from=qrcode";
            require.async("PLG_ROOT/jQuery.qrcode", function () {
                e.jdQrcode({render: "image", ecLevel: "L", size: 80, text: n})
            })
        }
    }

    function o(t) {
        i(t), e(t), n(t)
    }

    var r = require("MOD_ROOT/common/tools/event").Event;
    require("MOD_ROOT/common/tools/tools");
    t.prototype = {
        set: function (t, e) {
            if (t > this.len)throw new Error("index error.");
            return e && (this.items[t] = e, this.show()), this
        }, del: function (t) {
            this.items[t] = null, this.show(t)
        }, show: function () {
            var t = this.items.length, e = 0, i = [], n = this.$el.find("ol");
            for (e; t > e; e++)this.items[e] && i.push("<li>\xb7" + this.items[e] + "</li>");
            i.length > 0 ? (n.html(i.join("")), this.$el.show()) : this.$el.hide()
        }
    };
    var s = pageConfig.__tips = new t($("#summary-tips"), 10);
    module.exports.__id = "info", module.exports.init = o, module.exports.Tip = s
});
/*!Name: imcenter.js
 * Date: 2016-12-27 16:37:35 */
define("MOD_ROOT/imcenter/imcenter", function (require, exports, module) {
    function e(e) {
        function i(t) {
            o = !0, o && c && r(e)
        }

        function n(t) {
            c = !0, o && c && r(e)
        }

        function r(e) {
            if (!e.shopCserviceJson || !e.shopCserviceJson.length)return !1;
            new s({
                $el: $("#imcenter"),
                shopCserviceJson: e.shopCserviceJson,
                skuid: e.skuid,
                commentNum: e.commentMeta.CommentCount,
                jprice: e.jp,
                venderId: e.venderId,
                src: e.src,
                name: e.name
            })
        }

        t.addListener("onCommentMeta", n), t.addListener("onPriceReady", i);
        var o = !1, c = !1
    }

    var t = require("MOD_ROOT/common/tools/event").Event, i = '    {for item in body}        <li><a class="link-trigger" href="#none" data-id="${item.id}" data-url="${item.url}" title="${item.name}"><i class="jd-dd ${item.statusClass}"></i><em>${item.name}</em></a></li>    {/for}', s = function (e) {
        this.shopCserviceJson = e.shopCserviceJson || [], this.groupIdArr = [], this.$el = e.$el || $("<div></div>"), this.trigger = e.trigger || ".link-trigger", this.$customerServiceList = this.$el.find(".customer-service-list"), this.skuid = e.skuid, this.commentNum = e.commentNum, this.jprice = e.jprice, this.venderId = e.venderId, this.src = e.src, this.name = e.name, this.init()
    };
    s.prototype = {
        init: function () {
            this.bindEvent(), this.get()
        }, bindEvent: function () {
            var e = this;
            this.$el.delegate(this.trigger, "click", function () {
                var t = $(this).attr("data-url");
                e.open(t)
            })
        }, get: function () {
            for (var e = this, t = 0; t < e.shopCserviceJson.length; t++)e.shopCserviceJson[t].groupId && e.groupIdArr.push(e.shopCserviceJson[t].groupId);
            var i = e.groupIdArr.join(",");
            $.ajax({
                url: "//chat.jd.com/venderApi/queryGroupByIdList.action",
                data: {groupIdList: i, responseCharset: "gbk"},
                scriptCharset: "gbk",
                dataType: "jsonp",
                success: function (t) {
                    t && t.code && (1 == t.code || 2 == t.code || 3 == t.code || 9 == t.code) && e.set(t)
                }
            })
        }, set: function (e) {
            var t = "";
            if (e.body && e.body.length > 0)try {
                this.setStatusClass(e);
                var t = i.process(e);
                this.$customerServiceList.html(t)
            } catch (s) {
                var n = t.match(/\[ERROR.+\]/);
                n && n.length && console.error("Template Render Error @ [imCenter.js]. >>>>> \n   %s", n[0])
            }
        }, setStatusClass: function (e) {
            for (var t in e.body)e.body[t].hasOnlineWaiter ? e.body[t].statusClass = "" : e.body[t].statusClass = "jd-dd-offline"
        }, open: function (e) {
            var t = {
                pid: this.skuid,
                advertiseWord: encodeURIComponent($("#p-ad").text()),
                commentNum: this.commentNum,
                evaluationRate: "x",
                imgUrl: this.src,
                wname: encodeURIComponent(this.name),
                jprice: this.jprice,
                stock: encodeURIComponent($("#store-selector .text").text() + "(" + $("#store-prompt strong").text()) + ")"
            };
            this.venderId && (t.venderId = this.venderId);
            var i = -1 != e.indexOf("?") ? "&" : "?";
            open(e + i + $.param(t), this.skuid, "status=no,toolbar=no,menubar=no,location=no,titlebar=no,resizable=yes,width=1018px,height=590")
        }
    }, module.exports.__id = "imcenter", module.exports.init = e
});
/*!Name: jdservice.js
 * Date: 2016-12-27 16:37:34 */
define("MOD_ROOT/jdservice/jdservice", function (require, exports, module) {
    function e(e) {
        var a = $("#choose-service");
        if (a.length < 1)return !1;
        var n = e.addToCartBtn;
        c.init({
            sku: e.skuid, cat: e.cat, brand: e.brand, onSelected: function (a, c, l) {
                var d = i.$el.attr("href");
                t.fire({
                    type: "onYBSelected",
                    skus: a
                }), pageConfig.product.havestock && (a.length > 0 ? (n.enabled(s.getHrefWithYB(d, a)), pageConfig.hasYbService = !0, e.baiTiaoFenQi && e.baiTiaoFenQi.disabled()) : (n.enabled(s.getHrefWithYB(d, a)), pageConfig.hasYbService = !1, e.baiTiaoFenQi && e.baiTiaoFenQi.enabled()))
            }
        }, e)
    }

    var t = require("MOD_ROOT/common/tools/event").Event, i = require("MOD_ROOT/buybtn/buybtn").addToCartBtn, s = require("MOD_ROOT/common/core"), a = require("MOD_ROOT/common/tools/tools"), n = (require("JDF_UNIT/trimPath/1.0.0/trimPath"), '    <div class="dt" data-yb="new_yb_server">\u589e\u503c\u4fdd\u969c</div>    <div class="dd">        <div class="service-type-yb clearfix">            {for item in data}                <div class="yb-item-cat">                    <div class="yb-item">                        <img class="icon" src="${pageConfig.FN_GetImageDomain(item.details[0].bindSkuId)}${item.imgUrl}"/>                        <span class="name">${item.details[0].bindSkuName}</span>                        <span class="price">\uffe5${item.details[0].price}</span>                        <i class="arrow-icon"></i>                    </div>                    <div class="more-item">                        <ul>                            {for list in item.details}                            <li data-sku="${list.bindSkuId}">                                <div class="title" title="${list.tip}">                                     <span class="choose-btn" clstag="shangpin|keycount|product|jingdongfuwu_${list.bindSkuId}">                                        <i class="sprite-checkbox"></i>{if list.isFavor}<span class="tips">\u4f18\u60e0</span>{/if}<span class="name">${list.bindSkuName}</span><span class="price">\uffe5${list.price}</span>                                    </span>                                    <a href="//item.jd.com/${list.bindSkuId}.html" target="_blank" class="detail-more" clstag="shangpin|keycount|product|jingdongfuwu_xiangqing">\u8be6\u60c5<s class="s-arrow">&gt;&gt;</s></a>                                </div>                            </li>                            {/for}                        </ul>                    </div>                </div>            {/for}            <div class="service-tips">                <a href="#none"><i class="sprite-question"></i></a>                <div class="tips">                    <div class="sprite-arrow"></div>                    <div class="content">                    <dl>                        <dd>\u589e\u503c\u4fdd\u969c\u662f\u6307\u51e1\u5728\u4eac\u4e1c\u8d2d\u4e70\u5546\u54c1\u6216\u670d\u52a1\u7684\u6d88\u8d39\u8005\uff0c\u5728\u4fdd\u969c\u671f\u95f4\u5185\u9047\u5230\u65e0\u8bba\u662f\u6b63\u5e38\u4f7f\u7528\u4e2d\u7684\u95ee\u9898\u8fd8\u662f\u610f\u5916\u4e8b\u6545\uff0c\u5373\u53ef\u4eab\u53d7\u589e\u503c\u4fdd\u969c\u670d\u52a1\u3002\u4fdd\u969c\u5185\u5bb9\u5305\u62ec\uff1a\u5ef6\u957f\u4fdd\u4fee\u3001\u53ea\u6362\u4e0d\u4fee\u3001\u610f\u5916\u4fdd\u62a4\u3001\u670d\u52a1\u4fdd\u969c\u3002\u8986\u76d6\u5bb6\u7535\u3001\u624b\u673a\u6570\u7801\u3001\u7535\u8111\u529e\u516c\u3001\u6c7d\u8f66\u7528\u54c1\u3001\u670d\u9970\u5bb6\u5c45\u7b49\u5546\u54c1\u3002</dd>                    </dl>                    <p>\u5982\u6709\u7591\u95ee\uff0c\u8bf7\u4e0e<a href="//chat.jd.com/pop/chat?shopId=162403" target="_blank">\u5728\u7ebf\u5ba2\u670d</a>\u8054\u7cfb</p>                </div>            </div>        </div>    </div>'), c = {
        init: function (e, t) {
            this.sku = e.sku, this.cat = e.cat, this.brand = e.brand, this.$el = e.$el || $("#choose-service"), this.cfg = t, this.onSelected = e.onSelected || function () {
                }, this.callback = e.callback || function () {
                }, this.url = "", this.currSku = null, this.bindEvent(), this.get()
        }, bindEvent: function () {
            var e = this;
            this.$el.undelegate("click").delegate(".yb-item", "click", function () {
                var t = $(this), i = t.parents(".yb-item-cat");
                i.hasClass("selected") ? (i.find("li.selected .choose-btn").trigger("click"), e.updateFrist(i.find(".more-item li:eq(0)"), i.find(".yb-item"))) : i.find(".more-item li:eq(0) .choose-btn").trigger("click")
            }), this.$el.delegate(".choose-btn", "click", function () {
                var t = $(this), i = t.parents("li"), s = i.attr("data-sku"), a = t.parents(".yb-item-cat");
                return i.hasClass("selected") ? (i.removeClass("selected"), a.removeClass("selected hover"), a.find(".yb-item").removeAttr("data-sku")) : (a.find("li").removeClass("selected"), i.addClass("selected"), a.addClass("selected").removeClass("hover"), e.updateFrist(i, a.find(".yb-item"))), e.currSku = s, e.currEl = t, e.calResult(), !1
            }), this.$el.delegate(".yb-item-cat", "mouseenter", function () {
                $(this).addClass("hover")
            }), this.$el.delegate(".yb-item-cat", "mouseleave", function () {
                $(this).removeClass("hover")
            });
            var i = 0;
            this.$el.delegate(".service-tips", "mouseenter", function () {
                clearTimeout(i), $(this).addClass("hover")
            }), this.$el.delegate(".service-tips", "mouseleave", function () {
                var e = $(this);
                i = setTimeout(function () {
                    e.removeClass("hover")
                }, 300)
            }), t.addListener("onStockReady", function () {
                e.cfg.havestock ? e.show() : (e.hide(), e.clear())
            }), t.addListener("onHeYueReady", function () {
                var t = e.cfg.isHeYue;
                t ? e.hide() : e.cfg.havestock ? e.show() : (e.hide(), e.clear())
            })
        }, updateFrist: function (e, t) {
            var i = e.find(".name").html();
            t.find(".name").html(i), t.find(".name").attr("title", i), t.find(".price").html(e.find(".price").html()), t.attr("data-sku", e.attr("data-sku"))
        }, get: function () {
            var e = this, t = e.sku, i = e.cat[0] + "," + e.cat[1] + "," + e.cat[2], s = e.brand, n = a.getAreaId().areaIds.join("_"), c = "//cd.jd.com/yanbao/v3?skuId=" + t + "&cat=" + i + "&area=" + n + "&brandId=" + s;
            $.ajax({
                url: c,
                dataType: "jsonp",
                scriptCharset: "gbk",
                cache: !0,
                jsonpCallback: "yanbao_jsonp_callback",
                success: function (t) {
                    t && e.set(t)
                }
            })
        }, set: function (e) {
            var t = "", i = e[this.sku];
            if (i && i.length > 0) {
                i.length > 3 && (i.length = 3);
                for (var s in i) {
                    var a = i[s];
                    a.details && a.details.length > 6 && (a.details.length = 6)
                }
                try {
                    var c = {data: i};
                    t = n.process(c), this.$el.html(t), pageConfig.product.isHeYue || this.show()
                } catch (l) {
                    var d = t.match(/\[ERROR.+\]/);
                    d && d.length && console.error("Template Render Error @ [jdService.js]. >>>>> \n   %s", d[0])
                }
            } else this.$el.html("");
            this.callback.call(this)
        }, show: function () {
            this.cfg.havestock && this.$el.show()
        }, hide: function () {
            this.$el.hide()
        }, clear: function () {
            this.$el.find(".yb-item").removeAttr("data-sku"), this.$el.find(".yb-item-cat").removeClass("selected"), this.$el.find(".yb-item-cat .more-item li").removeClass("selected")
        }, calResult: function () {
            var e = this.$el.find(".selected"), t = [];
            return e.each(function () {
                var e = $(this).find(".yb-item"), i = e.attr("data-sku");
                i && t.push(i)
            }), "function" == typeof this.onSelected ? this.onSelected.apply(this, [t, this.currSku, this.currEl]) : void 0
        }
    };
    module.exports.__id = "jdservice", module.exports.init = e
});
/*!Name: commitments.js
 * Date: 2016-12-27 16:37:33 */
define("MOD_ROOT/commitments/commitments", function (require, exports, module) {
    function t(t) {
        new n(t.skuid)
    }

    var s = require("MOD_ROOT/common/core"), e = '        <i class="sprite-arrow"></i>        <div class="sprite-heartPic"></div>        <p>\u5546\u5bb6\u627f\u8bfa\u201c\u7231\u5fc3\u4e1c\u4e1c\u201d\u6bcf\u6210\u4ea4\u4e00\u7b14\uff0c\u5c06\u8be5\u5546\u54c1\u5b9e\u4ed8\u91d1\u989d\u7684<strong>${donateRate}%</strong>\u6350\u8d60\u7ed9\u516c\u76ca\u9879\u76ee<strong>${name}</strong>\u3002</p>        <a href="${webUrl}" target="_blank">\u8be6\u7ec6 &gt;&gt;</a>', n = function (t) {
        this.init(t)
    };
    n.prototype = {
        $el: $("#commitments"), init: function (t) {
            this.sku = t, s.onAttr("isCare") && (this.addEvents(), this.loadCare())
        }, addEvents: function () {
            var t = this, s = t.$el.find(".heart");
            s.hover(function () {
                $(this).addClass("heart-hover")
            }, function () {
                $(this).removeClass("heart-hover")
            })
        }, loadCare: function () {
            var t = this;
            $.ajax({
                url: "http://c.3.cn/loveProject/" + t.sku,
                dataType: "jsonp",
                scriptCharset: "gbk",
                success: function (s) {
                    s.name && s.webUrl && require.async(["MOD_ROOT/commitments/commitments.css"], function () {
                        t.$el.find(".heart .commitments-tips").html(e.process(s)), t.$el.show()
                    })
                }
            })
        }
    }, module.exports.__id = "commitments", module.exports.init = t
});
/*!Name: gift.js
 * Date: 2016-12-27 16:37:34 */
define("MOD_ROOT/gift/gift", function (require, exports, module) {
    var t = require("MOD_ROOT/buybtn/buybtn").addToCartBtn, e = require("MOD_ROOT/common/tools/event").Event, i = require("MOD_ROOT/common/core");
    require("MOD_ROOT/gift/gift.css");
    var o = {
        skus: [], init: function (t) {
            return this.$el = $("#choose-gift"), this.$gift = this.$el.find(".J-gift"), this.$count = this.$gift.find("em"), this.$selected = this.$el.find(".J-gift-selected"), this.$el.length && t && t.giftPool && t.giftPool.length ? (pageConfig.haveGift = !0, this.hasSelected = !1, this.data = t, this.bindEvent(), this.$count.html(t.giftPool.length), void this.$el.show()) : (this.$el.hide(), !1)
        }, bindEvent: function () {
            var e = this, i = $(document);
            this.$el.undelegate("click"), this.$el.delegate(".J-gift,.J-popup,.J-gift-choosed", "click.popup", function () {
                e.showGiftSelect()
            }), i.undelegate("click.gift_pool_item"), i.delegate(".J-choose-gift-layer .J-select", "click.gift_pool_item", function () {
                e.select($(this))
            }), i.delegate(".J-choose-gift-layer .J-select", "mouseover", function () {
                e.hover($(this))
            }), i.delegate(".J-gift-pool", "mouseleave", function () {
                e.leave($(this))
            }), i.delegate(".J-gift-pool-ok", "click", function () {
                e.collectSelectedSkus()
            });
            var o = pageConfig.product, n = t.$el.add(o.oneKeyBuyBtn.$el).add($("#btn-baitiao"));
            n.unbind("click.validate_gift"), n.bind("click.validate_gift", function () {
                return pageConfig.giftSelected ? void 0 : (e.$el.addClass("item-hl-bg"), !1)
            })
        }, showGiftSelect: function () {
            var t = this;
            pageConfig.getGiftPoolDataStr = function (t) {
                return t.sid + "|" + t.num + "|" + encodeURIComponent(t.mp) + "|" + encodeURIComponent(t.nm)
            }, pageConfig.getGiftPoolStatus = function (e, i) {
                var o = "-" + e.sid + "-", n = "-" + t.skus.join("-") + "-";
                return n.indexOf(o) > -1 ? "choosed" : 0 != i || t.hasSelected ? "" : "choosed"
            };
            var e = '            <div class="J-choose-gift-layer choose-gift-layer">                {for pool in giftPool}                <div class="J-gift-pool gift-pool" data-res="">                <dl class="J-gift-list gift-list">                    <dt>${pool.poolName}</dt>                    {for item in pool.list}                    <dd>                        <a href="#none" class="J-select p-img ${pageConfig.getGiftPoolStatus(item, item_index)}"                             data-res="${pageConfig.getGiftPoolDataStr(item)}" >                            <img src="${pageConfig.FN_GetImageDomain(item.sid)}n1/s60x60_${item.mp}" alt="${item.nm}"/>                        </a>                    </dd>                    {/for}                </dl>                <p class="p-name">${pool.list[0].nm}</p>                </div>                {/for}                <div class="bt-wrap">                    <a href="#none" class="J-gift-pool-ok btn-confirm">\u786e\u5b9a</a>                    <a href="#none" onclick="$.closeDialog();" class="J-gift-pool-cancel btn-cancel"                         clstag="shangpin|keycount|product|zengpintanceng-guanbi">\u53d6\u6d88</a>                </div>            </div>', i = e.process(this.data);
            require.async("JDF_UI/dialog/1.0.0/dialog", function () {
                $("body").dialog({
                    type: "html",
                    mainId: "gift-pool-popup",
                    width: 530,
                    title: "\u9009\u62e9\u8d60\u54c1",
                    source: i,
                    onReady: function () {
                        t.$giftLayer = $(".J-choose-gift-layer"), t.$giftLayer.find(".choosed").trigger("click.gift_pool_item"), $("#gift-pool-popup .ui-dialog-close").attr("clstag", "shangpin|keycount|product|zengpintanceng-guanbi")
                    }
                })
            })
        }, collectSelectedSkus: function () {
            var t = {data: []}, i = [];
            this.$giftLayer.find(".J-gift-pool").each(function () {
                var e = $(this).attr("data-res").split("|"), o = e[0], n = e[1], s = decodeURIComponent(e[2]), a = decodeURIComponent(e[3]);
                t.data.push({sku: o, num: n, img: s, name: a}), o && i.push(o)
            }), pageConfig.giftSelectedSkuids = i, pageConfig.giftSelected = !0, this.skus = i, this.hasSelected = this.skus.length > 0, e.fire({
                type: "onGiftSelected",
                skus: i
            }), this.hasSelected && this.$el.removeClass("item-hl-bg"), this.updateSelected(t), this.setBtnLink(), $.closeDialog()
        }, updateSelected: function (t) {
            var e = '            {for item in data}                <img src="${pageConfig.FN_GetImageDomain(item.sku)}n1/s40x40_${item.img}" />                <span>x ${item.num}</span>            {/for}';
            this.$gift.hide(), this.$selected.show(), this.$selected.find(".J-gift-choosed").html(e.process(t))
        }, setBtnLink: function () {
            var e = t.$el.attr("href");
            t.enabled(i.getHrefWithGift(e, this.skus))
        }, setName: function (t, e) {
            var i = e.split("|"), o = i[0], n = decodeURIComponent(i[3]), s = null, a = '<a href="//item.jd.com/{0}.html" target="_blank" title="{1}">{2}</a>', l = "<span>\u3000x{0}</span>";
            n.length > 29 && (s = n.substr(0, 29) + "..."), t.html(a.format(o, n, s || n) + l.format(i[1]))
        }, leave: function (t) {
            var e = t.find(".p-name");
            this.setName(e, t.find(".choosed").attr("data-res"))
        }, hover: function (t) {
            var e = t.parents(".J-gift-pool").eq(0), i = e.find(".p-name"), o = t.attr("data-res");
            this.setName(i, o)
        }, select: function (t) {
            var e = t.parents(".J-gift-pool").eq(0), i = e.find(".J-select"), o = e.find(".p-name"), n = t.attr("data-res");
            i.removeClass("choosed"), t.addClass("choosed"), e.attr("data-res", n), this.setName(o, n)
        }
    };
    module.exports = o
});
/*!Name: lazyinit.js
 * Date: 2016-12-27 16:37:35 */
define("MOD_ROOT/lazyinit/lazyinit", function (require, exports, module) {
    function n(n) {
        var i = $("#GLOBAL_FOOTER");
        D(i, n, function (i) {
            var t = (i.attr("type") || "", n.foot || "//d.3.cn/footer?");
            $.ajax({
                url: t,
                dataType: "jsonp",
                cache: !0,
                scriptCharset: "gb2312",
                jsonpCallback: "showfooter",
                success: function (n) {
                    n && n.content && i.html(n.content.replace(/data\-lazyload/g, "src"))
                }
            })
        })
    }

    function i(n) {
        var i = $("#footmark");
        D(i, n, function () {
            require.async(["MOD_ROOT/footmark/footmark", "MOD_ROOT/footmark/footmark.css"], function (t) {
                t(i, n)
            })
        })
    }

    function t(n) {
        var i = $("#comment");
        D(i, n, function () {
            require.async(["MOD_ROOT/comment/comment2", "MOD_ROOT/comment/comment2.css"], function (i) {
                i.init(n)
            })
        })
    }

    function o(n) {
        var i = $("#comment");
        D(i, n, function () {
            require.async(["MOD_ROOT/try/try", "MOD_ROOT/try/try.css"], function (i) {
                i.init(n)
            })
        })
    }

    function c(n) {
        var i = $("#consult");
        D(i, n, function () {
            require.async(["MOD_ROOT/consult/consult", "MOD_ROOT/consult/consult.css"], function (i) {
                i.init(n)
            })
        })
    }

    function s(n) {
        var i = $("#club");
        D(i, n, function () {
            require.async(["MOD_ROOT/club/club", "MOD_ROOT/club/club.css"], function (i) {
                i.init(n)
            })
        })
    }

    function a(n) {
        var i = $(".aside");
        D(i, n, function () {
            require.async(["MOD_ROOT/sidereco/sidereco", "MOD_ROOT/sidereco/sidereco.css"], function (i) {
                i.init(n)
            })
        })
    }

    function e(n) {
        require.async(["MOD_ROOT/lazyinit/ad"], function (i) {
            i.init(n)
        })
    }

    function O(n) {
        var i = $("#similar");
        R.init(n, i)
    }

    function r(n) {
        if (n.isOver) {
            var i = $("#itemover");
            D(i, n, function () {
                require.async(["MOD_ROOT/itemover/itemover", "MOD_ROOT/itemover/itemover.css"], function (i) {
                    i.init(n)
                })
            })
        }
    }

    function u(n) {
        var i = $("#shop-similar-promotion");
        D(i, n, function () {
            require.async(["MOD_ROOT/shopSimilar/shopSimilar", "MOD_ROOT/shopSimilar/shopSimilar.css"], function (i) {
                i.ShopSimilar.inited || i.init(n)
            })
        })
    }

    function f(n) {
        var i = $("#comment");
        D(i, n, function () {
            require.async(["MOD_ROOT/askAnswer/askAnswer", "MOD_ROOT/askAnswer/askAnswer.css"], function (i) {
                i.init(n)
            })
        })
    }

    function l(n) {
        var i = null;
        n.isYuYue && (i = "yuyue"), n.isYuShou && (i = "yushou"), n.isPinGou && (i = "pin"), n.isTuanGou && (i = "pc_tuangou"), i && log("gz_item", "gz_detail", "03", i)
    }

    function m() {
        $('#detail .tab-main li[data-anchor="#comment"]').trigger("click"), $("#detail").length && setTimeout(function () {
            $("html,body").scrollTop($("#detail").offset().top)
        }, 200)
    }

    function T(n) {
        var i = location.hash;
        "#comment" === i && m()
    }

    function _(n) {
        return $("#iscgj").length ? void require.async(["MOD_ROOT/carButler/carButler", "MOD_ROOT/carButler/carButler.css"], function (n) {
            new n, $("#iscgj").show()
        }) : !1
    }

    function y() {
        ($.browser.isIE6() || $.browser.isIE7()) && require.async(["MOD_ROOT/ie6Tip/ie6Tip", "MOD_ROOT/ie6Tip/ie6Tip.css"], function (n) {
            n.init()
        })
    }

    function p(m) {
        a(m), t(m), o(m), c(m), s(m), O(m), n(m), i(m), e(m), r(m), u(m), f(m), T(m), l(m), y(), _(m)
    }

    var R = require("MOD_ROOT/similar/similar");
    require("MOD_ROOT/ELazyload/ELazyload");
    var D = function (n, i, t) {
        n.length && n.ELazyload({
            type: "module", onAppear: function () {
                t(n, i)
            }
        })
    };
    module.exports.__id = "lazyinit", module.exports.setShopSimilar = u, module.exports.goToComment = m, module.exports.init = p
});
