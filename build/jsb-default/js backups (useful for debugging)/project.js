require = function e(t, o, s) {
function r(n, a) {
if (!o[n]) {
if (!t[n]) {
var p = "function" == typeof require && require;
if (!a && p) return p(n, !0);
if (i) return i(n, !0);
var l = new Error("Cannot find module '" + n + "'");
throw l.code = "MODULE_NOT_FOUND", l;
}
var u = o[n] = {
exports: {}
};
t[n][0].call(u.exports, function(e) {
var o = t[n][1][e];
return r(o || e);
}, u, u.exports, e, t, o, s);
}
return o[n].exports;
}
for (var i = "function" == typeof require && require, n = 0; n < s.length; n++) r(s[n]);
return r;
}({
AvatarItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cea6bGV29lECYkfTzoD3ot7", "AvatarItem");
e("NetworkManager");
cc.Class({
extends: cc.Component,
properties: {
background: {
default: null,
type: cc.Button
},
avatarSprite: cc.Prefab
},
init: function(e, t) {
this.callback = t;
this.tag = e;
var o = e, s = cc.instantiate(this.avatarSprite).getComponent("AvatarSprite").init(o);
this.background.getComponent(cc.Sprite).spriteFrame = s;
},
buttonEvent: function(e) {
this.callback(this.tag);
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager"
} ],
AvatarSprite: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "68fbak9oIFE8o2rM67aCSN5", "AvatarSprite");
e("NetworkManager");
cc.Class({
extends: cc.Component,
properties: {
list_frame: [ cc.SpriteFrame ]
},
init: function(e) {
return this.list_frame[e];
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager"
} ],
BaseScene: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "72cc1llU4NOWJ09JQrdRdeg", "BaseScene");
var s = e("NetworkManager");
cc.Class({
extends: cc.Component,
properties: {},
update: function(e) {},
onLoad: function() {
cc.log("Base scene");
},
onDestroy: function() {
this.unscheduleAllCallbacks();
},
handleMessage: function(e) {
var t = !0;
switch (e.message_id) {
case s.MESSAGE_ID.INITIALIZE:
o = e.response;
this.initialMessageResponseHandler(o);
break;

case s.MESSAGE_ID.PING:
o = e.response;
this.pingMessageResponseHandler(o);
break;

case s.MESSAGE_ID.LOGOUT:
o = e.response;
this.logOutMessageResponseHandler(o);
break;

case s.MESSAGE_ID.EMERGENCY_NOTIFICATION:
o = e.response;
this.getEmergencyNotificationResponse(o);
break;

case s.MESSAGE_ID.HEAD_LINE:
var o = e.response;
this.getHeadLineResponse(o);
break;

default:
t = !1;
}
return t;
},
logOutMessageResponseHandler: function(e) {
cc.log("log out message:", e.toObject());
e.getResponsecode() && cc.director.loadScene("Intro");
},
initialMessageResponseHandler: function(e) {
cc.log("initialMessage", e);
if (0 !== e && e.getResponsecode()) {
var t = e.getCurrentappversion();
cc.log("serverAppVersion = ", t);
var o = [];
cc.log("hot_line size", e.getHotlinesList().length);
for (r = 0; r < e.getHotlinesList().length; r++) o.push(e.getHotlinesList()[r]);
cc.log("hot_lines = ", o);
for (var s = [], r = 0; r < e.getEnablegameidsList().length; r++) s.push(e.getEnablegameidsList()[r]);
cc.log("game id = ", s);
Common.setEnableGameIds(s);
cc.director.loadScene("Login");
}
},
pingMessageResponseHandler: function(e) {
if (e.getResponsecode() && e.getDisconnect()) {
Common.setSessionId("-1");
e.hasMessage() && "" !== e.getMessage() && Common.showToast(e.getMessage(), 2);
s.closeConnection();
this.scheduleOnce(this.goIntroScene, 2);
}
},
getHeadLineResponse: function(e) {
if (0 != e && e.getResponsecode() && e.getHeadlinesList().length > 0) {
cc.log("getHeadLineResponse : ", e.toObject());
for (var t = [], o = 0; o < e.getHeadlinesList().length; o++) t.push(e.getHeadlinesList()[o]);
Common.setHeadLineEmergency(t);
}
},
getEmergencyNotificationResponse: function(e) {
if (0 !== e && e.getResponsecode()) {
var t = "", o = e.getNotificationsList();
if (e.getNotificationsList().length > 0) for (var s = 0; s < o.length; s++) t += o[s] + " ";
Common.setNotificationEmergency(t);
cc.log("setNotificationEmergency : ", t);
if (e.getHeadlinesList().length > 0) {
Common.setHeadLineEmergency(e.getHeadlinesList());
var r = cc.director.getScene();
cc.isValid(r) && (cc.isValid(r.getChildByName("NodeHeadLine")) ? r.getChildByName("NodeHeadLine").getComponent("NodeHeadLine").showHeadLine() : cc.loader.loadRes("prefabs/NodeHeadLine", function(e, t) {
if (!e) {
var o = cc.instantiate(t);
if (cc.isValid(o)) {
o.getComponent("NodeHeadLine").showHeadLine();
r.addChild(o, Config.index.HEADLINE);
}
}
}));
}
}
},
openPopupSetting: function() {
Common.showPopup(Config.name.POPUP_SETTING, function(e) {
e.appear();
});
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager"
} ],
ButtonSelectLines: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "759ddA0FZ9LPKBgtiPHXhSe", "ButtonSelectLines");
cc.Class({
extends: cc.Component,
properties: {
list_frame: [ cc.SpriteFrame ],
number: cc.Label,
button_line: cc.Button
},
onLoad: function() {},
initHighLight: function(e) {
this.button_line.getComponent(cc.Sprite).spriteFrame = e ? this.list_frame[0] : this.list_frame[1];
},
initNumber: function(e) {
this.number.string = e;
this.name = e;
}
});
cc._RF.pop();
}, {} ],
CardItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f5d53nh7HRNxLAPWyMC3u8p", "CardItem");
var s = e("Types");
cc.Class({
extends: cc.Component,
properties: {
point: cc.Label,
suit: cc.Sprite,
mainPic: cc.Sprite,
cardBG: cc.Sprite,
redTextColor: cc.Color.WHITE,
blackTextColor: cc.Color.WHITE,
texFrontBG: cc.SpriteFrame,
texBackBG: cc.SpriteFrame,
texFaces: {
default: [],
type: cc.SpriteFrame
},
texSuitBig: {
default: [],
type: cc.SpriteFrame
},
texSuitSmall: {
default: [],
type: cc.SpriteFrame
},
texSuitBigPoker: {
default: [],
type: cc.SpriteFrame
},
texSuitSmallPoker: {
default: [],
type: cc.SpriteFrame
}
},
onLoad: function() {
Common.getZoneId() !== Config.TAG_GAME_ITEM.MINI_BACAY && (this.node.getComponent(cc.Sprite).spriteFrame = null);
},
init: function() {
this.texBackBG = this.texFrontBG;
this.mainPic.node.active = !1;
this.point.node.active = !1;
this.point.node.active = !1;
this.suit.node.active = null;
},
replaceCard: function(e) {
var t = this.getPoint(e), o = this.getSuit(e), r = new s.Card(t, o, Common.getZoneId()), i = !1;
Common.getZoneId() === Config.TAG_GAME_ITEM.MINI_POKER ? r.point > 9 && r.point <= 12 && (i = !0) : r.point > 10 && (i = !0);
i ? Common.getZoneId() === Config.TAG_GAME_ITEM.MINI_POKER ? this.mainPic.spriteFrame = this.texFaces[r.point - 10] : this.mainPic.spriteFrame = this.texFaces[r.point - 10 - 1] : Common.getZoneId() === Config.TAG_GAME_ITEM.MINI_POKER ? this.mainPic.spriteFrame = this.texSuitBigPoker[r.suit] : this.mainPic.spriteFrame = this.texSuitBig[r.suit];
this.point.string = r.pointName;
r.isRedSuit ? this.point.node.color = this.redTextColor : this.point.node.color = this.blackTextColor;
Common.getZoneId() === Config.TAG_GAME_ITEM.MINI_POKER ? this.suit.spriteFrame = this.texSuitSmallPoker[r.suit] : this.suit.spriteFrame = this.texSuitSmall[r.suit];
},
setBg: function(e) {
!1 === e && (this.node.getComponent(cc.Sprite).spriteFrame = null);
},
getPoint: function(e) {
return Math.ceil(e / 4);
},
getSuit: function(e) {
return e % 4;
}
});
cc._RF.pop();
}, {
Types: "Types"
} ],
Card: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "063052X4uNDPK4UMk3seHhs", "Card");
var s = cc.Enum({
Spade: 1,
Heart: 2,
Club: 3,
Diamond: 4
}), r = "NAN,A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
t.exports = {
Suit: s,
Card: function(e) {
Object.defineProperties(this, {
point: {
value: parseInt(e / 4) + 1,
writable: !1
},
suit: {
value: e % 4,
writable: !1
},
pointName: {
get: function() {
return r[this.point];
}
},
suitName: {
get: function() {
return s[this.suit];
}
},
isBlackSuit: {
get: function() {
return this.suit === s.Spade || this.suit === s.Club;
}
},
isRedSuit: {
get: function() {
return this.suit === s.Heart || this.suit === s.Diamond;
}
}
});
}
};
cc._RF.pop();
}, {} ],
ChargeItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ec376hgchdOQIT0GZrfKY/n", "ChargeItem");
cc.Class({
extends: cc.Component,
properties: {
scrollView: cc.ScrollView,
tableView: cc.Node,
providerPrefab: cc.Prefab
},
onLoad: function() {},
init: function(e, t) {
this.content = this.scrollView.content;
this.tableContent = this.tableView.content;
for (var o = 0; o < e.length; o++) {
e[o].getProviderid(), e[o].getProvidercode();
var s = e[o].getProvidername(), r = e[o].getProductsList();
cc.log("itemProduct =", r);
var i = new cc.Node();
i.parent = t.node;
var n = 600 * (o - e.length / 2 + .5) / (e.length + 1), a = cc.instantiate(this.providerPrefab);
a.getComponent("ProviderItem").init(s, o);
a.setPositionX(n);
a.setPositionY(-a.getContentSize().height);
i.addChild(a);
var p = r.length, l = [ "Mệnh giá thẻ", "KM", "Mon" ], u = this._getdata(l, r, p);
this.tableView.getComponent(cc.tableView).initTableView(u.length, {
array: u,
target: t.node
});
}
},
_getdata: function(e, t, o) {
var s = [], r = {};
r.parValue = e[0];
r.promotion = e[1];
r.cashValue = e[2];
s.push(r);
for (var i = 0; i < o; ++i) {
var n = {};
n.parValue = t[i].getParvalue();
n.promotion = t[i].getPromotion();
n.cashValue = t[i].getCashvalue();
s.push(n);
}
cc.log("array =", s);
return s;
}
});
cc._RF.pop();
}, {} ],
ChatObject: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "80a93Q4o7hNHqu04cI6w1mL", "ChatObject");
cc.Class({
properties: {
emoticonId: 0,
senderUserName: "",
senderUserId: 0,
messageChat: "",
colorCode: ""
}
});
cc._RF.pop();
}, {} ],
CommonPopup: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2a6e8xQhhVDpZVo6NJrceha", "CommonPopup");
var s = e("Popup");
cc.Class({
extends: s,
properties: {
tabTop: cc.Node,
uiTab: cc.Prefab,
tableView: cc.Node
},
onLoad: function() {},
openPopupSetting: function() {
Common.showPopup(Config.name.POPUP_SETTING, function(e) {
e.appear();
});
},
onCallBack: function() {
this._callback();
this.disappear();
},
initTabs: function(e, t) {
var o = this, s = cc.instantiate(this.uiTab), r = s.getComponent("UITab");
t ? r.setTab(e, t, function(e) {
o.onEvent(e);
}) : r.setTab(e, function(e) {
o.onEvent(e);
});
this.tabTop.addChild(s);
},
onEvent: function(e) {},
init: function() {
this.response = response;
type;
this._callback = callback;
}
});
cc._RF.pop();
}, {
Popup: "Popup"
} ],
GameList: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "42450IuWRRDnrv2TK+Vl9Li", "GameList");
var s = e("NetworkManager"), r = e("ThreeCard"), i = e("minipoker"), n = e("BaseScene");
cc.Class({
extends: n,
properties: {
scrollView: cc.ScrollView,
prefabGameItem: cc.Prefab,
roomIndex: 0,
lbl_moneys: [],
jarValue: 0,
timeDelta: 0,
jarResponse: null,
jarRequest: null,
isRequestJar: !1,
isBindNetwork: !1,
firstTimeRequestJar: !0
},
onLoad: function() {
cc.log("on load game list");
this.content = this.scrollView.content;
this.populateList();
},
onDestroy: function() {
cc.log("on destroy");
this.unscheduleAllCallbacks();
},
onEnable: function() {
cc.log("on enable");
},
onDisable: function() {
cc.log("on disabled");
},
populateList: function() {
var e = this;
e.requestJar(!0);
e.schedule(function() {
e.requestJar(!1);
}, 5);
},
scrollToLeft: function() {},
scrollToRight: function() {
this.scrollView.jumpTo(.25, 100);
},
requestJar: function(e) {
cc.log("request jar:", e);
if (!this.isRequestJar) {
e && s.showLoading();
this.isRequestJar = !0;
s.getJarRequest(0, null, e);
}
},
bindNetwork: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.bindNetwork();
},
goSceneTable: function() {},
ongamestatus: function(e) {},
jarResponseHandler: function(e) {
cc.log("jar response handler:", e.toObject());
if (e.getResponsecode() && e.getJarinfoList().length > 0) {
if (this.firstTimeRequestJar) {
this.firstTimeRequestJar = !1;
for (var t = [ Common.ZONE_ID.MINI_BACAY, Common.ZONE_ID.MINI_POKER, Common.ZONE_ID.TAIXIU, Common.ZONE_ID.VQMM, Common.ZONE_ID.TREASURE ], o = cc.size(0, this.content.getContentSize().height), s = 0; s < t.length; ++s) {
(p = cc.instantiate(this.prefabGameItem)).setTag(t[s] + 1e3);
p.getComponent("LobbyGameItem").init(s, t[s]);
p.setPositionY(.06 * this.content.getContentSize().height);
this.content.addChild(p);
o.width += 1.1 * p.getContentSize().width;
}
this.content.setContentSize(o);
}
this.isRequestJar = !1;
for (s = 0; s < e.getJarinfoList().length; s++) {
var r = e.getJarinfoList()[s], i = r.getGameid(), n = r.getValue(), a = r.getJartype(), p = this.content.getChildByTag(i + 1e3);
null !== p && "LobbyGameItem" === p.getName() && p.getComponent("LobbyGameItem").updateJarMoney(n, a);
}
}
},
handleMessage: function(e) {
var t = this._super(e);
if (t) return !0;
t = !0;
switch (e.message_id) {
case s.MESSAGE_ID.ENTER_ZONE:
o = e.response;
this.enterZoneMessageResponseHandler(o);
break;

case s.MESSAGE_ID.ENTER_ROOM:
o = e.response;
this.enterRoomResponseHandler(o);
break;

case s.MESSAGE_ID.JAR:
var o = e.response;
this.jarResponseHandler(o);
break;

default:
t = !1;
}
return t;
},
enterZoneMessageResponseHandler: function(e) {
if (0 != e) {
cc.log("enter zone response:", e.toObject());
if (e.getResponsecode()) {
Common.setEnterZone(e);
var t = e.getZoneid();
Common.setZoneId(t);
Common.setRequestRoomType(e.getDefaultroomtypeload());
if (e.hasEnabledisplayroomlist() && e.getEnabledisplayroomlist()) {
var o = [];
if (e.getCashroomconfigsList().length > 0) for (var r = 0; r < e.getCashroomconfigsList().length; r++) o.push(e.getCashroomconfigsList()[r]);
Common.setCashRoomList(o);
}
-1 !== Common.getZoneId() && Common.getZoneId() === Common.ZONE_ID.TAIXIU && s.getEnterRoomMessageFromServer(0, "");
}
}
},
loadTaiXiu: function(e) {
var t = cc.director.getScene();
cc.isValid(t) && !cc.isValid(t.getChildByName("PopupTaiXiu")) && cc.loader.loadRes("prefabs/PopupTaiXiu", function(o, s) {
if (!o) {
var r = cc.instantiate(s);
if (cc.isValid(r)) {
r.x = Common.width / 2;
r.y = Common.height / 2;
t.addChild(r);
r.getComponent("PopupTaiXiu").setEnterRoomResponse(e);
}
}
});
},
enterRoomResponseHandler: function(e) {
cc.log("enter room response: ", e);
if (e.getResponsecode()) {
cc.log("enterZone = ", Common.getEnterZone());
if (Common.getZoneId() === Common.ZONE_ID.MINI_BACAY) cc.director.loadScene("BaCay", function() {
r.instance.initDataFromLoading(Common.getEnterZone(), e);
}); else if (Common.getZoneId() === Common.ZONE_ID.MINI_POKER) cc.director.loadScene("minipoker", function() {
i.instance.initDataFromLoading(Common.getEnterZone(), e);
}); else if (Common.getZoneId() === Common.ZONE_ID.TAIXIU) {
var t = this;
t.loadTaiXiu(e);
for (var o = 0; o < e.getArgsList().length; o++) {
var s = e.getArgsList()[o].getKey(), n = e.getArgsList()[o].getValue();
if ("currentTableStage" === s) ; else if ("cdTimerRemaining" === s) ; else if ("sessionId" === s) ; else if ("resultHistorys" === s) for (var a = n.split("|"), p = 0; p < a.length; p++) a[p].split("-").map(Number); else if ("betGateInfo" === s) for (var l = n.split(","), p = 0; p < l.length; p++) {
var u = l[p].split("-").map(Number);
cc.log("số phần tử của betGateInfo là:", u.length);
}
}
t.isBindNetwork = !1;
t.unscheduleAllCallbacks();
} else Common.getZoneId() === Common.ZONE_ID.TREASURE && cc.director.loadScene("Treasure");
}
}
});
cc._RF.pop();
}, {
BaseScene: "BaseScene",
NetworkManager: "NetworkManager",
ThreeCard: "ThreeCard",
minipoker: "minipoker"
} ],
Gate: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ad2bcnzGFpDu6BgfiQ4OBwd", "Gate");
cc.Class({
properties: {
gateID: 0,
userCount: 0,
totalBet: 0,
userBet: 0
},
ctor: function(e, t, o, s) {
this.gateID = e;
this.userCount = t;
this.totalBet = o;
this.userBet = s;
}
});
cc._RF.pop();
}, {} ],
HistoryItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f30daod/sRB3LMeuxQDX872", "HistoryItem");
cc.Class({
extends: cc.Component,
properties: {
tableView: cc.Node
},
onLoad: function() {},
init: function(e, t) {
cc.log("data =", e);
this.tableView.getComponent(cc.tableView).initTableView(e.length, {
array: e,
target: t
});
}
});
cc._RF.pop();
}, {} ],
Intro: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "21280PL/O1Pd64Ir01tHgff", "Intro");
e("initialize_pb");
var s = e("NetworkManager"), r = e("BaseScene");
cc.Class({
extends: r,
properties: {
matchProgress: {
default: null,
type: cc.ProgressBar
},
isProgressing: !1,
toProgress: 0,
deltaTime: 0,
timeSchedule: 0
},
onLoad: function() {
cc.log("intro load");
this._super();
var e = this;
cc.director.preloadScene("Login", function() {
cc.log("Next scene preloaded");
e.scheduleOnce(e.goGame, e.timeSchedule);
});
Common.initLanguage();
},
update: function(e) {
if (this.isProgressing) {
this.deltaTime += e;
this.matchProgress.progress = this.deltaTime / this.timeSchedule;
if (this.deltaTime > this.timeSchedule) {
this.deltaTime = 0;
this.isProgressing = !1;
}
}
this.onGameEvent();
},
goGame: function() {
Common.setFingerprint();
s.connectNetwork();
this.unschedule(this.goGame);
},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
cc.log("buffer:", t);
return e.handleMessage(t);
});
},
handleMessage: function(e) {
return this._super(e);
},
openPopup: function() {
this.addChild(this.setting);
}
});
cc._RF.pop();
}, {
BaseScene: "BaseScene",
NetworkManager: "NetworkManager",
initialize_pb: "initialize_pb"
} ],
ItemChat: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0fcabMCMalARqrP2hKi4f0F", "ItemChat");
cc.Class({
extends: cc.Component,
properties: {
emoticon: cc.Prefab,
message: cc.RichText
},
init: function(e) {
var t = e.emoticonId, o = e.senderUserName, s = e.messageChat;
cc.log("messageChat : ", s);
var r = e.colorCode, i = Common.rgbToHex(r[0], r[1], r[2]);
if (0 == t) {
s = "<color=" + i + ">" + o + ": </color><color=" + i + ">" + s + "</color>";
cc.log("messageChat : ", s);
this.setMessage(s);
} else {
s = "<color=" + i + ">" + o + ": </color>";
this.setMessage(s);
this.setEmoticon(t);
}
},
setMessage: function(e) {
this.message.string = e;
this.node.setContentSize(this.node.getContentSize().width, this.message.node.getContentSize().height);
},
setEmoticon: function(e) {
var t = cc.instantiate(this.emoticon), o = t.getComponent("ItemEmotion");
o.init(e);
t.setPosition(cc.p(this.message.node.getPositionX(), -this.message.node.getContentSize().height));
this.node.addChild(t);
this.node.setContentSize(this.node.getContentSize().width, o.node.getContentSize().height + this.message.node.getContentSize().height);
}
});
cc._RF.pop();
}, {} ],
ItemEmotion: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e57518PoA9E9Yx1aTr+EApr", "ItemEmotion");
cc.Class({
extends: cc.Component,
properties: {
icon_emotions: [ cc.SpriteFrame ]
},
init: function(e) {
this.index = e;
this.getComponent(cc.Sprite).spriteFrame = this.icon_emotions[e - 1];
},
addTouch: function(e) {
this.callBack = e;
this.enableTouch = !0;
},
eventTouch: function() {
this.enableTouch && this.callBack(this.index);
}
});
cc._RF.pop();
}, {} ],
ItemIAP: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f4e00D+Wc5AEawrWBj//V97", "ItemIAP");
cc.Class({
extends: cc.Component,
properties: {
lbl_money: cc.Label,
items: [ cc.SpriteFrame ]
},
onLoad: function() {},
start: function() {},
init: function(e, t) {
this.lbl_money.string = e;
this.node.getComponent(cc.Sprite).spriteFrame = this.items[t];
}
});
cc._RF.pop();
}, {} ],
ItemPrefab: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "285a9DBUGVH3Kw3ARSpHRti", "ItemPrefab");
cc.Class({
extends: cc.Component,
properties: {
item: cc.Sprite,
list_frame: [ cc.SpriteFrame ]
},
init: function(e) {
this.item.spriteFrame = this.list_frame[e];
},
animate: function() {
var e = cc.scaleTo(.5, 1.1), t = cc.rotateTo(.2, -30), o = cc.rotateTo(.2, 30), s = cc.rotateTo(.1, 0);
this.node.runAction(e);
this.node.runAction(cc.repeat(cc.sequence(t, o, s), 5));
},
reset: function() {
this.node.setScale(1);
this.node.stopAllActions();
}
});
cc._RF.pop();
}, {} ],
ItemSelectLine: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8bfd7JwxgFOd6cIwrvF0xuH", "ItemSelectLine");
cc.Class({
extends: cc.Component,
properties: {
frames_selected: [ cc.SpriteFrame ],
frames_deselect: [ cc.SpriteFrame ]
},
init: function(e, t) {
this.index = e;
this.callBack = t;
this.change(!0);
this.isSelect = !0;
},
change: function(e) {
this.getComponent(cc.Sprite).spriteFrame = e ? this.frames_selected[this.index - 1] : this.frames_deselect[this.index - 1];
},
eventTouch: function() {
this.isSelect = !this.isSelect;
this.change(this.isSelect);
this.callBack(this.index);
}
});
cc._RF.pop();
}, {} ],
LineResult: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1a5ffpRubtPZqxrkfQPXwxY", "LineResult");
cc.Class({
extends: cc.Component,
properties: {
list_frames: [ cc.SpriteFrame ]
},
init: function(e) {
this.getComponent(cc.Sprite).spriteFrame = this.list_frames[e];
},
animate: function() {
var e = cc.fadeTo(.5, 50), t = cc.fadeTo(.5, 255);
this.node.runAction(cc.repeat(cc.sequence(e, t), 6));
},
show: function(e) {
this.node.setOpacity(e ? 255 : 0);
},
reset: function() {
this.node.stopAllActions();
this.node.setOpacity(0);
}
});
cc._RF.pop();
}, {} ],
Loading: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c68e99Z9QVPuZ0jQlhPOnXy", "Loading");
cc.Class({
extends: cc.Component,
properties: {
angel: 360,
duration: 1,
darkSprite: cc.Sprite,
loading: cc.Sprite
},
onLoad: function() {
this.show();
},
show: function() {
this.deltaTime = 0;
this.enable = !1;
this.darkSprite.node.setOpacity(0);
this.loading.node.setOpacity(0);
this.loading.node.stopAllActions();
var e = cc.repeatForever(cc.rotateBy(this.duration, this.angel));
this.loading.node.runAction(e);
},
stop: function() {
this.darkSprite.node.setOpacity(0);
this.loading.node.setOpacity(0);
this.loading.node.stopAllActions();
},
update: function(e) {
if (this.deltaTime > 3) {
if (!this.enable) {
this.enable = !0;
this.darkSprite.node.setOpacity(150);
this.loading.node.setOpacity(255);
var t = cc.repeatForever(cc.rotateBy(this.duration, this.angel));
this.loading.node.runAction(t);
}
} else this.deltaTime += e;
}
});
cc._RF.pop();
}, {} ],
LobbyGameItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "859a2Sd0spOhLqqtX1Fexgr", "LobbyGameItem");
var s = e("NetworkManager");
cc.Class({
extends: cc.Component,
properties: {
background: {
default: null,
type: cc.Button
},
money1: cc.Label,
money2: cc.Label,
money3: cc.Label,
money: cc.Label,
m1_value: 0,
m2_value: 0,
m3_value: 0,
box: cc.Sprite,
box_vqmm: cc.Sprite,
list_frame: [ cc.SpriteFrame ]
},
init: function(e, t) {
var o = [ Config.TAG_GAME_ITEM.MINI_BACAY, Config.TAG_GAME_ITEM.MINI_POKER, Config.TAG_GAME_ITEM.TAIXIU, Config.TAG_GAME_ITEM.VQMM, Config.TAG_GAME_ITEM.TREASURE ];
this.tag = o[e];
if (t === Config.TAG_GAME_ITEM.TAIXIU) this.box.node.active = !1; else if (t === Config.TAG_GAME_ITEM.VQMM) {
this.box.node.active = !1;
this.box_vqmm.node.active = !0;
}
this.background.getComponent(cc.Sprite).spriteFrame = this.list_frame[e];
},
updateJarMoney: function(e, t) {
switch (t) {
case 1:
if (this.m1_value < e) {
Common.countNumberAnim(this.money1, this.m1_value, e, 0, 1);
this.m1_value = e;
}
break;

case 2:
if (this.m2_value < e) {
Common.countNumberAnim(this.money2, this.m2_value, e, 0, 1);
this.m2_value = e;
}
break;

case 3:
if (this.m3_value < e) {
Common.countNumberAnim(this.money3, this.m3_value, e, 0, 1);
this.m3_value = e;
}
}
},
buttonEvent: function() {
var e = this.tag;
Common.setGameTag(e);
var t = Common.getZoneId();
Common.setCurrentZoneId(t);
s.requestEnterZoneMessage(Common.getZoneId());
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager"
} ],
Lobby: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0b550vtbRBB/pAj+ZK8at0D", "Lobby");
var s = e("BaseScene");
cc.Class({
extends: s,
properties: {
prefabPopupTaiXiu: cc.Prefab
},
onLoad: function() {},
onClickSetting: function() {
cc.log("on click setting");
}
});
cc._RF.pop();
}, {
BaseScene: "BaseScene"
} ],
Login: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f25c5yoIptMM4j8TxAUZf+1", "Login");
var s = e("NetworkManager"), r = e("BaseScene");
cc.Class({
extends: r,
properties: {
edt_username: cc.EditBox,
edt_password: cc.EditBox,
edt_username_register: cc.EditBox,
edt_pass_register: cc.EditBox,
edt_repass_register: cc.EditBox,
edt_displayname_register: cc.EditBox,
toastPrefab: cc.Prefab,
messagePopup: cc.Prefab,
popup_login: cc.Sprite,
popup_register: cc.Sprite
},
onLoad: function() {
Common.setFingerprint();
cc.log("ONLOAD LOGIN");
},
start: function() {
if (null != this.edt_username && null != this.edt_password) {
var e = cc.sys.localStorage.getItem("user_name"), t = cc.sys.localStorage.getItem("user_password");
if (null != e && null != t) {
this.edt_username.string = e;
this.edt_password.string = t;
}
}
},
ongamestatus: function(e) {
if (null !== e.data || "undefined" != typeof e.data) {
var t = s.parseFrom(e.data, e.data.byteLength);
if (t.length > 0) {
var o = t.shift();
this.handleMessage(o);
}
}
},
handleMessage: function(e) {
var t = e, o = this._super(t);
if (o) return !0;
o = !0;
switch (t.message_id) {
case s.MESSAGE_ID.LOGIN:
r = t.response;
this.handleLoginResponseHandler(r);
break;

case s.MESSAGE_ID.REGISTER:
var r = t.response;
this.handleRegisterResponseHandler(r);
break;

default:
o = !1;
}
return o;
},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
switchLoginToRegister: function() {
var e = -cc.director.getWinSize().width / 2 - this.popup_login.node.getContentSize().width;
this.popup_login.node.runAction(cc.moveTo(.5, cc.p(e, 0)).easing(cc.easeBackOut()));
this.popup_register.node.runAction(cc.moveTo(.2, cc.p(0, 0)).easing(cc.easeBackIn()));
},
switchRegisterToLogin: function() {
var e = cc.director.getWinSize().width / 2 + this.popup_register.node.getContentSize().width;
this.popup_login.node.runAction(cc.moveTo(.2, cc.p(0, 0)).easing(cc.easeBackIn()));
this.popup_register.node.runAction(cc.moveTo(.5, cc.p(e, 0)).easing(cc.easeBackOut()));
},
handleRegisterResponseHandler: function(e) {
var t = e;
t.getResponsecode() ? s.requestLoginMessage(this.edt_username_register.string, this.edt_pass_register.string) : Common.showPopup(Config.name.POPUP_MESSAGE_BOX, function(e) {
e.init(t.getMessage(), Config.COMMON_POPUP_TYPE.MESSAGE_BOX.CONFIRM_TYPE, function() {
cc.log("on callback");
});
e.appear();
});
},
handleLoginResponseHandler: function(e) {
cc.log("login response handler:", e);
if (e.getResponsecode()) {
var t = e.getSessionid();
cc.log("session id:", t);
Common.setSessionId(t);
Common.setUserInfo(e.getUserinfo().toObject());
cc.log("get user info:", e.getUserinfo().toObject());
cc.sys.localStorage.setItem("session_id", t);
cc.sys.localStorage.setItem("user_name", this.edt_username.string);
cc.sys.localStorage.setItem("user_password", this.edt_password.string);
e.hasUserinfo() && this.saveUserInfo(e.getUserinfo());
e.hasUsersetting() && this.saveUserSetting(e.getUsersetting());
e.hasEnableevent() && Common.setEnableEvent(e.getEnableevent());
e.hasEnablenotification() && Common.setEnableNotification(e.getEnablenotification());
e.hasEnabletx() && Common.setEnableTaixiu(e.getEnabletx());
e.hasNoticetext() && Common.setNoticeText(e.getNoticetext());
cc.director.loadScene("Lobby");
}
e.hasMessage() && "" !== e.getMessage() && Common.showPopup(Config.name.POPUP_MESSAGE_BOX, function(t) {
t.init(e.getMessage(), Config.COMMON_POPUP_TYPE.MESSAGE_BOX.MESSAGEBOX_TYPE, function() {
cc.log("on callback");
});
t.appear();
});
},
handlePingResponseHandler: function(e) {
cc.log("ping response handler:", e);
if (e.getResponsecode() && e.getDisconnect()) {
Common.setSessionId("-1");
e.hasMessage() && "" != e.getMessage() && cc.alert(e.getMessage());
s.closeConnection();
this.scheduleOnce(this.goIntroScene, 2);
}
},
login: function() {
var e = this.edt_username.string, t = this.edt_password.string;
"" !== e && "" !== t ? Common.isWhiteSpaceText(e) ? Common.showToast(Common.KEYTEXT.TXT_REMIND2, 1) : e.length < 3 || e.length > 12 ? Common.showToast(Common.KEYTEXT.TXT_REMIND4, 1) : e.length < 6 || e.length > 12 ? Common.showToast(Common.KEYTEXT.TXT_REMIND5, 1) : s.requestLoginMessage(e, t) : Common.showToast(Common.KEYTEXT.BLANK_USERNAME, 1);
},
register: function() {
"" !== this.edt_username_register.string && "" !== this.edt_pass_register.string && "" !== this.edt_repass_register.string && "" !== this.edt_displayname_register ? this.edt_pass_register.string === this.edt_repass_register.string ? s.requestRegisterMessage(this.edt_username_register.string, this.edt_pass_register.string, this.edt_repass_register.string, this.edt_displayname_register.string, "") : Common.showToast("Mật khẩu phải giống nhau!") : Common.showToast("Dữ liệu không được để trống");
},
moveToRegister: function() {
cc.director.loadScene("Register");
},
loginFacebook: function() {
cc.sys.platform === cc.sys.isNative || cc.sys.isBrowser && window.loginFb([ "public_profile" ], function(e, t) {
if (0 === e) {
cc.log("login succeeded", t);
var o = t.userID, r = t.accessToken;
console.log(o, r);
null !== r ? s.getOpenIdLoginMessageFromServer(1, o + ";" + r, "", "") : this.loginFacebook();
} else cc.log("Login failed, error #" + e + ": " + t);
});
},
loginGoogle: function() {
Common.showPopup(Config.name.POPUP_HISTORY, function(e) {
e.appear();
});
},
saveUserInfo: function(e) {
Common.setUserName(e.getUsername());
e.hasDisplayname() && Common.setDisplayName(e.getDisplayname());
e.hasLevel() && Common.setLevel(e.getLevel().getLevel());
e.hasCash() && Common.setCash(e.getCash());
e.hasAvatarid() && Common.setAvatarId(e.getAvatarid());
e.hasMobile() && Common.setPhoneNunber(e.getMobile());
e.hasAccountverified() && Common.setAccountVerify(e.getAccountverified());
e.hasDisablecashtransaction() && Common.setDisableCashTransaction(e.getDisablecashtransaction());
e.hasSecuritykeyset() && Common.setSecurityKeySeted(e.getSecuritykeyset());
},
saveUserSetting: function(e) {
if (e.hasAutoready()) {
Common.setAutoReady(e.getAutoready());
cc.sys.localStorage.setItem("AUTOREADY", e.getAutoready());
}
if (e.hasAutodenyinvitation()) {
Common.setAutoDenyInvitation(e.getAutodenyinvitation());
cc.sys.localStorage.setItem("DENY_INVITES", e.getAutodenyinvitation());
}
}
});
cc._RF.pop();
}, {
BaseScene: "BaseScene",
NetworkManager: "NetworkManager"
} ],
MButton: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "766c2loLlJPba69AJmZx9M3", "MButton");
cc.Class({
extends: cc.Component,
properties: {
pressedScale: .8,
transDuration: .1
},
onLoad: function() {
function e(e) {
this.stopAllActions();
this.runAction(t.scaleUpAction);
}
var t = this;
t.initScale = this.node.scale;
t.button = t.getComponent(cc.Button);
t.scaleDownAction = cc.scaleTo(t.transDuration, t.pressedScale);
t.scaleUpAction = cc.scaleTo(t.transDuration, t.initScale);
this.node.on("touchstart", function(e) {
this.stopAllActions();
this.runAction(t.scaleDownAction);
}, this.node);
this.node.on("touchend", e, this.node);
this.node.on("touchcancel", e, this.node);
}
});
cc._RF.pop();
}, {} ],
MEditbox: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0871fIxm5RMxJ5l/76e3rM1", "MEditbox");
cc.Class({
extends: cc.Component,
properties: {},
changeAlias: function(e) {
var t = Common.convertAlias(e);
this.getComponent(cc.EditBox).string = t;
}
});
cc._RF.pop();
}, {} ],
MailCell: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f973evrD/xLVbyBbr7LRzPy", "MailCell");
var s = e("PopupMail");
cc.Class({
extends: e("viewCell"),
properties: {
lbl_title: cc.RichText,
lbl_sender: cc.Label,
btn_delete: cc.Button,
mailId: -1,
index: 0
},
init: function(e, t, o, s) {
if (null !== t) {
var r = t.array[e];
this.lbl_title.string = r.mail_title;
this.lbl_sender.string = r.mail_sender;
this.mailId = r.mail_id;
this.index = e;
this.btn_delete.node.tag = e;
} else this.node.active = !1;
},
deleteEvent: function(e) {
var t = e.target._tag;
s.instance.deleteMail(t);
},
clicked: function(e) {
var t = this.mailId, e = this.index;
s.instance.readMail(t, e);
}
});
cc._RF.pop();
}, {
PopupMail: "PopupMail",
viewCell: "viewCell"
} ],
NetworkManager: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7c7c5GfmLlNub33YLJVy9mt", "NetworkManager");
e("initialize_pb"), e("login_pb"), e("enter_zone_pb"), e("register_pb"), e("notification_pb"), 
e("logout_pb"), e("Loading");
var s = {
MESSAGE_ID: {
REGISTER: 1e3,
LOGIN: 1001,
QUICK_PLAY: 1002,
OPEN_ID_LOGIN: 1003,
LOGOUT: 1004,
ENTER_ZONE: 1005,
FILTER_ROOM: 1006,
CREATE_ROOM: 1007,
ENTER_ROOM: 1008,
PLAYER_ENTER_ROOM: 1009,
START_MATCH: 1010,
TURN: 1011,
EXIT_ROOM: 1012,
PLAYER_EXIT_AFTER_MATCH_END: 1013,
PLAYER_EXIT_ROOM: 1014,
ROOM_OWNER_CHANGED: 1015,
MATCH_BEGIN: 1016,
MATCH_END: 1017,
UPDATE_MONEY: 1018,
PREPARE_NEW_MATCH: 1019,
CANCEL_EXIT_AFTER_MATCH_END: 1020,
READY_TO_PLAY: 1021,
LOCK_ROOM: 1022,
KICK_PLAYER_OUT: 1023,
CHANGE_RULE: 1024,
SEND_TEXT_EMOTICON: 1025,
ENTER_ROOM_GROUP: 1026,
LOOK_UP_USER_TO_INVITE: 1027,
INVITE_TO_ROOM: 1028,
RELY_INVITATION: 1029,
CANCEL_INVITATION: 1030,
BET: 1031,
EXIT_ZONE: 1032,
CHANGE_HOST: 1033,
EXTRA_BET: 1034,
HOST_REGISTRATION: 1035,
LOOK_UP_GAME_HISTORY: 1036,
LOOK_UP_ROOM: 1037,
UPDATE_USER_INFO: 1200,
FILTER_TOP_USER: 1201,
FILTER_MAIL: 1202,
SEND_MAIL: 1203,
DELETE_MAIL: 1204,
READED_MAIL: 1205,
CLAIM_ATTACH_ITEM: 1206,
FILTER_FRIEND: 1207,
ADD_FRIEND: 1208,
FILTER_ADD_FRIEND: 1209,
APPROVE_ADD_FRIEND: 1210,
FIND_USER: 1211,
VIEW_USER_INFO: 1212,
REMOVE_FRIEND: 1213,
LOOK_UP_MONEY_HISTORY: 1214,
INSTANT_MESSAGE: 1215,
UPDATE_USER_SETTING: 1216,
PURCHASE_MONEY: 1217,
FILTER_AVATAR: 1218,
LEVEL_UP: 1219,
MEDAL_UP: 1220,
REDEEM_GIFT_CODE: 1221,
REDEEM_GIFT_CODE_HISTORY: 1222,
ASSET_CONFIG: 1223,
EXCHANGE_ASSET: 1224,
EXCHANGE_CASH_TO_GOLD: 1225,
EXCHANGE_ASSET_HISTORY: 1226,
PURCHASE_CASH_HISTORY: 1227,
EXCHANGE_GOLD_HISTORY: 1228,
SMS_CONFIG: 1229,
CARD_CONFIG: 1230,
USER_VERIFY_CONFIG: 1231,
USER_VERIFY: 1232,
FIND_USER_BY_ID: 1233,
CASH_TRANSFER_CONFIG: 1234,
CASH_TRANSFER: 1235,
EXCHANGE_C2G_CONFIG: 1236,
LUCKY_WHEEL_CONFIG: 1237,
BUY_TURN: 1238,
JAR: 1239,
BUY_CHIP: 1240,
IAP_CONFIG: 1241,
COMPLETE_IAP: 1242,
GOLD_CONFIG: 1243,
PURCHASE_GOLD: 1244,
USER_STATUS: 1245,
AGENT: 1246,
ADS_BONUS_CONFIG: 1247,
ADS_BONUS: 1248,
ZONE_STATUS: 1249,
LOCK_MONEY: 1250,
UNLOCK_MONEY: 1251,
QUEST_INFO: 1252,
CLAIM_QUEST_BONUS: 1253,
OPEN_ID_CONNECT: 1254,
INSTANT_MESSAGE_HISTORY: 1255,
QUEST_NOTIFICATION: 1256,
PAYMENT_STATUS: 1257,
KILL_ROOM: 1300,
APPROVE_EXCHANGE_ASSET: 1301,
CHARGING_DEVICE_REGISTRATION: 1302,
CHARGING_INFO: 1303,
CHARGING_RESULT: 1304,
AGENT_ACCOUNT_BALANCE: 1305,
INITIALIZE: 1111,
HEAD_LINE: 2222,
EMERGENCY_NOTIFICATION: 3333,
COUNT_DOWN: 4444,
CAPTCHA: 5555,
CLOSE_CONNECTION: 6666,
RESET_PASSWORD: 7777,
PING: 8888,
EXPIRED_SESSION: 9999
},
lagTime: 0,
isLagged: !1,
MAX_KILL_MSG: 1e4,
URL: "ws://150.95.108.235:1280/megajackpot",
sessionId: "",
getSessionId: function() {
return s.sessionId;
},
checkEvent: function(e) {
if (null !== window.listMessage && "undefined" != typeof window.listMessage && window.listMessage.length > 0) {
var t = window.listMessage[0];
if (e(t)) {
s.hideLoading();
s.isLagged = !1;
window.listMessage.shift();
} else {
if (!s.isLagged) {
s.lagTime = Date.now();
s.isLagged = !0;
}
if (Date.now() - s.lagTime >= s.MAX_KILL_MSG) {
cc.log("kill message:", t.message_id);
window.listMessage.shift();
s.hideLoading();
s.isLagged = !1;
}
}
}
},
setSessionId: function(e) {
s.sessionId = e;
},
requestMessage: function(e, t, o, r, i) {
var n = s.initData(e, t, o, r);
s.callNetwork(n, o, i);
},
initData: function(e, t, o, s) {
var r = 0;
null != s && (r = s.length);
var i = e.length + 9 + r, n = 0, a = new ByteBuffer(i);
a.writeUint8(t, n);
var p = e.length + 4;
n++;
a.writeUint32(p, n);
n += 4;
a.writeUint16(r, n);
n += 2;
a.writeUTF8String(s, n);
n += r;
a.writeUint16(o, n);
n += 2;
a.append(e, "", n);
return a.toBuffer();
},
getTypeMessage: function(e, t, o) {
var r = new Uint8Array(o.toArrayBuffer());
e = null;
switch (t) {
case s.MESSAGE_ID.INITIALIZE:
e = proto.BINInitializeResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.LOGIN:
e = proto.BINLoginResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.REGISTER:
e = proto.BINRegisterResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.PING:
e = proto.BINPingResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.ENTER_ZONE:
e = proto.BINEnterZoneResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.HEAD_LINE:
e = proto.BINHeadlineResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.MATCH_END:
e = proto.BINMatchEndResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.LOOK_UP_ROOM:
e = proto.BINLookUpRoomResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.ENTER_ROOM:
e = proto.BINEnterRoomResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.TURN:
e = proto.BINTurnResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.UPDATE_MONEY:
e = proto.BINUpdateMoneyResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.EXIT_ZONE:
e = proto.BINExitZoneResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.EXIT_ROOM:
e = proto.BINExitRoomResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.JAR:
e = proto.BINJarResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.LOGOUT:
e = proto.BINLogoutResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.LOOK_UP_GAME_HISTORY:
e = proto.BINLookUpGameHistoryResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.CARD_CONFIG:
e = proto.BINCardConfigResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.START_MATCH:
e = proto.BINStartMatchResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.MATCH_BEGIN:
e = proto.BINMatchEndResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.BET:
e = proto.BINBetResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.INSTANT_MESSAGE:
e = proto.BINInstantMessageResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.EMERGENCY_NOTIFICATION:
e = proto.BINEmergencyNotificationResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.VIEW_USER_INFO:
e = proto.BINViewUserInfoResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.FILTER_MAIL:
e = proto.BINFilterMailResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.SEND_MAIL:
e = proto.BINSendMailResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.DELETE_MAIL:
e = proto.BINDeleteMailResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.LOOK_UP_MONEY_HISTORY:
e = proto.BINLookUpMoneyHistoryResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.REDEEM_GIFT_CODE_HISTORY:
e = proto.BINRedeemGiftCodeHistoryResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.REDEEM_GIFT_CODE:
e = proto.BINRedeemGiftCodeResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.UPDATE_USER_INFO:
e = proto.BINUpdateUserInfoResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.SMS_CONFIG:
e = proto.BINSmsConfigResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.READED_MAIL:
e = proto.BINReadedMailResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.PURCHASE_MONEY:
e = proto.BINPurchaseMoneyResponse.deserializeBinary(r);
break;

case s.MESSAGE_ID.CLAIM_ATTACH_ITEM:
e = proto.BINClaimAttachItemResponse.deserializeBinary(r);
}
null === e && cc.log("message error");
return e;
},
parseFrom: function(e, t) {
var o = [], r = new ByteBuffer(t);
r.append(e);
for (var i = t; i > 0; ) {
var n = [], a = 0, p = r.readInt32(a);
a += 4;
var l = r.readInt8(a);
a += 1;
var u = p - 1;
i -= p + 4;
var g = 0;
r = r.copy(a);
if (1 === l) {
new Uint8Array(r), r.view;
var d = cc.unzipBase64AsArray(r.toString("base64")), c = 0, h = new ByteBuffer(d.length);
h.append(d, "", 0);
var f = h.readInt16(c);
c += 2;
var y = h.readInt16(c);
c += 2;
u -= f + 2;
var B = h.copy(c, f + c - 2);
if (0 !== (g = s.getTypeMessage(g, y, B))) {
u -= f + 2;
for (var I = {
message_id: y,
response: g
}, M = 0; M < n.length; M++) (_ = n[M]).message_id === y && n.splice(M, 1);
n.push(I);
o.push(I);
} else cc.error("unknown message with message id:", y);
} else for (;u > 0; ) {
var R = 0, N = r.readInt16(R);
R += 2;
var m = r.readInt16(R);
R += 2;
var F = r.copy(R, N + R - 2);
if (0 != (g = s.getTypeMessage(g, m, F))) {
u -= N + 2;
r = r.copy(N + R - 2);
for (var b = {
message_id: m,
response: g
}, M = 0; M < n.length; M++) {
var _ = n[M];
_.message_id == m && n.splice(M, 1);
}
n.push(b);
o.push(b);
} else {
cc.error("unknown message with message id:", m);
u -= N + 2;
r = r.copy(N + R - 2);
}
}
}
i > 0 && cc.log("NetworkManager: error packet length = 0");
return o;
},
initSmsConfigMessage: function(e) {
var t = new proto.BINSmsConfigRequest();
t.setType(e);
return t;
},
requestSmsConfigMessage: function(e) {
var t = s.initSmsConfigMessage(e);
this.requestMessage(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.SMS_CONFIG, Common.getSessionId());
},
initLogoutMessage: function() {},
requestLogoutMessage: function() {},
initPurchaseMoneyMessage: function(e, t, o, s, r) {
var i = new proto.BINPurchaseMoneyRequest();
i.setProvider(e);
i.setCardserial(t);
i.setCardpin(o);
i.setSecuritykey(s);
i.setCaptcha(r);
return i;
},
requestPurchaseMoneyMessage: function(e, t, o, r, i) {
var n = s.initPurchaseMoneyMessage(e, t, o, r, i);
this.requestMessage(n.serializeBinary(), Common.getOS(), s.MESSAGE_ID.PURCHASE_MONEY, Common.getSessionId());
},
initInitializeMessage: function(e, t, o, s, r, i, n, a, p) {
var l = new proto.BINInitializeRequest();
l.setCp(e);
l.setAppversion(t);
l.setDeviceid(o);
l.setDeviceinfo(s);
l.setCountry(r);
l.setLanguage(i);
l.setPakagename(n);
l.setLiteversion(a);
l.setReferencecode(p);
return l;
},
requestInitializeMessage: function(e, t, o, r, i, n, a, p, l) {
var u = s.initInitializeMessage(e, t, o, r, i, n, a, p, l);
this.requestMessage(u.serializeBinary(), Common.getOS(), s.MESSAGE_ID.INITIALIZE, "");
},
initLoginMessage: function(e, t) {
var o = new proto.BINLoginRequest();
o.setUsername(e);
o.setPassword(t);
return o;
},
requestLoginMessage: function(e, t) {
var o = s.initInitializeMessage(e, t);
this.requestMessage(o.serializeBinary(), Common.getOS(), s.MESSAGE_ID.LOGIN, "");
},
initPingMessage: function(e) {
var t = new proto.BINPingRequest();
t.setDisconecttime(e);
return t;
},
requestPingMessage: function(e) {
var t = s.initPingMessage(e);
this.requestMessage(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.PING, "");
},
initEnterZoneMessage: function(e) {
var t = new proto.BINEnterZoneRequest();
t.setZoneid(e);
return t;
},
initExitRoomMessage: function(e) {
var t = new proto.BINExitRoomRequest();
t.setRoomindex(e);
return t;
},
requestExitRoomMessage: function(e) {
var t = this.initExitRoomMessage(e);
this.requestMessage(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.EXIT_ROOM, Common.getSessionId());
},
requestEnterZoneMessage: function(e) {
var t = s.initEnterZoneMessage(e);
cc.log("message = ", t);
this.requestMessage(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.ENTER_ZONE, Common.getSessionId());
},
requestExitZoneMessage: function(e) {
var t = this.initExitZoneMessage(e);
this.requestMessage(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.EXIT_ZONE, Common.getSessionId());
},
initExitZoneMessage: function(e) {
var t = new proto.BINExitZoneRequest();
t.setZoneid(e);
return t;
},
requestRegisterMessage: function(e, t, o, r, i) {
var n = s.initRegisterMessage(e, t, o, r, i);
this.requestMessage(n.serializeBinary(), Common.getOS(), s.MESSAGE_ID.REGISTER, "");
},
initRegisterMessage: function(e, t, o, s, r) {
var i = new proto.BINRegisterRequest();
i.setUsername(e);
i.setPassword(t);
i.setConfirmpassword(o);
i.setDisplayname(s);
i.setMobile(r);
return i;
},
initLookUpRoomRequest: function(e, t, o, s, r, i, n) {
var a = new proto.BINLookUpRoomRequest();
a.setZoneid(e);
a.setType(t);
a.setFirstresult(o);
a.setMaxresult(s);
a.setOrderbyfield(r);
a.setAsc(i);
a.setRoomgroup(n);
return a;
},
getLookUpRoomRequest: function(e, t, o, r, i, n, a) {
var p = this.initLookUpRoomRequest(e, t, o, r, i, n, a);
this.requestMessage(p.serializeBinary(), Common.getOS(), s.MESSAGE_ID.LOOK_UP_ROOM, Common.getSessionId());
},
getEnterRoomMessageFromServer: function(e, t) {
var o = this.initEnterRoomMessage(e, t);
this.requestMessage(o.serializeBinary(), Common.getOS(), s.MESSAGE_ID.ENTER_ROOM, Common.getSessionId());
},
initEnterRoomMessage: function(e, t) {
var o = new proto.BINEnterRoomRequest();
o.setRoomindex(e);
o.setPassword(t);
return o;
},
initTurnMessage: function(e, t) {
cc.log("entries =", t);
var o = new proto.BINTurnRequest();
o.setRoomindex(e);
o.setArgsList(t);
cc.log("request =", o);
return o;
},
getTurnMessageFromServer: function(e, t) {
var o = this.initTurnMessage(e, t);
this.requestMessage(o.serializeBinary(), Common.getOS(), s.MESSAGE_ID.TURN, Common.getSessionId());
},
getJarRequest: function(e, t, o) {
var r = this.initJarRequest(e, t);
this.requestMessage(r.serializeBinary(), Common.getOS(), s.MESSAGE_ID.JAR, Common.getSessionId(), o);
},
initJarRequest: function(e, t) {
var o = new proto.BINJarRequest();
o.setZoneid(e);
null !== t && o.setJartype(t);
return o;
},
getLookUpGameHistoryRequest: function(e, t, o, r, i) {
var n = new proto.BINLookUpGameHistoryRequest();
n.setFirstresult(e);
n.setMaxresult(t);
n.setArgsList(o);
if (0 !== r) {
n.setOrderbyfield(r);
n.setAsc(i);
}
cc.log("zone =", Common.getZoneId());
cc.log("request history =", n);
this.requestMessage(n.serializeBinary(), Common.getOS(), s.MESSAGE_ID.LOOK_UP_GAME_HISTORY, Common.getSessionId());
},
getCardConfigRequest: function(e) {
var t = this.initCardConfigRequest(e);
this.requestMessage(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.CARD_CONFIG, Common.getSessionId());
},
initCardConfigRequest: function(e) {
var t = new proto.BINCardConfigRequest();
t.setType(e);
return t;
},
getOpenIdLoginMessageFromServer: function(e, t, o, r) {
var i = this.initOpenIdLoginMessage(e, t, o, r);
this.callNetwork(this.initData(i.serializeBinary(), Common.getOS(), s.MESSAGE_ID.OPEN_ID_LOGIN, ""));
},
initOpenIdLoginMessage: function(e, t, o, s) {
var r = new proto.BINOpenIdLoginRequest();
r.setChannel(e);
r.setOpenid(t);
r.setFirstname(o);
r.setLastname(s);
return r;
},
getFilterMailFromServer: function(e, t, o, r) {
var i = new proto.BINFilterMailRequest();
i.setFirstresult(e);
i.setMaxresult(t);
i.setLastrequesttime(o);
i.setSentmail(r);
this.callNetwork(this.initData(i.serializeBinary(), Common.getOS(), s.MESSAGE_ID.FILTER_MAIL, Common.getSessionId()));
},
getViewUserInfoFromServer: function(e) {
var t = new proto.BINViewUserInfoRequest();
t.setTargetuserid(e);
this.callNetwork(this.initData(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.VIEW_USER_INFO, Common.getSessionId()));
},
sendBet: function(e, t, o) {
var r = new proto.BINBetRequest();
r.setRoomindex(e);
r.setBetmoney(t);
r.setBettype(o);
this.callNetwork(this.initData(r.serializeBinary(), Common.getOS(), s.MESSAGE_ID.BET, Common.getSessionId()));
},
getLookupMoneyHistoryMessage: function(e, t, o) {
var r = this.initLookupMoneyHistoryMessage(e, t, o);
this.callNetwork(this.initData(r.serializeBinary(), Common.getOS(), s.MESSAGE_ID.LOOK_UP_MONEY_HISTORY, Common.getSessionId()));
},
initLookupMoneyHistoryMessage: function(e, t, o) {
var s = new proto.BINLookUpMoneyHistoryRequest();
s.setFirstresult(e);
s.setMaxresult(t);
s.setFiltertype(o);
return s;
},
getUserVerifyConfigRequest: function(e) {
var t = this.initUserVerifyConfigRequest(e);
this.callNetwork(this.initData(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.USER_VERIFY_CONFIG, Common.getSessionId()));
},
initUserVerifyConfigRequest: function(e) {
var t = new proto.BINUserVerifyConfigRequest();
t.setType(e);
return t;
},
sendMail: function(e, t, o, r) {
var i = new proto.BINSendMailRequest();
i.setRecipientuserid(e);
i.setTitle(t);
i.setBody(o);
i.setParentid(r);
this.callNetwork(this.initData(i.serializeBinary(), Common.getOS(), s.MESSAGE_ID.SEND_MAIL, Common.getSessionId()));
},
deleteMail: function(e) {
cc.log("ids =", e);
if (e.length > 0) {
for (var t = new proto.BINDeleteMailRequest(), o = 0; o < e.length; o++) t.addSelectedmailids(e[o]);
this.callNetwork(this.initData(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.DELETE_MAIL, Common.getSessionId()));
}
},
readMail: function(e, t) {
var o = new proto.BINReadedMailRequest();
o.setReadedmailid(e);
o.setGetcontent(t);
this.callNetwork(this.initData(o.serializeBinary(), Common.getOS(), s.MESSAGE_ID.READED_MAIL, Common.getSessionId()));
},
claimAttachMail: function(e, t) {
var o = new proto.BINClaimAttachItemRequest();
o.setMailid(e);
o.setCaptchaanswers(t);
cc.log("request =", o);
this.callNetwork(this.initData(o.serializeBinary(), Common.getOS(), s.MESSAGE_ID.CLAIM_ATTACH_ITEM, Common.getSessionId()));
},
getRedeemGiftCodeHistoryFromServer: function(e, t) {
var o = this.initRedeemGiftCodeHistoryMessage(e, t);
this.callNetwork(this.initData(o.serializeBinary(), Common.getOS(), s.MESSAGE_ID.REDEEM_GIFT_CODE_HISTORY, Common.getSessionId()));
},
initRedeemGiftCodeHistoryMessage: function(e, t) {
var o = new proto.BINRedeemGiftCodeHistoryRequest();
o.setFirstresult(e);
o.setMaxresult(t);
return o;
},
getRedeemGiftCodeFromServer: function(e) {
var t = this.initRedeemGiftCodeMessage(e);
this.callNetwork(this.initData(t.serializeBinary(), Common.getOS(), s.MESSAGE_ID.REDEEM_GIFT_CODE, Common.getSessionId()));
},
initRedeemGiftCodeMessage: function(e) {
var t = new proto.BINRedeemGiftCodeRequest();
t.setGiftcode(e);
return t;
},
getInstantMessage: function(e, t, o, r, i) {
var n = this.initInstantMessage(e, t, o, r, i);
this.callNetwork(this.initData(n.serializeBinary(), Common.getOS(), s.MESSAGE_ID.INSTANT_MESSAGE, Common.getSessionId()));
},
getUpdateUserInfoMessageFromServer: function(e, t) {
var o = this.initUpdateUserInfoMessage(e, t);
this.callNetwork(this.initData(o.serializeBinary(), Common.getOS(), s.MESSAGE_ID.UPDATE_USER_INFO, Common.getSessionId()));
},
initUpdateUserInfoMessage: function(e, t) {
cc.log("user_infos =", e);
var o = new proto.BINUpdateUserInfoRequest(), s = o.addUserinfos();
s.setInfofield(e.getInfofield());
s.setOldvalue(e.getOldvalue());
s.setNewvalue(e.getNewvalue());
s.setConfirmvalue(e.getConfirmvalue());
return o;
},
initInstantMessage: function(e, t, o, s, r) {
if (e > 0 && e < 4) {
var i = new proto.BINInstantMessageRequest();
i.setScope(e);
null !== r && i.setTextemoticonid(r);
null !== t && i.setInstantmessage(t);
if (3 === e) {
i.setReceiverusername(o);
i.setReceiveruserid(s);
}
return i;
}
cc.log("check lai scope di em");
return null;
},
connectNetwork: function() {
if (null === window.ws || "undefined" == typeof window.ws || window.ws.readyState === WebSocket.CLOSED) {
window.ws = new WebSocket(s.URL);
window.listMessage = [];
window.ws.binaryType = "arraybuffer";
window.ws.onopen = function(e) {
console.log("on web socket");
s.requestInitializeMessage(Common.getCp(), Common.getVersionCode(), Common.getFingerprint(), Common.getDeviceInfo(), "vn", "vi", Common.getPackageName(), !1, "");
setTimeout(function() {
window.myInterval = setInterval(function() {
s.requestPingMessage(0);
}, 15e3);
}, 1);
};
window.ws.onclose = function() {
console.log("Websocket instance was closed");
clearInterval(window.myInterval);
};
window.ws.onmessage = this.onGameStatus.bind(this);
}
},
closeConnection: function() {
window.ws.readyState === WebSocket.OPEN && window.ws.close();
},
onGameStatus: function(e) {
if (null !== e.data || "undefined" != typeof e.data) for (var t = s.parseFrom(e.data, e.data.byteLength), o = 0; o < t.length; o++) {
cc.log(" message id:", t[o].message_id);
1202 === t[o].message_id && cc.log("done");
window.listMessage.push(t[o]);
}
},
callNetwork: function(e, t, o) {
var r = this;
"undefined" == typeof o && null !== o && (o = !1);
if (null === window.ws || "undefined" == typeof window.ws || window.ws.readyState === WebSocket.CLOSED) {
window.ws = new WebSocket(s.URL);
window.listMessage = [];
window.ws.binaryType = "arraybuffer";
window.ws.onopen = function() {
cc.log("on web socket");
setTimeout(function() {
window.ws.send(e);
}, .5);
};
window.ws.onclose = function() {
console.log("Websocket instance was closed");
};
} else if (window.ws.readyState === WebSocket.OPEN) {
cc.log("is loading:", o);
"undefined" != typeof t && t !== s.MESSAGE_ID.INITIALIZE && t !== s.MESSAGE_ID.PING && t !== s.MESSAGE_ID.JAR && t !== s.MESSAGE_ID.CHANGE_HOST && t !== s.MESSAGE_ID.TURN && t !== s.MESSAGE_ID.INSTANT_MESSAGE && t !== s.MESSAGE_ID.CARD_CONFIG && t !== s.MESSAGE_ID.LOCK_UP_MONEY_HISTORY && t !== s.MESSAGE_ID.SMS_CONFIG && t !== s.MESSAGE_ID.FILTER_FRIEND && t !== s.MESSAGE_ID.BET && t !== s.MESSAGE_ID.EXTRA_BET && t !== s.MESSAGE_ID.ZONE_STATUS && t !== s.MESSAGE_ID.FILTER_ROOM && t !== s.MESSAGE_ID.LOOK_UP_GAME_HISTORY && r.showLoading();
window.ws.send(e);
}
},
showLoading: function() {
var e = cc.director.getScene();
cc.isValid(e) && (cc.isValid(e.getChildByName("Loading")) ? e.getChildByName("Loading").getComponent("Loading").show() : cc.loader.loadRes("prefabs/Loading", function(t, o) {
if (!t) {
var s = cc.instantiate(o);
if (cc.isValid(s)) {
s.x = Common.width / 2;
s.y = Common.height / 2;
e.addChild(s, Config.index.LOADING);
}
}
}));
},
hideLoading: function() {
var e = cc.director.getScene();
cc.isValid(e) && cc.isValid(e.getChildByName("Loading")) && e.getChildByName("Loading").getComponent("Loading").stop();
}
};
t.exports = s;
cc._RF.pop();
}, {
Loading: "Loading",
enter_zone_pb: "enter_zone_pb",
initialize_pb: "initialize_pb",
login_pb: "login_pb",
logout_pb: "logout_pb",
notification_pb: "notification_pb",
register_pb: "register_pb"
} ],
NodeHeadLine: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "3a481RkhzFKKbzqsahMg56w", "NodeHeadLine");
cc.Class({
extends: cc.Component,
properties: {
darkSprite: cc.Sprite,
message: cc.RichText
},
onLoad: function() {},
showHeadLine: function() {
if ("" == Common.getNotificationEmergency()) {
if ("" == Common.getHeadLineEmergency()) return;
this.initHeadLineNotify(Common.getHeadLineEmergency());
} else this.message.string = Common.getNotificationEmergency();
this.message.node.setPositionX(0);
this.width = this.message.node.getBoundingBox().width;
this.show(!0);
},
initHeadLineNotify: function(e) {
for (var t = "", o = 0; o < e.length; o++) {
var s = e[o].getTag();
"" !== e[o].getTag() && (s = "(" + e[o].getTag() + ")");
t += Common.textColor(s, cc.color(255, 255, 0, 255)) + Common.textColor(e[o].getDisplayname(), cc.color(242, 95, 185, 255)) + Common.textColor(e[o].getAction(), cc.color(218, 235, 129, 255)) + Common.textColor(e[o].getSubject(), cc.color(68, 235, 219, 255)) + " ";
}
this.message.string = t;
},
update: function(e) {
if (this.anim) {
var t = this.message.node.getPositionX();
if ((t -= 100 * e) < -this.node.getContentSize().width / 2 - this.width) {
this.show(!1);
return;
}
this.message.node.setPositionX(t);
}
},
show: function(e) {
this.anim = e;
this.node.active = e;
}
});
cc._RF.pop();
}, {} ],
NodeIAP: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7e8fbUG4aNAsrURPO12sTEc", "NodeIAP");
cc.Class({
extends: cc.Component,
properties: {
view: cc.Node
},
onLoad: function() {
this.initIap();
},
initIap: function() {
if (cc.sys.platform === cc.sys.IPHONE || cc.sys.platform === cc.sys.IPAD || cc.sys.platform === cc.sys.ANDROID) {
var e = this;
e.productNames = [];
sdkbox.IAP.init();
sdkbox.IAP.setDebug(!0);
sdkbox.IAP.setListener({
onSuccess: function(e) {
cc.log("Purchase successful: " + JSON.stringify(e));
cc.log("Purchase successful: " + e.name);
},
onFailure: function(e, t) {
cc.log("Purchase failed: " + e.name + " error: " + t);
},
onCanceled: function(e) {
cc.log("Purchase canceled: " + e.name);
},
onRestored: function(e) {
cc.log("Restored: " + e.name);
},
onProductRequestSuccess: function(t) {
for (var o = 0; o < t.length; o++) {
cc.log("================");
cc.log("name: " + t[o].name);
cc.log("price: " + t[o].price);
cc.log("priceValue: " + t[o].priceValue);
cc.log("================");
var s = t[o].name;
cc.log("purchase: " + s);
e.productNames[o] = s;
}
},
onProductRequestFailure: function(e) {
cc.log("Failed to get products");
},
onShouldAddStorePayment: function(e) {
cc.log("onShouldAddStorePayment:" + e);
return !0;
},
onFetchStorePromotionOrder: function(e, t) {
cc.log("onFetchStorePromotionOrder:  e:" + t);
},
onFetchStorePromotionVisibility: function(e, t, o) {
cc.log("onFetchStorePromotionVisibility:" + e + " v:" + t + " e:" + o);
},
onUpdateStorePromotionOrder: function(e) {
cc.log("onUpdateStorePromotionOrder:" + e);
},
onUpdateStorePromotionVisibility: function(e) {
cc.log("onUpdateStorePromotionVisibility:" + e);
}
});
}
},
buttonClick: function(e, t) {
var o = t;
cc.log("productNames : " + this.productNames);
cc.log("productName >> : " + t + "/" + this.productNames[o]);
o < this.productNames.length && sdkbox.IAP.purchase(this.productNames[o]);
}
});
cc._RF.pop();
}, {} ],
NodeMail: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "945f4SWLUZNnIlubGkGeZSA", "NodeMail");
cc.Class({
extends: cc.Component,
properties: {
mailTitle: cc.Label,
mailSender: cc.Label,
mailContent: cc.ScrollView,
btnReceived: cc.Button,
spriteGift: cc.Sprite,
operation: cc.String,
mailId: -1,
messContent: cc.RichText
},
init: function(e) {
this.mailTitle.string = e.getTitle();
this.mailSender.string = e.getSenderusername();
this.messContent.string = Common.wordWrap(e.getBody(), 66);
this.messContent.node.getContentSize().height > this.mailContent.content.getContentSize().height && this.mailContent.content.setContentSize(this.mailContent.content.getContentSize().width, this.messContent.node.getContentSize().height);
if (e.getAttachitemid() > 0) {
this.btnReceived.node.active = !0;
this.operation = e.getExpandeddata();
this.mailId = e.getMailid();
} else this.btnReceived.node.active = !1;
},
showCaptcha: function() {
var e = this.operation, t = this.mailId;
Common.showPopup(Config.name.POPUP_CAPTCHA, function(o) {
o.init(e, t);
o.appear();
});
}
});
cc._RF.pop();
}, {} ],
NodeNapSMS: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e96f46FP8tGEYywxneQbmLy", "NodeNapSMS");
e("NetworkManager");
cc.Class({
extends: cc.Component,
properties: {
scroll_view: cc.ScrollView,
ui_left: cc.Node,
tabLeftPrefab: cc.Prefab,
smsItemPrefab: cc.Prefab
},
initTabLeft: function() {
cc.log("sms number list:", Common.smsConfigLists);
this.providersList = Common.smsConfigLists[0].providersList;
this.tabString = this.providersList.map(function(e) {
return e.providername;
});
this.tabInfo = Common.smsConfigLists.map(function(e) {
return e.providerLists;
});
var e = cc.instantiate(this.tabLeftPrefab);
e.getComponent("UITabLeft").setTab(this.tabString, 1, function(e) {
this.onLeftEvent(e - 1);
}.bind(this));
this.ui_left.addChild(e);
},
onLoad: function() {},
onLeftEvent: function(e) {
this.content = this.scroll_view.content;
var t = cc.size(this.content.getContentSize().width, this.content.getContentSize().height);
cc.log("index:", e);
var o = this.providersList[e], s = o.syntaxesList.length;
this.content.removeAllChildren(!1);
for (var r = 0; r < s; r++) {
var i = o.syntaxesList[r], n = cc.instantiate(this.smsItemPrefab);
n.getComponent("SmsItem").init(i.parvalue, i.cashvalue, i.syntax, i.targetnumber);
var a = n.getComponent("SmsItem").node.getContentSize();
cc.log("item size:", a, ", i:", parseInt(r % 3));
if (0 == r) {
t.width / 3 - a.width;
var p = parseInt(s % 3);
p > 0 && p++;
t = cc.size(t.width, 1.1 * a.height * p);
this.content.setContentSize(t);
}
var l = parseInt(r % 3), u = parseInt(r / 3), g = (l - 1) * a.width * 1.25, d = (-.5 - u) * a.height * 1.15;
n.setPositionX(g);
n.setPositionY(d);
this.content.addChild(n);
}
},
_getdata: function(e, t, o) {
var s = [], r = {};
r.parvalue = t[0];
r.promotion = t[1];
r.cashvalue = t[2];
s.push(r);
if (null !== e) for (var i = 0; i < o; ++i) {
var n = {};
n.parvalue = e[i].parvalue;
n.promotion = e[i].promotion;
n.cashvalue = e[i].cashvalue;
s.push(n);
}
return s;
},
demo: function(e) {
cc.log(">>>>>>>>> demo func ", e);
},
update: function(e) {},
start: function() {}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager"
} ],
NodeNapThe: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "bbfd9kJOsNMZImL0wOgWUNn", "NodeNapThe");
var s = e("NetworkManager");
cc.Class({
extends: cc.Component,
properties: {
edit_number: cc.EditBox,
edit_serial: cc.EditBox,
table_view: cc.Node,
ui_left: cc.Node,
tabLeftPrefab: cc.Prefab
},
purchaseMoney: function() {
if (null !== this.providercode) {
var e = this.edit_serial.string, t = this.edit_number.string;
s.requestPurchaseMoneyMessage(this.providercode, e, t, "", "");
} else cc.log("Không tồn tại provider code");
},
initTabLeft: function() {
cc.log("provider list:", Common.providerLists);
this.tabString = Common.providerLists.map(function(e) {
return e.providername;
});
this.tabInfo = Common.providerLists.map(function(e) {
return {
productsList: e.productsList,
providercode: e.providercode
};
});
cc.log("tabString:", this.tabInfo);
var e = cc.instantiate(this.tabLeftPrefab);
e.getComponent("UITabLeft").setTab(this.tabString, 1, function(e) {
this.onLeftEvent(e - 1);
}.bind(this));
this.ui_left.addChild(e);
},
onLoad: function() {},
onLeftEvent: function(e) {
var t = this.tabInfo[e].productsList;
this.providercode = this.tabInfo[e].providercode;
cc.log("provider code:", this.providercode);
var o = t.length, s = [ "Mệnh giá thẻ", "KM", "Số BIT" ], r = this._getdata(t, s, o);
this.table_view.getComponent(cc.tableView).initTableView(r.length, {
array: r,
target: this
});
},
_getdata: function(e, t, o) {
var s = [], r = {};
r.parvalue = t[0];
r.promotion = t[1];
r.cashvalue = t[2];
s.push(r);
if (null !== e) for (var i = 0; i < o; ++i) {
var n = {};
n.parvalue = e[i].parvalue;
n.promotion = e[i].promotion;
n.cashvalue = e[i].cashvalue;
s.push(n);
}
return s;
},
demo: function(e) {
cc.log(">>>>>>>>> demo func ", e);
},
purchaseMoneyResponseHandler: function(e) {
cc.log("purchase money response handler:", e.toObject());
if (e.getResponsecode()) {
this.edit_number.string = "";
this.edit_serial.string = "";
}
e.hasMessage() && "" !== e.getMessage() && Common.showToast(e.getMessage(), 2);
},
handleMessage: function(e) {
var t = !0, o = e.response;
switch (e.message_id) {
case s.MESSAGE_ID.PURCHASE_MONEY:
this.purchaseMoneyResponseHandler(o);
break;

default:
t = !1;
}
return t;
},
onGameEvent: function() {
s.checkEvent(function(e) {
return this.handleMessage(e);
}.bind(this));
},
update: function(e) {
this.onGameEvent();
},
start: function() {}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager"
} ],
Nohu: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e4d0e7B1blOCrdny4snoQ1F", "Nohu");
cc.Class({
extends: cc.Component,
properties: {
anim: cc.Animation
},
onLoad: function() {},
playAnim: function() {
cc.log("playAnim");
this.anim.play("NoHu");
},
stopAnim: function() {
this.anim.stop("NoHu");
}
});
cc._RF.pop();
}, {} ],
PopupCaptcha: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f2bc6AJ7O9E9ozAdXpkSywm", "PopupCaptcha");
var s = e("Popup"), r = e("NetworkManager");
cc.Class({
extends: s,
properties: {
btnOK: cc.Button,
edbAns: cc.EditBox,
operation: cc.Label,
mailId: -1
},
init: function(e, t) {
this.operation.string = e;
this.mailId = t;
},
submitEvent: function() {
var e = this.edbAns.string, t = this.mailId;
r.claimAttachMail(e, t);
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager",
Popup: "Popup"
} ],
PopupChangeAvatar: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "58490K5h0lE9K8L8TtFwTQu", "PopupChangeAvatar");
var s = e("Popup"), r = e("NetworkManager");
cc.Class({
extends: s,
properties: {
scrollView: cc.ScrollView,
avatarPrefab: cc.Prefab,
avatarId: 0
},
onLoad: function() {
var e = this;
this.content = this.scrollView.content;
for (var t = cc.size(this.content.getContentSize().width, this.content.getContentSize().height), o = 0; o < 22; ++o) {
var s = cc.instantiate(this.avatarPrefab);
s.setTag(o + 1e5);
s.getComponent("AvatarItem").init(o, function(t) {
cc.log("index =", t);
e.setAvatarId(t);
});
var r = s.getComponent("AvatarItem").node.getContentSize();
if (0 == o) {
t.width / 3 - r.width;
t = cc.size(t.width, 1.1 * r.height * 8);
this.content.setContentSize(t);
}
var i = parseInt(o % 3), n = parseInt(o / 3), a = (i - 1) * r.width, p = (-.5 - n) * r.height * 1.1;
s.setPositionX(a);
s.setPositionY(p);
this.content.addChild(s);
}
},
setAvatarId: function(e) {
this.avatarId = 1e5 + e;
},
changeAvatar: function() {
Common.setAvatarId(this.avatarId);
var e = new proto.BINEditingInfo();
e.setInfofield(Config.Update.UPDATE_AVATAR);
e.setNewvalue(this.avatarId.toString());
r.getUpdateUserInfoMessageFromServer(e, 1);
this.disappear();
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager",
Popup: "Popup"
} ],
PopupChangeInfo: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "713a5y1XeBFF7EkHtdg++Q0", "PopupChangeInfo");
var s = e("Popup"), r = e("NetworkManager");
cc.Class({
extends: s,
properties: {
phone: cc.EditBox
},
onLoad: function() {},
onGameEvent: function() {
var e = this;
r.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
handleMessage: function(e) {
var t = e, o = !0;
switch (t.message_id) {
case r.MESSAGE_ID.UPDATE_USER_INFO:
var s = t.response;
this.changeInfoHander(s);
break;

default:
o = !1;
}
return o;
},
changeInfoEvent: function() {
var e = this.phone.string;
if ("" !== e) if (e.length > Config.Valid.MAX_LENGTH_SDT) Common.showToast(Common.KEYTEXT.INVALID_PHONE); else {
var t = new proto.BINEditingInfo();
t.setInfofield(Config.Update.UPDATE_PHONE);
t.setNewvalue(e);
Common.setNewPhone(e);
r.getUpdateUserInfoMessageFromServer(t, 1);
} else Common.showToast(Common.KEYTEXT.BLANK_USERNAME);
},
changeInfoHander: function(e) {
cc.log("response changepass =", e);
if (e.getResponsecode()) {
Common.showToast(e.getMessage());
this.disappear();
} else Common.showToast(e.getMessage());
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager",
Popup: "Popup"
} ],
PopupChangePass: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "90a25jdooVC/a+xXHVpDnOT", "PopupChangePass");
var s = e("Popup"), r = e("NetworkManager");
cc.Class({
extends: s,
properties: {
oldPass: cc.EditBox,
newPass: cc.EditBox,
renewPass: cc.EditBox
},
onLoad: function() {},
onGameEvent: function() {
var e = this;
r.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
handleMessage: function(e) {
var t = e, o = !0;
switch (t.message_id) {
case r.MESSAGE_ID.UPDATE_USER_INFO:
var s = t.response;
this.changePassHander(s);
break;

default:
o = !1;
}
return o;
},
changePassEvent: function() {
var e = this.oldPass.string, t = this.newPass.string, o = this.renewPass.string;
if ("" !== e && "" !== t && "" !== o) if (t === o) if (e !== t) if (t.length < Config.Valid.MIN_LENGTH_PASSWORD || t.length > Config.Valid.MAX_LENGTH_PASSWORD) Common.showToast(Common.KEYTEXT.INVALID_PASSWORD); else {
var s = new proto.BINEditingInfo();
s.setInfofield(Config.Update.UPDATE_PASSWORD);
s.setOldvalue(e);
s.setNewvalue(t);
s.setConfirmvalue(o);
r.getUpdateUserInfoMessageFromServer(s, 1);
} else Common.showToast(Common.KEYTEXT.PASSWORD_NOT_CHANGE); else Common.showToast(Common.KEYTEXT.PASSWORD_NOT_MATCH); else Common.showToast(Common.KEYTEXT.BLANK_USERNAME);
},
changePassHander: function(e) {
cc.log("response changepass =", e);
if (e.getResponsecode()) {
Common.showToast(e.getMessage());
this.disappear();
} else Common.showToast(e.getMessage());
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager",
Popup: "Popup"
} ],
PopupCharging: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6ae79aInnhDf5IB0mG11NH7", "PopupCharging");
var s = e("CommonPopup");
cc.Class({
extends: s,
properties: {
tabLeftPrefab: cc.Prefab,
body: cc.Node,
_tab: 1,
subHistory: 1
},
start: function() {},
onLoad: function() {},
addTabs: function(e, t) {
this.initTabs(e, t);
},
initTabs: function(e, t) {
this._super(e, t);
},
onEvent: function(e) {
cc.log("index : ", e);
var t = this.body.getChildByName("NodeNapThe"), o = this.body.getChildByName("NodeNapSMS");
switch (e) {
case 1:
t.active = !0;
o.active = !1;
t.getComponent("NodeNapThe").initTabLeft();
break;

case 2:
t.active = !1;
o.active = !0;
o.getComponent("NodeNapSMS").initTabLeft();
}
},
cardConfigResponseHandler: function(e) {
cc.log("card config response handler:", e.toObject());
Common.providerLists = [];
if (e.getResponsecode()) for (var t = 0; t < e.getProvidersList().length; t++) {
var o = {}, s = e.getProvidersList()[t];
o.providerid = s.getProviderid();
o.providercode = s.getProvidercode();
o.providername = s.getProvidername();
o.productsList = [];
for (var r = 0; r < s.getProductsList().length; r++) {
var i = s.getProductsList()[r], n = {};
n.productid = i.getProductid();
n.parvalue = i.getParvalue();
n.cashvalue = i.getCashvalue();
n.description = i.getDescription();
n.promotion = i.getPromotion();
o.productsList.push(n);
}
Common.providerLists.push(o);
}
e.hasMessage() && "" !== e.getMessage() && Common.showToast(e.getMessage());
},
update: function(e) {},
handleMessage: function(e) {
e.response;
e.message_id;
return !1;
},
onGameEvent: function() {}
});
cc._RF.pop();
}, {
CommonPopup: "CommonPopup"
} ],
PopupGift: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d9c6f2t8zRHZo+sXkCS3+jP", "PopupGift");
var s = e("NetworkManager"), r = e("CommonPopup");
cc.Class({
extends: r,
properties: {
giftType: 1,
giftInput: cc.Node,
giftCode: cc.EditBox
},
onLoad: function() {},
start: function() {},
addTabs: function(e, t) {
this.initTabs(e, t);
},
initTabs: function(e, t) {
this._super(e, t);
},
onEvent: function(e) {
if (1 === e) {
this.tableView.active = !1;
this.giftInput.active = !0;
this.setGiftType(1);
} else if (2 === e) {
this.tableView.active = !0;
this.giftInput.active = !1;
s.getRedeemGiftCodeHistoryFromServer(0, 20);
this.setGiftType(2);
}
},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
handleMessage: function(e) {
var t = e, o = !0;
switch (t.message_id) {
case s.MESSAGE_ID.REDEEM_GIFT_CODE_HISTORY:
r = t.response;
this.getRedeemGiftCodeHistory(r);
break;

case s.MESSAGE_ID.REDEEM_GIFT_CODE:
var r = t.response;
this.getRedeemGiftCode(r);
break;

default:
o = !1;
}
return o;
},
getRedeemGiftCodeHistory: function(e) {
var t = this;
cc.log("response =", e);
if (0 !== e) if (e.getResponsecode()) {
for (var o = [], s = 0; s < e.getGiftcodesList().length; s++) {
var r = e.getGiftcodesList()[s];
o.push(r);
}
var i = o.length, n = [ "Giftcode", "Giá trị", "Ngày nhận" ], a = this._getdata(o, n, i);
t.tableView.getComponent(cc.tableView).initTableView(a.length, {
array: a,
target: this
});
} else e.hasMessage() && Common.showToast(e.getMessage());
},
getRedeemGiftCode: function(e) {
0 !== e && e.hasMessage() && Common.showToast(e.getMessage());
},
_getdata: function(e, t, o) {
var s = [], r = {};
r.gift_code = t[0];
r.value = t[1];
r.date_received = t[2];
s.push(r);
for (var i = 0; i < o; ++i) {
var n = {};
n.gift_code = e[i].getGiftcode();
n.value = e[i].getCash();
n.date_received = Common.timestampToDate(e[i].getRedeemtime());
s.push(n);
}
return s;
},
setGiftType: function(e) {
this.giftType = e;
},
onGiftSubmit: function() {
var e = this.giftCode.string;
null !== e ? s.getRedeemGiftCodeFromServer(e) : Common.showToast(Common.KEYTEXT.BLANK_USERNAME);
},
onGiftCancel: function() {
this.giftCode.string = "";
}
});
cc._RF.pop();
}, {
CommonPopup: "CommonPopup",
NetworkManager: "NetworkManager"
} ],
PopupHistory: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2131eIuoptG5ZxvymQeGivv", "PopupHistory");
var s = e("NetworkManager"), r = e("CommonPopup");
cc.Class({
extends: r,
properties: {
historyType: 1
},
onLoad: function() {},
start: function() {
cc.log("tableview =", this.tableView);
},
addTabs: function(e, t) {
this.initTabs(e, t);
},
initTabs: function(e, t) {
this._super(e, t);
},
onEvent: function(e) {
this.getLookupHistoryRequest(-1, 20, e, !0);
this.setHistoryType(e);
},
getLookupHistoryRequest: function(e, t, o, r) {
var i = [], n = new proto.BINMapFieldEntry();
n.setKey("historyType");
n.setValue(o.toString());
i.push(n);
var a = new proto.BINMapFieldEntry();
a.setKey("isCash");
a.setValue(r ? "true" : "false");
i.push(a);
s.getLookUpGameHistoryRequest(e, t, i, -1, !1);
},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
handleMessage: function(e) {
var t = e, o = !0;
switch (t.message_id) {
case s.MESSAGE_ID.LOOK_UP_GAME_HISTORY:
var r = t.response;
this.lookupGameResponseHandler(r);
break;

default:
o = !1;
}
return o;
},
pingMessageResponseHandler: function(e) {
e.getResponsecode();
},
lookupGameResponseHandler: function(e) {
var t = this;
if (0 !== e) {
cc.log("look up game history response: ", e);
e.hasMessage() && e.getMessage();
if (e.getResponsecode()) {
var o = e.getHistoriesList().length, s = Common.getHeadHistory(this.historyType), r = this._getdata(s, e.getHistoriesList(), o);
t.tableView.getComponent(cc.tableView).initTableView(r.length, {
array: r,
target: this
});
}
if (e.getArgsList().length > 0) {
var i = e.getArgsList()[0];
"totalCount" === i.getKey() && (this.totalCount = parseInt(i.getValue()));
}
}
},
_getdata: function(e, t, o) {
var s = [], r = {};
r.date_time = e[0];
r.displayName = e[1];
r.bet = e[2];
r.betWin = e[3];
r.betCard = e[4];
s.push(r);
for (var i = 0; i < o; ++i) {
var n = {};
n.date_time = Common.timestampToDate(t[i].getSixth());
n.displayName = t[i].getFirst();
n.bet = t[i].getThird();
n.betWin = t[i].getFourth();
n.betCard = t[i].getSecond();
s.push(n);
}
return s;
},
setHistoryType: function(e) {
this.historyType = e;
}
});
cc._RF.pop();
}, {
CommonPopup: "CommonPopup",
NetworkManager: "NetworkManager"
} ],
PopupIngame: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c5e172XAW9GCYrCGLQmSX6/", "PopupIngame");
e("NetworkManager");
var s = e("Popup"), r = cc.Class({
extends: s,
properties: {
titleString: cc.Sprite,
topPrefab: cc.Prefab,
scrollView: cc.ScrollView,
historyType: 1,
tableView: cc.Node,
contentMask: cc.Node,
userinfoPrefab: cc.Prefab,
list_tab: []
},
statics: {
instance: null
},
onLoad: function() {
r.instance = this;
},
setHistoryType: function(e) {
this.historyType = e;
},
lookupGameMiniPokerResponseHandler: function(e) {
if (0 !== e) {
cc.log("look up game history response: ", e);
e.hasMessage() && e.getMessage();
if (e.getResponsecode()) {
cc.log("response =", e);
switch (this.historyType) {
case 2:
case 1:
case 3:
var t = e.getHistoriesList().length, o = [ "Thời gian", "Tên", "Đặt", "Thắng", "Bộ bài" ], s = this._getdata(o, e.getHistoriesList(), t);
this.tableView.getComponent(cc.tableView).initTableView(s.length, {
array: s,
target: this
});
}
}
if (e.getArgsList().length > 0) {
var r = e.getArgsList()[0];
"totalCount" === r.getKey() && (this.totalCount = parseInt(r.getValue()));
}
}
},
_getdata: function(e, t, o) {
cc.log("val =", t);
for (var s = [], r = 0; r < o; ++r) {
var i = {};
i.date_time = Common.timestampToDate(t[r].getSixth());
i.displayName = t[r].getFirst();
i.bet = t[r].getThird();
i.betWin = t[r].getFourth();
i.betCard = t[r].getSecond();
s.push(i);
}
cc.log("array =", s);
return s;
},
init: function(e, t, o) {
for (var s = this, r = 0; r < e.length; r++) {
var i = (p = cc.instantiate(this.topPrefab)).getComponent("PopupLeftItem");
i.init(r + 1, e[r], t, o, function(e) {
s.showTab(e);
});
var n = 0, a = 0;
n = (r - e.length / 2 + .5) * p.getContentSize().width;
p.setPositionX(n);
p.setPositionY(a);
this.scrollView.content.addChild(p);
this.list_tab.push(i);
}
if ("userinfo" === t) {
this.tableView.active = !1;
this.contentMask.active = !0;
var n = this.contentMask.getPositionX(), a = this.contentMask.getPositionY(), p = cc.instantiate(this.userinfoPrefab);
p.getComponent("UserInfo").init();
this.contentMask.addChild(p);
}
},
showTab: function(e) {
cc.log("index =", e);
for (var t = 0; t < this.list_tab.length; t++) t === e ? this.list_tab[t].setActive(!0) : this.list_tab[t].setActive(!1);
},
disappear: function() {
this._super();
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager",
Popup: "Popup"
} ],
PopupMail: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1e952tB/uJHVqV1OyrlXqN0", "PopupMail");
var s = e("NetworkManager"), r = e("CommonPopup"), i = cc.Class({
extends: r,
properties: {
mailType: 1,
nodeSendAdmin: cc.Node,
title: cc.EditBox,
content: cc.EditBox,
nodeMail: cc.Prefab,
nodeMailContent: cc.Node
},
statics: {
instance: null
},
onLoad: function() {
i.instance = this;
},
start: function() {},
addTabs: function(e, t) {
this.initTabs(e, t);
},
initTabs: function(e, t) {
this._super(e, t);
},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
handleMessage: function(e) {
var t = e, o = !0;
switch (t.message_id) {
case s.MESSAGE_ID.FILTER_MAIL:
r = t.response;
this.filterEmailResponse(r);
break;

case s.MESSAGE_ID.SEND_MAIL:
r = t.response;
this.sendMailResponse(r);
break;

case s.MESSAGE_ID.DELETE_MAIL:
r = t.response;
this.deleteMailResponse(r);

case s.MESSAGE_ID.READED_MAIL:
r = t.response;
this.readMailResponse(r);
break;

case s.MESSAGE_ID.CLAIM_ATTACH_ITEM:
var r = t.response;
this.claimMailResponse(r);
}
return o;
},
onEvent: function(e) {
var t = this;
if (1 === e) {
s.getFilterMailFromServer(0, 20, -1, !1);
this.setMailType(e);
} else if (2 === e) {
cc.log("MAIL_SENT =", e);
s.getFilterMailFromServer(0, 20, -1, !0);
this.setMailType(e);
} else if (3 === e) {
t.tableView.active = !1;
t.nodeSendAdmin.active = !0;
t.nodeMailContent.active = !1;
}
},
filterEmailResponse: function(e) {
cc.log("response =", e);
var t = this;
t.tableView.active = !0;
t.nodeSendAdmin.active = !1;
t.nodeMailContent.active = !1;
t.nodeMailContent.removeAllChildren(!0);
if (0 !== e) if (e.getResponsecode()) {
for (var o, s = [], r = 0; r < e.getMailsList().length; r++) {
o = this.parseFromBinMail(e.getMailsList()[r]);
s.push(o);
}
var i = e.getMailsList().length, n = this._getdata(s, i);
this.setListMail(n);
this.reloadEmail(n);
} else Common.showToast(e.getMessage(), 2);
},
_getdata: function(e, t) {
var o = [];
cc.log("val =", e);
cc.log("num =", t);
if (null !== e) for (var s = 0; s < t; ++s) {
var r = {};
r.mail_title = e[s].getTitle();
r.mail_sender = e[s].getSenderusername();
r.mail_senttime = e[s].getSenttime();
r.mail_id = e[s].getMailid();
o.push(r);
}
return o;
},
parseFromBinMail: function(e) {
var t = new proto.BINMail();
t.setMailid(e.getMailid());
t.setSenderuserid(e.getSenderuserid());
t.setSenderusername(e.getSenderusername());
t.setRecipientuserid(e.getRecipientuserid());
t.setRecipientusername(e.getRecipientusername());
t.setTitle(e.getTitle());
t.setBody(e.getBody());
t.setExpandeddata(e.getExpandeddata());
t.setSenttime(e.getSenttime());
t.setReaded(e.getReaded());
t.setAttachitemid(e.getAttachitemid());
t.setAttachitemquatity(e.getAttachitemquatity());
t.setExpiredtime(e.getExpiredtime());
return t;
},
setMailType: function(e) {
this.mailType = e;
},
onSendAdminEvent: function() {
var e = this.title.string, t = this.content.string;
null !== e && null !== t ? s.sendMail(1e6, e, t, 0) : Common.showToast(Common.KEYTEXT.BLANK_USERNAME);
},
onCancelEvent: function() {
this.title.string = "";
this.content.string = "";
},
sendMailResponse: function(e) {
if (0 !== e && e.hasMessage()) {
Common.showToast(e.getMessage(), 3);
this.title.string = "";
this.content.string = "";
}
},
deleteMailResponse: function(e) {
e.hasMessage() && Common.showToast(e.getMessage(), 3);
},
reloadEmail: function(e) {
this.tableView.getComponent(cc.tableView).initTableView(e.length, {
array: e,
target: this
});
},
convertDataToObject: function() {},
setListMail: function(e) {
this.lstEmail = e;
},
setReadMailIndex: function(e) {
this.index = e;
},
setReadMailComponent: function(e) {
this.readMailComponent = e;
},
deleteMail: function(e) {
var t = this.lstEmail, o = t[e].mail_id, r = [];
r.push(o);
s.deleteMail(r);
t.splice(e, 1);
this.setListMail(t);
this.reloadEmail(t);
},
readMail: function(e, t) {
this.setReadMailIndex(t);
s.readMail(e, !0);
},
readMailResponse: function(e) {
if (0 !== e) {
if (e.getResponsecode() && e.hasMail()) {
var t = this.parseFromBinMail(e.getMail());
this.setReadMailComponent(t);
cc.log("binMail =", t);
this.showReadMail(t);
}
e.hasMessage() && Common.showToast(e.getMessage());
}
},
showReadMail: function(e) {
this.tableView.active = !1;
this.nodeMailContent.active = !0;
this.nodeSendAdmin.active = !1;
var t = cc.instantiate(this.nodeMail);
t.getComponent("NodeMail").init(e);
this.nodeMailContent.addChild(t);
},
claimMailResponse: function(e) {
cc.log("response claim =", e);
if (0 !== e) if (e.getResponsecode()) {
this.deleteMail(this.index);
var t = this.readMailComponent;
if (e.hasMessage() && t.getMailid() > 0 && t.getAttachitemid() > 0) if (3 === t.getAttachitemid()) Common.showToast(e.getMessage(), 3); else {
this.disappear();
Common.showToast(e.getMessage(), 3);
}
} else e.hasMessage() && Common.showToast(e.getMessage(), 3);
}
});
cc._RF.pop();
}, {
CommonPopup: "CommonPopup",
NetworkManager: "NetworkManager"
} ],
PopupMessageBox: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "db8b01ntuZKW7iOO0K7+fHm", "PopupMessageBox");
var s = e("Popup");
cc.Class({
extends: s,
properties: {
btnOK: cc.Button,
btnCancel: cc.Button,
message: cc.Label,
type: 0,
_callback: function() {}
},
onLoad: function() {},
onCallBack: function() {
this._callback();
this.disappear();
},
init: function(e, t, o) {
this.message.string = e;
switch (t) {
case 0:
this.btnCancel.node.active = !1;
this.btnOK.node.active = !0;
this.btnOK.node.setPositionX(0);
break;

case 1:
this.btnCancel.node.active = !0;
this.btnOK.node.active = !0;
this.btnOK.node.setPositionX(-83);
}
this._callback = o;
}
});
cc._RF.pop();
}, {
Popup: "Popup"
} ],
PopupSelectLine: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0b12ewgUshPdIoOq7gc/YYE", "PopupSelectLine");
var s = e("Popup");
cc.Class({
extends: s,
properties: {
item: cc.Prefab,
content: cc.Node
},
onLoad: function() {},
init: function(e) {
this.callBack = e;
this.initLine();
},
initLine: function() {
var e = this.content.getContentSize(), t = e.width / 5, o = e.height / 4;
this.list_items = [];
for (var s = 0; s < 20; s++) {
var r = cc.p(-e.width / 2 + t * (parseInt(s % 5) + .5), -o * (parseInt(s / 5) + .5)), i = cc.instantiate(this.item), n = i.getComponent("ItemSelectLine");
n.init(s + 1, function(e) {
this.callBack(Config.ON_EVENT.EVENT_SELECT_LINE, e);
}.bind(this));
i.setPosition(cc.p(r.x, r.y));
this.list_items.push(n);
this.content.addChild(i);
}
},
onLineSelected: function() {},
setDataLineWithType: function(e, t) {
this.setType(t);
this.setDataLine(e);
},
setDataLine: function(e) {
this.showLine(e);
},
showLine: function(e) {
for (var t = 0; t < this.list_items.length; t++) {
for (var o = !1, s = 0; s < e.length; s++) if (t + 1 == e[s]) {
o = !0;
break;
}
this.list_items[t].change(o);
}
},
setType: function(e) {
this.line_type = e;
},
getType: function() {
return this.line_type;
},
chonChan: function() {
this.setDataLine([ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ]);
this.callBack(Config.ON_EVENT.EVENT_SELECT_LINE_BY_TYPE, Config.SELECT_LINE_TYPE.DONG_CHAN);
},
chonLe: function() {
this.setDataLine([ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19 ]);
this.callBack(Config.ON_EVENT.EVENT_SELECT_LINE_BY_TYPE, Config.SELECT_LINE_TYPE.DONG_LE);
},
chonTatCa: function() {
this.setDataLine([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ]);
this.callBack(Config.ON_EVENT.EVENT_SELECT_LINE_BY_TYPE, Config.SELECT_LINE_TYPE.DONG_ALL);
},
chonLai: function() {
this.setDataLine([]);
this.callBack(Config.ON_EVENT.EVENT_SELECT_LINE_BY_TYPE, Config.SELECT_LINE_TYPE.CHON_LAI);
}
});
cc._RF.pop();
}, {
Popup: "Popup"
} ],
PopupSetting: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "18f89hksvpN5onLoJPevQ0+", "PopupSetting");
var s = e("Popup");
cc.Class({
extends: s,
properties: {},
onLoad: function() {}
});
cc._RF.pop();
}, {
Popup: "Popup"
} ],
PopupTaiXiuResultList: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "893af0zDMVOBakZQb8K2xiz", "PopupTaiXiuResultList");
var s = e("NetworkManager"), r = e("Popup");
cc.Class({
extends: r,
properties: {
topUserType: 1
},
onLoad: function() {
var e = [], t = new proto.BINMapFieldEntry();
t.setKey("historyType");
t.setValue("3");
e.push(t);
s.getLookUpGameHistoryRequest(0, 120, e);
},
start: function() {},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
handleMessage: function(e) {
var t = e, o = !0;
switch (t.message_id) {
case s.MESSAGE_ID.LOOK_UP_GAME_HISTORY:
var r = t.response;
cc.log("history response:", r.toObject());
break;

default:
o = !1;
}
return o;
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager",
Popup: "Popup"
} ],
PopupTaiXiuTop: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7c965+P1YBFkI6BxYffQasA", "PopupTaiXiuTop");
var s = e("NetworkManager"), r = e("CommonPopup");
cc.Class({
extends: r,
properties: {
topUserType: 1
},
onLoad: function() {},
start: function() {},
addTabs: function(e, t) {
this.initTabs(e, t);
},
initTabs: function(e, t) {
this._super(e, t);
},
onEvent: function(e) {
if (1 === e) {
this.getLookUpTopUser(Config.LookupTypeRequest.topUserDayly, 0, 10, !0);
this.setTopUserType(1);
} else if (2 === e) {
this.getLookUpTopUser(Config.LookupTypeRequest.topUserWeekly, 0, 10, !0);
this.setTopUserType(2);
}
},
getLookUpTopUser: function(e, t, o, r) {
var i = [], n = new proto.BINMapFieldEntry();
n.setKey("historyType");
n.setValue(e.toString());
i.push(n);
var a = new proto.BINMapFieldEntry();
a.setKey("isCash");
var p = r ? "true" : "false";
a.setValue(p);
i.push(a);
s.getLookUpGameHistoryRequest(t, o, i);
},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
handleMessage: function(e) {
var t = e, o = !0;
switch (t.message_id) {
case s.MESSAGE_ID.LOOK_UP_GAME_HISTORY:
var r = t.response;
this.lookupTopUser(r);
break;

default:
o = !1;
}
return o;
},
lookupTopUser: function(e) {
cc.log("rs history taixiu =", e);
var t = this;
if (0 !== e && e.getResponsecode()) {
cc.log("getHistoriesList =", e.getHistoriesList());
var o = e.getHistoriesList()[0];
cc.log("rank =", o.getFirst());
for (var s = [], r = 0; r < e.getHistoriesList().length - 2; r++) s.push(e.getHistoriesList()[r]);
var i = e.getHistoriesList().length, n = -1 != e.getHistoriesList()[i - 2].getFirst() ? e.getHistoriesList()[i - 2].getFirst() : "", a = (e.getHistoriesList()[i - 1].getFirst(), 
e.getHistoriesList()[i - 2].getFifth()), p = (e.getHistoriesList()[i - 2].getThird(), 
e.getHistoriesList()[i - 2].getFourth());
if (1 !== n) {
var l = {};
l.rank = n;
l.displayName = p;
l.betWin = a;
}
var i = s.length, u = [ "Hạng", "Tài khoản", "Tiền thắng" ], g = this._getdata(s, l, u, i);
cc.log("data =", g);
t.tableView.getComponent(cc.tableView).initTableView(g.length, {
array: g,
target: this
});
}
},
_getdata: function(e, t, o, s) {
var r = [], i = {};
i.rank = o[0];
i.displayName = o[1];
i.betWin = o[2];
r.push(i);
t && r.push(t);
for (var n = 0; n < s; ++n) {
var a = {};
a.rank = e[n].getFirst();
a.displayName = e[n].getFourth();
a.betWin = e[n].getFifth();
r.push(a);
}
return r;
},
setTopUserType: function(e) {
this.topUserType = e;
}
});
cc._RF.pop();
}, {
CommonPopup: "CommonPopup",
NetworkManager: "NetworkManager"
} ],
PopupTaiXiu: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cbc51BY5shPt60Gdt1vcOLf", "PopupTaiXiu");
var s = e("BaseScene"), r = e("NetworkManager"), i = e("Gate"), n = e("ItemChat"), a = e("TXMatch"), p = {
BET: 1,
BALANCE: 2,
RESULT: 3,
MATCH_END: 4,
PREPARE_NEW_MATCH: 5
}, l = {
TAI: 1,
XIU: 0,
OTHER: -1
};
cc.Class({
extends: s,
properties: {
tableStage: 0,
bg_dark: cc.Sprite,
btnClose: cc.Button,
taiGate: i,
xiuGate: i,
lstMatch_view: cc.Node,
money_keyboard: cc.Node,
number_keyboard: cc.Node,
total_money_tai: cc.Label,
total_money_xiu: cc.Label,
bet_money_tai: cc.Label,
bet_money_xiu: cc.Label,
total_bet_tai: cc.Label,
total_bet_xiu: cc.Label,
tai_number_user: cc.Label,
xiu_number_user: cc.Label,
session: cc.Label,
isNumber: !1,
currentBet: 0,
betState: -1,
enterRoomResponse: null,
roomIndex: -1,
lstMatch: [ a ],
currentMatch: a,
taiXiuResult: cc.Prefab,
chat_view: cc.Node,
edit_chat: cc.EditBox,
item_chat: cc.Prefab,
item_emotion: cc.Prefab,
lstMessageChat: [ n ],
bg_emotions: cc.ScrollView
},
cancel: function() {},
accept: function() {
this.getTableStage() === p.BET ? r.sendBet(this.roomIndex, this.currentBet, this.betState) : Common.showToast("Chờ ván sau đi nhé");
},
setEnterRoomResponse: function(e) {
this.roomIndex = e.getRoomplay().getRoomindex();
for (var t = 0; t < e.getArgsList().length; t++) {
var o = e.getArgsList()[t].getKey(), s = e.getArgsList()[t].getValue();
if ("currentTableStage" === o) this.setTableStage(parseInt(s)); else if ("cdTimerRemaining" === o) ; else if ("sessionId" === o) {
this.currentMatch = new a(s, 1, 1, 1);
this.session.string = s;
} else if ("resultHistorys" === o) {
for (var r = s.split("|"), i = 0; i < r.length; i++) {
var n = r[i].split("-"), p = new a(n[0], parseInt(n[1]), parseInt(n[2]), parseInt(n[3]));
this.lstMatch.push(p);
}
this.updateLstMatchView();
} else "betGateInfo" === o ? this.updateBetGateInfo(s) : "playerBetInfo" === o && this.updateUserBetLabel(s);
}
},
setTotalMoneyTaiXiu: function(e, t) {
e instanceof cc.Label && (e.string = Common.numberFormatWithCommas(t));
},
sendMessageTaiXiu: function(e) {
cc.log("message", e.string);
r.getInstantMessage(Config.SCOPE_CHAT.CHAT_ROOM, e.string, null, null, null);
e.string = "";
},
sendEmotionTaixiu: function(e) {
cc.log("emotionId", e);
r.getInstantMessage(Config.SCOPE_CHAT.CHAT_ROOM, "", null, null, e);
},
setBetMoney: function(e, t) {
cc.log("data:", Common.getCash());
this.currentBet = 0;
if ("all" === t) this.currentBet = Common.getCash(); else {
var o = parseInt(t);
this.currentBet + o <= Common.getCash() && (this.currentBet += o);
}
this.betState === l.TAI ? this.setTotalMoneyTaiXiu(this.bet_money_tai, this.currentBet) : this.betState === l.XIU && this.setTotalMoneyTaiXiu(this.bet_money_xiu, this.currentBet);
},
setBetMoneyNumber: function(e, t) {
cc.log("data:", t);
this.currentBet = 0;
if ("delete" === t) this.currentBet = 0; else if ("000" === t) 1e3 * this.currentBet <= Common.getCash() && (this.currentBet = 1e3 * this.currentBet); else {
var o = parseInt(t);
10 * this.currentBet + o <= Common.getCash() && (this.currentBet = 10 * this.currentBet + o);
}
this.betState === l.TAI ? this.setTotalMoneyTaiXiu(this.bet_money_tai, this.currentBet) : this.betState === l.XIU && this.setTotalMoneyTaiXiu(this.bet_money_xiu, this.currentBet);
},
datTai: function() {
cc.log("dat cua tai", Common.getCash());
if (this.betState !== l.TAI) {
this.betState = l.TAI;
this.bet_money_xiu.string = "Đặt xỉu";
this.bet_money_tai.string = "0";
this.currentBet = 0;
}
},
datXiu: function() {
cc.log("dat cua xiu", Common.getCash());
if (this.betState !== l.XIU) {
this.betState = l.XIU;
this.bet_money_tai.string = "Đặt tài";
this.bet_money_xiu.string = "0";
this.currentBet = 0;
}
},
onLoad: function() {
cc.log("on load tai xiu");
this.node.on("touchstart", function(e) {
return !0;
}, this.bg_dark);
this.betState = -1;
Common.setExistTaiXiu(!0);
this.lstTaiXiuResult = [];
},
start: function() {
this.current_chat_height = this.chat_view.getContentSize().height;
this.isShowEmotion = !1;
this.addChatEmotion();
},
onClose: function() {
r.requestExitRoomMessage(0);
},
onGameStatus: function(e) {
if (null !== e.data || "undefined" != typeof e.data) {
var t = r.parseFrom(e.data, e.data.byteLength);
if (t.length > 0) for (var o = 0; o < t.length; o++) {
var s = t[o];
this.handleMessage(s);
}
}
},
onChangeKeyBoard: function() {
this.number_keyboard.active = this.isNumber;
this.money_keyboard.active = !this.isNumber;
this.isNumber = !this.isNumber;
},
onDestroy: function() {
cc.log("on destroy tai xiu");
Common.setExistTaiXiu(!1);
},
setTableStage: function(e) {
this.tableStage = e;
},
getTableStage: function() {
return this.tableStage;
},
handleMessage: function(e) {
var t = this._super(e);
if (t) return !0;
t = !0;
switch (e.message_id) {
case r.MESSAGE_ID.START_MATCH:
o = e.response;
this.handleStartMatchResponseHandler(o);
break;

case r.MESSAGE_ID.MATCH_END:
o = e.response;
this.handleMatchEndResponseHandler(o);
break;

case r.MESSAGE_ID.MATCH_BEGIN:
o = e.response;
this.handleMatchBeginResponseHandler(o);
break;

case r.MESSAGE_ID.TURN:
o = e.response;
this.handleTurnResponseHandler(o);
break;

case r.MESSAGE_ID.EXIT_ROOM:
o = e.response;
this.exitRoomResponseHandler(o);
break;

case r.MESSAGE_ID.EXIT_ZONE:
this.exitZoneResponseHandler(e.response);
break;

case r.MESSAGE_ID.BET:
o = e.response;
this.betResponseHandler(o);
break;

case r.MESSAGE_ID.INSTANT_MESSAGE:
var o = e.response;
this.instantMessageResponseHandler(o);
break;

default:
t = !1;
}
return t;
},
exitZoneResponseHandler: function(e) {
cc.log("exit zone response:", e.toObject());
if (e.getResponsecode()) {
Common.setZoneId(-1);
Common.closePopup("PopupTaiXiu");
}
},
instantMessageResponseHandler: function(e) {
cc.log("instant message response:", e.toObject());
if (e.getResponsecode()) {
var t = e.hasInstantmessage() ? e.getInstantmessage() : "", o = new n();
o.emoticonId = e.getTextemoticonid();
o.messageChat = t;
o.senderUserId = e.getSenderuserid();
o.senderUserName = e.getSenderusername();
o.colorCode = e.getColorcode();
this.appendMesasgeChat(o);
}
e.hasMessage() && "" !== e.getMessage() && Common.showToast(e.getMessage(), 2);
},
appendMesasgeChat: function(e) {
var t = cc.instantiate(this.item_chat);
t.getComponent("ItemChat").init(e);
this.chat_view.addChild(t);
for (var o = this.chat_view.children, s = 0, r = 0, i = 0; i < o.length; i++) s += (n = o[i].getComponent("ItemChat").node.getContentSize().height) + 10;
for (i = 0; i < o.length; i++) {
var n = o[i].getComponent("ItemChat").node.getContentSize().height;
o[i].setPosition(cc.p(0, s - r));
r += n + 10;
}
var a = cc.size(this.chat_view.getContentSize().width, s);
a.height > 2 * this.current_chat_height && this.chat_view.children[0].removeFromParent(!0);
a.height > this.current_chat_height && this.chat_view.setContentSize(a);
},
showPopupEmotion: function() {
this.isShowEmotion = !this.isShowEmotion;
this.bg_emotions.node.active = this.isShowEmotion;
},
addChatEmotion: function() {
this.content = this.bg_emotions.content;
for (var e = cc.size(this.content.getContentSize().width, this.content.getContentSize().height), t = 0; t < 16; t++) {
var o = cc.instantiate(this.item_emotion), s = o.getComponent("ItemEmotion");
s.init(t + 1);
s.addTouch(function(e) {
this.sendEmotionTaixiu(e);
this.showPopupEmotion();
}.bind(this));
var r = s.node.getContentSize();
if (0 == t) {
e.width / 3 - r.width;
e = cc.size(e.width, 1.1 * r.height * 6);
this.content.setContentSize(e);
}
var i = parseInt(t % 3), n = parseInt(t / 3), a = (i - 1) * r.width * 1.2 - .5 * r.width, p = (-.1 - n) * r.height * 1.1;
o.setPositionX(a);
o.setPositionY(p);
this.bg_emotions.content.addChild(o);
}
},
betResponseHandler: function(e) {
cc.log("bet response:", e.toObject());
if (e.getResponsecode()) {
var t = e.getBettype();
e.getBetmoney();
if (e.getSourceuserid() === Common.getUserId()) {
this.currentBet = 0;
this.betState === l.TAI ? this.setTotalMoneyTaiXiu(this.bet_money_tai, 0) : this.betState === l.XIU && this.setTotalMoneyTaiXiu(this.bet_money_xiu, 0);
}
for (var o = 0; o < e.getArgsList().length; o++) {
var s = e.getArgsList()[o].getKey(), r = e.getArgsList()[o].getValue();
if ("betGateInfo" === s) this.updateBetGateInfo(r); else if ("totalPlayerBetGate" === s) switch (t) {
case 1:
this.total_bet_tai.string = r;
break;

case 0:
this.total_bet_xiu.string = r;
}
}
} else Common.showToast(e.getMessage());
},
exitRoomResponseHandler: function(e) {
cc.log("exit room response:", e.toObject());
e.getResponsecode();
},
handleTurnResponseHandler: function(e) {
cc.log("turn response:", e.toObject());
if (e.getResponsecode()) for (var t = 0; t < e.getArgsList().length; t++) {
var o = e.getArgsList()[t].getKey(), s = e.getArgsList()[t].getValue();
if ("tableStage" === o) {
var r = parseInt(s);
this.setTableStage(r);
r === p.BALANCE && Common.showToast("Cân cửa");
} else if ("betGateInfo" === o) this.updateBetGateInfo(s); else if ("diceValues" === o) {
if (this.getTableStage() == p.RESULT) {
var i = s.split("-").map(Number);
this.currentMatch.setResult(i[0], i[1], i[2]);
cc.log("OK");
}
} else "totalValue" === o || "playerBetInfo" === o && this.updateUserBetLabel(s);
}
},
handleStartMatchResponseHandler: function(e) {
cc.log("start match response:", e.toObject());
if (e.getResponsecode()) {
e.getCountdowntimer(), e.getArgsList();
for (var t = 0; t < e.getArgsList().length; t++) {
var o = e.getArgsList()[t].getKey(), s = e.getArgsList()[t].getValue();
if ("sessionId" === o) {
this.currentMatch.setSestionID(s);
this.session.string = s;
}
}
Common.showToast(e.getMessage());
}
},
handleMatchEndResponseHandler: function(e) {
cc.log("match end response:", e.toObject());
if (e.getResponsecode()) {
this.setTotalMoneyTaiXiu(this.total_money_tai, 0);
this.setTotalMoneyTaiXiu(this.total_money_xiu, 0);
this.setTotalMoneyTaiXiu(this.total_bet_tai, 0);
this.setTotalMoneyTaiXiu(this.total_bet_xiu, 0);
this.setTotalMoneyTaiXiu(this.tai_number_user, 0);
this.setTotalMoneyTaiXiu(this.xiu_number_user, 0);
this.lstMatch.push(this.currentMatch.duplicate());
this.lstMatch.length > 16 && this.lstMatch.shift();
this.updateLstMatchView();
}
e.hasMessage() && "" !== e.getMessage() && Common.showToast(e.getMessage());
},
handleMatchBeginResponseHandler: function(e) {
cc.log("match begin response:", e.toObject());
if (e.getResponsecode()) {
this.setTableStage(p.BET);
Common.showToast("Bat đầu đặt cược");
}
},
onGameEvent: function() {
var e = this;
r.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
updateBetGateInfo: function(e) {
for (var t = e.split(","), o = 0; o < t.length; o++) {
var s = t[o].split("-").map(Number);
switch (s[0]) {
case 1:
this.setTotalMoneyTaiXiu(this.total_money_tai, s[1]);
this.setTotalMoneyTaiXiu(this.tai_number_user, s[2]);
break;

case 0:
this.setTotalMoneyTaiXiu(this.total_money_xiu, s[1]);
this.setTotalMoneyTaiXiu(this.xiu_number_user, s[2]);
}
}
},
updateUserBetLabel: function(e) {
for (var t = e.split(","), o = 0; o < t.length; o++) {
var s = t[o].split("-").map(Number);
switch (s[0]) {
case 1:
this.total_bet_tai.string = s[1];
break;

case 0:
this.total_bet_xiu.string = s[1];
}
}
},
updateLstMatchView: function() {
cc.log("OK");
for (var e = 0; e < this.lstMatch.length; e++) if (this.lstTaiXiuResult.length < 16) {
var t = cc.instantiate(this.taiXiuResult);
(o = t.getComponent("TaiXiuResult")).initNumber(this.lstMatch[e].sum());
o.initResult(this.lstMatch[e].sum() >= 11);
t.setPosition((e - this.lstMatch.length / 2) * o.node.getContentSize().width * 1.2, 0);
this.lstMatch_view.addChild(t);
this.lstTaiXiuResult.push(o);
} else {
var o = this.lstTaiXiuResult[e];
o.initNumber(this.lstMatch[e].sum());
o.initResult(this.lstMatch[e].sum() >= 11);
}
},
openRulesPopup: function() {
Common.openRules();
},
openTopUserPopup: function() {
var e = [ "Theo ngày", "Theo tuần" ];
Common.showPopup(Config.name.POPUP_TAIXIU_TOP, function(t) {
t.addTabs(e, 1);
t.appear();
});
},
openBetHistoryPopup: function() {
Common.showPopup(Config.name.POPUP_TAIXIU_BET_HISTORY, function(e) {
e.appear();
});
},
openResultList: function() {
Common.showPopup(Config.name.POPUP_TAIXIU_RESULT_LIST, function(e) {});
}
});
cc._RF.pop();
}, {
BaseScene: "BaseScene",
Gate: "Gate",
ItemChat: "ItemChat",
NetworkManager: "NetworkManager",
TXMatch: "TXMatch"
} ],
PopupTaixiuBetHistory: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "dda77pVyK1IoLf+6xOVMSXM", "PopupTaixiuBetHistory");
var s = e("NetworkManager"), r = e("Popup");
cc.Class({
extends: r,
properties: {
tableView: cc.Node
},
onLoad: function() {
this.getLookUpGameHistory(0, Config.NUM_LOAD.ITEM_PAGE, !0, 2, !1);
},
getLookUpGameHistory: function(e, t, o, r, i) {
var n = [], a = new proto.BINMapFieldEntry();
a.setKey("historyType");
a.setValue(Config.LookupTypeRequest.userBetHist.toString());
n.push(a);
var p = new proto.BINMapFieldEntry();
p.setKey("isCash");
p.setValue(o ? "true" : "false");
n.push(p);
s.getLookUpGameHistoryRequest(e, t, n, r, i);
},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
handleMessage: function(e) {
var t = e, o = !0;
switch (t.message_id) {
case s.MESSAGE_ID.LOOK_UP_GAME_HISTORY:
var r = t.response;
this.lookupGameHistoryResponse(r);
break;

default:
o = !1;
}
return o;
},
lookupGameHistoryResponse: function(e) {
cc.log("response bet taixiu =", e);
var t = this;
if (0 !== e && e.getResponsecode()) {
var o = e.getHistoriesList().length, s = Common.getHeadHistory(1), r = this._getdata(s, e.getHistoriesList(), o);
cc.log("data bet taixiu =", r);
t.tableView.getComponent(cc.tableView).initTableView(r.length, {
array: r,
target: this
});
}
},
_getdata: function(e, t, o) {
var s = [], r = {};
r.section = e[0];
r.betTime = e[1];
r.bigBet = e[2];
r.smallBet = e[3];
r.bigRefund = e[4];
r.smallRefund = e[5];
r.result = e[6];
r.totalWin = e[7];
s.push(r);
for (var i = 0; i < o; ++i) {
var n = {};
n.section = t[i].getFirst();
n.betTime = Common.timestampToDate(t[i].getSecond());
n.bigBet = t[i].getThird();
n.smallBet = t[i].getFourth();
n.bigRefund = t[i].getFifth();
n.smallRefund = t[i].getSixth();
n.result = t[i].getEighth();
n.totalWin = t[i].getSeventh();
s.push(n);
}
return s;
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager",
Popup: "Popup"
} ],
PopupThreeCardHistory: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7d32cp2UZ5IqaajbH90eMMe", "PopupThreeCardHistory");
var s = e("PopupHistory");
cc.Class({
extends: s,
properties: {},
start: function() {
var e = [ "Lịch sử quay", "Lịch sử nổ hũ", "Top cao thủ" ];
this.addTabs(e);
},
addTabs: function(e) {
this._super(e);
},
onEvent: function(e) {
cc.log("call request history at index = ", e);
}
});
cc._RF.pop();
}, {
PopupHistory: "PopupHistory"
} ],
PopupUserInfo: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "16babYXR8hJxZ0dXR0gzrjI", "PopupUserInfo");
var s = e("NetworkManager"), r = e("CommonPopup");
cc.Class({
extends: r,
properties: {
userInfoPrefab: cc.Prefab,
tabLeftPrefab: cc.Prefab,
contentRight: cc.Node,
tabLeftNode: cc.Node,
_tab: 1,
subHistory: 1
},
onLoad: function() {},
start: function() {},
addTabs: function(e, t) {
this.initTabs(e, t);
},
initTabs: function(e, t) {
this._super(e, t);
},
onEvent: function(e) {
var t = this;
if (1 === e) {
this.tableView.active = !0;
this.tabLeftNode.active = !1;
this.contentRight.active = !1;
var o = Common.getUserId();
s.getViewUserInfoFromServer(o);
this.setTab(1);
} else if (2 === e) {
this.tableView.active = !1;
this.tabLeftNode.active = !0;
this.contentRight.active = !0;
var r = [ "Dòng Mon", "Nạp Mon", "Giao Dịch" ], i = cc.instantiate(this.tabLeftPrefab);
i.getComponent("UITabLeft").setTab(r, 1, function(e) {
t.onLeftEvent(e);
});
this.tabLeftNode.addChild(i);
this.setTab(2);
} else 3 === e && this.setTab(3);
},
onLeftEvent: function(e) {
s.getLookupMoneyHistoryMessage(-1, 20, e);
this.setSubHistory(e);
},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
update: function(e) {
this.onGameEvent();
},
handleMessage: function(e) {
var t = e, o = !0;
switch (t.message_id) {
case s.MESSAGE_ID.VIEW_USER_INFO:
r = t.response;
this.viewUserInfoFromServer(r);
break;

case s.MESSAGE_ID.USER_VERIFY:
r = t.response;
break;

case s.MESSAGE_ID.LOOK_UP_MONEY_HISTORY:
var r = t.response;
this.lookupMoneyHistoryResponse(r);
break;

default:
o = !1;
}
return o;
},
viewUserInfoFromServer: function(e) {
var t = this;
if (0 !== e) {
if (e.getResponsecode() && e.hasUserinfo()) {
var o = e.getUserinfo(), s = o.getAvatarid();
s < 1e5 && (s = 0);
var r = o.getUserid(), i = o.getLevel().getLevel(), n = o.getDisplayname(), a = o.getCash(), p = null;
o.getUserid() === Common.getUserId() && (p = Common.getPhoneNumber());
var l = o.getTrustedindex(), u = o.getTotalmatch(), g = o.getTotalwin(), d = o.getTotalmatch() - o.getTotalwin(), c = cc.instantiate(this.userInfoPrefab);
c.getComponent("UserInfo").init("", n, i, r, p, l, u, g, d, a);
t.tableView.addChild(c);
}
if (e.hasMessage()) {
var h = e.getMessage();
Common.showToast(h);
}
}
},
lookupMoneyHistoryResponse: function(e) {
if (0 !== e) {
if (e.getResponsecode()) {
for (var t = [], o = 0; o < e.getMoneylogsList().length; o++) t.push(e.getMoneylogsList()[o]);
this.loadMoneyLogsHistory(t);
}
e.hasMessage() && Common.showToast(e.getMessage(), 2);
}
},
loadMoneyLogsHistory: function(e) {
var t = this, o = e.length, s = [ "Thời gian", "Phát sinh", "Số dư", "Mô tả" ];
1 === this.subHistory ? s = [ "Thời gian", "Phát sinh", "Số dư", "Mô tả" ] : 2 === this.subHistory ? s = [ "Thời gian", "Mon nạp", "Số dư" ] : 1 === this.subHistory && (s = [ "Thời gian", "Loại thẻ", "Thông tin", "Trạng thái" ]);
var r = this._getdata(e, s, o);
t.contentRight.getComponent(cc.tableView).initTableView(r.length, {
array: r,
target: this
});
},
setTab: function(e) {
this._tab = e;
},
_getdata: function(e, t, o) {
var s = [], r = {};
if (1 === this.subHistory) {
r.date_time = t[0];
r.change_money = t[1];
r.current_money = t[2];
r.description = t[3];
} else if (2 === this.subHistory) {
r.date_time = t[0];
r.mon_charge = t[1];
r.current_money = t[2];
} else if (1 === this.subHistory) {
r.date_time = t[0];
r.type_card = t[1];
r.info = t[2];
r.status = t[3];
}
s.push(r);
if (null !== e) for (var i = 0; i < o; ++i) {
var n = {};
if (1 === this.subHistory) {
n.date_time = Common.timestampToDate(e[i].getInsertedtime());
n.change_money = e[i].getChangemoney();
n.current_money = e[i].getCurrentmoney();
n.description = e[i].getDescription();
} else if (2 === this.subHistory) {
n.date_time = Common.timestampToDate(e[i].getInsertedtime());
n.mon_charge = e[i].getChangemoney();
n.current_money = e[i].getCurrentmoney();
} else if (1 === this.subHistory) {
n.date_time = Common.timestampToDate(e[i].getInsertedtime());
n.type_card = e[i].getTransactiontype();
n.info = e[i].getLogstamp();
n.status = e[i].getDescription();
}
s.push(n);
}
return s;
},
setSubHistory: function(e) {
this.subHistory = e;
}
});
cc._RF.pop();
}, {
CommonPopup: "CommonPopup",
NetworkManager: "NetworkManager"
} ],
PopupWebview: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5a20fa4Wb9OLIW0m1CtV3xJ", "PopupWebview");
var s = e("CommonPopup");
cc.Class({
extends: s,
properties: {
webViewUrl: cc.String
},
onLoad: function() {},
start: function() {},
addTabs: function(e, t) {
this.initTabs(e, t);
},
initTabs: function(e, t) {
this._super(e, t);
},
onEvent: function(e) {
var t = [ Config.TAG_GAME_ITEM.MINI_POKER, Config.TAG_GAME_ITEM.MINI_BACAY, Config.TAG_GAME_ITEM.TAIXIU ], o = this.tableView.getComponent(cc.WebView);
o || (o = this.tableView.addComponent(cc.WebView));
o.node.color = cc.color(0, 0, 0, 255);
o.url = this.webViewUrl + t[e - 1];
}
});
cc._RF.pop();
}, {
CommonPopup: "CommonPopup"
} ],
Popup: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d08f8DMnVBEI6k5obLcxn3Y", "Popup");
cc.Class({
extends: cc.Component,
properties: {
bg_dark: cc.Sprite,
background: cc.Sprite,
exit: cc.Button
},
onLoad: function() {
this.node.on("touchstart", function(e) {
return !0;
}, this.bg_dark);
},
disappear: function() {
var e = this.name, t = cc.callFunc(function() {
Common.closePopup(e);
}, this);
this.bg_dark.node.runAction(cc.fadeOut(.1));
var o = cc.scaleTo(.15, .5).easing(cc.easeBackIn()), s = cc.fadeOut(.15), r = cc.spawn(o, s);
this.background.node.runAction(cc.sequence(r, t));
},
setNamePopup: function(e) {
this.name = e;
},
appear: function() {
cc.log("appear popup");
var e = this.background, t = this;
this.node.on("touchstart", function(o, s) {
var r = e.node.convertToNodeSpace(o.getLocation()), i = e.spriteFrame.getRect();
if (!cc.rectContainsPoint(i, r)) {
t.disappear();
return !0;
}
return !1;
}, e);
this.bg_dark.node.runAction(cc.fadeTo(.15, 150));
this.background.node.setScale(.7);
var o = cc.scaleTo(.2, 1).easing(cc.easeBackOut());
this.background.node.runAction(cc.sequence(o, cc.callFunc(function() {}, this)));
}
});
cc._RF.pop();
}, {} ],
ProviderItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "b991divrLBLfI0eIA9xpyPa", "ProviderItem");
cc.Class({
extends: cc.Component,
properties: {
logoProvider: cc.Button
},
onLoad: function() {},
init: function(e, t) {
cc.log("tag =", t);
var o = "resources/common/popup/popup_ingame/popup_doithuong_vt_off.png";
"Viettel" === e ? o = "resources/common/popup/popup_ingame/popup_doithuong_vt_off.png" : "Mobifone" === e ? o = "resources/common/popup/popup_ingame/popup_doithuong_mbf_off.png" : "Vinaphone" === e ? o = "resources/common/popup/popup_ingame/popup_doithuong_vnf_off.png" : "MegaCard" === e ? o = "resources/common/popup/popup_ingame/popup_doithuong_vt_off.png" : "ZING" === e ? o = "resources/common/popup/popup_ingame/popup_doithuong_vt_off.png" : "BIT" === e && (o = "resources/common/popup/popup_ingame/popup_doithuong_vt_off.png");
var s = cc.url.raw(o), r = cc.textureCache.addImage(s);
this.logoProvider.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(r);
this.logoProvider.getComponent(cc.Button).node._tag = t;
},
clickProvider: function(e) {
cc.log("tag =", e.target._tag);
}
});
cc._RF.pop();
}, {} ],
SmsItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "dbc7ff273FKP7kvOMcZSC3b", "SmsItem");
cc.Class({
extends: cc.Component,
properties: {
lblParValue: cc.Label,
lblCashValue: cc.Label
},
init: function(e, t, o, s) {
this.cashValue = t;
this.parValue = e;
this.lblParValue.string = Common.numberFormatWithCommas(e);
this.lblCashValue.string = Common.numberFormatWithCommas(t);
this.syntax = o;
this.number = s;
},
smsEvent: function() {
cc.log("sms event:");
var e = this;
Common.showPopup(Config.name.POPUP_MESSAGE_BOX, function(t) {
t.init("Soạn " + e.syntax + " đến " + e.number + " để nhận được " + e.cashValue + " BIT", Config.COMMON_POPUP_TYPE.MESSAGE_BOX.CONFIRM_TYPE, function() {
cc.log("call back");
});
t.appear();
});
}
});
cc._RF.pop();
}, {} ],
TXMatch: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a074fC2Oj1OKaysq8bWbV6W", "TXMatch");
var s = cc.Class({
properties: {
sestionID: 0,
first: 0,
second: 0,
third: 0
},
ctor: function(e, t, o, s) {
this.sestionID = e;
this.first = t;
this.second = o;
this.third = s;
},
setSestionID: function(e) {
this.sestionID = e;
},
setResult: function(e, t, o) {
this.first = e;
this.second = t;
this.third = o;
},
sum: function() {
return this.first + this.second + this.third;
},
duplicate: function() {
return new s(this.sestionID, this.first, this.second, this.third);
}
});
cc._RF.pop();
}, {} ],
TabItem: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "cc0feqit4RG3ZvmNVZiCCK6", "TabItem");
cc.Class({
extends: cc.Component,
properties: {
title: cc.Label
},
init: function(e, t, o) {
this.callback = o;
this.tag = t;
this.title.string = e;
},
touchEvent: function(e) {
this.callback(this.tag);
}
});
cc._RF.pop();
}, {} ],
TaiXiuResult: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8d491UTL31GV6MZbj5N8nmJ", "TaiXiuResult");
cc.Class({
extends: cc.Component,
properties: {
list_frame: [ cc.SpriteFrame ],
number: cc.Label
},
initResult: function(e) {
this.node.getComponent(cc.Sprite).spriteFrame = e ? this.list_frame[0] : this.list_frame[1];
},
initNumber: function(e) {
cc.log("number : ", e);
this.number.string = e;
}
});
cc._RF.pop();
}, {} ],
ThreeCard: [ function(e, t, o) {
"use strict";
function s(e, t, o) {
t in e ? Object.defineProperty(e, t, {
value: o,
enumerable: !0,
configurable: !0,
writable: !0
}) : e[t] = o;
return e;
}
cc._RF.push(t, "0e13dxGd+9OFKjEHr3SXHmG", "ThreeCard");
var r, i = e("NetworkManager"), n = e("BaseScene"), a = cc.Class((r = {
extends: n,
properties: {
bg: cc.Sprite,
cardPrefab: cc.Prefab,
toastPrefab: cc.Prefab,
cardView: cc.Mask,
userMoney: cc.Label,
moneyBet: cc.Label,
moneyJar: cc.Label,
roomName: cc.Sprite,
fastSpinToggle: cc.Toggle,
autoSpinToggle: cc.Toggle,
isFinishSpin: !0,
isRun: !1,
updateMoneyResponse: [],
enterZoneResponse: [],
enterRoomResponse: [],
isUpdateMoney: !1,
nohuPrefab: cc.Prefab,
isBreakJar: !1,
bet: 0,
jarType: 1,
isRequestJar: !1,
list_item: [],
list_recent_values: [],
stepCard: 9,
list_recent_value: null,
number: 3,
time_move: 1
},
statics: {
instance: null
},
exitRoom: function() {
i.requestExitRoomMessage(0);
},
onLoad: function() {
this.userMoney.string = Common.numberFormatWithCommas(Common.getCash());
a.instance = this;
this.initFirstCard();
this.schedule(this.requestJar, 5);
Common.setMiniThreeCardsSceneInstance(cc.director.getScene());
},
onGameEvent: function() {
var e = this;
i.checkEvent(function(t) {
return e.handleMessage(t);
});
},
initFirstCard: function() {
var e = Common.genRandomCardNumber(null, this.stepCard, this.number), t = Common.genArrayToMultiArray(e, this.stepCard, this.number);
this.list_recent_value = Common.create2DArray(this.stepCard);
for (var o = 0; o < this.stepCard; o++) for (var s = 0; s < this.number; s++) {
var r = cc.instantiate(this.cardPrefab), i = (s - 1) * r.getContentSize().width, n = (o - 1) * r.getContentSize().height;
r.getComponent("CardItem").replaceCard(t[o][s]);
r.setPositionY(n);
r.setPositionX(i);
this.list_item.push(r);
this.cardView.node.addChild(r);
this.list_recent_values.push(t[o][s]);
}
this.list_recent_value = t;
},
initDataFromLoading: function(e, t) {
this.setEnterZoneResponse(e);
Common.setMiniGameZoneId(e.getZoneid());
this.setEnterRoomResponse(t);
this.init(t);
},
init: function(e) {
var t = e.getRoomplay();
this.roomIndex = t.getRoomindex();
if (e.getArgsList().length > 0) {
var o = e.getArgsList()[0];
"initValue" === o.getKey() && this.initValue(o.getValue());
}
},
update: function(e) {
this.handleAutoSpin();
this.onGameEvent();
},
onDestroy: function() {
cc.log("on destroy");
this.unscheduleAllCallbacks();
}
}, s(r, "onGameEvent", function() {
var e = this;
i.checkEvent(function(t) {
return e.handleMessage(t);
});
}), s(r, "quayEvent", function() {
cc.instantiate(this.toastPrefab).getComponent("ToastScripts");
var e = Common.getCash(), t = this.getBetMoney();
cc.log("betMoney =", t);
if (t > e) {
o = "Bạn không có đủ tiền!";
Common.showToast(o);
} else if (!this.autoSpinToggle.isChecked) if (this.isRun) {
var o = "Xin vui lòng đợi!";
Common.showToast(o);
} else this.getTurnMiniThreeCardsRequest(this.calculateTurnType());
}), s(r, "getTurnMiniThreeCardsRequest", function(e) {
this.isRun = !0;
var t = [], o = new proto.BINMapFieldEntry();
o.setKey("turnSlotType");
o.setValue(e.toString());
t.push(o);
i.getTurnMessageFromServer(0, t);
}), s(r, "exitRoomResponsehandler", function(e) {
cc.log("exit room response handler:", e.toObject());
e.getResponsecode();
e.hasMessage();
}), s(r, "exitZoneResponseHandler", function(e) {
cc.log("exit zone response handler:", e.toObject());
if (e.getResponsecode()) {
Common.setZoneId(-1);
cc.director.loadScene("Lobby");
}
e.hasMessage() && e.getMessage();
}), s(r, "handleMessage", function(e) {
var t = this._super(e);
if (t) return !0;
t = !0;
switch (e.message_id) {
case i.MESSAGE_ID.UPDATE_MONEY:
o = e.response;
this.updateMoneyMessageResponseHandler(o);
break;

case i.MESSAGE_ID.MATCH_END:
this.matchEndResponseHandler(e.response);
break;

case i.MESSAGE_ID.EXIT_ROOM:
o = e.response;
this.exitRoomResponsehandler(o);
break;

case i.MESSAGE_ID.EXIT_ZONE:
o = e.response;
this.exitZoneResponseHandler(o);
break;

case i.MESSAGE_ID.JAR:
var o = e.response;
this.jarResponseHandler(o);
break;

default:
t = !1;
}
return t;
}), s(r, "updateMoneyMessageResponseHandler", function(e) {
if (e.getResponsecode()) {
this.setBinUpdateMoney(e);
this.removeTurnUpdateMoney();
}
}), s(r, "setBinUpdateMoney", function(e) {
this.updateMoneyResponse = e;
}), s(r, "getBINUpdateMoneyResponse", function() {
return this.updateMoneyResponse;
}), s(r, "setEnterZoneResponse", function(e) {
this.enterZoneResponse = e;
}), s(r, "getEnterZoneResponse", function() {
return this.enterZoneResponse;
}), s(r, "setEnterRoomResponse", function(e) {
this.enterRoomResponse = e;
}), s(r, "getEnterRoomResponse", function() {
return this.enterRoomResponse;
}), s(r, "removeTurnUpdateMoney", function() {
var e = this.getBINUpdateMoneyResponse();
cc.log("updateMoneyResponse =", e.getMoneyboxesList());
if (e.getResponsecode()) for (var t = 0; t < e.getMoneyboxesList().length; t++) {
var o = e.getMoneyboxesList()[t];
if ("miniBacaySpin" === o.getReason()) {
var s = o.getCurrentmoney();
Common.setCash(s);
this.userMoney.string = Common.numberFormatWithCommas(s);
}
}
}), s(r, "matchEndResponseHandler", function(e) {
if (e.getResponsecode()) {
if (e.getArgsList().length > 0) for (var t = 0; t < e.getArgsList().length; t++) if ("currentCards" === e.getArgsList()[t].getKey()) {
var o = e.getArgsList()[t].getValue().split(",").map(Number);
this.implementSpinMiniThreeCards(o, e);
}
} else {
this.isRun = !1;
this.autoSpinToggle.isChecked = !1;
}
}), s(r, "implementSpinMiniThreeCards", function(e, t) {
cc.log("carx =", e);
var o = t.getTextemoticonsList()[0];
this.isFinishSpin = !1;
this.isBreakJar = 54 === o.getEmoticonid();
var s = Common.genRandomCardNumber(e, this.stepCard, this.number), r = Common.genArrayToMultiArray(s, this.stepCard, this.number);
cc.log("item value =", r);
cc.log("stepCard =", this.stepCard);
r[this.stepCard - 2] = e;
if (r.length * this.number == this.list_item.length) {
for (g = 0; g < this.list_item.length; g++) {
var i = parseInt(g / this.number), n = parseInt(g % this.number);
if (g < 3 * this.number) {
var a = this.stepCard - (3 - i), p = n;
this.list_item[g].getComponent("CardItem").replaceCard(this.list_recent_value[a][p]);
}
var l = (n - 1) * this.list_item[g].getContentSize().width, u = (i - 1) * this.list_item[g].getContentSize().height;
this.list_item[g].setPositionX(l);
this.list_item[g].setPositionY(u);
}
this.list_recent_value = r;
for (var g = 0; g < this.list_item.length; g++) {
var i = parseInt(g / this.number), n = parseInt(g % this.number), d = this.list_item[g], c = r[i][n];
g >= 3 * this.number && d.getComponent("CardItem").replaceCard(c);
var h = d.getContentSize().height, f = cc.moveBy(.2, cc.p(0, .25 * h)), y = cc.moveBy(.15, cc.p(0, .25 * h)), B = cc.moveBy(this.time_move, cc.p(0, -(this.stepCard - 3) * h - .5 * h)), I = cc.delayTime(.3 * n);
if (g == this.list_item.length - 1) {
var M = t.getTextemoticonsList()[0], R = M.getEmoticonid(), N = M.getMessage(), m = this.getBINUpdateMoneyResponse(), F = cc.callFunc(function() {
this.handleRanking(R, N, m);
}, this), b = cc.callFunc(function() {
this.isBreakJar || (this.isFinishSpin = !0);
}, this);
d.runAction(cc.sequence(I, f, B, y, F, cc.delayTime(2), b, null));
} else d.runAction(cc.sequence(I, f, B, y));
}
}
}), s(r, "onDestroy", function() {
this.unscheduleAllCallbacks();
}), s(r, "_onDealEnd", function() {
cc.log("run action");
}), s(r, "handleAutoSpin", function() {
if (this.autoSpinToggle.isChecked && !this.isRun && this.isFinishSpin) {
cc.instantiate(this.toastPrefab).getComponent("ToastScripts");
var e = Common.getCash(), t = this.getBetMoney();
cc.log("betMoney =", t);
if (t > e) {
Common.showToast("Bạn không có đủ tiền!");
this.autoSpinToggle.isChecked = !1;
return;
}
this.getTurnMiniThreeCardsRequest(this.calculateTurnType());
}
}), s(r, "handleRanking", function(e, t, o) {
if (54 !== e) if (72 !== e) {
this.isUpdateMoney = !1;
cc.log("mess =", t);
var s = new cc.Node(t);
s.parent = this.node;
var r = s.addComponent(cc.Label);
r.string = t;
r.node.color = cc.color(248, 213, 82, 255);
r.fontSize = 60;
r.lineHeight = 70;
var i = s.addComponent(cc.LabelOutline);
i.color = new cc.Color(.5, .3, .7, 1);
i.width = 3;
var n = cc.fadeOut(1), a = cc.callFunc(function() {
for (var e = 0; e < o.getMoneyboxesList().length; e++) {
var t = new cc.Node();
t.parent = this.node;
var s = o.getMoneyboxesList()[e];
if (s.getDisplaychangemoney() > 0) {
this.isUpdateMoney = !0;
var r = t.addComponent(cc.Label);
r.string = "+" + s.getDisplaychangemoney().toString();
r.node.color = cc.color(248, 213, 82, 255);
r.fontSize = 60;
r.lineHeight = 70;
var i = t.addComponent(cc.LabelOutline);
i.color = new cc.Color(.5, .3, .7, 1);
i.width = 3;
var n = cc.fadeOut(1.5);
r.node.runAction(cc.sequence(cc.moveBy(.5, cc.p(0, 20)), cc.delayTime(.25), cc.spawn(cc.moveBy(1, cc.p(0, 20)), n, null), cc.removeSelf(), null));
}
}
}, this), p = cc.callFunc(function() {
this.isUpdateMoney && this.setOriginMoney();
this.isRun = !1;
}, this);
r.node.runAction(cc.sequence(cc.moveBy(.5, cc.p(0, 50)), a, cc.spawn(cc.moveBy(1, cc.p(0, 50)), n, null), p, cc.removeSelf(), null));
} else {
this.setOriginMoney();
this.isRun = !1;
} else {
this.showNoHu();
this.isRun = !1;
}
}), s(r, "setOriginMoney", function() {
var e = this.getBINUpdateMoneyResponse();
if (0 !== e) for (var t = 0; t < e.getMoneyboxesList().length; t++) {
var o = e.getMoneyboxesList()[t];
if (o.getDisplaychangemoney() > 0) {
var s = Common.getUserInfo();
if (o.getUserid() === s.userid) {
var r = o.getCurrentmoney();
Common.setCash(r);
this.userMoney.string = Common.numberFormatWithCommas(r);
}
}
}
this.isRun = !1;
}), s(r, "jarResponseHandler", function(e) {
cc.log("jarResponseHandler = ", e);
if (e.getResponsecode()) {
var t = 0, o = this.jarValue;
this.jarValue = e.getJarvalue();
if (e.getArgsList().length > 0) {
var s = e.getArgsList()[0];
"jarType" === s.getKey() && (t = parseInt(s.getValue().toString()));
}
if (t === this.calculateTurnType()) {
this.jarType === t ? Common.updateMoney(this.moneyJar, o, o, this.jarValue) : this.showJarValue(this.jarValue);
this.jarType = t;
}
}
e.hasMessage() && !e.getMessage() && Common.showToast(e.getMessage());
this.isRequestJar = !1;
}), s(r, "getAutoSpin", function() {
this.autoSpinToggle.isChecked = !this.autoSpinToggle.isChecked;
}), s(r, "showNoHu", function() {
cc.log("showNoHu");
var e = cc.instantiate(this.nohuPrefab).getComponent("Nohu");
e.playAnim();
var t = new cc.Node();
t.parent = this.bg.node;
t.addChild(e.node);
var o = cc.callFunc(function() {
this.setOriginMoney();
this.isBreakJar = !1;
}, this);
e.node.runAction(cc.sequence(cc.delayTime(2), o, cc.delayTime(1), cc.fadeOut(1), cc.removeSelf(), null));
}), s(r, "initValue", function(e) {
var t = JSON.parse(e);
cc.log("results =", t);
this.lbl_moneys = t.turnValueCash;
cc.log("lbl_moneys =", this.lbl_moneys);
var o = t.jarValue;
this.showJarValue(o);
}), s(r, "showJarValue", function(e) {
this.jarValue = e;
var t = Common.numberFormatWithCommas(this.jarValue);
cc.log("number_cash =", t);
this.moneyJar.string = t;
}), s(r, "getBetMoney", function() {
var e = this.getEnterRoomResponse().getArgsList()[0], t = null;
"initValue" === e.getKey() && (t = e.getValue());
var o = this.getKeyBet();
return JSON.parse(t).turnValueCash[o];
}), s(r, "calculateTurnType", function() {
return this.getKeyBet() + 1;
}), s(r, "setKeyBet", function(e) {
this.bet = e;
}), s(r, "getKeyBet", function() {
return this.bet;
}), s(r, "betEvent", function() {
var e = this.getKeyBet();
0 === e ? this.setKeyBet(1) : 1 === e ? this.setKeyBet(2) : 2 === e && this.setKeyBet(0);
this.moneyBet.string = this.getBetMoney();
this.requestJar();
}), s(r, "requestJar", function() {
if (!this.isRequestJar) {
this.isRequestJar = !0;
i.getJarRequest(Common.getMiniGameZoneId(), this.calculateTurnType());
}
}), s(r, "showSpin", function() {
var e = [ "Lịch sử quay", "Lịch sử nổ hũ", "Top cao thủ" ];
Common.showPopup(Config.name.POPUP_HISTORY, function(t) {
t.addTabs(e, 1);
t.appear();
});
}), s(r, "showTopUser", function() {
var e = [ "Lịch sử quay", "Lịch sử nổ hũ", "Top cao thủ" ];
Common.showPopup(Config.name.POPUP_HISTORY, function(t) {
t.addTabs(e, 3);
t.appear();
});
}), s(r, "openSettingPopup", function() {
Common.showPopup(Config.name.POPUP_SETTING, function(e) {
e.appear();
});
}), s(r, "openRulesPopup", function() {
Common.openRules();
}), r));
cc._RF.pop();
}, {
BaseScene: "BaseScene",
NetworkManager: "NetworkManager"
} ],
ToastScripts: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f4ec39II21JW4LEMEHo+V9J", "ToastScripts");
cc.Class({
extends: cc.Component,
properties: {
bg_toast: {
default: null,
type: cc.Sprite
},
lbl_toast: {
default: null,
type: cc.Label
}
},
onLoad: function() {},
showToast: function(e) {
cc.log("strMess =", e);
this.bg_toast.node.active = !0;
this.lbl_toast.node.active = !0;
this.lbl_toast.string = e;
},
closeToast: function() {
this.bg_toast.node.active = !1;
this.lbl_toast.node.active = !1;
}
});
cc._RF.pop();
}, {} ],
Toast: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1bce3sgRpdB6avLocL4nb7b", "Toast");
cc.Class({
extends: cc.Component,
properties: {
lbl_body: cc.RichText,
bg_toast: cc.Sprite,
maxWidth: 36
},
loadMessage: function(e, t) {
var o = this;
cc.log("DELAY : ", t);
cc.callFunc(function() {}, this);
o.node.stopAllActions();
o.node.setOpacity(0);
var s = cc.sequence(cc.fadeIn(.1), cc.delayTime(t), cc.fadeOut(.5));
o.node.runAction(s);
if (e.length > this.maxWidth) {
o.lbl_body.string = Common.wordWrap(e, this.maxWidth);
o.bg_toast.node.setContentSize(cc.size(1.09 * o.lbl_body.node.getContentSize().width, 1.35 * o.lbl_body.node.getBoundingBox().height));
} else {
o.lbl_body.string = e;
o.bg_toast.node.setContentSize(cc.size(1.15 * o.lbl_body.node.getContentSize().width * e.length / this.maxWidth, 1.8 * o.lbl_body.node.getBoundingBox().height));
}
}
});
cc._RF.pop();
}, {} ],
Treasure: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ee8e8jWSlFOoLXipVTopcGg", "Treasure");
var s = e("BaseScene"), r = e("NetworkManager");
cc.Class({
extends: s,
properties: {
board_view: cc.Mask,
itemPrefab: cc.Prefab,
btn_select_lines: cc.Prefab,
line_result: cc.Prefab,
board_null_line: cc.Node,
txt_jar_money: cc.Label,
txt_bet_money: cc.Label,
txt_total_line: cc.Label,
txt_win_money: cc.Label,
txt_total_bet_money: cc.Label,
bets_select: [ cc.Label ],
popup_bet_select: cc.Node,
is_bet_select: !1,
isFinishSpin: !0,
isRun: !1,
isRequestJar: !1,
stepMove: 9,
number: 5,
time_move: 3,
jarValue: 0,
roomIndex: 0,
betType: 0
},
update: function(e) {
this.onGameEvent();
},
onGameEvent: function() {
var e = this;
r.checkEvent(function(t) {
return e.handleMessage(t);
});
},
onLoad: function() {
this.requestJar();
this.schedule(this.requestJar, 5);
this.init();
this.initItemPool();
this.initMenu();
this.initFirstItem();
},
init: function() {
this.list_item = [];
this.list_recent_values = [];
this.lst_number = [ 6, 2, 8, 5, 1, 4, 10, 7, 3, 9, 16, 12, 19, 14, 13, 17, 18, 15, 11, 20 ];
this.lst_line_result = [];
this.lst_line_selected = [];
this.lst_line_selected_sprite = [];
},
initItemPool: function() {
this.itemPool = new cc.NodePool();
for (var e = 0; e < 20; ++e) {
var t = cc.instantiate(this.itemPrefab);
this.itemPool.put(t);
}
},
getItem: function(e) {
var t = null;
(t = this.itemPool.size() > 0 ? this.itemPool.get() : cc.instantiate(this.itemPrefab)).getComponent("ItemPrefab").init(e);
return t;
},
initMenu: function() {
this.lst_number = [ 6, 2, 8, 5, 1, 4, 10, 7, 3, 9, 16, 12, 19, 14, 13, 17, 18, 15, 11, 20 ];
this.lst_line_selected = this.lst_number;
for (s = 0; s < 20; s++) {
var e = cc.instantiate(this.line_result);
(i = e.getComponent("LineResult")).init(s);
i.show(!1);
this.board_null_line.addChild(e);
this.lst_line_result.push(e);
}
for (var t = 0, o = this.board_null_line.getContentSize(), s = 0; s < 20; s++) {
var r = cc.instantiate(this.btn_select_lines), i = r.getComponent("ButtonSelectLines");
i.initNumber(this.lst_number[s]);
var n = r.getContentSize();
0 == s && (t = 5 * n.height * .93 + n.height / 2);
r.setPosition(cc.p(0 == parseInt(s / 10) ? -o.width / 2 + n.width / 2 : o.width / 2 - n.width / 2, t - n.height * (s % 10 * .93 + 1)));
this.board_null_line.addChild(r);
this.lst_line_selected_sprite.push(i);
}
this.setLineSelected();
},
initFirstItem: function() {
for (var e = 0; e < this.stepMove; e++) for (var t = 0; t < this.number; t++) {
var o = Math.floor(7 * Math.random()) + 98;
this.list_recent_values.push(o);
var s = this.getItem(o - 98), r = (t - 2) * s.getContentSize().width * 1.05, i = (e - 1) * s.getContentSize().height * 1.05;
s.setPositionY(i);
s.setPositionX(r);
this.list_item.push(s);
this.board_null_line.addChild(s);
}
},
implementSpinTreasure: function(e, t) {
this.resetLineResult();
cc.log("lst_line_results : xxx ", this.lst_line_result);
if (0 != e.length) {
for (a = 0; a < this.list_item.length; a++) {
var o = parseInt(a / this.number), s = parseInt(a % this.number), r = 0;
if (a < 3 * this.number) {
r = this.list_recent_values[a] - 98;
this.list_recent_values[a] = e[a];
} else r = a >= this.list_item.length - 4 * this.number && a < this.list_item.length - 1 ? this.list_recent_values[a - this.list_item.length + 4 * this.number] - 98 : Math.floor(7 * Math.random());
this.list_item[a].getComponent("ItemPrefab").init(r);
var i = (s - 2) * this.list_item[a].getContentSize().width * 1.05, n = (o - 1) * this.list_item[a].getContentSize().height * 1.05;
this.list_item[a].stopAllActions();
this.list_item[a].setPositionX(i);
this.list_item[a].setPositionY(n);
}
for (var a = 0; a < this.list_item.length; a++) {
var o = parseInt(a / this.number), s = parseInt(a % this.number), p = this.list_item[a], l = 1.05 * p.getContentSize().height, u = cc.moveBy(1, cc.p(0, -this.stepMove * l * .25)).easing(cc.easeExponentialIn()), g = cc.moveBy(1, cc.p(0, -(.75 * this.stepMove - 4) * l)).easing(cc.easeBackOut()), d = cc.delayTime(.3 * s);
if (a == this.list_item.length - 1) {
var c = this, h = cc.callFunc(function() {
for (o = 0; o < t.length; o++) if (t[o] < 20) {
var e = c.lst_line_result[t[o] - 1];
e.getComponent("LineResult").show(!0);
e.getComponent("LineResult").animate();
}
for (var o = 0; o < c.list_item.length; o++) c.list_item[o].getComponent("ItemPrefab").animate();
});
p.runAction(cc.sequence(d, u, g, h));
} else p.runAction(cc.sequence(d, u, g));
}
}
},
resetLineResult: function() {
for (var e = 0; e < this.lst_line_result.length; e++) this.lst_line_result[e].getComponent("LineResult").reset();
},
requestJar: function() {
var e = this;
if (!e.isRequestJar) {
e.isRequestJar = !1;
r.getJarRequest(Common.getZoneId(), this.betType + 1);
}
},
getSpin: function() {
this.getTurnTreasureRequest(this.betType + 1);
},
getTurnTreasureRequest: function(e) {
var t = [], o = new proto.BINMapFieldEntry();
o.setKey("turnSlotType");
o.setValue(e.toString());
t.push(o);
var s = this.lst_line_selected.join(",");
cc.log("lst_line_selected", this.lst_line_selected);
var i = new proto.BINMapFieldEntry();
i.setKey("lineSelected");
i.setValue(s);
t.push(i);
r.getTurnMessageFromServer(0, t);
},
exitRoom: function() {
r.requestExitRoomMessage(this.roomIndex);
},
getKeyBet: function() {
return this.betType;
},
calculateTurnType: function() {
return this.getKeyBet() + 1;
},
onDestroy: function() {
this._super();
cc.log("on destroy");
},
onGameStatus: function() {
if (null !== event.data || "undefined" !== event.data) {
var e = r.parseFrom(event.data, event.data.byteLength);
cc.log("list message size:" + e.length);
if (e.length > 0) for (var t = 0; t < e.length; t++) {
var o = e[t];
this.handleMessage(o);
}
}
},
updateMoneyMessageResponseHandler: function(e) {
cc.log("update money response:", e.toObject());
e.getResponsecode();
e.hasMessage() && e.getMessage();
},
matchEndResponseHandler: function(e) {
cc.log("match end response:", e.toObject());
if (e.getResponsecode() && e.getArgsList().length > 0) {
for (var t = null, o = null, s = 0; s < e.getArgsList().length; s++) {
var r = e.getArgsList()[s];
"listItem" == r.getKey() ? t = r.getValue().split(", ").map(function(e) {
return e = parseInt(e);
}) : o = "" !== r.getValue() ? r.getValue().split(", ").map(function(e) {
return e = parseInt(e);
}) : [];
}
if (null !== t && null !== o) {
cc.log("list item:", t);
cc.log("line win:", o);
this.implementSpinTreasure(t, o);
}
}
e.hasMessage() && e.getMessage();
},
exitRoomResponseHandler: function(e) {
cc.log("exit room response message: ", e.toObject());
e.getResponsecode();
},
exitZoneResponseHandler: function(e) {
cc.log("exit zone response message:", e.toObject());
if (e.getResponsecode()) {
Common.setZoneId(-1);
cc.director.loadScene("Lobby");
}
e.hasMessage() && e.getMessage();
},
jarResponseHandler: function(e) {
if (e.getResponsecode()) {
var t = 0, o = this.jarValue;
this.jarValue = e.getJarvalue();
if (e.getArgsList().length > 0) {
var s = e.getArgsList()[0];
"jarType" === s.getKey() && (t = parseInt(s.getValue().toString()));
}
if (t === this.betType + 1) {
this.jarType === t ? Common.countNumberAnim(this.txt_jar_money, o, this.jarValue, 0, 1) : this.txt_jar_money.string = Common.numberFormatWithCommas(this.jarValue);
this.jarType = t;
}
}
e.hasMessage() && e.getMessage();
},
chonDongTouchEvent: function() {
var e = this;
Common.showPopup(Config.name.POPUP_SELECT_LINE, function(t) {
t.init(function(t, o) {
e.onEventLineSelected(t, o);
});
t.appear();
});
},
chonCuocTouchEvent: function() {
this.is_bet_select = !this.is_bet_select;
this.popup_bet_select.active = this.is_bet_select;
},
onEventLineSelected: function(e, t) {
if (e == Config.ON_EVENT.EVENT_SELECT_LINE) {
cc.log("eventType : ", e);
cc.log("this.lst_line_selected :", this.lst_line_selected);
for (var o = !1, s = 0; s < this.lst_line_selected.length; s++) if (this.lst_line_selected[s] == t) {
o = !0;
this.lst_line_selected.splice(s, 1);
break;
}
cc.log("contain :", o);
o || this.lst_line_selected.push(t);
this.setLineSelected();
} else if (e == Config.ON_EVENT.EVENT_SELECT_LINE_BY_TYPE) {
cc.log("eventType : ", e);
t == Config.SELECT_LINE_TYPE.DONG_CHAN ? this.lst_line_selected = [ 2, 4, 6, 8, 10, 12, 14, 16, 18, 20 ] : t == Config.SELECT_LINE_TYPE.DONG_LE ? this.lst_line_selected = [ 1, 3, 5, 7, 9, 11, 13, 15, 17, 19 ] : t == Config.SELECT_LINE_TYPE.DONG_ALL ? this.lst_line_selected = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20 ] : t == Config.SELECT_LINE_TYPE.CHON_LAI && (this.lst_line_selected = []);
this.setLineSelected();
}
},
setLineSelected: function() {
for (var e = 0, t = 0; t < this.lst_line_selected_sprite.length; t++) {
for (var o = !1, s = 0; s < this.lst_line_selected.length; s++) if (this.lst_line_selected[s] == this.lst_line_selected_sprite[t].name) {
o = !0;
break;
}
var r = this.lst_line_selected_sprite[t];
if (o) {
r.initHighLight(!0);
e++;
} else r.initHighLight(!1);
}
this.txt_total_line.string = e;
},
resetLineSelected: function() {
this.lst_line_selected.clear();
},
handleMessage: function(e) {
var t = this._super(e);
if (t) return !0;
t = !0;
switch (e.message_id) {
case r.MESSAGE_ID.UPDATE_MONEY:
o = e.response;
this.updateMoneyMessageResponseHandler(o);
break;

case r.MESSAGE_ID.MATCH_END:
this.matchEndResponseHandler(e.response);
break;

case r.MESSAGE_ID.EXIT_ROOM:
o = e.response;
this.exitRoomResponseHandler(o);
break;

case r.MESSAGE_ID.EXIT_ZONE:
o = e.response;
this.exitZoneResponseHandler(o);
break;

case r.MESSAGE_ID.JAR:
var o = e.response;
this.jarResponseHandler(o);
break;

default:
t = !1;
}
return t;
},
openRulesPopup: function() {
Common.openRules();
}
});
cc._RF.pop();
}, {
BaseScene: "BaseScene",
NetworkManager: "NetworkManager"
} ],
Types: [ function(e, t, o) {
"use strict";
function s(e, t, o) {
if (19 === o) {
r = cc.Enum({
Spade: 1,
Heart: 0,
Club: 2,
Diamond: 3
});
i = "NAN,2,3,4,5,6,7,8,9,10,J,Q,K,A".split(",");
} else {
r = cc.Enum({
Spade: 1,
Heart: 3,
Club: 2,
Diamond: 0
});
i = "NAN,A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
}
Object.defineProperties(this, {
point: {
value: e,
writable: !1
},
suit: {
value: t,
writable: !1
},
id: {
value: 13 * (t - 1) + (e - 1),
writable: !1
},
pointName: {
get: function() {
return i[this.point];
}
},
suitName: {
get: function() {
return r[this.suit];
}
},
isBlackSuit: {
get: function() {
return this.suit === r.Spade || this.suit === r.Club;
}
},
isRedSuit: {
get: function() {
return this.suit === r.Heart || this.suit === r.Diamond;
}
}
});
}
cc._RF.push(t, "bd63cmlkU9MWaZWPaBOxmHC", "Types");
var r = cc.Enum({
Spade: 1,
Heart: 3,
Club: 2,
Diamond: 0
}), i = "NAN,A,2,3,4,5,6,7,8,9,10,J,Q,K".split(",");
s.prototype.toString = function() {
return this.suitName + " " + this.pointName;
};
var n = new Array(52);
s.fromId = function(e) {
return n[e];
};
!function() {
for (var e = 1; e <= 4; e++) for (var t = 1; t <= 13; t++) {
var o = new s(t, e);
n[o.id] = o;
}
}();
var a = cc.Enum({
Normal: -1,
Stand: -1,
Report: -1,
Bust: -1
}), p = cc.Enum({
Win: -1,
Lose: -1,
Tie: -1
}), l = cc.Enum({
Normal: -1,
BlackJack: -1,
FiveCard: -1
});
t.exports = {
Suit: r,
Card: s,
ActorPlayingState: a,
Hand: l,
Outcome: p
};
cc._RF.pop();
}, {} ],
UILobby: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a8487WcWMxIQ5oTc7DMuas8", "UILobby");
var s = e("NetworkManager");
cc.Class({
extends: cc.Component,
properties: {
userName: cc.Label,
userAvatar: cc.Button,
userGold: cc.Label,
timeTotal: 0,
userId: cc.Label,
avatarSprite: cc.Prefab
},
onLoad: function() {
this.setUserInfo();
0 === Common.providerLists.length && s.getCardConfigRequest(Config.CARD_CONFIG_TYPE.TYPE_CASH);
0 === Common.smsConfigLists.length && s.requestSmsConfigMessage(1);
},
openMailPopup: function() {
var e = [ "Mail đến", "Mail đi", "Gửi BQT" ];
Common.showPopup(Config.name.POPUP_MAIL, function(t) {
t.addTabs(e, 1);
t.appear();
});
},
openChargePopup: function() {
var e = [ "Thẻ cào", "SMS" ];
Common.showPopup(Config.name.POPUP_CHARGING, function(t) {
t.addTabs(e, 1);
t.appear();
});
},
openUserInfoPopup: function() {
var e = [ "Hồ sơ", "Lịch sử" ];
Common.showPopup(Config.name.POPUP_USERINFO, function(t) {
t.addTabs(e, 1);
t.appear();
});
},
openSettingPopup: function() {
Common.showPopup(Config.name.POPUP_SETTING, function(e) {
e.appear();
});
},
openGiftPopup: function() {
var e = [ "Nhập giftcode", "Giftcode đã nhận" ];
Common.showPopup(Config.name.POPUP_GIFT, function(t) {
t.addTabs(e, 1);
t.appear();
});
},
setUserInfo: function() {
this.userName.string = Common.getUserName();
this.userGold.string = Common.numberFormatWithCommas(Common.getCash());
this.userId.string = Common.getUserId();
var e = Common.getAvatarId() - 1e5, t = cc.instantiate(this.avatarSprite).getComponent("AvatarSprite").init(e);
this.userAvatar.getComponent(cc.Sprite).spriteFrame = t;
},
update: function(e) {
this.timeTotal = this.timeTotal + e;
if (this.timeTotal >= .5) {
this.timeTotal = 0;
this.setUserInfo();
}
this.onGameEvent();
},
cardConfigResponseHandler: function(e) {
cc.log("card config response handler:", e.toObject());
Common.providerLists = [];
if (e.getResponsecode()) for (var t = 0; t < e.getProvidersList().length; t++) {
var o = {}, s = e.getProvidersList()[t];
o.providerid = s.getProviderid();
o.providercode = s.getProvidercode();
o.providername = s.getProvidername();
o.productsList = [];
for (var r = 0; r < s.getProductsList().length; r++) {
var i = s.getProductsList()[r], n = {};
n.productid = i.getProductid();
n.parvalue = i.getParvalue();
n.cashvalue = i.getCashvalue();
n.description = i.getDescription();
n.promotion = i.getPromotion();
o.productsList.push(n);
}
Common.providerLists.push(o);
}
e.hasMessage() && "" !== e.getMessage() && Common.showToast(e.getMessage());
},
smsConfigResponseHandler: function(e) {
cc.log("sms config response handler:", e.toObject());
Common.smsConfigLists = [];
if (e.getResponsecode()) for (var t = 0; t < e.getNumbersList().length; t++) {
var o = {}, s = e.getNumbersList()[t];
o.number = s.getNumber();
o.samesyntax = s.getSamesyntax();
o.dayquota = s.getDayquota();
o.providersList = [];
for (var r = 0; r < s.getProvidersList().length; r++) {
var i = {}, n = s.getProvidersList()[r];
i.providerid = n.getProviderid();
i.providercode = n.getProvidercode();
i.providername = n.getProvidername();
i.syntaxesList = [];
for (var a = 0; a < n.getSyntaxesList().length; a++) {
var p = {}, l = n.getSyntaxesList()[a];
p.syntaxid = l.getSyntaxid();
p.syntax = l.getSyntax();
p.parvalue = l.getParvalue();
p.promotion = l.getPromotion();
p.targetnumber = l.getTargetnumber();
p.cashvalue = l.getCashvalue();
i.syntaxesList.push(p);
}
o.providersList.push(i);
}
Common.smsConfigLists.push(o);
}
cc.log("sms config lists size:", Common.smsConfigLists.length);
e.hasMessage() && "" !== e.getMessage() && Common.showToast(e.getMessage());
},
updateMoneyResponseHandler: function(e) {
cc.log("update money response handler: ", e.toObject());
e.getResponsecode();
e.hasMessage() && "" !== e.getMessage() && Common.showToast(e.getMessage());
},
handleMessage: function(e) {
var t = !0, o = e.response;
switch (e.message_id) {
case s.MESSAGE_ID.CARD_CONFIG:
this.cardConfigResponseHandler(o);
break;

case s.MESSAGE_ID.SMS_CONFIG:
this.smsConfigResponseHandler(o);
break;

case s.MESSAGE_ID.UPDATE_MONEY:
this.updateMoneyResponseHandler(o);
break;

default:
t = !1;
}
return t;
},
onGameEvent: function() {
s.checkEvent(function(e) {
return this.handleMessage(e);
}.bind(this));
}
});
cc._RF.pop();
}, {
NetworkManager: "NetworkManager"
} ],
UITabLeft: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7677dvUP1BIBIZnggFIAl6k", "UITabLeft");
cc.Class({
extends: cc.Component,
properties: {
scroll_view: cc.ScrollView,
tab_item_left: cc.Prefab,
tab_selected: cc.SpriteFrame,
tab_unselect: cc.SpriteFrame
},
setTab: function(e, t, o) {
this.callBackTab = o;
var s = this;
this.tab_size = e.length;
this.list_buttons = [];
for (var r = 0; r < this.tab_size; r++) {
cc.log("tabs =", e[r]);
var i = cc.instantiate(this.tab_item_left), n = i.getComponent("TabItem"), a = r + 1;
n.init(e[r], a, function(e) {
s.showTab(e);
});
var p = (this.tab_size / 2 - r) * i.getContentSize().height;
i.setPosition(cc.p(0, p));
this.scroll_view.content.addChild(i);
this.list_buttons.push(n);
}
this.showTab(t);
},
showTab: function(e) {
for (var t = 0; t < this.list_buttons.length; t++) {
var o = this.list_buttons[t];
o.node.getComponent(cc.Sprite).spriteFrame = e - 1 == t ? this.tab_selected : this.tab_unselect;
}
this.callBackTab(e);
}
});
cc._RF.pop();
}, {} ],
UITab: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5a026phQ99PO6S++UWLYmXx", "UITab");
cc.Class({
extends: cc.Component,
properties: {
scroll_view: cc.ScrollView,
tab: cc.Sprite,
tab_item: cc.Prefab
},
setTab: function(e, t, o) {
this.callBackTab = o;
var s = this;
this.tab_size = e.length;
var r = this.tab.node.getContentSize(), i = e.length < 4 ? e.length : 3;
this.scroll_view.node.setContentSize(cc.size(r.width * i, r.height));
this.scroll_view.content.setContentSize(cc.size(r.width * e.length, r.height));
for (var n = 0; n < this.tab_size; n++) {
var a = cc.instantiate(this.tab_item), p = n + 1;
a.getComponent("TabItem").init(e[n], p, function(e) {
s.showTab(e);
});
var l = (n + .5) * a.getContentSize().width;
a.setPosition(cc.p(l, 0));
this.scroll_view.content.addChild(a);
}
t ? this.showTab(t, !0) : this.showTab(1);
},
showTab: function(e, t) {
var o = e - 1, s = .2, r = this.tab.node.getPositionY(), i = this.tab.node.getContentSize().width * (o + .5), n = cc.callFunc(function() {
this.callBackTab(e);
}, this);
t && (s = 0);
this.tab.node.runAction(cc.sequence(cc.moveTo(s, cc.p(i, r)), n));
if (this.tab_size > 3) {
var a = 0;
a = o > 1 && o < this.tab_size - 1 ? this.tab.node.getContentSize().width * (1 - o) - this.scroll_view.node.getContentSize().width / 2 : o == this.tab_size - 1 ? this.tab.node.getContentSize().width * (2 - o) - this.scroll_view.node.getContentSize().width / 2 : -this.scroll_view.node.getContentSize().width / 2;
this.scroll_view.content.runAction(cc.moveTo(s, cc.p(a, 0)));
}
}
});
cc._RF.pop();
}, {} ],
UserInfo: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fd415im1a1HILA/MBLmgtY/", "UserInfo");
cc.Class({
extends: cc.Component,
properties: {
avatar: cc.Sprite,
displayName: cc.Label,
txt_level: cc.Label,
txt_id: cc.Label,
txt_phone: cc.Label,
txt_chiso: cc.Label,
txt_sovanchoi: cc.Label,
txt_sovanthang: cc.Label,
txt_sovanthua: cc.Label,
avatarSprite: cc.Prefab
},
onLoad: function() {},
init: function(e, t, o, s, r, i, n, a, p, l) {
this.displayName.string = t;
this.txt_level.string = o;
this.txt_id.string = s;
this.txt_phone.string = r;
this.txt_chiso.string = i;
this.txt_sovanchoi.string = n;
this.txt_sovanthang.string = a;
this.txt_sovanthua.string = p;
var u = Common.getAvatarId() - 1e5, g = cc.instantiate(this.avatarSprite).getComponent("AvatarSprite").init(u);
this.avatar.getComponent(cc.Sprite).spriteFrame = g;
},
openChangePass: function() {
Common.showPopup(Config.name.POPUP_CHANGE_PASS, function(e) {
e.appear();
});
},
openChangeAvatar: function() {
Common.showPopup(Config.name.POPUP_CHANGE_AVATAR, function(e) {
e.appear();
});
},
openChangeInfo: function() {
Common.showPopup(Config.name.POPUP_CHANGE_INFO, function(e) {
e.appear();
});
}
});
cc._RF.pop();
}, {} ],
ZipUtils: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7d560CmTPJFupwClJ3vdspF", "ZipUtils");
cc.Codec = {
name: "Jacob__Codec"
};
cc.unzip = function() {
return cc.Codec.GZip.gunzip.apply(cc.Codec.GZip, arguments);
};
cc.unzipBase64 = function() {
var e = cc.Codec.Base64.decode.apply(cc.Codec.Base64, arguments);
return cc.Codec.GZip.gunzip.apply(cc.Codec.GZip, [ e ]);
};
cc.unzipBase64AsArray = function(e, t) {
t = t || 1;
var o, s, r, i = this.unzipBase64(e), n = [];
for (o = 0, r = i.length / t; o < r; o++) {
n[o] = 0;
for (s = t - 1; s >= 0; --s) n[o] += i.charCodeAt(o * t + s) << 8 * s;
}
return n;
};
cc.unzipAsArray = function(e, t) {
t = t || 1;
var o, s, r, i = this.unzip(e), n = [];
for (o = 0, r = i.length / t; o < r; o++) {
n[o] = 0;
for (s = t - 1; s >= 0; --s) n[o] += i.charCodeAt(o * t + s) << 8 * s;
}
return n;
};
cc.StringToArray = function(e) {
var t, o = e.split(","), s = [];
for (t = 0; t < o.length; t++) s.push(parseInt(o[t]));
return s;
};
cc._RF.pop();
}, {} ],
base64: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ce550DyhRBIj7xWYqpxerNA", "base64");
cc.Codec.Base64 = {
name: "Jacob__Codec__Base64"
};
cc.Codec.Base64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
cc.Codec.Base64.decode = function(e) {
var t, o, s, r, i, n, a = [], p = 0;
e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
for (;p < e.length; ) {
t = this._keyStr.indexOf(e.charAt(p++)) << 2 | (r = this._keyStr.indexOf(e.charAt(p++))) >> 4;
o = (15 & r) << 4 | (i = this._keyStr.indexOf(e.charAt(p++))) >> 2;
s = (3 & i) << 6 | (n = this._keyStr.indexOf(e.charAt(p++)));
a.push(String.fromCharCode(t));
64 !== i && a.push(String.fromCharCode(o));
64 !== n && a.push(String.fromCharCode(s));
}
return a = a.join("");
};
cc.Codec.Base64.decodeAsArray = function(e, t) {
var o, s, r, i = this.decode(e), n = [];
for (o = 0, r = i.length / t; o < r; o++) {
n[o] = 0;
for (s = t - 1; s >= 0; --s) n[o] += i.charCodeAt(o * t + s) << 8 * s;
}
return n;
};
cc.uint8ArrayToUint32Array = function(e) {
if (e.length % 4 != 0) return null;
for (var t = e.length / 4, o = window.Uint32Array ? new Uint32Array(t) : [], s = 0; s < t; s++) {
var r = 4 * s;
o[s] = e[r] + 256 * e[r + 1] + 65536 * e[r + 2] + e[r + 3] * (1 << 24);
}
return o;
};
cc._RF.pop();
}, {} ],
bet_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7a6a7ihYRtF8ozp9fVvRBGy", "bet_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./map_field_entry_pb.js");
r.exportSymbol("proto.BINBetRequest", null, i);
r.exportSymbol("proto.BINBetResponse", null, i);
r.exportSymbol("proto.BINExtraBetRequest", null, i);
r.exportSymbol("proto.BINExtraBetResponse", null, i);
r.exportSymbol("proto.BINPrivateBet", null, i);
proto.BINPrivateBet = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPrivateBet, s.Message);
r.DEBUG && !COMPILED && (proto.BINPrivateBet.displayName = "proto.BINPrivateBet");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPrivateBet.prototype.toObject = function(e) {
return proto.BINPrivateBet.toObject(e, this);
};
proto.BINPrivateBet.toObject = function(e, t) {
var o = {
targetuserid: s.Message.getField(t, 1),
betmoney: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPrivateBet.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPrivateBet();
return proto.BINPrivateBet.deserializeBinaryFromReader(o, t);
};
proto.BINPrivateBet.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setTargetuserid(o);
break;

case 2:
var o = t.readInt64();
e.setBetmoney(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPrivateBet.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPrivateBet.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPrivateBet.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt64(2, t);
};
proto.BINPrivateBet.prototype.getTargetuserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINPrivateBet.prototype.setTargetuserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPrivateBet.prototype.clearTargetuserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPrivateBet.prototype.hasTargetuserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPrivateBet.prototype.getBetmoney = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINPrivateBet.prototype.setBetmoney = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPrivateBet.prototype.clearBetmoney = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPrivateBet.prototype.hasBetmoney = function() {
return null != s.Message.getField(this, 2);
};
proto.BINBetRequest = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINBetRequest.repeatedFields_, null);
};
r.inherits(proto.BINBetRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINBetRequest.displayName = "proto.BINBetRequest");
proto.BINBetRequest.repeatedFields_ = [ 4 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINBetRequest.prototype.toObject = function(e) {
return proto.BINBetRequest.toObject(e, this);
};
proto.BINBetRequest.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1),
bettype: s.Message.getField(t, 2),
betmoney: s.Message.getField(t, 3),
privatebetsList: s.Message.toObjectList(t.getPrivatebetsList(), proto.BINPrivateBet.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINBetRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINBetRequest();
return proto.BINBetRequest.deserializeBinaryFromReader(o, t);
};
proto.BINBetRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRoomindex(o);
break;

case 2:
o = t.readInt32();
e.setBettype(o);
break;

case 3:
o = t.readInt64();
e.setBetmoney(o);
break;

case 4:
var o = new proto.BINPrivateBet();
t.readMessage(o, proto.BINPrivateBet.deserializeBinaryFromReader);
e.addPrivatebets(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINBetRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINBetRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINBetRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
(t = this.getPrivatebetsList()).length > 0 && e.writeRepeatedMessage(4, t, proto.BINPrivateBet.serializeBinaryToWriter);
};
proto.BINBetRequest.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINBetRequest.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINBetRequest.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINBetRequest.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINBetRequest.prototype.getBettype = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINBetRequest.prototype.setBettype = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINBetRequest.prototype.clearBettype = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINBetRequest.prototype.hasBettype = function() {
return null != s.Message.getField(this, 2);
};
proto.BINBetRequest.prototype.getBetmoney = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINBetRequest.prototype.setBetmoney = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINBetRequest.prototype.clearBetmoney = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINBetRequest.prototype.hasBetmoney = function() {
return null != s.Message.getField(this, 3);
};
proto.BINBetRequest.prototype.getPrivatebetsList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINPrivateBet, 4);
};
proto.BINBetRequest.prototype.setPrivatebetsList = function(e) {
s.Message.setRepeatedWrapperField(this, 4, e);
};
proto.BINBetRequest.prototype.addPrivatebets = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 4, e, proto.BINPrivateBet, t);
};
proto.BINBetRequest.prototype.clearPrivatebetsList = function() {
this.setPrivatebetsList([]);
};
proto.BINBetResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINBetResponse.repeatedFields_, null);
};
r.inherits(proto.BINBetResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINBetResponse.displayName = "proto.BINBetResponse");
proto.BINBetResponse.repeatedFields_ = [ 7 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINBetResponse.prototype.toObject = function(e) {
return proto.BINBetResponse.toObject(e, this);
};
proto.BINBetResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
sourceuserid: s.Message.getField(t, 3),
bettype: s.Message.getField(t, 4),
betmoney: s.Message.getField(t, 5),
targetuserid: s.Message.getField(t, 6),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e),
zoneid: s.Message.getField(t, 8)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINBetResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINBetResponse();
return proto.BINBetResponse.deserializeBinaryFromReader(o, t);
};
proto.BINBetResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt64();
e.setSourceuserid(o);
break;

case 4:
o = t.readInt32();
e.setBettype(o);
break;

case 5:
o = t.readInt64();
e.setBetmoney(o);
break;

case 6:
o = t.readInt64();
e.setTargetuserid(o);
break;

case 7:
o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

case 8:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINBetResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINBetResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINBetResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt64(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt64(6, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(7, t, n.BINMapFieldEntry.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 8)) && e.writeInt32(8, t);
};
proto.BINBetResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINBetResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINBetResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINBetResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINBetResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINBetResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINBetResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINBetResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINBetResponse.prototype.getSourceuserid = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINBetResponse.prototype.setSourceuserid = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINBetResponse.prototype.clearSourceuserid = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINBetResponse.prototype.hasSourceuserid = function() {
return null != s.Message.getField(this, 3);
};
proto.BINBetResponse.prototype.getBettype = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINBetResponse.prototype.setBettype = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINBetResponse.prototype.clearBettype = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINBetResponse.prototype.hasBettype = function() {
return null != s.Message.getField(this, 4);
};
proto.BINBetResponse.prototype.getBetmoney = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINBetResponse.prototype.setBetmoney = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINBetResponse.prototype.clearBetmoney = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINBetResponse.prototype.hasBetmoney = function() {
return null != s.Message.getField(this, 5);
};
proto.BINBetResponse.prototype.getTargetuserid = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINBetResponse.prototype.setTargetuserid = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINBetResponse.prototype.clearTargetuserid = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINBetResponse.prototype.hasTargetuserid = function() {
return null != s.Message.getField(this, 6);
};
proto.BINBetResponse.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 7);
};
proto.BINBetResponse.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 7, e);
};
proto.BINBetResponse.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 7, e, proto.BINMapFieldEntry, t);
};
proto.BINBetResponse.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINBetResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 8, 0);
};
proto.BINBetResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINBetResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINBetResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 8);
};
proto.BINExtraBetRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINExtraBetRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINExtraBetRequest.displayName = "proto.BINExtraBetRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINExtraBetRequest.prototype.toObject = function(e) {
return proto.BINExtraBetRequest.toObject(e, this);
};
proto.BINExtraBetRequest.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1),
action: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINExtraBetRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINExtraBetRequest();
return proto.BINExtraBetRequest.deserializeBinaryFromReader(o, t);
};
proto.BINExtraBetRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRoomindex(o);
break;

case 2:
var o = t.readInt32();
e.setAction(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINExtraBetRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINExtraBetRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINExtraBetRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
};
proto.BINExtraBetRequest.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINExtraBetRequest.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINExtraBetRequest.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINExtraBetRequest.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINExtraBetRequest.prototype.getAction = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINExtraBetRequest.prototype.setAction = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINExtraBetRequest.prototype.clearAction = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINExtraBetRequest.prototype.hasAction = function() {
return null != s.Message.getField(this, 2);
};
proto.BINExtraBetResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINExtraBetResponse.repeatedFields_, null);
};
r.inherits(proto.BINExtraBetResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINExtraBetResponse.displayName = "proto.BINExtraBetResponse");
proto.BINExtraBetResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINExtraBetResponse.prototype.toObject = function(e) {
return proto.BINExtraBetResponse.toObject(e, this);
};
proto.BINExtraBetResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINExtraBetResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINExtraBetResponse();
return proto.BINExtraBetResponse.deserializeBinaryFromReader(o, t);
};
proto.BINExtraBetResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINExtraBetResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINExtraBetResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINExtraBetResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(3, t, n.BINMapFieldEntry.serializeBinaryToWriter);
};
proto.BINExtraBetResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINExtraBetResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINExtraBetResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINExtraBetResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINExtraBetResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINExtraBetResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINExtraBetResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINExtraBetResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINExtraBetResponse.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 3);
};
proto.BINExtraBetResponse.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINExtraBetResponse.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINMapFieldEntry, t);
};
proto.BINExtraBetResponse.prototype.clearArgsList = function() {
this.setArgsList([]);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./map_field_entry_pb.js": "map_field_entry_pb",
"google-protobuf": "google-protobuf"
} ],
cellBetHistory: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "31f8cOLA9VBypLBP31mGMo8", "cellBetHistory");
cc.Class({
extends: e("viewCell"),
properties: {
prefabData: cc.Prefab,
frame_title: cc.SpriteFrame,
frame_cell: cc.SpriteFrame
},
onLoad: function() {},
resetCell: function(e, t) {
var o = this.node.getChildByName("eightItem"), s = o.getChildByName("item1").getComponent(cc.Label);
s.string = "";
var r = o.getChildByName("item2").getComponent(cc.Label);
r.string = "";
var i = o.getChildByName("item3").getComponent(cc.Label);
i.string = "";
var n = o.getChildByName("item4").getComponent(cc.Label);
n.string = "";
var a = o.getChildByName("item5").getComponent(cc.Label);
a.string = "";
var p = o.getChildByName("item6").getComponent(cc.Label);
p.string = "";
var l = o.getChildByName("item7").getComponent(cc.Label);
l.string = "";
var u = o.getChildByName("item8").getComponent(cc.Label);
u.string = "";
this.list_text = [];
this.list_text.push(s);
this.list_text.push(r);
this.list_text.push(i);
this.list_text.push(n);
this.list_text.push(a);
this.list_text.push(p);
this.list_text.push(l);
this.list_text.push(u);
var g = this.node.getChildByName("background").getComponent(cc.Sprite);
g.spriteFrame = 0 == t ? this.frame_title : this.frame_cell;
},
init: function(e, t, o, s) {
var r = t.array[e], i = Object.keys(r).length;
this.resetCell(i, e);
if (this.list_text.length == i) for (var n = 0; n < i; n++) {
var a = r[Object.keys(r)[n]].toString();
if (n == i && 0 != e) {
this.list_text[n].string = a;
this.list_text[n].node.color = cc.color(94, 60, 17, 255);
} else {
this.list_text[n].string = a;
this.list_text[n].node.color = 0 == e ? cc.color(255, 248, 198, 255) : cc.color(94, 60, 17, 255);
}
}
}
});
cc._RF.pop();
}, {
viewCell: "viewCell"
} ],
cellPromotion: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a3ec5HHnLpNS4X5qsJ9P78H", "cellPromotion");
cc.Class({
extends: e("viewCell"),
properties: {},
onLoad: function() {},
init: function(e, t, o, s) {
this.node.removeAllChildren(!0);
var r = t.array[e], i = cc.url.raw("resources/common/popup/popup_ingame/popup_gold_noidung.png"), n = cc.textureCache.addImage(i);
0 != e && (this.node.getComponent(cc.Sprite).spriteFrame = new cc.SpriteFrame(n));
for (var a = this.node.getContentSize().width, p = this.node.getContentSize().height, l = Object.keys(r).length, u = 0; u < l; u++) {
var g = new cc.Node();
g.parent = this.node;
var d = g.addComponent(cc.Label), c = (u - l / 2 + .5) * a / (l + 1), h = .2 * p;
d.node.setPositionX(c);
d.node.setPositionY(-h);
d.node.color = cc.color(112, 48, 22, 255);
d.fontSize = 20;
d.string = r[Object.keys(r)[u]].toString();
}
}
});
cc._RF.pop();
}, {
viewCell: "viewCell"
} ],
cellSmall: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "befa4nDmnxMwq1gFcSNs9RI", "cellSmall");
cc.Class({
extends: e("viewCell"),
properties: {
prefabData: cc.Prefab,
frame_title: cc.SpriteFrame,
frame_cell: cc.SpriteFrame
},
onLoad: function() {},
resetCell: function(e, t) {
var o = this.node.getChildByName("fourItem"), s = o.getChildByName("item1").getComponent(cc.Label);
s.string = "";
var r = o.getChildByName("item2").getComponent(cc.Label);
r.string = "";
var i = o.getChildByName("item3").getComponent(cc.Label);
i.string = "";
var n = o.getChildByName("item4").getComponent(cc.Label);
n.string = "";
this.list_text = [];
this.list_text.push(s);
this.list_text.push(r);
this.list_text.push(i);
this.list_text.push(n);
var a = this.node.getChildByName("background").getComponent(cc.Sprite);
a.spriteFrame = 0 == t ? this.frame_title : this.frame_cell;
},
init: function(e, t, o, s) {
var r = t.array[e], i = Object.keys(r).length;
this.resetCell(i, e);
if (this.list_text.length == i) for (var n = 0; n < i; n++) {
var a = r[Object.keys(r)[n]].toString();
0 != e && (a = Common.wordWrap(a, 40));
if (n == i && 0 != e) {
this.list_text[n].string = a;
this.list_text[n].node.color = cc.color(94, 60, 17, 255);
} else {
this.list_text[n].string = a;
this.list_text[n].node.color = 0 == e ? cc.color(255, 248, 198, 255) : cc.color(94, 60, 17, 255);
}
}
}
});
cc._RF.pop();
}, {
viewCell: "viewCell"
} ],
enter_room_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "1f684K9EiBDibjIOXO3B0FG", "enter_room_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./filter_room_pb.js"), a = e("./player_pb.js"), p = e("./map_field_entry_pb.js");
r.exportSymbol("proto.BINEnterRoomGroupRequest", null, i);
r.exportSymbol("proto.BINEnterRoomRequest", null, i);
r.exportSymbol("proto.BINEnterRoomResponse", null, i);
r.exportSymbol("proto.BINPlayerEnterRoomResponse", null, i);
proto.BINEnterRoomRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINEnterRoomRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINEnterRoomRequest.displayName = "proto.BINEnterRoomRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINEnterRoomRequest.prototype.toObject = function(e) {
return proto.BINEnterRoomRequest.toObject(e, this);
};
proto.BINEnterRoomRequest.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1),
password: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINEnterRoomRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINEnterRoomRequest();
return proto.BINEnterRoomRequest.deserializeBinaryFromReader(o, t);
};
proto.BINEnterRoomRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRoomindex(o);
break;

case 2:
var o = t.readString();
e.setPassword(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINEnterRoomRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINEnterRoomRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINEnterRoomRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINEnterRoomRequest.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINEnterRoomRequest.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINEnterRoomRequest.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINEnterRoomRequest.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINEnterRoomRequest.prototype.getPassword = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINEnterRoomRequest.prototype.setPassword = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINEnterRoomRequest.prototype.clearPassword = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINEnterRoomRequest.prototype.hasPassword = function() {
return null != s.Message.getField(this, 2);
};
proto.BINEnterRoomResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINEnterRoomResponse.repeatedFields_, null);
};
r.inherits(proto.BINEnterRoomResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINEnterRoomResponse.displayName = "proto.BINEnterRoomResponse");
proto.BINEnterRoomResponse.repeatedFields_ = [ 6, 7, 11 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINEnterRoomResponse.prototype.toObject = function(e) {
return proto.BINEnterRoomResponse.toObject(e, this);
};
proto.BINEnterRoomResponse.toObject = function(e, t) {
var o, r = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
zoneid: s.Message.getField(t, 3),
roomplay: (o = t.getRoomplay()) && n.BINRoomPlay.toObject(e, o),
roomisplaying: s.Message.getField(t, 5),
playingplayersList: s.Message.toObjectList(t.getPlayingplayersList(), a.BINPlayer.toObject, e),
waitingplayersList: s.Message.toObjectList(t.getWaitingplayersList(), a.BINPlayer.toObject, e),
owneruserid: s.Message.getField(t, 8),
currentturnuserid: s.Message.getField(t, 9),
enterroomstatus: s.Message.getField(t, 10),
argsList: s.Message.toObjectList(t.getArgsList(), p.BINMapFieldEntry.toObject, e)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINEnterRoomResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINEnterRoomResponse();
return proto.BINEnterRoomResponse.deserializeBinaryFromReader(o, t);
};
proto.BINEnterRoomResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt32();
e.setZoneid(o);
break;

case 4:
o = new n.BINRoomPlay();
t.readMessage(o, n.BINRoomPlay.deserializeBinaryFromReader);
e.setRoomplay(o);
break;

case 5:
o = t.readBool();
e.setRoomisplaying(o);
break;

case 6:
o = new a.BINPlayer();
t.readMessage(o, a.BINPlayer.deserializeBinaryFromReader);
e.addPlayingplayers(o);
break;

case 7:
o = new a.BINPlayer();
t.readMessage(o, a.BINPlayer.deserializeBinaryFromReader);
e.addWaitingplayers(o);
break;

case 8:
o = t.readInt64();
e.setOwneruserid(o);
break;

case 9:
o = t.readInt64();
e.setCurrentturnuserid(o);
break;

case 10:
o = t.readInt32();
e.setEnterroomstatus(o);
break;

case 11:
var o = new p.BINMapFieldEntry();
t.readMessage(o, p.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINEnterRoomResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINEnterRoomResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINEnterRoomResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = this.getRoomplay()) && e.writeMessage(4, t, n.BINRoomPlay.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 5)) && e.writeBool(5, t);
(t = this.getPlayingplayersList()).length > 0 && e.writeRepeatedMessage(6, t, a.BINPlayer.serializeBinaryToWriter);
(t = this.getWaitingplayersList()).length > 0 && e.writeRepeatedMessage(7, t, a.BINPlayer.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 8)) && e.writeInt64(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeInt64(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeInt32(10, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(11, t, p.BINMapFieldEntry.serializeBinaryToWriter);
};
proto.BINEnterRoomResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINEnterRoomResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINEnterRoomResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINEnterRoomResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINEnterRoomResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINEnterRoomResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINEnterRoomResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINEnterRoomResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINEnterRoomResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINEnterRoomResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINEnterRoomResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINEnterRoomResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 3);
};
proto.BINEnterRoomResponse.prototype.getRoomplay = function() {
return s.Message.getWrapperField(this, n.BINRoomPlay, 4);
};
proto.BINEnterRoomResponse.prototype.setRoomplay = function(e) {
s.Message.setWrapperField(this, 4, e);
};
proto.BINEnterRoomResponse.prototype.clearRoomplay = function() {
this.setRoomplay(void 0);
};
proto.BINEnterRoomResponse.prototype.hasRoomplay = function() {
return null != s.Message.getField(this, 4);
};
proto.BINEnterRoomResponse.prototype.getRoomisplaying = function() {
return s.Message.getFieldWithDefault(this, 5, !1);
};
proto.BINEnterRoomResponse.prototype.setRoomisplaying = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINEnterRoomResponse.prototype.clearRoomisplaying = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINEnterRoomResponse.prototype.hasRoomisplaying = function() {
return null != s.Message.getField(this, 5);
};
proto.BINEnterRoomResponse.prototype.getPlayingplayersList = function() {
return s.Message.getRepeatedWrapperField(this, a.BINPlayer, 6);
};
proto.BINEnterRoomResponse.prototype.setPlayingplayersList = function(e) {
s.Message.setRepeatedWrapperField(this, 6, e);
};
proto.BINEnterRoomResponse.prototype.addPlayingplayers = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 6, e, proto.BINPlayer, t);
};
proto.BINEnterRoomResponse.prototype.clearPlayingplayersList = function() {
this.setPlayingplayersList([]);
};
proto.BINEnterRoomResponse.prototype.getWaitingplayersList = function() {
return s.Message.getRepeatedWrapperField(this, a.BINPlayer, 7);
};
proto.BINEnterRoomResponse.prototype.setWaitingplayersList = function(e) {
s.Message.setRepeatedWrapperField(this, 7, e);
};
proto.BINEnterRoomResponse.prototype.addWaitingplayers = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 7, e, proto.BINPlayer, t);
};
proto.BINEnterRoomResponse.prototype.clearWaitingplayersList = function() {
this.setWaitingplayersList([]);
};
proto.BINEnterRoomResponse.prototype.getOwneruserid = function() {
return s.Message.getFieldWithDefault(this, 8, 0);
};
proto.BINEnterRoomResponse.prototype.setOwneruserid = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINEnterRoomResponse.prototype.clearOwneruserid = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINEnterRoomResponse.prototype.hasOwneruserid = function() {
return null != s.Message.getField(this, 8);
};
proto.BINEnterRoomResponse.prototype.getCurrentturnuserid = function() {
return s.Message.getFieldWithDefault(this, 9, 0);
};
proto.BINEnterRoomResponse.prototype.setCurrentturnuserid = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINEnterRoomResponse.prototype.clearCurrentturnuserid = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINEnterRoomResponse.prototype.hasCurrentturnuserid = function() {
return null != s.Message.getField(this, 9);
};
proto.BINEnterRoomResponse.prototype.getEnterroomstatus = function() {
return s.Message.getFieldWithDefault(this, 10, 0);
};
proto.BINEnterRoomResponse.prototype.setEnterroomstatus = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINEnterRoomResponse.prototype.clearEnterroomstatus = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINEnterRoomResponse.prototype.hasEnterroomstatus = function() {
return null != s.Message.getField(this, 10);
};
proto.BINEnterRoomResponse.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, p.BINMapFieldEntry, 11);
};
proto.BINEnterRoomResponse.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 11, e);
};
proto.BINEnterRoomResponse.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 11, e, proto.BINMapFieldEntry, t);
};
proto.BINEnterRoomResponse.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINEnterRoomGroupRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINEnterRoomGroupRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINEnterRoomGroupRequest.displayName = "proto.BINEnterRoomGroupRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINEnterRoomGroupRequest.prototype.toObject = function(e) {
return proto.BINEnterRoomGroupRequest.toObject(e, this);
};
proto.BINEnterRoomGroupRequest.toObject = function(e, t) {
var o = {
roomgroupid: s.Message.getField(t, 1),
viproom: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINEnterRoomGroupRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINEnterRoomGroupRequest();
return proto.BINEnterRoomGroupRequest.deserializeBinaryFromReader(o, t);
};
proto.BINEnterRoomGroupRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRoomgroupid(o);
break;

case 2:
var o = t.readBool();
e.setViproom(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINEnterRoomGroupRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINEnterRoomGroupRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINEnterRoomGroupRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeBool(2, t);
};
proto.BINEnterRoomGroupRequest.prototype.getRoomgroupid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINEnterRoomGroupRequest.prototype.setRoomgroupid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINEnterRoomGroupRequest.prototype.clearRoomgroupid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINEnterRoomGroupRequest.prototype.hasRoomgroupid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINEnterRoomGroupRequest.prototype.getViproom = function() {
return s.Message.getFieldWithDefault(this, 2, !1);
};
proto.BINEnterRoomGroupRequest.prototype.setViproom = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINEnterRoomGroupRequest.prototype.clearViproom = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINEnterRoomGroupRequest.prototype.hasViproom = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPlayerEnterRoomResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPlayerEnterRoomResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINPlayerEnterRoomResponse.displayName = "proto.BINPlayerEnterRoomResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPlayerEnterRoomResponse.prototype.toObject = function(e) {
return proto.BINPlayerEnterRoomResponse.toObject(e, this);
};
proto.BINPlayerEnterRoomResponse.toObject = function(e, t) {
var o, r = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
player: (o = t.getPlayer()) && a.BINPlayer.toObject(e, o),
enterroomstatus: s.Message.getField(t, 4),
changeownerroomcd: s.Message.getField(t, 5)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINPlayerEnterRoomResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPlayerEnterRoomResponse();
return proto.BINPlayerEnterRoomResponse.deserializeBinaryFromReader(o, t);
};
proto.BINPlayerEnterRoomResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = new a.BINPlayer();
t.readMessage(o, a.BINPlayer.deserializeBinaryFromReader);
e.setPlayer(o);
break;

case 4:
o = t.readInt32();
e.setEnterroomstatus(o);
break;

case 5:
var o = t.readInt32();
e.setChangeownerroomcd(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPlayerEnterRoomResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPlayerEnterRoomResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPlayerEnterRoomResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = this.getPlayer()) && e.writeMessage(3, t, a.BINPlayer.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
};
proto.BINPlayerEnterRoomResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINPlayerEnterRoomResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPlayerEnterRoomResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPlayerEnterRoomResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPlayerEnterRoomResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINPlayerEnterRoomResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPlayerEnterRoomResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPlayerEnterRoomResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPlayerEnterRoomResponse.prototype.getPlayer = function() {
return s.Message.getWrapperField(this, a.BINPlayer, 3);
};
proto.BINPlayerEnterRoomResponse.prototype.setPlayer = function(e) {
s.Message.setWrapperField(this, 3, e);
};
proto.BINPlayerEnterRoomResponse.prototype.clearPlayer = function() {
this.setPlayer(void 0);
};
proto.BINPlayerEnterRoomResponse.prototype.hasPlayer = function() {
return null != s.Message.getField(this, 3);
};
proto.BINPlayerEnterRoomResponse.prototype.getEnterroomstatus = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINPlayerEnterRoomResponse.prototype.setEnterroomstatus = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINPlayerEnterRoomResponse.prototype.clearEnterroomstatus = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINPlayerEnterRoomResponse.prototype.hasEnterroomstatus = function() {
return null != s.Message.getField(this, 4);
};
proto.BINPlayerEnterRoomResponse.prototype.getChangeownerroomcd = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINPlayerEnterRoomResponse.prototype.setChangeownerroomcd = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINPlayerEnterRoomResponse.prototype.clearChangeownerroomcd = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINPlayerEnterRoomResponse.prototype.hasChangeownerroomcd = function() {
return null != s.Message.getField(this, 5);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./filter_room_pb.js": "filter_room_pb",
"./map_field_entry_pb.js": "map_field_entry_pb",
"./player_pb.js": "player_pb",
"google-protobuf": "google-protobuf"
} ],
enter_zone_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "916380lj9hBprkJ0C5BQQxD", "enter_zone_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINEnterZoneRequest", null, i);
r.exportSymbol("proto.BINEnterZoneResponse", null, i);
r.exportSymbol("proto.BINExitZoneRequest", null, i);
r.exportSymbol("proto.BINExitZoneResponse", null, i);
r.exportSymbol("proto.BINRoomConfig", null, i);
proto.BINEnterZoneRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINEnterZoneRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINEnterZoneRequest.displayName = "proto.BINEnterZoneRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINEnterZoneRequest.prototype.toObject = function(e) {
return proto.BINEnterZoneRequest.toObject(e, this);
};
proto.BINEnterZoneRequest.toObject = function(e, t) {
var o = {
zoneid: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINEnterZoneRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINEnterZoneRequest();
return proto.BINEnterZoneRequest.deserializeBinaryFromReader(o, t);
};
proto.BINEnterZoneRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINEnterZoneRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINEnterZoneRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINEnterZoneRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINEnterZoneRequest.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINEnterZoneRequest.prototype.setZoneid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINEnterZoneRequest.prototype.clearZoneid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINEnterZoneRequest.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRoomConfig = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRoomConfig, s.Message);
r.DEBUG && !COMPILED && (proto.BINRoomConfig.displayName = "proto.BINRoomConfig");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRoomConfig.prototype.toObject = function(e) {
return proto.BINRoomConfig.toObject(e, this);
};
proto.BINRoomConfig.toObject = function(e, t) {
var o = {
roomgroupid: s.Message.getField(t, 1),
roomname: s.Message.getField(t, 2),
viproom: s.Message.getField(t, 3),
mincash: s.Message.getField(t, 4),
mingold: s.Message.getField(t, 5),
minlevel: s.Message.getField(t, 6),
roomcapacity: s.Message.getField(t, 7),
playersize: s.Message.getField(t, 8),
minbet: s.Message.getField(t, 9),
tax: s.Message.getField(t, 10),
active: s.Message.getField(t, 11)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRoomConfig.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRoomConfig();
return proto.BINRoomConfig.deserializeBinaryFromReader(o, t);
};
proto.BINRoomConfig.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRoomgroupid(o);
break;

case 2:
o = t.readString();
e.setRoomname(o);
break;

case 3:
o = t.readBool();
e.setViproom(o);
break;

case 4:
o = t.readInt32();
e.setMincash(o);
break;

case 5:
o = t.readInt32();
e.setMingold(o);
break;

case 6:
o = t.readInt32();
e.setMinlevel(o);
break;

case 7:
o = t.readInt32();
e.setRoomcapacity(o);
break;

case 8:
o = t.readInt32();
e.setPlayersize(o);
break;

case 9:
o = t.readInt32();
e.setMinbet(o);
break;

case 10:
o = t.readInt32();
e.setTax(o);
break;

case 11:
var o = t.readBool();
e.setActive(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRoomConfig.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRoomConfig.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRoomConfig.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeBool(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt32(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt32(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeInt32(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeInt32(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeInt32(10, t);
null != (t = s.Message.getField(this, 11)) && e.writeBool(11, t);
};
proto.BINRoomConfig.prototype.getRoomgroupid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINRoomConfig.prototype.setRoomgroupid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRoomConfig.prototype.clearRoomgroupid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRoomConfig.prototype.hasRoomgroupid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRoomConfig.prototype.getRoomname = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINRoomConfig.prototype.setRoomname = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRoomConfig.prototype.clearRoomname = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRoomConfig.prototype.hasRoomname = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRoomConfig.prototype.getViproom = function() {
return s.Message.getFieldWithDefault(this, 3, !1);
};
proto.BINRoomConfig.prototype.setViproom = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINRoomConfig.prototype.clearViproom = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINRoomConfig.prototype.hasViproom = function() {
return null != s.Message.getField(this, 3);
};
proto.BINRoomConfig.prototype.getMincash = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINRoomConfig.prototype.setMincash = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINRoomConfig.prototype.clearMincash = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINRoomConfig.prototype.hasMincash = function() {
return null != s.Message.getField(this, 4);
};
proto.BINRoomConfig.prototype.getMingold = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINRoomConfig.prototype.setMingold = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINRoomConfig.prototype.clearMingold = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINRoomConfig.prototype.hasMingold = function() {
return null != s.Message.getField(this, 5);
};
proto.BINRoomConfig.prototype.getMinlevel = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINRoomConfig.prototype.setMinlevel = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINRoomConfig.prototype.clearMinlevel = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINRoomConfig.prototype.hasMinlevel = function() {
return null != s.Message.getField(this, 6);
};
proto.BINRoomConfig.prototype.getRoomcapacity = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINRoomConfig.prototype.setRoomcapacity = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINRoomConfig.prototype.clearRoomcapacity = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINRoomConfig.prototype.hasRoomcapacity = function() {
return null != s.Message.getField(this, 7);
};
proto.BINRoomConfig.prototype.getPlayersize = function() {
return s.Message.getFieldWithDefault(this, 8, 0);
};
proto.BINRoomConfig.prototype.setPlayersize = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINRoomConfig.prototype.clearPlayersize = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINRoomConfig.prototype.hasPlayersize = function() {
return null != s.Message.getField(this, 8);
};
proto.BINRoomConfig.prototype.getMinbet = function() {
return s.Message.getFieldWithDefault(this, 9, 0);
};
proto.BINRoomConfig.prototype.setMinbet = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINRoomConfig.prototype.clearMinbet = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINRoomConfig.prototype.hasMinbet = function() {
return null != s.Message.getField(this, 9);
};
proto.BINRoomConfig.prototype.getTax = function() {
return s.Message.getFieldWithDefault(this, 10, 0);
};
proto.BINRoomConfig.prototype.setTax = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINRoomConfig.prototype.clearTax = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINRoomConfig.prototype.hasTax = function() {
return null != s.Message.getField(this, 10);
};
proto.BINRoomConfig.prototype.getActive = function() {
return s.Message.getFieldWithDefault(this, 11, !1);
};
proto.BINRoomConfig.prototype.setActive = function(e) {
s.Message.setField(this, 11, e);
};
proto.BINRoomConfig.prototype.clearActive = function() {
s.Message.setField(this, 11, void 0);
};
proto.BINRoomConfig.prototype.hasActive = function() {
return null != s.Message.getField(this, 11);
};
proto.BINEnterZoneResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINEnterZoneResponse.repeatedFields_, null);
};
r.inherits(proto.BINEnterZoneResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINEnterZoneResponse.displayName = "proto.BINEnterZoneResponse");
proto.BINEnterZoneResponse.repeatedFields_ = [ 5, 6 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINEnterZoneResponse.prototype.toObject = function(e) {
return proto.BINEnterZoneResponse.toObject(e, this);
};
proto.BINEnterZoneResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
enabledisplayroomlist: s.Message.getField(t, 3),
defaultroomtypeload: s.Message.getField(t, 4),
cashroomconfigsList: s.Message.toObjectList(t.getCashroomconfigsList(), proto.BINRoomConfig.toObject, e),
goldroomconfigsList: s.Message.toObjectList(t.getGoldroomconfigsList(), proto.BINRoomConfig.toObject, e),
zoneid: s.Message.getField(t, 7),
jarstatus: s.Message.getField(t, 8)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINEnterZoneResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINEnterZoneResponse();
return proto.BINEnterZoneResponse.deserializeBinaryFromReader(o, t);
};
proto.BINEnterZoneResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readBool();
e.setEnabledisplayroomlist(o);
break;

case 4:
o = t.readInt32();
e.setDefaultroomtypeload(o);
break;

case 5:
o = new proto.BINRoomConfig();
t.readMessage(o, proto.BINRoomConfig.deserializeBinaryFromReader);
e.addCashroomconfigs(o);
break;

case 6:
o = new proto.BINRoomConfig();
t.readMessage(o, proto.BINRoomConfig.deserializeBinaryFromReader);
e.addGoldroomconfigs(o);
break;

case 7:
o = t.readInt32();
e.setZoneid(o);
break;

case 8:
var o = t.readBool();
e.setJarstatus(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINEnterZoneResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINEnterZoneResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINEnterZoneResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeBool(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
(t = this.getCashroomconfigsList()).length > 0 && e.writeRepeatedMessage(5, t, proto.BINRoomConfig.serializeBinaryToWriter);
(t = this.getGoldroomconfigsList()).length > 0 && e.writeRepeatedMessage(6, t, proto.BINRoomConfig.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 7)) && e.writeInt32(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeBool(8, t);
};
proto.BINEnterZoneResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINEnterZoneResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINEnterZoneResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINEnterZoneResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINEnterZoneResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINEnterZoneResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINEnterZoneResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINEnterZoneResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINEnterZoneResponse.prototype.getEnabledisplayroomlist = function() {
return s.Message.getFieldWithDefault(this, 3, !1);
};
proto.BINEnterZoneResponse.prototype.setEnabledisplayroomlist = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINEnterZoneResponse.prototype.clearEnabledisplayroomlist = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINEnterZoneResponse.prototype.hasEnabledisplayroomlist = function() {
return null != s.Message.getField(this, 3);
};
proto.BINEnterZoneResponse.prototype.getDefaultroomtypeload = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINEnterZoneResponse.prototype.setDefaultroomtypeload = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINEnterZoneResponse.prototype.clearDefaultroomtypeload = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINEnterZoneResponse.prototype.hasDefaultroomtypeload = function() {
return null != s.Message.getField(this, 4);
};
proto.BINEnterZoneResponse.prototype.getCashroomconfigsList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINRoomConfig, 5);
};
proto.BINEnterZoneResponse.prototype.setCashroomconfigsList = function(e) {
s.Message.setRepeatedWrapperField(this, 5, e);
};
proto.BINEnterZoneResponse.prototype.addCashroomconfigs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 5, e, proto.BINRoomConfig, t);
};
proto.BINEnterZoneResponse.prototype.clearCashroomconfigsList = function() {
this.setCashroomconfigsList([]);
};
proto.BINEnterZoneResponse.prototype.getGoldroomconfigsList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINRoomConfig, 6);
};
proto.BINEnterZoneResponse.prototype.setGoldroomconfigsList = function(e) {
s.Message.setRepeatedWrapperField(this, 6, e);
};
proto.BINEnterZoneResponse.prototype.addGoldroomconfigs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 6, e, proto.BINRoomConfig, t);
};
proto.BINEnterZoneResponse.prototype.clearGoldroomconfigsList = function() {
this.setGoldroomconfigsList([]);
};
proto.BINEnterZoneResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINEnterZoneResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINEnterZoneResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINEnterZoneResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 7);
};
proto.BINEnterZoneResponse.prototype.getJarstatus = function() {
return s.Message.getFieldWithDefault(this, 8, !1);
};
proto.BINEnterZoneResponse.prototype.setJarstatus = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINEnterZoneResponse.prototype.clearJarstatus = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINEnterZoneResponse.prototype.hasJarstatus = function() {
return null != s.Message.getField(this, 8);
};
proto.BINExitZoneRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINExitZoneRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINExitZoneRequest.displayName = "proto.BINExitZoneRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINExitZoneRequest.prototype.toObject = function(e) {
return proto.BINExitZoneRequest.toObject(e, this);
};
proto.BINExitZoneRequest.toObject = function(e, t) {
var o = {
zoneid: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINExitZoneRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINExitZoneRequest();
return proto.BINExitZoneRequest.deserializeBinaryFromReader(o, t);
};
proto.BINExitZoneRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINExitZoneRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINExitZoneRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINExitZoneRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINExitZoneRequest.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINExitZoneRequest.prototype.setZoneid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINExitZoneRequest.prototype.clearZoneid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINExitZoneRequest.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINExitZoneResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINExitZoneResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINExitZoneResponse.displayName = "proto.BINExitZoneResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINExitZoneResponse.prototype.toObject = function(e) {
return proto.BINExitZoneResponse.toObject(e, this);
};
proto.BINExitZoneResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
zoneid: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINExitZoneResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINExitZoneResponse();
return proto.BINExitZoneResponse.deserializeBinaryFromReader(o, t);
};
proto.BINExitZoneResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINExitZoneResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINExitZoneResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINExitZoneResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
};
proto.BINExitZoneResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINExitZoneResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINExitZoneResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINExitZoneResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINExitZoneResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINExitZoneResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINExitZoneResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINExitZoneResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINExitZoneResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINExitZoneResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINExitZoneResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINExitZoneResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 3);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
exit_room_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "17533cwVPZCJZ3YpNlQ/1xs", "exit_room_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINCancelExitAfterMatchEndRequest", null, i);
r.exportSymbol("proto.BINCancelExitAfterMatchEndResponse", null, i);
r.exportSymbol("proto.BINExitRoomRequest", null, i);
r.exportSymbol("proto.BINExitRoomResponse", null, i);
r.exportSymbol("proto.BINPlayerExitAfterMatchEndResponse", null, i);
r.exportSymbol("proto.BINPlayerExitRoomResponse", null, i);
proto.BINExitRoomRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINExitRoomRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINExitRoomRequest.displayName = "proto.BINExitRoomRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINExitRoomRequest.prototype.toObject = function(e) {
return proto.BINExitRoomRequest.toObject(e, this);
};
proto.BINExitRoomRequest.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINExitRoomRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINExitRoomRequest();
return proto.BINExitRoomRequest.deserializeBinaryFromReader(o, t);
};
proto.BINExitRoomRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setRoomindex(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINExitRoomRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINExitRoomRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINExitRoomRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINExitRoomRequest.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINExitRoomRequest.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINExitRoomRequest.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINExitRoomRequest.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINExitRoomResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINExitRoomResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINExitRoomResponse.displayName = "proto.BINExitRoomResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINExitRoomResponse.prototype.toObject = function(e) {
return proto.BINExitRoomResponse.toObject(e, this);
};
proto.BINExitRoomResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
exitaftermatchend: s.Message.getField(t, 3),
notenoughmoney: s.Message.getField(t, 4),
zoneid: s.Message.getField(t, 5)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINExitRoomResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINExitRoomResponse();
return proto.BINExitRoomResponse.deserializeBinaryFromReader(o, t);
};
proto.BINExitRoomResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readBool();
e.setExitaftermatchend(o);
break;

case 4:
o = t.readBool();
e.setNotenoughmoney(o);
break;

case 5:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINExitRoomResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINExitRoomResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINExitRoomResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeBool(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeBool(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
};
proto.BINExitRoomResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINExitRoomResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINExitRoomResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINExitRoomResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINExitRoomResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINExitRoomResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINExitRoomResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINExitRoomResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINExitRoomResponse.prototype.getExitaftermatchend = function() {
return s.Message.getFieldWithDefault(this, 3, !1);
};
proto.BINExitRoomResponse.prototype.setExitaftermatchend = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINExitRoomResponse.prototype.clearExitaftermatchend = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINExitRoomResponse.prototype.hasExitaftermatchend = function() {
return null != s.Message.getField(this, 3);
};
proto.BINExitRoomResponse.prototype.getNotenoughmoney = function() {
return s.Message.getFieldWithDefault(this, 4, !1);
};
proto.BINExitRoomResponse.prototype.setNotenoughmoney = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINExitRoomResponse.prototype.clearNotenoughmoney = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINExitRoomResponse.prototype.hasNotenoughmoney = function() {
return null != s.Message.getField(this, 4);
};
proto.BINExitRoomResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINExitRoomResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINExitRoomResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINExitRoomResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 5);
};
proto.BINPlayerExitAfterMatchEndResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPlayerExitAfterMatchEndResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINPlayerExitAfterMatchEndResponse.displayName = "proto.BINPlayerExitAfterMatchEndResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPlayerExitAfterMatchEndResponse.prototype.toObject = function(e) {
return proto.BINPlayerExitAfterMatchEndResponse.toObject(e, this);
};
proto.BINPlayerExitAfterMatchEndResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
exituserid: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPlayerExitAfterMatchEndResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPlayerExitAfterMatchEndResponse();
return proto.BINPlayerExitAfterMatchEndResponse.deserializeBinaryFromReader(o, t);
};
proto.BINPlayerExitAfterMatchEndResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = t.readInt64();
e.setExituserid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPlayerExitAfterMatchEndResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.getExituserid = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.setExituserid = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.clearExituserid = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINPlayerExitAfterMatchEndResponse.prototype.hasExituserid = function() {
return null != s.Message.getField(this, 3);
};
proto.BINPlayerExitRoomResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPlayerExitRoomResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINPlayerExitRoomResponse.displayName = "proto.BINPlayerExitRoomResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPlayerExitRoomResponse.prototype.toObject = function(e) {
return proto.BINPlayerExitRoomResponse.toObject(e, this);
};
proto.BINPlayerExitRoomResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
exituserid: s.Message.getField(t, 3),
owneruserid: s.Message.getField(t, 4),
changeownerroomcd: s.Message.getField(t, 5)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPlayerExitRoomResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPlayerExitRoomResponse();
return proto.BINPlayerExitRoomResponse.deserializeBinaryFromReader(o, t);
};
proto.BINPlayerExitRoomResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt64();
e.setExituserid(o);
break;

case 4:
o = t.readInt64();
e.setOwneruserid(o);
break;

case 5:
var o = t.readInt32();
e.setChangeownerroomcd(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPlayerExitRoomResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPlayerExitRoomResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPlayerExitRoomResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
};
proto.BINPlayerExitRoomResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINPlayerExitRoomResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPlayerExitRoomResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPlayerExitRoomResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPlayerExitRoomResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINPlayerExitRoomResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPlayerExitRoomResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPlayerExitRoomResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPlayerExitRoomResponse.prototype.getExituserid = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINPlayerExitRoomResponse.prototype.setExituserid = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINPlayerExitRoomResponse.prototype.clearExituserid = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINPlayerExitRoomResponse.prototype.hasExituserid = function() {
return null != s.Message.getField(this, 3);
};
proto.BINPlayerExitRoomResponse.prototype.getOwneruserid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINPlayerExitRoomResponse.prototype.setOwneruserid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINPlayerExitRoomResponse.prototype.clearOwneruserid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINPlayerExitRoomResponse.prototype.hasOwneruserid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINPlayerExitRoomResponse.prototype.getChangeownerroomcd = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINPlayerExitRoomResponse.prototype.setChangeownerroomcd = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINPlayerExitRoomResponse.prototype.clearChangeownerroomcd = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINPlayerExitRoomResponse.prototype.hasChangeownerroomcd = function() {
return null != s.Message.getField(this, 5);
};
proto.BINCancelExitAfterMatchEndRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINCancelExitAfterMatchEndRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINCancelExitAfterMatchEndRequest.displayName = "proto.BINCancelExitAfterMatchEndRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINCancelExitAfterMatchEndRequest.prototype.toObject = function(e) {
return proto.BINCancelExitAfterMatchEndRequest.toObject(e, this);
};
proto.BINCancelExitAfterMatchEndRequest.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINCancelExitAfterMatchEndRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINCancelExitAfterMatchEndRequest();
return proto.BINCancelExitAfterMatchEndRequest.deserializeBinaryFromReader(o, t);
};
proto.BINCancelExitAfterMatchEndRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setRoomindex(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINCancelExitAfterMatchEndRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINCancelExitAfterMatchEndRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINCancelExitAfterMatchEndRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINCancelExitAfterMatchEndRequest.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINCancelExitAfterMatchEndRequest.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINCancelExitAfterMatchEndRequest.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINCancelExitAfterMatchEndRequest.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINCancelExitAfterMatchEndResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINCancelExitAfterMatchEndResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINCancelExitAfterMatchEndResponse.displayName = "proto.BINCancelExitAfterMatchEndResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINCancelExitAfterMatchEndResponse.prototype.toObject = function(e) {
return proto.BINCancelExitAfterMatchEndResponse.toObject(e, this);
};
proto.BINCancelExitAfterMatchEndResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
cancelexituserid: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINCancelExitAfterMatchEndResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINCancelExitAfterMatchEndResponse();
return proto.BINCancelExitAfterMatchEndResponse.deserializeBinaryFromReader(o, t);
};
proto.BINCancelExitAfterMatchEndResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = t.readInt64();
e.setCancelexituserid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINCancelExitAfterMatchEndResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINCancelExitAfterMatchEndResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINCancelExitAfterMatchEndResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.getCancelexituserid = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.setCancelexituserid = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.clearCancelexituserid = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINCancelExitAfterMatchEndResponse.prototype.hasCancelexituserid = function() {
return null != s.Message.getField(this, 3);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
filter_room_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "df8a7AYl6xLBYpFGp7dM3Sw", "filter_room_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINFilterRoomRequest", null, i);
r.exportSymbol("proto.BINFilterRoomResponse", null, i);
r.exportSymbol("proto.BINRoomPlay", null, i);
r.exportSymbol("proto.BINRoomStatus", null, i);
r.exportSymbol("proto.BINRoomStatusRequest", null, i);
r.exportSymbol("proto.BINRoomStatusResponse", null, i);
proto.BINFilterRoomRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINFilterRoomRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINFilterRoomRequest.displayName = "proto.BINFilterRoomRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFilterRoomRequest.prototype.toObject = function(e) {
return proto.BINFilterRoomRequest.toObject(e, this);
};
proto.BINFilterRoomRequest.toObject = function(e, t) {
var o = {
zoneid: s.Message.getField(t, 1),
roomtype: s.Message.getField(t, 2),
firstresult: s.Message.getField(t, 3),
maxresult: s.Message.getField(t, 4),
orderbyfield: s.Message.getField(t, 5),
asc: s.Message.getField(t, 6),
roomgroup: s.Message.getField(t, 7)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFilterRoomRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFilterRoomRequest();
return proto.BINFilterRoomRequest.deserializeBinaryFromReader(o, t);
};
proto.BINFilterRoomRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setZoneid(o);
break;

case 2:
o = t.readInt32();
e.setRoomtype(o);
break;

case 3:
o = t.readInt32();
e.setFirstresult(o);
break;

case 4:
o = t.readInt32();
e.setMaxresult(o);
break;

case 5:
o = t.readInt32();
e.setOrderbyfield(o);
break;

case 6:
o = t.readBool();
e.setAsc(o);
break;

case 7:
var o = t.readInt32();
e.setRoomgroup(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFilterRoomRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFilterRoomRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFilterRoomRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeBool(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt32(7, t);
};
proto.BINFilterRoomRequest.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINFilterRoomRequest.prototype.setZoneid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFilterRoomRequest.prototype.clearZoneid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFilterRoomRequest.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFilterRoomRequest.prototype.getRoomtype = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINFilterRoomRequest.prototype.setRoomtype = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFilterRoomRequest.prototype.clearRoomtype = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFilterRoomRequest.prototype.hasRoomtype = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFilterRoomRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINFilterRoomRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINFilterRoomRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINFilterRoomRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 3);
};
proto.BINFilterRoomRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINFilterRoomRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINFilterRoomRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINFilterRoomRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 4);
};
proto.BINFilterRoomRequest.prototype.getOrderbyfield = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINFilterRoomRequest.prototype.setOrderbyfield = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINFilterRoomRequest.prototype.clearOrderbyfield = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINFilterRoomRequest.prototype.hasOrderbyfield = function() {
return null != s.Message.getField(this, 5);
};
proto.BINFilterRoomRequest.prototype.getAsc = function() {
return s.Message.getFieldWithDefault(this, 6, !1);
};
proto.BINFilterRoomRequest.prototype.setAsc = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINFilterRoomRequest.prototype.clearAsc = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINFilterRoomRequest.prototype.hasAsc = function() {
return null != s.Message.getField(this, 6);
};
proto.BINFilterRoomRequest.prototype.getRoomgroup = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINFilterRoomRequest.prototype.setRoomgroup = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINFilterRoomRequest.prototype.clearRoomgroup = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINFilterRoomRequest.prototype.hasRoomgroup = function() {
return null != s.Message.getField(this, 7);
};
proto.BINRoomPlay = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRoomPlay, s.Message);
r.DEBUG && !COMPILED && (proto.BINRoomPlay.displayName = "proto.BINRoomPlay");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRoomPlay.prototype.toObject = function(e) {
return proto.BINRoomPlay.toObject(e, this);
};
proto.BINRoomPlay.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1),
roomname: s.Message.getField(t, 2),
roomid: s.Message.getField(t, 3),
roomgroupid: s.Message.getField(t, 4),
minbet: s.Message.getField(t, 5),
minentermoney: s.Message.getField(t, 6),
roomcapacity: s.Message.getField(t, 7),
enteringplayer: s.Message.getField(t, 8),
playersize: s.Message.getField(t, 9),
playingplayer: s.Message.getField(t, 10),
level: s.Message.getField(t, 11),
tax: s.Message.getField(t, 12),
ownerusername: s.Message.getField(t, 13),
viproom: s.Message.getField(t, 14),
passwordrequired: s.Message.getField(t, 15),
roomconfig: s.Message.getField(t, 16)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRoomPlay.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRoomPlay();
return proto.BINRoomPlay.deserializeBinaryFromReader(o, t);
};
proto.BINRoomPlay.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRoomindex(o);
break;

case 2:
o = t.readString();
e.setRoomname(o);
break;

case 3:
o = t.readInt64();
e.setRoomid(o);
break;

case 4:
o = t.readInt32();
e.setRoomgroupid(o);
break;

case 5:
o = t.readInt32();
e.setMinbet(o);
break;

case 6:
o = t.readInt64();
e.setMinentermoney(o);
break;

case 7:
o = t.readInt32();
e.setRoomcapacity(o);
break;

case 8:
o = t.readInt32();
e.setEnteringplayer(o);
break;

case 9:
o = t.readInt32();
e.setPlayersize(o);
break;

case 10:
o = t.readInt32();
e.setPlayingplayer(o);
break;

case 11:
o = t.readInt32();
e.setLevel(o);
break;

case 12:
o = t.readInt32();
e.setTax(o);
break;

case 13:
o = t.readString();
e.setOwnerusername(o);
break;

case 14:
o = t.readBool();
e.setViproom(o);
break;

case 15:
o = t.readBool();
e.setPasswordrequired(o);
break;

case 16:
var o = t.readString();
e.setRoomconfig(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRoomPlay.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRoomPlay.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRoomPlay.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt64(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt32(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeInt32(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeInt32(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeInt32(10, t);
null != (t = s.Message.getField(this, 11)) && e.writeInt32(11, t);
null != (t = s.Message.getField(this, 12)) && e.writeInt32(12, t);
null != (t = s.Message.getField(this, 13)) && e.writeString(13, t);
null != (t = s.Message.getField(this, 14)) && e.writeBool(14, t);
null != (t = s.Message.getField(this, 15)) && e.writeBool(15, t);
null != (t = s.Message.getField(this, 16)) && e.writeString(16, t);
};
proto.BINRoomPlay.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINRoomPlay.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRoomPlay.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRoomPlay.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRoomPlay.prototype.getRoomname = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINRoomPlay.prototype.setRoomname = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRoomPlay.prototype.clearRoomname = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRoomPlay.prototype.hasRoomname = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRoomPlay.prototype.getRoomid = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINRoomPlay.prototype.setRoomid = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINRoomPlay.prototype.clearRoomid = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINRoomPlay.prototype.hasRoomid = function() {
return null != s.Message.getField(this, 3);
};
proto.BINRoomPlay.prototype.getRoomgroupid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINRoomPlay.prototype.setRoomgroupid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINRoomPlay.prototype.clearRoomgroupid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINRoomPlay.prototype.hasRoomgroupid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINRoomPlay.prototype.getMinbet = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINRoomPlay.prototype.setMinbet = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINRoomPlay.prototype.clearMinbet = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINRoomPlay.prototype.hasMinbet = function() {
return null != s.Message.getField(this, 5);
};
proto.BINRoomPlay.prototype.getMinentermoney = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINRoomPlay.prototype.setMinentermoney = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINRoomPlay.prototype.clearMinentermoney = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINRoomPlay.prototype.hasMinentermoney = function() {
return null != s.Message.getField(this, 6);
};
proto.BINRoomPlay.prototype.getRoomcapacity = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINRoomPlay.prototype.setRoomcapacity = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINRoomPlay.prototype.clearRoomcapacity = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINRoomPlay.prototype.hasRoomcapacity = function() {
return null != s.Message.getField(this, 7);
};
proto.BINRoomPlay.prototype.getEnteringplayer = function() {
return s.Message.getFieldWithDefault(this, 8, 0);
};
proto.BINRoomPlay.prototype.setEnteringplayer = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINRoomPlay.prototype.clearEnteringplayer = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINRoomPlay.prototype.hasEnteringplayer = function() {
return null != s.Message.getField(this, 8);
};
proto.BINRoomPlay.prototype.getPlayersize = function() {
return s.Message.getFieldWithDefault(this, 9, 0);
};
proto.BINRoomPlay.prototype.setPlayersize = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINRoomPlay.prototype.clearPlayersize = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINRoomPlay.prototype.hasPlayersize = function() {
return null != s.Message.getField(this, 9);
};
proto.BINRoomPlay.prototype.getPlayingplayer = function() {
return s.Message.getFieldWithDefault(this, 10, 0);
};
proto.BINRoomPlay.prototype.setPlayingplayer = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINRoomPlay.prototype.clearPlayingplayer = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINRoomPlay.prototype.hasPlayingplayer = function() {
return null != s.Message.getField(this, 10);
};
proto.BINRoomPlay.prototype.getLevel = function() {
return s.Message.getFieldWithDefault(this, 11, 0);
};
proto.BINRoomPlay.prototype.setLevel = function(e) {
s.Message.setField(this, 11, e);
};
proto.BINRoomPlay.prototype.clearLevel = function() {
s.Message.setField(this, 11, void 0);
};
proto.BINRoomPlay.prototype.hasLevel = function() {
return null != s.Message.getField(this, 11);
};
proto.BINRoomPlay.prototype.getTax = function() {
return s.Message.getFieldWithDefault(this, 12, 0);
};
proto.BINRoomPlay.prototype.setTax = function(e) {
s.Message.setField(this, 12, e);
};
proto.BINRoomPlay.prototype.clearTax = function() {
s.Message.setField(this, 12, void 0);
};
proto.BINRoomPlay.prototype.hasTax = function() {
return null != s.Message.getField(this, 12);
};
proto.BINRoomPlay.prototype.getOwnerusername = function() {
return s.Message.getFieldWithDefault(this, 13, "");
};
proto.BINRoomPlay.prototype.setOwnerusername = function(e) {
s.Message.setField(this, 13, e);
};
proto.BINRoomPlay.prototype.clearOwnerusername = function() {
s.Message.setField(this, 13, void 0);
};
proto.BINRoomPlay.prototype.hasOwnerusername = function() {
return null != s.Message.getField(this, 13);
};
proto.BINRoomPlay.prototype.getViproom = function() {
return s.Message.getFieldWithDefault(this, 14, !1);
};
proto.BINRoomPlay.prototype.setViproom = function(e) {
s.Message.setField(this, 14, e);
};
proto.BINRoomPlay.prototype.clearViproom = function() {
s.Message.setField(this, 14, void 0);
};
proto.BINRoomPlay.prototype.hasViproom = function() {
return null != s.Message.getField(this, 14);
};
proto.BINRoomPlay.prototype.getPasswordrequired = function() {
return s.Message.getFieldWithDefault(this, 15, !1);
};
proto.BINRoomPlay.prototype.setPasswordrequired = function(e) {
s.Message.setField(this, 15, e);
};
proto.BINRoomPlay.prototype.clearPasswordrequired = function() {
s.Message.setField(this, 15, void 0);
};
proto.BINRoomPlay.prototype.hasPasswordrequired = function() {
return null != s.Message.getField(this, 15);
};
proto.BINRoomPlay.prototype.getRoomconfig = function() {
return s.Message.getFieldWithDefault(this, 16, "");
};
proto.BINRoomPlay.prototype.setRoomconfig = function(e) {
s.Message.setField(this, 16, e);
};
proto.BINRoomPlay.prototype.clearRoomconfig = function() {
s.Message.setField(this, 16, void 0);
};
proto.BINRoomPlay.prototype.hasRoomconfig = function() {
return null != s.Message.getField(this, 16);
};
proto.BINFilterRoomResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINFilterRoomResponse.repeatedFields_, null);
};
r.inherits(proto.BINFilterRoomResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINFilterRoomResponse.displayName = "proto.BINFilterRoomResponse");
proto.BINFilterRoomResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFilterRoomResponse.prototype.toObject = function(e) {
return proto.BINFilterRoomResponse.toObject(e, this);
};
proto.BINFilterRoomResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
roomplaysList: s.Message.toObjectList(t.getRoomplaysList(), proto.BINRoomPlay.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFilterRoomResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFilterRoomResponse();
return proto.BINFilterRoomResponse.deserializeBinaryFromReader(o, t);
};
proto.BINFilterRoomResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINRoomPlay();
t.readMessage(o, proto.BINRoomPlay.deserializeBinaryFromReader);
e.addRoomplays(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFilterRoomResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFilterRoomResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFilterRoomResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getRoomplaysList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINRoomPlay.serializeBinaryToWriter);
};
proto.BINFilterRoomResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINFilterRoomResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFilterRoomResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFilterRoomResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFilterRoomResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINFilterRoomResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFilterRoomResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFilterRoomResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFilterRoomResponse.prototype.getRoomplaysList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINRoomPlay, 3);
};
proto.BINFilterRoomResponse.prototype.setRoomplaysList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINFilterRoomResponse.prototype.addRoomplays = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINRoomPlay, t);
};
proto.BINFilterRoomResponse.prototype.clearRoomplaysList = function() {
this.setRoomplaysList([]);
};
proto.BINRoomStatusRequest = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINRoomStatusRequest.repeatedFields_, null);
};
r.inherits(proto.BINRoomStatusRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINRoomStatusRequest.displayName = "proto.BINRoomStatusRequest");
proto.BINRoomStatusRequest.repeatedFields_ = [ 2 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRoomStatusRequest.prototype.toObject = function(e) {
return proto.BINRoomStatusRequest.toObject(e, this);
};
proto.BINRoomStatusRequest.toObject = function(e, t) {
var o = {
zoneid: s.Message.getField(t, 1),
indexsList: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRoomStatusRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRoomStatusRequest();
return proto.BINRoomStatusRequest.deserializeBinaryFromReader(o, t);
};
proto.BINRoomStatusRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setZoneid(o);
break;

case 2:
var o = t.readInt32();
e.addIndexs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRoomStatusRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRoomStatusRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRoomStatusRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
(t = this.getIndexsList()).length > 0 && e.writeRepeatedInt32(2, t);
};
proto.BINRoomStatusRequest.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINRoomStatusRequest.prototype.setZoneid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRoomStatusRequest.prototype.clearZoneid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRoomStatusRequest.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRoomStatusRequest.prototype.getIndexsList = function() {
return s.Message.getField(this, 2);
};
proto.BINRoomStatusRequest.prototype.setIndexsList = function(e) {
s.Message.setField(this, 2, e || []);
};
proto.BINRoomStatusRequest.prototype.addIndexs = function(e, t) {
s.Message.addToRepeatedField(this, 2, e, t);
};
proto.BINRoomStatusRequest.prototype.clearIndexsList = function() {
this.setIndexsList([]);
};
proto.BINRoomStatus = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRoomStatus, s.Message);
r.DEBUG && !COMPILED && (proto.BINRoomStatus.displayName = "proto.BINRoomStatus");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRoomStatus.prototype.toObject = function(e) {
return proto.BINRoomStatus.toObject(e, this);
};
proto.BINRoomStatus.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1),
minbet: s.Message.getField(t, 2),
minentermoney: s.Message.getField(t, 3),
playersize: s.Message.getField(t, 4),
playingplayer: s.Message.getField(t, 5),
passwordrequired: s.Message.getField(t, 6)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRoomStatus.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRoomStatus();
return proto.BINRoomStatus.deserializeBinaryFromReader(o, t);
};
proto.BINRoomStatus.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRoomindex(o);
break;

case 2:
o = t.readInt32();
e.setMinbet(o);
break;

case 3:
o = t.readInt64();
e.setMinentermoney(o);
break;

case 4:
o = t.readInt32();
e.setPlayersize(o);
break;

case 5:
o = t.readInt32();
e.setPlayingplayer(o);
break;

case 6:
var o = t.readBool();
e.setPasswordrequired(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRoomStatus.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRoomStatus.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRoomStatus.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeBool(6, t);
};
proto.BINRoomStatus.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINRoomStatus.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRoomStatus.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRoomStatus.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRoomStatus.prototype.getMinbet = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINRoomStatus.prototype.setMinbet = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRoomStatus.prototype.clearMinbet = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRoomStatus.prototype.hasMinbet = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRoomStatus.prototype.getMinentermoney = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINRoomStatus.prototype.setMinentermoney = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINRoomStatus.prototype.clearMinentermoney = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINRoomStatus.prototype.hasMinentermoney = function() {
return null != s.Message.getField(this, 3);
};
proto.BINRoomStatus.prototype.getPlayersize = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINRoomStatus.prototype.setPlayersize = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINRoomStatus.prototype.clearPlayersize = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINRoomStatus.prototype.hasPlayersize = function() {
return null != s.Message.getField(this, 4);
};
proto.BINRoomStatus.prototype.getPlayingplayer = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINRoomStatus.prototype.setPlayingplayer = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINRoomStatus.prototype.clearPlayingplayer = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINRoomStatus.prototype.hasPlayingplayer = function() {
return null != s.Message.getField(this, 5);
};
proto.BINRoomStatus.prototype.getPasswordrequired = function() {
return s.Message.getFieldWithDefault(this, 6, !1);
};
proto.BINRoomStatus.prototype.setPasswordrequired = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINRoomStatus.prototype.clearPasswordrequired = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINRoomStatus.prototype.hasPasswordrequired = function() {
return null != s.Message.getField(this, 6);
};
proto.BINRoomStatusResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINRoomStatusResponse.repeatedFields_, null);
};
r.inherits(proto.BINRoomStatusResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINRoomStatusResponse.displayName = "proto.BINRoomStatusResponse");
proto.BINRoomStatusResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRoomStatusResponse.prototype.toObject = function(e) {
return proto.BINRoomStatusResponse.toObject(e, this);
};
proto.BINRoomStatusResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
roomstatusesList: s.Message.toObjectList(t.getRoomstatusesList(), proto.BINRoomStatus.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRoomStatusResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRoomStatusResponse();
return proto.BINRoomStatusResponse.deserializeBinaryFromReader(o, t);
};
proto.BINRoomStatusResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINRoomStatus();
t.readMessage(o, proto.BINRoomStatus.deserializeBinaryFromReader);
e.addRoomstatuses(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRoomStatusResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRoomStatusResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRoomStatusResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getRoomstatusesList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINRoomStatus.serializeBinaryToWriter);
};
proto.BINRoomStatusResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINRoomStatusResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRoomStatusResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRoomStatusResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRoomStatusResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINRoomStatusResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRoomStatusResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRoomStatusResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRoomStatusResponse.prototype.getRoomstatusesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINRoomStatus, 3);
};
proto.BINRoomStatusResponse.prototype.setRoomstatusesList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINRoomStatusResponse.prototype.addRoomstatuses = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINRoomStatus, t);
};
proto.BINRoomStatusResponse.prototype.clearRoomstatusesList = function() {
this.setRoomstatusesList([]);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
friend_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "300cajwemlM/bx1UWYO1LSU", "friend_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./user_info_pb.js");
r.exportSymbol("proto.BINAddFriend", null, i);
r.exportSymbol("proto.BINAddFriendRequest", null, i);
r.exportSymbol("proto.BINAddFriendResponse", null, i);
r.exportSymbol("proto.BINApproveAddFriendRequest", null, i);
r.exportSymbol("proto.BINApproveAddFriendResponse", null, i);
r.exportSymbol("proto.BINFilterAddFriendRequest", null, i);
r.exportSymbol("proto.BINFilterAddFriendResponse", null, i);
r.exportSymbol("proto.BINFilterFriendRequest", null, i);
r.exportSymbol("proto.BINFilterFriendResponse", null, i);
r.exportSymbol("proto.BINFindUserByIdRequest", null, i);
r.exportSymbol("proto.BINFindUserByIdResponse", null, i);
r.exportSymbol("proto.BINFindUserRequest", null, i);
r.exportSymbol("proto.BINFindUserResponse", null, i);
r.exportSymbol("proto.BINRemoveFriendRequest", null, i);
r.exportSymbol("proto.BINRemoveFriendResponse", null, i);
r.exportSymbol("proto.BINViewUserInfoRequest", null, i);
r.exportSymbol("proto.BINViewUserInfoResponse", null, i);
proto.BINFilterFriendRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINFilterFriendRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINFilterFriendRequest.displayName = "proto.BINFilterFriendRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFilterFriendRequest.prototype.toObject = function(e) {
return proto.BINFilterFriendRequest.toObject(e, this);
};
proto.BINFilterFriendRequest.toObject = function(e, t) {
var o = {
firstresult: s.Message.getField(t, 1),
maxresult: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFilterFriendRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFilterFriendRequest();
return proto.BINFilterFriendRequest.deserializeBinaryFromReader(o, t);
};
proto.BINFilterFriendRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setFirstresult(o);
break;

case 2:
var o = t.readInt32();
e.setMaxresult(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFilterFriendRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFilterFriendRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFilterFriendRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
};
proto.BINFilterFriendRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINFilterFriendRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFilterFriendRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFilterFriendRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFilterFriendRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINFilterFriendRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFilterFriendRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFilterFriendRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFilterFriendResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINFilterFriendResponse.repeatedFields_, null);
};
r.inherits(proto.BINFilterFriendResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINFilterFriendResponse.displayName = "proto.BINFilterFriendResponse");
proto.BINFilterFriendResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFilterFriendResponse.prototype.toObject = function(e) {
return proto.BINFilterFriendResponse.toObject(e, this);
};
proto.BINFilterFriendResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
currentfriendsList: s.Message.toObjectList(t.getCurrentfriendsList(), n.BINUserInfo.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFilterFriendResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFilterFriendResponse();
return proto.BINFilterFriendResponse.deserializeBinaryFromReader(o, t);
};
proto.BINFilterFriendResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new n.BINUserInfo();
t.readMessage(o, n.BINUserInfo.deserializeBinaryFromReader);
e.addCurrentfriends(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFilterFriendResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFilterFriendResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFilterFriendResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getCurrentfriendsList()).length > 0 && e.writeRepeatedMessage(3, t, n.BINUserInfo.serializeBinaryToWriter);
};
proto.BINFilterFriendResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINFilterFriendResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFilterFriendResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFilterFriendResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFilterFriendResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINFilterFriendResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFilterFriendResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFilterFriendResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFilterFriendResponse.prototype.getCurrentfriendsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINUserInfo, 3);
};
proto.BINFilterFriendResponse.prototype.setCurrentfriendsList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINFilterFriendResponse.prototype.addCurrentfriends = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINUserInfo, t);
};
proto.BINFilterFriendResponse.prototype.clearCurrentfriendsList = function() {
this.setCurrentfriendsList([]);
};
proto.BINAddFriendRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINAddFriendRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINAddFriendRequest.displayName = "proto.BINAddFriendRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINAddFriendRequest.prototype.toObject = function(e) {
return proto.BINAddFriendRequest.toObject(e, this);
};
proto.BINAddFriendRequest.toObject = function(e, t) {
var o = {
targetuserid: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINAddFriendRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINAddFriendRequest();
return proto.BINAddFriendRequest.deserializeBinaryFromReader(o, t);
};
proto.BINAddFriendRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt64();
e.setTargetuserid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINAddFriendRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINAddFriendRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINAddFriendRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
};
proto.BINAddFriendRequest.prototype.getTargetuserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINAddFriendRequest.prototype.setTargetuserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINAddFriendRequest.prototype.clearTargetuserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINAddFriendRequest.prototype.hasTargetuserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINAddFriendResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINAddFriendResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINAddFriendResponse.displayName = "proto.BINAddFriendResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINAddFriendResponse.prototype.toObject = function(e) {
return proto.BINAddFriendResponse.toObject(e, this);
};
proto.BINAddFriendResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
friendstatus: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINAddFriendResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINAddFriendResponse();
return proto.BINAddFriendResponse.deserializeBinaryFromReader(o, t);
};
proto.BINAddFriendResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = t.readInt32();
e.setFriendstatus(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINAddFriendResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINAddFriendResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINAddFriendResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
};
proto.BINAddFriendResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINAddFriendResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINAddFriendResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINAddFriendResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINAddFriendResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINAddFriendResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINAddFriendResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINAddFriendResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINAddFriendResponse.prototype.getFriendstatus = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINAddFriendResponse.prototype.setFriendstatus = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINAddFriendResponse.prototype.clearFriendstatus = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINAddFriendResponse.prototype.hasFriendstatus = function() {
return null != s.Message.getField(this, 3);
};
proto.BINAddFriend = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINAddFriend, s.Message);
r.DEBUG && !COMPILED && (proto.BINAddFriend.displayName = "proto.BINAddFriend");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINAddFriend.prototype.toObject = function(e) {
return proto.BINAddFriend.toObject(e, this);
};
proto.BINAddFriend.toObject = function(e, t) {
var o, r = {
requestid: s.Message.getField(t, 1),
senderuser: (o = t.getSenderuser()) && n.BINUserInfo.toObject(e, o)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINAddFriend.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINAddFriend();
return proto.BINAddFriend.deserializeBinaryFromReader(o, t);
};
proto.BINAddFriend.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRequestid(o);
break;

case 2:
var o = new n.BINUserInfo();
t.readMessage(o, n.BINUserInfo.deserializeBinaryFromReader);
e.setSenderuser(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINAddFriend.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINAddFriend.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINAddFriend.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = this.getSenderuser()) && e.writeMessage(2, t, n.BINUserInfo.serializeBinaryToWriter);
};
proto.BINAddFriend.prototype.getRequestid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINAddFriend.prototype.setRequestid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINAddFriend.prototype.clearRequestid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINAddFriend.prototype.hasRequestid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINAddFriend.prototype.getSenderuser = function() {
return s.Message.getWrapperField(this, n.BINUserInfo, 2, 1);
};
proto.BINAddFriend.prototype.setSenderuser = function(e) {
s.Message.setWrapperField(this, 2, e);
};
proto.BINAddFriend.prototype.clearSenderuser = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINAddFriend.prototype.hasSenderuser = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFilterAddFriendRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINFilterAddFriendRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINFilterAddFriendRequest.displayName = "proto.BINFilterAddFriendRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFilterAddFriendRequest.prototype.toObject = function(e) {
return proto.BINFilterAddFriendRequest.toObject(e, this);
};
proto.BINFilterAddFriendRequest.toObject = function(e, t) {
var o = {
firstresult: s.Message.getField(t, 1),
maxresult: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFilterAddFriendRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFilterAddFriendRequest();
return proto.BINFilterAddFriendRequest.deserializeBinaryFromReader(o, t);
};
proto.BINFilterAddFriendRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setFirstresult(o);
break;

case 2:
var o = t.readInt32();
e.setMaxresult(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFilterAddFriendRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFilterAddFriendRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFilterAddFriendRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
};
proto.BINFilterAddFriendRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINFilterAddFriendRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFilterAddFriendRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFilterAddFriendRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFilterAddFriendRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINFilterAddFriendRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFilterAddFriendRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFilterAddFriendRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFilterAddFriendResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINFilterAddFriendResponse.repeatedFields_, null);
};
r.inherits(proto.BINFilterAddFriendResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINFilterAddFriendResponse.displayName = "proto.BINFilterAddFriendResponse");
proto.BINFilterAddFriendResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFilterAddFriendResponse.prototype.toObject = function(e) {
return proto.BINFilterAddFriendResponse.toObject(e, this);
};
proto.BINFilterAddFriendResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
requestfriendsList: s.Message.toObjectList(t.getRequestfriendsList(), proto.BINAddFriend.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFilterAddFriendResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFilterAddFriendResponse();
return proto.BINFilterAddFriendResponse.deserializeBinaryFromReader(o, t);
};
proto.BINFilterAddFriendResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINAddFriend();
t.readMessage(o, proto.BINAddFriend.deserializeBinaryFromReader);
e.addRequestfriends(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFilterAddFriendResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFilterAddFriendResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFilterAddFriendResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getRequestfriendsList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINAddFriend.serializeBinaryToWriter);
};
proto.BINFilterAddFriendResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINFilterAddFriendResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFilterAddFriendResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFilterAddFriendResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFilterAddFriendResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINFilterAddFriendResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFilterAddFriendResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFilterAddFriendResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFilterAddFriendResponse.prototype.getRequestfriendsList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINAddFriend, 3);
};
proto.BINFilterAddFriendResponse.prototype.setRequestfriendsList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINFilterAddFriendResponse.prototype.addRequestfriends = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINAddFriend, t);
};
proto.BINFilterAddFriendResponse.prototype.clearRequestfriendsList = function() {
this.setRequestfriendsList([]);
};
proto.BINApproveAddFriendRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINApproveAddFriendRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINApproveAddFriendRequest.displayName = "proto.BINApproveAddFriendRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINApproveAddFriendRequest.prototype.toObject = function(e) {
return proto.BINApproveAddFriendRequest.toObject(e, this);
};
proto.BINApproveAddFriendRequest.toObject = function(e, t) {
var o = {
senderuserid: s.Message.getField(t, 1),
accepted: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINApproveAddFriendRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINApproveAddFriendRequest();
return proto.BINApproveAddFriendRequest.deserializeBinaryFromReader(o, t);
};
proto.BINApproveAddFriendRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setSenderuserid(o);
break;

case 2:
var o = t.readBool();
e.setAccepted(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINApproveAddFriendRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINApproveAddFriendRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINApproveAddFriendRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeBool(2, t);
};
proto.BINApproveAddFriendRequest.prototype.getSenderuserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINApproveAddFriendRequest.prototype.setSenderuserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINApproveAddFriendRequest.prototype.clearSenderuserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINApproveAddFriendRequest.prototype.hasSenderuserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINApproveAddFriendRequest.prototype.getAccepted = function() {
return s.Message.getFieldWithDefault(this, 2, !1);
};
proto.BINApproveAddFriendRequest.prototype.setAccepted = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINApproveAddFriendRequest.prototype.clearAccepted = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINApproveAddFriendRequest.prototype.hasAccepted = function() {
return null != s.Message.getField(this, 2);
};
proto.BINApproveAddFriendResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINApproveAddFriendResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINApproveAddFriendResponse.displayName = "proto.BINApproveAddFriendResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINApproveAddFriendResponse.prototype.toObject = function(e) {
return proto.BINApproveAddFriendResponse.toObject(e, this);
};
proto.BINApproveAddFriendResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
friendstatus: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINApproveAddFriendResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINApproveAddFriendResponse();
return proto.BINApproveAddFriendResponse.deserializeBinaryFromReader(o, t);
};
proto.BINApproveAddFriendResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = t.readInt32();
e.setFriendstatus(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINApproveAddFriendResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINApproveAddFriendResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINApproveAddFriendResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
};
proto.BINApproveAddFriendResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINApproveAddFriendResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINApproveAddFriendResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINApproveAddFriendResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINApproveAddFriendResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINApproveAddFriendResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINApproveAddFriendResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINApproveAddFriendResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINApproveAddFriendResponse.prototype.getFriendstatus = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINApproveAddFriendResponse.prototype.setFriendstatus = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINApproveAddFriendResponse.prototype.clearFriendstatus = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINApproveAddFriendResponse.prototype.hasFriendstatus = function() {
return null != s.Message.getField(this, 3);
};
proto.BINFindUserRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINFindUserRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINFindUserRequest.displayName = "proto.BINFindUserRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFindUserRequest.prototype.toObject = function(e) {
return proto.BINFindUserRequest.toObject(e, this);
};
proto.BINFindUserRequest.toObject = function(e, t) {
var o = {
usernamequery: s.Message.getField(t, 1),
firstresult: s.Message.getField(t, 2),
maxresult: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFindUserRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFindUserRequest();
return proto.BINFindUserRequest.deserializeBinaryFromReader(o, t);
};
proto.BINFindUserRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setUsernamequery(o);
break;

case 2:
o = t.readInt32();
e.setFirstresult(o);
break;

case 3:
var o = t.readInt32();
e.setMaxresult(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFindUserRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFindUserRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFindUserRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
};
proto.BINFindUserRequest.prototype.getUsernamequery = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINFindUserRequest.prototype.setUsernamequery = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFindUserRequest.prototype.clearUsernamequery = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFindUserRequest.prototype.hasUsernamequery = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFindUserRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINFindUserRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFindUserRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFindUserRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFindUserRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINFindUserRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINFindUserRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINFindUserRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 3);
};
proto.BINFindUserResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINFindUserResponse.repeatedFields_, null);
};
r.inherits(proto.BINFindUserResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINFindUserResponse.displayName = "proto.BINFindUserResponse");
proto.BINFindUserResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFindUserResponse.prototype.toObject = function(e) {
return proto.BINFindUserResponse.toObject(e, this);
};
proto.BINFindUserResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
userinfosList: s.Message.toObjectList(t.getUserinfosList(), n.BINUserInfo.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFindUserResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFindUserResponse();
return proto.BINFindUserResponse.deserializeBinaryFromReader(o, t);
};
proto.BINFindUserResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new n.BINUserInfo();
t.readMessage(o, n.BINUserInfo.deserializeBinaryFromReader);
e.addUserinfos(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFindUserResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFindUserResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFindUserResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getUserinfosList()).length > 0 && e.writeRepeatedMessage(3, t, n.BINUserInfo.serializeBinaryToWriter);
};
proto.BINFindUserResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINFindUserResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFindUserResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFindUserResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFindUserResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINFindUserResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFindUserResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFindUserResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFindUserResponse.prototype.getUserinfosList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINUserInfo, 3);
};
proto.BINFindUserResponse.prototype.setUserinfosList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINFindUserResponse.prototype.addUserinfos = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINUserInfo, t);
};
proto.BINFindUserResponse.prototype.clearUserinfosList = function() {
this.setUserinfosList([]);
};
proto.BINFindUserByIdRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINFindUserByIdRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINFindUserByIdRequest.displayName = "proto.BINFindUserByIdRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFindUserByIdRequest.prototype.toObject = function(e) {
return proto.BINFindUserByIdRequest.toObject(e, this);
};
proto.BINFindUserByIdRequest.toObject = function(e, t) {
var o = {
targetuserid: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFindUserByIdRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFindUserByIdRequest();
return proto.BINFindUserByIdRequest.deserializeBinaryFromReader(o, t);
};
proto.BINFindUserByIdRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt64();
e.setTargetuserid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFindUserByIdRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFindUserByIdRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFindUserByIdRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
};
proto.BINFindUserByIdRequest.prototype.getTargetuserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINFindUserByIdRequest.prototype.setTargetuserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFindUserByIdRequest.prototype.clearTargetuserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFindUserByIdRequest.prototype.hasTargetuserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFindUserByIdResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINFindUserByIdResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINFindUserByIdResponse.displayName = "proto.BINFindUserByIdResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFindUserByIdResponse.prototype.toObject = function(e) {
return proto.BINFindUserByIdResponse.toObject(e, this);
};
proto.BINFindUserByIdResponse.toObject = function(e, t) {
var o, r = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
userinfo: (o = t.getUserinfo()) && n.BINUserInfo.toObject(e, o)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINFindUserByIdResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFindUserByIdResponse();
return proto.BINFindUserByIdResponse.deserializeBinaryFromReader(o, t);
};
proto.BINFindUserByIdResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new n.BINUserInfo();
t.readMessage(o, n.BINUserInfo.deserializeBinaryFromReader);
e.setUserinfo(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFindUserByIdResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFindUserByIdResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFindUserByIdResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = this.getUserinfo()) && e.writeMessage(3, t, n.BINUserInfo.serializeBinaryToWriter);
};
proto.BINFindUserByIdResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINFindUserByIdResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFindUserByIdResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFindUserByIdResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFindUserByIdResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINFindUserByIdResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFindUserByIdResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFindUserByIdResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFindUserByIdResponse.prototype.getUserinfo = function() {
return s.Message.getWrapperField(this, n.BINUserInfo, 3);
};
proto.BINFindUserByIdResponse.prototype.setUserinfo = function(e) {
s.Message.setWrapperField(this, 3, e);
};
proto.BINFindUserByIdResponse.prototype.clearUserinfo = function() {
this.setUserinfo(void 0);
};
proto.BINFindUserByIdResponse.prototype.hasUserinfo = function() {
return null != s.Message.getField(this, 3);
};
proto.BINViewUserInfoRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINViewUserInfoRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINViewUserInfoRequest.displayName = "proto.BINViewUserInfoRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINViewUserInfoRequest.prototype.toObject = function(e) {
return proto.BINViewUserInfoRequest.toObject(e, this);
};
proto.BINViewUserInfoRequest.toObject = function(e, t) {
var o = {
targetuserid: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINViewUserInfoRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINViewUserInfoRequest();
return proto.BINViewUserInfoRequest.deserializeBinaryFromReader(o, t);
};
proto.BINViewUserInfoRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt64();
e.setTargetuserid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINViewUserInfoRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINViewUserInfoRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINViewUserInfoRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
};
proto.BINViewUserInfoRequest.prototype.getTargetuserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINViewUserInfoRequest.prototype.setTargetuserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINViewUserInfoRequest.prototype.clearTargetuserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINViewUserInfoRequest.prototype.hasTargetuserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINViewUserInfoResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINViewUserInfoResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINViewUserInfoResponse.displayName = "proto.BINViewUserInfoResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINViewUserInfoResponse.prototype.toObject = function(e) {
return proto.BINViewUserInfoResponse.toObject(e, this);
};
proto.BINViewUserInfoResponse.toObject = function(e, t) {
var o, r = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
userinfo: (o = t.getUserinfo()) && n.BINUserInfo.toObject(e, o),
friendstatus: s.Message.getField(t, 4)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINViewUserInfoResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINViewUserInfoResponse();
return proto.BINViewUserInfoResponse.deserializeBinaryFromReader(o, t);
};
proto.BINViewUserInfoResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = new n.BINUserInfo();
t.readMessage(o, n.BINUserInfo.deserializeBinaryFromReader);
e.setUserinfo(o);
break;

case 4:
var o = t.readInt32();
e.setFriendstatus(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINViewUserInfoResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINViewUserInfoResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINViewUserInfoResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = this.getUserinfo()) && e.writeMessage(3, t, n.BINUserInfo.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
};
proto.BINViewUserInfoResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINViewUserInfoResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINViewUserInfoResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINViewUserInfoResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINViewUserInfoResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINViewUserInfoResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINViewUserInfoResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINViewUserInfoResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINViewUserInfoResponse.prototype.getUserinfo = function() {
return s.Message.getWrapperField(this, n.BINUserInfo, 3);
};
proto.BINViewUserInfoResponse.prototype.setUserinfo = function(e) {
s.Message.setWrapperField(this, 3, e);
};
proto.BINViewUserInfoResponse.prototype.clearUserinfo = function() {
this.setUserinfo(void 0);
};
proto.BINViewUserInfoResponse.prototype.hasUserinfo = function() {
return null != s.Message.getField(this, 3);
};
proto.BINViewUserInfoResponse.prototype.getFriendstatus = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINViewUserInfoResponse.prototype.setFriendstatus = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINViewUserInfoResponse.prototype.clearFriendstatus = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINViewUserInfoResponse.prototype.hasFriendstatus = function() {
return null != s.Message.getField(this, 4);
};
proto.BINRemoveFriendRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRemoveFriendRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINRemoveFriendRequest.displayName = "proto.BINRemoveFriendRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRemoveFriendRequest.prototype.toObject = function(e) {
return proto.BINRemoveFriendRequest.toObject(e, this);
};
proto.BINRemoveFriendRequest.toObject = function(e, t) {
var o = {
targetuserid: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRemoveFriendRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRemoveFriendRequest();
return proto.BINRemoveFriendRequest.deserializeBinaryFromReader(o, t);
};
proto.BINRemoveFriendRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt64();
e.setTargetuserid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRemoveFriendRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRemoveFriendRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRemoveFriendRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
};
proto.BINRemoveFriendRequest.prototype.getTargetuserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINRemoveFriendRequest.prototype.setTargetuserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRemoveFriendRequest.prototype.clearTargetuserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRemoveFriendRequest.prototype.hasTargetuserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRemoveFriendResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRemoveFriendResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINRemoveFriendResponse.displayName = "proto.BINRemoveFriendResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRemoveFriendResponse.prototype.toObject = function(e) {
return proto.BINRemoveFriendResponse.toObject(e, this);
};
proto.BINRemoveFriendResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
friendstatus: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRemoveFriendResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRemoveFriendResponse();
return proto.BINRemoveFriendResponse.deserializeBinaryFromReader(o, t);
};
proto.BINRemoveFriendResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = t.readInt32();
e.setFriendstatus(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRemoveFriendResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRemoveFriendResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRemoveFriendResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
};
proto.BINRemoveFriendResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINRemoveFriendResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRemoveFriendResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRemoveFriendResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRemoveFriendResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINRemoveFriendResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRemoveFriendResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRemoveFriendResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRemoveFriendResponse.prototype.getFriendstatus = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINRemoveFriendResponse.prototype.setFriendstatus = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINRemoveFriendResponse.prototype.clearFriendstatus = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINRemoveFriendResponse.prototype.hasFriendstatus = function() {
return null != s.Message.getField(this, 3);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./user_info_pb.js": "user_info_pb",
"google-protobuf": "google-protobuf"
} ],
gift_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "db51f/MBcBKMLkME1N3AaA7", "gift_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./map_field_entry_pb.js");
r.exportSymbol("proto.BINGiftCode", null, i);
r.exportSymbol("proto.BINRedeemGiftCodeHistoryRequest", null, i);
r.exportSymbol("proto.BINRedeemGiftCodeHistoryResponse", null, i);
r.exportSymbol("proto.BINRedeemGiftCodeRequest", null, i);
r.exportSymbol("proto.BINRedeemGiftCodeResponse", null, i);
proto.BINRedeemGiftCodeRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRedeemGiftCodeRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINRedeemGiftCodeRequest.displayName = "proto.BINRedeemGiftCodeRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRedeemGiftCodeRequest.prototype.toObject = function(e) {
return proto.BINRedeemGiftCodeRequest.toObject(e, this);
};
proto.BINRedeemGiftCodeRequest.toObject = function(e, t) {
var o = {
giftcode: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRedeemGiftCodeRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRedeemGiftCodeRequest();
return proto.BINRedeemGiftCodeRequest.deserializeBinaryFromReader(o, t);
};
proto.BINRedeemGiftCodeRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readString();
e.setGiftcode(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRedeemGiftCodeRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRedeemGiftCodeRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRedeemGiftCodeRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
};
proto.BINRedeemGiftCodeRequest.prototype.getGiftcode = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINRedeemGiftCodeRequest.prototype.setGiftcode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRedeemGiftCodeRequest.prototype.clearGiftcode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRedeemGiftCodeRequest.prototype.hasGiftcode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRedeemGiftCodeResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINRedeemGiftCodeResponse.repeatedFields_, null);
};
r.inherits(proto.BINRedeemGiftCodeResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINRedeemGiftCodeResponse.displayName = "proto.BINRedeemGiftCodeResponse");
proto.BINRedeemGiftCodeResponse.repeatedFields_ = [ 4 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRedeemGiftCodeResponse.prototype.toObject = function(e) {
return proto.BINRedeemGiftCodeResponse.toObject(e, this);
};
proto.BINRedeemGiftCodeResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
success: s.Message.getField(t, 3),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRedeemGiftCodeResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRedeemGiftCodeResponse();
return proto.BINRedeemGiftCodeResponse.deserializeBinaryFromReader(o, t);
};
proto.BINRedeemGiftCodeResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readBool();
e.setSuccess(o);
break;

case 4:
var o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRedeemGiftCodeResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRedeemGiftCodeResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRedeemGiftCodeResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeBool(3, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(4, t, n.BINMapFieldEntry.serializeBinaryToWriter);
};
proto.BINRedeemGiftCodeResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINRedeemGiftCodeResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRedeemGiftCodeResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRedeemGiftCodeResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRedeemGiftCodeResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINRedeemGiftCodeResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRedeemGiftCodeResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRedeemGiftCodeResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRedeemGiftCodeResponse.prototype.getSuccess = function() {
return s.Message.getFieldWithDefault(this, 3, !1);
};
proto.BINRedeemGiftCodeResponse.prototype.setSuccess = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINRedeemGiftCodeResponse.prototype.clearSuccess = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINRedeemGiftCodeResponse.prototype.hasSuccess = function() {
return null != s.Message.getField(this, 3);
};
proto.BINRedeemGiftCodeResponse.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 4);
};
proto.BINRedeemGiftCodeResponse.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 4, e);
};
proto.BINRedeemGiftCodeResponse.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 4, e, proto.BINMapFieldEntry, t);
};
proto.BINRedeemGiftCodeResponse.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINGiftCode = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINGiftCode, s.Message);
r.DEBUG && !COMPILED && (proto.BINGiftCode.displayName = "proto.BINGiftCode");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINGiftCode.prototype.toObject = function(e) {
return proto.BINGiftCode.toObject(e, this);
};
proto.BINGiftCode.toObject = function(e, t) {
var o = {
giftcode: s.Message.getField(t, 1),
redeemuserid: s.Message.getField(t, 2),
redeemtime: s.Message.getField(t, 3),
cash: s.Message.getField(t, 4),
gold: s.Message.getField(t, 5)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINGiftCode.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINGiftCode();
return proto.BINGiftCode.deserializeBinaryFromReader(o, t);
};
proto.BINGiftCode.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setGiftcode(o);
break;

case 2:
o = t.readInt64();
e.setRedeemuserid(o);
break;

case 3:
o = t.readInt64();
e.setRedeemtime(o);
break;

case 4:
o = t.readInt32();
e.setCash(o);
break;

case 5:
var o = t.readInt32();
e.setGold(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINGiftCode.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINGiftCode.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINGiftCode.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt64(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
};
proto.BINGiftCode.prototype.getGiftcode = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINGiftCode.prototype.setGiftcode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINGiftCode.prototype.clearGiftcode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINGiftCode.prototype.hasGiftcode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINGiftCode.prototype.getRedeemuserid = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINGiftCode.prototype.setRedeemuserid = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINGiftCode.prototype.clearRedeemuserid = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINGiftCode.prototype.hasRedeemuserid = function() {
return null != s.Message.getField(this, 2);
};
proto.BINGiftCode.prototype.getRedeemtime = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINGiftCode.prototype.setRedeemtime = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINGiftCode.prototype.clearRedeemtime = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINGiftCode.prototype.hasRedeemtime = function() {
return null != s.Message.getField(this, 3);
};
proto.BINGiftCode.prototype.getCash = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINGiftCode.prototype.setCash = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINGiftCode.prototype.clearCash = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINGiftCode.prototype.hasCash = function() {
return null != s.Message.getField(this, 4);
};
proto.BINGiftCode.prototype.getGold = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINGiftCode.prototype.setGold = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINGiftCode.prototype.clearGold = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINGiftCode.prototype.hasGold = function() {
return null != s.Message.getField(this, 5);
};
proto.BINRedeemGiftCodeHistoryRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRedeemGiftCodeHistoryRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINRedeemGiftCodeHistoryRequest.displayName = "proto.BINRedeemGiftCodeHistoryRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRedeemGiftCodeHistoryRequest.prototype.toObject = function(e) {
return proto.BINRedeemGiftCodeHistoryRequest.toObject(e, this);
};
proto.BINRedeemGiftCodeHistoryRequest.toObject = function(e, t) {
var o = {
firstresult: s.Message.getField(t, 1),
maxresult: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRedeemGiftCodeHistoryRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRedeemGiftCodeHistoryRequest();
return proto.BINRedeemGiftCodeHistoryRequest.deserializeBinaryFromReader(o, t);
};
proto.BINRedeemGiftCodeHistoryRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setFirstresult(o);
break;

case 2:
var o = t.readInt32();
e.setMaxresult(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRedeemGiftCodeHistoryRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRedeemGiftCodeHistoryRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRedeemGiftCodeHistoryResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINRedeemGiftCodeHistoryResponse.repeatedFields_, null);
};
r.inherits(proto.BINRedeemGiftCodeHistoryResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINRedeemGiftCodeHistoryResponse.displayName = "proto.BINRedeemGiftCodeHistoryResponse");
proto.BINRedeemGiftCodeHistoryResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRedeemGiftCodeHistoryResponse.prototype.toObject = function(e) {
return proto.BINRedeemGiftCodeHistoryResponse.toObject(e, this);
};
proto.BINRedeemGiftCodeHistoryResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
giftcodesList: s.Message.toObjectList(t.getGiftcodesList(), proto.BINGiftCode.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRedeemGiftCodeHistoryResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRedeemGiftCodeHistoryResponse();
return proto.BINRedeemGiftCodeHistoryResponse.deserializeBinaryFromReader(o, t);
};
proto.BINRedeemGiftCodeHistoryResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINGiftCode();
t.readMessage(o, proto.BINGiftCode.deserializeBinaryFromReader);
e.addGiftcodes(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRedeemGiftCodeHistoryResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getGiftcodesList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINGiftCode.serializeBinaryToWriter);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.getGiftcodesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINGiftCode, 3);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.setGiftcodesList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.addGiftcodes = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINGiftCode, t);
};
proto.BINRedeemGiftCodeHistoryResponse.prototype.clearGiftcodesList = function() {
this.setGiftcodesList([]);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./map_field_entry_pb.js": "map_field_entry_pb",
"google-protobuf": "google-protobuf"
} ],
"google-protobuf": [ function(require, module, exports) {
(function(global) {
"use strict";
cc._RF.push(module, "c32a7ph7LpK2a6Rc6MvqsSn", "google-protobuf");
var _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
return typeof e;
} : function(e) {
return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
}, $jscomp = {
scope: {},
getGlobal: function(e) {
return "undefined" != typeof window && window === e ? e : "undefined" != typeof global ? global : e;
}
};
$jscomp.global = $jscomp.getGlobal("undefined" == typeof window ? module.exports : window);
$jscomp.initSymbol = function() {
$jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
$jscomp.initSymbol = function() {};
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function(e) {
return "jscomp_symbol_" + e + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function() {
$jscomp.initSymbol();
$jscomp.global.Symbol.iterator || ($jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
$jscomp.initSymbolIterator = function() {};
};
$jscomp.makeIterator = function(e) {
$jscomp.initSymbolIterator();
$jscomp.initSymbol();
$jscomp.initSymbolIterator();
var t = e[Symbol.iterator];
if (t) return t.call(e);
var o = 0;
return {
next: function() {
return o < e.length ? {
done: !1,
value: e[o++]
} : {
done: !0
};
}
};
};
$jscomp.arrayFromIterator = function(e) {
for (var t, o = []; !(t = e.next()).done; ) o.push(t.value);
return o;
};
$jscomp.arrayFromIterable = function(e) {
return e instanceof Array ? e : $jscomp.arrayFromIterator($jscomp.makeIterator(e));
};
$jscomp.inherits = function(e, t) {
function o() {}
o.prototype = t.prototype;
e.prototype = new o();
e.prototype.constructor = e;
for (var s in t) if (Object.defineProperties) {
var r = Object.getOwnPropertyDescriptor(t, s);
r && Object.defineProperty(e, s, r);
} else e[s] = t[s];
};
$jscomp.array = $jscomp.array || {};
$jscomp.iteratorFromArray = function(e, t) {
$jscomp.initSymbolIterator();
e instanceof String && (e += "");
var o = 0, s = {
next: function() {
if (o < e.length) {
var r = o++;
return {
value: t(r, e[r]),
done: !1
};
}
s.next = function() {
return {
done: !0,
value: void 0
};
};
return s.next();
}
};
$jscomp.initSymbol();
$jscomp.initSymbolIterator();
s[Symbol.iterator] = function() {
return s;
};
return s;
};
$jscomp.findInternal = function(e, t, o) {
e instanceof String && (e = String(e));
for (var s = e.length, r = 0; r < s; r++) {
var i = e[r];
if (t.call(o, i, r, e)) return {
i: r,
v: i
};
}
return {
i: -1,
v: void 0
};
};
$jscomp.array.from = function(e, t, o) {
$jscomp.initSymbolIterator();
t = null != t ? t : function(e) {
return e;
};
var s = [];
$jscomp.initSymbol();
$jscomp.initSymbolIterator();
"function" == typeof (r = e[Symbol.iterator]) && (e = r.call(e));
if ("function" == typeof e.next) for (;!(r = e.next()).done; ) s.push(t.call(o, r.value)); else for (var r = e.length, i = 0; i < r; i++) s.push(t.call(o, e[i]));
return s;
};
$jscomp.array.of = function(e) {
return $jscomp.array.from(arguments);
};
$jscomp.array.entries = function() {
return $jscomp.iteratorFromArray(this, function(e, t) {
return [ e, t ];
});
};
$jscomp.array.installHelper_ = function(e, t) {
!Array.prototype[e] && Object.defineProperties && Object.defineProperty && Object.defineProperty(Array.prototype, e, {
configurable: !0,
enumerable: !1,
writable: !0,
value: t
});
};
$jscomp.array.entries$install = function() {
$jscomp.array.installHelper_("entries", $jscomp.array.entries);
};
$jscomp.array.keys = function() {
return $jscomp.iteratorFromArray(this, function(e) {
return e;
});
};
$jscomp.array.keys$install = function() {
$jscomp.array.installHelper_("keys", $jscomp.array.keys);
};
$jscomp.array.values = function() {
return $jscomp.iteratorFromArray(this, function(e, t) {
return t;
});
};
$jscomp.array.values$install = function() {
$jscomp.array.installHelper_("values", $jscomp.array.values);
};
$jscomp.array.copyWithin = function(e, t, o) {
var s = this.length;
e = Number(e);
t = Number(t);
o = Number(null != o ? o : s);
if (e < t) for (o = Math.min(o, s); t < o; ) t in this ? this[e++] = this[t++] : (delete this[e++], 
t++); else for (o = Math.min(o, s + t - e), e += o - t; o > t; ) --o in this ? this[--e] = this[o] : delete this[e];
return this;
};
$jscomp.array.copyWithin$install = function() {
$jscomp.array.installHelper_("copyWithin", $jscomp.array.copyWithin);
};
$jscomp.array.fill = function(e, t, o) {
var s = this.length || 0;
0 > t && (t = Math.max(0, s + t));
(null == o || o > s) && (o = s);
0 > (o = Number(o)) && (o = Math.max(0, s + o));
for (t = Number(t || 0); t < o; t++) this[t] = e;
return this;
};
$jscomp.array.fill$install = function() {
$jscomp.array.installHelper_("fill", $jscomp.array.fill);
};
$jscomp.array.find = function(e, t) {
return $jscomp.findInternal(this, e, t).v;
};
$jscomp.array.find$install = function() {
$jscomp.array.installHelper_("find", $jscomp.array.find);
};
$jscomp.array.findIndex = function(e, t) {
return $jscomp.findInternal(this, e, t).i;
};
$jscomp.array.findIndex$install = function() {
$jscomp.array.installHelper_("findIndex", $jscomp.array.findIndex);
};
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.Map$isConformant = function() {
if ($jscomp.ASSUME_NO_NATIVE_MAP) return !1;
var e = $jscomp.global.Map;
if (!e || !e.prototype.entries || "function" != typeof Object.seal) return !1;
try {
var t = Object.seal({
x: 4
}), o = new e($jscomp.makeIterator([ [ t, "s" ] ]));
if ("s" != o.get(t) || 1 != o.size || o.get({
x: 4
}) || o.set({
x: 4
}, "t") != o || 2 != o.size) return !1;
var s = o.entries(), r = s.next();
return !r.done && r.value[0] == t && "s" == r.value[1] && !((r = s.next()).done || 4 != r.value[0].x || "t" != r.value[1] || !s.next().done);
} catch (e) {
return !1;
}
};
$jscomp.Map = function(e) {
this.data_ = {};
this.head_ = $jscomp.Map.createHead();
this.size = 0;
if (e) {
e = $jscomp.makeIterator(e);
for (var t; !(t = e.next()).done; ) t = t.value, this.set(t[0], t[1]);
}
};
$jscomp.Map.prototype.set = function(e, t) {
var o = $jscomp.Map.maybeGetEntry(this, e);
o.list || (o.list = this.data_[o.id] = []);
o.entry ? o.entry.value = t : (o.entry = {
next: this.head_,
previous: this.head_.previous,
head: this.head_,
key: e,
value: t
}, o.list.push(o.entry), this.head_.previous.next = o.entry, this.head_.previous = o.entry, 
this.size++);
return this;
};
$jscomp.Map.prototype.delete = function(e) {
return !(!(e = $jscomp.Map.maybeGetEntry(this, e)).entry || !e.list) && (e.list.splice(e.index, 1), 
e.list.length || delete this.data_[e.id], e.entry.previous.next = e.entry.next, 
e.entry.next.previous = e.entry.previous, e.entry.head = null, this.size--, !0);
};
$jscomp.Map.prototype.clear = function() {
this.data_ = {};
this.head_ = this.head_.previous = $jscomp.Map.createHead();
this.size = 0;
};
$jscomp.Map.prototype.has = function(e) {
return !!$jscomp.Map.maybeGetEntry(this, e).entry;
};
$jscomp.Map.prototype.get = function(e) {
return (e = $jscomp.Map.maybeGetEntry(this, e).entry) && e.value;
};
$jscomp.Map.prototype.entries = function() {
return $jscomp.Map.makeIterator_(this, function(e) {
return [ e.key, e.value ];
});
};
$jscomp.Map.prototype.keys = function() {
return $jscomp.Map.makeIterator_(this, function(e) {
return e.key;
});
};
$jscomp.Map.prototype.values = function() {
return $jscomp.Map.makeIterator_(this, function(e) {
return e.value;
});
};
$jscomp.Map.prototype.forEach = function(e, t) {
for (var o, s = this.entries(); !(o = s.next()).done; ) o = o.value, e.call(t, o[1], o[0], this);
};
$jscomp.Map.maybeGetEntry = function(e, t) {
var o = $jscomp.Map.getId(t), s = e.data_[o];
if (s && Object.prototype.hasOwnProperty.call(e.data_, o)) for (var r = 0; r < s.length; r++) {
var i = s[r];
if (t !== t && i.key !== i.key || t === i.key) return {
id: o,
list: s,
index: r,
entry: i
};
}
return {
id: o,
list: s,
index: -1,
entry: void 0
};
};
$jscomp.Map.makeIterator_ = function(e, t) {
var o = e.head_, s = {
next: function() {
if (o) {
for (;o.head != e.head_; ) o = o.previous;
for (;o.next != o.head; ) return o = o.next, {
done: !1,
value: t(o)
};
o = null;
}
return {
done: !0,
value: void 0
};
}
};
$jscomp.initSymbol();
$jscomp.initSymbolIterator();
s[Symbol.iterator] = function() {
return s;
};
return s;
};
$jscomp.Map.mapIndex_ = 0;
$jscomp.Map.createHead = function() {
var e = {};
return e.previous = e.next = e.head = e;
};
$jscomp.Map.getId = function(e) {
if (!(e instanceof Object)) return "p_" + e;
if (!($jscomp.Map.idKey in e)) try {
$jscomp.Map.defineProperty(e, $jscomp.Map.idKey, {
value: ++$jscomp.Map.mapIndex_
});
} catch (e) {}
return $jscomp.Map.idKey in e ? e[$jscomp.Map.idKey] : "o_ " + e;
};
$jscomp.Map.defineProperty = Object.defineProperty ? function(e, t, o) {
Object.defineProperty(e, t, {
value: String(o)
});
} : function(e, t, o) {
e[t] = String(o);
};
$jscomp.Map.Entry = function() {};
$jscomp.Map$install = function() {
$jscomp.initSymbol();
$jscomp.initSymbolIterator();
$jscomp.Map$isConformant() ? $jscomp.Map = $jscomp.global.Map : ($jscomp.initSymbol(), 
$jscomp.initSymbolIterator(), $jscomp.Map.prototype[Symbol.iterator] = $jscomp.Map.prototype.entries, 
$jscomp.initSymbol(), $jscomp.Map.idKey = Symbol("map-id-key"), $jscomp.Map$install = function() {});
};
$jscomp.math = $jscomp.math || {};
$jscomp.math.clz32 = function(e) {
if (0 === (e = Number(e) >>> 0)) return 32;
var t = 0;
0 == (4294901760 & e) && (e <<= 16, t += 16);
0 == (4278190080 & e) && (e <<= 8, t += 8);
0 == (4026531840 & e) && (e <<= 4, t += 4);
0 == (3221225472 & e) && (e <<= 2, t += 2);
0 == (2147483648 & e) && t++;
return t;
};
$jscomp.math.imul = function(e, t) {
var o = 65535 & (e = Number(e)), s = 65535 & (t = Number(t));
return o * s + ((e >>> 16 & 65535) * s + o * (t >>> 16 & 65535) << 16 >>> 0) | 0;
};
$jscomp.math.sign = function(e) {
return 0 === (e = Number(e)) || isNaN(e) ? e : 0 < e ? 1 : -1;
};
$jscomp.math.log10 = function(e) {
return Math.log(e) / Math.LN10;
};
$jscomp.math.log2 = function(e) {
return Math.log(e) / Math.LN2;
};
$jscomp.math.log1p = function(e) {
if (.25 > (e = Number(e)) && -.25 < e) {
for (var t = e, o = 1, s = e, r = 0, i = 1; r != s; ) s = (r = s) + (i *= -1) * (t *= e) / ++o;
return s;
}
return Math.log(1 + e);
};
$jscomp.math.expm1 = function(e) {
if (.25 > (e = Number(e)) && -.25 < e) {
for (var t = e, o = 1, s = e, r = 0; r != s; ) s = (r = s) + (t *= e / ++o);
return s;
}
return Math.exp(e) - 1;
};
$jscomp.math.cosh = function(e) {
e = Number(e);
return (Math.exp(e) + Math.exp(-e)) / 2;
};
$jscomp.math.sinh = function(e) {
return 0 === (e = Number(e)) ? e : (Math.exp(e) - Math.exp(-e)) / 2;
};
$jscomp.math.tanh = function(e) {
if (0 === (e = Number(e))) return e;
var t = (1 - (t = Math.exp(-2 * Math.abs(e)))) / (1 + t);
return 0 > e ? -t : t;
};
$jscomp.math.acosh = function(e) {
e = Number(e);
return Math.log(e + Math.sqrt(e * e - 1));
};
$jscomp.math.asinh = function(e) {
if (0 === (e = Number(e))) return e;
var t = Math.log(Math.abs(e) + Math.sqrt(e * e + 1));
return 0 > e ? -t : t;
};
$jscomp.math.atanh = function(e) {
e = Number(e);
return ($jscomp.math.log1p(e) - $jscomp.math.log1p(-e)) / 2;
};
$jscomp.math.hypot = function(e, t, o) {
e = Number(e);
t = Number(t);
var s, r, i, n = Math.max(Math.abs(e), Math.abs(t));
for (s = 2; s < arguments.length; s++) n = Math.max(n, Math.abs(arguments[s]));
if (1e100 < n || 1e-100 > n) {
i = (e /= n) * e + (t /= n) * t;
for (s = 2; s < arguments.length; s++) i += (r = Number(arguments[s]) / n) * r;
return Math.sqrt(i) * n;
}
i = e * e + t * t;
for (s = 2; s < arguments.length; s++) i += (r = Number(arguments[s])) * r;
return Math.sqrt(i);
};
$jscomp.math.trunc = function(e) {
e = Number(e);
if (isNaN(e) || Infinity === e || -Infinity === e || 0 === e) return e;
var t = Math.floor(Math.abs(e));
return 0 > e ? -t : t;
};
$jscomp.math.cbrt = function(e) {
if (0 === e) return e;
e = Number(e);
var t = Math.pow(Math.abs(e), 1 / 3);
return 0 > e ? -t : t;
};
$jscomp.number = $jscomp.number || {};
$jscomp.number.isFinite = function(e) {
return "number" == typeof e && (!isNaN(e) && Infinity !== e && -Infinity !== e);
};
$jscomp.number.isInteger = function(e) {
return !!$jscomp.number.isFinite(e) && e === Math.floor(e);
};
$jscomp.number.isNaN = function(e) {
return "number" == typeof e && isNaN(e);
};
$jscomp.number.isSafeInteger = function(e) {
return $jscomp.number.isInteger(e) && Math.abs(e) <= $jscomp.number.MAX_SAFE_INTEGER;
};
$jscomp.number.EPSILON = Math.pow(2, -52);
$jscomp.number.MAX_SAFE_INTEGER = 9007199254740991;
$jscomp.number.MIN_SAFE_INTEGER = -9007199254740991;
$jscomp.object = $jscomp.object || {};
$jscomp.object.assign = function(e, t) {
for (var o = 1; o < arguments.length; o++) {
var s = arguments[o];
if (s) for (var r in s) Object.prototype.hasOwnProperty.call(s, r) && (e[r] = s[r]);
}
return e;
};
$jscomp.object.is = function(e, t) {
return e === t ? 0 !== e || 1 / e == 1 / t : e !== e && t !== t;
};
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.Set$isConformant = function() {
if ($jscomp.ASSUME_NO_NATIVE_SET) return !1;
var e = $jscomp.global.Set;
if (!e || !e.prototype.entries || "function" != typeof Object.seal) return !1;
try {
var t = Object.seal({
x: 4
}), o = new e($jscomp.makeIterator([ t ]));
if (!o.has(t) || 1 != o.size || o.add(t) != o || 1 != o.size || o.add({
x: 4
}) != o || 2 != o.size) return !1;
var s = o.entries(), r = s.next();
return !r.done && r.value[0] == t && r.value[1] == t && (!(r = s.next()).done && r.value[0] != t && 4 == r.value[0].x && r.value[1] == r.value[0] && s.next().done);
} catch (e) {
return !1;
}
};
$jscomp.Set = function(e) {
this.map_ = new $jscomp.Map();
if (e) {
e = $jscomp.makeIterator(e);
for (var t; !(t = e.next()).done; ) this.add(t.value);
}
this.size = this.map_.size;
};
$jscomp.Set.prototype.add = function(e) {
this.map_.set(e, e);
this.size = this.map_.size;
return this;
};
$jscomp.Set.prototype.delete = function(e) {
e = this.map_.delete(e);
this.size = this.map_.size;
return e;
};
$jscomp.Set.prototype.clear = function() {
this.map_.clear();
this.size = 0;
};
$jscomp.Set.prototype.has = function(e) {
return this.map_.has(e);
};
$jscomp.Set.prototype.entries = function() {
return this.map_.entries();
};
$jscomp.Set.prototype.values = function() {
return this.map_.values();
};
$jscomp.Set.prototype.forEach = function(e, t) {
var o = this;
this.map_.forEach(function(s) {
return e.call(t, s, s, o);
});
};
$jscomp.Set$install = function() {
$jscomp.Map$install();
$jscomp.Set$isConformant() ? $jscomp.Set = $jscomp.global.Set : ($jscomp.initSymbol(), 
$jscomp.initSymbolIterator(), $jscomp.Set.prototype[Symbol.iterator] = $jscomp.Set.prototype.values, 
$jscomp.Set$install = function() {});
};
$jscomp.string = $jscomp.string || {};
$jscomp.checkStringArgs = function(e, t, o) {
if (null == e) throw new TypeError("The 'this' value for String.prototype." + o + " must not be null or undefined");
if (t instanceof RegExp) throw new TypeError("First argument to String.prototype." + o + " must not be a regular expression");
return e + "";
};
$jscomp.string.fromCodePoint = function(e) {
for (var t = "", o = 0; o < arguments.length; o++) {
var s = Number(arguments[o]);
if (0 > s || 1114111 < s || s !== Math.floor(s)) throw new RangeError("invalid_code_point " + s);
65535 >= s ? t += String.fromCharCode(s) : (s -= 65536, t += String.fromCharCode(s >>> 10 & 1023 | 55296), 
t += String.fromCharCode(1023 & s | 56320));
}
return t;
};
$jscomp.string.repeat = function(e) {
var t = $jscomp.checkStringArgs(this, null, "repeat");
if (0 > e || 1342177279 < e) throw new RangeError("Invalid count value");
e |= 0;
for (var o = ""; e; ) (1 & e && (o += t), e >>>= 1) && (t += t);
return o;
};
$jscomp.string.repeat$install = function() {
String.prototype.repeat || (String.prototype.repeat = $jscomp.string.repeat);
};
$jscomp.string.codePointAt = function(e) {
var t = $jscomp.checkStringArgs(this, null, "codePointAt"), o = t.length;
if (0 <= (e = Number(e) || 0) && e < o) {
e |= 0;
var s = t.charCodeAt(e);
return 55296 > s || 56319 < s || e + 1 === o ? s : 56320 > (e = t.charCodeAt(e + 1)) || 57343 < e ? s : 1024 * (s - 55296) + e + 9216;
}
};
$jscomp.string.codePointAt$install = function() {
String.prototype.codePointAt || (String.prototype.codePointAt = $jscomp.string.codePointAt);
};
$jscomp.string.includes = function(e, t) {
return -1 !== $jscomp.checkStringArgs(this, e, "includes").indexOf(e, t || 0);
};
$jscomp.string.includes$install = function() {
String.prototype.includes || (String.prototype.includes = $jscomp.string.includes);
};
$jscomp.string.startsWith = function(e, t) {
var o = $jscomp.checkStringArgs(this, e, "startsWith");
e += "";
for (var s = o.length, r = e.length, i = Math.max(0, Math.min(0 | t, o.length)), n = 0; n < r && i < s; ) if (o[i++] != e[n++]) return !1;
return n >= r;
};
$jscomp.string.startsWith$install = function() {
String.prototype.startsWith || (String.prototype.startsWith = $jscomp.string.startsWith);
};
$jscomp.string.endsWith = function(e, t) {
var o = $jscomp.checkStringArgs(this, e, "endsWith");
e += "";
void 0 === t && (t = o.length);
for (var s = Math.max(0, Math.min(0 | t, o.length)), r = e.length; 0 < r && 0 < s; ) if (o[--s] != e[--r]) return !1;
return 0 >= r;
};
$jscomp.string.endsWith$install = function() {
String.prototype.endsWith || (String.prototype.endsWith = $jscomp.string.endsWith);
};
var COMPILED = !0, goog = goog || {};
goog.global = $jscomp.getGlobal("undefined" == typeof window ? module.exports : window);
goog.isDef = function(e) {
return void 0 !== e;
};
goog.exportPath_ = function(e, t, o) {
e = e.split(".");
o = o || goog.global;
e[0] in o || !o.execScript || o.execScript("var " + e[0]);
for (var s; e.length && (s = e.shift()); ) !e.length && goog.isDef(t) ? o[s] = t : o = o[s] ? o[s] : o[s] = {};
};
goog.define = function(e, t) {
var o = t;
COMPILED || (goog.global.CLOSURE_UNCOMPILED_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_UNCOMPILED_DEFINES, e) ? o = goog.global.CLOSURE_UNCOMPILED_DEFINES[e] : goog.global.CLOSURE_DEFINES && Object.prototype.hasOwnProperty.call(goog.global.CLOSURE_DEFINES, e) && (o = goog.global.CLOSURE_DEFINES[e]));
goog.exportPath_(e, o);
};
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.TRUSTED_SITE = !0;
goog.STRICT_MODE_COMPATIBLE = !1;
goog.DISALLOW_TEST_ONLY_CODE = COMPILED && !goog.DEBUG;
goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING = !1;
goog.provide = function(e) {
if (!COMPILED && goog.isProvided_(e)) throw Error('Namespace "' + e + '" already declared.');
goog.constructNamespace_(e);
};
goog.constructNamespace_ = function(e, t) {
if (!COMPILED) {
delete goog.implicitNamespaces_[e];
for (var o = e; (o = o.substring(0, o.lastIndexOf("."))) && !goog.getObjectByName(o); ) goog.implicitNamespaces_[o] = !0;
}
goog.exportPath_(e, t);
};
goog.VALID_MODULE_RE_ = /^[a-zA-Z_$][a-zA-Z0-9._$]*$/;
goog.module = function(e) {
if (!goog.isString(e) || !e || -1 == e.search(goog.VALID_MODULE_RE_)) throw Error("Invalid module identifier");
if (!goog.isInModuleLoader_()) throw Error("Module " + e + " has been loaded incorrectly.");
if (goog.moduleLoaderState_.moduleName) throw Error("goog.module may only be called once per module.");
goog.moduleLoaderState_.moduleName = e;
if (!COMPILED) {
if (goog.isProvided_(e)) throw Error('Namespace "' + e + '" already declared.');
delete goog.implicitNamespaces_[e];
}
};
goog.module.get = function(e) {
return goog.module.getInternal_(e);
};
goog.module.getInternal_ = function(e) {
if (!COMPILED) return goog.isProvided_(e) ? e in goog.loadedModules_ ? goog.loadedModules_[e] : goog.getObjectByName(e) : null;
};
goog.moduleLoaderState_ = null;
goog.isInModuleLoader_ = function() {
return null != goog.moduleLoaderState_;
};
goog.module.declareLegacyNamespace = function() {
if (!COMPILED && !goog.isInModuleLoader_()) throw Error("goog.module.declareLegacyNamespace must be called from within a goog.module");
if (!COMPILED && !goog.moduleLoaderState_.moduleName) throw Error("goog.module must be called prior to goog.module.declareLegacyNamespace.");
goog.moduleLoaderState_.declareLegacyNamespace = !0;
};
goog.setTestOnly = function(e) {
if (goog.DISALLOW_TEST_ONLY_CODE) throw e = e || "", Error("Importing test-only code into non-debug environment" + (e ? ": " + e : "."));
};
goog.forwardDeclare = function(e) {};
COMPILED || (goog.isProvided_ = function(e) {
return e in goog.loadedModules_ || !goog.implicitNamespaces_[e] && goog.isDefAndNotNull(goog.getObjectByName(e));
}, goog.implicitNamespaces_ = {
"goog.module": !0
});
goog.getObjectByName = function(e, t) {
for (var o, s = e.split("."), r = t || goog.global; o = s.shift(); ) {
if (!goog.isDefAndNotNull(r[o])) return null;
r = r[o];
}
return r;
};
goog.globalize = function(e, t) {
var o, s = t || goog.global;
for (o in e) s[o] = e[o];
};
goog.addDependency = function(e, t, o, s) {
if (goog.DEPENDENCIES_ENABLED) {
var r;
e = e.replace(/\\/g, "/");
for (var i = goog.dependencies_, n = 0; r = t[n]; n++) i.nameToPath[r] = e, i.pathIsModule[e] = !!s;
for (s = 0; t = o[s]; s++) e in i.requires || (i.requires[e] = {}), i.requires[e][t] = !0;
}
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.logToConsole_ = function(e) {
goog.global.console && goog.global.console.error(e);
};
goog.require = function(e) {
if (!COMPILED) {
goog.ENABLE_DEBUG_LOADER && goog.IS_OLD_IE_ && goog.maybeProcessDeferredDep_(e);
if (goog.isProvided_(e)) return goog.isInModuleLoader_() ? goog.module.getInternal_(e) : null;
if (goog.ENABLE_DEBUG_LOADER) {
var t = goog.getPathFromDeps_(e);
if (t) return goog.writeScripts_(t), null;
}
e = "goog.require could not find: " + e;
goog.logToConsole_(e);
throw Error(e);
}
};
goog.basePath = "";
goog.nullFunction = function() {};
goog.abstractMethod = function() {
throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(e) {
e.getInstance = function() {
if (e.instance_) return e.instance_;
goog.DEBUG && (goog.instantiatedSingletons_[goog.instantiatedSingletons_.length] = e);
return e.instance_ = new e();
};
};
goog.instantiatedSingletons_ = [];
goog.LOAD_MODULE_USING_EVAL = !0;
goog.SEAL_MODULE_EXPORTS = goog.DEBUG;
goog.loadedModules_ = {};
goog.DEPENDENCIES_ENABLED = !COMPILED && goog.ENABLE_DEBUG_LOADER;
goog.DEPENDENCIES_ENABLED && (goog.dependencies_ = {
pathIsModule: {},
nameToPath: {},
requires: {},
visited: {},
written: {},
deferred: {}
}, goog.inHtmlDocument_ = function() {
var e = goog.global.document;
return null != e && "write" in e;
}, goog.findBasePath_ = function() {
if (goog.isDef(goog.global.CLOSURE_BASE_PATH)) goog.basePath = goog.global.CLOSURE_BASE_PATH; else if (goog.inHtmlDocument_()) for (var e = goog.global.document.getElementsByTagName("SCRIPT"), t = e.length - 1; 0 <= t; --t) {
var o = e[t].src, s = -1 == (s = o.lastIndexOf("?")) ? o.length : s;
if ("base.js" == o.substr(s - 7, 7)) {
goog.basePath = o.substr(0, s - 7);
break;
}
}
}, goog.importScript_ = function(e, t) {
(goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_)(e, t) && (goog.dependencies_.written[e] = !0);
}, goog.IS_OLD_IE_ = !(goog.global.atob || !goog.global.document || !goog.global.document.all), 
goog.importModule_ = function(e) {
goog.importScript_("", 'goog.retrieveAndExecModule_("' + e + '");') && (goog.dependencies_.written[e] = !0);
}, goog.queuedModules_ = [], goog.wrapModule_ = function(e, t) {
return goog.LOAD_MODULE_USING_EVAL && goog.isDef(goog.global.JSON) ? "goog.loadModule(" + goog.global.JSON.stringify(t + "\n//# sourceURL=" + e + "\n") + ");" : 'goog.loadModule(function(exports) {"use strict";' + t + "\n;return exports});\n//# sourceURL=" + e + "\n";
}, goog.loadQueuedModules_ = function() {
var e = goog.queuedModules_.length;
if (0 < e) {
var t = goog.queuedModules_;
goog.queuedModules_ = [];
for (var o = 0; o < e; o++) goog.maybeProcessDeferredPath_(t[o]);
}
}, goog.maybeProcessDeferredDep_ = function(e) {
goog.isDeferredModule_(e) && goog.allDepsAreAvailable_(e) && (e = goog.getPathFromDeps_(e), 
goog.maybeProcessDeferredPath_(goog.basePath + e));
}, goog.isDeferredModule_ = function(e) {
return !(!(e = goog.getPathFromDeps_(e)) || !goog.dependencies_.pathIsModule[e]) && goog.basePath + e in goog.dependencies_.deferred;
}, goog.allDepsAreAvailable_ = function(e) {
if ((e = goog.getPathFromDeps_(e)) && e in goog.dependencies_.requires) for (var t in goog.dependencies_.requires[e]) if (!goog.isProvided_(t) && !goog.isDeferredModule_(t)) return !1;
return !0;
}, goog.maybeProcessDeferredPath_ = function(e) {
if (e in goog.dependencies_.deferred) {
var t = goog.dependencies_.deferred[e];
delete goog.dependencies_.deferred[e];
goog.globalEval(t);
}
}, goog.loadModuleFromUrl = function(e) {
goog.retrieveAndExecModule_(e);
}, goog.loadModule = function(e) {
var t = goog.moduleLoaderState_;
try {
goog.moduleLoaderState_ = {
moduleName: void 0,
declareLegacyNamespace: !1
};
var o;
if (goog.isFunction(e)) o = e.call(goog.global, {}); else {
if (!goog.isString(e)) throw Error("Invalid module definition");
o = goog.loadModuleFromSource_.call(goog.global, e);
}
var s = goog.moduleLoaderState_.moduleName;
if (!goog.isString(s) || !s) throw Error('Invalid module name "' + s + '"');
goog.moduleLoaderState_.declareLegacyNamespace ? goog.constructNamespace_(s, o) : goog.SEAL_MODULE_EXPORTS && Object.seal && Object.seal(o);
goog.loadedModules_[s] = o;
} finally {
goog.moduleLoaderState_ = t;
}
}, goog.loadModuleFromSource_ = function(a) {
eval(a);
return {};
}, goog.writeScriptSrcNode_ = function(e) {
goog.global.document.write('<script type="text/javascript" src="' + e + '"><\/script>');
}, goog.appendScriptSrcNode_ = function(e) {
var t = goog.global.document, o = t.createElement("script");
o.type = "text/javascript";
o.src = e;
o.defer = !1;
o.async = !1;
t.head.appendChild(o);
}, goog.writeScriptTag_ = function(e, t) {
if (goog.inHtmlDocument_()) {
var o = goog.global.document;
if (!goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING && "complete" == o.readyState) {
if (/\bdeps.js$/.test(e)) return !1;
throw Error('Cannot write "' + e + '" after document load');
}
var s = goog.IS_OLD_IE_;
void 0 === t ? s ? (s = " onreadystatechange='goog.onScriptLoad_(this, " + ++goog.lastNonModuleScriptIndex_ + ")' ", 
o.write('<script type="text/javascript" src="' + e + '"' + s + "><\/script>")) : goog.ENABLE_CHROME_APP_SAFE_SCRIPT_LOADING ? goog.appendScriptSrcNode_(e) : goog.writeScriptSrcNode_(e) : o.write('<script type="text/javascript">' + t + "<\/script>");
return !0;
}
return !1;
}, goog.lastNonModuleScriptIndex_ = 0, goog.onScriptLoad_ = function(e, t) {
"complete" == e.readyState && goog.lastNonModuleScriptIndex_ == t && goog.loadQueuedModules_();
return !0;
}, goog.writeScripts_ = function(e) {
function t(e) {
if (!(e in r.written || e in r.visited)) {
r.visited[e] = !0;
if (e in r.requires) for (var i in r.requires[e]) if (!goog.isProvided_(i)) {
if (!(i in r.nameToPath)) throw Error("Undefined nameToPath for " + i);
t(r.nameToPath[i]);
}
e in s || (s[e] = !0, o.push(e));
}
}
var o = [], s = {}, r = goog.dependencies_;
t(e);
for (e = 0; e < o.length; e++) {
var i = o[e];
goog.dependencies_.written[i] = !0;
}
var n = goog.moduleLoaderState_;
goog.moduleLoaderState_ = null;
for (e = 0; e < o.length; e++) {
if (!(i = o[e])) throw goog.moduleLoaderState_ = n, Error("Undefined script input");
r.pathIsModule[i] ? goog.importModule_(goog.basePath + i) : goog.importScript_(goog.basePath + i);
}
goog.moduleLoaderState_ = n;
}, goog.getPathFromDeps_ = function(e) {
return e in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[e] : null;
}, goog.findBasePath_(), goog.global.CLOSURE_NO_DEPS || goog.importScript_(goog.basePath + "deps.js"));
goog.normalizePath_ = function(e) {
e = e.split("/");
for (var t = 0; t < e.length; ) "." == e[t] ? e.splice(t, 1) : t && ".." == e[t] && e[t - 1] && ".." != e[t - 1] ? e.splice(--t, 2) : t++;
return e.join("/");
};
goog.loadFileSync_ = function(e) {
if (goog.global.CLOSURE_LOAD_FILE_SYNC) return goog.global.CLOSURE_LOAD_FILE_SYNC(e);
var t = new goog.global.XMLHttpRequest();
t.open("get", e, !1);
t.send();
return t.responseText;
};
goog.retrieveAndExecModule_ = function(e) {
if (!COMPILED) {
var t = e;
e = goog.normalizePath_(e);
var o = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_, s = goog.loadFileSync_(e);
if (null == s) throw Error("load of " + e + "failed");
s = goog.wrapModule_(e, s), goog.IS_OLD_IE_ ? (goog.dependencies_.deferred[t] = s, 
goog.queuedModules_.push(t)) : o(e, s);
}
};
goog.typeOf = function(e) {
var t = "undefined" == typeof e ? "undefined" : _typeof(e);
if ("object" == t) {
if (!e) return "null";
if (e instanceof Array) return "array";
if (e instanceof Object) return t;
var o = Object.prototype.toString.call(e);
if ("[object Window]" == o) return "object";
if ("[object Array]" == o || "number" == typeof e.length && "undefined" != typeof e.splice && "undefined" != typeof e.propertyIsEnumerable && !e.propertyIsEnumerable("splice")) return "array";
if ("[object Function]" == o || "undefined" != typeof e.call && "undefined" != typeof e.propertyIsEnumerable && !e.propertyIsEnumerable("call")) return "function";
} else if ("function" == t && "undefined" == typeof e.call) return "object";
return t;
};
goog.isNull = function(e) {
return null === e;
};
goog.isDefAndNotNull = function(e) {
return null != e;
};
goog.isArray = function(e) {
return "array" == goog.typeOf(e);
};
goog.isArrayLike = function(e) {
var t = goog.typeOf(e);
return "array" == t || "object" == t && "number" == typeof e.length;
};
goog.isDateLike = function(e) {
return goog.isObject(e) && "function" == typeof e.getFullYear;
};
goog.isString = function(e) {
return "string" == typeof e;
};
goog.isBoolean = function(e) {
return "boolean" == typeof e;
};
goog.isNumber = function(e) {
return "number" == typeof e;
};
goog.isFunction = function(e) {
return "function" == goog.typeOf(e);
};
goog.isObject = function(e) {
var t = "undefined" == typeof e ? "undefined" : _typeof(e);
return "object" == t && null != e || "function" == t;
};
goog.getUid = function(e) {
return e[goog.UID_PROPERTY_] || (e[goog.UID_PROPERTY_] = ++goog.uidCounter_);
};
goog.hasUid = function(e) {
return !!e[goog.UID_PROPERTY_];
};
goog.removeUid = function(e) {
null !== e && "removeAttribute" in e && e.removeAttribute(goog.UID_PROPERTY_);
try {
delete e[goog.UID_PROPERTY_];
} catch (e) {}
};
goog.UID_PROPERTY_ = "closure_uid_" + (1e9 * Math.random() >>> 0);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(e) {
if ("object" == (o = goog.typeOf(e)) || "array" == o) {
if (e.clone) return e.clone();
var t, o = "array" == o ? [] : {};
for (t in e) o[t] = goog.cloneObject(e[t]);
return o;
}
return e;
};
goog.bindNative_ = function(e, t, o) {
return e.call.apply(e.bind, arguments);
};
goog.bindJs_ = function(e, t, o) {
if (!e) throw Error();
if (2 < arguments.length) {
var s = Array.prototype.slice.call(arguments, 2);
return function() {
var o = Array.prototype.slice.call(arguments);
Array.prototype.unshift.apply(o, s);
return e.apply(t, o);
};
}
return function() {
return e.apply(t, arguments);
};
};
goog.bind = function(e, t, o) {
Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? goog.bind = goog.bindNative_ : goog.bind = goog.bindJs_;
return goog.bind.apply(null, arguments);
};
goog.partial = function(e, t) {
var o = Array.prototype.slice.call(arguments, 1);
return function() {
var t = o.slice();
t.push.apply(t, arguments);
return e.apply(this, t);
};
};
goog.mixin = function(e, t) {
for (var o in t) e[o] = t[o];
};
goog.now = goog.TRUSTED_SITE && Date.now || function() {
return +new Date();
};
goog.globalEval = function(e) {
if (goog.global.execScript) goog.global.execScript(e, "JavaScript"); else {
if (!goog.global.eval) throw Error("goog.globalEval not available");
if (null == goog.evalWorksForGlobals_) if (goog.global.eval("var _evalTest_ = 1;"), 
"undefined" != typeof goog.global._evalTest_) {
try {
delete goog.global._evalTest_;
} catch (e) {}
goog.evalWorksForGlobals_ = !0;
} else goog.evalWorksForGlobals_ = !1;
if (goog.evalWorksForGlobals_) goog.global.eval(e); else {
var t = goog.global.document, o = t.createElement("SCRIPT");
o.type = "text/javascript";
o.defer = !1;
o.appendChild(t.createTextNode(e));
t.body.appendChild(o);
t.body.removeChild(o);
}
}
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(e, t) {
var o = function(e) {
return goog.cssNameMapping_[e] || e;
}, s = function(e) {
e = e.split("-");
for (var t = [], s = 0; s < e.length; s++) t.push(o(e[s]));
return t.join("-");
}, s = goog.cssNameMapping_ ? "BY_WHOLE" == goog.cssNameMappingStyle_ ? o : s : function(e) {
return e;
};
return t ? e + "-" + s(t) : s(e);
};
goog.setCssNameMapping = function(e, t) {
goog.cssNameMapping_ = e;
goog.cssNameMappingStyle_ = t;
};
!COMPILED && goog.global.CLOSURE_CSS_NAME_MAPPING && (goog.cssNameMapping_ = goog.global.CLOSURE_CSS_NAME_MAPPING);
goog.getMsg = function(e, t) {
t && (e = e.replace(/\{\$([^}]+)}/g, function(e, o) {
return null != t && o in t ? t[o] : e;
}));
return e;
};
goog.getMsgWithFallback = function(e, t) {
return e;
};
goog.exportSymbol = function(e, t, o) {
goog.exportPath_(e, t, o);
};
goog.exportProperty = function(e, t, o) {
e[t] = o;
};
goog.inherits = function(e, t) {
function o() {}
o.prototype = t.prototype;
e.superClass_ = t.prototype;
e.prototype = new o();
e.prototype.constructor = e;
e.base = function(e, o, s) {
for (var r = Array(arguments.length - 2), i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
return t.prototype[o].apply(e, r);
};
};
goog.base = function(e, t, o) {
var s = arguments.callee.caller;
if (goog.STRICT_MODE_COMPATIBLE || goog.DEBUG && !s) throw Error("arguments.caller not defined.  goog.base() cannot be used with strict mode code. See http://www.ecma-international.org/ecma-262/5.1/#sec-C");
if (s.superClass_) {
for (var r = Array(arguments.length - 1), i = 1; i < arguments.length; i++) r[i - 1] = arguments[i];
return s.superClass_.constructor.apply(e, r);
}
r = Array(arguments.length - 2);
for (i = 2; i < arguments.length; i++) r[i - 2] = arguments[i];
for (var i = !1, n = e.constructor; n; n = n.superClass_ && n.superClass_.constructor) if (n.prototype[t] === s) i = !0; else if (i) return n.prototype[t].apply(e, r);
if (e[t] === s) return e.constructor.prototype[t].apply(e, r);
throw Error("goog.base called from a method of one name to a method of a different name");
};
goog.scope = function(e) {
e.call(goog.global);
};
COMPILED || (goog.global.COMPILED = COMPILED);
goog.defineClass = function(e, t) {
var o = t.constructor, s = t.statics;
o && o != Object.prototype.constructor || (o = function() {
throw Error("cannot instantiate an interface (no constructor defined).");
});
o = goog.defineClass.createSealingConstructor_(o, e);
e && goog.inherits(o, e);
delete t.constructor;
delete t.statics;
goog.defineClass.applyProperties_(o.prototype, t);
null != s && (s instanceof Function ? s(o) : goog.defineClass.applyProperties_(o, s));
return o;
};
goog.defineClass.SEAL_CLASS_INSTANCES = goog.DEBUG;
goog.defineClass.createSealingConstructor_ = function(e, t) {
if (goog.defineClass.SEAL_CLASS_INSTANCES && Object.seal instanceof Function) {
if (t && t.prototype && t.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_]) return e;
return function t() {
var o = e.apply(this, arguments) || this;
o[goog.UID_PROPERTY_] = o[goog.UID_PROPERTY_];
this.constructor === t && Object.seal(o);
return o;
};
}
return e;
};
goog.defineClass.OBJECT_PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.defineClass.applyProperties_ = function(e, t) {
for (var o in t) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
for (var s = 0; s < goog.defineClass.OBJECT_PROTOTYPE_FIELDS_.length; s++) o = goog.defineClass.OBJECT_PROTOTYPE_FIELDS_[s], 
Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
};
goog.tagUnsealableClass = function(e) {
!COMPILED && goog.defineClass.SEAL_CLASS_INSTANCES && (e.prototype[goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_] = !0);
};
goog.UNSEALABLE_CONSTRUCTOR_PROPERTY_ = "goog_defineClass_legacy_unsealable";
goog.debug = {};
goog.debug.Error = function(e) {
if (Error.captureStackTrace) Error.captureStackTrace(this, goog.debug.Error); else {
var t = Error().stack;
t && (this.stack = t);
}
e && (this.message = String(e));
this.reportErrorToServer = !0;
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.dom = {};
goog.dom.NodeType = {
ELEMENT: 1,
ATTRIBUTE: 2,
TEXT: 3,
CDATA_SECTION: 4,
ENTITY_REFERENCE: 5,
ENTITY: 6,
PROCESSING_INSTRUCTION: 7,
COMMENT: 8,
DOCUMENT: 9,
DOCUMENT_TYPE: 10,
DOCUMENT_FRAGMENT: 11,
NOTATION: 12
};
goog.string = {};
goog.string.DETECT_DOUBLE_ESCAPING = !1;
goog.string.FORCE_NON_DOM_HTML_UNESCAPING = !1;
goog.string.Unicode = {
NBSP: " "
};
goog.string.startsWith = function(e, t) {
return 0 == e.lastIndexOf(t, 0);
};
goog.string.endsWith = function(e, t) {
var o = e.length - t.length;
return 0 <= o && e.indexOf(t, o) == o;
};
goog.string.caseInsensitiveStartsWith = function(e, t) {
return 0 == goog.string.caseInsensitiveCompare(t, e.substr(0, t.length));
};
goog.string.caseInsensitiveEndsWith = function(e, t) {
return 0 == goog.string.caseInsensitiveCompare(t, e.substr(e.length - t.length, t.length));
};
goog.string.caseInsensitiveEquals = function(e, t) {
return e.toLowerCase() == t.toLowerCase();
};
goog.string.subs = function(e, t) {
for (var o = e.split("%s"), s = "", r = Array.prototype.slice.call(arguments, 1); r.length && 1 < o.length; ) s += o.shift() + r.shift();
return s + o.join("%s");
};
goog.string.collapseWhitespace = function(e) {
return e.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "");
};
goog.string.isEmptyOrWhitespace = function(e) {
return /^[\s\xa0]*$/.test(e);
};
goog.string.isEmptyString = function(e) {
return 0 == e.length;
};
goog.string.isEmpty = goog.string.isEmptyOrWhitespace;
goog.string.isEmptyOrWhitespaceSafe = function(e) {
return goog.string.isEmptyOrWhitespace(goog.string.makeSafe(e));
};
goog.string.isEmptySafe = goog.string.isEmptyOrWhitespaceSafe;
goog.string.isBreakingWhitespace = function(e) {
return !/[^\t\n\r ]/.test(e);
};
goog.string.isAlpha = function(e) {
return !/[^a-zA-Z]/.test(e);
};
goog.string.isNumeric = function(e) {
return !/[^0-9]/.test(e);
};
goog.string.isAlphaNumeric = function(e) {
return !/[^a-zA-Z0-9]/.test(e);
};
goog.string.isSpace = function(e) {
return " " == e;
};
goog.string.isUnicodeChar = function(e) {
return 1 == e.length && " " <= e && "~" >= e || "" <= e && "�" >= e;
};
goog.string.stripNewlines = function(e) {
return e.replace(/(\r\n|\r|\n)+/g, " ");
};
goog.string.canonicalizeNewlines = function(e) {
return e.replace(/(\r\n|\r|\n)/g, "\n");
};
goog.string.normalizeWhitespace = function(e) {
return e.replace(/\xa0|\s/g, " ");
};
goog.string.normalizeSpaces = function(e) {
return e.replace(/\xa0|[ \t]+/g, " ");
};
goog.string.collapseBreakingSpaces = function(e) {
return e.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "");
};
goog.string.trim = goog.TRUSTED_SITE && String.prototype.trim ? function(e) {
return e.trim();
} : function(e) {
return e.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "");
};
goog.string.trimLeft = function(e) {
return e.replace(/^[\s\xa0]+/, "");
};
goog.string.trimRight = function(e) {
return e.replace(/[\s\xa0]+$/, "");
};
goog.string.caseInsensitiveCompare = function(e, t) {
var o = String(e).toLowerCase(), s = String(t).toLowerCase();
return o < s ? -1 : o == s ? 0 : 1;
};
goog.string.numberAwareCompare_ = function(e, t, o) {
if (e == t) return 0;
if (!e) return -1;
if (!t) return 1;
for (var s = e.toLowerCase().match(o), r = t.toLowerCase().match(o), i = Math.min(s.length, r.length), n = 0; n < i; n++) {
o = s[n];
var a = r[n];
if (o != a) return e = parseInt(o, 10), !isNaN(e) && (t = parseInt(a, 10), !isNaN(t) && e - t) ? e - t : o < a ? -1 : 1;
}
return s.length != r.length ? s.length - r.length : e < t ? -1 : 1;
};
goog.string.intAwareCompare = function(e, t) {
return goog.string.numberAwareCompare_(e, t, /\d+|\D+/g);
};
goog.string.floatAwareCompare = function(e, t) {
return goog.string.numberAwareCompare_(e, t, /\d+|\.\d+|\D+/g);
};
goog.string.numerateCompare = goog.string.floatAwareCompare;
goog.string.urlEncode = function(e) {
return encodeURIComponent(String(e));
};
goog.string.urlDecode = function(e) {
return decodeURIComponent(e.replace(/\+/g, " "));
};
goog.string.newLineToBr = function(e, t) {
return e.replace(/(\r\n|\r|\n)/g, t ? "<br />" : "<br>");
};
goog.string.htmlEscape = function(e, t) {
if (t) e = e.replace(goog.string.AMP_RE_, "&amp;").replace(goog.string.LT_RE_, "&lt;").replace(goog.string.GT_RE_, "&gt;").replace(goog.string.QUOT_RE_, "&quot;").replace(goog.string.SINGLE_QUOTE_RE_, "&#39;").replace(goog.string.NULL_RE_, "&#0;"), 
goog.string.DETECT_DOUBLE_ESCAPING && (e = e.replace(goog.string.E_RE_, "&#101;")); else {
if (!goog.string.ALL_RE_.test(e)) return e;
-1 != e.indexOf("&") && (e = e.replace(goog.string.AMP_RE_, "&amp;"));
-1 != e.indexOf("<") && (e = e.replace(goog.string.LT_RE_, "&lt;"));
-1 != e.indexOf(">") && (e = e.replace(goog.string.GT_RE_, "&gt;"));
-1 != e.indexOf('"') && (e = e.replace(goog.string.QUOT_RE_, "&quot;"));
-1 != e.indexOf("'") && (e = e.replace(goog.string.SINGLE_QUOTE_RE_, "&#39;"));
-1 != e.indexOf("\0") && (e = e.replace(goog.string.NULL_RE_, "&#0;"));
goog.string.DETECT_DOUBLE_ESCAPING && -1 != e.indexOf("e") && (e = e.replace(goog.string.E_RE_, "&#101;"));
}
return e;
};
goog.string.AMP_RE_ = /&/g;
goog.string.LT_RE_ = /</g;
goog.string.GT_RE_ = />/g;
goog.string.QUOT_RE_ = /"/g;
goog.string.SINGLE_QUOTE_RE_ = /'/g;
goog.string.NULL_RE_ = /\x00/g;
goog.string.E_RE_ = /e/g;
goog.string.ALL_RE_ = goog.string.DETECT_DOUBLE_ESCAPING ? /[\x00&<>"'e]/ : /[\x00&<>"']/;
goog.string.unescapeEntities = function(e) {
return goog.string.contains(e, "&") ? !goog.string.FORCE_NON_DOM_HTML_UNESCAPING && "document" in goog.global ? goog.string.unescapeEntitiesUsingDom_(e) : goog.string.unescapePureXmlEntities_(e) : e;
};
goog.string.unescapeEntitiesWithDocument = function(e, t) {
return goog.string.contains(e, "&") ? goog.string.unescapeEntitiesUsingDom_(e, t) : e;
};
goog.string.unescapeEntitiesUsingDom_ = function(e, t) {
var o, s = {
"&amp;": "&",
"&lt;": "<",
"&gt;": ">",
"&quot;": '"'
};
o = t ? t.createElement("div") : goog.global.document.createElement("div");
return e.replace(goog.string.HTML_ENTITY_PATTERN_, function(e, t) {
var r = s[e];
if (r) return r;
if ("#" == t.charAt(0)) {
var i = Number("0" + t.substr(1));
isNaN(i) || (r = String.fromCharCode(i));
}
r || (o.innerHTML = e + " ", r = o.firstChild.nodeValue.slice(0, -1));
return s[e] = r;
});
};
goog.string.unescapePureXmlEntities_ = function(e) {
return e.replace(/&([^;]+);/g, function(e, t) {
switch (t) {
case "amp":
return "&";

case "lt":
return "<";

case "gt":
return ">";

case "quot":
return '"';

default:
if ("#" == t.charAt(0)) {
var o = Number("0" + t.substr(1));
if (!isNaN(o)) return String.fromCharCode(o);
}
return e;
}
});
};
goog.string.HTML_ENTITY_PATTERN_ = /&([^;\s<&]+);?/g;
goog.string.whitespaceEscape = function(e, t) {
return goog.string.newLineToBr(e.replace(/  /g, " &#160;"), t);
};
goog.string.preserveSpaces = function(e) {
return e.replace(/(^|[\n ]) /g, "$1" + goog.string.Unicode.NBSP);
};
goog.string.stripQuotes = function(e, t) {
for (var o = t.length, s = 0; s < o; s++) {
var r = 1 == o ? t : t.charAt(s);
if (e.charAt(0) == r && e.charAt(e.length - 1) == r) return e.substring(1, e.length - 1);
}
return e;
};
goog.string.truncate = function(e, t, o) {
o && (e = goog.string.unescapeEntities(e));
e.length > t && (e = e.substring(0, t - 3) + "...");
o && (e = goog.string.htmlEscape(e));
return e;
};
goog.string.truncateMiddle = function(e, t, o, s) {
o && (e = goog.string.unescapeEntities(e));
if (s && e.length > t) {
s > t && (s = t);
var r = e.length - s;
e = e.substring(0, t - s) + "..." + e.substring(r);
} else e.length > t && (s = Math.floor(t / 2), r = e.length - s, e = e.substring(0, s + t % 2) + "..." + e.substring(r));
o && (e = goog.string.htmlEscape(e));
return e;
};
goog.string.specialEscapeChars_ = {
"\0": "\\0",
"\b": "\\b",
"\f": "\\f",
"\n": "\\n",
"\r": "\\r",
"\t": "\\t",
"\v": "\\x0B",
'"': '\\"',
"\\": "\\\\",
"<": "<"
};
goog.string.jsEscapeCache_ = {
"'": "\\'"
};
goog.string.quote = function(e) {
e = String(e);
for (var t = [ '"' ], o = 0; o < e.length; o++) {
var s = e.charAt(o), r = s.charCodeAt(0);
t[o + 1] = goog.string.specialEscapeChars_[s] || (31 < r && 127 > r ? s : goog.string.escapeChar(s));
}
t.push('"');
return t.join("");
};
goog.string.escapeString = function(e) {
for (var t = [], o = 0; o < e.length; o++) t[o] = goog.string.escapeChar(e.charAt(o));
return t.join("");
};
goog.string.escapeChar = function(e) {
if (e in goog.string.jsEscapeCache_) return goog.string.jsEscapeCache_[e];
if (e in goog.string.specialEscapeChars_) return goog.string.jsEscapeCache_[e] = goog.string.specialEscapeChars_[e];
var t, o = e.charCodeAt(0);
if (31 < o && 127 > o) t = e; else {
256 > o ? (t = "\\x", 16 > o || 256 < o) && (t += "0") : (t = "\\u", 4096 > o && (t += "0"));
t += o.toString(16).toUpperCase();
}
return goog.string.jsEscapeCache_[e] = t;
};
goog.string.contains = function(e, t) {
return -1 != e.indexOf(t);
};
goog.string.caseInsensitiveContains = function(e, t) {
return goog.string.contains(e.toLowerCase(), t.toLowerCase());
};
goog.string.countOf = function(e, t) {
return e && t ? e.split(t).length - 1 : 0;
};
goog.string.removeAt = function(e, t, o) {
var s = e;
0 <= t && t < e.length && 0 < o && (s = e.substr(0, t) + e.substr(t + o, e.length - t - o));
return s;
};
goog.string.remove = function(e, t) {
var o = new RegExp(goog.string.regExpEscape(t), "");
return e.replace(o, "");
};
goog.string.removeAll = function(e, t) {
var o = new RegExp(goog.string.regExpEscape(t), "g");
return e.replace(o, "");
};
goog.string.regExpEscape = function(e) {
return String(e).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08");
};
goog.string.repeat = String.prototype.repeat ? function(e, t) {
return e.repeat(t);
} : function(e, t) {
return Array(t + 1).join(e);
};
goog.string.padNumber = function(e, t, o) {
-1 == (o = (e = goog.isDef(o) ? e.toFixed(o) : String(e)).indexOf(".")) && (o = e.length);
return goog.string.repeat("0", Math.max(0, t - o)) + e;
};
goog.string.makeSafe = function(e) {
return null == e ? "" : String(e);
};
goog.string.buildString = function(e) {
return Array.prototype.join.call(arguments, "");
};
goog.string.getRandomString = function() {
return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ goog.now()).toString(36);
};
goog.string.compareVersions = function(e, t) {
for (var o = 0, s = goog.string.trim(String(e)).split("."), r = goog.string.trim(String(t)).split("."), i = Math.max(s.length, r.length), n = 0; 0 == o && n < i; n++) {
var a = s[n] || "", p = r[n] || "", l = RegExp("(\\d*)(\\D*)", "g"), u = RegExp("(\\d*)(\\D*)", "g");
do {
var g = l.exec(a) || [ "", "", "" ], d = u.exec(p) || [ "", "", "" ];
if (0 == g[0].length && 0 == d[0].length) break;
var o = 0 == g[1].length ? 0 : parseInt(g[1], 10), c = 0 == d[1].length ? 0 : parseInt(d[1], 10), o = goog.string.compareElements_(o, c) || goog.string.compareElements_(0 == g[2].length, 0 == d[2].length) || goog.string.compareElements_(g[2], d[2]);
} while (0 == o);
}
return o;
};
goog.string.compareElements_ = function(e, t) {
return e < t ? -1 : e > t ? 1 : 0;
};
goog.string.hashCode = function(e) {
for (var t = 0, o = 0; o < e.length; ++o) t = 31 * t + e.charCodeAt(o) >>> 0;
return t;
};
goog.string.uniqueStringCounter_ = 2147483648 * Math.random() | 0;
goog.string.createUniqueString = function() {
return "goog_" + goog.string.uniqueStringCounter_++;
};
goog.string.toNumber = function(e) {
var t = Number(e);
return 0 == t && goog.string.isEmptyOrWhitespace(e) ? NaN : t;
};
goog.string.isLowerCamelCase = function(e) {
return /^[a-z]+([A-Z][a-z]*)*$/.test(e);
};
goog.string.isUpperCamelCase = function(e) {
return /^([A-Z][a-z]*)+$/.test(e);
};
goog.string.toCamelCase = function(e) {
return String(e).replace(/\-([a-z])/g, function(e, t) {
return t.toUpperCase();
});
};
goog.string.toSelectorCase = function(e) {
return String(e).replace(/([A-Z])/g, "-$1").toLowerCase();
};
goog.string.toTitleCase = function(e, t) {
var o = goog.isString(t) ? goog.string.regExpEscape(t) : "\\s";
return e.replace(new RegExp("(^" + (o ? "|[" + o + "]+" : "") + ")([a-z])", "g"), function(e, t, o) {
return t + o.toUpperCase();
});
};
goog.string.capitalize = function(e) {
return String(e.charAt(0)).toUpperCase() + String(e.substr(1)).toLowerCase();
};
goog.string.parseInt = function(e) {
isFinite(e) && (e = String(e));
return goog.isString(e) ? /^\s*-?0x/i.test(e) ? parseInt(e, 16) : parseInt(e, 10) : NaN;
};
goog.string.splitLimit = function(e, t, o) {
e = e.split(t);
for (var s = []; 0 < o && e.length; ) s.push(e.shift()), o--;
e.length && s.push(e.join(t));
return s;
};
goog.string.editDistance = function(e, t) {
var o = [], s = [];
if (e == t) return 0;
if (!e.length || !t.length) return Math.max(e.length, t.length);
for (var r = 0; r < t.length + 1; r++) o[r] = r;
for (r = 0; r < e.length; r++) {
s[0] = r + 1;
for (var i = 0; i < t.length; i++) s[i + 1] = Math.min(s[i] + 1, o[i + 1] + 1, o[i] + Number(e[r] != t[i]));
for (i = 0; i < o.length; i++) o[i] = s[i];
}
return s[t.length];
};
goog.asserts = {};
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(e, t) {
t.unshift(e);
goog.debug.Error.call(this, goog.string.subs.apply(null, t));
t.shift();
this.messagePattern = e;
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.DEFAULT_ERROR_HANDLER = function(e) {
throw e;
};
goog.asserts.errorHandler_ = goog.asserts.DEFAULT_ERROR_HANDLER;
goog.asserts.doAssertFailure_ = function(e, t, o, s) {
r = "Assertion failed";
if (o) var r = r + ": " + o, i = s; else e && (r += ": " + e, i = t);
e = new goog.asserts.AssertionError("" + r, i || []);
goog.asserts.errorHandler_(e);
};
goog.asserts.setErrorHandler = function(e) {
goog.asserts.ENABLE_ASSERTS && (goog.asserts.errorHandler_ = e);
};
goog.asserts.assert = function(e, t, o) {
goog.asserts.ENABLE_ASSERTS && !e && goog.asserts.doAssertFailure_("", null, t, Array.prototype.slice.call(arguments, 2));
return e;
};
goog.asserts.fail = function(e, t) {
goog.asserts.ENABLE_ASSERTS && goog.asserts.errorHandler_(new goog.asserts.AssertionError("Failure" + (e ? ": " + e : ""), Array.prototype.slice.call(arguments, 1)));
};
goog.asserts.assertNumber = function(e, t, o) {
goog.asserts.ENABLE_ASSERTS && !goog.isNumber(e) && goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2));
return e;
};
goog.asserts.assertString = function(e, t, o) {
goog.asserts.ENABLE_ASSERTS && !goog.isString(e) && goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2));
return e;
};
goog.asserts.assertFunction = function(e, t, o) {
goog.asserts.ENABLE_ASSERTS && !goog.isFunction(e) && goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2));
return e;
};
goog.asserts.assertObject = function(e, t, o) {
goog.asserts.ENABLE_ASSERTS && !goog.isObject(e) && goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2));
return e;
};
goog.asserts.assertArray = function(e, t, o) {
goog.asserts.ENABLE_ASSERTS && !goog.isArray(e) && goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2));
return e;
};
goog.asserts.assertBoolean = function(e, t, o) {
goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(e) && goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2));
return e;
};
goog.asserts.assertElement = function(e, t, o) {
!goog.asserts.ENABLE_ASSERTS || goog.isObject(e) && e.nodeType == goog.dom.NodeType.ELEMENT || goog.asserts.doAssertFailure_("Expected Element but got %s: %s.", [ goog.typeOf(e), e ], t, Array.prototype.slice.call(arguments, 2));
return e;
};
goog.asserts.assertInstanceof = function(e, t, o, s) {
!goog.asserts.ENABLE_ASSERTS || e instanceof t || goog.asserts.doAssertFailure_("Expected instanceof %s but got %s.", [ goog.asserts.getType_(t), goog.asserts.getType_(e) ], o, Array.prototype.slice.call(arguments, 3));
return e;
};
goog.asserts.assertObjectPrototypeIsIntact = function() {
for (var e in Object.prototype) goog.asserts.fail(e + " should not be enumerable in Object.prototype.");
};
goog.asserts.getType_ = function(e) {
return e instanceof Function ? e.displayName || e.name || "unknown type name" : e instanceof Object ? e.constructor.displayName || e.constructor.name || Object.prototype.toString.call(e) : null === e ? "null" : "undefined" == typeof e ? "undefined" : _typeof(e);
};
goog.array = {};
goog.NATIVE_ARRAY_PROTOTYPES = goog.TRUSTED_SITE;
goog.array.ASSUME_NATIVE_FUNCTIONS = !1;
goog.array.peek = function(e) {
return e[e.length - 1];
};
goog.array.last = goog.array.peek;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.indexOf) ? function(e, t, o) {
goog.asserts.assert(null != e.length);
return Array.prototype.indexOf.call(e, t, o);
} : function(e, t, o) {
o = null == o ? 0 : 0 > o ? Math.max(0, e.length + o) : o;
if (goog.isString(e)) return goog.isString(t) && 1 == t.length ? e.indexOf(t, o) : -1;
for (;o < e.length; o++) if (o in e && e[o] === t) return o;
return -1;
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.lastIndexOf) ? function(e, t, o) {
goog.asserts.assert(null != e.length);
return Array.prototype.lastIndexOf.call(e, t, null == o ? e.length - 1 : o);
} : function(e, t, o) {
0 > (o = null == o ? e.length - 1 : o) && (o = Math.max(0, e.length + o));
if (goog.isString(e)) return goog.isString(t) && 1 == t.length ? e.lastIndexOf(t, o) : -1;
for (;0 <= o; o--) if (o in e && e[o] === t) return o;
return -1;
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.forEach) ? function(e, t, o) {
goog.asserts.assert(null != e.length);
Array.prototype.forEach.call(e, t, o);
} : function(e, t, o) {
for (var s = e.length, r = goog.isString(e) ? e.split("") : e, i = 0; i < s; i++) i in r && t.call(o, r[i], i, e);
};
goog.array.forEachRight = function(e, t, o) {
for (var s = e.length, r = goog.isString(e) ? e.split("") : e, s = s - 1; 0 <= s; --s) s in r && t.call(o, r[s], s, e);
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.filter) ? function(e, t, o) {
goog.asserts.assert(null != e.length);
return Array.prototype.filter.call(e, t, o);
} : function(e, t, o) {
for (var s = e.length, r = [], i = 0, n = goog.isString(e) ? e.split("") : e, a = 0; a < s; a++) if (a in n) {
var p = n[a];
t.call(o, p, a, e) && (r[i++] = p);
}
return r;
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.map) ? function(e, t, o) {
goog.asserts.assert(null != e.length);
return Array.prototype.map.call(e, t, o);
} : function(e, t, o) {
for (var s = e.length, r = Array(s), i = goog.isString(e) ? e.split("") : e, n = 0; n < s; n++) n in i && (r[n] = t.call(o, i[n], n, e));
return r;
};
goog.array.reduce = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduce) ? function(e, t, o, s) {
goog.asserts.assert(null != e.length);
s && (t = goog.bind(t, s));
return Array.prototype.reduce.call(e, t, o);
} : function(e, t, o, s) {
var r = o;
goog.array.forEach(e, function(o, i) {
r = t.call(s, r, o, i, e);
});
return r;
};
goog.array.reduceRight = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.reduceRight) ? function(e, t, o, s) {
goog.asserts.assert(null != e.length);
goog.asserts.assert(null != t);
s && (t = goog.bind(t, s));
return Array.prototype.reduceRight.call(e, t, o);
} : function(e, t, o, s) {
var r = o;
goog.array.forEachRight(e, function(o, i) {
r = t.call(s, r, o, i, e);
});
return r;
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.some) ? function(e, t, o) {
goog.asserts.assert(null != e.length);
return Array.prototype.some.call(e, t, o);
} : function(e, t, o) {
for (var s = e.length, r = goog.isString(e) ? e.split("") : e, i = 0; i < s; i++) if (i in r && t.call(o, r[i], i, e)) return !0;
return !1;
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && (goog.array.ASSUME_NATIVE_FUNCTIONS || Array.prototype.every) ? function(e, t, o) {
goog.asserts.assert(null != e.length);
return Array.prototype.every.call(e, t, o);
} : function(e, t, o) {
for (var s = e.length, r = goog.isString(e) ? e.split("") : e, i = 0; i < s; i++) if (i in r && !t.call(o, r[i], i, e)) return !1;
return !0;
};
goog.array.count = function(e, t, o) {
var s = 0;
goog.array.forEach(e, function(e, r, i) {
t.call(o, e, r, i) && ++s;
}, o);
return s;
};
goog.array.find = function(e, t, o) {
return 0 > (t = goog.array.findIndex(e, t, o)) ? null : goog.isString(e) ? e.charAt(t) : e[t];
};
goog.array.findIndex = function(e, t, o) {
for (var s = e.length, r = goog.isString(e) ? e.split("") : e, i = 0; i < s; i++) if (i in r && t.call(o, r[i], i, e)) return i;
return -1;
};
goog.array.findRight = function(e, t, o) {
return 0 > (t = goog.array.findIndexRight(e, t, o)) ? null : goog.isString(e) ? e.charAt(t) : e[t];
};
goog.array.findIndexRight = function(e, t, o) {
for (var s = e.length, r = goog.isString(e) ? e.split("") : e, s = s - 1; 0 <= s; s--) if (s in r && t.call(o, r[s], s, e)) return s;
return -1;
};
goog.array.contains = function(e, t) {
return 0 <= goog.array.indexOf(e, t);
};
goog.array.isEmpty = function(e) {
return 0 == e.length;
};
goog.array.clear = function(e) {
if (!goog.isArray(e)) for (var t = e.length - 1; 0 <= t; t--) delete e[t];
e.length = 0;
};
goog.array.insert = function(e, t) {
goog.array.contains(e, t) || e.push(t);
};
goog.array.insertAt = function(e, t, o) {
goog.array.splice(e, o, 0, t);
};
goog.array.insertArrayAt = function(e, t, o) {
goog.partial(goog.array.splice, e, o, 0).apply(null, t);
};
goog.array.insertBefore = function(e, t, o) {
var s;
2 == arguments.length || 0 > (s = goog.array.indexOf(e, o)) ? e.push(t) : goog.array.insertAt(e, t, s);
};
goog.array.remove = function(e, t) {
var o, s = goog.array.indexOf(e, t);
(o = 0 <= s) && goog.array.removeAt(e, s);
return o;
};
goog.array.removeAt = function(e, t) {
goog.asserts.assert(null != e.length);
return 1 == Array.prototype.splice.call(e, t, 1).length;
};
goog.array.removeIf = function(e, t, o) {
return 0 <= (t = goog.array.findIndex(e, t, o)) && (goog.array.removeAt(e, t), !0);
};
goog.array.removeAllIf = function(e, t, o) {
var s = 0;
goog.array.forEachRight(e, function(r, i) {
t.call(o, r, i, e) && goog.array.removeAt(e, i) && s++;
});
return s;
};
goog.array.concat = function(e) {
return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.join = function(e) {
return Array.prototype.concat.apply(Array.prototype, arguments);
};
goog.array.toArray = function(e) {
var t = e.length;
if (0 < t) {
for (var o = Array(t), s = 0; s < t; s++) o[s] = e[s];
return o;
}
return [];
};
goog.array.clone = goog.array.toArray;
goog.array.extend = function(e, t) {
for (var o = 1; o < arguments.length; o++) {
var s = arguments[o];
if (goog.isArrayLike(s)) {
var r = e.length || 0, i = s.length || 0;
e.length = r + i;
for (var n = 0; n < i; n++) e[r + n] = s[n];
} else e.push(s);
}
};
goog.array.splice = function(e, t, o, s) {
goog.asserts.assert(null != e.length);
return Array.prototype.splice.apply(e, goog.array.slice(arguments, 1));
};
goog.array.slice = function(e, t, o) {
goog.asserts.assert(null != e.length);
return 2 >= arguments.length ? Array.prototype.slice.call(e, t) : Array.prototype.slice.call(e, t, o);
};
goog.array.removeDuplicates = function(e, t, o) {
t = t || e;
s = function(e) {
return goog.isObject(e) ? "o" + goog.getUid(e) : ("undefined" == typeof e ? "undefined" : _typeof(e)).charAt(0) + e;
};
o = o || s;
for (var s = {}, r = 0, i = 0; i < e.length; ) {
var n = e[i++], a = o(n);
Object.prototype.hasOwnProperty.call(s, a) || (s[a] = !0, t[r++] = n);
}
t.length = r;
};
goog.array.binarySearch = function(e, t, o) {
return goog.array.binarySearch_(e, o || goog.array.defaultCompare, !1, t);
};
goog.array.binarySelect = function(e, t, o) {
return goog.array.binarySearch_(e, t, !0, void 0, o);
};
goog.array.binarySearch_ = function(e, t, o, s, r) {
for (var i, n = 0, a = e.length; n < a; ) {
var p, l = n + a >> 1;
0 < (p = o ? t.call(r, e[l], l, e) : t(s, e[l])) ? n = l + 1 : (a = l, i = !p);
}
return i ? n : ~n;
};
goog.array.sort = function(e, t) {
e.sort(t || goog.array.defaultCompare);
};
goog.array.stableSort = function(e, t) {
for (var o = 0; o < e.length; o++) e[o] = {
index: o,
value: e[o]
};
var s = t || goog.array.defaultCompare;
goog.array.sort(e, function(e, t) {
return s(e.value, t.value) || e.index - t.index;
});
for (o = 0; o < e.length; o++) e[o] = e[o].value;
};
goog.array.sortByKey = function(e, t, o) {
var s = o || goog.array.defaultCompare;
goog.array.sort(e, function(e, o) {
return s(t(e), t(o));
});
};
goog.array.sortObjectsByKey = function(e, t, o) {
goog.array.sortByKey(e, function(e) {
return e[t];
}, o);
};
goog.array.isSorted = function(e, t, o) {
t = t || goog.array.defaultCompare;
for (var s = 1; s < e.length; s++) {
var r = t(e[s - 1], e[s]);
if (0 < r || 0 == r && o) return !1;
}
return !0;
};
goog.array.equals = function(e, t, o) {
if (!goog.isArrayLike(e) || !goog.isArrayLike(t) || e.length != t.length) return !1;
var s = e.length;
o = o || goog.array.defaultCompareEquality;
for (var r = 0; r < s; r++) if (!o(e[r], t[r])) return !1;
return !0;
};
goog.array.compare3 = function(e, t, o) {
o = o || goog.array.defaultCompare;
for (var s = Math.min(e.length, t.length), r = 0; r < s; r++) {
var i = o(e[r], t[r]);
if (0 != i) return i;
}
return goog.array.defaultCompare(e.length, t.length);
};
goog.array.defaultCompare = function(e, t) {
return e > t ? 1 : e < t ? -1 : 0;
};
goog.array.inverseDefaultCompare = function(e, t) {
return -goog.array.defaultCompare(e, t);
};
goog.array.defaultCompareEquality = function(e, t) {
return e === t;
};
goog.array.binaryInsert = function(e, t, o) {
return 0 > (o = goog.array.binarySearch(e, t, o)) && (goog.array.insertAt(e, t, -(o + 1)), 
!0);
};
goog.array.binaryRemove = function(e, t, o) {
return 0 <= (t = goog.array.binarySearch(e, t, o)) && goog.array.removeAt(e, t);
};
goog.array.bucket = function(e, t, o) {
for (var s = {}, r = 0; r < e.length; r++) {
var i = e[r], n = t.call(o, i, r, e);
goog.isDef(n) && (s[n] || (s[n] = [])).push(i);
}
return s;
};
goog.array.toObject = function(e, t, o) {
var s = {};
goog.array.forEach(e, function(r, i) {
s[t.call(o, r, i, e)] = r;
});
return s;
};
goog.array.range = function(e, t, o) {
var s = [], r = 0, i = e;
o = o || 1;
void 0 !== t && (r = e, i = t);
if (0 > o * (i - r)) return [];
if (0 < o) for (e = r; e < i; e += o) s.push(e); else for (e = r; e > i; e += o) s.push(e);
return s;
};
goog.array.repeat = function(e, t) {
for (var o = [], s = 0; s < t; s++) o[s] = e;
return o;
};
goog.array.flatten = function(e) {
for (var t = [], o = 0; o < arguments.length; o++) {
var s = arguments[o];
if (goog.isArray(s)) for (var r = 0; r < s.length; r += 8192) for (var i = goog.array.slice(s, r, r + 8192), i = goog.array.flatten.apply(null, i), n = 0; n < i.length; n++) t.push(i[n]); else t.push(s);
}
return t;
};
goog.array.rotate = function(e, t) {
goog.asserts.assert(null != e.length);
e.length && (0 < (t %= e.length) ? Array.prototype.unshift.apply(e, e.splice(-t, t)) : 0 > t && Array.prototype.push.apply(e, e.splice(0, -t)));
return e;
};
goog.array.moveItem = function(e, t, o) {
goog.asserts.assert(0 <= t && t < e.length);
goog.asserts.assert(0 <= o && o < e.length);
t = Array.prototype.splice.call(e, t, 1);
Array.prototype.splice.call(e, o, 0, t[0]);
};
goog.array.zip = function(e) {
if (!arguments.length) return [];
for (var t = [], o = arguments[0].length, s = 1; s < arguments.length; s++) arguments[s].length < o && (o = arguments[s].length);
for (s = 0; s < o; s++) {
for (var r = [], i = 0; i < arguments.length; i++) r.push(arguments[i][s]);
t.push(r);
}
return t;
};
goog.array.shuffle = function(e, t) {
for (var o = t || Math.random, s = e.length - 1; 0 < s; s--) {
var r = Math.floor(o() * (s + 1)), i = e[s];
e[s] = e[r];
e[r] = i;
}
};
goog.array.copyByIndex = function(e, t) {
var o = [];
goog.array.forEach(t, function(t) {
o.push(e[t]);
});
return o;
};
goog.crypt = {};
goog.crypt.stringToByteArray = function(e) {
for (var t = [], o = 0, s = 0; s < e.length; s++) {
for (var r = e.charCodeAt(s); 255 < r; ) t[o++] = 255 & r, r >>= 8;
t[o++] = r;
}
return t;
};
goog.crypt.byteArrayToString = function(e) {
if (8192 >= e.length) return String.fromCharCode.apply(null, e);
for (var t = "", o = 0; o < e.length; o += 8192) var s = goog.array.slice(e, o, o + 8192), t = t + String.fromCharCode.apply(null, s);
return t;
};
goog.crypt.byteArrayToHex = function(e) {
return goog.array.map(e, function(e) {
return 1 < (e = e.toString(16)).length ? e : "0" + e;
}).join("");
};
goog.crypt.hexToByteArray = function(e) {
goog.asserts.assert(0 == e.length % 2, "Key string length must be multiple of 2");
for (var t = [], o = 0; o < e.length; o += 2) t.push(parseInt(e.substring(o, o + 2), 16));
return t;
};
goog.crypt.stringToUtf8ByteArray = function(e) {
for (var t = [], o = 0, s = 0; s < e.length; s++) {
var r = e.charCodeAt(s);
128 > r ? t[o++] = r : (2048 > r ? t[o++] = r >> 6 | 192 : (55296 == (64512 & r) && s + 1 < e.length && 56320 == (64512 & e.charCodeAt(s + 1)) ? (r = 65536 + ((1023 & r) << 10) + (1023 & e.charCodeAt(++s)), 
t[o++] = r >> 18 | 240, t[o++] = r >> 12 & 63 | 128) : t[o++] = r >> 12 | 224, t[o++] = r >> 6 & 63 | 128), 
t[o++] = 63 & r | 128);
}
return t;
};
goog.crypt.utf8ByteArrayToString = function(e) {
for (var t = [], o = 0, s = 0; o < e.length; ) if (128 > (n = e[o++])) t[s++] = String.fromCharCode(n); else if (191 < n && 224 > n) {
r = e[o++];
t[s++] = String.fromCharCode((31 & n) << 6 | 63 & r);
} else if (239 < n && 365 > n) {
var r = e[o++], i = e[o++], n = ((7 & n) << 18 | (63 & r) << 12 | (63 & i) << 6 | 63 & e[o++]) - 65536;
t[s++] = String.fromCharCode(55296 + (n >> 10));
t[s++] = String.fromCharCode(56320 + (1023 & n));
} else r = e[o++], i = e[o++], t[s++] = String.fromCharCode((15 & n) << 12 | (63 & r) << 6 | 63 & i);
return t.join("");
};
goog.crypt.xorByteArray = function(e, t) {
goog.asserts.assert(e.length == t.length, "XOR array lengths must match");
for (var o = [], s = 0; s < e.length; s++) o.push(e[s] ^ t[s]);
return o;
};
goog.labs = {};
goog.labs.userAgent = {};
goog.labs.userAgent.util = {};
goog.labs.userAgent.util.getNativeUserAgentString_ = function() {
var e = goog.labs.userAgent.util.getNavigator_();
return e && (e = e.userAgent) ? e : "";
};
goog.labs.userAgent.util.getNavigator_ = function() {
return goog.global.navigator;
};
goog.labs.userAgent.util.userAgent_ = goog.labs.userAgent.util.getNativeUserAgentString_();
goog.labs.userAgent.util.setUserAgent = function(e) {
goog.labs.userAgent.util.userAgent_ = e || goog.labs.userAgent.util.getNativeUserAgentString_();
};
goog.labs.userAgent.util.getUserAgent = function() {
return goog.labs.userAgent.util.userAgent_;
};
goog.labs.userAgent.util.matchUserAgent = function(e) {
var t = goog.labs.userAgent.util.getUserAgent();
return goog.string.contains(t, e);
};
goog.labs.userAgent.util.matchUserAgentIgnoreCase = function(e) {
var t = goog.labs.userAgent.util.getUserAgent();
return goog.string.caseInsensitiveContains(t, e);
};
goog.labs.userAgent.util.extractVersionTuples = function(e) {
for (var t, o = RegExp("(\\w[\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g"), s = []; t = o.exec(e); ) s.push([ t[1], t[2], t[3] || void 0 ]);
return s;
};
goog.object = {};
goog.object.forEach = function(e, t, o) {
for (var s in e) t.call(o, e[s], s, e);
};
goog.object.filter = function(e, t, o) {
var s, r = {};
for (s in e) t.call(o, e[s], s, e) && (r[s] = e[s]);
return r;
};
goog.object.map = function(e, t, o) {
var s, r = {};
for (s in e) r[s] = t.call(o, e[s], s, e);
return r;
};
goog.object.some = function(e, t, o) {
for (var s in e) if (t.call(o, e[s], s, e)) return !0;
return !1;
};
goog.object.every = function(e, t, o) {
for (var s in e) if (!t.call(o, e[s], s, e)) return !1;
return !0;
};
goog.object.getCount = function(e) {
var t, o = 0;
for (t in e) o++;
return o;
};
goog.object.getAnyKey = function(e) {
for (var t in e) return t;
};
goog.object.getAnyValue = function(e) {
for (var t in e) return e[t];
};
goog.object.contains = function(e, t) {
return goog.object.containsValue(e, t);
};
goog.object.getValues = function(e) {
var t, o = [], s = 0;
for (t in e) o[s++] = e[t];
return o;
};
goog.object.getKeys = function(e) {
var t, o = [], s = 0;
for (t in e) o[s++] = t;
return o;
};
goog.object.getValueByKeys = function(e, t) {
for (var o = (s = goog.isArrayLike(t)) ? t : arguments, s = s ? 0 : 1; s < o.length && (e = e[o[s]], 
goog.isDef(e)); s++) ;
return e;
};
goog.object.containsKey = function(e, t) {
return null !== e && t in e;
};
goog.object.containsValue = function(e, t) {
for (var o in e) if (e[o] == t) return !0;
return !1;
};
goog.object.findKey = function(e, t, o) {
for (var s in e) if (t.call(o, e[s], s, e)) return s;
};
goog.object.findValue = function(e, t, o) {
return (t = goog.object.findKey(e, t, o)) && e[t];
};
goog.object.isEmpty = function(e) {
for (var t in e) return !1;
return !0;
};
goog.object.clear = function(e) {
for (var t in e) delete e[t];
};
goog.object.remove = function(e, t) {
var o;
(o = t in e) && delete e[t];
return o;
};
goog.object.add = function(e, t, o) {
if (null !== e && t in e) throw Error('The object already contains the key "' + t + '"');
goog.object.set(e, t, o);
};
goog.object.get = function(e, t, o) {
return null !== e && t in e ? e[t] : o;
};
goog.object.set = function(e, t, o) {
e[t] = o;
};
goog.object.setIfUndefined = function(e, t, o) {
return t in e ? e[t] : e[t] = o;
};
goog.object.setWithReturnValueIfNotSet = function(e, t, o) {
if (t in e) return e[t];
o = o();
return e[t] = o;
};
goog.object.equals = function(e, t) {
for (var o in e) if (!(o in t) || e[o] !== t[o]) return !1;
for (o in t) if (!(o in e)) return !1;
return !0;
};
goog.object.clone = function(e) {
var t, o = {};
for (t in e) o[t] = e[t];
return o;
};
goog.object.unsafeClone = function(e) {
if ("object" == (o = goog.typeOf(e)) || "array" == o) {
if (goog.isFunction(e.clone)) return e.clone();
var t, o = "array" == o ? [] : {};
for (t in e) o[t] = goog.object.unsafeClone(e[t]);
return o;
}
return e;
};
goog.object.transpose = function(e) {
var t, o = {};
for (t in e) o[e[t]] = t;
return o;
};
goog.object.PROTOTYPE_FIELDS_ = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
goog.object.extend = function(e, t) {
for (var o, s, r = 1; r < arguments.length; r++) {
s = arguments[r];
for (o in s) e[o] = s[o];
for (var i = 0; i < goog.object.PROTOTYPE_FIELDS_.length; i++) o = goog.object.PROTOTYPE_FIELDS_[i], 
Object.prototype.hasOwnProperty.call(s, o) && (e[o] = s[o]);
}
};
goog.object.create = function(e) {
var t = arguments.length;
if (1 == t && goog.isArray(arguments[0])) return goog.object.create.apply(null, arguments[0]);
if (t % 2) throw Error("Uneven number of arguments");
for (var o = {}, s = 0; s < t; s += 2) o[arguments[s]] = arguments[s + 1];
return o;
};
goog.object.createSet = function(e) {
var t = arguments.length;
if (1 == t && goog.isArray(arguments[0])) return goog.object.createSet.apply(null, arguments[0]);
for (var o = {}, s = 0; s < t; s++) o[arguments[s]] = !0;
return o;
};
goog.object.createImmutableView = function(e) {
var t = e;
Object.isFrozen && !Object.isFrozen(e) && (t = Object.create(e), Object.freeze(t));
return t;
};
goog.object.isImmutableView = function(e) {
return !!Object.isFrozen && Object.isFrozen(e);
};
goog.labs.userAgent.browser = {};
goog.labs.userAgent.browser.matchOpera_ = function() {
return goog.labs.userAgent.util.matchUserAgent("Opera") || goog.labs.userAgent.util.matchUserAgent("OPR");
};
goog.labs.userAgent.browser.matchIE_ = function() {
return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.browser.matchEdge_ = function() {
return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.browser.matchFirefox_ = function() {
return goog.labs.userAgent.util.matchUserAgent("Firefox");
};
goog.labs.userAgent.browser.matchSafari_ = function() {
return goog.labs.userAgent.util.matchUserAgent("Safari") && !(goog.labs.userAgent.browser.matchChrome_() || goog.labs.userAgent.browser.matchCoast_() || goog.labs.userAgent.browser.matchOpera_() || goog.labs.userAgent.browser.matchEdge_() || goog.labs.userAgent.browser.isSilk() || goog.labs.userAgent.util.matchUserAgent("Android"));
};
goog.labs.userAgent.browser.matchCoast_ = function() {
return goog.labs.userAgent.util.matchUserAgent("Coast");
};
goog.labs.userAgent.browser.matchIosWebview_ = function() {
return (goog.labs.userAgent.util.matchUserAgent("iPad") || goog.labs.userAgent.util.matchUserAgent("iPhone")) && !goog.labs.userAgent.browser.matchSafari_() && !goog.labs.userAgent.browser.matchChrome_() && !goog.labs.userAgent.browser.matchCoast_() && goog.labs.userAgent.util.matchUserAgent("AppleWebKit");
};
goog.labs.userAgent.browser.matchChrome_ = function() {
return (goog.labs.userAgent.util.matchUserAgent("Chrome") || goog.labs.userAgent.util.matchUserAgent("CriOS")) && !goog.labs.userAgent.browser.matchOpera_() && !goog.labs.userAgent.browser.matchEdge_();
};
goog.labs.userAgent.browser.matchAndroidBrowser_ = function() {
return goog.labs.userAgent.util.matchUserAgent("Android") && !(goog.labs.userAgent.browser.isChrome() || goog.labs.userAgent.browser.isFirefox() || goog.labs.userAgent.browser.isOpera() || goog.labs.userAgent.browser.isSilk());
};
goog.labs.userAgent.browser.isOpera = goog.labs.userAgent.browser.matchOpera_;
goog.labs.userAgent.browser.isIE = goog.labs.userAgent.browser.matchIE_;
goog.labs.userAgent.browser.isEdge = goog.labs.userAgent.browser.matchEdge_;
goog.labs.userAgent.browser.isFirefox = goog.labs.userAgent.browser.matchFirefox_;
goog.labs.userAgent.browser.isSafari = goog.labs.userAgent.browser.matchSafari_;
goog.labs.userAgent.browser.isCoast = goog.labs.userAgent.browser.matchCoast_;
goog.labs.userAgent.browser.isIosWebview = goog.labs.userAgent.browser.matchIosWebview_;
goog.labs.userAgent.browser.isChrome = goog.labs.userAgent.browser.matchChrome_;
goog.labs.userAgent.browser.isAndroidBrowser = goog.labs.userAgent.browser.matchAndroidBrowser_;
goog.labs.userAgent.browser.isSilk = function() {
return goog.labs.userAgent.util.matchUserAgent("Silk");
};
goog.labs.userAgent.browser.getVersion = function() {
function e(e) {
e = goog.array.find(e, s);
return o[e] || "";
}
t = goog.labs.userAgent.util.getUserAgent();
if (goog.labs.userAgent.browser.isIE()) return goog.labs.userAgent.browser.getIEVersion_(t);
var t = goog.labs.userAgent.util.extractVersionTuples(t), o = {};
goog.array.forEach(t, function(e) {
o[e[0]] = e[1];
});
var s = goog.partial(goog.object.containsKey, o);
return goog.labs.userAgent.browser.isOpera() ? e([ "Version", "Opera", "OPR" ]) : goog.labs.userAgent.browser.isEdge() ? e([ "Edge" ]) : goog.labs.userAgent.browser.isChrome() ? e([ "Chrome", "CriOS" ]) : (t = t[2]) && t[1] || "";
};
goog.labs.userAgent.browser.isVersionOrHigher = function(e) {
return 0 <= goog.string.compareVersions(goog.labs.userAgent.browser.getVersion(), e);
};
goog.labs.userAgent.browser.getIEVersion_ = function(e) {
if ((t = /rv: *([\d\.]*)/.exec(e)) && t[1]) return t[1];
var t = "", o = /MSIE +([\d\.]+)/.exec(e);
if (o && o[1]) if (e = /Trident\/(\d.\d)/.exec(e), "7.0" == o[1]) if (e && e[1]) switch (e[1]) {
case "4.0":
t = "8.0";
break;

case "5.0":
t = "9.0";
break;

case "6.0":
t = "10.0";
break;

case "7.0":
t = "11.0";
} else t = "7.0"; else t = o[1];
return t;
};
goog.labs.userAgent.engine = {};
goog.labs.userAgent.engine.isPresto = function() {
return goog.labs.userAgent.util.matchUserAgent("Presto");
};
goog.labs.userAgent.engine.isTrident = function() {
return goog.labs.userAgent.util.matchUserAgent("Trident") || goog.labs.userAgent.util.matchUserAgent("MSIE");
};
goog.labs.userAgent.engine.isEdge = function() {
return goog.labs.userAgent.util.matchUserAgent("Edge");
};
goog.labs.userAgent.engine.isWebKit = function() {
return goog.labs.userAgent.util.matchUserAgentIgnoreCase("WebKit") && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.isGecko = function() {
return goog.labs.userAgent.util.matchUserAgent("Gecko") && !goog.labs.userAgent.engine.isWebKit() && !goog.labs.userAgent.engine.isTrident() && !goog.labs.userAgent.engine.isEdge();
};
goog.labs.userAgent.engine.getVersion = function() {
if (e = goog.labs.userAgent.util.getUserAgent()) {
var e = goog.labs.userAgent.util.extractVersionTuples(e), t = goog.labs.userAgent.engine.getEngineTuple_(e);
if (t) return "Gecko" == t[0] ? goog.labs.userAgent.engine.getVersionForKey_(e, "Firefox") : t[1];
var o;
if ((e = e[0]) && (o = e[2]) && (o = /Trident\/([^\s;]+)/.exec(o))) return o[1];
}
return "";
};
goog.labs.userAgent.engine.getEngineTuple_ = function(e) {
if (!goog.labs.userAgent.engine.isEdge()) return e[1];
for (var t = 0; t < e.length; t++) {
var o = e[t];
if ("Edge" == o[0]) return o;
}
};
goog.labs.userAgent.engine.isVersionOrHigher = function(e) {
return 0 <= goog.string.compareVersions(goog.labs.userAgent.engine.getVersion(), e);
};
goog.labs.userAgent.engine.getVersionForKey_ = function(e, t) {
var o = goog.array.find(e, function(e) {
return t == e[0];
});
return o && o[1] || "";
};
goog.labs.userAgent.platform = {};
goog.labs.userAgent.platform.isAndroid = function() {
return goog.labs.userAgent.util.matchUserAgent("Android");
};
goog.labs.userAgent.platform.isIpod = function() {
return goog.labs.userAgent.util.matchUserAgent("iPod");
};
goog.labs.userAgent.platform.isIphone = function() {
return goog.labs.userAgent.util.matchUserAgent("iPhone") && !goog.labs.userAgent.util.matchUserAgent("iPod") && !goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIpad = function() {
return goog.labs.userAgent.util.matchUserAgent("iPad");
};
goog.labs.userAgent.platform.isIos = function() {
return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpad() || goog.labs.userAgent.platform.isIpod();
};
goog.labs.userAgent.platform.isMacintosh = function() {
return goog.labs.userAgent.util.matchUserAgent("Macintosh");
};
goog.labs.userAgent.platform.isLinux = function() {
return goog.labs.userAgent.util.matchUserAgent("Linux");
};
goog.labs.userAgent.platform.isWindows = function() {
return goog.labs.userAgent.util.matchUserAgent("Windows");
};
goog.labs.userAgent.platform.isChromeOS = function() {
return goog.labs.userAgent.util.matchUserAgent("CrOS");
};
goog.labs.userAgent.platform.getVersion = function() {
var e = goog.labs.userAgent.util.getUserAgent(), t = "";
goog.labs.userAgent.platform.isWindows() ? (t = /Windows (?:NT|Phone) ([0-9.]+)/, 
t = (e = t.exec(e)) ? e[1] : "0.0") : goog.labs.userAgent.platform.isIos() ? (t = /(?:iPhone|iPod|iPad|CPU)\s+OS\s+(\S+)/, 
t = (e = t.exec(e)) && e[1].replace(/_/g, ".")) : goog.labs.userAgent.platform.isMacintosh() ? (t = /Mac OS X ([0-9_.]+)/, 
t = (e = t.exec(e)) ? e[1].replace(/_/g, ".") : "10") : goog.labs.userAgent.platform.isAndroid() ? (t = /Android\s+([^\);]+)(\)|;)/, 
t = (e = t.exec(e)) && e[1]) : goog.labs.userAgent.platform.isChromeOS() && (t = /(?:CrOS\s+(?:i686|x86_64)\s+([0-9.]+))/, 
t = (e = t.exec(e)) && e[1]);
return t || "";
};
goog.labs.userAgent.platform.isVersionOrHigher = function(e) {
return 0 <= goog.string.compareVersions(goog.labs.userAgent.platform.getVersion(), e);
};
goog.userAgent = {};
goog.userAgent.ASSUME_IE = !1;
goog.userAgent.ASSUME_EDGE = !1;
goog.userAgent.ASSUME_GECKO = !1;
goog.userAgent.ASSUME_WEBKIT = !1;
goog.userAgent.ASSUME_MOBILE_WEBKIT = !1;
goog.userAgent.ASSUME_OPERA = !1;
goog.userAgent.ASSUME_ANY_VERSION = !1;
goog.userAgent.BROWSER_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_GECKO || goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_OPERA;
goog.userAgent.getUserAgentString = function() {
return goog.labs.userAgent.util.getUserAgent();
};
goog.userAgent.getNavigator = function() {
return goog.global.navigator || null;
};
goog.userAgent.OPERA = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_OPERA : goog.labs.userAgent.browser.isOpera();
goog.userAgent.IE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_IE : goog.labs.userAgent.browser.isIE();
goog.userAgent.EDGE = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_EDGE : goog.labs.userAgent.engine.isEdge();
goog.userAgent.EDGE_OR_IE = goog.userAgent.EDGE || goog.userAgent.IE;
goog.userAgent.GECKO = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_GECKO : goog.labs.userAgent.engine.isGecko();
goog.userAgent.WEBKIT = goog.userAgent.BROWSER_KNOWN_ ? goog.userAgent.ASSUME_WEBKIT || goog.userAgent.ASSUME_MOBILE_WEBKIT : goog.labs.userAgent.engine.isWebKit();
goog.userAgent.isMobile_ = function() {
return goog.userAgent.WEBKIT && goog.labs.userAgent.util.matchUserAgent("Mobile");
};
goog.userAgent.MOBILE = goog.userAgent.ASSUME_MOBILE_WEBKIT || goog.userAgent.isMobile_();
goog.userAgent.SAFARI = goog.userAgent.WEBKIT;
goog.userAgent.determinePlatform_ = function() {
var e = goog.userAgent.getNavigator();
return e && e.platform || "";
};
goog.userAgent.PLATFORM = goog.userAgent.determinePlatform_();
goog.userAgent.ASSUME_MAC = !1;
goog.userAgent.ASSUME_WINDOWS = !1;
goog.userAgent.ASSUME_LINUX = !1;
goog.userAgent.ASSUME_X11 = !1;
goog.userAgent.ASSUME_ANDROID = !1;
goog.userAgent.ASSUME_IPHONE = !1;
goog.userAgent.ASSUME_IPAD = !1;
goog.userAgent.PLATFORM_KNOWN_ = goog.userAgent.ASSUME_MAC || goog.userAgent.ASSUME_WINDOWS || goog.userAgent.ASSUME_LINUX || goog.userAgent.ASSUME_X11 || goog.userAgent.ASSUME_ANDROID || goog.userAgent.ASSUME_IPHONE || goog.userAgent.ASSUME_IPAD;
goog.userAgent.MAC = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_MAC : goog.labs.userAgent.platform.isMacintosh();
goog.userAgent.WINDOWS = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_WINDOWS : goog.labs.userAgent.platform.isWindows();
goog.userAgent.isLegacyLinux_ = function() {
return goog.labs.userAgent.platform.isLinux() || goog.labs.userAgent.platform.isChromeOS();
};
goog.userAgent.LINUX = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_LINUX : goog.userAgent.isLegacyLinux_();
goog.userAgent.isX11_ = function() {
var e = goog.userAgent.getNavigator();
return !!e && goog.string.contains(e.appVersion || "", "X11");
};
goog.userAgent.X11 = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_X11 : goog.userAgent.isX11_();
goog.userAgent.ANDROID = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_ANDROID : goog.labs.userAgent.platform.isAndroid();
goog.userAgent.IPHONE = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPHONE : goog.labs.userAgent.platform.isIphone();
goog.userAgent.IPAD = goog.userAgent.PLATFORM_KNOWN_ ? goog.userAgent.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.operaVersion_ = function() {
var e = goog.global.opera.version;
try {
return e();
} catch (t) {
return e;
}
};
goog.userAgent.determineVersion_ = function() {
if (goog.userAgent.OPERA && goog.global.opera) return goog.userAgent.operaVersion_();
var e = "", t = goog.userAgent.getVersionRegexResult_();
t && (e = t ? t[1] : "");
return goog.userAgent.IE && (t = goog.userAgent.getDocumentMode_()) > parseFloat(e) ? String(t) : e;
};
goog.userAgent.getVersionRegexResult_ = function() {
var e = goog.userAgent.getUserAgentString();
return goog.userAgent.GECKO ? /rv\:([^\);]+)(\)|;)/.exec(e) : goog.userAgent.EDGE ? /Edge\/([\d\.]+)/.exec(e) : goog.userAgent.IE ? /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(e) : goog.userAgent.WEBKIT ? /WebKit\/(\S+)/.exec(e) : void 0;
};
goog.userAgent.getDocumentMode_ = function() {
var e = goog.global.document;
return e ? e.documentMode : void 0;
};
goog.userAgent.VERSION = goog.userAgent.determineVersion_();
goog.userAgent.compare = function(e, t) {
return goog.string.compareVersions(e, t);
};
goog.userAgent.isVersionOrHigherCache_ = {};
goog.userAgent.isVersionOrHigher = function(e) {
return goog.userAgent.ASSUME_ANY_VERSION || goog.userAgent.isVersionOrHigherCache_[e] || (goog.userAgent.isVersionOrHigherCache_[e] = 0 <= goog.string.compareVersions(goog.userAgent.VERSION, e));
};
goog.userAgent.isVersion = goog.userAgent.isVersionOrHigher;
goog.userAgent.isDocumentModeOrHigher = function(e) {
return Number(goog.userAgent.DOCUMENT_MODE) >= e;
};
goog.userAgent.isDocumentMode = goog.userAgent.isDocumentModeOrHigher;
goog.userAgent.DOCUMENT_MODE = function() {
var e = goog.global.document, t = goog.userAgent.getDocumentMode_();
return e && goog.userAgent.IE ? t || ("CSS1Compat" == e.compatMode ? parseInt(goog.userAgent.VERSION, 10) : 5) : void 0;
}();
goog.userAgent.product = {};
goog.userAgent.product.ASSUME_FIREFOX = !1;
goog.userAgent.product.ASSUME_IPHONE = !1;
goog.userAgent.product.ASSUME_IPAD = !1;
goog.userAgent.product.ASSUME_ANDROID = !1;
goog.userAgent.product.ASSUME_CHROME = !1;
goog.userAgent.product.ASSUME_SAFARI = !1;
goog.userAgent.product.PRODUCT_KNOWN_ = goog.userAgent.ASSUME_IE || goog.userAgent.ASSUME_EDGE || goog.userAgent.ASSUME_OPERA || goog.userAgent.product.ASSUME_FIREFOX || goog.userAgent.product.ASSUME_IPHONE || goog.userAgent.product.ASSUME_IPAD || goog.userAgent.product.ASSUME_ANDROID || goog.userAgent.product.ASSUME_CHROME || goog.userAgent.product.ASSUME_SAFARI;
goog.userAgent.product.OPERA = goog.userAgent.OPERA;
goog.userAgent.product.IE = goog.userAgent.IE;
goog.userAgent.product.EDGE = goog.userAgent.EDGE;
goog.userAgent.product.FIREFOX = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_FIREFOX : goog.labs.userAgent.browser.isFirefox();
goog.userAgent.product.isIphoneOrIpod_ = function() {
return goog.labs.userAgent.platform.isIphone() || goog.labs.userAgent.platform.isIpod();
};
goog.userAgent.product.IPHONE = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPHONE : goog.userAgent.product.isIphoneOrIpod_();
goog.userAgent.product.IPAD = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_IPAD : goog.labs.userAgent.platform.isIpad();
goog.userAgent.product.ANDROID = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_ANDROID : goog.labs.userAgent.browser.isAndroidBrowser();
goog.userAgent.product.CHROME = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_CHROME : goog.labs.userAgent.browser.isChrome();
goog.userAgent.product.isSafariDesktop_ = function() {
return goog.labs.userAgent.browser.isSafari() && !goog.labs.userAgent.platform.isIos();
};
goog.userAgent.product.SAFARI = goog.userAgent.product.PRODUCT_KNOWN_ ? goog.userAgent.product.ASSUME_SAFARI : goog.userAgent.product.isSafariDesktop_();
goog.crypt.base64 = {};
goog.crypt.base64.byteToCharMap_ = null;
goog.crypt.base64.charToByteMap_ = null;
goog.crypt.base64.byteToCharMapWebSafe_ = null;
goog.crypt.base64.ENCODED_VALS_BASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
goog.crypt.base64.ENCODED_VALS = goog.crypt.base64.ENCODED_VALS_BASE + "+/=";
goog.crypt.base64.ENCODED_VALS_WEBSAFE = goog.crypt.base64.ENCODED_VALS_BASE + "-_.";
goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ = goog.userAgent.GECKO || goog.userAgent.WEBKIT && !goog.userAgent.product.SAFARI || goog.userAgent.OPERA;
goog.crypt.base64.HAS_NATIVE_ENCODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || "function" == typeof goog.global.btoa;
goog.crypt.base64.HAS_NATIVE_DECODE_ = goog.crypt.base64.ASSUME_NATIVE_SUPPORT_ || !goog.userAgent.product.SAFARI && !goog.userAgent.IE && "function" == typeof goog.global.atob;
goog.crypt.base64.encodeByteArray = function(e, t) {
goog.asserts.assert(goog.isArrayLike(e), "encodeByteArray takes an array as a parameter");
goog.crypt.base64.init_();
for (var o = t ? goog.crypt.base64.byteToCharMapWebSafe_ : goog.crypt.base64.byteToCharMap_, s = [], r = 0; r < e.length; r += 3) {
var i = e[r], n = r + 1 < e.length, a = n ? e[r + 1] : 0, p = r + 2 < e.length, l = i >> 2, i = (3 & i) << 4 | a >> 4, a = (15 & a) << 2 | (u = p ? e[r + 2] : 0) >> 6, u = 63 & u;
p || (u = 64, n || (a = 64));
s.push(o[l], o[i], o[a], o[u]);
}
return s.join("");
};
goog.crypt.base64.encodeString = function(e, t) {
return goog.crypt.base64.HAS_NATIVE_ENCODE_ && !t ? goog.global.btoa(e) : goog.crypt.base64.encodeByteArray(goog.crypt.stringToByteArray(e), t);
};
goog.crypt.base64.decodeString = function(e, t) {
if (goog.crypt.base64.HAS_NATIVE_DECODE_ && !t) return goog.global.atob(e);
var o = "";
goog.crypt.base64.decodeStringInternal_(e, function(e) {
o += String.fromCharCode(e);
});
return o;
};
goog.crypt.base64.decodeStringToByteArray = function(e, t) {
var o = [];
goog.crypt.base64.decodeStringInternal_(e, function(e) {
o.push(e);
});
return o;
};
goog.crypt.base64.decodeStringToUint8Array = function(e) {
goog.asserts.assert(!goog.userAgent.IE || goog.userAgent.isVersionOrHigher("10"), "Browser does not support typed arrays");
var t = new Uint8Array(Math.ceil(3 * e.length / 4)), o = 0;
goog.crypt.base64.decodeStringInternal_(e, function(e) {
t[o++] = e;
});
return t.subarray(0, o);
};
goog.crypt.base64.decodeStringInternal_ = function(e, t) {
function o(t) {
for (;s < e.length; ) {
var o = e.charAt(s++), r = goog.crypt.base64.charToByteMap_[o];
if (null != r) return r;
if (!goog.string.isEmptyOrWhitespace(o)) throw Error("Unknown base64 encoding at char: " + o);
}
return t;
}
goog.crypt.base64.init_();
for (var s = 0; ;) {
var r = o(-1), i = o(0), n = o(64), a = o(64);
if (64 === a && -1 === r) break;
t(r << 2 | i >> 4);
64 != n && (t(i << 4 & 240 | n >> 2), 64 != a && t(n << 6 & 192 | a));
}
};
goog.crypt.base64.init_ = function() {
if (!goog.crypt.base64.byteToCharMap_) {
goog.crypt.base64.byteToCharMap_ = {};
goog.crypt.base64.charToByteMap_ = {};
goog.crypt.base64.byteToCharMapWebSafe_ = {};
for (var e = 0; e < goog.crypt.base64.ENCODED_VALS.length; e++) goog.crypt.base64.byteToCharMap_[e] = goog.crypt.base64.ENCODED_VALS.charAt(e), 
goog.crypt.base64.charToByteMap_[goog.crypt.base64.byteToCharMap_[e]] = e, goog.crypt.base64.byteToCharMapWebSafe_[e] = goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(e), 
e >= goog.crypt.base64.ENCODED_VALS_BASE.length && (goog.crypt.base64.charToByteMap_[goog.crypt.base64.ENCODED_VALS_WEBSAFE.charAt(e)] = e);
}
};
goog.json = {};
goog.json.USE_NATIVE_JSON = !1;
goog.json.isValid = function(e) {
return !/^\s*$/.test(e) && /^[\],:{}\s\u2028\u2029]*$/.test(e.replace(/\\["\\\/bfnrtu]/g, "@").replace(/(?:"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)[\s\u2028\u2029]*(?=:|,|]|}|$)/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, ""));
};
goog.json.parse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(a) {
a = String(a);
if (goog.json.isValid(a)) try {
return eval("(" + a + ")");
} catch (e) {}
throw Error("Invalid JSON string: " + a);
};
goog.json.unsafeParse = goog.json.USE_NATIVE_JSON ? goog.global.JSON.parse : function(a) {
return eval("(" + a + ")");
};
goog.json.serialize = goog.json.USE_NATIVE_JSON ? goog.global.JSON.stringify : function(e, t) {
return new goog.json.Serializer(t).serialize(e);
};
goog.json.Serializer = function(e) {
this.replacer_ = e;
};
goog.json.Serializer.prototype.serialize = function(e) {
var t = [];
this.serializeInternal(e, t);
return t.join("");
};
goog.json.Serializer.prototype.serializeInternal = function(e, t) {
if (null == e) t.push("null"); else {
if ("object" == ("undefined" == typeof e ? "undefined" : _typeof(e))) {
if (goog.isArray(e)) {
this.serializeArray(e, t);
return;
}
if (!(e instanceof String || e instanceof Number || e instanceof Boolean)) {
this.serializeObject_(e, t);
return;
}
e = e.valueOf();
}
switch ("undefined" == typeof e ? "undefined" : _typeof(e)) {
case "string":
this.serializeString_(e, t);
break;

case "number":
this.serializeNumber_(e, t);
break;

case "boolean":
t.push(String(e));
break;

case "function":
t.push("null");
break;

default:
throw Error("Unknown type: " + ("undefined" == typeof e ? "undefined" : _typeof(e)));
}
}
};
goog.json.Serializer.charToJsonCharCache_ = {
'"': '\\"',
"\\": "\\\\",
"/": "\\/",
"\b": "\\b",
"\f": "\\f",
"\n": "\\n",
"\r": "\\r",
"\t": "\\t",
"\v": "\\u000b"
};
goog.json.Serializer.charsToReplace_ = /\uffff/.test("￿") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
goog.json.Serializer.prototype.serializeString_ = function(e, t) {
t.push('"', e.replace(goog.json.Serializer.charsToReplace_, function(e) {
var t = goog.json.Serializer.charToJsonCharCache_[e];
t || (t = "\\u" + (65536 | e.charCodeAt(0)).toString(16).substr(1), goog.json.Serializer.charToJsonCharCache_[e] = t);
return t;
}), '"');
};
goog.json.Serializer.prototype.serializeNumber_ = function(e, t) {
t.push(isFinite(e) && !isNaN(e) ? String(e) : "null");
};
goog.json.Serializer.prototype.serializeArray = function(e, t) {
var o = e.length;
t.push("[");
for (var s = "", r = 0; r < o; r++) t.push(s), s = e[r], this.serializeInternal(this.replacer_ ? this.replacer_.call(e, String(r), s) : s, t), 
s = ",";
t.push("]");
};
goog.json.Serializer.prototype.serializeObject_ = function(e, t) {
t.push("{");
var o, s = "";
for (o in e) if (Object.prototype.hasOwnProperty.call(e, o)) {
var r = e[o];
"function" != typeof r && (t.push(s), this.serializeString_(o, t), t.push(":"), 
this.serializeInternal(this.replacer_ ? this.replacer_.call(e, o, r) : r, t), s = ",");
}
t.push("}");
};
var jspb = {
Map: function(e, t) {
this.arr_ = e;
this.valueCtor_ = t;
this.map_ = {};
this.arrClean = !0;
0 < this.arr_.length && this.loadFromArray_();
}
};
jspb.Map.prototype.loadFromArray_ = function() {
for (var e = 0; e < this.arr_.length; e++) {
var t = this.arr_[e], o = t[0];
this.map_[o.toString()] = new jspb.Map.Entry_(o, t[1]);
}
this.arrClean = !0;
};
jspb.Map.prototype.toArray = function() {
if (this.arrClean) {
if (this.valueCtor_) {
var e, t = this.map_;
for (e in t) if (Object.prototype.hasOwnProperty.call(t, e)) {
var o = t[e].valueWrapper;
o && o.toArray();
}
}
} else {
this.arr_.length = 0;
(t = this.stringKeys_()).sort();
for (e = 0; e < t.length; e++) {
var s = this.map_[t[e]];
(o = s.valueWrapper) && o.toArray();
this.arr_.push([ s.key, s.value ]);
}
this.arrClean = !0;
}
return this.arr_;
};
jspb.Map.prototype.toObject = function(e, t) {
for (var o = this.toArray(), s = [], r = 0; r < o.length; r++) {
var i = this.map_[o[r][0].toString()];
this.wrapEntry_(i);
var n = i.valueWrapper;
n ? (goog.asserts.assert(t), s.push([ i.key, t(e, n) ])) : s.push([ i.key, i.value ]);
}
return s;
};
jspb.Map.fromObject = function(e, t, o) {
t = new jspb.Map([], t);
for (var s = 0; s < e.length; s++) {
var r = e[s][0], i = o(e[s][1]);
t.set(r, i);
}
return t;
};
jspb.Map.ArrayIteratorIterable_ = function(e) {
this.idx_ = 0;
this.arr_ = e;
};
jspb.Map.ArrayIteratorIterable_.prototype.next = function() {
return this.idx_ < this.arr_.length ? {
done: !1,
value: this.arr_[this.idx_++]
} : {
done: !0,
value: void 0
};
};
$jscomp.initSymbol();
"undefined" != typeof Symbol && ($jscomp.initSymbol(), $jscomp.initSymbolIterator(), 
jspb.Map.ArrayIteratorIterable_.prototype[Symbol.iterator] = function() {
return this;
});
jspb.Map.prototype.getLength = function() {
return this.stringKeys_().length;
};
jspb.Map.prototype.clear = function() {
this.map_ = {};
this.arrClean = !1;
};
jspb.Map.prototype.del = function(e) {
e = e.toString();
var t = this.map_.hasOwnProperty(e);
delete this.map_[e];
this.arrClean = !1;
return t;
};
jspb.Map.prototype.getEntryList = function() {
var e = [], t = this.stringKeys_();
t.sort();
for (var o = 0; o < t.length; o++) {
var s = this.map_[t[o]];
e.push([ s.key, s.value ]);
}
return e;
};
jspb.Map.prototype.entries = function() {
var e = [], t = this.stringKeys_();
t.sort();
for (var o = 0; o < t.length; o++) {
var s = this.map_[t[o]];
e.push([ s.key, this.wrapEntry_(s) ]);
}
return new jspb.Map.ArrayIteratorIterable_(e);
};
jspb.Map.prototype.keys = function() {
var e = [], t = this.stringKeys_();
t.sort();
for (var o = 0; o < t.length; o++) e.push(this.map_[t[o]].key);
return new jspb.Map.ArrayIteratorIterable_(e);
};
jspb.Map.prototype.values = function() {
var e = [], t = this.stringKeys_();
t.sort();
for (var o = 0; o < t.length; o++) e.push(this.wrapEntry_(this.map_[t[o]]));
return new jspb.Map.ArrayIteratorIterable_(e);
};
jspb.Map.prototype.forEach = function(e, t) {
var o = this.stringKeys_();
o.sort();
for (var s = 0; s < o.length; s++) {
var r = this.map_[o[s]];
e.call(t, this.wrapEntry_(r), r.key, this);
}
};
jspb.Map.prototype.set = function(e, t) {
var o = new jspb.Map.Entry_(e);
this.valueCtor_ ? (o.valueWrapper = t, o.value = t.toArray()) : o.value = t;
this.map_[e.toString()] = o;
this.arrClean = !1;
return this;
};
jspb.Map.prototype.wrapEntry_ = function(e) {
return this.valueCtor_ ? (e.valueWrapper || (e.valueWrapper = new this.valueCtor_(e.value)), 
e.valueWrapper) : e.value;
};
jspb.Map.prototype.get = function(e) {
if (e = this.map_[e.toString()]) return this.wrapEntry_(e);
};
jspb.Map.prototype.has = function(e) {
return e.toString() in this.map_;
};
jspb.Map.prototype.serializeBinary = function(e, t, o, s, r) {
var i = this.stringKeys_();
i.sort();
for (var n = 0; n < i.length; n++) {
var a = this.map_[i[n]];
t.beginSubMessage(e);
o.call(t, 1, a.key);
this.valueCtor_ ? s.call(t, 2, this.wrapEntry_(a), r) : s.call(t, 2, a.value);
t.endSubMessage();
}
};
jspb.Map.deserializeBinary = function(e, t, o, s, r) {
for (var i = void 0, n = void 0; t.nextField() && !t.isEndGroup(); ) {
var a = t.getFieldNumber();
1 == a ? i = o.call(t) : 2 == a && (e.valueCtor_ ? (n = new e.valueCtor_(), s.call(t, n, r)) : n = s.call(t));
}
goog.asserts.assert(void 0 != i);
goog.asserts.assert(void 0 != n);
e.set(i, n);
};
jspb.Map.prototype.stringKeys_ = function() {
var e, t = this.map_, o = [];
for (e in t) Object.prototype.hasOwnProperty.call(t, e) && o.push(e);
return o;
};
jspb.Map.Entry_ = function(e, t) {
this.key = e;
this.value = t;
this.valueWrapper = void 0;
};
jspb.ExtensionFieldInfo = function(e, t, o, s, r) {
this.fieldIndex = e;
this.fieldName = t;
this.ctor = o;
this.toObjectFn = s;
this.isRepeated = r;
};
jspb.ExtensionFieldBinaryInfo = function(e, t, o, s, r, i) {
this.fieldInfo = e;
this.binaryReaderFn = t;
this.binaryWriterFn = o;
this.binaryMessageSerializeFn = s;
this.binaryMessageDeserializeFn = r;
this.isPacked = i;
};
jspb.ExtensionFieldInfo.prototype.isMessageType = function() {
return !!this.ctor;
};
jspb.Message = function() {};
jspb.Message.GENERATE_TO_OBJECT = !0;
jspb.Message.GENERATE_FROM_OBJECT = !goog.DISALLOW_TEST_ONLY_CODE;
jspb.Message.GENERATE_TO_STRING = !0;
jspb.Message.ASSUME_LOCAL_ARRAYS = !1;
jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS = COMPILED;
jspb.Message.SUPPORTS_UINT8ARRAY_ = "function" == typeof Uint8Array;
jspb.Message.prototype.getJsPbMessageId = function() {
return this.messageId_;
};
jspb.Message.getIndex_ = function(e, t) {
return t + e.arrayIndexOffset_;
};
jspb.Message.initialize = function(e, t, o, s, r, i) {
e.wrappers_ = jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? null : {};
t || (t = o ? [ o ] : []);
e.messageId_ = o ? String(o) : void 0;
e.arrayIndexOffset_ = 0 === o ? -1 : 0;
e.array = t;
jspb.Message.materializeExtensionObject_(e, s);
e.convertedFloatingPointFields_ = {};
if (r) for (t = 0; t < r.length; t++) (o = r[t]) < e.pivot_ ? (o = jspb.Message.getIndex_(e, o), 
e.array[o] = e.array[o] || (jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? jspb.Message.EMPTY_LIST_SENTINEL_ : [])) : e.extensionObject_[o] = e.extensionObject_[o] || (jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? jspb.Message.EMPTY_LIST_SENTINEL_ : []);
i && i.length && goog.array.forEach(i, goog.partial(jspb.Message.computeOneofCase, e));
};
jspb.Message.EMPTY_LIST_SENTINEL_ = goog.DEBUG && Object.freeze ? Object.freeze([]) : [];
jspb.Message.isArray_ = function(e) {
return jspb.Message.ASSUME_LOCAL_ARRAYS ? e instanceof Array : goog.isArray(e);
};
jspb.Message.materializeExtensionObject_ = function(e, t) {
if (e.array.length) {
var o = e.array.length - 1, s = e.array[o];
if (s && "object" == ("undefined" == typeof s ? "undefined" : _typeof(s)) && !jspb.Message.isArray_(s) && !(jspb.Message.SUPPORTS_UINT8ARRAY_ && s instanceof Uint8Array)) {
e.pivot_ = o - e.arrayIndexOffset_;
e.extensionObject_ = s;
return;
}
}
-1 < t ? (e.pivot_ = t, o = jspb.Message.getIndex_(e, t), e.extensionObject_ = jspb.Message.MINIMIZE_MEMORY_ALLOCATIONS ? null : e.array[o] = {}) : e.pivot_ = Number.MAX_VALUE;
};
jspb.Message.maybeInitEmptyExtensionObject_ = function(e) {
var t = jspb.Message.getIndex_(e, e.pivot_);
e.array[t] || (e.extensionObject_ = e.array[t] = {});
};
jspb.Message.toObjectList = function(e, t, o) {
for (var s = [], r = 0; r < e.length; r++) s[r] = t.call(e[r], o, e[r]);
return s;
};
jspb.Message.toObjectExtension = function(e, t, o, s, r) {
for (var i in o) {
var n = o[i], a = s.call(e, n);
if (a) {
for (var p in n.fieldName) if (n.fieldName.hasOwnProperty(p)) break;
t[p] = n.toObjectFn ? n.isRepeated ? jspb.Message.toObjectList(a, n.toObjectFn, r) : n.toObjectFn(r, a) : a;
}
}
};
jspb.Message.serializeBinaryExtensions = function(e, t, o, s) {
for (var r in o) {
var i = o[r], n = i.fieldInfo;
if (!i.binaryWriterFn) throw Error("Message extension present that was generated without binary serialization support");
var a = s.call(e, n);
if (a) if (n.isMessageType()) {
if (!i.binaryMessageSerializeFn) throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");
i.binaryWriterFn.call(t, n.fieldIndex, a, i.binaryMessageSerializeFn);
} else i.binaryWriterFn.call(t, n.fieldIndex, a);
}
};
jspb.Message.readBinaryExtension = function(e, t, o, s, r) {
var i = o[t.getFieldNumber()];
if (i) {
o = i.fieldInfo;
if (!i.binaryReaderFn) throw Error("Deserializing extension whose generated code does not support binary format");
var n;
o.isMessageType() ? (n = new o.ctor(), i.binaryReaderFn.call(t, n, i.binaryMessageDeserializeFn)) : n = i.binaryReaderFn.call(t);
o.isRepeated && !i.isPacked ? (t = s.call(e, o)) ? t.push(n) : r.call(e, o, [ n ]) : r.call(e, o, n);
} else t.skipField();
};
jspb.Message.getField = function(e, t) {
if (t < e.pivot_) {
var o = jspb.Message.getIndex_(e, t), s = e.array[o];
return s === jspb.Message.EMPTY_LIST_SENTINEL_ ? e.array[o] = [] : s;
}
return (s = e.extensionObject_[t]) === jspb.Message.EMPTY_LIST_SENTINEL_ ? e.extensionObject_[t] = [] : s;
};
jspb.Message.getOptionalFloatingPointField = function(e, t) {
var o = jspb.Message.getField(e, t);
return null == o ? o : +o;
};
jspb.Message.getRepeatedFloatingPointField = function(e, t) {
var o = jspb.Message.getField(e, t);
e.convertedFloatingPointFields_ || (e.convertedFloatingPointFields_ = {});
if (!e.convertedFloatingPointFields_[t]) {
for (var s = 0; s < o.length; s++) o[s] = +o[s];
e.convertedFloatingPointFields_[t] = !0;
}
return o;
};
jspb.Message.bytesAsB64 = function(e) {
if (null == e || goog.isString(e)) return e;
if (jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array) return goog.crypt.base64.encodeByteArray(e);
goog.asserts.fail("Cannot coerce to b64 string: " + goog.typeOf(e));
return null;
};
jspb.Message.bytesAsU8 = function(e) {
if (null == e || e instanceof Uint8Array) return e;
if (goog.isString(e)) return goog.crypt.base64.decodeStringToUint8Array(e);
goog.asserts.fail("Cannot coerce to Uint8Array: " + goog.typeOf(e));
return null;
};
jspb.Message.bytesListAsB64 = function(e) {
jspb.Message.assertConsistentTypes_(e);
return !e.length || goog.isString(e[0]) ? e : goog.array.map(e, jspb.Message.bytesAsB64);
};
jspb.Message.bytesListAsU8 = function(e) {
jspb.Message.assertConsistentTypes_(e);
return !e.length || e[0] instanceof Uint8Array ? e : goog.array.map(e, jspb.Message.bytesAsU8);
};
jspb.Message.assertConsistentTypes_ = function(e) {
if (goog.DEBUG && e && 1 < e.length) {
var t = goog.typeOf(e[0]);
goog.array.forEach(e, function(e) {
goog.typeOf(e) != t && goog.asserts.fail("Inconsistent type in JSPB repeated field array. Got " + goog.typeOf(e) + " expected " + t);
});
}
};
jspb.Message.getFieldWithDefault = function(e, t, o) {
return null == (e = jspb.Message.getField(e, t)) ? o : e;
};
jspb.Message.getFieldProto3 = jspb.Message.getFieldWithDefault;
jspb.Message.getMapField = function(e, t, o, s) {
e.wrappers_ || (e.wrappers_ = {});
return t in e.wrappers_ ? e.wrappers_[t] : o ? void 0 : ((o = jspb.Message.getField(e, t)) || (o = [], 
jspb.Message.setField(e, t, o)), e.wrappers_[t] = new jspb.Map(o, s));
};
jspb.Message.setField = function(e, t, o) {
t < e.pivot_ ? e.array[jspb.Message.getIndex_(e, t)] = o : e.extensionObject_[t] = o;
};
jspb.Message.addToRepeatedField = function(e, t, o, s) {
e = jspb.Message.getField(e, t);
void 0 != s ? e.splice(s, 0, o) : e.push(o);
};
jspb.Message.setOneofField = function(e, t, o, s) {
(o = jspb.Message.computeOneofCase(e, o)) && o !== t && void 0 !== s && (e.wrappers_ && o in e.wrappers_ && (e.wrappers_[o] = void 0), 
jspb.Message.setField(e, o, void 0));
jspb.Message.setField(e, t, s);
};
jspb.Message.computeOneofCase = function(e, t) {
var o, s;
goog.array.forEach(t, function(t) {
var r = jspb.Message.getField(e, t);
goog.isDefAndNotNull(r) && (o = t, s = r, jspb.Message.setField(e, t, void 0));
});
return o ? (jspb.Message.setField(e, o, s), o) : 0;
};
jspb.Message.getWrapperField = function(e, t, o, s) {
e.wrappers_ || (e.wrappers_ = {});
if (!e.wrappers_[o]) {
var r = jspb.Message.getField(e, o);
(s || r) && (e.wrappers_[o] = new t(r));
}
return e.wrappers_[o];
};
jspb.Message.getRepeatedWrapperField = function(e, t, o) {
jspb.Message.wrapRepeatedField_(e, t, o);
(t = e.wrappers_[o]) == jspb.Message.EMPTY_LIST_SENTINEL_ && (t = e.wrappers_[o] = []);
return t;
};
jspb.Message.wrapRepeatedField_ = function(e, t, o) {
e.wrappers_ || (e.wrappers_ = {});
if (!e.wrappers_[o]) {
for (var s = jspb.Message.getField(e, o), r = [], i = 0; i < s.length; i++) r[i] = new t(s[i]);
e.wrappers_[o] = r;
}
};
jspb.Message.setWrapperField = function(e, t, o) {
e.wrappers_ || (e.wrappers_ = {});
var s = o ? o.toArray() : o;
e.wrappers_[t] = o;
jspb.Message.setField(e, t, s);
};
jspb.Message.setOneofWrapperField = function(e, t, o, s) {
e.wrappers_ || (e.wrappers_ = {});
var r = s ? s.toArray() : s;
e.wrappers_[t] = s;
jspb.Message.setOneofField(e, t, o, r);
};
jspb.Message.setRepeatedWrapperField = function(e, t, o) {
e.wrappers_ || (e.wrappers_ = {});
o = o || [];
for (var s = [], r = 0; r < o.length; r++) s[r] = o[r].toArray();
e.wrappers_[t] = o;
jspb.Message.setField(e, t, s);
};
jspb.Message.addToRepeatedWrapperField = function(e, t, o, s, r) {
jspb.Message.wrapRepeatedField_(e, s, t);
var i = e.wrappers_[t];
i || (i = e.wrappers_[t] = []);
o = o || new s();
e = jspb.Message.getField(e, t);
void 0 != r ? (i.splice(r, 0, o), e.splice(r, 0, o.toArray())) : (i.push(o), e.push(o.toArray()));
return o;
};
jspb.Message.toMap = function(e, t, o, s) {
for (var r = {}, i = 0; i < e.length; i++) r[t.call(e[i])] = o ? o.call(e[i], s, e[i]) : e[i];
return r;
};
jspb.Message.prototype.syncMapFields_ = function() {
if (this.wrappers_) for (var e in this.wrappers_) {
var t = this.wrappers_[e];
if (goog.isArray(t)) for (var o = 0; o < t.length; o++) t[o] && t[o].toArray(); else t && t.toArray();
}
};
jspb.Message.prototype.toArray = function() {
this.syncMapFields_();
return this.array;
};
jspb.Message.GENERATE_TO_STRING && (jspb.Message.prototype.toString = function() {
this.syncMapFields_();
return this.array.toString();
});
jspb.Message.prototype.getExtension = function(e) {
if (this.extensionObject_) {
this.wrappers_ || (this.wrappers_ = {});
var t = e.fieldIndex;
if (e.isRepeated) {
if (e.isMessageType()) return this.wrappers_[t] || (this.wrappers_[t] = goog.array.map(this.extensionObject_[t] || [], function(t) {
return new e.ctor(t);
})), this.wrappers_[t];
} else if (e.isMessageType()) return !this.wrappers_[t] && this.extensionObject_[t] && (this.wrappers_[t] = new e.ctor(this.extensionObject_[t])), 
this.wrappers_[t];
return this.extensionObject_[t];
}
};
jspb.Message.prototype.setExtension = function(e, t) {
this.wrappers_ || (this.wrappers_ = {});
jspb.Message.maybeInitEmptyExtensionObject_(this);
var o = e.fieldIndex;
e.isRepeated ? (t = t || [], e.isMessageType() ? (this.wrappers_[o] = t, this.extensionObject_[o] = goog.array.map(t, function(e) {
return e.toArray();
})) : this.extensionObject_[o] = t) : e.isMessageType() ? (this.wrappers_[o] = t, 
this.extensionObject_[o] = t ? t.toArray() : t) : this.extensionObject_[o] = t;
return this;
};
jspb.Message.difference = function(e, t) {
if (!(e instanceof t.constructor)) throw Error("Messages have different types.");
var o = e.toArray(), s = t.toArray(), r = [], i = 0, n = o.length > s.length ? o.length : s.length;
e.getJsPbMessageId() && (r[0] = e.getJsPbMessageId(), i = 1);
for (;i < n; i++) jspb.Message.compareFields(o[i], s[i]) || (r[i] = s[i]);
return new e.constructor(r);
};
jspb.Message.equals = function(e, t) {
return e == t || !(!e || !t) && e instanceof t.constructor && jspb.Message.compareFields(e.toArray(), t.toArray());
};
jspb.Message.compareExtensions = function(e, t) {
e = e || {};
t = t || {};
var o, s = {};
for (o in e) s[o] = 0;
for (o in t) s[o] = 0;
for (o in s) if (!jspb.Message.compareFields(e[o], t[o])) return !1;
return !0;
};
jspb.Message.compareFields = function(e, t) {
if (e == t) return !0;
if (!goog.isObject(e) || !goog.isObject(t) || e.constructor != t.constructor) return !1;
if (jspb.Message.SUPPORTS_UINT8ARRAY_ && e.constructor === Uint8Array) {
if (e.length != t.length) return !1;
for (i = 0; i < e.length; i++) if (e[i] != t[i]) return !1;
return !0;
}
if (e.constructor === Array) {
for (var o = void 0, s = void 0, r = Math.max(e.length, t.length), i = 0; i < r; i++) {
var n = e[i], a = t[i];
n && n.constructor == Object && (goog.asserts.assert(void 0 === o), goog.asserts.assert(i === e.length - 1), 
o = n, n = void 0);
a && a.constructor == Object && (goog.asserts.assert(void 0 === s), goog.asserts.assert(i === t.length - 1), 
s = a, a = void 0);
if (!jspb.Message.compareFields(n, a)) return !1;
}
return !o && !s || (o = o || {}, s = s || {}, jspb.Message.compareExtensions(o, s));
}
if (e.constructor === Object) return jspb.Message.compareExtensions(e, t);
throw Error("Invalid type in JSPB array");
};
jspb.Message.prototype.cloneMessage = function() {
return jspb.Message.cloneMessage(this);
};
jspb.Message.prototype.clone = function() {
return jspb.Message.cloneMessage(this);
};
jspb.Message.clone = function(e) {
return jspb.Message.cloneMessage(e);
};
jspb.Message.cloneMessage = function(e) {
return new e.constructor(jspb.Message.clone_(e.toArray()));
};
jspb.Message.copyInto = function(e, t) {
goog.asserts.assertInstanceof(e, jspb.Message);
goog.asserts.assertInstanceof(t, jspb.Message);
goog.asserts.assert(e.constructor == t.constructor, "Copy source and target message should have the same type.");
for (var o = jspb.Message.clone(e), s = t.toArray(), r = o.toArray(), i = s.length = 0; i < r.length; i++) s[i] = r[i];
t.wrappers_ = o.wrappers_;
t.extensionObject_ = o.extensionObject_;
};
jspb.Message.clone_ = function(e) {
var t;
if (goog.isArray(e)) {
for (var o = Array(e.length), s = 0; s < e.length; s++) null != (t = e[s]) && (o[s] = "object" == ("undefined" == typeof t ? "undefined" : _typeof(t)) ? jspb.Message.clone_(t) : t);
return o;
}
if (jspb.Message.SUPPORTS_UINT8ARRAY_ && e instanceof Uint8Array) return new Uint8Array(e);
o = {};
for (s in e) null != (t = e[s]) && (o[s] = "object" == ("undefined" == typeof t ? "undefined" : _typeof(t)) ? jspb.Message.clone_(t) : t);
return o;
};
jspb.Message.registerMessageType = function(e, t) {
jspb.Message.registry_[e] = t;
t.messageId = e;
};
jspb.Message.registry_ = {};
jspb.Message.messageSetExtensions = {};
jspb.Message.messageSetExtensionsBinary = {};
jspb.BinaryConstants = {};
jspb.ConstBinaryMessage = function() {};
jspb.BinaryMessage = function() {};
jspb.BinaryConstants.FieldType = {
INVALID: -1,
DOUBLE: 1,
FLOAT: 2,
INT64: 3,
UINT64: 4,
INT32: 5,
FIXED64: 6,
FIXED32: 7,
BOOL: 8,
STRING: 9,
GROUP: 10,
MESSAGE: 11,
BYTES: 12,
UINT32: 13,
ENUM: 14,
SFIXED32: 15,
SFIXED64: 16,
SINT32: 17,
SINT64: 18,
FHASH64: 30,
VHASH64: 31
};
jspb.BinaryConstants.WireType = {
INVALID: -1,
VARINT: 0,
FIXED64: 1,
DELIMITED: 2,
START_GROUP: 3,
END_GROUP: 4,
FIXED32: 5
};
jspb.BinaryConstants.FieldTypeToWireType = function(e) {
var t = jspb.BinaryConstants.FieldType, o = jspb.BinaryConstants.WireType;
switch (e) {
case t.INT32:
case t.INT64:
case t.UINT32:
case t.UINT64:
case t.SINT32:
case t.SINT64:
case t.BOOL:
case t.ENUM:
case t.VHASH64:
return o.VARINT;

case t.DOUBLE:
case t.FIXED64:
case t.SFIXED64:
case t.FHASH64:
return o.FIXED64;

case t.STRING:
case t.MESSAGE:
case t.BYTES:
return o.DELIMITED;

case t.FLOAT:
case t.FIXED32:
case t.SFIXED32:
return o.FIXED32;

default:
return o.INVALID;
}
};
jspb.BinaryConstants.INVALID_FIELD_NUMBER = -1;
jspb.BinaryConstants.FLOAT32_EPS = 1.401298464324817e-45;
jspb.BinaryConstants.FLOAT32_MIN = 1.1754943508222875e-38;
jspb.BinaryConstants.FLOAT32_MAX = 3.4028234663852886e38;
jspb.BinaryConstants.FLOAT64_EPS = 5e-324;
jspb.BinaryConstants.FLOAT64_MIN = 2.2250738585072014e-308;
jspb.BinaryConstants.FLOAT64_MAX = 1.7976931348623157e308;
jspb.BinaryConstants.TWO_TO_20 = 1048576;
jspb.BinaryConstants.TWO_TO_23 = 8388608;
jspb.BinaryConstants.TWO_TO_31 = 2147483648;
jspb.BinaryConstants.TWO_TO_32 = 4294967296;
jspb.BinaryConstants.TWO_TO_52 = 4503599627370496;
jspb.BinaryConstants.TWO_TO_63 = 0x8000000000000000;
jspb.BinaryConstants.TWO_TO_64 = 0x10000000000000000;
jspb.BinaryConstants.ZERO_HASH = "\0\0\0\0\0\0\0\0";
jspb.utils = {};
jspb.utils.split64Low = 0;
jspb.utils.split64High = 0;
jspb.utils.splitUint64 = function(e) {
var t = e >>> 0;
e = Math.floor((e - t) / jspb.BinaryConstants.TWO_TO_32) >>> 0;
jspb.utils.split64Low = t;
jspb.utils.split64High = e;
};
jspb.utils.splitInt64 = function(e) {
var t = 0 > e, o = (e = Math.abs(e)) >>> 0;
e = Math.floor((e - o) / jspb.BinaryConstants.TWO_TO_32);
e >>>= 0;
t && (e = ~e >>> 0, 4294967295 < (o = 1 + (~o >>> 0)) && (o = 0, 4294967295 < ++e && (e = 0)));
jspb.utils.split64Low = o;
jspb.utils.split64High = e;
};
jspb.utils.splitZigzag64 = function(e) {
var t = 0 > e;
e = 2 * Math.abs(e);
jspb.utils.splitUint64(e);
e = jspb.utils.split64Low;
var o = jspb.utils.split64High;
t && (0 == e ? 0 == o ? o = e = 4294967295 : (o--, e = 4294967295) : e--);
jspb.utils.split64Low = e;
jspb.utils.split64High = o;
};
jspb.utils.splitFloat32 = function(e) {
var t, o = 0 > e ? 1 : 0;
0 === (e = o ? -e : e) ? 0 < 1 / e ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 0) : (jspb.utils.split64High = 0, 
jspb.utils.split64Low = 2147483648) : isNaN(e) ? (jspb.utils.split64High = 0, jspb.utils.split64Low = 2147483647) : e > jspb.BinaryConstants.FLOAT32_MAX ? (jspb.utils.split64High = 0, 
jspb.utils.split64Low = (o << 31 | 2139095040) >>> 0) : e < jspb.BinaryConstants.FLOAT32_MIN ? (e = Math.round(e / Math.pow(2, -149)), 
jspb.utils.split64High = 0, jspb.utils.split64Low = (o << 31 | e) >>> 0) : (t = Math.floor(Math.log(e) / Math.LN2), 
e *= Math.pow(2, -t), e = 8388607 & Math.round(e * jspb.BinaryConstants.TWO_TO_23), 
jspb.utils.split64High = 0, jspb.utils.split64Low = (o << 31 | t + 127 << 23 | e) >>> 0);
};
jspb.utils.splitFloat64 = function(e) {
var t = 0 > e ? 1 : 0;
if (0 === (e = t ? -e : e)) jspb.utils.split64High = 0 < 1 / e ? 0 : 2147483648, 
jspb.utils.split64Low = 0; else if (isNaN(e)) jspb.utils.split64High = 2147483647, 
jspb.utils.split64Low = 4294967295; else if (e > jspb.BinaryConstants.FLOAT64_MAX) jspb.utils.split64High = (t << 31 | 2146435072) >>> 0, 
jspb.utils.split64Low = 0; else if (e < jspb.BinaryConstants.FLOAT64_MIN) {
var o = e / Math.pow(2, -1074);
e = o / jspb.BinaryConstants.TWO_TO_32;
jspb.utils.split64High = (t << 31 | e) >>> 0;
jspb.utils.split64Low = o >>> 0;
} else {
var s = Math.floor(Math.log(e) / Math.LN2);
1024 == s && (s = 1023);
e = (o = e * Math.pow(2, -s)) * jspb.BinaryConstants.TWO_TO_20 & 1048575;
o = o * jspb.BinaryConstants.TWO_TO_52 >>> 0;
jspb.utils.split64High = (t << 31 | s + 1023 << 20 | e) >>> 0;
jspb.utils.split64Low = o;
}
};
jspb.utils.splitHash64 = function(e) {
var t = e.charCodeAt(0), o = e.charCodeAt(1), s = e.charCodeAt(2), r = e.charCodeAt(3), i = e.charCodeAt(4), n = e.charCodeAt(5), a = e.charCodeAt(6);
e = e.charCodeAt(7);
jspb.utils.split64Low = t + (o << 8) + (s << 16) + (r << 24) >>> 0;
jspb.utils.split64High = i + (n << 8) + (a << 16) + (e << 24) >>> 0;
};
jspb.utils.joinUint64 = function(e, t) {
return t * jspb.BinaryConstants.TWO_TO_32 + e;
};
jspb.utils.joinInt64 = function(e, t) {
var o = 2147483648 & t;
o && (e = 1 + ~e >>> 0, t = ~t >>> 0, 0 == e && (t = t + 1 >>> 0));
var s = jspb.utils.joinUint64(e, t);
return o ? -s : s;
};
jspb.utils.joinZigzag64 = function(e, t) {
var o = 1 & e;
e = (e >>> 1 | t << 31) >>> 0;
t >>>= 1;
o && 0 == (e = e + 1 >>> 0) && (t = t + 1 >>> 0);
var s = jspb.utils.joinUint64(e, t);
return o ? -s : s;
};
jspb.utils.joinFloat32 = function(e, t) {
var o = 2 * (e >> 31) + 1, s = e >>> 23 & 255, r = 8388607 & e;
return 255 == s ? r ? NaN : Infinity * o : 0 == s ? o * Math.pow(2, -149) * r : o * Math.pow(2, s - 150) * (r + Math.pow(2, 23));
};
jspb.utils.joinFloat64 = function(e, t) {
var o = 2 * (t >> 31) + 1, s = t >>> 20 & 2047, r = jspb.BinaryConstants.TWO_TO_32 * (1048575 & t) + e;
return 2047 == s ? r ? NaN : Infinity * o : 0 == s ? o * Math.pow(2, -1074) * r : o * Math.pow(2, s - 1075) * (r + jspb.BinaryConstants.TWO_TO_52);
};
jspb.utils.joinHash64 = function(e, t) {
return String.fromCharCode(e >>> 0 & 255, e >>> 8 & 255, e >>> 16 & 255, e >>> 24 & 255, t >>> 0 & 255, t >>> 8 & 255, t >>> 16 & 255, t >>> 24 & 255);
};
jspb.utils.DIGITS = "0123456789abcdef".split("");
jspb.utils.joinUnsignedDecimalString = function(e, t) {
function o(e) {
for (var t = 1e7, o = 0; 7 > o; o++) {
var s = e / (t = t / 10) % 10 >>> 0;
(0 != s || a) && (a = !0, p += n[s]);
}
}
if (2097151 >= t) return "" + (jspb.BinaryConstants.TWO_TO_32 * t + e);
var s = (16777215 & e) + 6777216 * (r = (e >>> 24 | t << 8) >>> 0 & 16777215) + 6710656 * (i = t >> 16 & 65535), r = r + 8147497 * i, i = 2 * i;
1e7 <= s && (r += Math.floor(s / 1e7), s %= 1e7);
1e7 <= r && (i += Math.floor(r / 1e7), r %= 1e7);
var n = jspb.utils.DIGITS, a = !1, p = "";
(i || a) && o(i);
(r || a) && o(r);
(s || a) && o(s);
return p;
};
jspb.utils.joinSignedDecimalString = function(e, t) {
var o = 2147483648 & t;
o && (e = 1 + ~e >>> 0, t = ~t + (0 == e ? 1 : 0) >>> 0);
var s = jspb.utils.joinUnsignedDecimalString(e, t);
return o ? "-" + s : s;
};
jspb.utils.hash64ToDecimalString = function(e, t) {
jspb.utils.splitHash64(e);
var o = jspb.utils.split64Low, s = jspb.utils.split64High;
return t ? jspb.utils.joinSignedDecimalString(o, s) : jspb.utils.joinUnsignedDecimalString(o, s);
};
jspb.utils.hash64ArrayToDecimalStrings = function(e, t) {
for (var o = Array(e.length), s = 0; s < e.length; s++) o[s] = jspb.utils.hash64ToDecimalString(e[s], t);
return o;
};
jspb.utils.decimalStringToHash64 = function(e) {
function t(e, t) {
for (var o = 0; 8 > o && (1 !== e || 0 < t); o++) {
var r = e * s[o] + t;
s[o] = 255 & r;
t = r >>> 8;
}
}
goog.asserts.assert(0 < e.length);
var o = !1;
"-" === e[0] && (o = !0, e = e.slice(1));
for (var s = [ 0, 0, 0, 0, 0, 0, 0, 0 ], r = 0; r < e.length; r++) t(10, jspb.utils.DIGITS.indexOf(e[r]));
o && (function() {
for (var e = 0; 8 > e; e++) s[e] = 255 & ~s[e];
}(), t(1, 1));
return String.fromCharCode.apply(null, s);
};
jspb.utils.splitDecimalString = function(e) {
jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(e));
};
jspb.utils.hash64ToHexString = function(e) {
var t = Array(18);
t[0] = "0";
t[1] = "x";
for (var o = 0; 8 > o; o++) {
var s = e.charCodeAt(7 - o);
t[2 * o + 2] = jspb.utils.DIGITS[s >> 4];
t[2 * o + 3] = jspb.utils.DIGITS[15 & s];
}
return t.join("");
};
jspb.utils.hexStringToHash64 = function(e) {
e = e.toLowerCase();
goog.asserts.assert(18 == e.length);
goog.asserts.assert("0" == e[0]);
goog.asserts.assert("x" == e[1]);
for (var t = "", o = 0; 8 > o; o++) var s = jspb.utils.DIGITS.indexOf(e[2 * o + 2]), r = jspb.utils.DIGITS.indexOf(e[2 * o + 3]), t = String.fromCharCode(16 * s + r) + t;
return t;
};
jspb.utils.hash64ToNumber = function(e, t) {
jspb.utils.splitHash64(e);
var o = jspb.utils.split64Low, s = jspb.utils.split64High;
return t ? jspb.utils.joinInt64(o, s) : jspb.utils.joinUint64(o, s);
};
jspb.utils.numberToHash64 = function(e) {
jspb.utils.splitInt64(e);
return jspb.utils.joinHash64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.utils.countVarints = function(e, t, o) {
for (var s = 0, r = t; r < o; r++) s += e[r] >> 7;
return o - t - s;
};
jspb.utils.countVarintFields = function(e, t, o, s) {
var r = 0;
if (128 > (s = 8 * s + jspb.BinaryConstants.WireType.VARINT)) for (;t < o && e[t++] == s; ) for (r++; ;) {
var i = e[t++];
if (0 == (128 & i)) break;
} else for (;t < o; ) {
for (i = s; 128 < i; ) {
if (e[t] != (127 & i | 128)) return r;
t++;
i >>= 7;
}
if (e[t++] != i) break;
for (r++; 0 != (128 & (i = e[t++])); ) ;
}
return r;
};
jspb.utils.countFixedFields_ = function(e, t, o, s, r) {
var i = 0;
if (128 > s) for (;t < o && e[t++] == s; ) i++, t += r; else for (;t < o; ) {
for (var n = s; 128 < n; ) {
if (e[t++] != (127 & n | 128)) return i;
n >>= 7;
}
if (e[t++] != n) break;
i++;
t += r;
}
return i;
};
jspb.utils.countFixed32Fields = function(e, t, o, s) {
return jspb.utils.countFixedFields_(e, t, o, 8 * s + jspb.BinaryConstants.WireType.FIXED32, 4);
};
jspb.utils.countFixed64Fields = function(e, t, o, s) {
return jspb.utils.countFixedFields_(e, t, o, 8 * s + jspb.BinaryConstants.WireType.FIXED64, 8);
};
jspb.utils.countDelimitedFields = function(e, t, o, s) {
var r = 0;
for (s = 8 * s + jspb.BinaryConstants.WireType.DELIMITED; t < o; ) {
for (var i = s; 128 < i; ) {
if (e[t++] != (127 & i | 128)) return r;
i >>= 7;
}
if (e[t++] != i) break;
r++;
for (var n = 0, a = 1; i = e[t++], n += (127 & i) * a, a *= 128, 0 != (128 & i); ) ;
t += n;
}
return r;
};
jspb.utils.debugBytesToTextFormat = function(e) {
var t = '"';
if (e) {
e = jspb.utils.byteSourceToUint8Array(e);
for (var o = 0; o < e.length; o++) t += "\\x", 16 > e[o] && (t += "0"), t += e[o].toString(16);
}
return t + '"';
};
jspb.utils.debugScalarToTextFormat = function(e) {
return goog.isString(e) ? goog.string.quote(e) : e.toString();
};
jspb.utils.stringToByteArray = function(e) {
for (var t = new Uint8Array(e.length), o = 0; o < e.length; o++) {
var s = e.charCodeAt(o);
if (255 < s) throw Error("Conversion error: string contains codepoint outside of byte range");
t[o] = s;
}
return t;
};
jspb.utils.byteSourceToUint8Array = function(e) {
if (e.constructor === Uint8Array) return e;
if (e.constructor === ArrayBuffer || e.constructor === Array) return new Uint8Array(e);
if (e.constructor === String) return goog.crypt.base64.decodeStringToUint8Array(e);
goog.asserts.fail("Type not convertible to Uint8Array.");
return new Uint8Array(0);
};
jspb.BinaryIterator = function(e, t, o) {
this.elements_ = this.nextMethod_ = this.decoder_ = null;
this.cursor_ = 0;
this.nextValue_ = null;
this.atEnd_ = !0;
this.init_(e, t, o);
};
jspb.BinaryIterator.prototype.init_ = function(e, t, o) {
e && t && (this.decoder_ = e, this.nextMethod_ = t);
this.elements_ = o || null;
this.cursor_ = 0;
this.nextValue_ = null;
this.atEnd_ = !this.decoder_ && !this.elements_;
this.next();
};
jspb.BinaryIterator.instanceCache_ = [];
jspb.BinaryIterator.alloc = function(e, t, o) {
if (jspb.BinaryIterator.instanceCache_.length) {
var s = jspb.BinaryIterator.instanceCache_.pop();
s.init_(e, t, o);
return s;
}
return new jspb.BinaryIterator(e, t, o);
};
jspb.BinaryIterator.prototype.free = function() {
this.clear();
100 > jspb.BinaryIterator.instanceCache_.length && jspb.BinaryIterator.instanceCache_.push(this);
};
jspb.BinaryIterator.prototype.clear = function() {
this.decoder_ && this.decoder_.free();
this.elements_ = this.nextMethod_ = this.decoder_ = null;
this.cursor_ = 0;
this.nextValue_ = null;
this.atEnd_ = !0;
};
jspb.BinaryIterator.prototype.get = function() {
return this.nextValue_;
};
jspb.BinaryIterator.prototype.atEnd = function() {
return this.atEnd_;
};
jspb.BinaryIterator.prototype.next = function() {
var e = this.nextValue_;
this.decoder_ ? this.decoder_.atEnd() ? (this.nextValue_ = null, this.atEnd_ = !0) : this.nextValue_ = this.nextMethod_.call(this.decoder_) : this.elements_ && (this.cursor_ == this.elements_.length ? (this.nextValue_ = null, 
this.atEnd_ = !0) : this.nextValue_ = this.elements_[this.cursor_++]);
return e;
};
jspb.BinaryDecoder = function(e, t, o) {
this.bytes_ = null;
this.tempHigh_ = this.tempLow_ = this.cursor_ = this.end_ = this.start_ = 0;
this.error_ = !1;
e && this.setBlock(e, t, o);
};
jspb.BinaryDecoder.instanceCache_ = [];
jspb.BinaryDecoder.alloc = function(e, t, o) {
if (jspb.BinaryDecoder.instanceCache_.length) {
var s = jspb.BinaryDecoder.instanceCache_.pop();
e && s.setBlock(e, t, o);
return s;
}
return new jspb.BinaryDecoder(e, t, o);
};
jspb.BinaryDecoder.prototype.free = function() {
this.clear();
100 > jspb.BinaryDecoder.instanceCache_.length && jspb.BinaryDecoder.instanceCache_.push(this);
};
jspb.BinaryDecoder.prototype.clone = function() {
return jspb.BinaryDecoder.alloc(this.bytes_, this.start_, this.end_ - this.start_);
};
jspb.BinaryDecoder.prototype.clear = function() {
this.bytes_ = null;
this.cursor_ = this.end_ = this.start_ = 0;
this.error_ = !1;
};
jspb.BinaryDecoder.prototype.getBuffer = function() {
return this.bytes_;
};
jspb.BinaryDecoder.prototype.setBlock = function(e, t, o) {
this.bytes_ = jspb.utils.byteSourceToUint8Array(e);
this.start_ = goog.isDef(t) ? t : 0;
this.end_ = goog.isDef(o) ? this.start_ + o : this.bytes_.length;
this.cursor_ = this.start_;
};
jspb.BinaryDecoder.prototype.getEnd = function() {
return this.end_;
};
jspb.BinaryDecoder.prototype.setEnd = function(e) {
this.end_ = e;
};
jspb.BinaryDecoder.prototype.reset = function() {
this.cursor_ = this.start_;
};
jspb.BinaryDecoder.prototype.getCursor = function() {
return this.cursor_;
};
jspb.BinaryDecoder.prototype.setCursor = function(e) {
this.cursor_ = e;
};
jspb.BinaryDecoder.prototype.advance = function(e) {
this.cursor_ += e;
goog.asserts.assert(this.cursor_ <= this.end_);
};
jspb.BinaryDecoder.prototype.atEnd = function() {
return this.cursor_ == this.end_;
};
jspb.BinaryDecoder.prototype.pastEnd = function() {
return this.cursor_ > this.end_;
};
jspb.BinaryDecoder.prototype.getError = function() {
return this.error_ || 0 > this.cursor_ || this.cursor_ > this.end_;
};
jspb.BinaryDecoder.prototype.readSplitVarint64_ = function() {
for (var e, t, o = 0, s = 0; 4 > s; s++) if (e = this.bytes_[this.cursor_++], o |= (127 & e) << 7 * s, 
128 > e) {
this.tempLow_ = o >>> 0;
this.tempHigh_ = 0;
return;
}
o |= (127 & (e = this.bytes_[this.cursor_++])) << 28;
t = 0 | (127 & e) >> 4;
if (128 > e) this.tempLow_ = o >>> 0, this.tempHigh_ = t >>> 0; else {
for (s = 0; 5 > s; s++) if (e = this.bytes_[this.cursor_++], t |= (127 & e) << 7 * s + 3, 
128 > e) {
this.tempLow_ = o >>> 0;
this.tempHigh_ = t >>> 0;
return;
}
goog.asserts.fail("Failed to read varint, encoding is invalid.");
this.error_ = !0;
}
};
jspb.BinaryDecoder.prototype.skipVarint = function() {
for (;128 & this.bytes_[this.cursor_]; ) this.cursor_++;
this.cursor_++;
};
jspb.BinaryDecoder.prototype.unskipVarint = function(e) {
for (;128 < e; ) this.cursor_--, e >>>= 7;
this.cursor_--;
};
jspb.BinaryDecoder.prototype.readUnsignedVarint32 = function() {
var e, t = this.bytes_, o = 127 & (e = t[this.cursor_ + 0]);
if (128 > e) return this.cursor_ += 1, goog.asserts.assert(this.cursor_ <= this.end_), 
o;
o |= (127 & (e = t[this.cursor_ + 1])) << 7;
if (128 > e) return this.cursor_ += 2, goog.asserts.assert(this.cursor_ <= this.end_), 
o;
o |= (127 & (e = t[this.cursor_ + 2])) << 14;
if (128 > e) return this.cursor_ += 3, goog.asserts.assert(this.cursor_ <= this.end_), 
o;
o |= (127 & (e = t[this.cursor_ + 3])) << 21;
if (128 > e) return this.cursor_ += 4, goog.asserts.assert(this.cursor_ <= this.end_), 
o;
o |= (15 & (e = t[this.cursor_ + 4])) << 28;
if (128 > e) return goog.asserts.assert(0 == (240 & e)), this.cursor_ += 5, goog.asserts.assert(this.cursor_ <= this.end_), 
o >>> 0;
goog.asserts.assert(240 == (240 & e));
goog.asserts.assert(255 == t[this.cursor_ + 5]);
goog.asserts.assert(255 == t[this.cursor_ + 6]);
goog.asserts.assert(255 == t[this.cursor_ + 7]);
goog.asserts.assert(255 == t[this.cursor_ + 8]);
goog.asserts.assert(1 == t[this.cursor_ + 9]);
this.cursor_ += 10;
goog.asserts.assert(this.cursor_ <= this.end_);
return o;
};
jspb.BinaryDecoder.prototype.readSignedVarint32 = jspb.BinaryDecoder.prototype.readUnsignedVarint32;
jspb.BinaryDecoder.prototype.readUnsignedVarint32String = function() {
return this.readUnsignedVarint32().toString();
};
jspb.BinaryDecoder.prototype.readSignedVarint32String = function() {
return this.readSignedVarint32().toString();
};
jspb.BinaryDecoder.prototype.readZigzagVarint32 = function() {
var e = this.readUnsignedVarint32();
return e >>> 1 ^ -(1 & e);
};
jspb.BinaryDecoder.prototype.readUnsignedVarint64 = function() {
this.readSplitVarint64_();
return jspb.utils.joinUint64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readUnsignedVarint64String = function() {
this.readSplitVarint64_();
return jspb.utils.joinUnsignedDecimalString(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readSignedVarint64 = function() {
this.readSplitVarint64_();
return jspb.utils.joinInt64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readSignedVarint64String = function() {
this.readSplitVarint64_();
return jspb.utils.joinSignedDecimalString(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readZigzagVarint64 = function() {
this.readSplitVarint64_();
return jspb.utils.joinZigzag64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readZigzagVarint64String = function() {
return this.readZigzagVarint64().toString();
};
jspb.BinaryDecoder.prototype.readUint8 = function() {
var e = this.bytes_[this.cursor_ + 0];
this.cursor_ += 1;
goog.asserts.assert(this.cursor_ <= this.end_);
return e;
};
jspb.BinaryDecoder.prototype.readUint16 = function() {
var e = this.bytes_[this.cursor_ + 0], t = this.bytes_[this.cursor_ + 1];
this.cursor_ += 2;
goog.asserts.assert(this.cursor_ <= this.end_);
return e << 0 | t << 8;
};
jspb.BinaryDecoder.prototype.readUint32 = function() {
var e = this.bytes_[this.cursor_ + 0], t = this.bytes_[this.cursor_ + 1], o = this.bytes_[this.cursor_ + 2], s = this.bytes_[this.cursor_ + 3];
this.cursor_ += 4;
goog.asserts.assert(this.cursor_ <= this.end_);
return (e << 0 | t << 8 | o << 16 | s << 24) >>> 0;
};
jspb.BinaryDecoder.prototype.readUint64 = function() {
var e = this.readUint32(), t = this.readUint32();
return jspb.utils.joinUint64(e, t);
};
jspb.BinaryDecoder.prototype.readUint64String = function() {
var e = this.readUint32(), t = this.readUint32();
return jspb.utils.joinUnsignedDecimalString(e, t);
};
jspb.BinaryDecoder.prototype.readInt8 = function() {
var e = this.bytes_[this.cursor_ + 0];
this.cursor_ += 1;
goog.asserts.assert(this.cursor_ <= this.end_);
return e << 24 >> 24;
};
jspb.BinaryDecoder.prototype.readInt16 = function() {
var e = this.bytes_[this.cursor_ + 0], t = this.bytes_[this.cursor_ + 1];
this.cursor_ += 2;
goog.asserts.assert(this.cursor_ <= this.end_);
return (e << 0 | t << 8) << 16 >> 16;
};
jspb.BinaryDecoder.prototype.readInt32 = function() {
var e = this.bytes_[this.cursor_ + 0], t = this.bytes_[this.cursor_ + 1], o = this.bytes_[this.cursor_ + 2], s = this.bytes_[this.cursor_ + 3];
this.cursor_ += 4;
goog.asserts.assert(this.cursor_ <= this.end_);
return e << 0 | t << 8 | o << 16 | s << 24;
};
jspb.BinaryDecoder.prototype.readInt64 = function() {
var e = this.readUint32(), t = this.readUint32();
return jspb.utils.joinInt64(e, t);
};
jspb.BinaryDecoder.prototype.readInt64String = function() {
var e = this.readUint32(), t = this.readUint32();
return jspb.utils.joinSignedDecimalString(e, t);
};
jspb.BinaryDecoder.prototype.readFloat = function() {
var e = this.readUint32();
return jspb.utils.joinFloat32(e, 0);
};
jspb.BinaryDecoder.prototype.readDouble = function() {
var e = this.readUint32(), t = this.readUint32();
return jspb.utils.joinFloat64(e, t);
};
jspb.BinaryDecoder.prototype.readBool = function() {
return !!this.bytes_[this.cursor_++];
};
jspb.BinaryDecoder.prototype.readEnum = function() {
return this.readSignedVarint32();
};
jspb.BinaryDecoder.prototype.readString = function(e) {
var t = this.bytes_, o = this.cursor_;
e = o + e;
for (var s = []; o < e; ) if (128 > (n = t[o++])) s.push(n); else if (!(192 > n)) if (224 > n) {
r = t[o++];
s.push((31 & n) << 6 | 63 & r);
} else if (240 > n) {
var r = t[o++], i = t[o++];
s.push((15 & n) << 12 | (63 & r) << 6 | 63 & i);
} else if (248 > n) {
var n = (n = (7 & n) << 18 | (63 & (r = t[o++])) << 12 | (63 & (i = t[o++])) << 6 | 63 & t[o++]) - 65536;
s.push(55296 + (n >> 10 & 1023), 56320 + (1023 & n));
}
t = String.fromCharCode.apply(null, s);
this.cursor_ = o;
return t;
};
jspb.BinaryDecoder.prototype.readStringWithLength = function() {
var e = this.readUnsignedVarint32();
return this.readString(e);
};
jspb.BinaryDecoder.prototype.readBytes = function(e) {
if (0 > e || this.cursor_ + e > this.bytes_.length) return this.error_ = !0, goog.asserts.fail("Invalid byte length!"), 
new Uint8Array(0);
var t = this.bytes_.subarray(this.cursor_, this.cursor_ + e);
this.cursor_ += e;
goog.asserts.assert(this.cursor_ <= this.end_);
return t;
};
jspb.BinaryDecoder.prototype.readVarintHash64 = function() {
this.readSplitVarint64_();
return jspb.utils.joinHash64(this.tempLow_, this.tempHigh_);
};
jspb.BinaryDecoder.prototype.readFixedHash64 = function() {
var e = this.bytes_, t = this.cursor_, o = e[t + 0], s = e[t + 1], r = e[t + 2], i = e[t + 3], n = e[t + 4], a = e[t + 5], p = e[t + 6], e = e[t + 7];
this.cursor_ += 8;
return String.fromCharCode(o, s, r, i, n, a, p, e);
};
jspb.BinaryReader = function(e, t, o) {
this.decoder_ = jspb.BinaryDecoder.alloc(e, t, o);
this.fieldCursor_ = this.decoder_.getCursor();
this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
this.error_ = !1;
this.readCallbacks_ = null;
};
jspb.BinaryReader.instanceCache_ = [];
jspb.BinaryReader.alloc = function(e, t, o) {
if (jspb.BinaryReader.instanceCache_.length) {
var s = jspb.BinaryReader.instanceCache_.pop();
e && s.decoder_.setBlock(e, t, o);
return s;
}
return new jspb.BinaryReader(e, t, o);
};
jspb.BinaryReader.prototype.alloc = jspb.BinaryReader.alloc;
jspb.BinaryReader.prototype.free = function() {
this.decoder_.clear();
this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
this.error_ = !1;
this.readCallbacks_ = null;
100 > jspb.BinaryReader.instanceCache_.length && jspb.BinaryReader.instanceCache_.push(this);
};
jspb.BinaryReader.prototype.getFieldCursor = function() {
return this.fieldCursor_;
};
jspb.BinaryReader.prototype.getCursor = function() {
return this.decoder_.getCursor();
};
jspb.BinaryReader.prototype.getBuffer = function() {
return this.decoder_.getBuffer();
};
jspb.BinaryReader.prototype.getFieldNumber = function() {
return this.nextField_;
};
jspb.BinaryReader.prototype.getWireType = function() {
return this.nextWireType_;
};
jspb.BinaryReader.prototype.isEndGroup = function() {
return this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP;
};
jspb.BinaryReader.prototype.getError = function() {
return this.error_ || this.decoder_.getError();
};
jspb.BinaryReader.prototype.setBlock = function(e, t, o) {
this.decoder_.setBlock(e, t, o);
this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
};
jspb.BinaryReader.prototype.reset = function() {
this.decoder_.reset();
this.nextField_ = jspb.BinaryConstants.INVALID_FIELD_NUMBER;
this.nextWireType_ = jspb.BinaryConstants.WireType.INVALID;
};
jspb.BinaryReader.prototype.advance = function(e) {
this.decoder_.advance(e);
};
jspb.BinaryReader.prototype.nextField = function() {
if (this.decoder_.atEnd()) return !1;
if (this.getError()) return goog.asserts.fail("Decoder hit an error"), !1;
this.fieldCursor_ = this.decoder_.getCursor();
var e = this.decoder_.readUnsignedVarint32(), t = e >>> 3;
if ((e = 7 & e) != jspb.BinaryConstants.WireType.VARINT && e != jspb.BinaryConstants.WireType.FIXED32 && e != jspb.BinaryConstants.WireType.FIXED64 && e != jspb.BinaryConstants.WireType.DELIMITED && e != jspb.BinaryConstants.WireType.START_GROUP && e != jspb.BinaryConstants.WireType.END_GROUP) return goog.asserts.fail("Invalid wire type"), 
this.error_ = !0, !1;
this.nextField_ = t;
this.nextWireType_ = e;
return !0;
};
jspb.BinaryReader.prototype.unskipHeader = function() {
this.decoder_.unskipVarint(this.nextField_ << 3 | this.nextWireType_);
};
jspb.BinaryReader.prototype.skipMatchingFields = function() {
var e = this.nextField_;
for (this.unskipHeader(); this.nextField() && this.getFieldNumber() == e; ) this.skipField();
this.decoder_.atEnd() || this.unskipHeader();
};
jspb.BinaryReader.prototype.skipVarintField = function() {
this.nextWireType_ != jspb.BinaryConstants.WireType.VARINT ? (goog.asserts.fail("Invalid wire type for skipVarintField"), 
this.skipField()) : this.decoder_.skipVarint();
};
jspb.BinaryReader.prototype.skipDelimitedField = function() {
if (this.nextWireType_ != jspb.BinaryConstants.WireType.DELIMITED) goog.asserts.fail("Invalid wire type for skipDelimitedField"), 
this.skipField(); else {
var e = this.decoder_.readUnsignedVarint32();
this.decoder_.advance(e);
}
};
jspb.BinaryReader.prototype.skipFixed32Field = function() {
this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED32 ? (goog.asserts.fail("Invalid wire type for skipFixed32Field"), 
this.skipField()) : this.decoder_.advance(4);
};
jspb.BinaryReader.prototype.skipFixed64Field = function() {
this.nextWireType_ != jspb.BinaryConstants.WireType.FIXED64 ? (goog.asserts.fail("Invalid wire type for skipFixed64Field"), 
this.skipField()) : this.decoder_.advance(8);
};
jspb.BinaryReader.prototype.skipGroup = function() {
var e = [ this.nextField_ ];
do {
if (!this.nextField()) {
goog.asserts.fail("Unmatched start-group tag: stream EOF");
this.error_ = !0;
break;
}
if (this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP) e.push(this.nextField_); else if (this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP && this.nextField_ != e.pop()) {
goog.asserts.fail("Unmatched end-group tag");
this.error_ = !0;
break;
}
} while (0 < e.length);
};
jspb.BinaryReader.prototype.skipField = function() {
switch (this.nextWireType_) {
case jspb.BinaryConstants.WireType.VARINT:
this.skipVarintField();
break;

case jspb.BinaryConstants.WireType.FIXED64:
this.skipFixed64Field();
break;

case jspb.BinaryConstants.WireType.DELIMITED:
this.skipDelimitedField();
break;

case jspb.BinaryConstants.WireType.FIXED32:
this.skipFixed32Field();
break;

case jspb.BinaryConstants.WireType.START_GROUP:
this.skipGroup();
break;

default:
goog.asserts.fail("Invalid wire encoding for field.");
}
};
jspb.BinaryReader.prototype.registerReadCallback = function(e, t) {
goog.isNull(this.readCallbacks_) && (this.readCallbacks_ = {});
goog.asserts.assert(!this.readCallbacks_[e]);
this.readCallbacks_[e] = t;
};
jspb.BinaryReader.prototype.runReadCallback = function(e) {
goog.asserts.assert(!goog.isNull(this.readCallbacks_));
e = this.readCallbacks_[e];
goog.asserts.assert(e);
return e(this);
};
jspb.BinaryReader.prototype.readAny = function(e) {
this.nextWireType_ = jspb.BinaryConstants.FieldTypeToWireType(e);
var t = jspb.BinaryConstants.FieldType;
switch (e) {
case t.DOUBLE:
return this.readDouble();

case t.FLOAT:
return this.readFloat();

case t.INT64:
return this.readInt64();

case t.UINT64:
return this.readUint64();

case t.INT32:
return this.readInt32();

case t.FIXED64:
return this.readFixed64();

case t.FIXED32:
return this.readFixed32();

case t.BOOL:
return this.readBool();

case t.STRING:
return this.readString();

case t.GROUP:
goog.asserts.fail("Group field type not supported in readAny()");

case t.MESSAGE:
goog.asserts.fail("Message field type not supported in readAny()");

case t.BYTES:
return this.readBytes();

case t.UINT32:
return this.readUint32();

case t.ENUM:
return this.readEnum();

case t.SFIXED32:
return this.readSfixed32();

case t.SFIXED64:
return this.readSfixed64();

case t.SINT32:
return this.readSint32();

case t.SINT64:
return this.readSint64();

case t.FHASH64:
return this.readFixedHash64();

case t.VHASH64:
return this.readVarintHash64();

default:
goog.asserts.fail("Invalid field type in readAny()");
}
return 0;
};
jspb.BinaryReader.prototype.readMessage = function(e, t) {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
var o = this.decoder_.getEnd(), s = this.decoder_.readUnsignedVarint32(), s = this.decoder_.getCursor() + s;
this.decoder_.setEnd(s);
t(e, this);
this.decoder_.setCursor(s);
this.decoder_.setEnd(o);
};
jspb.BinaryReader.prototype.readGroup = function(e, t, o) {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.START_GROUP);
goog.asserts.assert(this.nextField_ == e);
o(t, this);
this.error_ || this.nextWireType_ == jspb.BinaryConstants.WireType.END_GROUP || (goog.asserts.fail("Group submessage did not end with an END_GROUP tag"), 
this.error_ = !0);
};
jspb.BinaryReader.prototype.getFieldDecoder = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
var e = this.decoder_.readUnsignedVarint32(), t = this.decoder_.getCursor(), o = t + e, e = jspb.BinaryDecoder.alloc(this.decoder_.getBuffer(), t, e);
this.decoder_.setCursor(o);
return e;
};
jspb.BinaryReader.prototype.readInt32 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readSignedVarint32();
};
jspb.BinaryReader.prototype.readInt32String = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readSignedVarint32String();
};
jspb.BinaryReader.prototype.readInt64 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readSignedVarint64();
};
jspb.BinaryReader.prototype.readInt64String = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readSignedVarint64String();
};
jspb.BinaryReader.prototype.readUint32 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readUnsignedVarint32();
};
jspb.BinaryReader.prototype.readUint32String = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readUnsignedVarint32String();
};
jspb.BinaryReader.prototype.readUint64 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readUnsignedVarint64();
};
jspb.BinaryReader.prototype.readUint64String = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readUnsignedVarint64String();
};
jspb.BinaryReader.prototype.readSint32 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readZigzagVarint32();
};
jspb.BinaryReader.prototype.readSint64 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readZigzagVarint64();
};
jspb.BinaryReader.prototype.readSint64String = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readZigzagVarint64String();
};
jspb.BinaryReader.prototype.readFixed32 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
return this.decoder_.readUint32();
};
jspb.BinaryReader.prototype.readFixed64 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
return this.decoder_.readUint64();
};
jspb.BinaryReader.prototype.readFixed64String = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
return this.decoder_.readUint64String();
};
jspb.BinaryReader.prototype.readSfixed32 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
return this.decoder_.readInt32();
};
jspb.BinaryReader.prototype.readSfixed32String = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
return this.decoder_.readInt32().toString();
};
jspb.BinaryReader.prototype.readSfixed64 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
return this.decoder_.readInt64();
};
jspb.BinaryReader.prototype.readSfixed64String = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
return this.decoder_.readInt64String();
};
jspb.BinaryReader.prototype.readFloat = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED32);
return this.decoder_.readFloat();
};
jspb.BinaryReader.prototype.readDouble = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
return this.decoder_.readDouble();
};
jspb.BinaryReader.prototype.readBool = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return !!this.decoder_.readUnsignedVarint32();
};
jspb.BinaryReader.prototype.readEnum = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readSignedVarint64();
};
jspb.BinaryReader.prototype.readString = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
var e = this.decoder_.readUnsignedVarint32();
return this.decoder_.readString(e);
};
jspb.BinaryReader.prototype.readBytes = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
var e = this.decoder_.readUnsignedVarint32();
return this.decoder_.readBytes(e);
};
jspb.BinaryReader.prototype.readVarintHash64 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.VARINT);
return this.decoder_.readVarintHash64();
};
jspb.BinaryReader.prototype.readFixedHash64 = function() {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.FIXED64);
return this.decoder_.readFixedHash64();
};
jspb.BinaryReader.prototype.readPackedField_ = function(e) {
goog.asserts.assert(this.nextWireType_ == jspb.BinaryConstants.WireType.DELIMITED);
for (var t = this.decoder_.readUnsignedVarint32(), t = this.decoder_.getCursor() + t, o = []; this.decoder_.getCursor() < t; ) o.push(e.call(this.decoder_));
return o;
};
jspb.BinaryReader.prototype.readPackedInt32 = function() {
return this.readPackedField_(this.decoder_.readSignedVarint32);
};
jspb.BinaryReader.prototype.readPackedInt32String = function() {
return this.readPackedField_(this.decoder_.readSignedVarint32String);
};
jspb.BinaryReader.prototype.readPackedInt64 = function() {
return this.readPackedField_(this.decoder_.readSignedVarint64);
};
jspb.BinaryReader.prototype.readPackedInt64String = function() {
return this.readPackedField_(this.decoder_.readSignedVarint64String);
};
jspb.BinaryReader.prototype.readPackedUint32 = function() {
return this.readPackedField_(this.decoder_.readUnsignedVarint32);
};
jspb.BinaryReader.prototype.readPackedUint32String = function() {
return this.readPackedField_(this.decoder_.readUnsignedVarint32String);
};
jspb.BinaryReader.prototype.readPackedUint64 = function() {
return this.readPackedField_(this.decoder_.readUnsignedVarint64);
};
jspb.BinaryReader.prototype.readPackedUint64String = function() {
return this.readPackedField_(this.decoder_.readUnsignedVarint64String);
};
jspb.BinaryReader.prototype.readPackedSint32 = function() {
return this.readPackedField_(this.decoder_.readZigzagVarint32);
};
jspb.BinaryReader.prototype.readPackedSint64 = function() {
return this.readPackedField_(this.decoder_.readZigzagVarint64);
};
jspb.BinaryReader.prototype.readPackedSint64String = function() {
return this.readPackedField_(this.decoder_.readZigzagVarint64String);
};
jspb.BinaryReader.prototype.readPackedFixed32 = function() {
return this.readPackedField_(this.decoder_.readUint32);
};
jspb.BinaryReader.prototype.readPackedFixed64 = function() {
return this.readPackedField_(this.decoder_.readUint64);
};
jspb.BinaryReader.prototype.readPackedFixed64String = function() {
return this.readPackedField_(this.decoder_.readUint64String);
};
jspb.BinaryReader.prototype.readPackedSfixed32 = function() {
return this.readPackedField_(this.decoder_.readInt32);
};
jspb.BinaryReader.prototype.readPackedSfixed64 = function() {
return this.readPackedField_(this.decoder_.readInt64);
};
jspb.BinaryReader.prototype.readPackedSfixed64String = function() {
return this.readPackedField_(this.decoder_.readInt64String);
};
jspb.BinaryReader.prototype.readPackedFloat = function() {
return this.readPackedField_(this.decoder_.readFloat);
};
jspb.BinaryReader.prototype.readPackedDouble = function() {
return this.readPackedField_(this.decoder_.readDouble);
};
jspb.BinaryReader.prototype.readPackedBool = function() {
return this.readPackedField_(this.decoder_.readBool);
};
jspb.BinaryReader.prototype.readPackedEnum = function() {
return this.readPackedField_(this.decoder_.readEnum);
};
jspb.BinaryReader.prototype.readPackedVarintHash64 = function() {
return this.readPackedField_(this.decoder_.readVarintHash64);
};
jspb.BinaryReader.prototype.readPackedFixedHash64 = function() {
return this.readPackedField_(this.decoder_.readFixedHash64);
};
jspb.BinaryEncoder = function() {
this.buffer_ = [];
};
jspb.BinaryEncoder.prototype.length = function() {
return this.buffer_.length;
};
jspb.BinaryEncoder.prototype.end = function() {
var e = this.buffer_;
this.buffer_ = [];
return e;
};
jspb.BinaryEncoder.prototype.writeSplitVarint64 = function(e, t) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(t == Math.floor(t));
goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32);
for (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32); 0 < t || 127 < e; ) this.buffer_.push(127 & e | 128), 
e = (e >>> 7 | t << 25) >>> 0, t >>>= 7;
this.buffer_.push(e);
};
jspb.BinaryEncoder.prototype.writeSplitFixed64 = function(e, t) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(t == Math.floor(t));
goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32);
goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32);
this.writeUint32(e);
this.writeUint32(t);
};
jspb.BinaryEncoder.prototype.writeUnsignedVarint32 = function(e) {
goog.asserts.assert(e == Math.floor(e));
for (goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32); 127 < e; ) this.buffer_.push(127 & e | 128), 
e >>>= 7;
this.buffer_.push(e);
};
jspb.BinaryEncoder.prototype.writeSignedVarint32 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_31 && e < jspb.BinaryConstants.TWO_TO_31);
if (0 <= e) this.writeUnsignedVarint32(e); else {
for (var t = 0; 9 > t; t++) this.buffer_.push(127 & e | 128), e >>= 7;
this.buffer_.push(1);
}
};
jspb.BinaryEncoder.prototype.writeUnsignedVarint64 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_64);
jspb.utils.splitInt64(e);
this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeSignedVarint64 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_63 && e < jspb.BinaryConstants.TWO_TO_63);
jspb.utils.splitInt64(e);
this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeZigzagVarint32 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_31 && e < jspb.BinaryConstants.TWO_TO_31);
this.writeUnsignedVarint32((e << 1 ^ e >> 31) >>> 0);
};
jspb.BinaryEncoder.prototype.writeZigzagVarint64 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_63 && e < jspb.BinaryConstants.TWO_TO_63);
jspb.utils.splitZigzag64(e);
this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeZigzagVarint64String = function(e) {
this.writeZigzagVarint64(parseInt(e, 10));
};
jspb.BinaryEncoder.prototype.writeUint8 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(0 <= e && 256 > e);
this.buffer_.push(e >>> 0 & 255);
};
jspb.BinaryEncoder.prototype.writeUint16 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(0 <= e && 65536 > e);
this.buffer_.push(e >>> 0 & 255);
this.buffer_.push(e >>> 8 & 255);
};
jspb.BinaryEncoder.prototype.writeUint32 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_32);
this.buffer_.push(e >>> 0 & 255);
this.buffer_.push(e >>> 8 & 255);
this.buffer_.push(e >>> 16 & 255);
this.buffer_.push(e >>> 24 & 255);
};
jspb.BinaryEncoder.prototype.writeUint64 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(0 <= e && e < jspb.BinaryConstants.TWO_TO_64);
jspb.utils.splitUint64(e);
this.writeUint32(jspb.utils.split64Low);
this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeInt8 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(-128 <= e && 128 > e);
this.buffer_.push(e >>> 0 & 255);
};
jspb.BinaryEncoder.prototype.writeInt16 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(-32768 <= e && 32768 > e);
this.buffer_.push(e >>> 0 & 255);
this.buffer_.push(e >>> 8 & 255);
};
jspb.BinaryEncoder.prototype.writeInt32 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_31 && e < jspb.BinaryConstants.TWO_TO_31);
this.buffer_.push(e >>> 0 & 255);
this.buffer_.push(e >>> 8 & 255);
this.buffer_.push(e >>> 16 & 255);
this.buffer_.push(e >>> 24 & 255);
};
jspb.BinaryEncoder.prototype.writeInt64 = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_63 && e < jspb.BinaryConstants.TWO_TO_63);
jspb.utils.splitInt64(e);
this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeInt64String = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_63 && e < jspb.BinaryConstants.TWO_TO_63);
jspb.utils.splitHash64(jspb.utils.decimalStringToHash64(e));
this.writeSplitFixed64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeFloat = function(e) {
goog.asserts.assert(e >= -jspb.BinaryConstants.FLOAT32_MAX && e <= jspb.BinaryConstants.FLOAT32_MAX);
jspb.utils.splitFloat32(e);
this.writeUint32(jspb.utils.split64Low);
};
jspb.BinaryEncoder.prototype.writeDouble = function(e) {
goog.asserts.assert(e >= -jspb.BinaryConstants.FLOAT64_MAX && e <= jspb.BinaryConstants.FLOAT64_MAX);
jspb.utils.splitFloat64(e);
this.writeUint32(jspb.utils.split64Low);
this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeBool = function(e) {
goog.asserts.assert(goog.isBoolean(e));
this.buffer_.push(e ? 1 : 0);
};
jspb.BinaryEncoder.prototype.writeEnum = function(e) {
goog.asserts.assert(e == Math.floor(e));
goog.asserts.assert(e >= -jspb.BinaryConstants.TWO_TO_31 && e < jspb.BinaryConstants.TWO_TO_31);
this.writeSignedVarint32(e);
};
jspb.BinaryEncoder.prototype.writeBytes = function(e) {
this.buffer_.push.apply(this.buffer_, e);
};
jspb.BinaryEncoder.prototype.writeVarintHash64 = function(e) {
jspb.utils.splitHash64(e);
this.writeSplitVarint64(jspb.utils.split64Low, jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeFixedHash64 = function(e) {
jspb.utils.splitHash64(e);
this.writeUint32(jspb.utils.split64Low);
this.writeUint32(jspb.utils.split64High);
};
jspb.BinaryEncoder.prototype.writeString = function(e) {
for (var t = this.buffer_.length, o = 0; o < e.length; o++) {
var s = e.charCodeAt(o);
if (128 > s) this.buffer_.push(s); else if (2048 > s) this.buffer_.push(s >> 6 | 192), 
this.buffer_.push(63 & s | 128); else if (65536 > s) if (55296 <= s && 56319 >= s && o + 1 < e.length) {
var r = e.charCodeAt(o + 1);
56320 <= r && 57343 >= r && (s = 1024 * (s - 55296) + r - 56320 + 65536, this.buffer_.push(s >> 18 | 240), 
this.buffer_.push(s >> 12 & 63 | 128), this.buffer_.push(s >> 6 & 63 | 128), this.buffer_.push(63 & s | 128), 
o++);
} else this.buffer_.push(s >> 12 | 224), this.buffer_.push(s >> 6 & 63 | 128), this.buffer_.push(63 & s | 128);
}
return this.buffer_.length - t;
};
jspb.arith = {};
jspb.arith.UInt64 = function(e, t) {
this.lo = e;
this.hi = t;
};
jspb.arith.UInt64.prototype.cmp = function(e) {
return this.hi < e.hi || this.hi == e.hi && this.lo < e.lo ? -1 : this.hi == e.hi && this.lo == e.lo ? 0 : 1;
};
jspb.arith.UInt64.prototype.rightShift = function() {
return new jspb.arith.UInt64((this.lo >>> 1 | (1 & this.hi) << 31) >>> 0, this.hi >>> 1 >>> 0);
};
jspb.arith.UInt64.prototype.leftShift = function() {
return new jspb.arith.UInt64(this.lo << 1 >>> 0, (this.hi << 1 | this.lo >>> 31) >>> 0);
};
jspb.arith.UInt64.prototype.msb = function() {
return !!(2147483648 & this.hi);
};
jspb.arith.UInt64.prototype.lsb = function() {
return !!(1 & this.lo);
};
jspb.arith.UInt64.prototype.zero = function() {
return 0 == this.lo && 0 == this.hi;
};
jspb.arith.UInt64.prototype.add = function(e) {
return new jspb.arith.UInt64((this.lo + e.lo & 4294967295) >>> 0 >>> 0, ((this.hi + e.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + e.lo ? 1 : 0) >>> 0);
};
jspb.arith.UInt64.prototype.sub = function(e) {
return new jspb.arith.UInt64((this.lo - e.lo & 4294967295) >>> 0 >>> 0, ((this.hi - e.hi & 4294967295) >>> 0) - (0 > this.lo - e.lo ? 1 : 0) >>> 0);
};
jspb.arith.UInt64.mul32x32 = function(e, t) {
for (var o = e >>> 16, s = 65535 & t, r = t >>> 16, i = (n = 65535 & e) * s + 65536 * (n * r & 65535) + 65536 * (o * s & 65535), n = o * r + (n * r >>> 16) + (o * s >>> 16); 4294967296 <= i; ) i -= 4294967296, 
n += 1;
return new jspb.arith.UInt64(i >>> 0, n >>> 0);
};
jspb.arith.UInt64.prototype.mul = function(e) {
var t = jspb.arith.UInt64.mul32x32(this.lo, e);
(e = jspb.arith.UInt64.mul32x32(this.hi, e)).hi = e.lo;
e.lo = 0;
return t.add(e);
};
jspb.arith.UInt64.prototype.div = function(e) {
if (0 == e) return [];
var t = new jspb.arith.UInt64(0, 0), o = new jspb.arith.UInt64(this.lo, this.hi);
e = new jspb.arith.UInt64(e, 0);
for (var s = new jspb.arith.UInt64(1, 0); !e.msb(); ) e = e.leftShift(), s = s.leftShift();
for (;!s.zero(); ) 0 >= e.cmp(o) && (t = t.add(s), o = o.sub(e)), e = e.rightShift(), 
s = s.rightShift();
return [ t, o ];
};
jspb.arith.UInt64.prototype.toString = function() {
for (var e = "", t = this; !t.zero(); ) var o = (t = t.div(10))[0], e = t[1].lo + e, t = o;
"" == e && (e = "0");
return e;
};
jspb.arith.UInt64.fromString = function(e) {
for (var t = new jspb.arith.UInt64(0, 0), o = new jspb.arith.UInt64(0, 0), s = 0; s < e.length; s++) {
if ("0" > e[s] || "9" < e[s]) return null;
var r = parseInt(e[s], 10);
o.lo = r;
t = t.mul(10).add(o);
}
return t;
};
jspb.arith.UInt64.prototype.clone = function() {
return new jspb.arith.UInt64(this.lo, this.hi);
};
jspb.arith.Int64 = function(e, t) {
this.lo = e;
this.hi = t;
};
jspb.arith.Int64.prototype.add = function(e) {
return new jspb.arith.Int64((this.lo + e.lo & 4294967295) >>> 0 >>> 0, ((this.hi + e.hi & 4294967295) >>> 0) + (4294967296 <= this.lo + e.lo ? 1 : 0) >>> 0);
};
jspb.arith.Int64.prototype.sub = function(e) {
return new jspb.arith.Int64((this.lo - e.lo & 4294967295) >>> 0 >>> 0, ((this.hi - e.hi & 4294967295) >>> 0) - (0 > this.lo - e.lo ? 1 : 0) >>> 0);
};
jspb.arith.Int64.prototype.clone = function() {
return new jspb.arith.Int64(this.lo, this.hi);
};
jspb.arith.Int64.prototype.toString = function() {
var e = 0 != (2147483648 & this.hi), t = new jspb.arith.UInt64(this.lo, this.hi);
e && (t = new jspb.arith.UInt64(0, 0).sub(t));
return (e ? "-" : "") + t.toString();
};
jspb.arith.Int64.fromString = function(e) {
var t = 0 < e.length && "-" == e[0];
t && (e = e.substring(1));
if (null === (e = jspb.arith.UInt64.fromString(e))) return null;
t && (e = new jspb.arith.UInt64(0, 0).sub(e));
return new jspb.arith.Int64(e.lo, e.hi);
};
jspb.BinaryWriter = function() {
this.blocks_ = [];
this.totalLength_ = 0;
this.encoder_ = new jspb.BinaryEncoder();
this.bookmarks_ = [];
};
jspb.BinaryWriter.prototype.appendUint8Array_ = function(e) {
var t = this.encoder_.end();
this.blocks_.push(t);
this.blocks_.push(e);
this.totalLength_ += t.length + e.length;
};
jspb.BinaryWriter.prototype.beginDelimited_ = function(e) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
e = this.encoder_.end();
this.blocks_.push(e);
this.totalLength_ += e.length;
e.push(this.totalLength_);
return e;
};
jspb.BinaryWriter.prototype.endDelimited_ = function(e) {
var t = e.pop(), t = this.totalLength_ + this.encoder_.length() - t;
for (goog.asserts.assert(0 <= t); 127 < t; ) e.push(127 & t | 128), t >>>= 7, this.totalLength_++;
e.push(t);
this.totalLength_++;
};
jspb.BinaryWriter.prototype.writeSerializedMessage = function(e, t, o) {
this.appendUint8Array_(e.subarray(t, o));
};
jspb.BinaryWriter.prototype.maybeWriteSerializedMessage = function(e, t, o) {
null != e && null != t && null != o && this.writeSerializedMessage(e, t, o);
};
jspb.BinaryWriter.prototype.reset = function() {
this.blocks_ = [];
this.encoder_.end();
this.totalLength_ = 0;
this.bookmarks_ = [];
};
jspb.BinaryWriter.prototype.getResultBuffer = function() {
goog.asserts.assert(0 == this.bookmarks_.length);
for (var e = new Uint8Array(this.totalLength_ + this.encoder_.length()), t = this.blocks_, o = t.length, s = 0, r = 0; r < o; r++) {
var i = t[r];
e.set(i, s);
s += i.length;
}
t = this.encoder_.end();
e.set(t, s);
s += t.length;
goog.asserts.assert(s == e.length);
this.blocks_ = [ e ];
return e;
};
jspb.BinaryWriter.prototype.getResultBase64String = function() {
return goog.crypt.base64.encodeByteArray(this.getResultBuffer());
};
jspb.BinaryWriter.prototype.beginSubMessage = function(e) {
this.bookmarks_.push(this.beginDelimited_(e));
};
jspb.BinaryWriter.prototype.endSubMessage = function() {
goog.asserts.assert(0 <= this.bookmarks_.length);
this.endDelimited_(this.bookmarks_.pop());
};
jspb.BinaryWriter.prototype.writeFieldHeader_ = function(e, t) {
goog.asserts.assert(1 <= e && e == Math.floor(e));
this.encoder_.writeUnsignedVarint32(8 * e + t);
};
jspb.BinaryWriter.prototype.writeAny = function(e, t, o) {
var s = jspb.BinaryConstants.FieldType;
switch (e) {
case s.DOUBLE:
this.writeDouble(t, o);
break;

case s.FLOAT:
this.writeFloat(t, o);
break;

case s.INT64:
this.writeInt64(t, o);
break;

case s.UINT64:
this.writeUint64(t, o);
break;

case s.INT32:
this.writeInt32(t, o);
break;

case s.FIXED64:
this.writeFixed64(t, o);
break;

case s.FIXED32:
this.writeFixed32(t, o);
break;

case s.BOOL:
this.writeBool(t, o);
break;

case s.STRING:
this.writeString(t, o);
break;

case s.GROUP:
goog.asserts.fail("Group field type not supported in writeAny()");
break;

case s.MESSAGE:
goog.asserts.fail("Message field type not supported in writeAny()");
break;

case s.BYTES:
this.writeBytes(t, o);
break;

case s.UINT32:
this.writeUint32(t, o);
break;

case s.ENUM:
this.writeEnum(t, o);
break;

case s.SFIXED32:
this.writeSfixed32(t, o);
break;

case s.SFIXED64:
this.writeSfixed64(t, o);
break;

case s.SINT32:
this.writeSint32(t, o);
break;

case s.SINT64:
this.writeSint64(t, o);
break;

case s.FHASH64:
this.writeFixedHash64(t, o);
break;

case s.VHASH64:
this.writeVarintHash64(t, o);
break;

default:
goog.asserts.fail("Invalid field type in writeAny()");
}
};
jspb.BinaryWriter.prototype.writeUnsignedVarint32_ = function(e, t) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint32(t));
};
jspb.BinaryWriter.prototype.writeSignedVarint32_ = function(e, t) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(t));
};
jspb.BinaryWriter.prototype.writeUnsignedVarint64_ = function(e, t) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeUnsignedVarint64(t));
};
jspb.BinaryWriter.prototype.writeSignedVarint64_ = function(e, t) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint64(t));
};
jspb.BinaryWriter.prototype.writeZigzagVarint32_ = function(e, t) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint32(t));
};
jspb.BinaryWriter.prototype.writeZigzagVarint64_ = function(e, t) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64(t));
};
jspb.BinaryWriter.prototype.writeZigzagVarint64String_ = function(e, t) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeZigzagVarint64String(t));
};
jspb.BinaryWriter.prototype.writeInt32 = function(e, t) {
null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_31 && t < jspb.BinaryConstants.TWO_TO_31), 
this.writeSignedVarint32_(e, t));
};
jspb.BinaryWriter.prototype.writeInt32String = function(e, t) {
if (null != t) {
var o = parseInt(t, 10);
goog.asserts.assert(o >= -jspb.BinaryConstants.TWO_TO_31 && o < jspb.BinaryConstants.TWO_TO_31);
this.writeSignedVarint32_(e, o);
}
};
jspb.BinaryWriter.prototype.writeInt64 = function(e, t) {
null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_63 && t < jspb.BinaryConstants.TWO_TO_63), 
this.writeSignedVarint64_(e, t));
};
jspb.BinaryWriter.prototype.writeInt64String = function(e, t) {
if (null != t) {
var o = jspb.arith.Int64.fromString(t);
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT);
this.encoder_.writeSplitVarint64(o.lo, o.hi);
}
};
jspb.BinaryWriter.prototype.writeUint32 = function(e, t) {
null != t && (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32), 
this.writeUnsignedVarint32_(e, t));
};
jspb.BinaryWriter.prototype.writeUint32String = function(e, t) {
if (null != t) {
var o = parseInt(t, 10);
goog.asserts.assert(0 <= o && o < jspb.BinaryConstants.TWO_TO_32);
this.writeUnsignedVarint32_(e, o);
}
};
jspb.BinaryWriter.prototype.writeUint64 = function(e, t) {
null != t && (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_64), 
this.writeUnsignedVarint64_(e, t));
};
jspb.BinaryWriter.prototype.writeUint64String = function(e, t) {
if (null != t) {
var o = jspb.arith.UInt64.fromString(t);
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT);
this.encoder_.writeSplitVarint64(o.lo, o.hi);
}
};
jspb.BinaryWriter.prototype.writeSint32 = function(e, t) {
null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_31 && t < jspb.BinaryConstants.TWO_TO_31), 
this.writeZigzagVarint32_(e, t));
};
jspb.BinaryWriter.prototype.writeSint64 = function(e, t) {
null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_63 && t < jspb.BinaryConstants.TWO_TO_63), 
this.writeZigzagVarint64_(e, t));
};
jspb.BinaryWriter.prototype.writeSint64String = function(e, t) {
null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_63 && t < jspb.BinaryConstants.TWO_TO_63), 
this.writeZigzagVarint64String_(e, t));
};
jspb.BinaryWriter.prototype.writeFixed32 = function(e, t) {
null != t && (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_32), 
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeUint32(t));
};
jspb.BinaryWriter.prototype.writeFixed64 = function(e, t) {
null != t && (goog.asserts.assert(0 <= t && t < jspb.BinaryConstants.TWO_TO_64), 
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeUint64(t));
};
jspb.BinaryWriter.prototype.writeFixed64String = function(e, t) {
if (null != t) {
var o = jspb.arith.UInt64.fromString(t);
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64);
this.encoder_.writeSplitFixed64(o.lo, o.hi);
}
};
jspb.BinaryWriter.prototype.writeSfixed32 = function(e, t) {
null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_31 && t < jspb.BinaryConstants.TWO_TO_31), 
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED32), this.encoder_.writeInt32(t));
};
jspb.BinaryWriter.prototype.writeSfixed64 = function(e, t) {
null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_63 && t < jspb.BinaryConstants.TWO_TO_63), 
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), this.encoder_.writeInt64(t));
};
jspb.BinaryWriter.prototype.writeSfixed64String = function(e, t) {
if (null != t) {
var o = jspb.arith.Int64.fromString(t);
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64);
this.encoder_.writeSplitFixed64(o.lo, o.hi);
}
};
jspb.BinaryWriter.prototype.writeFloat = function(e, t) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED32), 
this.encoder_.writeFloat(t));
};
jspb.BinaryWriter.prototype.writeDouble = function(e, t) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), 
this.encoder_.writeDouble(t));
};
jspb.BinaryWriter.prototype.writeBool = function(e, t) {
null != t && (goog.asserts.assert(goog.isBoolean(t)), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), 
this.encoder_.writeBool(t));
};
jspb.BinaryWriter.prototype.writeEnum = function(e, t) {
null != t && (goog.asserts.assert(t >= -jspb.BinaryConstants.TWO_TO_31 && t < jspb.BinaryConstants.TWO_TO_31), 
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), this.encoder_.writeSignedVarint32(t));
};
jspb.BinaryWriter.prototype.writeString = function(e, t) {
if (null != t) {
var o = this.beginDelimited_(e);
this.encoder_.writeString(t);
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writeBytes = function(e, t) {
if (null != t) {
var o = jspb.utils.byteSourceToUint8Array(t);
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(o.length);
this.appendUint8Array_(o);
}
};
jspb.BinaryWriter.prototype.writeMessage = function(e, t, o) {
null != t && (e = this.beginDelimited_(e), o(t, this), this.endDelimited_(e));
};
jspb.BinaryWriter.prototype.writeGroup = function(e, t, o) {
null != t && (this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.START_GROUP), 
o(t, this), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.END_GROUP));
};
jspb.BinaryWriter.prototype.writeFixedHash64 = function(e, t) {
null != t && (goog.asserts.assert(8 == t.length), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.FIXED64), 
this.encoder_.writeFixedHash64(t));
};
jspb.BinaryWriter.prototype.writeVarintHash64 = function(e, t) {
null != t && (goog.asserts.assert(8 == t.length), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.VARINT), 
this.encoder_.writeVarintHash64(t));
};
jspb.BinaryWriter.prototype.writeRepeatedInt32 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeSignedVarint32_(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedInt32String = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeInt32String(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedInt64 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeSignedVarint64_(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedInt64String = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeInt64String(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedUint32 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeUnsignedVarint32_(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedUint32String = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeUint32String(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedUint64 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeUnsignedVarint64_(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedUint64String = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeUint64String(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedSint32 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeZigzagVarint32_(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedSint64 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeZigzagVarint64_(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedSint64String = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeZigzagVarint64String_(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedFixed32 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeFixed32(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedFixed64 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeFixed64(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedFixed64String = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeFixed64String(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedSfixed32 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeSfixed32(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedSfixed64 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeSfixed64(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedSfixed64String = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeSfixed64String(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedFloat = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeFloat(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedDouble = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeDouble(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedBool = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeBool(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedEnum = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeEnum(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedString = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeString(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedBytes = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeBytes(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedMessage = function(e, t, o) {
if (null != t) for (var s = 0; s < t.length; s++) {
var r = this.beginDelimited_(e);
o(t[s], this);
this.endDelimited_(r);
}
};
jspb.BinaryWriter.prototype.writeRepeatedGroup = function(e, t, o) {
if (null != t) for (var s = 0; s < t.length; s++) this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.START_GROUP), 
o(t[s], this), this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.END_GROUP);
};
jspb.BinaryWriter.prototype.writeRepeatedFixedHash64 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeFixedHash64(e, t[o]);
};
jspb.BinaryWriter.prototype.writeRepeatedVarintHash64 = function(e, t) {
if (null != t) for (var o = 0; o < t.length; o++) this.writeVarintHash64(e, t[o]);
};
jspb.BinaryWriter.prototype.writePackedInt32 = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeSignedVarint32(t[s]);
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedInt32String = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeSignedVarint32(parseInt(t[s], 10));
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedInt64 = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeSignedVarint64(t[s]);
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedInt64String = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) {
var r = jspb.arith.Int64.fromString(t[s]);
this.encoder_.writeSplitVarint64(r.lo, r.hi);
}
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedUint32 = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeUnsignedVarint32(t[s]);
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedUint32String = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeUnsignedVarint32(parseInt(t[s], 10));
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedUint64 = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeUnsignedVarint64(t[s]);
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedUint64String = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) {
var r = jspb.arith.UInt64.fromString(t[s]);
this.encoder_.writeSplitVarint64(r.lo, r.hi);
}
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedSint32 = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeZigzagVarint32(t[s]);
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedSint64 = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeZigzagVarint64(t[s]);
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedSint64String = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeZigzagVarint64(parseInt(t[s], 10));
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedFixed32 = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(4 * t.length);
for (var o = 0; o < t.length; o++) this.encoder_.writeUint32(t[o]);
}
};
jspb.BinaryWriter.prototype.writePackedFixed64 = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(8 * t.length);
for (var o = 0; o < t.length; o++) this.encoder_.writeUint64(t[o]);
}
};
jspb.BinaryWriter.prototype.writePackedFixed64String = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(8 * t.length);
for (var o = 0; o < t.length; o++) {
var s = jspb.arith.UInt64.fromString(t[o]);
this.encoder_.writeSplitFixed64(s.lo, s.hi);
}
}
};
jspb.BinaryWriter.prototype.writePackedSfixed32 = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(4 * t.length);
for (var o = 0; o < t.length; o++) this.encoder_.writeInt32(t[o]);
}
};
jspb.BinaryWriter.prototype.writePackedSfixed64 = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(8 * t.length);
for (var o = 0; o < t.length; o++) this.encoder_.writeInt64(t[o]);
}
};
jspb.BinaryWriter.prototype.writePackedSfixed64String = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(8 * t.length);
for (var o = 0; o < t.length; o++) this.encoder_.writeInt64String(t[o]);
}
};
jspb.BinaryWriter.prototype.writePackedFloat = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(4 * t.length);
for (var o = 0; o < t.length; o++) this.encoder_.writeFloat(t[o]);
}
};
jspb.BinaryWriter.prototype.writePackedDouble = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(8 * t.length);
for (var o = 0; o < t.length; o++) this.encoder_.writeDouble(t[o]);
}
};
jspb.BinaryWriter.prototype.writePackedBool = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(t.length);
for (var o = 0; o < t.length; o++) this.encoder_.writeBool(t[o]);
}
};
jspb.BinaryWriter.prototype.writePackedEnum = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeEnum(t[s]);
this.endDelimited_(o);
}
};
jspb.BinaryWriter.prototype.writePackedFixedHash64 = function(e, t) {
if (null != t && t.length) {
this.writeFieldHeader_(e, jspb.BinaryConstants.WireType.DELIMITED);
this.encoder_.writeUnsignedVarint32(8 * t.length);
for (var o = 0; o < t.length; o++) this.encoder_.writeFixedHash64(t[o]);
}
};
jspb.BinaryWriter.prototype.writePackedVarintHash64 = function(e, t) {
if (null != t && t.length) {
for (var o = this.beginDelimited_(e), s = 0; s < t.length; s++) this.encoder_.writeVarintHash64(t[s]);
this.endDelimited_(o);
}
};
exports.Map = jspb.Map;
exports.Message = jspb.Message;
exports.BinaryReader = jspb.BinaryReader;
exports.BinaryWriter = jspb.BinaryWriter;
exports.ExtensionFieldInfo = jspb.ExtensionFieldInfo;
exports.ExtensionFieldBinaryInfo = jspb.ExtensionFieldBinaryInfo;
exports.exportSymbol = goog.exportSymbol;
exports.inherits = goog.inherits;
exports.object = {
extend: goog.object.extend
};
exports.typeOf = goog.typeOf;
cc._RF.pop();
}).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
}, {} ],
gzip: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "08841/yBvBCWo9TtLYnD6ad", "gzip");
cc.Codec.GZip = function(e) {
this.data = e;
this.debug = !1;
this.gpflags = void 0;
this.files = 0;
this.unzipped = [];
this.buf32k = new Array(32768);
this.bIdx = 0;
this.modeZIP = !1;
this.bytepos = 0;
this.bb = 1;
this.bits = 0;
this.nameBuf = [];
this.fileout = void 0;
this.literalTree = new Array(cc.Codec.GZip.LITERALS);
this.distanceTree = new Array(32);
this.treepos = 0;
this.Places = null;
this.len = 0;
this.fpos = new Array(17);
this.fpos[0] = 0;
this.flens = void 0;
this.fmax = void 0;
};
cc.Codec.GZip.gunzip = function(e) {
e.constructor === Array || (e.constructor, String);
return new cc.Codec.GZip(e).gunzip()[0][0];
};
cc.Codec.GZip.HufNode = function() {
this.b0 = 0;
this.b1 = 0;
this.jump = null;
this.jumppos = -1;
};
cc.Codec.GZip.LITERALS = 288;
cc.Codec.GZip.NAMEMAX = 256;
cc.Codec.GZip.bitReverse = [ 0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33, 161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 3, 131, 67, 195, 35, 163, 99, 227, 19, 147, 83, 211, 51, 179, 115, 243, 11, 139, 75, 203, 43, 171, 107, 235, 27, 155, 91, 219, 59, 187, 123, 251, 7, 135, 71, 199, 39, 167, 103, 231, 23, 151, 87, 215, 55, 183, 119, 247, 15, 143, 79, 207, 47, 175, 111, 239, 31, 159, 95, 223, 63, 191, 127, 255 ];
cc.Codec.GZip.cplens = [ 3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0 ];
cc.Codec.GZip.cplext = [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99 ];
cc.Codec.GZip.cpdist = [ 1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577 ];
cc.Codec.GZip.cpdext = [ 0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13 ];
cc.Codec.GZip.border = [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];
cc.Codec.GZip.prototype.gunzip = function() {
this.outputArr = [];
this.nextFile();
return this.unzipped;
};
cc.Codec.GZip.prototype.readByte = function() {
this.bits += 8;
return this.bytepos < this.data.length ? this.data.charCodeAt(this.bytepos++) : -1;
};
cc.Codec.GZip.prototype.byteAlign = function() {
this.bb = 1;
};
cc.Codec.GZip.prototype.readBit = function() {
var e;
this.bits++;
e = 1 & this.bb;
this.bb >>= 1;
if (0 === this.bb) {
this.bb = this.readByte();
e = 1 & this.bb;
this.bb = this.bb >> 1 | 128;
}
return e;
};
cc.Codec.GZip.prototype.readBits = function(e) {
for (var t = 0, o = e; o--; ) t = t << 1 | this.readBit();
e && (t = cc.Codec.GZip.bitReverse[t] >> 8 - e);
return t;
};
cc.Codec.GZip.prototype.flushBuffer = function() {
this.bIdx = 0;
};
cc.Codec.GZip.prototype.addBuffer = function(e) {
this.buf32k[this.bIdx++] = e;
this.outputArr.push(String.fromCharCode(e));
32768 === this.bIdx && (this.bIdx = 0);
};
cc.Codec.GZip.prototype.IsPat = function() {
for (;;) {
if (this.fpos[this.len] >= this.fmax) return -1;
if (this.flens[this.fpos[this.len]] === this.len) return this.fpos[this.len]++;
this.fpos[this.len]++;
}
};
cc.Codec.GZip.prototype.Rec = function() {
var e, t = this.Places[this.treepos];
if (17 === this.len) return -1;
this.treepos++;
this.len++;
if ((e = this.IsPat()) >= 0) t.b0 = e; else {
t.b0 = 32768;
if (this.Rec()) return -1;
}
if ((e = this.IsPat()) >= 0) {
t.b1 = e;
t.jump = null;
} else {
t.b1 = 32768;
t.jump = this.Places[this.treepos];
t.jumppos = this.treepos;
if (this.Rec()) return -1;
}
this.len--;
return 0;
};
cc.Codec.GZip.prototype.CreateTree = function(e, t, o, s) {
var r;
this.Places = e;
this.treepos = 0;
this.flens = o;
this.fmax = t;
for (r = 0; r < 17; r++) this.fpos[r] = 0;
this.len = 0;
return this.Rec() ? -1 : 0;
};
cc.Codec.GZip.prototype.DecodeValue = function(e) {
for (var t, o, s = 0, r = e[s]; ;) if (this.readBit()) {
if (!(32768 & r.b1)) return r.b1;
r = r.jump;
t = e.length;
for (o = 0; o < t; o++) if (e[o] === r) {
s = o;
break;
}
} else {
if (!(32768 & r.b0)) return r.b0;
r = e[++s];
}
return -1;
};
cc.Codec.GZip.prototype.DeflateLoop = function() {
var e, t, o;
do {
e = this.readBit();
if (0 === (t = this.readBits(2))) {
var s, r;
this.byteAlign();
s = this.readByte();
s |= this.readByte() << 8;
r = this.readByte();
65535 & (s ^ ~(r |= this.readByte() << 8)) && document.write("BlockLen checksum mismatch\n");
for (;s--; ) {
f = this.readByte();
this.addBuffer(f);
}
} else if (1 === t) for (;;) {
(i = cc.Codec.GZip.bitReverse[this.readBits(7)] >> 1) > 23 ? (i = i << 1 | this.readBit()) > 199 ? i = (i -= 128) << 1 | this.readBit() : (i -= 48) > 143 && (i += 136) : i += 256;
if (i < 256) this.addBuffer(i); else {
if (256 === i) break;
i -= 257;
c = this.readBits(cc.Codec.GZip.cplext[i]) + cc.Codec.GZip.cplens[i];
i = cc.Codec.GZip.bitReverse[this.readBits(5)] >> 3;
if (cc.Codec.GZip.cpdext[i] > 8) {
h = this.readBits(8);
h |= this.readBits(cc.Codec.GZip.cpdext[i] - 8) << 8;
} else h = this.readBits(cc.Codec.GZip.cpdext[i]);
h += cc.Codec.GZip.cpdist[i];
for (i = 0; i < c; i++) {
f = this.buf32k[this.bIdx - h & 32767];
this.addBuffer(f);
}
}
} else if (2 === t) {
var i, n, a, p, l, u = new Array(320);
a = 257 + this.readBits(5);
p = 1 + this.readBits(5);
l = 4 + this.readBits(4);
for (i = 0; i < 19; i++) u[i] = 0;
for (i = 0; i < l; i++) u[cc.Codec.GZip.border[i]] = this.readBits(3);
c = this.distanceTree.length;
for (o = 0; o < c; o++) this.distanceTree[o] = new cc.Codec.GZip.HufNode();
if (this.CreateTree(this.distanceTree, 19, u, 0)) {
this.flushBuffer();
return 1;
}
n = a + p;
o = 0;
for (;o < n; ) {
0;
if ((i = this.DecodeValue(this.distanceTree)) < 16) u[o++] = i; else if (16 === i) {
var g;
if (o + (i = 3 + this.readBits(2)) > n) {
this.flushBuffer();
return 1;
}
g = o ? u[o - 1] : 0;
for (;i--; ) u[o++] = g;
} else {
if (o + (i = 17 === i ? 3 + this.readBits(3) : 11 + this.readBits(7)) > n) {
this.flushBuffer();
return 1;
}
for (;i--; ) u[o++] = 0;
}
}
c = this.literalTree.length;
for (o = 0; o < c; o++) this.literalTree[o] = new cc.Codec.GZip.HufNode();
if (this.CreateTree(this.literalTree, a, u, 0)) {
this.flushBuffer();
return 1;
}
c = this.literalTree.length;
for (o = 0; o < c; o++) this.distanceTree[o] = new cc.Codec.GZip.HufNode();
var d = new Array();
for (o = a; o < u.length; o++) d[o - a] = u[o];
if (this.CreateTree(this.distanceTree, p, d, 0)) {
this.flushBuffer();
return 1;
}
for (;;) if ((i = this.DecodeValue(this.literalTree)) >= 256) {
var c, h;
if (0 === (i -= 256)) break;
i--;
c = this.readBits(cc.Codec.GZip.cplext[i]) + cc.Codec.GZip.cplens[i];
i = this.DecodeValue(this.distanceTree);
if (cc.Codec.GZip.cpdext[i] > 8) {
h = this.readBits(8);
h |= this.readBits(cc.Codec.GZip.cpdext[i] - 8) << 8;
} else h = this.readBits(cc.Codec.GZip.cpdext[i]);
h += cc.Codec.GZip.cpdist[i];
for (;c--; ) {
var f = this.buf32k[this.bIdx - h & 32767];
this.addBuffer(f);
}
} else this.addBuffer(i);
}
} while (!e);
this.flushBuffer();
this.byteAlign();
return 0;
};
cc.Codec.GZip.prototype.unzipFile = function(e) {
var t;
this.gunzip();
for (t = 0; t < this.unzipped.length; t++) if (this.unzipped[t][1] === e) return this.unzipped[t][0];
};
cc.Codec.GZip.prototype.nextFile = function() {
this.outputArr = [];
this.modeZIP = !1;
var e = [];
e[0] = this.readByte();
e[1] = this.readByte();
if (120 === e[0] && 218 === e[1]) {
this.DeflateLoop();
this.unzipped[this.files] = [ this.outputArr.join(""), "geonext.gxt" ];
this.files++;
}
if (31 === e[0] && 139 === e[1]) {
this.skipdir();
this.unzipped[this.files] = [ this.outputArr.join(""), "file" ];
this.files++;
}
if (80 === e[0] && 75 === e[1]) {
this.modeZIP = !0;
e[2] = this.readByte();
e[3] = this.readByte();
if (3 === e[2] && 4 === e[3]) {
e[0] = this.readByte();
e[1] = this.readByte();
this.gpflags = this.readByte();
this.gpflags |= this.readByte() << 8;
var t = this.readByte();
t |= this.readByte() << 8;
this.readByte();
this.readByte();
this.readByte();
this.readByte();
this.readByte();
this.readByte() << 8;
this.readByte() << 16;
this.readByte() << 24;
this.readByte();
this.readByte() << 8;
this.readByte() << 16;
this.readByte() << 24;
var o = this.readByte();
o |= this.readByte() << 8;
var s = this.readByte();
s |= this.readByte() << 8;
i = 0;
this.nameBuf = [];
for (;o--; ) {
var r = this.readByte();
"/" === r | ":" === r ? i = 0 : i < cc.Codec.GZip.NAMEMAX - 1 && (this.nameBuf[i++] = String.fromCharCode(r));
}
this.fileout || (this.fileout = this.nameBuf);
for (var i = 0; i < s; ) {
r = this.readByte();
i++;
}
if (8 === t) {
this.DeflateLoop();
this.unzipped[this.files] = [ this.outputArr.join(""), this.nameBuf.join("") ];
this.files++;
}
this.skipdir();
}
}
};
cc.Codec.GZip.prototype.skipdir = function() {
var e, t, o = [];
if (8 & this.gpflags) {
o[0] = this.readByte();
o[1] = this.readByte();
o[2] = this.readByte();
o[3] = this.readByte();
this.readByte();
this.readByte() << 8;
this.readByte() << 16;
this.readByte() << 24;
this.readByte();
this.readByte() << 8;
this.readByte() << 16;
this.readByte() << 24;
}
this.modeZIP && this.nextFile();
o[0] = this.readByte();
if (8 !== o[0]) return 0;
this.gpflags = this.readByte();
this.readByte();
this.readByte();
this.readByte();
this.readByte();
this.readByte();
this.readByte();
if (4 & this.gpflags) {
o[0] = this.readByte();
o[2] = this.readByte();
this.len = o[0] + 256 * o[1];
for (e = 0; e < this.len; e++) this.readByte();
}
if (8 & this.gpflags) {
e = 0;
this.nameBuf = [];
for (;t = this.readByte(); ) {
"7" !== t && ":" !== t || (e = 0);
e < cc.Codec.GZip.NAMEMAX - 1 && (this.nameBuf[e++] = t);
}
}
if (16 & this.gpflags) for (;t = this.readByte(); ) ;
if (2 & this.gpflags) {
this.readByte();
this.readByte();
}
this.DeflateLoop();
this.readByte();
this.readByte() << 8;
this.readByte() << 16;
this.readByte() << 24;
this.modeZIP && this.nextFile();
};
cc._RF.pop();
}, {} ],
initialize_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e9299ELMN1NrLMWDUOzu85/", "initialize_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINInitializeRequest", null, i);
r.exportSymbol("proto.BINInitializeResponse", null, i);
proto.BINInitializeRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINInitializeRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINInitializeRequest.displayName = "proto.BINInitializeRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINInitializeRequest.prototype.toObject = function(e) {
return proto.BINInitializeRequest.toObject(e, this);
};
proto.BINInitializeRequest.toObject = function(e, t) {
var o = {
cp: s.Message.getField(t, 1),
appversion: s.Message.getField(t, 2),
deviceid: s.Message.getField(t, 3),
deviceinfo: s.Message.getField(t, 4),
country: s.Message.getField(t, 5),
language: s.Message.getField(t, 6),
pakagename: s.Message.getField(t, 7),
liteversion: s.Message.getField(t, 8),
referencecode: s.Message.getField(t, 9)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINInitializeRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINInitializeRequest();
return proto.BINInitializeRequest.deserializeBinaryFromReader(o, t);
};
proto.BINInitializeRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setCp(o);
break;

case 2:
o = t.readString();
e.setAppversion(o);
break;

case 3:
o = t.readString();
e.setDeviceid(o);
break;

case 4:
o = t.readString();
e.setDeviceinfo(o);
break;

case 5:
o = t.readString();
e.setCountry(o);
break;

case 6:
o = t.readString();
e.setLanguage(o);
break;

case 7:
o = t.readString();
e.setPakagename(o);
break;

case 8:
o = t.readBool();
e.setLiteversion(o);
break;

case 9:
var o = t.readString();
e.setReferencecode(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINInitializeRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINInitializeRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINInitializeRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeString(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeString(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeBool(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeString(9, t);
};
proto.BINInitializeRequest.prototype.getCp = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINInitializeRequest.prototype.setCp = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINInitializeRequest.prototype.clearCp = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINInitializeRequest.prototype.hasCp = function() {
return null != s.Message.getField(this, 1);
};
proto.BINInitializeRequest.prototype.getAppversion = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINInitializeRequest.prototype.setAppversion = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINInitializeRequest.prototype.clearAppversion = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINInitializeRequest.prototype.hasAppversion = function() {
return null != s.Message.getField(this, 2);
};
proto.BINInitializeRequest.prototype.getDeviceid = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINInitializeRequest.prototype.setDeviceid = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINInitializeRequest.prototype.clearDeviceid = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINInitializeRequest.prototype.hasDeviceid = function() {
return null != s.Message.getField(this, 3);
};
proto.BINInitializeRequest.prototype.getDeviceinfo = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINInitializeRequest.prototype.setDeviceinfo = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINInitializeRequest.prototype.clearDeviceinfo = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINInitializeRequest.prototype.hasDeviceinfo = function() {
return null != s.Message.getField(this, 4);
};
proto.BINInitializeRequest.prototype.getCountry = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINInitializeRequest.prototype.setCountry = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINInitializeRequest.prototype.clearCountry = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINInitializeRequest.prototype.hasCountry = function() {
return null != s.Message.getField(this, 5);
};
proto.BINInitializeRequest.prototype.getLanguage = function() {
return s.Message.getFieldWithDefault(this, 6, "");
};
proto.BINInitializeRequest.prototype.setLanguage = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINInitializeRequest.prototype.clearLanguage = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINInitializeRequest.prototype.hasLanguage = function() {
return null != s.Message.getField(this, 6);
};
proto.BINInitializeRequest.prototype.getPakagename = function() {
return s.Message.getFieldWithDefault(this, 7, "");
};
proto.BINInitializeRequest.prototype.setPakagename = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINInitializeRequest.prototype.clearPakagename = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINInitializeRequest.prototype.hasPakagename = function() {
return null != s.Message.getField(this, 7);
};
proto.BINInitializeRequest.prototype.getLiteversion = function() {
return s.Message.getFieldWithDefault(this, 8, !1);
};
proto.BINInitializeRequest.prototype.setLiteversion = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINInitializeRequest.prototype.clearLiteversion = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINInitializeRequest.prototype.hasLiteversion = function() {
return null != s.Message.getField(this, 8);
};
proto.BINInitializeRequest.prototype.getReferencecode = function() {
return s.Message.getFieldWithDefault(this, 9, "");
};
proto.BINInitializeRequest.prototype.setReferencecode = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINInitializeRequest.prototype.clearReferencecode = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINInitializeRequest.prototype.hasReferencecode = function() {
return null != s.Message.getField(this, 9);
};
proto.BINInitializeResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINInitializeResponse.repeatedFields_, null);
};
r.inherits(proto.BINInitializeResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINInitializeResponse.displayName = "proto.BINInitializeResponse");
proto.BINInitializeResponse.repeatedFields_ = [ 16, 19 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINInitializeResponse.prototype.toObject = function(e) {
return proto.BINInitializeResponse.toObject(e, this);
};
proto.BINInitializeResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
currentappversion: s.Message.getField(t, 3),
downloadurl: s.Message.getField(t, 4),
cashcurrency: s.Message.getField(t, 5),
goldcurrency: s.Message.getField(t, 6),
forceupdate: s.Message.getField(t, 7),
enablequickplay: s.Message.getField(t, 8),
enablecashsystem: s.Message.getField(t, 9),
enablepurchasecash: s.Message.getField(t, 10),
enabletopup: s.Message.getField(t, 11),
enablecashtogold: s.Message.getField(t, 12),
enablecashtransfer: s.Message.getField(t, 13),
enablegiftcode: s.Message.getField(t, 14),
cashtogoldratio: s.Message.getField(t, 15),
hotlinesList: s.Message.getField(t, 16),
fanpageurl: s.Message.getField(t, 17),
websiteurl: s.Message.getField(t, 18),
enablegameidsList: s.Message.getField(t, 19),
resetpwsmssyntax: s.Message.getField(t, 20)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINInitializeResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINInitializeResponse();
return proto.BINInitializeResponse.deserializeBinaryFromReader(o, t);
};
proto.BINInitializeResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readString();
e.setCurrentappversion(o);
break;

case 4:
o = t.readString();
e.setDownloadurl(o);
break;

case 5:
o = t.readString();
e.setCashcurrency(o);
break;

case 6:
o = t.readString();
e.setGoldcurrency(o);
break;

case 7:
o = t.readBool();
e.setForceupdate(o);
break;

case 8:
o = t.readBool();
e.setEnablequickplay(o);
break;

case 9:
o = t.readBool();
e.setEnablecashsystem(o);
break;

case 10:
o = t.readBool();
e.setEnablepurchasecash(o);
break;

case 11:
o = t.readBool();
e.setEnabletopup(o);
break;

case 12:
o = t.readBool();
e.setEnablecashtogold(o);
break;

case 13:
o = t.readBool();
e.setEnablecashtransfer(o);
break;

case 14:
o = t.readBool();
e.setEnablegiftcode(o);
break;

case 15:
o = t.readInt32();
e.setCashtogoldratio(o);
break;

case 16:
o = t.readString();
e.addHotlines(o);
break;

case 17:
o = t.readString();
e.setFanpageurl(o);
break;

case 18:
o = t.readString();
e.setWebsiteurl(o);
break;

case 19:
o = t.readInt32();
e.addEnablegameids(o);
break;

case 20:
var o = t.readString();
e.setResetpwsmssyntax(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINInitializeResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINInitializeResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINInitializeResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeString(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeBool(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeBool(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeBool(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeBool(10, t);
null != (t = s.Message.getField(this, 11)) && e.writeBool(11, t);
null != (t = s.Message.getField(this, 12)) && e.writeBool(12, t);
null != (t = s.Message.getField(this, 13)) && e.writeBool(13, t);
null != (t = s.Message.getField(this, 14)) && e.writeBool(14, t);
null != (t = s.Message.getField(this, 15)) && e.writeInt32(15, t);
(t = this.getHotlinesList()).length > 0 && e.writeRepeatedString(16, t);
null != (t = s.Message.getField(this, 17)) && e.writeString(17, t);
null != (t = s.Message.getField(this, 18)) && e.writeString(18, t);
(t = this.getEnablegameidsList()).length > 0 && e.writeRepeatedInt32(19, t);
null != (t = s.Message.getField(this, 20)) && e.writeString(20, t);
};
proto.BINInitializeResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINInitializeResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINInitializeResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINInitializeResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINInitializeResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINInitializeResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINInitializeResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINInitializeResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINInitializeResponse.prototype.getCurrentappversion = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINInitializeResponse.prototype.setCurrentappversion = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINInitializeResponse.prototype.clearCurrentappversion = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINInitializeResponse.prototype.hasCurrentappversion = function() {
return null != s.Message.getField(this, 3);
};
proto.BINInitializeResponse.prototype.getDownloadurl = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINInitializeResponse.prototype.setDownloadurl = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINInitializeResponse.prototype.clearDownloadurl = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINInitializeResponse.prototype.hasDownloadurl = function() {
return null != s.Message.getField(this, 4);
};
proto.BINInitializeResponse.prototype.getCashcurrency = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINInitializeResponse.prototype.setCashcurrency = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINInitializeResponse.prototype.clearCashcurrency = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINInitializeResponse.prototype.hasCashcurrency = function() {
return null != s.Message.getField(this, 5);
};
proto.BINInitializeResponse.prototype.getGoldcurrency = function() {
return s.Message.getFieldWithDefault(this, 6, "");
};
proto.BINInitializeResponse.prototype.setGoldcurrency = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINInitializeResponse.prototype.clearGoldcurrency = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINInitializeResponse.prototype.hasGoldcurrency = function() {
return null != s.Message.getField(this, 6);
};
proto.BINInitializeResponse.prototype.getForceupdate = function() {
return s.Message.getFieldWithDefault(this, 7, !1);
};
proto.BINInitializeResponse.prototype.setForceupdate = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINInitializeResponse.prototype.clearForceupdate = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINInitializeResponse.prototype.hasForceupdate = function() {
return null != s.Message.getField(this, 7);
};
proto.BINInitializeResponse.prototype.getEnablequickplay = function() {
return s.Message.getFieldWithDefault(this, 8, !1);
};
proto.BINInitializeResponse.prototype.setEnablequickplay = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINInitializeResponse.prototype.clearEnablequickplay = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINInitializeResponse.prototype.hasEnablequickplay = function() {
return null != s.Message.getField(this, 8);
};
proto.BINInitializeResponse.prototype.getEnablecashsystem = function() {
return s.Message.getFieldWithDefault(this, 9, !1);
};
proto.BINInitializeResponse.prototype.setEnablecashsystem = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINInitializeResponse.prototype.clearEnablecashsystem = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINInitializeResponse.prototype.hasEnablecashsystem = function() {
return null != s.Message.getField(this, 9);
};
proto.BINInitializeResponse.prototype.getEnablepurchasecash = function() {
return s.Message.getFieldWithDefault(this, 10, !1);
};
proto.BINInitializeResponse.prototype.setEnablepurchasecash = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINInitializeResponse.prototype.clearEnablepurchasecash = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINInitializeResponse.prototype.hasEnablepurchasecash = function() {
return null != s.Message.getField(this, 10);
};
proto.BINInitializeResponse.prototype.getEnabletopup = function() {
return s.Message.getFieldWithDefault(this, 11, !1);
};
proto.BINInitializeResponse.prototype.setEnabletopup = function(e) {
s.Message.setField(this, 11, e);
};
proto.BINInitializeResponse.prototype.clearEnabletopup = function() {
s.Message.setField(this, 11, void 0);
};
proto.BINInitializeResponse.prototype.hasEnabletopup = function() {
return null != s.Message.getField(this, 11);
};
proto.BINInitializeResponse.prototype.getEnablecashtogold = function() {
return s.Message.getFieldWithDefault(this, 12, !1);
};
proto.BINInitializeResponse.prototype.setEnablecashtogold = function(e) {
s.Message.setField(this, 12, e);
};
proto.BINInitializeResponse.prototype.clearEnablecashtogold = function() {
s.Message.setField(this, 12, void 0);
};
proto.BINInitializeResponse.prototype.hasEnablecashtogold = function() {
return null != s.Message.getField(this, 12);
};
proto.BINInitializeResponse.prototype.getEnablecashtransfer = function() {
return s.Message.getFieldWithDefault(this, 13, !1);
};
proto.BINInitializeResponse.prototype.setEnablecashtransfer = function(e) {
s.Message.setField(this, 13, e);
};
proto.BINInitializeResponse.prototype.clearEnablecashtransfer = function() {
s.Message.setField(this, 13, void 0);
};
proto.BINInitializeResponse.prototype.hasEnablecashtransfer = function() {
return null != s.Message.getField(this, 13);
};
proto.BINInitializeResponse.prototype.getEnablegiftcode = function() {
return s.Message.getFieldWithDefault(this, 14, !1);
};
proto.BINInitializeResponse.prototype.setEnablegiftcode = function(e) {
s.Message.setField(this, 14, e);
};
proto.BINInitializeResponse.prototype.clearEnablegiftcode = function() {
s.Message.setField(this, 14, void 0);
};
proto.BINInitializeResponse.prototype.hasEnablegiftcode = function() {
return null != s.Message.getField(this, 14);
};
proto.BINInitializeResponse.prototype.getCashtogoldratio = function() {
return s.Message.getFieldWithDefault(this, 15, 0);
};
proto.BINInitializeResponse.prototype.setCashtogoldratio = function(e) {
s.Message.setField(this, 15, e);
};
proto.BINInitializeResponse.prototype.clearCashtogoldratio = function() {
s.Message.setField(this, 15, void 0);
};
proto.BINInitializeResponse.prototype.hasCashtogoldratio = function() {
return null != s.Message.getField(this, 15);
};
proto.BINInitializeResponse.prototype.getHotlinesList = function() {
return s.Message.getField(this, 16);
};
proto.BINInitializeResponse.prototype.setHotlinesList = function(e) {
s.Message.setField(this, 16, e || []);
};
proto.BINInitializeResponse.prototype.addHotlines = function(e, t) {
s.Message.addToRepeatedField(this, 16, e, t);
};
proto.BINInitializeResponse.prototype.clearHotlinesList = function() {
this.setHotlinesList([]);
};
proto.BINInitializeResponse.prototype.getFanpageurl = function() {
return s.Message.getFieldWithDefault(this, 17, "");
};
proto.BINInitializeResponse.prototype.setFanpageurl = function(e) {
s.Message.setField(this, 17, e);
};
proto.BINInitializeResponse.prototype.clearFanpageurl = function() {
s.Message.setField(this, 17, void 0);
};
proto.BINInitializeResponse.prototype.hasFanpageurl = function() {
return null != s.Message.getField(this, 17);
};
proto.BINInitializeResponse.prototype.getWebsiteurl = function() {
return s.Message.getFieldWithDefault(this, 18, "");
};
proto.BINInitializeResponse.prototype.setWebsiteurl = function(e) {
s.Message.setField(this, 18, e);
};
proto.BINInitializeResponse.prototype.clearWebsiteurl = function() {
s.Message.setField(this, 18, void 0);
};
proto.BINInitializeResponse.prototype.hasWebsiteurl = function() {
return null != s.Message.getField(this, 18);
};
proto.BINInitializeResponse.prototype.getEnablegameidsList = function() {
return s.Message.getField(this, 19);
};
proto.BINInitializeResponse.prototype.setEnablegameidsList = function(e) {
s.Message.setField(this, 19, e || []);
};
proto.BINInitializeResponse.prototype.addEnablegameids = function(e, t) {
s.Message.addToRepeatedField(this, 19, e, t);
};
proto.BINInitializeResponse.prototype.clearEnablegameidsList = function() {
this.setEnablegameidsList([]);
};
proto.BINInitializeResponse.prototype.getResetpwsmssyntax = function() {
return s.Message.getFieldWithDefault(this, 20, "");
};
proto.BINInitializeResponse.prototype.setResetpwsmssyntax = function(e) {
s.Message.setField(this, 20, e);
};
proto.BINInitializeResponse.prototype.clearResetpwsmssyntax = function() {
s.Message.setField(this, 20, void 0);
};
proto.BINInitializeResponse.prototype.hasResetpwsmssyntax = function() {
return null != s.Message.getField(this, 20);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
instant_message_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0de66kzyjJDJrZCRSB5wlLo", "instant_message_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINInstantMessage", null, i);
r.exportSymbol("proto.BINInstantMessageHistoryRequest", null, i);
r.exportSymbol("proto.BINInstantMessageHistoryResponse", null, i);
r.exportSymbol("proto.BINInstantMessageRequest", null, i);
r.exportSymbol("proto.BINInstantMessageResponse", null, i);
proto.BINInstantMessageRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINInstantMessageRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINInstantMessageRequest.displayName = "proto.BINInstantMessageRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINInstantMessageRequest.prototype.toObject = function(e) {
return proto.BINInstantMessageRequest.toObject(e, this);
};
proto.BINInstantMessageRequest.toObject = function(e, t) {
var o = {
scope: s.Message.getField(t, 1),
instantmessage: s.Message.getField(t, 2),
receiverusername: s.Message.getField(t, 3),
receiveruserid: s.Message.getField(t, 4),
textemoticonid: s.Message.getField(t, 5)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINInstantMessageRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINInstantMessageRequest();
return proto.BINInstantMessageRequest.deserializeBinaryFromReader(o, t);
};
proto.BINInstantMessageRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setScope(o);
break;

case 2:
o = t.readString();
e.setInstantmessage(o);
break;

case 3:
o = t.readString();
e.setReceiverusername(o);
break;

case 4:
o = t.readInt64();
e.setReceiveruserid(o);
break;

case 5:
var o = t.readInt32();
e.setTextemoticonid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINInstantMessageRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINInstantMessageRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINInstantMessageRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
};
proto.BINInstantMessageRequest.prototype.getScope = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINInstantMessageRequest.prototype.setScope = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINInstantMessageRequest.prototype.clearScope = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINInstantMessageRequest.prototype.hasScope = function() {
return null != s.Message.getField(this, 1);
};
proto.BINInstantMessageRequest.prototype.getInstantmessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINInstantMessageRequest.prototype.setInstantmessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINInstantMessageRequest.prototype.clearInstantmessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINInstantMessageRequest.prototype.hasInstantmessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINInstantMessageRequest.prototype.getReceiverusername = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINInstantMessageRequest.prototype.setReceiverusername = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINInstantMessageRequest.prototype.clearReceiverusername = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINInstantMessageRequest.prototype.hasReceiverusername = function() {
return null != s.Message.getField(this, 3);
};
proto.BINInstantMessageRequest.prototype.getReceiveruserid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINInstantMessageRequest.prototype.setReceiveruserid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINInstantMessageRequest.prototype.clearReceiveruserid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINInstantMessageRequest.prototype.hasReceiveruserid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINInstantMessageRequest.prototype.getTextemoticonid = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINInstantMessageRequest.prototype.setTextemoticonid = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINInstantMessageRequest.prototype.clearTextemoticonid = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINInstantMessageRequest.prototype.hasTextemoticonid = function() {
return null != s.Message.getField(this, 5);
};
proto.BINInstantMessageResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINInstantMessageResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINInstantMessageResponse.displayName = "proto.BINInstantMessageResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINInstantMessageResponse.prototype.toObject = function(e) {
return proto.BINInstantMessageResponse.toObject(e, this);
};
proto.BINInstantMessageResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
scope: s.Message.getField(t, 3),
senderusername: s.Message.getField(t, 4),
senderuserid: s.Message.getField(t, 5),
instantmessage: s.Message.getField(t, 6),
senttime: s.Message.getField(t, 7),
zoneid: s.Message.getField(t, 8),
roomindex: s.Message.getField(t, 9),
receiverusername: s.Message.getField(t, 10),
receiveruserid: s.Message.getField(t, 11),
textemoticonid: s.Message.getField(t, 12),
colorcode: s.Message.getField(t, 13)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINInstantMessageResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINInstantMessageResponse();
return proto.BINInstantMessageResponse.deserializeBinaryFromReader(o, t);
};
proto.BINInstantMessageResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt32();
e.setScope(o);
break;

case 4:
o = t.readString();
e.setSenderusername(o);
break;

case 5:
o = t.readInt64();
e.setSenderuserid(o);
break;

case 6:
o = t.readString();
e.setInstantmessage(o);
break;

case 7:
o = t.readInt64();
e.setSenttime(o);
break;

case 8:
o = t.readInt32();
e.setZoneid(o);
break;

case 9:
o = t.readInt32();
e.setRoomindex(o);
break;

case 10:
o = t.readString();
e.setReceiverusername(o);
break;

case 11:
o = t.readInt64();
e.setReceiveruserid(o);
break;

case 12:
o = t.readInt32();
e.setTextemoticonid(o);
break;

case 13:
var o = t.readString();
e.setColorcode(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINInstantMessageResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINInstantMessageResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINInstantMessageResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt64(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeString(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt64(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeInt32(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeInt32(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeString(10, t);
null != (t = s.Message.getField(this, 11)) && e.writeInt64(11, t);
null != (t = s.Message.getField(this, 12)) && e.writeInt32(12, t);
null != (t = s.Message.getField(this, 13)) && e.writeString(13, t);
};
proto.BINInstantMessageResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINInstantMessageResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINInstantMessageResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINInstantMessageResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINInstantMessageResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINInstantMessageResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINInstantMessageResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINInstantMessageResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINInstantMessageResponse.prototype.getScope = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINInstantMessageResponse.prototype.setScope = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINInstantMessageResponse.prototype.clearScope = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINInstantMessageResponse.prototype.hasScope = function() {
return null != s.Message.getField(this, 3);
};
proto.BINInstantMessageResponse.prototype.getSenderusername = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINInstantMessageResponse.prototype.setSenderusername = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINInstantMessageResponse.prototype.clearSenderusername = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINInstantMessageResponse.prototype.hasSenderusername = function() {
return null != s.Message.getField(this, 4);
};
proto.BINInstantMessageResponse.prototype.getSenderuserid = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINInstantMessageResponse.prototype.setSenderuserid = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINInstantMessageResponse.prototype.clearSenderuserid = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINInstantMessageResponse.prototype.hasSenderuserid = function() {
return null != s.Message.getField(this, 5);
};
proto.BINInstantMessageResponse.prototype.getInstantmessage = function() {
return s.Message.getFieldWithDefault(this, 6, "");
};
proto.BINInstantMessageResponse.prototype.setInstantmessage = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINInstantMessageResponse.prototype.clearInstantmessage = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINInstantMessageResponse.prototype.hasInstantmessage = function() {
return null != s.Message.getField(this, 6);
};
proto.BINInstantMessageResponse.prototype.getSenttime = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINInstantMessageResponse.prototype.setSenttime = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINInstantMessageResponse.prototype.clearSenttime = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINInstantMessageResponse.prototype.hasSenttime = function() {
return null != s.Message.getField(this, 7);
};
proto.BINInstantMessageResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 8, 0);
};
proto.BINInstantMessageResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINInstantMessageResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINInstantMessageResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 8);
};
proto.BINInstantMessageResponse.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 9, 0);
};
proto.BINInstantMessageResponse.prototype.setRoomindex = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINInstantMessageResponse.prototype.clearRoomindex = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINInstantMessageResponse.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 9);
};
proto.BINInstantMessageResponse.prototype.getReceiverusername = function() {
return s.Message.getFieldWithDefault(this, 10, "");
};
proto.BINInstantMessageResponse.prototype.setReceiverusername = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINInstantMessageResponse.prototype.clearReceiverusername = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINInstantMessageResponse.prototype.hasReceiverusername = function() {
return null != s.Message.getField(this, 10);
};
proto.BINInstantMessageResponse.prototype.getReceiveruserid = function() {
return s.Message.getFieldWithDefault(this, 11, 0);
};
proto.BINInstantMessageResponse.prototype.setReceiveruserid = function(e) {
s.Message.setField(this, 11, e);
};
proto.BINInstantMessageResponse.prototype.clearReceiveruserid = function() {
s.Message.setField(this, 11, void 0);
};
proto.BINInstantMessageResponse.prototype.hasReceiveruserid = function() {
return null != s.Message.getField(this, 11);
};
proto.BINInstantMessageResponse.prototype.getTextemoticonid = function() {
return s.Message.getFieldWithDefault(this, 12, 0);
};
proto.BINInstantMessageResponse.prototype.setTextemoticonid = function(e) {
s.Message.setField(this, 12, e);
};
proto.BINInstantMessageResponse.prototype.clearTextemoticonid = function() {
s.Message.setField(this, 12, void 0);
};
proto.BINInstantMessageResponse.prototype.hasTextemoticonid = function() {
return null != s.Message.getField(this, 12);
};
proto.BINInstantMessageResponse.prototype.getColorcode = function() {
return s.Message.getFieldWithDefault(this, 13, "");
};
proto.BINInstantMessageResponse.prototype.setColorcode = function(e) {
s.Message.setField(this, 13, e);
};
proto.BINInstantMessageResponse.prototype.clearColorcode = function() {
s.Message.setField(this, 13, void 0);
};
proto.BINInstantMessageResponse.prototype.hasColorcode = function() {
return null != s.Message.getField(this, 13);
};
proto.BINInstantMessage = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINInstantMessage, s.Message);
r.DEBUG && !COMPILED && (proto.BINInstantMessage.displayName = "proto.BINInstantMessage");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINInstantMessage.prototype.toObject = function(e) {
return proto.BINInstantMessage.toObject(e, this);
};
proto.BINInstantMessage.toObject = function(e, t) {
var o = {
sendername: s.Message.getField(t, 1),
senderuserid: s.Message.getField(t, 2),
instantmessage: s.Message.getField(t, 3),
senttime: s.Message.getField(t, 4),
recipientname: s.Message.getField(t, 5),
recipientuserid: s.Message.getField(t, 6),
textemoticonid: s.Message.getField(t, 7),
colorcode: s.Message.getField(t, 8)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINInstantMessage.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINInstantMessage();
return proto.BINInstantMessage.deserializeBinaryFromReader(o, t);
};
proto.BINInstantMessage.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setSendername(o);
break;

case 2:
o = t.readInt64();
e.setSenderuserid(o);
break;

case 3:
o = t.readString();
e.setInstantmessage(o);
break;

case 4:
o = t.readInt64();
e.setSenttime(o);
break;

case 5:
o = t.readString();
e.setRecipientname(o);
break;

case 6:
o = t.readInt64();
e.setRecipientuserid(o);
break;

case 7:
o = t.readInt32();
e.setTextemoticonid(o);
break;

case 8:
var o = t.readString();
e.setColorcode(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINInstantMessage.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINInstantMessage.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINInstantMessage.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt64(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt64(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt32(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeString(8, t);
};
proto.BINInstantMessage.prototype.getSendername = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINInstantMessage.prototype.setSendername = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINInstantMessage.prototype.clearSendername = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINInstantMessage.prototype.hasSendername = function() {
return null != s.Message.getField(this, 1);
};
proto.BINInstantMessage.prototype.getSenderuserid = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINInstantMessage.prototype.setSenderuserid = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINInstantMessage.prototype.clearSenderuserid = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINInstantMessage.prototype.hasSenderuserid = function() {
return null != s.Message.getField(this, 2);
};
proto.BINInstantMessage.prototype.getInstantmessage = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINInstantMessage.prototype.setInstantmessage = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINInstantMessage.prototype.clearInstantmessage = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINInstantMessage.prototype.hasInstantmessage = function() {
return null != s.Message.getField(this, 3);
};
proto.BINInstantMessage.prototype.getSenttime = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINInstantMessage.prototype.setSenttime = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINInstantMessage.prototype.clearSenttime = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINInstantMessage.prototype.hasSenttime = function() {
return null != s.Message.getField(this, 4);
};
proto.BINInstantMessage.prototype.getRecipientname = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINInstantMessage.prototype.setRecipientname = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINInstantMessage.prototype.clearRecipientname = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINInstantMessage.prototype.hasRecipientname = function() {
return null != s.Message.getField(this, 5);
};
proto.BINInstantMessage.prototype.getRecipientuserid = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINInstantMessage.prototype.setRecipientuserid = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINInstantMessage.prototype.clearRecipientuserid = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINInstantMessage.prototype.hasRecipientuserid = function() {
return null != s.Message.getField(this, 6);
};
proto.BINInstantMessage.prototype.getTextemoticonid = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINInstantMessage.prototype.setTextemoticonid = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINInstantMessage.prototype.clearTextemoticonid = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINInstantMessage.prototype.hasTextemoticonid = function() {
return null != s.Message.getField(this, 7);
};
proto.BINInstantMessage.prototype.getColorcode = function() {
return s.Message.getFieldWithDefault(this, 8, "");
};
proto.BINInstantMessage.prototype.setColorcode = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINInstantMessage.prototype.clearColorcode = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINInstantMessage.prototype.hasColorcode = function() {
return null != s.Message.getField(this, 8);
};
proto.BINInstantMessageHistoryRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINInstantMessageHistoryRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINInstantMessageHistoryRequest.displayName = "proto.BINInstantMessageHistoryRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINInstantMessageHistoryRequest.prototype.toObject = function(e) {
return proto.BINInstantMessageHistoryRequest.toObject(e, this);
};
proto.BINInstantMessageHistoryRequest.toObject = function(e, t) {
var o = {
scope: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINInstantMessageHistoryRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINInstantMessageHistoryRequest();
return proto.BINInstantMessageHistoryRequest.deserializeBinaryFromReader(o, t);
};
proto.BINInstantMessageHistoryRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setScope(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINInstantMessageHistoryRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINInstantMessageHistoryRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINInstantMessageHistoryRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINInstantMessageHistoryRequest.prototype.getScope = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINInstantMessageHistoryRequest.prototype.setScope = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINInstantMessageHistoryRequest.prototype.clearScope = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINInstantMessageHistoryRequest.prototype.hasScope = function() {
return null != s.Message.getField(this, 1);
};
proto.BINInstantMessageHistoryResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINInstantMessageHistoryResponse.repeatedFields_, null);
};
r.inherits(proto.BINInstantMessageHistoryResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINInstantMessageHistoryResponse.displayName = "proto.BINInstantMessageHistoryResponse");
proto.BINInstantMessageHistoryResponse.repeatedFields_ = [ 6 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINInstantMessageHistoryResponse.prototype.toObject = function(e) {
return proto.BINInstantMessageHistoryResponse.toObject(e, this);
};
proto.BINInstantMessageHistoryResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
scope: s.Message.getField(t, 3),
zoneid: s.Message.getField(t, 4),
roomindex: s.Message.getField(t, 5),
instantmessagesList: s.Message.toObjectList(t.getInstantmessagesList(), proto.BINInstantMessage.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINInstantMessageHistoryResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINInstantMessageHistoryResponse();
return proto.BINInstantMessageHistoryResponse.deserializeBinaryFromReader(o, t);
};
proto.BINInstantMessageHistoryResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt32();
e.setScope(o);
break;

case 4:
o = t.readInt32();
e.setZoneid(o);
break;

case 5:
o = t.readInt32();
e.setRoomindex(o);
break;

case 6:
var o = new proto.BINInstantMessage();
t.readMessage(o, proto.BINInstantMessage.deserializeBinaryFromReader);
e.addInstantmessages(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINInstantMessageHistoryResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINInstantMessageHistoryResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINInstantMessageHistoryResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
(t = this.getInstantmessagesList()).length > 0 && e.writeRepeatedMessage(6, t, proto.BINInstantMessage.serializeBinaryToWriter);
};
proto.BINInstantMessageHistoryResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINInstantMessageHistoryResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINInstantMessageHistoryResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINInstantMessageHistoryResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINInstantMessageHistoryResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINInstantMessageHistoryResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINInstantMessageHistoryResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINInstantMessageHistoryResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINInstantMessageHistoryResponse.prototype.getScope = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINInstantMessageHistoryResponse.prototype.setScope = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINInstantMessageHistoryResponse.prototype.clearScope = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINInstantMessageHistoryResponse.prototype.hasScope = function() {
return null != s.Message.getField(this, 3);
};
proto.BINInstantMessageHistoryResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINInstantMessageHistoryResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINInstantMessageHistoryResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINInstantMessageHistoryResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINInstantMessageHistoryResponse.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINInstantMessageHistoryResponse.prototype.setRoomindex = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINInstantMessageHistoryResponse.prototype.clearRoomindex = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINInstantMessageHistoryResponse.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 5);
};
proto.BINInstantMessageHistoryResponse.prototype.getInstantmessagesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINInstantMessage, 6);
};
proto.BINInstantMessageHistoryResponse.prototype.setInstantmessagesList = function(e) {
s.Message.setRepeatedWrapperField(this, 6, e);
};
proto.BINInstantMessageHistoryResponse.prototype.addInstantmessages = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 6, e, proto.BINInstantMessage, t);
};
proto.BINInstantMessageHistoryResponse.prototype.clearInstantmessagesList = function() {
this.setInstantmessagesList([]);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
jar_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "ae9c02Lc+dI4797cTG7ZyIp", "jar_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./map_field_entry_pb.js");
r.exportSymbol("proto.BINJarInfo", null, i);
r.exportSymbol("proto.BINJarRequest", null, i);
r.exportSymbol("proto.BINJarResponse", null, i);
proto.BINJarRequest = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINJarRequest.repeatedFields_, null);
};
r.inherits(proto.BINJarRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINJarRequest.displayName = "proto.BINJarRequest");
proto.BINJarRequest.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINJarRequest.prototype.toObject = function(e) {
return proto.BINJarRequest.toObject(e, this);
};
proto.BINJarRequest.toObject = function(e, t) {
var o = {
zoneid: s.Message.getField(t, 1),
jartype: s.Message.getField(t, 2),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINJarRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINJarRequest();
return proto.BINJarRequest.deserializeBinaryFromReader(o, t);
};
proto.BINJarRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setZoneid(o);
break;

case 2:
o = t.readInt32();
e.setJartype(o);
break;

case 3:
var o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINJarRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINJarRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINJarRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(3, t, n.BINMapFieldEntry.serializeBinaryToWriter);
};
proto.BINJarRequest.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINJarRequest.prototype.setZoneid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINJarRequest.prototype.clearZoneid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINJarRequest.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINJarRequest.prototype.getJartype = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINJarRequest.prototype.setJartype = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINJarRequest.prototype.clearJartype = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINJarRequest.prototype.hasJartype = function() {
return null != s.Message.getField(this, 2);
};
proto.BINJarRequest.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 3);
};
proto.BINJarRequest.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINJarRequest.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINMapFieldEntry, t);
};
proto.BINJarRequest.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINJarResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINJarResponse.repeatedFields_, null);
};
r.inherits(proto.BINJarResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINJarResponse.displayName = "proto.BINJarResponse");
proto.BINJarResponse.repeatedFields_ = [ 4, 5 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINJarResponse.prototype.toObject = function(e) {
return proto.BINJarResponse.toObject(e, this);
};
proto.BINJarResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
jarvalue: s.Message.getField(t, 3),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e),
jarinfoList: s.Message.toObjectList(t.getJarinfoList(), proto.BINJarInfo.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINJarResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINJarResponse();
return proto.BINJarResponse.deserializeBinaryFromReader(o, t);
};
proto.BINJarResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt64();
e.setJarvalue(o);
break;

case 4:
o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

case 5:
var o = new proto.BINJarInfo();
t.readMessage(o, proto.BINJarInfo.deserializeBinaryFromReader);
e.addJarinfo(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINJarResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINJarResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINJarResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(4, t, n.BINMapFieldEntry.serializeBinaryToWriter);
(t = this.getJarinfoList()).length > 0 && e.writeRepeatedMessage(5, t, proto.BINJarInfo.serializeBinaryToWriter);
};
proto.BINJarResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINJarResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINJarResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINJarResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINJarResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINJarResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINJarResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINJarResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINJarResponse.prototype.getJarvalue = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINJarResponse.prototype.setJarvalue = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINJarResponse.prototype.clearJarvalue = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINJarResponse.prototype.hasJarvalue = function() {
return null != s.Message.getField(this, 3);
};
proto.BINJarResponse.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 4);
};
proto.BINJarResponse.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 4, e);
};
proto.BINJarResponse.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 4, e, proto.BINMapFieldEntry, t);
};
proto.BINJarResponse.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINJarResponse.prototype.getJarinfoList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINJarInfo, 5);
};
proto.BINJarResponse.prototype.setJarinfoList = function(e) {
s.Message.setRepeatedWrapperField(this, 5, e);
};
proto.BINJarResponse.prototype.addJarinfo = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 5, e, proto.BINJarInfo, t);
};
proto.BINJarResponse.prototype.clearJarinfoList = function() {
this.setJarinfoList([]);
};
proto.BINJarInfo = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINJarInfo, s.Message);
r.DEBUG && !COMPILED && (proto.BINJarInfo.displayName = "proto.BINJarInfo");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINJarInfo.prototype.toObject = function(e) {
return proto.BINJarInfo.toObject(e, this);
};
proto.BINJarInfo.toObject = function(e, t) {
var o = {
gameid: s.Message.getField(t, 1),
value: s.Message.getField(t, 2),
jartype: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINJarInfo.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINJarInfo();
return proto.BINJarInfo.deserializeBinaryFromReader(o, t);
};
proto.BINJarInfo.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setGameid(o);
break;

case 2:
o = t.readInt64();
e.setValue(o);
break;

case 3:
var o = t.readInt32();
e.setJartype(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINJarInfo.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINJarInfo.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINJarInfo.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt64(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
};
proto.BINJarInfo.prototype.getGameid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINJarInfo.prototype.setGameid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINJarInfo.prototype.clearGameid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINJarInfo.prototype.hasGameid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINJarInfo.prototype.getValue = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINJarInfo.prototype.setValue = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINJarInfo.prototype.clearValue = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINJarInfo.prototype.hasValue = function() {
return null != s.Message.getField(this, 2);
};
proto.BINJarInfo.prototype.getJartype = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINJarInfo.prototype.setJartype = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINJarInfo.prototype.clearJartype = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINJarInfo.prototype.hasJartype = function() {
return null != s.Message.getField(this, 3);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./map_field_entry_pb.js": "map_field_entry_pb",
"google-protobuf": "google-protobuf"
} ],
labelCellProvider: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "44759/oHNlAWY60w9RSLrdZ", "labelCellProvider");
cc.Class({
extends: e("viewCell"),
properties: {
prefabData: cc.Prefab,
frame_title: cc.SpriteFrame,
frame_cell: cc.SpriteFrame
},
onLoad: function() {},
clicked: function() {
this._super();
cc.log("clicked cell provider");
},
resetCell: function(e, t) {
var o = this.node.getChildByName("twoItem"), s = o.getChildByName("item1").getComponent(cc.Label);
s.string = "";
var r = o.getChildByName("item2").getComponent(cc.Label);
r.string = "";
var i = this.node.getChildByName("threeItem"), n = i.getChildByName("item1").getComponent(cc.Label);
n.string = "";
var a = i.getChildByName("item2").getComponent(cc.Label);
a.string = "";
var p = i.getChildByName("item3").getComponent(cc.Label);
p.string = "";
var l = this.node.getChildByName("fourItem"), u = l.getChildByName("item1").getComponent(cc.Label);
u.string = "";
var g = l.getChildByName("item2").getComponent(cc.Label);
g.string = "";
var d = l.getChildByName("item3").getComponent(cc.Label);
d.string = "";
var c = l.getChildByName("item4").getComponent(cc.Label);
c.string = "";
this.node_card = l.getChildByName("item4").getChildByName("card");
this.node_card.removeAllChildren();
this.list_text = [];
if (4 == e) {
this.list_text.push(u);
this.list_text.push(g);
this.list_text.push(d);
this.list_text.push(c);
} else if (3 == e) {
this.list_text.push(n);
this.list_text.push(a);
this.list_text.push(p);
} else if (2 == e) {
this.list_text.push(s);
this.list_text.push(r);
}
var h = this.node.getChildByName("background").getComponent(cc.Sprite);
h.spriteFrame = 0 == t ? this.frame_title : this.frame_cell;
},
init: function(e, t, o, s) {
cc.log("index =", e);
var r = t.array[e];
delete r.date_time;
cc.log("data : ", r);
var i = Object.keys(r).length;
this.resetCell(i, e);
if (this.list_text.length == i) for (var n = /[,]/g, a = -1 !== r[Object.keys(r)[i - 1]].toString().search(n) ? r[Object.keys(r)[i - 1]].split(",") : [], p = 0; p < i; p++) {
var l = r[Object.keys(r)[p]].toString();
4 == i && 0 == p && 0 != e && (l = "#" + l);
if (p == i - 1 && 0 != e) if (a.length > 1) for (var u = 0; u < a.length; u++) {
var g = cc.instantiate(this.prefabData).getComponent("CardItem"), d = a[u];
g.node.setScale(.225, .225);
var c = (u - a.length / 2 + .5) * g.node.getContentSize().width * .1;
g.replaceCard(d);
g.setBg(!1);
g.node.setPositionY(0);
g.node.setPositionX(c);
this.node_card.addChild(g.node);
} else {
this.list_text[p].string = l;
this.list_text[p].node.color = cc.color(94, 60, 17, 255);
} else {
this.list_text[p].string = l;
this.list_text[p].node.color = 0 == e ? cc.color(255, 248, 198, 255) : cc.color(94, 60, 17, 255);
}
}
}
});
cc._RF.pop();
}, {
viewCell: "viewCell"
} ],
labelCell: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a6527xMI35HwY9ELBXxJ3eR", "labelCell");
cc.Class({
extends: e("viewCell"),
properties: {
prefabData: cc.Prefab,
frame_title: cc.SpriteFrame,
frame_cell: cc.SpriteFrame
},
onLoad: function() {},
resetCell: function(e, t) {
var o = this.node.getChildByName("twoItem"), s = o.getChildByName("item1").getComponent(cc.Label);
s.string = "";
var r = o.getChildByName("item2").getComponent(cc.Label);
r.string = "";
var i = this.node.getChildByName("threeItem"), n = i.getChildByName("item1").getComponent(cc.Label);
n.string = "";
var a = i.getChildByName("item2").getComponent(cc.Label);
a.string = "";
var p = i.getChildByName("item3").getComponent(cc.Label);
p.string = "";
var l = this.node.getChildByName("fourItem"), u = l.getChildByName("item1").getComponent(cc.Label);
u.string = "";
var g = l.getChildByName("item2").getComponent(cc.Label);
g.string = "";
var d = l.getChildByName("item3").getComponent(cc.Label);
d.string = "";
var c = l.getChildByName("item4").getComponent(cc.Label);
c.string = "";
this.node_card = l.getChildByName("item4").getChildByName("card");
this.node_card.removeAllChildren();
this.list_text = [];
if (4 == e) {
this.list_text.push(u);
this.list_text.push(g);
this.list_text.push(d);
this.list_text.push(c);
} else if (3 == e) {
this.list_text.push(n);
this.list_text.push(a);
this.list_text.push(p);
} else if (2 == e) {
this.list_text.push(s);
this.list_text.push(r);
}
var h = this.node.getChildByName("background").getComponent(cc.Sprite);
h.spriteFrame = 0 == t ? this.frame_title : this.frame_cell;
},
init: function(e, t, o, s) {
cc.log("index =", e);
var r = t.array[e];
delete r.date_time;
cc.log("data : ", r);
var i = Object.keys(r).length;
this.resetCell(i, e);
if (this.list_text.length == i) for (var n = /[,]/g, a = -1 !== r[Object.keys(r)[i - 1]].toString().search(n) ? r[Object.keys(r)[i - 1]].split(",") : [], p = 0; p < i; p++) {
var l = r[Object.keys(r)[p]].toString();
4 == i && 0 == p && 0 != e && (l = "#" + l);
if (p == i - 1 && 0 != e) if (a.length > 1) for (var u = 0; u < a.length; u++) {
var g = cc.instantiate(this.prefabData).getComponent("CardItem"), d = a[u];
g.node.setScale(.225, .225);
var c = (u - a.length / 2 + .5) * g.node.getContentSize().width * .1;
g.replaceCard(d);
g.setBg(!1);
g.node.setPositionY(0);
g.node.setPositionX(c);
this.node_card.addChild(g.node);
} else {
this.list_text[p].string = l;
this.list_text[p].node.color = cc.color(94, 60, 17, 255);
} else {
this.list_text[p].string = l;
this.list_text[p].node.color = 0 == e ? cc.color(255, 248, 198, 255) : cc.color(94, 60, 17, 255);
}
}
}
});
cc._RF.pop();
}, {
viewCell: "viewCell"
} ],
level_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "75a1bT9U15IjJHi+1BPFhOu", "level_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINLevel", null, i);
r.exportSymbol("proto.BINLevelUpResponse", null, i);
r.exportSymbol("proto.BINMedal", null, i);
r.exportSymbol("proto.BINMedalUpResponse", null, i);
r.exportSymbol("proto.BINVipLevel", null, i);
proto.BINLevel = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINLevel, s.Message);
r.DEBUG && !COMPILED && (proto.BINLevel.displayName = "proto.BINLevel");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLevel.prototype.toObject = function(e) {
return proto.BINLevel.toObject(e, this);
};
proto.BINLevel.toObject = function(e, t) {
var o = {
level: s.Message.getField(t, 1),
name: s.Message.getField(t, 2),
cashgift: s.Message.getField(t, 3),
goldgift: s.Message.getField(t, 4),
maxexp: s.Message.getField(t, 5)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLevel.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLevel();
return proto.BINLevel.deserializeBinaryFromReader(o, t);
};
proto.BINLevel.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setLevel(o);
break;

case 2:
o = t.readString();
e.setName(o);
break;

case 3:
o = t.readInt64();
e.setCashgift(o);
break;

case 4:
o = t.readInt64();
e.setGoldgift(o);
break;

case 5:
var o = t.readInt64();
e.setMaxexp(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLevel.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLevel.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLevel.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt64(5, t);
};
proto.BINLevel.prototype.getLevel = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINLevel.prototype.setLevel = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLevel.prototype.clearLevel = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLevel.prototype.hasLevel = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLevel.prototype.getName = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINLevel.prototype.setName = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLevel.prototype.clearName = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLevel.prototype.hasName = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLevel.prototype.getCashgift = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINLevel.prototype.setCashgift = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINLevel.prototype.clearCashgift = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINLevel.prototype.hasCashgift = function() {
return null != s.Message.getField(this, 3);
};
proto.BINLevel.prototype.getGoldgift = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINLevel.prototype.setGoldgift = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINLevel.prototype.clearGoldgift = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINLevel.prototype.hasGoldgift = function() {
return null != s.Message.getField(this, 4);
};
proto.BINLevel.prototype.getMaxexp = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINLevel.prototype.setMaxexp = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINLevel.prototype.clearMaxexp = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINLevel.prototype.hasMaxexp = function() {
return null != s.Message.getField(this, 5);
};
proto.BINMedal = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINMedal, s.Message);
r.DEBUG && !COMPILED && (proto.BINMedal.displayName = "proto.BINMedal");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMedal.prototype.toObject = function(e) {
return proto.BINMedal.toObject(e, this);
};
proto.BINMedal.toObject = function(e, t) {
var o = {
medal: s.Message.getField(t, 1),
name: s.Message.getField(t, 2),
maxlevel: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINMedal.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMedal();
return proto.BINMedal.deserializeBinaryFromReader(o, t);
};
proto.BINMedal.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setMedal(o);
break;

case 2:
o = t.readString();
e.setName(o);
break;

case 3:
var o = t.readInt32();
e.setMaxlevel(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMedal.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMedal.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMedal.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
};
proto.BINMedal.prototype.getMedal = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINMedal.prototype.setMedal = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMedal.prototype.clearMedal = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMedal.prototype.hasMedal = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMedal.prototype.getName = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINMedal.prototype.setName = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINMedal.prototype.clearName = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINMedal.prototype.hasName = function() {
return null != s.Message.getField(this, 2);
};
proto.BINMedal.prototype.getMaxlevel = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINMedal.prototype.setMaxlevel = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINMedal.prototype.clearMaxlevel = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINMedal.prototype.hasMaxlevel = function() {
return null != s.Message.getField(this, 3);
};
proto.BINVipLevel = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINVipLevel, s.Message);
r.DEBUG && !COMPILED && (proto.BINVipLevel.displayName = "proto.BINVipLevel");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINVipLevel.prototype.toObject = function(e) {
return proto.BINVipLevel.toObject(e, this);
};
proto.BINVipLevel.toObject = function(e, t) {
var o = {
vip: s.Message.getField(t, 1),
name: s.Message.getField(t, 2),
maxpoint: s.Message.getField(t, 3),
totalcashpurchase: s.Message.getField(t, 4),
maxpartopup: s.Message.getField(t, 5),
maxturntopup: s.Message.getField(t, 6),
minbalanceaftertopup: s.Message.getField(t, 7),
cashtransfertax: s.Message.getField(t, 8),
cashreceived: s.Message.getField(t, 9)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINVipLevel.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINVipLevel();
return proto.BINVipLevel.deserializeBinaryFromReader(o, t);
};
proto.BINVipLevel.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setVip(o);
break;

case 2:
o = t.readString();
e.setName(o);
break;

case 3:
o = t.readInt64();
e.setMaxpoint(o);
break;

case 4:
o = t.readInt64();
e.setTotalcashpurchase(o);
break;

case 5:
o = t.readInt32();
e.setMaxpartopup(o);
break;

case 6:
o = t.readInt32();
e.setMaxturntopup(o);
break;

case 7:
o = t.readInt32();
e.setMinbalanceaftertopup(o);
break;

case 8:
o = t.readInt32();
e.setCashtransfertax(o);
break;

case 9:
var o = t.readInt32();
e.setCashreceived(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINVipLevel.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINVipLevel.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINVipLevel.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt32(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt32(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeInt32(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeInt32(9, t);
};
proto.BINVipLevel.prototype.getVip = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINVipLevel.prototype.setVip = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINVipLevel.prototype.clearVip = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINVipLevel.prototype.hasVip = function() {
return null != s.Message.getField(this, 1);
};
proto.BINVipLevel.prototype.getName = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINVipLevel.prototype.setName = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINVipLevel.prototype.clearName = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINVipLevel.prototype.hasName = function() {
return null != s.Message.getField(this, 2);
};
proto.BINVipLevel.prototype.getMaxpoint = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINVipLevel.prototype.setMaxpoint = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINVipLevel.prototype.clearMaxpoint = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINVipLevel.prototype.hasMaxpoint = function() {
return null != s.Message.getField(this, 3);
};
proto.BINVipLevel.prototype.getTotalcashpurchase = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINVipLevel.prototype.setTotalcashpurchase = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINVipLevel.prototype.clearTotalcashpurchase = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINVipLevel.prototype.hasTotalcashpurchase = function() {
return null != s.Message.getField(this, 4);
};
proto.BINVipLevel.prototype.getMaxpartopup = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINVipLevel.prototype.setMaxpartopup = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINVipLevel.prototype.clearMaxpartopup = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINVipLevel.prototype.hasMaxpartopup = function() {
return null != s.Message.getField(this, 5);
};
proto.BINVipLevel.prototype.getMaxturntopup = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINVipLevel.prototype.setMaxturntopup = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINVipLevel.prototype.clearMaxturntopup = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINVipLevel.prototype.hasMaxturntopup = function() {
return null != s.Message.getField(this, 6);
};
proto.BINVipLevel.prototype.getMinbalanceaftertopup = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINVipLevel.prototype.setMinbalanceaftertopup = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINVipLevel.prototype.clearMinbalanceaftertopup = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINVipLevel.prototype.hasMinbalanceaftertopup = function() {
return null != s.Message.getField(this, 7);
};
proto.BINVipLevel.prototype.getCashtransfertax = function() {
return s.Message.getFieldWithDefault(this, 8, 0);
};
proto.BINVipLevel.prototype.setCashtransfertax = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINVipLevel.prototype.clearCashtransfertax = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINVipLevel.prototype.hasCashtransfertax = function() {
return null != s.Message.getField(this, 8);
};
proto.BINVipLevel.prototype.getCashreceived = function() {
return s.Message.getFieldWithDefault(this, 9, 0);
};
proto.BINVipLevel.prototype.setCashreceived = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINVipLevel.prototype.clearCashreceived = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINVipLevel.prototype.hasCashreceived = function() {
return null != s.Message.getField(this, 9);
};
proto.BINLevelUpResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINLevelUpResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINLevelUpResponse.displayName = "proto.BINLevelUpResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLevelUpResponse.prototype.toObject = function(e) {
return proto.BINLevelUpResponse.toObject(e, this);
};
proto.BINLevelUpResponse.toObject = function(e, t) {
var o, r = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
currentexp: s.Message.getField(t, 3),
levelup: s.Message.getField(t, 4),
newlevel: (o = t.getNewlevel()) && proto.BINLevel.toObject(e, o)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINLevelUpResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLevelUpResponse();
return proto.BINLevelUpResponse.deserializeBinaryFromReader(o, t);
};
proto.BINLevelUpResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt64();
e.setCurrentexp(o);
break;

case 4:
o = t.readBool();
e.setLevelup(o);
break;

case 5:
var o = new proto.BINLevel();
t.readMessage(o, proto.BINLevel.deserializeBinaryFromReader);
e.setNewlevel(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLevelUpResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLevelUpResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLevelUpResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeBool(4, t);
null != (t = this.getNewlevel()) && e.writeMessage(5, t, proto.BINLevel.serializeBinaryToWriter);
};
proto.BINLevelUpResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINLevelUpResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLevelUpResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLevelUpResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLevelUpResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINLevelUpResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLevelUpResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLevelUpResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLevelUpResponse.prototype.getCurrentexp = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINLevelUpResponse.prototype.setCurrentexp = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINLevelUpResponse.prototype.clearCurrentexp = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINLevelUpResponse.prototype.hasCurrentexp = function() {
return null != s.Message.getField(this, 3);
};
proto.BINLevelUpResponse.prototype.getLevelup = function() {
return s.Message.getFieldWithDefault(this, 4, !1);
};
proto.BINLevelUpResponse.prototype.setLevelup = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINLevelUpResponse.prototype.clearLevelup = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINLevelUpResponse.prototype.hasLevelup = function() {
return null != s.Message.getField(this, 4);
};
proto.BINLevelUpResponse.prototype.getNewlevel = function() {
return s.Message.getWrapperField(this, proto.BINLevel, 5);
};
proto.BINLevelUpResponse.prototype.setNewlevel = function(e) {
s.Message.setWrapperField(this, 5, e);
};
proto.BINLevelUpResponse.prototype.clearNewlevel = function() {
this.setNewlevel(void 0);
};
proto.BINLevelUpResponse.prototype.hasNewlevel = function() {
return null != s.Message.getField(this, 5);
};
proto.BINMedalUpResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINMedalUpResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINMedalUpResponse.displayName = "proto.BINMedalUpResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMedalUpResponse.prototype.toObject = function(e) {
return proto.BINMedalUpResponse.toObject(e, this);
};
proto.BINMedalUpResponse.toObject = function(e, t) {
var o, r = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
newmedal: (o = t.getNewmedal()) && proto.BINMedal.toObject(e, o),
currentlevel: s.Message.getField(t, 4)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINMedalUpResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMedalUpResponse();
return proto.BINMedalUpResponse.deserializeBinaryFromReader(o, t);
};
proto.BINMedalUpResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = new proto.BINMedal();
t.readMessage(o, proto.BINMedal.deserializeBinaryFromReader);
e.setNewmedal(o);
break;

case 4:
var o = t.readInt32();
e.setCurrentlevel(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMedalUpResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMedalUpResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMedalUpResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = this.getNewmedal()) && e.writeMessage(3, t, proto.BINMedal.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
};
proto.BINMedalUpResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINMedalUpResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMedalUpResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMedalUpResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMedalUpResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINMedalUpResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINMedalUpResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINMedalUpResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINMedalUpResponse.prototype.getNewmedal = function() {
return s.Message.getWrapperField(this, proto.BINMedal, 3);
};
proto.BINMedalUpResponse.prototype.setNewmedal = function(e) {
s.Message.setWrapperField(this, 3, e);
};
proto.BINMedalUpResponse.prototype.clearNewmedal = function() {
this.setNewmedal(void 0);
};
proto.BINMedalUpResponse.prototype.hasNewmedal = function() {
return null != s.Message.getField(this, 3);
};
proto.BINMedalUpResponse.prototype.getCurrentlevel = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINMedalUpResponse.prototype.setCurrentlevel = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINMedalUpResponse.prototype.clearCurrentlevel = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINMedalUpResponse.prototype.hasCurrentlevel = function() {
return null != s.Message.getField(this, 4);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
login_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c7660hPv/tMKLWGZpK+b1aY", "login_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./user_info_pb.js");
r.exportSymbol("proto.BINLoginRequest", null, i);
r.exportSymbol("proto.BINLoginResponse", null, i);
proto.BINLoginRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINLoginRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINLoginRequest.displayName = "proto.BINLoginRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLoginRequest.prototype.toObject = function(e) {
return proto.BINLoginRequest.toObject(e, this);
};
proto.BINLoginRequest.toObject = function(e, t) {
var o = {
username: s.Message.getField(t, 1),
password: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLoginRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLoginRequest();
return proto.BINLoginRequest.deserializeBinaryFromReader(o, t);
};
proto.BINLoginRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setUsername(o);
break;

case 2:
var o = t.readString();
e.setPassword(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLoginRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLoginRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLoginRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINLoginRequest.prototype.getUsername = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINLoginRequest.prototype.setUsername = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLoginRequest.prototype.clearUsername = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLoginRequest.prototype.hasUsername = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLoginRequest.prototype.getPassword = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINLoginRequest.prototype.setPassword = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLoginRequest.prototype.clearPassword = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLoginRequest.prototype.hasPassword = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLoginResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINLoginResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINLoginResponse.displayName = "proto.BINLoginResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLoginResponse.prototype.toObject = function(e) {
return proto.BINLoginResponse.toObject(e, this);
};
proto.BINLoginResponse.toObject = function(e, t) {
var o, r = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
userinfo: (o = t.getUserinfo()) && n.BINUserInfo.toObject(e, o),
usersetting: (o = t.getUsersetting()) && n.BINUserSetting.toObject(e, o),
sessionid: s.Message.getField(t, 5),
hasplayingmatch: s.Message.getField(t, 6),
enabledebuglag: s.Message.getField(t, 7),
enableevent: s.Message.getField(t, 8),
enablenotification: s.Message.getField(t, 9),
enabletx: s.Message.getField(t, 10),
noticetext: s.Message.getField(t, 11)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINLoginResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLoginResponse();
return proto.BINLoginResponse.deserializeBinaryFromReader(o, t);
};
proto.BINLoginResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = new n.BINUserInfo();
t.readMessage(o, n.BINUserInfo.deserializeBinaryFromReader);
e.setUserinfo(o);
break;

case 4:
o = new n.BINUserSetting();
t.readMessage(o, n.BINUserSetting.deserializeBinaryFromReader);
e.setUsersetting(o);
break;

case 5:
o = t.readString();
e.setSessionid(o);
break;

case 6:
o = t.readBool();
e.setHasplayingmatch(o);
break;

case 7:
o = t.readBool();
e.setEnabledebuglag(o);
break;

case 8:
o = t.readBool();
e.setEnableevent(o);
break;

case 9:
o = t.readBool();
e.setEnablenotification(o);
break;

case 10:
o = t.readBool();
e.setEnabletx(o);
break;

case 11:
var o = t.readString();
e.setNoticetext(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLoginResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLoginResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLoginResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = this.getUserinfo()) && e.writeMessage(3, t, n.BINUserInfo.serializeBinaryToWriter);
null != (t = this.getUsersetting()) && e.writeMessage(4, t, n.BINUserSetting.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeBool(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeBool(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeBool(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeBool(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeBool(10, t);
null != (t = s.Message.getField(this, 11)) && e.writeString(11, t);
};
proto.BINLoginResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINLoginResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLoginResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLoginResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLoginResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINLoginResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLoginResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLoginResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLoginResponse.prototype.getUserinfo = function() {
return s.Message.getWrapperField(this, n.BINUserInfo, 3);
};
proto.BINLoginResponse.prototype.setUserinfo = function(e) {
s.Message.setWrapperField(this, 3, e);
};
proto.BINLoginResponse.prototype.clearUserinfo = function() {
this.setUserinfo(void 0);
};
proto.BINLoginResponse.prototype.hasUserinfo = function() {
return null != s.Message.getField(this, 3);
};
proto.BINLoginResponse.prototype.getUsersetting = function() {
return s.Message.getWrapperField(this, n.BINUserSetting, 4);
};
proto.BINLoginResponse.prototype.setUsersetting = function(e) {
s.Message.setWrapperField(this, 4, e);
};
proto.BINLoginResponse.prototype.clearUsersetting = function() {
this.setUsersetting(void 0);
};
proto.BINLoginResponse.prototype.hasUsersetting = function() {
return null != s.Message.getField(this, 4);
};
proto.BINLoginResponse.prototype.getSessionid = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINLoginResponse.prototype.setSessionid = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINLoginResponse.prototype.clearSessionid = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINLoginResponse.prototype.hasSessionid = function() {
return null != s.Message.getField(this, 5);
};
proto.BINLoginResponse.prototype.getHasplayingmatch = function() {
return s.Message.getFieldWithDefault(this, 6, !1);
};
proto.BINLoginResponse.prototype.setHasplayingmatch = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINLoginResponse.prototype.clearHasplayingmatch = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINLoginResponse.prototype.hasHasplayingmatch = function() {
return null != s.Message.getField(this, 6);
};
proto.BINLoginResponse.prototype.getEnabledebuglag = function() {
return s.Message.getFieldWithDefault(this, 7, !1);
};
proto.BINLoginResponse.prototype.setEnabledebuglag = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINLoginResponse.prototype.clearEnabledebuglag = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINLoginResponse.prototype.hasEnabledebuglag = function() {
return null != s.Message.getField(this, 7);
};
proto.BINLoginResponse.prototype.getEnableevent = function() {
return s.Message.getFieldWithDefault(this, 8, !1);
};
proto.BINLoginResponse.prototype.setEnableevent = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINLoginResponse.prototype.clearEnableevent = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINLoginResponse.prototype.hasEnableevent = function() {
return null != s.Message.getField(this, 8);
};
proto.BINLoginResponse.prototype.getEnablenotification = function() {
return s.Message.getFieldWithDefault(this, 9, !1);
};
proto.BINLoginResponse.prototype.setEnablenotification = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINLoginResponse.prototype.clearEnablenotification = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINLoginResponse.prototype.hasEnablenotification = function() {
return null != s.Message.getField(this, 9);
};
proto.BINLoginResponse.prototype.getEnabletx = function() {
return s.Message.getFieldWithDefault(this, 10, !1);
};
proto.BINLoginResponse.prototype.setEnabletx = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINLoginResponse.prototype.clearEnabletx = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINLoginResponse.prototype.hasEnabletx = function() {
return null != s.Message.getField(this, 10);
};
proto.BINLoginResponse.prototype.getNoticetext = function() {
return s.Message.getFieldWithDefault(this, 11, "");
};
proto.BINLoginResponse.prototype.setNoticetext = function(e) {
s.Message.setField(this, 11, e);
};
proto.BINLoginResponse.prototype.clearNoticetext = function() {
s.Message.setField(this, 11, void 0);
};
proto.BINLoginResponse.prototype.hasNoticetext = function() {
return null != s.Message.getField(this, 11);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./user_info_pb.js": "user_info_pb",
"google-protobuf": "google-protobuf"
} ],
logout_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "388b2sDm/pO4bRpSWwm+3dF", "logout_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINLogoutRequest", null, i);
r.exportSymbol("proto.BINLogoutResponse", null, i);
proto.BINLogoutRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINLogoutRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINLogoutRequest.displayName = "proto.BINLogoutRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLogoutRequest.prototype.toObject = function(e) {
return proto.BINLogoutRequest.toObject(e, this);
};
proto.BINLogoutRequest.toObject = function(e, t) {
var o = {
dologout: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLogoutRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLogoutRequest();
return proto.BINLogoutRequest.deserializeBinaryFromReader(o, t);
};
proto.BINLogoutRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readBool();
e.setDologout(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLogoutRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLogoutRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLogoutRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
};
proto.BINLogoutRequest.prototype.getDologout = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINLogoutRequest.prototype.setDologout = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLogoutRequest.prototype.clearDologout = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLogoutRequest.prototype.hasDologout = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLogoutResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINLogoutResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINLogoutResponse.displayName = "proto.BINLogoutResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLogoutResponse.prototype.toObject = function(e) {
return proto.BINLogoutResponse.toObject(e, this);
};
proto.BINLogoutResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLogoutResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLogoutResponse();
return proto.BINLogoutResponse.deserializeBinaryFromReader(o, t);
};
proto.BINLogoutResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
var o = t.readString();
e.setMessage(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLogoutResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLogoutResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLogoutResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINLogoutResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINLogoutResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLogoutResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLogoutResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLogoutResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINLogoutResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLogoutResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLogoutResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
lookup_game_history_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "9f907WDcV9If4U0MxHlexWu", "lookup_game_history_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./map_field_entry_pb.js");
r.exportSymbol("proto.BINGameHistory", null, i);
r.exportSymbol("proto.BINLookUpGameHistoryRequest", null, i);
r.exportSymbol("proto.BINLookUpGameHistoryResponse", null, i);
proto.BINLookUpGameHistoryRequest = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINLookUpGameHistoryRequest.repeatedFields_, null);
};
r.inherits(proto.BINLookUpGameHistoryRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINLookUpGameHistoryRequest.displayName = "proto.BINLookUpGameHistoryRequest");
proto.BINLookUpGameHistoryRequest.repeatedFields_ = [ 5 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLookUpGameHistoryRequest.prototype.toObject = function(e) {
return proto.BINLookUpGameHistoryRequest.toObject(e, this);
};
proto.BINLookUpGameHistoryRequest.toObject = function(e, t) {
var o = {
firstresult: s.Message.getField(t, 1),
maxresult: s.Message.getField(t, 2),
orderbyfield: s.Message.getField(t, 3),
asc: s.Message.getField(t, 4),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLookUpGameHistoryRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLookUpGameHistoryRequest();
return proto.BINLookUpGameHistoryRequest.deserializeBinaryFromReader(o, t);
};
proto.BINLookUpGameHistoryRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setFirstresult(o);
break;

case 2:
o = t.readInt32();
e.setMaxresult(o);
break;

case 3:
o = t.readInt32();
e.setOrderbyfield(o);
break;

case 4:
o = t.readBool();
e.setAsc(o);
break;

case 5:
var o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLookUpGameHistoryRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLookUpGameHistoryRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLookUpGameHistoryRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeBool(4, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(5, t, n.BINMapFieldEntry.serializeBinaryToWriter);
};
proto.BINLookUpGameHistoryRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINLookUpGameHistoryRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLookUpGameHistoryRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLookUpGameHistoryRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLookUpGameHistoryRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINLookUpGameHistoryRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLookUpGameHistoryRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLookUpGameHistoryRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLookUpGameHistoryRequest.prototype.getOrderbyfield = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINLookUpGameHistoryRequest.prototype.setOrderbyfield = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINLookUpGameHistoryRequest.prototype.clearOrderbyfield = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINLookUpGameHistoryRequest.prototype.hasOrderbyfield = function() {
return null != s.Message.getField(this, 3);
};
proto.BINLookUpGameHistoryRequest.prototype.getAsc = function() {
return s.Message.getFieldWithDefault(this, 4, !1);
};
proto.BINLookUpGameHistoryRequest.prototype.setAsc = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINLookUpGameHistoryRequest.prototype.clearAsc = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINLookUpGameHistoryRequest.prototype.hasAsc = function() {
return null != s.Message.getField(this, 4);
};
proto.BINLookUpGameHistoryRequest.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 5);
};
proto.BINLookUpGameHistoryRequest.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 5, e);
};
proto.BINLookUpGameHistoryRequest.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 5, e, proto.BINMapFieldEntry, t);
};
proto.BINLookUpGameHistoryRequest.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINGameHistory = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINGameHistory, s.Message);
r.DEBUG && !COMPILED && (proto.BINGameHistory.displayName = "proto.BINGameHistory");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINGameHistory.prototype.toObject = function(e) {
return proto.BINGameHistory.toObject(e, this);
};
proto.BINGameHistory.toObject = function(e, t) {
var o = {
first: s.Message.getField(t, 1),
second: s.Message.getField(t, 2),
third: s.Message.getField(t, 3),
fourth: s.Message.getField(t, 4),
fifth: s.Message.getField(t, 5),
sixth: s.Message.getField(t, 6),
seventh: s.Message.getField(t, 7),
eighth: s.Message.getField(t, 8),
ninth: s.Message.getField(t, 9),
tenth: s.Message.getField(t, 10)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINGameHistory.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINGameHistory();
return proto.BINGameHistory.deserializeBinaryFromReader(o, t);
};
proto.BINGameHistory.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setFirst(o);
break;

case 2:
o = t.readString();
e.setSecond(o);
break;

case 3:
o = t.readString();
e.setThird(o);
break;

case 4:
o = t.readString();
e.setFourth(o);
break;

case 5:
o = t.readString();
e.setFifth(o);
break;

case 6:
o = t.readString();
e.setSixth(o);
break;

case 7:
o = t.readString();
e.setSeventh(o);
break;

case 8:
o = t.readString();
e.setEighth(o);
break;

case 9:
o = t.readString();
e.setNinth(o);
break;

case 10:
var o = t.readString();
e.setTenth(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINGameHistory.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINGameHistory.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINGameHistory.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeString(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeString(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeString(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeString(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeString(10, t);
};
proto.BINGameHistory.prototype.getFirst = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINGameHistory.prototype.setFirst = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINGameHistory.prototype.clearFirst = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINGameHistory.prototype.hasFirst = function() {
return null != s.Message.getField(this, 1);
};
proto.BINGameHistory.prototype.getSecond = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINGameHistory.prototype.setSecond = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINGameHistory.prototype.clearSecond = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINGameHistory.prototype.hasSecond = function() {
return null != s.Message.getField(this, 2);
};
proto.BINGameHistory.prototype.getThird = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINGameHistory.prototype.setThird = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINGameHistory.prototype.clearThird = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINGameHistory.prototype.hasThird = function() {
return null != s.Message.getField(this, 3);
};
proto.BINGameHistory.prototype.getFourth = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINGameHistory.prototype.setFourth = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINGameHistory.prototype.clearFourth = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINGameHistory.prototype.hasFourth = function() {
return null != s.Message.getField(this, 4);
};
proto.BINGameHistory.prototype.getFifth = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINGameHistory.prototype.setFifth = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINGameHistory.prototype.clearFifth = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINGameHistory.prototype.hasFifth = function() {
return null != s.Message.getField(this, 5);
};
proto.BINGameHistory.prototype.getSixth = function() {
return s.Message.getFieldWithDefault(this, 6, "");
};
proto.BINGameHistory.prototype.setSixth = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINGameHistory.prototype.clearSixth = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINGameHistory.prototype.hasSixth = function() {
return null != s.Message.getField(this, 6);
};
proto.BINGameHistory.prototype.getSeventh = function() {
return s.Message.getFieldWithDefault(this, 7, "");
};
proto.BINGameHistory.prototype.setSeventh = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINGameHistory.prototype.clearSeventh = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINGameHistory.prototype.hasSeventh = function() {
return null != s.Message.getField(this, 7);
};
proto.BINGameHistory.prototype.getEighth = function() {
return s.Message.getFieldWithDefault(this, 8, "");
};
proto.BINGameHistory.prototype.setEighth = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINGameHistory.prototype.clearEighth = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINGameHistory.prototype.hasEighth = function() {
return null != s.Message.getField(this, 8);
};
proto.BINGameHistory.prototype.getNinth = function() {
return s.Message.getFieldWithDefault(this, 9, "");
};
proto.BINGameHistory.prototype.setNinth = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINGameHistory.prototype.clearNinth = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINGameHistory.prototype.hasNinth = function() {
return null != s.Message.getField(this, 9);
};
proto.BINGameHistory.prototype.getTenth = function() {
return s.Message.getFieldWithDefault(this, 10, "");
};
proto.BINGameHistory.prototype.setTenth = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINGameHistory.prototype.clearTenth = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINGameHistory.prototype.hasTenth = function() {
return null != s.Message.getField(this, 10);
};
proto.BINLookUpGameHistoryResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINLookUpGameHistoryResponse.repeatedFields_, null);
};
r.inherits(proto.BINLookUpGameHistoryResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINLookUpGameHistoryResponse.displayName = "proto.BINLookUpGameHistoryResponse");
proto.BINLookUpGameHistoryResponse.repeatedFields_ = [ 3, 4 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLookUpGameHistoryResponse.prototype.toObject = function(e) {
return proto.BINLookUpGameHistoryResponse.toObject(e, this);
};
proto.BINLookUpGameHistoryResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
historiesList: s.Message.toObjectList(t.getHistoriesList(), proto.BINGameHistory.toObject, e),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLookUpGameHistoryResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLookUpGameHistoryResponse();
return proto.BINLookUpGameHistoryResponse.deserializeBinaryFromReader(o, t);
};
proto.BINLookUpGameHistoryResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = new proto.BINGameHistory();
t.readMessage(o, proto.BINGameHistory.deserializeBinaryFromReader);
e.addHistories(o);
break;

case 4:
var o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLookUpGameHistoryResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLookUpGameHistoryResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLookUpGameHistoryResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getHistoriesList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINGameHistory.serializeBinaryToWriter);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(4, t, n.BINMapFieldEntry.serializeBinaryToWriter);
};
proto.BINLookUpGameHistoryResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINLookUpGameHistoryResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLookUpGameHistoryResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLookUpGameHistoryResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLookUpGameHistoryResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINLookUpGameHistoryResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLookUpGameHistoryResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLookUpGameHistoryResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLookUpGameHistoryResponse.prototype.getHistoriesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINGameHistory, 3);
};
proto.BINLookUpGameHistoryResponse.prototype.setHistoriesList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINLookUpGameHistoryResponse.prototype.addHistories = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINGameHistory, t);
};
proto.BINLookUpGameHistoryResponse.prototype.clearHistoriesList = function() {
this.setHistoriesList([]);
};
proto.BINLookUpGameHistoryResponse.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 4);
};
proto.BINLookUpGameHistoryResponse.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 4, e);
};
proto.BINLookUpGameHistoryResponse.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 4, e, proto.BINMapFieldEntry, t);
};
proto.BINLookUpGameHistoryResponse.prototype.clearArgsList = function() {
this.setArgsList([]);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./map_field_entry_pb.js": "map_field_entry_pb",
"google-protobuf": "google-protobuf"
} ],
lookup_money_history_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "12caay1p4tONrWypAYFO6Wa", "lookup_money_history_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINExchangeGoldHistory", null, i);
r.exportSymbol("proto.BINExchangeGoldHistoryRequest", null, i);
r.exportSymbol("proto.BINExchangeGoldHistoryResponse", null, i);
r.exportSymbol("proto.BINLookUpMoneyHistoryRequest", null, i);
r.exportSymbol("proto.BINLookUpMoneyHistoryResponse", null, i);
r.exportSymbol("proto.BINMoneyLog", null, i);
r.exportSymbol("proto.BINPurchaseCashHistory", null, i);
r.exportSymbol("proto.BINPurchaseCashHistoryRequest", null, i);
r.exportSymbol("proto.BINPurchaseCashHistoryResponse", null, i);
proto.BINLookUpMoneyHistoryRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINLookUpMoneyHistoryRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINLookUpMoneyHistoryRequest.displayName = "proto.BINLookUpMoneyHistoryRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLookUpMoneyHistoryRequest.prototype.toObject = function(e) {
return proto.BINLookUpMoneyHistoryRequest.toObject(e, this);
};
proto.BINLookUpMoneyHistoryRequest.toObject = function(e, t) {
var o = {
firstresult: s.Message.getField(t, 1),
maxresult: s.Message.getField(t, 2),
filtertype: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLookUpMoneyHistoryRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLookUpMoneyHistoryRequest();
return proto.BINLookUpMoneyHistoryRequest.deserializeBinaryFromReader(o, t);
};
proto.BINLookUpMoneyHistoryRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setFirstresult(o);
break;

case 2:
o = t.readInt32();
e.setMaxresult(o);
break;

case 3:
var o = t.readInt32();
e.setFiltertype(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLookUpMoneyHistoryRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLookUpMoneyHistoryRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLookUpMoneyHistoryRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
};
proto.BINLookUpMoneyHistoryRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINLookUpMoneyHistoryRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLookUpMoneyHistoryRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLookUpMoneyHistoryRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLookUpMoneyHistoryRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINLookUpMoneyHistoryRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLookUpMoneyHistoryRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLookUpMoneyHistoryRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLookUpMoneyHistoryRequest.prototype.getFiltertype = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINLookUpMoneyHistoryRequest.prototype.setFiltertype = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINLookUpMoneyHistoryRequest.prototype.clearFiltertype = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINLookUpMoneyHistoryRequest.prototype.hasFiltertype = function() {
return null != s.Message.getField(this, 3);
};
proto.BINMoneyLog = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINMoneyLog, s.Message);
r.DEBUG && !COMPILED && (proto.BINMoneyLog.displayName = "proto.BINMoneyLog");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMoneyLog.prototype.toObject = function(e) {
return proto.BINMoneyLog.toObject(e, this);
};
proto.BINMoneyLog.toObject = function(e, t) {
var o = {
logid: s.Message.getField(t, 1),
uuid: s.Message.getField(t, 2),
logstamp: s.Message.getField(t, 3),
insertedtime: s.Message.getField(t, 4),
currentmoney: s.Message.getField(t, 5),
changemoney: s.Message.getField(t, 6),
lastmoney: s.Message.getField(t, 7),
iscash: s.Message.getField(t, 8),
transactiontype: s.Message.getField(t, 9),
description: s.Message.getField(t, 10)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINMoneyLog.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMoneyLog();
return proto.BINMoneyLog.deserializeBinaryFromReader(o, t);
};
proto.BINMoneyLog.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setLogid(o);
break;

case 2:
o = t.readString();
e.setUuid(o);
break;

case 3:
o = t.readInt64();
e.setLogstamp(o);
break;

case 4:
o = t.readInt64();
e.setInsertedtime(o);
break;

case 5:
o = t.readInt64();
e.setCurrentmoney(o);
break;

case 6:
o = t.readInt64();
e.setChangemoney(o);
break;

case 7:
o = t.readInt64();
e.setLastmoney(o);
break;

case 8:
o = t.readBool();
e.setIscash(o);
break;

case 9:
o = t.readString();
e.setTransactiontype(o);
break;

case 10:
var o = t.readString();
e.setDescription(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMoneyLog.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMoneyLog.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMoneyLog.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt64(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt64(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt64(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeBool(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeString(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeString(10, t);
};
proto.BINMoneyLog.prototype.getLogid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINMoneyLog.prototype.setLogid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMoneyLog.prototype.clearLogid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMoneyLog.prototype.hasLogid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMoneyLog.prototype.getUuid = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINMoneyLog.prototype.setUuid = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINMoneyLog.prototype.clearUuid = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINMoneyLog.prototype.hasUuid = function() {
return null != s.Message.getField(this, 2);
};
proto.BINMoneyLog.prototype.getLogstamp = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINMoneyLog.prototype.setLogstamp = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINMoneyLog.prototype.clearLogstamp = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINMoneyLog.prototype.hasLogstamp = function() {
return null != s.Message.getField(this, 3);
};
proto.BINMoneyLog.prototype.getInsertedtime = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINMoneyLog.prototype.setInsertedtime = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINMoneyLog.prototype.clearInsertedtime = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINMoneyLog.prototype.hasInsertedtime = function() {
return null != s.Message.getField(this, 4);
};
proto.BINMoneyLog.prototype.getCurrentmoney = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINMoneyLog.prototype.setCurrentmoney = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINMoneyLog.prototype.clearCurrentmoney = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINMoneyLog.prototype.hasCurrentmoney = function() {
return null != s.Message.getField(this, 5);
};
proto.BINMoneyLog.prototype.getChangemoney = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINMoneyLog.prototype.setChangemoney = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINMoneyLog.prototype.clearChangemoney = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINMoneyLog.prototype.hasChangemoney = function() {
return null != s.Message.getField(this, 6);
};
proto.BINMoneyLog.prototype.getLastmoney = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINMoneyLog.prototype.setLastmoney = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINMoneyLog.prototype.clearLastmoney = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINMoneyLog.prototype.hasLastmoney = function() {
return null != s.Message.getField(this, 7);
};
proto.BINMoneyLog.prototype.getIscash = function() {
return s.Message.getFieldWithDefault(this, 8, !1);
};
proto.BINMoneyLog.prototype.setIscash = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINMoneyLog.prototype.clearIscash = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINMoneyLog.prototype.hasIscash = function() {
return null != s.Message.getField(this, 8);
};
proto.BINMoneyLog.prototype.getTransactiontype = function() {
return s.Message.getFieldWithDefault(this, 9, "");
};
proto.BINMoneyLog.prototype.setTransactiontype = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINMoneyLog.prototype.clearTransactiontype = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINMoneyLog.prototype.hasTransactiontype = function() {
return null != s.Message.getField(this, 9);
};
proto.BINMoneyLog.prototype.getDescription = function() {
return s.Message.getFieldWithDefault(this, 10, "");
};
proto.BINMoneyLog.prototype.setDescription = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINMoneyLog.prototype.clearDescription = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINMoneyLog.prototype.hasDescription = function() {
return null != s.Message.getField(this, 10);
};
proto.BINLookUpMoneyHistoryResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINLookUpMoneyHistoryResponse.repeatedFields_, null);
};
r.inherits(proto.BINLookUpMoneyHistoryResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINLookUpMoneyHistoryResponse.displayName = "proto.BINLookUpMoneyHistoryResponse");
proto.BINLookUpMoneyHistoryResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLookUpMoneyHistoryResponse.prototype.toObject = function(e) {
return proto.BINLookUpMoneyHistoryResponse.toObject(e, this);
};
proto.BINLookUpMoneyHistoryResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
moneylogsList: s.Message.toObjectList(t.getMoneylogsList(), proto.BINMoneyLog.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLookUpMoneyHistoryResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLookUpMoneyHistoryResponse();
return proto.BINLookUpMoneyHistoryResponse.deserializeBinaryFromReader(o, t);
};
proto.BINLookUpMoneyHistoryResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINMoneyLog();
t.readMessage(o, proto.BINMoneyLog.deserializeBinaryFromReader);
e.addMoneylogs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLookUpMoneyHistoryResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLookUpMoneyHistoryResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLookUpMoneyHistoryResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getMoneylogsList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINMoneyLog.serializeBinaryToWriter);
};
proto.BINLookUpMoneyHistoryResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINLookUpMoneyHistoryResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLookUpMoneyHistoryResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLookUpMoneyHistoryResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLookUpMoneyHistoryResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINLookUpMoneyHistoryResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLookUpMoneyHistoryResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLookUpMoneyHistoryResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLookUpMoneyHistoryResponse.prototype.getMoneylogsList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINMoneyLog, 3);
};
proto.BINLookUpMoneyHistoryResponse.prototype.setMoneylogsList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINLookUpMoneyHistoryResponse.prototype.addMoneylogs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINMoneyLog, t);
};
proto.BINLookUpMoneyHistoryResponse.prototype.clearMoneylogsList = function() {
this.setMoneylogsList([]);
};
proto.BINPurchaseCashHistoryRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPurchaseCashHistoryRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINPurchaseCashHistoryRequest.displayName = "proto.BINPurchaseCashHistoryRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPurchaseCashHistoryRequest.prototype.toObject = function(e) {
return proto.BINPurchaseCashHistoryRequest.toObject(e, this);
};
proto.BINPurchaseCashHistoryRequest.toObject = function(e, t) {
var o = {
firstresult: s.Message.getField(t, 1),
maxresult: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPurchaseCashHistoryRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPurchaseCashHistoryRequest();
return proto.BINPurchaseCashHistoryRequest.deserializeBinaryFromReader(o, t);
};
proto.BINPurchaseCashHistoryRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setFirstresult(o);
break;

case 2:
var o = t.readInt32();
e.setMaxresult(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPurchaseCashHistoryRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPurchaseCashHistoryRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPurchaseCashHistoryRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
};
proto.BINPurchaseCashHistoryRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINPurchaseCashHistoryRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPurchaseCashHistoryRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPurchaseCashHistoryRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPurchaseCashHistoryRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINPurchaseCashHistoryRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPurchaseCashHistoryRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPurchaseCashHistoryRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPurchaseCashHistory = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPurchaseCashHistory, s.Message);
r.DEBUG && !COMPILED && (proto.BINPurchaseCashHistory.displayName = "proto.BINPurchaseCashHistory");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPurchaseCashHistory.prototype.toObject = function(e) {
return proto.BINPurchaseCashHistory.toObject(e, this);
};
proto.BINPurchaseCashHistory.toObject = function(e, t) {
var o = {
logid: s.Message.getField(t, 1),
userid: s.Message.getField(t, 2),
username: s.Message.getField(t, 3),
cashvalue: s.Message.getField(t, 4),
currentcash: s.Message.getField(t, 5),
purchasedtime: s.Message.getField(t, 6)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPurchaseCashHistory.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPurchaseCashHistory();
return proto.BINPurchaseCashHistory.deserializeBinaryFromReader(o, t);
};
proto.BINPurchaseCashHistory.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setLogid(o);
break;

case 2:
o = t.readInt64();
e.setUserid(o);
break;

case 3:
o = t.readString();
e.setUsername(o);
break;

case 4:
o = t.readInt64();
e.setCashvalue(o);
break;

case 5:
o = t.readInt64();
e.setCurrentcash(o);
break;

case 6:
var o = t.readInt64();
e.setPurchasedtime(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPurchaseCashHistory.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPurchaseCashHistory.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPurchaseCashHistory.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt64(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt64(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt64(6, t);
};
proto.BINPurchaseCashHistory.prototype.getLogid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINPurchaseCashHistory.prototype.setLogid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPurchaseCashHistory.prototype.clearLogid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPurchaseCashHistory.prototype.hasLogid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPurchaseCashHistory.prototype.getUserid = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINPurchaseCashHistory.prototype.setUserid = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPurchaseCashHistory.prototype.clearUserid = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPurchaseCashHistory.prototype.hasUserid = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPurchaseCashHistory.prototype.getUsername = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINPurchaseCashHistory.prototype.setUsername = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINPurchaseCashHistory.prototype.clearUsername = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINPurchaseCashHistory.prototype.hasUsername = function() {
return null != s.Message.getField(this, 3);
};
proto.BINPurchaseCashHistory.prototype.getCashvalue = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINPurchaseCashHistory.prototype.setCashvalue = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINPurchaseCashHistory.prototype.clearCashvalue = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINPurchaseCashHistory.prototype.hasCashvalue = function() {
return null != s.Message.getField(this, 4);
};
proto.BINPurchaseCashHistory.prototype.getCurrentcash = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINPurchaseCashHistory.prototype.setCurrentcash = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINPurchaseCashHistory.prototype.clearCurrentcash = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINPurchaseCashHistory.prototype.hasCurrentcash = function() {
return null != s.Message.getField(this, 5);
};
proto.BINPurchaseCashHistory.prototype.getPurchasedtime = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINPurchaseCashHistory.prototype.setPurchasedtime = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINPurchaseCashHistory.prototype.clearPurchasedtime = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINPurchaseCashHistory.prototype.hasPurchasedtime = function() {
return null != s.Message.getField(this, 6);
};
proto.BINPurchaseCashHistoryResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINPurchaseCashHistoryResponse.repeatedFields_, null);
};
r.inherits(proto.BINPurchaseCashHistoryResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINPurchaseCashHistoryResponse.displayName = "proto.BINPurchaseCashHistoryResponse");
proto.BINPurchaseCashHistoryResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPurchaseCashHistoryResponse.prototype.toObject = function(e) {
return proto.BINPurchaseCashHistoryResponse.toObject(e, this);
};
proto.BINPurchaseCashHistoryResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
purchasehistoriesList: s.Message.toObjectList(t.getPurchasehistoriesList(), proto.BINPurchaseCashHistory.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPurchaseCashHistoryResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPurchaseCashHistoryResponse();
return proto.BINPurchaseCashHistoryResponse.deserializeBinaryFromReader(o, t);
};
proto.BINPurchaseCashHistoryResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINPurchaseCashHistory();
t.readMessage(o, proto.BINPurchaseCashHistory.deserializeBinaryFromReader);
e.addPurchasehistories(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPurchaseCashHistoryResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPurchaseCashHistoryResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPurchaseCashHistoryResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getPurchasehistoriesList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINPurchaseCashHistory.serializeBinaryToWriter);
};
proto.BINPurchaseCashHistoryResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINPurchaseCashHistoryResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPurchaseCashHistoryResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPurchaseCashHistoryResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPurchaseCashHistoryResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINPurchaseCashHistoryResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPurchaseCashHistoryResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPurchaseCashHistoryResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPurchaseCashHistoryResponse.prototype.getPurchasehistoriesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINPurchaseCashHistory, 3);
};
proto.BINPurchaseCashHistoryResponse.prototype.setPurchasehistoriesList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINPurchaseCashHistoryResponse.prototype.addPurchasehistories = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINPurchaseCashHistory, t);
};
proto.BINPurchaseCashHistoryResponse.prototype.clearPurchasehistoriesList = function() {
this.setPurchasehistoriesList([]);
};
proto.BINExchangeGoldHistoryRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINExchangeGoldHistoryRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINExchangeGoldHistoryRequest.displayName = "proto.BINExchangeGoldHistoryRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINExchangeGoldHistoryRequest.prototype.toObject = function(e) {
return proto.BINExchangeGoldHistoryRequest.toObject(e, this);
};
proto.BINExchangeGoldHistoryRequest.toObject = function(e, t) {
var o = {
firstresult: s.Message.getField(t, 1),
maxresult: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINExchangeGoldHistoryRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINExchangeGoldHistoryRequest();
return proto.BINExchangeGoldHistoryRequest.deserializeBinaryFromReader(o, t);
};
proto.BINExchangeGoldHistoryRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setFirstresult(o);
break;

case 2:
var o = t.readInt32();
e.setMaxresult(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINExchangeGoldHistoryRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINExchangeGoldHistoryRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINExchangeGoldHistoryRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
};
proto.BINExchangeGoldHistoryRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINExchangeGoldHistoryRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINExchangeGoldHistoryRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINExchangeGoldHistoryRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 1);
};
proto.BINExchangeGoldHistoryRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINExchangeGoldHistoryRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINExchangeGoldHistoryRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINExchangeGoldHistoryRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 2);
};
proto.BINExchangeGoldHistory = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINExchangeGoldHistory, s.Message);
r.DEBUG && !COMPILED && (proto.BINExchangeGoldHistory.displayName = "proto.BINExchangeGoldHistory");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINExchangeGoldHistory.prototype.toObject = function(e) {
return proto.BINExchangeGoldHistory.toObject(e, this);
};
proto.BINExchangeGoldHistory.toObject = function(e, t) {
var o = {
logid: s.Message.getField(t, 1),
userid: s.Message.getField(t, 2),
username: s.Message.getField(t, 3),
cashvalue: s.Message.getField(t, 4),
goldvalue: s.Message.getField(t, 5),
exchangedtime: s.Message.getField(t, 6)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINExchangeGoldHistory.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINExchangeGoldHistory();
return proto.BINExchangeGoldHistory.deserializeBinaryFromReader(o, t);
};
proto.BINExchangeGoldHistory.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setLogid(o);
break;

case 2:
o = t.readInt64();
e.setUserid(o);
break;

case 3:
o = t.readString();
e.setUsername(o);
break;

case 4:
o = t.readInt64();
e.setCashvalue(o);
break;

case 5:
o = t.readInt64();
e.setGoldvalue(o);
break;

case 6:
var o = t.readInt64();
e.setExchangedtime(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINExchangeGoldHistory.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINExchangeGoldHistory.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINExchangeGoldHistory.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt64(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt64(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt64(6, t);
};
proto.BINExchangeGoldHistory.prototype.getLogid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINExchangeGoldHistory.prototype.setLogid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINExchangeGoldHistory.prototype.clearLogid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINExchangeGoldHistory.prototype.hasLogid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINExchangeGoldHistory.prototype.getUserid = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINExchangeGoldHistory.prototype.setUserid = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINExchangeGoldHistory.prototype.clearUserid = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINExchangeGoldHistory.prototype.hasUserid = function() {
return null != s.Message.getField(this, 2);
};
proto.BINExchangeGoldHistory.prototype.getUsername = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINExchangeGoldHistory.prototype.setUsername = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINExchangeGoldHistory.prototype.clearUsername = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINExchangeGoldHistory.prototype.hasUsername = function() {
return null != s.Message.getField(this, 3);
};
proto.BINExchangeGoldHistory.prototype.getCashvalue = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINExchangeGoldHistory.prototype.setCashvalue = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINExchangeGoldHistory.prototype.clearCashvalue = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINExchangeGoldHistory.prototype.hasCashvalue = function() {
return null != s.Message.getField(this, 4);
};
proto.BINExchangeGoldHistory.prototype.getGoldvalue = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINExchangeGoldHistory.prototype.setGoldvalue = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINExchangeGoldHistory.prototype.clearGoldvalue = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINExchangeGoldHistory.prototype.hasGoldvalue = function() {
return null != s.Message.getField(this, 5);
};
proto.BINExchangeGoldHistory.prototype.getExchangedtime = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINExchangeGoldHistory.prototype.setExchangedtime = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINExchangeGoldHistory.prototype.clearExchangedtime = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINExchangeGoldHistory.prototype.hasExchangedtime = function() {
return null != s.Message.getField(this, 6);
};
proto.BINExchangeGoldHistoryResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINExchangeGoldHistoryResponse.repeatedFields_, null);
};
r.inherits(proto.BINExchangeGoldHistoryResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINExchangeGoldHistoryResponse.displayName = "proto.BINExchangeGoldHistoryResponse");
proto.BINExchangeGoldHistoryResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINExchangeGoldHistoryResponse.prototype.toObject = function(e) {
return proto.BINExchangeGoldHistoryResponse.toObject(e, this);
};
proto.BINExchangeGoldHistoryResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
exchangehistoriesList: s.Message.toObjectList(t.getExchangehistoriesList(), proto.BINExchangeGoldHistory.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINExchangeGoldHistoryResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINExchangeGoldHistoryResponse();
return proto.BINExchangeGoldHistoryResponse.deserializeBinaryFromReader(o, t);
};
proto.BINExchangeGoldHistoryResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINExchangeGoldHistory();
t.readMessage(o, proto.BINExchangeGoldHistory.deserializeBinaryFromReader);
e.addExchangehistories(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINExchangeGoldHistoryResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINExchangeGoldHistoryResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINExchangeGoldHistoryResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getExchangehistoriesList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINExchangeGoldHistory.serializeBinaryToWriter);
};
proto.BINExchangeGoldHistoryResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINExchangeGoldHistoryResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINExchangeGoldHistoryResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINExchangeGoldHistoryResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINExchangeGoldHistoryResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINExchangeGoldHistoryResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINExchangeGoldHistoryResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINExchangeGoldHistoryResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINExchangeGoldHistoryResponse.prototype.getExchangehistoriesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINExchangeGoldHistory, 3);
};
proto.BINExchangeGoldHistoryResponse.prototype.setExchangehistoriesList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINExchangeGoldHistoryResponse.prototype.addExchangehistories = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINExchangeGoldHistory, t);
};
proto.BINExchangeGoldHistoryResponse.prototype.clearExchangehistoriesList = function() {
this.setExchangehistoriesList([]);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
lookup_room_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "655a4ZJAQhPf57BoVLdjAgW", "lookup_room_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINLookUpRoomRequest", null, i);
r.exportSymbol("proto.BINLookUpRoomResponse", null, i);
r.exportSymbol("proto.BINRoomInfo", null, i);
proto.BINLookUpRoomRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINLookUpRoomRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINLookUpRoomRequest.displayName = "proto.BINLookUpRoomRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLookUpRoomRequest.prototype.toObject = function(e) {
return proto.BINLookUpRoomRequest.toObject(e, this);
};
proto.BINLookUpRoomRequest.toObject = function(e, t) {
var o = {
zoneid: s.Message.getField(t, 1),
type: s.Message.getField(t, 2),
firstresult: s.Message.getField(t, 3),
maxresult: s.Message.getField(t, 4),
orderbyfield: s.Message.getField(t, 5),
asc: s.Message.getField(t, 6),
roomgroup: s.Message.getField(t, 7)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLookUpRoomRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLookUpRoomRequest();
return proto.BINLookUpRoomRequest.deserializeBinaryFromReader(o, t);
};
proto.BINLookUpRoomRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setZoneid(o);
break;

case 2:
o = t.readInt32();
e.setType(o);
break;

case 3:
o = t.readInt32();
e.setFirstresult(o);
break;

case 4:
o = t.readInt32();
e.setMaxresult(o);
break;

case 5:
o = t.readInt32();
e.setOrderbyfield(o);
break;

case 6:
o = t.readBool();
e.setAsc(o);
break;

case 7:
var o = t.readInt32();
e.setRoomgroup(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLookUpRoomRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLookUpRoomRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLookUpRoomRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeBool(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt32(7, t);
};
proto.BINLookUpRoomRequest.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINLookUpRoomRequest.prototype.setZoneid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLookUpRoomRequest.prototype.clearZoneid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLookUpRoomRequest.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLookUpRoomRequest.prototype.getType = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINLookUpRoomRequest.prototype.setType = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLookUpRoomRequest.prototype.clearType = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLookUpRoomRequest.prototype.hasType = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLookUpRoomRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINLookUpRoomRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINLookUpRoomRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINLookUpRoomRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 3);
};
proto.BINLookUpRoomRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINLookUpRoomRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINLookUpRoomRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINLookUpRoomRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 4);
};
proto.BINLookUpRoomRequest.prototype.getOrderbyfield = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINLookUpRoomRequest.prototype.setOrderbyfield = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINLookUpRoomRequest.prototype.clearOrderbyfield = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINLookUpRoomRequest.prototype.hasOrderbyfield = function() {
return null != s.Message.getField(this, 5);
};
proto.BINLookUpRoomRequest.prototype.getAsc = function() {
return s.Message.getFieldWithDefault(this, 6, !1);
};
proto.BINLookUpRoomRequest.prototype.setAsc = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINLookUpRoomRequest.prototype.clearAsc = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINLookUpRoomRequest.prototype.hasAsc = function() {
return null != s.Message.getField(this, 6);
};
proto.BINLookUpRoomRequest.prototype.getRoomgroup = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINLookUpRoomRequest.prototype.setRoomgroup = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINLookUpRoomRequest.prototype.clearRoomgroup = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINLookUpRoomRequest.prototype.hasRoomgroup = function() {
return null != s.Message.getField(this, 7);
};
proto.BINRoomInfo = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRoomInfo, s.Message);
r.DEBUG && !COMPILED && (proto.BINRoomInfo.displayName = "proto.BINRoomInfo");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRoomInfo.prototype.toObject = function(e) {
return proto.BINRoomInfo.toObject(e, this);
};
proto.BINRoomInfo.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1),
minbet: s.Message.getField(t, 2),
minentermoney: s.Message.getField(t, 3),
playersize: s.Message.getField(t, 4),
playingplayer: s.Message.getField(t, 5),
isplaying: s.Message.getField(t, 6),
roomconfig: s.Message.getField(t, 7)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRoomInfo.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRoomInfo();
return proto.BINRoomInfo.deserializeBinaryFromReader(o, t);
};
proto.BINRoomInfo.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRoomindex(o);
break;

case 2:
o = t.readInt32();
e.setMinbet(o);
break;

case 3:
o = t.readInt64();
e.setMinentermoney(o);
break;

case 4:
o = t.readInt32();
e.setPlayersize(o);
break;

case 5:
o = t.readInt32();
e.setPlayingplayer(o);
break;

case 6:
o = t.readBool();
e.setIsplaying(o);
break;

case 7:
var o = t.readString();
e.setRoomconfig(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRoomInfo.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRoomInfo.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRoomInfo.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeBool(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeString(7, t);
};
proto.BINRoomInfo.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINRoomInfo.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRoomInfo.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRoomInfo.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRoomInfo.prototype.getMinbet = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINRoomInfo.prototype.setMinbet = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRoomInfo.prototype.clearMinbet = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRoomInfo.prototype.hasMinbet = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRoomInfo.prototype.getMinentermoney = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINRoomInfo.prototype.setMinentermoney = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINRoomInfo.prototype.clearMinentermoney = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINRoomInfo.prototype.hasMinentermoney = function() {
return null != s.Message.getField(this, 3);
};
proto.BINRoomInfo.prototype.getPlayersize = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINRoomInfo.prototype.setPlayersize = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINRoomInfo.prototype.clearPlayersize = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINRoomInfo.prototype.hasPlayersize = function() {
return null != s.Message.getField(this, 4);
};
proto.BINRoomInfo.prototype.getPlayingplayer = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINRoomInfo.prototype.setPlayingplayer = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINRoomInfo.prototype.clearPlayingplayer = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINRoomInfo.prototype.hasPlayingplayer = function() {
return null != s.Message.getField(this, 5);
};
proto.BINRoomInfo.prototype.getIsplaying = function() {
return s.Message.getFieldWithDefault(this, 6, !1);
};
proto.BINRoomInfo.prototype.setIsplaying = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINRoomInfo.prototype.clearIsplaying = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINRoomInfo.prototype.hasIsplaying = function() {
return null != s.Message.getField(this, 6);
};
proto.BINRoomInfo.prototype.getRoomconfig = function() {
return s.Message.getFieldWithDefault(this, 7, "");
};
proto.BINRoomInfo.prototype.setRoomconfig = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINRoomInfo.prototype.clearRoomconfig = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINRoomInfo.prototype.hasRoomconfig = function() {
return null != s.Message.getField(this, 7);
};
proto.BINLookUpRoomResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINLookUpRoomResponse.repeatedFields_, null);
};
r.inherits(proto.BINLookUpRoomResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINLookUpRoomResponse.displayName = "proto.BINLookUpRoomResponse");
proto.BINLookUpRoomResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINLookUpRoomResponse.prototype.toObject = function(e) {
return proto.BINLookUpRoomResponse.toObject(e, this);
};
proto.BINLookUpRoomResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
roominfosList: s.Message.toObjectList(t.getRoominfosList(), proto.BINRoomInfo.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINLookUpRoomResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINLookUpRoomResponse();
return proto.BINLookUpRoomResponse.deserializeBinaryFromReader(o, t);
};
proto.BINLookUpRoomResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINRoomInfo();
t.readMessage(o, proto.BINRoomInfo.deserializeBinaryFromReader);
e.addRoominfos(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINLookUpRoomResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINLookUpRoomResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINLookUpRoomResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getRoominfosList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINRoomInfo.serializeBinaryToWriter);
};
proto.BINLookUpRoomResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINLookUpRoomResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINLookUpRoomResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINLookUpRoomResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINLookUpRoomResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINLookUpRoomResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINLookUpRoomResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINLookUpRoomResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINLookUpRoomResponse.prototype.getRoominfosList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINRoomInfo, 3);
};
proto.BINLookUpRoomResponse.prototype.setRoominfosList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINLookUpRoomResponse.prototype.addRoominfos = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINRoomInfo, t);
};
proto.BINLookUpRoomResponse.prototype.clearRoominfosList = function() {
this.setRoominfosList([]);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
mail_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "5f4cdBwZXRBZaSmwoJx7UmM", "mail_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINClaimAttachItemRequest", null, i);
r.exportSymbol("proto.BINClaimAttachItemResponse", null, i);
r.exportSymbol("proto.BINDeleteMailRequest", null, i);
r.exportSymbol("proto.BINDeleteMailResponse", null, i);
r.exportSymbol("proto.BINFilterMailRequest", null, i);
r.exportSymbol("proto.BINFilterMailResponse", null, i);
r.exportSymbol("proto.BINMail", null, i);
r.exportSymbol("proto.BINReadedMailRequest", null, i);
r.exportSymbol("proto.BINReadedMailResponse", null, i);
r.exportSymbol("proto.BINSendMailRequest", null, i);
r.exportSymbol("proto.BINSendMailResponse", null, i);
proto.BINMail = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINMail, s.Message);
r.DEBUG && !COMPILED && (proto.BINMail.displayName = "proto.BINMail");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMail.prototype.toObject = function(e) {
return proto.BINMail.toObject(e, this);
};
proto.BINMail.toObject = function(e, t) {
var o = {
mailid: s.Message.getField(t, 1),
senderuserid: s.Message.getField(t, 2),
senderusername: s.Message.getField(t, 3),
recipientuserid: s.Message.getField(t, 4),
recipientusername: s.Message.getField(t, 5),
title: s.Message.getField(t, 6),
body: s.Message.getField(t, 7),
senttime: s.Message.getField(t, 8),
readed: s.Message.getField(t, 9),
attachitemid: s.Message.getField(t, 10),
attachitemquatity: s.Message.getField(t, 11),
expiredtime: s.Message.getField(t, 12),
expandeddata: s.Message.getField(t, 13)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINMail.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMail();
return proto.BINMail.deserializeBinaryFromReader(o, t);
};
proto.BINMail.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setMailid(o);
break;

case 2:
o = t.readInt64();
e.setSenderuserid(o);
break;

case 3:
o = t.readString();
e.setSenderusername(o);
break;

case 4:
o = t.readInt64();
e.setRecipientuserid(o);
break;

case 5:
o = t.readString();
e.setRecipientusername(o);
break;

case 6:
o = t.readString();
e.setTitle(o);
break;

case 7:
o = t.readString();
e.setBody(o);
break;

case 8:
o = t.readInt64();
e.setSenttime(o);
break;

case 9:
o = t.readBool();
e.setReaded(o);
break;

case 10:
o = t.readInt32();
e.setAttachitemid(o);
break;

case 11:
o = t.readInt64();
e.setAttachitemquatity(o);
break;

case 12:
o = t.readInt64();
e.setExpiredtime(o);
break;

case 13:
var o = t.readString();
e.setExpandeddata(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMail.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMail.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMail.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt64(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeString(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeString(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeInt64(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeBool(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeInt32(10, t);
null != (t = s.Message.getField(this, 11)) && e.writeInt64(11, t);
null != (t = s.Message.getField(this, 12)) && e.writeInt64(12, t);
null != (t = s.Message.getField(this, 13)) && e.writeString(13, t);
};
proto.BINMail.prototype.getMailid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINMail.prototype.setMailid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMail.prototype.clearMailid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMail.prototype.hasMailid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMail.prototype.getSenderuserid = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINMail.prototype.setSenderuserid = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINMail.prototype.clearSenderuserid = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINMail.prototype.hasSenderuserid = function() {
return null != s.Message.getField(this, 2);
};
proto.BINMail.prototype.getSenderusername = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINMail.prototype.setSenderusername = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINMail.prototype.clearSenderusername = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINMail.prototype.hasSenderusername = function() {
return null != s.Message.getField(this, 3);
};
proto.BINMail.prototype.getRecipientuserid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINMail.prototype.setRecipientuserid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINMail.prototype.clearRecipientuserid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINMail.prototype.hasRecipientuserid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINMail.prototype.getRecipientusername = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINMail.prototype.setRecipientusername = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINMail.prototype.clearRecipientusername = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINMail.prototype.hasRecipientusername = function() {
return null != s.Message.getField(this, 5);
};
proto.BINMail.prototype.getTitle = function() {
return s.Message.getFieldWithDefault(this, 6, "");
};
proto.BINMail.prototype.setTitle = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINMail.prototype.clearTitle = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINMail.prototype.hasTitle = function() {
return null != s.Message.getField(this, 6);
};
proto.BINMail.prototype.getBody = function() {
return s.Message.getFieldWithDefault(this, 7, "");
};
proto.BINMail.prototype.setBody = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINMail.prototype.clearBody = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINMail.prototype.hasBody = function() {
return null != s.Message.getField(this, 7);
};
proto.BINMail.prototype.getSenttime = function() {
return s.Message.getFieldWithDefault(this, 8, 0);
};
proto.BINMail.prototype.setSenttime = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINMail.prototype.clearSenttime = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINMail.prototype.hasSenttime = function() {
return null != s.Message.getField(this, 8);
};
proto.BINMail.prototype.getReaded = function() {
return s.Message.getFieldWithDefault(this, 9, !1);
};
proto.BINMail.prototype.setReaded = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINMail.prototype.clearReaded = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINMail.prototype.hasReaded = function() {
return null != s.Message.getField(this, 9);
};
proto.BINMail.prototype.getAttachitemid = function() {
return s.Message.getFieldWithDefault(this, 10, 0);
};
proto.BINMail.prototype.setAttachitemid = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINMail.prototype.clearAttachitemid = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINMail.prototype.hasAttachitemid = function() {
return null != s.Message.getField(this, 10);
};
proto.BINMail.prototype.getAttachitemquatity = function() {
return s.Message.getFieldWithDefault(this, 11, 0);
};
proto.BINMail.prototype.setAttachitemquatity = function(e) {
s.Message.setField(this, 11, e);
};
proto.BINMail.prototype.clearAttachitemquatity = function() {
s.Message.setField(this, 11, void 0);
};
proto.BINMail.prototype.hasAttachitemquatity = function() {
return null != s.Message.getField(this, 11);
};
proto.BINMail.prototype.getExpiredtime = function() {
return s.Message.getFieldWithDefault(this, 12, 0);
};
proto.BINMail.prototype.setExpiredtime = function(e) {
s.Message.setField(this, 12, e);
};
proto.BINMail.prototype.clearExpiredtime = function() {
s.Message.setField(this, 12, void 0);
};
proto.BINMail.prototype.hasExpiredtime = function() {
return null != s.Message.getField(this, 12);
};
proto.BINMail.prototype.getExpandeddata = function() {
return s.Message.getFieldWithDefault(this, 13, "");
};
proto.BINMail.prototype.setExpandeddata = function(e) {
s.Message.setField(this, 13, e);
};
proto.BINMail.prototype.clearExpandeddata = function() {
s.Message.setField(this, 13, void 0);
};
proto.BINMail.prototype.hasExpandeddata = function() {
return null != s.Message.getField(this, 13);
};
proto.BINFilterMailRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINFilterMailRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINFilterMailRequest.displayName = "proto.BINFilterMailRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFilterMailRequest.prototype.toObject = function(e) {
return proto.BINFilterMailRequest.toObject(e, this);
};
proto.BINFilterMailRequest.toObject = function(e, t) {
var o = {
firstresult: s.Message.getField(t, 1),
maxresult: s.Message.getField(t, 2),
lastrequesttime: s.Message.getField(t, 3),
sentmail: s.Message.getField(t, 4)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFilterMailRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFilterMailRequest();
return proto.BINFilterMailRequest.deserializeBinaryFromReader(o, t);
};
proto.BINFilterMailRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setFirstresult(o);
break;

case 2:
o = t.readInt32();
e.setMaxresult(o);
break;

case 3:
o = t.readInt64();
e.setLastrequesttime(o);
break;

case 4:
var o = t.readBool();
e.setSentmail(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFilterMailRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFilterMailRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFilterMailRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeBool(4, t);
};
proto.BINFilterMailRequest.prototype.getFirstresult = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINFilterMailRequest.prototype.setFirstresult = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFilterMailRequest.prototype.clearFirstresult = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFilterMailRequest.prototype.hasFirstresult = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFilterMailRequest.prototype.getMaxresult = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINFilterMailRequest.prototype.setMaxresult = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFilterMailRequest.prototype.clearMaxresult = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFilterMailRequest.prototype.hasMaxresult = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFilterMailRequest.prototype.getLastrequesttime = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINFilterMailRequest.prototype.setLastrequesttime = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINFilterMailRequest.prototype.clearLastrequesttime = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINFilterMailRequest.prototype.hasLastrequesttime = function() {
return null != s.Message.getField(this, 3);
};
proto.BINFilterMailRequest.prototype.getSentmail = function() {
return s.Message.getFieldWithDefault(this, 4, !1);
};
proto.BINFilterMailRequest.prototype.setSentmail = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINFilterMailRequest.prototype.clearSentmail = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINFilterMailRequest.prototype.hasSentmail = function() {
return null != s.Message.getField(this, 4);
};
proto.BINFilterMailResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINFilterMailResponse.repeatedFields_, null);
};
r.inherits(proto.BINFilterMailResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINFilterMailResponse.displayName = "proto.BINFilterMailResponse");
proto.BINFilterMailResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINFilterMailResponse.prototype.toObject = function(e) {
return proto.BINFilterMailResponse.toObject(e, this);
};
proto.BINFilterMailResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
mailsList: s.Message.toObjectList(t.getMailsList(), proto.BINMail.toObject, e),
count: s.Message.getField(t, 4),
lastrequesttime: s.Message.getField(t, 5),
sentmail: s.Message.getField(t, 6)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINFilterMailResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINFilterMailResponse();
return proto.BINFilterMailResponse.deserializeBinaryFromReader(o, t);
};
proto.BINFilterMailResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = new proto.BINMail();
t.readMessage(o, proto.BINMail.deserializeBinaryFromReader);
e.addMails(o);
break;

case 4:
o = t.readInt32();
e.setCount(o);
break;

case 5:
o = t.readInt64();
e.setLastrequesttime(o);
break;

case 6:
var o = t.readBool();
e.setSentmail(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINFilterMailResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINFilterMailResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINFilterMailResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getMailsList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINMail.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt64(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeBool(6, t);
};
proto.BINFilterMailResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINFilterMailResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINFilterMailResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINFilterMailResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINFilterMailResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINFilterMailResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINFilterMailResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINFilterMailResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINFilterMailResponse.prototype.getMailsList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINMail, 3);
};
proto.BINFilterMailResponse.prototype.setMailsList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINFilterMailResponse.prototype.addMails = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINMail, t);
};
proto.BINFilterMailResponse.prototype.clearMailsList = function() {
this.setMailsList([]);
};
proto.BINFilterMailResponse.prototype.getCount = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINFilterMailResponse.prototype.setCount = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINFilterMailResponse.prototype.clearCount = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINFilterMailResponse.prototype.hasCount = function() {
return null != s.Message.getField(this, 4);
};
proto.BINFilterMailResponse.prototype.getLastrequesttime = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINFilterMailResponse.prototype.setLastrequesttime = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINFilterMailResponse.prototype.clearLastrequesttime = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINFilterMailResponse.prototype.hasLastrequesttime = function() {
return null != s.Message.getField(this, 5);
};
proto.BINFilterMailResponse.prototype.getSentmail = function() {
return s.Message.getFieldWithDefault(this, 6, !1);
};
proto.BINFilterMailResponse.prototype.setSentmail = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINFilterMailResponse.prototype.clearSentmail = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINFilterMailResponse.prototype.hasSentmail = function() {
return null != s.Message.getField(this, 6);
};
proto.BINSendMailRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINSendMailRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINSendMailRequest.displayName = "proto.BINSendMailRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINSendMailRequest.prototype.toObject = function(e) {
return proto.BINSendMailRequest.toObject(e, this);
};
proto.BINSendMailRequest.toObject = function(e, t) {
var o = {
recipientuserid: s.Message.getField(t, 1),
title: s.Message.getField(t, 2),
body: s.Message.getField(t, 3),
parentid: s.Message.getField(t, 4)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINSendMailRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINSendMailRequest();
return proto.BINSendMailRequest.deserializeBinaryFromReader(o, t);
};
proto.BINSendMailRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setRecipientuserid(o);
break;

case 2:
o = t.readString();
e.setTitle(o);
break;

case 3:
o = t.readString();
e.setBody(o);
break;

case 4:
var o = t.readInt64();
e.setParentid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINSendMailRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINSendMailRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINSendMailRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
};
proto.BINSendMailRequest.prototype.getRecipientuserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINSendMailRequest.prototype.setRecipientuserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINSendMailRequest.prototype.clearRecipientuserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINSendMailRequest.prototype.hasRecipientuserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINSendMailRequest.prototype.getTitle = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINSendMailRequest.prototype.setTitle = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINSendMailRequest.prototype.clearTitle = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINSendMailRequest.prototype.hasTitle = function() {
return null != s.Message.getField(this, 2);
};
proto.BINSendMailRequest.prototype.getBody = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINSendMailRequest.prototype.setBody = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINSendMailRequest.prototype.clearBody = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINSendMailRequest.prototype.hasBody = function() {
return null != s.Message.getField(this, 3);
};
proto.BINSendMailRequest.prototype.getParentid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINSendMailRequest.prototype.setParentid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINSendMailRequest.prototype.clearParentid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINSendMailRequest.prototype.hasParentid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINSendMailResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINSendMailResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINSendMailResponse.displayName = "proto.BINSendMailResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINSendMailResponse.prototype.toObject = function(e) {
return proto.BINSendMailResponse.toObject(e, this);
};
proto.BINSendMailResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINSendMailResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINSendMailResponse();
return proto.BINSendMailResponse.deserializeBinaryFromReader(o, t);
};
proto.BINSendMailResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
var o = t.readString();
e.setMessage(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINSendMailResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINSendMailResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINSendMailResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINSendMailResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINSendMailResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINSendMailResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINSendMailResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINSendMailResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINSendMailResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINSendMailResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINSendMailResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINDeleteMailRequest = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINDeleteMailRequest.repeatedFields_, null);
};
r.inherits(proto.BINDeleteMailRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINDeleteMailRequest.displayName = "proto.BINDeleteMailRequest");
proto.BINDeleteMailRequest.repeatedFields_ = [ 1 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINDeleteMailRequest.prototype.toObject = function(e) {
return proto.BINDeleteMailRequest.toObject(e, this);
};
proto.BINDeleteMailRequest.toObject = function(e, t) {
var o = {
selectedmailidsList: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINDeleteMailRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINDeleteMailRequest();
return proto.BINDeleteMailRequest.deserializeBinaryFromReader(o, t);
};
proto.BINDeleteMailRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt64();
e.addSelectedmailids(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINDeleteMailRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINDeleteMailRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINDeleteMailRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
(t = this.getSelectedmailidsList()).length > 0 && e.writeRepeatedInt64(1, t);
};
proto.BINDeleteMailRequest.prototype.getSelectedmailidsList = function() {
return s.Message.getField(this, 1);
};
proto.BINDeleteMailRequest.prototype.setSelectedmailidsList = function(e) {
s.Message.setField(this, 1, e || []);
};
proto.BINDeleteMailRequest.prototype.addSelectedmailids = function(e, t) {
s.Message.addToRepeatedField(this, 1, e, t);
};
proto.BINDeleteMailRequest.prototype.clearSelectedmailidsList = function() {
this.setSelectedmailidsList([]);
};
proto.BINDeleteMailResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINDeleteMailResponse.repeatedFields_, null);
};
r.inherits(proto.BINDeleteMailResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINDeleteMailResponse.displayName = "proto.BINDeleteMailResponse");
proto.BINDeleteMailResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINDeleteMailResponse.prototype.toObject = function(e) {
return proto.BINDeleteMailResponse.toObject(e, this);
};
proto.BINDeleteMailResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
deletedmailidsList: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINDeleteMailResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINDeleteMailResponse();
return proto.BINDeleteMailResponse.deserializeBinaryFromReader(o, t);
};
proto.BINDeleteMailResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = t.readInt64();
e.addDeletedmailids(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINDeleteMailResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINDeleteMailResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINDeleteMailResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getDeletedmailidsList()).length > 0 && e.writeRepeatedInt64(3, t);
};
proto.BINDeleteMailResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINDeleteMailResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINDeleteMailResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINDeleteMailResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINDeleteMailResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINDeleteMailResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINDeleteMailResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINDeleteMailResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINDeleteMailResponse.prototype.getDeletedmailidsList = function() {
return s.Message.getField(this, 3);
};
proto.BINDeleteMailResponse.prototype.setDeletedmailidsList = function(e) {
s.Message.setField(this, 3, e || []);
};
proto.BINDeleteMailResponse.prototype.addDeletedmailids = function(e, t) {
s.Message.addToRepeatedField(this, 3, e, t);
};
proto.BINDeleteMailResponse.prototype.clearDeletedmailidsList = function() {
this.setDeletedmailidsList([]);
};
proto.BINReadedMailRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINReadedMailRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINReadedMailRequest.displayName = "proto.BINReadedMailRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINReadedMailRequest.prototype.toObject = function(e) {
return proto.BINReadedMailRequest.toObject(e, this);
};
proto.BINReadedMailRequest.toObject = function(e, t) {
var o = {
readedmailid: s.Message.getField(t, 1),
getcontent: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINReadedMailRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINReadedMailRequest();
return proto.BINReadedMailRequest.deserializeBinaryFromReader(o, t);
};
proto.BINReadedMailRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setReadedmailid(o);
break;

case 2:
var o = t.readBool();
e.setGetcontent(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINReadedMailRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINReadedMailRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINReadedMailRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeBool(2, t);
};
proto.BINReadedMailRequest.prototype.getReadedmailid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINReadedMailRequest.prototype.setReadedmailid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINReadedMailRequest.prototype.clearReadedmailid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINReadedMailRequest.prototype.hasReadedmailid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINReadedMailRequest.prototype.getGetcontent = function() {
return s.Message.getFieldWithDefault(this, 2, !1);
};
proto.BINReadedMailRequest.prototype.setGetcontent = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINReadedMailRequest.prototype.clearGetcontent = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINReadedMailRequest.prototype.hasGetcontent = function() {
return null != s.Message.getField(this, 2);
};
proto.BINReadedMailResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINReadedMailResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINReadedMailResponse.displayName = "proto.BINReadedMailResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINReadedMailResponse.prototype.toObject = function(e) {
return proto.BINReadedMailResponse.toObject(e, this);
};
proto.BINReadedMailResponse.toObject = function(e, t) {
var o, r = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
mail: (o = t.getMail()) && proto.BINMail.toObject(e, o)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINReadedMailResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINReadedMailResponse();
return proto.BINReadedMailResponse.deserializeBinaryFromReader(o, t);
};
proto.BINReadedMailResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINMail();
t.readMessage(o, proto.BINMail.deserializeBinaryFromReader);
e.setMail(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINReadedMailResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINReadedMailResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINReadedMailResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = this.getMail()) && e.writeMessage(3, t, proto.BINMail.serializeBinaryToWriter);
};
proto.BINReadedMailResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINReadedMailResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINReadedMailResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINReadedMailResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINReadedMailResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINReadedMailResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINReadedMailResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINReadedMailResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINReadedMailResponse.prototype.getMail = function() {
return s.Message.getWrapperField(this, proto.BINMail, 3);
};
proto.BINReadedMailResponse.prototype.setMail = function(e) {
s.Message.setWrapperField(this, 3, e);
};
proto.BINReadedMailResponse.prototype.clearMail = function() {
this.setMail(void 0);
};
proto.BINReadedMailResponse.prototype.hasMail = function() {
return null != s.Message.getField(this, 3);
};
proto.BINClaimAttachItemRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINClaimAttachItemRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINClaimAttachItemRequest.displayName = "proto.BINClaimAttachItemRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINClaimAttachItemRequest.prototype.toObject = function(e) {
return proto.BINClaimAttachItemRequest.toObject(e, this);
};
proto.BINClaimAttachItemRequest.toObject = function(e, t) {
var o = {
mailid: s.Message.getField(t, 1),
captchaanswers: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINClaimAttachItemRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINClaimAttachItemRequest();
return proto.BINClaimAttachItemRequest.deserializeBinaryFromReader(o, t);
};
proto.BINClaimAttachItemRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setMailid(o);
break;

case 2:
var o = t.readString();
e.setCaptchaanswers(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINClaimAttachItemRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINClaimAttachItemRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINClaimAttachItemRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINClaimAttachItemRequest.prototype.getMailid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINClaimAttachItemRequest.prototype.setMailid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINClaimAttachItemRequest.prototype.clearMailid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINClaimAttachItemRequest.prototype.hasMailid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINClaimAttachItemRequest.prototype.getCaptchaanswers = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINClaimAttachItemRequest.prototype.setCaptchaanswers = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINClaimAttachItemRequest.prototype.clearCaptchaanswers = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINClaimAttachItemRequest.prototype.hasCaptchaanswers = function() {
return null != s.Message.getField(this, 2);
};
proto.BINClaimAttachItemResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINClaimAttachItemResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINClaimAttachItemResponse.displayName = "proto.BINClaimAttachItemResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINClaimAttachItemResponse.prototype.toObject = function(e) {
return proto.BINClaimAttachItemResponse.toObject(e, this);
};
proto.BINClaimAttachItemResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINClaimAttachItemResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINClaimAttachItemResponse();
return proto.BINClaimAttachItemResponse.deserializeBinaryFromReader(o, t);
};
proto.BINClaimAttachItemResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
var o = t.readString();
e.setMessage(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINClaimAttachItemResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINClaimAttachItemResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINClaimAttachItemResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINClaimAttachItemResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINClaimAttachItemResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINClaimAttachItemResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINClaimAttachItemResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINClaimAttachItemResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINClaimAttachItemResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINClaimAttachItemResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINClaimAttachItemResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
map_field_entry_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "80202BPp7lGnbXHPPyo9onI", "map_field_entry_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINMapFieldEntry", null, i);
proto.BINMapFieldEntry = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINMapFieldEntry, s.Message);
r.DEBUG && !COMPILED && (proto.BINMapFieldEntry.displayName = "proto.BINMapFieldEntry");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMapFieldEntry.prototype.toObject = function(e) {
return proto.BINMapFieldEntry.toObject(e, this);
};
proto.BINMapFieldEntry.toObject = function(e, t) {
var o = {
key: s.Message.getField(t, 1),
value: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINMapFieldEntry.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMapFieldEntry();
return proto.BINMapFieldEntry.deserializeBinaryFromReader(o, t);
};
proto.BINMapFieldEntry.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setKey(o);
break;

case 2:
var o = t.readString();
e.setValue(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMapFieldEntry.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMapFieldEntry.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMapFieldEntry.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINMapFieldEntry.prototype.getKey = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINMapFieldEntry.prototype.setKey = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMapFieldEntry.prototype.clearKey = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMapFieldEntry.prototype.hasKey = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMapFieldEntry.prototype.getValue = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINMapFieldEntry.prototype.setValue = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINMapFieldEntry.prototype.clearValue = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINMapFieldEntry.prototype.hasValue = function() {
return null != s.Message.getField(this, 2);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
match_begin_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "6edb0dTOK1AFrkB4HWIHNwG", "match_begin_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINMatchBeginRequest", null, i);
r.exportSymbol("proto.BINMatchBeginResponse", null, i);
proto.BINMatchBeginRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINMatchBeginRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINMatchBeginRequest.displayName = "proto.BINMatchBeginRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMatchBeginRequest.prototype.toObject = function(e) {
return proto.BINMatchBeginRequest.toObject(e, this);
};
proto.BINMatchBeginRequest.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINMatchBeginRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMatchBeginRequest();
return proto.BINMatchBeginRequest.deserializeBinaryFromReader(o, t);
};
proto.BINMatchBeginRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setRoomindex(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMatchBeginRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMatchBeginRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMatchBeginRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINMatchBeginRequest.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINMatchBeginRequest.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMatchBeginRequest.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMatchBeginRequest.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMatchBeginResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINMatchBeginResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINMatchBeginResponse.displayName = "proto.BINMatchBeginResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMatchBeginResponse.prototype.toObject = function(e) {
return proto.BINMatchBeginResponse.toObject(e, this);
};
proto.BINMatchBeginResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
countdowntimer: s.Message.getField(t, 3),
zoneid: s.Message.getField(t, 4)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINMatchBeginResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMatchBeginResponse();
return proto.BINMatchBeginResponse.deserializeBinaryFromReader(o, t);
};
proto.BINMatchBeginResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt32();
e.setCountdowntimer(o);
break;

case 4:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMatchBeginResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMatchBeginResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMatchBeginResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
};
proto.BINMatchBeginResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINMatchBeginResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMatchBeginResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMatchBeginResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMatchBeginResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINMatchBeginResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINMatchBeginResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINMatchBeginResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINMatchBeginResponse.prototype.getCountdowntimer = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINMatchBeginResponse.prototype.setCountdowntimer = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINMatchBeginResponse.prototype.clearCountdowntimer = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINMatchBeginResponse.prototype.hasCountdowntimer = function() {
return null != s.Message.getField(this, 3);
};
proto.BINMatchBeginResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINMatchBeginResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINMatchBeginResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINMatchBeginResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 4);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
match_end_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "18ceavTi6pIFr/KS0fB4NVv", "match_end_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./map_field_entry_pb.js"), a = e("./text_emoticon_pb.js");
r.exportSymbol("proto.BINMatchEndRequest", null, i);
r.exportSymbol("proto.BINMatchEndResponse", null, i);
proto.BINMatchEndRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINMatchEndRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINMatchEndRequest.displayName = "proto.BINMatchEndRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMatchEndRequest.prototype.toObject = function(e) {
return proto.BINMatchEndRequest.toObject(e, this);
};
proto.BINMatchEndRequest.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINMatchEndRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMatchEndRequest();
return proto.BINMatchEndRequest.deserializeBinaryFromReader(o, t);
};
proto.BINMatchEndRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setRoomindex(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMatchEndRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMatchEndRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMatchEndRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINMatchEndRequest.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINMatchEndRequest.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMatchEndRequest.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMatchEndRequest.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMatchEndResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINMatchEndResponse.repeatedFields_, null);
};
r.inherits(proto.BINMatchEndResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINMatchEndResponse.displayName = "proto.BINMatchEndResponse");
proto.BINMatchEndResponse.repeatedFields_ = [ 3, 4, 5, 6, 8 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMatchEndResponse.prototype.toObject = function(e) {
return proto.BINMatchEndResponse.toObject(e, this);
};
proto.BINMatchEndResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
winninguseridsList: s.Message.getField(t, 3),
losinguseridsList: s.Message.getField(t, 4),
drawuseridsList: s.Message.getField(t, 5),
textemoticonsList: s.Message.toObjectList(t.getTextemoticonsList(), a.BINTextEmoticon.toObject, e),
countdowntimer: s.Message.getField(t, 7),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e),
zoneid: s.Message.getField(t, 9)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINMatchEndResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMatchEndResponse();
return proto.BINMatchEndResponse.deserializeBinaryFromReader(o, t);
};
proto.BINMatchEndResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt64();
e.addWinninguserids(o);
break;

case 4:
o = t.readInt64();
e.addLosinguserids(o);
break;

case 5:
o = t.readInt64();
e.addDrawuserids(o);
break;

case 6:
o = new a.BINTextEmoticon();
t.readMessage(o, a.BINTextEmoticon.deserializeBinaryFromReader);
e.addTextemoticons(o);
break;

case 7:
o = t.readInt32();
e.setCountdowntimer(o);
break;

case 8:
o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

case 9:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMatchEndResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMatchEndResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMatchEndResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getWinninguseridsList()).length > 0 && e.writeRepeatedInt64(3, t);
(t = this.getLosinguseridsList()).length > 0 && e.writeRepeatedInt64(4, t);
(t = this.getDrawuseridsList()).length > 0 && e.writeRepeatedInt64(5, t);
(t = this.getTextemoticonsList()).length > 0 && e.writeRepeatedMessage(6, t, a.BINTextEmoticon.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 7)) && e.writeInt32(7, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(8, t, n.BINMapFieldEntry.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 9)) && e.writeInt32(9, t);
};
proto.BINMatchEndResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINMatchEndResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMatchEndResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMatchEndResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMatchEndResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINMatchEndResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINMatchEndResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINMatchEndResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINMatchEndResponse.prototype.getWinninguseridsList = function() {
return s.Message.getField(this, 3);
};
proto.BINMatchEndResponse.prototype.setWinninguseridsList = function(e) {
s.Message.setField(this, 3, e || []);
};
proto.BINMatchEndResponse.prototype.addWinninguserids = function(e, t) {
s.Message.addToRepeatedField(this, 3, e, t);
};
proto.BINMatchEndResponse.prototype.clearWinninguseridsList = function() {
this.setWinninguseridsList([]);
};
proto.BINMatchEndResponse.prototype.getLosinguseridsList = function() {
return s.Message.getField(this, 4);
};
proto.BINMatchEndResponse.prototype.setLosinguseridsList = function(e) {
s.Message.setField(this, 4, e || []);
};
proto.BINMatchEndResponse.prototype.addLosinguserids = function(e, t) {
s.Message.addToRepeatedField(this, 4, e, t);
};
proto.BINMatchEndResponse.prototype.clearLosinguseridsList = function() {
this.setLosinguseridsList([]);
};
proto.BINMatchEndResponse.prototype.getDrawuseridsList = function() {
return s.Message.getField(this, 5);
};
proto.BINMatchEndResponse.prototype.setDrawuseridsList = function(e) {
s.Message.setField(this, 5, e || []);
};
proto.BINMatchEndResponse.prototype.addDrawuserids = function(e, t) {
s.Message.addToRepeatedField(this, 5, e, t);
};
proto.BINMatchEndResponse.prototype.clearDrawuseridsList = function() {
this.setDrawuseridsList([]);
};
proto.BINMatchEndResponse.prototype.getTextemoticonsList = function() {
return s.Message.getRepeatedWrapperField(this, a.BINTextEmoticon, 6);
};
proto.BINMatchEndResponse.prototype.setTextemoticonsList = function(e) {
s.Message.setRepeatedWrapperField(this, 6, e);
};
proto.BINMatchEndResponse.prototype.addTextemoticons = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 6, e, proto.BINTextEmoticon, t);
};
proto.BINMatchEndResponse.prototype.clearTextemoticonsList = function() {
this.setTextemoticonsList([]);
};
proto.BINMatchEndResponse.prototype.getCountdowntimer = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINMatchEndResponse.prototype.setCountdowntimer = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINMatchEndResponse.prototype.clearCountdowntimer = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINMatchEndResponse.prototype.hasCountdowntimer = function() {
return null != s.Message.getField(this, 7);
};
proto.BINMatchEndResponse.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 8);
};
proto.BINMatchEndResponse.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 8, e);
};
proto.BINMatchEndResponse.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 8, e, proto.BINMapFieldEntry, t);
};
proto.BINMatchEndResponse.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINMatchEndResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 9, 0);
};
proto.BINMatchEndResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINMatchEndResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINMatchEndResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 9);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./map_field_entry_pb.js": "map_field_entry_pb",
"./text_emoticon_pb.js": "text_emoticon_pb",
"google-protobuf": "google-protobuf"
} ],
minipoker: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7f5dawAnnVIOKHZvkmp4wmM", "minipoker");
var s = e("NetworkManager"), r = e("BaseScene"), i = cc.Class({
extends: r,
properties: {
cardView: cc.Mask,
cardPrefab: cc.Prefab,
isFinishSpin: !0,
isRun: !1,
stepCard: 9,
number: 5,
time_move: 1,
list_item: [],
list_recent_value: null,
enterRoomResponse: null,
enterZoneResponse: null,
betType: 0,
moneyBet: cc.Label,
userMoney: cc.Label,
jarMoney: cc.Label,
isRequestJar: !1,
jarValue: 0,
roomIndex: 0,
popupPrefab: cc.Prefab,
nohuPrefab: cc.Prefab,
autoSpinToggle: cc.Toggle,
fastSpinToggle: cc.Toggle,
updateMoneyResponse: null
},
statics: {
instance: null
},
exitRoom: function() {
s.requestExitRoomMessage(0);
},
handleAutoSpin: function() {
if (this.autoSpinToggle.isChecked && !this.isRun && this.isFinishSpin) {
this.time_move = this.fastSpinToggle.isChecked ? .4 : 1;
this.isRun = !0;
var e = Common.getCash(), t = this.getBetMoney();
cc.log("betMoney =", t);
if (t > e) {
Common.showToast("Bạn không có đủ tiền!", 2);
this.autoSpinToggle.isChecked = !1;
return;
}
this.getTurnMiniPokerRequest(this.calculateTurnType());
}
},
updateMoneyMessageResponseHandler: function(e) {
cc.log("update money response:", e.toObject());
if (e.getResponsecode()) {
this.setBinUpdateMoney(e);
this.removeTurnUpdateMoney();
}
},
setBinUpdateMoney: function(e) {
this.updateMoneyResponse = e;
},
getBINUpdateMoneyResponse: function() {
return this.updateMoneyResponse;
},
update: function(e) {
this.handleAutoSpin();
this.onGameEvent();
},
onGameEvent: function() {
var e = this;
s.checkEvent(function(t) {
return e.handleMessage(t);
});
},
getFastSpin: function() {
this.fastSpinToggle.isChecked = !this.fastSpinToggle.isChecked;
},
getAutoSpin: function() {
this.autoSpinToggle.isChecked = !this.autoSpinToggle.isChecked;
},
setKeyBet: function(e) {
this.betType = e;
},
getKeyBet: function() {
return this.betType;
},
requestJar: function() {
if (!this.isRequestJar) {
cc.log("request jar:", this.betType + 1);
this.isRequestJar = !1;
s.getJarRequest(Common.getZoneId(), this.betType + 1);
}
},
getTurnMiniPokerRequest: function(e) {
var t = [], o = new proto.BINMapFieldEntry();
o.setKey("turnSlotType");
o.setValue(e.toString());
t.push(o);
s.getTurnMessageFromServer(0, t);
},
getBetMoney: function() {
var e = this.getEnterRoomResponse().getArgsList()[0], t = null;
"initValue" === e.getKey() && (t = e.getValue());
var o = this.getKeyBet();
return JSON.parse(t).turnValueCash[o];
},
betToggleOneEvent: function() {
cc.log("bet type 1:", this.betType);
this.setKeyBet(0);
this.moneyBet.string = this.getBetMoney();
this.requestJar();
},
betToggleTwoEvent: function() {
cc.log("bet type 2:", this.betType);
this.setKeyBet(1);
this.moneyBet.string = this.getBetMoney();
this.requestJar();
},
betToggleThreeEvent: function() {
cc.log("bet type 3:", this.betType);
this.setKeyBet(2);
this.moneyBet.string = this.getBetMoney();
this.requestJar();
},
initDataFromLoading: function(e, t) {
this.setEnterZoneResponse(e);
Common.setMiniGameZoneId(e.getZoneid());
this.setEnterRoomResponse(t);
this.init(t);
},
init: function(e) {
var t = e.getRoomplay();
this.roomIndex = t.getRoomindex();
if (e.getArgsList().length > 0) {
var o = e.getArgsList()[0];
"initValue" === o.getKey() && this.initValue(o.getValue());
}
},
initValue: function(e) {
var t = JSON.parse(e);
cc.log("results =", t);
this.moneyBet.string = Common.numberFormatWithCommas(t.turnValueCash[this.betType]);
var o = t.jarValue;
this.jarMoney.string = Common.numberFormatWithCommas(o);
},
setEnterZoneResponse: function(e) {
this.enterZoneResponse = e;
},
getEnterZoneResponse: function() {
return this.enterZoneResponse;
},
getEnterRoomResponse: function() {
return this.enterRoomResponse;
},
setEnterRoomResponse: function(e) {
this.enterRoomResponse = e;
},
takeTurn: function() {
this.time_move = this.fastSpinToggle.isChecked ? .4 : 1;
this.getTurnMiniPokerRequest(this.betType + 1);
},
initFirstCard: function() {
var e = Common.genRandomCardNumber(null, this.stepCard, this.number), t = Common.genArrayToMultiArray(e, this.stepCard, this.number);
this.list_recent_value = Common.create2DArray(this.stepCard);
for (var o = 0; o < this.stepCard; o++) for (var s = 0; s < this.number; s++) {
var r = cc.instantiate(this.cardPrefab), i = (s - 2) * r.getContentSize().width * .75, n = (o - 1) * r.getContentSize().height;
r.getComponent("CardItem").replaceCard(t[o][s]);
r.setPositionY(n);
r.setPositionX(i);
this.list_item.push(r);
this.cardView.node.addChild(r);
}
this.list_recent_value = t;
},
onDestroy: function() {
this.unscheduleAllCallbacks();
},
onLoad: function() {
i.instance = this;
this.userMoney.string = Common.numberFormatWithCommas(Common.getCash());
this.betType = 0;
this.initFirstCard();
var e = this;
e.schedule(function() {
e.requestJar();
}, 5);
Common.setMiniPokerSceneInstance(cc.director.getScene());
},
ongamestatus: function(e) {
if (null !== e.data || "undefined" !== e.data) {
var t = s.parseFrom(e.data, e.data.byteLength);
cc.log("list message size:" + t.length);
if (t.length > 0) for (var o = 0; o < t.length; o++) {
var r = t[o];
this.handleMessage(r);
}
}
},
showNoHu: function() {
cc.log("showNoHu");
var e = cc.instantiate(this.nohuPrefab).getComponent("Nohu");
e.playAnim();
var t = new cc.Node();
t.parent = this.node;
t.addChild(e.node);
var o = cc.callFunc(function() {
this.setOriginMoney();
this.isBreakJar = !1;
}, this);
e.node.runAction(cc.sequence(cc.delayTime(2), o, cc.delayTime(1), cc.fadeOut(1), cc.removeSelf(), null));
},
handleRanking: function(e, t, o) {
if (54 !== e) if (72 !== e) {
this.isUpdateMoney = !1;
cc.log("mess =", t);
var s = new cc.Node(t);
s.parent = this.node;
var r = s.addComponent(cc.Label);
r.string = t;
r.node.color = cc.color(248, 213, 82, 255);
r.fontSize = 60;
r.lineHeight = 70;
var i = s.addComponent(cc.LabelOutline);
i.color = new cc.Color(.5, .3, .7, 1);
i.width = 3;
var n = cc.fadeOut(1), a = cc.callFunc(function() {
for (var e = 0; e < o.getMoneyboxesList().length; e++) {
var t = new cc.Node();
t.parent = this.node;
var s = o.getMoneyboxesList()[e];
if (s.getDisplaychangemoney() > 0) {
this.isUpdateMoney = !0;
var r = t.addComponent(cc.Label);
r.string = "+" + s.getDisplaychangemoney().toString();
r.node.color = cc.color(248, 213, 82, 255);
r.fontSize = 60;
r.lineHeight = 70;
var i = t.addComponent(cc.LabelOutline);
i.color = new cc.Color(.5, .3, .7, 1);
i.width = 3;
var n = cc.fadeOut(1.5);
r.node.runAction(cc.sequence(cc.moveBy(.5, cc.p(0, 20)), cc.delayTime(.25), cc.spawn(cc.moveBy(1, cc.p(0, 20)), n, null), cc.removeSelf(), null));
}
}
}, this), p = cc.callFunc(function() {
this.isUpdateMoney && this.setOriginMoney();
this.isRun = !1;
}, this);
r.node.runAction(cc.sequence(cc.moveBy(.5, cc.p(0, 50)), a, cc.spawn(cc.moveBy(1, cc.p(0, 50)), n, null), p, cc.removeSelf(), null));
} else {
this.setOriginMoney();
this.isRun = !1;
} else {
this.showNoHu();
this.isRun = !1;
}
},
removeTurnUpdateMoney: function() {
var e = this.getBINUpdateMoneyResponse();
cc.log("updateMoneyResponse =", e.getMoneyboxesList());
if (e.getResponsecode()) for (var t = 0; t < e.getMoneyboxesList().length; t++) {
var o = e.getMoneyboxesList()[t];
if ("miniPokerSpin" === o.getReason()) {
var s = o.getCurrentmoney();
Common.setCash(s);
this.userMoney.string = Common.numberFormatWithCommas(s);
}
}
},
setOriginMoney: function() {
var e = this.getBINUpdateMoneyResponse();
if (0 !== e) for (var t = 0; t < e.getMoneyboxesList().length; t++) {
var o = e.getMoneyboxesList()[t];
if (o.getDisplaychangemoney() > 0) {
var s = Common.getUserInfo();
if (o.getUserid() === s.userid) {
var r = o.getCurrentmoney();
Common.setCash(r);
this.userMoney.string = Common.numberFormatWithCommas(r);
}
}
}
this.isRun = !1;
},
implementSpinMiniPokerCards: function(e, t) {
cc.log("carx =", e);
var o = t.getTextemoticonsList()[0];
this.isFinishSpin = !1;
this.isBreakJar = 54 === o.getEmoticonid();
var s = Common.genRandomCardNumber(e, this.stepCard, this.number), r = Common.genArrayToMultiArray(s, this.stepCard, this.number);
r[this.stepCard - 2] = e;
if (r.length * this.number == this.list_item.length) {
for (g = 0; g < this.list_item.length; g++) {
var i = parseInt(g / this.number), n = parseInt(g % this.number);
if (g < 3 * this.number) {
var a = this.stepCard - (3 - i), p = n;
this.list_item[g].getComponent("CardItem").replaceCard(this.list_recent_value[a][p]);
}
var l = (n - 2) * this.list_item[g].getContentSize().width * .75, u = (i - 1) * this.list_item[g].getContentSize().height;
this.list_item[g].setPositionX(l);
this.list_item[g].setPositionY(u);
}
this.list_recent_value = r;
for (var g = 0; g < this.list_item.length; g++) {
var i = parseInt(g / this.number), n = parseInt(g % this.number), d = this.list_item[g], c = r[i][n];
g >= 3 * this.number && d.getComponent("CardItem").replaceCard(c);
var h = d.getContentSize().height, f = cc.moveBy(.2, cc.p(0, .25 * h)), y = cc.moveBy(.15, cc.p(0, .25 * h)), B = cc.moveBy(this.time_move, cc.p(0, -(this.stepCard - 3) * h - .5 * h)), I = cc.delayTime(.3 * n);
if (g === this.list_item.length - 1) {
var M = t.getTextemoticonsList()[0], R = M.getEmoticonid(), N = M.getMessage(), m = this.getBINUpdateMoneyResponse(), F = this, b = cc.callFunc(function() {
cc.log("FINISH!!!!");
F.handleRanking(R, N, m);
}, this), _ = cc.callFunc(function() {
cc.log("auto spin");
this.isBreakJar || (this.isFinishSpin = !0);
}, this);
d.runAction(cc.sequence(I, f, B, y, b, cc.delayTime(2), _, null));
} else d.runAction(cc.sequence(I, f, B, y));
}
}
},
matchEndResponseHandler: function(e) {
cc.log("match end response handler:", e.toObject());
if (e.getResponsecode() && e.getArgsList().length > 0) for (var t = 0; t < e.getArgsList().length; t++) if ("currentCards" === e.getArgsList()[t].getKey()) {
var o = e.getArgsList()[t].getValue().split(",").map(Number);
this.implementSpinMiniPokerCards(o, e);
}
e.hasMessage() && "" !== e.getMessage() && Common.showToast(e.getMessage(), 2);
},
exitRoomResponseHandler: function(e) {
cc.log("exit room response handler:", e.toObject());
e.getResponsecode();
e.hasMessage() && e.getMessage();
},
exitZoneResponseHandler: function(e) {
cc.log("exit zone response handler:", e.toObject());
if (e.getResponsecode()) {
cc.director.loadScene("Lobby");
Common.setZoneId(-1);
}
e.hasMessage() && e.getMessage();
},
jarResponseHandler: function(e) {
cc.log("jar response handler:", e.toObject());
if (e.getResponsecode()) {
var t = 0, o = this.jarValue;
this.jarValue = e.getJarvalue();
if (e.getArgsList().length > 0) {
var s = e.getArgsList()[0];
"jarType" === s.getKey() && (t = parseInt(s.getValue().toString()));
}
if (t === this.betType + 1) {
this.jarType === t ? Common.updateMoney(this.jarMoney, o, o, this.jarValue) : this.jarMoney.string = Common.numberFormatWithCommas(this.jarValue);
this.jarType = t;
}
}
},
handleMessage: function(e) {
var t = this._super(e);
if (t) return !0;
t = !0;
switch (e.message_id) {
case s.MESSAGE_ID.UPDATE_MONEY:
o = e.response;
this.updateMoneyMessageResponseHandler(o);
break;

case s.MESSAGE_ID.MATCH_END:
this.matchEndResponseHandler(e.response);
break;

case s.MESSAGE_ID.EXIT_ROOM:
o = e.response;
this.exitRoomResponseHandler(o);
break;

case s.MESSAGE_ID.EXIT_ZONE:
o = e.response;
this.exitZoneResponseHandler(o);
break;

case s.MESSAGE_ID.JAR:
var o = e.response;
this.jarResponseHandler(o);
break;

default:
t = !1;
}
return t;
},
calculateTurnType: function() {
return this.getKeyBet() + 1;
},
showSpin: function() {
var e = [ "Lịch sử quay", "Lịch sử nổ hũ", "Top cao thủ" ];
Common.showPopup(Config.name.POPUP_HISTORY, function(t) {
t.addTabs(e, 1);
t.appear();
});
},
showTopUser: function() {
var e = [ "Lịch sử quay", "Lịch sử nổ hũ", "Top cao thủ" ];
Common.showPopup(Config.name.POPUP_HISTORY, function(t) {
t.addTabs(e, 3);
t.appear();
});
},
openRulesPopup: function() {
Common.openRules();
}
});
cc._RF.pop();
}, {
BaseScene: "BaseScene",
NetworkManager: "NetworkManager"
} ],
notification_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "7f3cdPhuAlDbLc1BFo4oNtM", "notification_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINEmergencyNotificationResponse", null, i);
r.exportSymbol("proto.BINHeadlineResponse", null, i);
r.exportSymbol("proto.BINNews", null, i);
proto.BINNews = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINNews, s.Message);
r.DEBUG && !COMPILED && (proto.BINNews.displayName = "proto.BINNews");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINNews.prototype.toObject = function(e) {
return proto.BINNews.toObject(e, this);
};
proto.BINNews.toObject = function(e, t) {
var o = {
tag: s.Message.getField(t, 1),
displayname: s.Message.getField(t, 2),
action: s.Message.getField(t, 3),
subject: s.Message.getField(t, 4)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINNews.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINNews();
return proto.BINNews.deserializeBinaryFromReader(o, t);
};
proto.BINNews.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setTag(o);
break;

case 2:
o = t.readString();
e.setDisplayname(o);
break;

case 3:
o = t.readString();
e.setAction(o);
break;

case 4:
var o = t.readString();
e.setSubject(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINNews.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINNews.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINNews.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
};
proto.BINNews.prototype.getTag = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINNews.prototype.setTag = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINNews.prototype.clearTag = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINNews.prototype.hasTag = function() {
return null != s.Message.getField(this, 1);
};
proto.BINNews.prototype.getDisplayname = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINNews.prototype.setDisplayname = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINNews.prototype.clearDisplayname = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINNews.prototype.hasDisplayname = function() {
return null != s.Message.getField(this, 2);
};
proto.BINNews.prototype.getAction = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINNews.prototype.setAction = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINNews.prototype.clearAction = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINNews.prototype.hasAction = function() {
return null != s.Message.getField(this, 3);
};
proto.BINNews.prototype.getSubject = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINNews.prototype.setSubject = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINNews.prototype.clearSubject = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINNews.prototype.hasSubject = function() {
return null != s.Message.getField(this, 4);
};
proto.BINHeadlineResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINHeadlineResponse.repeatedFields_, null);
};
r.inherits(proto.BINHeadlineResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINHeadlineResponse.displayName = "proto.BINHeadlineResponse");
proto.BINHeadlineResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINHeadlineResponse.prototype.toObject = function(e) {
return proto.BINHeadlineResponse.toObject(e, this);
};
proto.BINHeadlineResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
headlinesList: s.Message.toObjectList(t.getHeadlinesList(), proto.BINNews.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINHeadlineResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINHeadlineResponse();
return proto.BINHeadlineResponse.deserializeBinaryFromReader(o, t);
};
proto.BINHeadlineResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINNews();
t.readMessage(o, proto.BINNews.deserializeBinaryFromReader);
e.addHeadlines(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINHeadlineResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINHeadlineResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINHeadlineResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getHeadlinesList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINNews.serializeBinaryToWriter);
};
proto.BINHeadlineResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINHeadlineResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINHeadlineResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINHeadlineResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINHeadlineResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINHeadlineResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINHeadlineResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINHeadlineResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINHeadlineResponse.prototype.getHeadlinesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINNews, 3);
};
proto.BINHeadlineResponse.prototype.setHeadlinesList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINHeadlineResponse.prototype.addHeadlines = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINNews, t);
};
proto.BINHeadlineResponse.prototype.clearHeadlinesList = function() {
this.setHeadlinesList([]);
};
proto.BINEmergencyNotificationResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINEmergencyNotificationResponse.repeatedFields_, null);
};
r.inherits(proto.BINEmergencyNotificationResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINEmergencyNotificationResponse.displayName = "proto.BINEmergencyNotificationResponse");
proto.BINEmergencyNotificationResponse.repeatedFields_ = [ 3, 4 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINEmergencyNotificationResponse.prototype.toObject = function(e) {
return proto.BINEmergencyNotificationResponse.toObject(e, this);
};
proto.BINEmergencyNotificationResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
notificationsList: s.Message.getField(t, 3),
headlinesList: s.Message.toObjectList(t.getHeadlinesList(), proto.BINNews.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINEmergencyNotificationResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINEmergencyNotificationResponse();
return proto.BINEmergencyNotificationResponse.deserializeBinaryFromReader(o, t);
};
proto.BINEmergencyNotificationResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readString();
e.addNotifications(o);
break;

case 4:
var o = new proto.BINNews();
t.readMessage(o, proto.BINNews.deserializeBinaryFromReader);
e.addHeadlines(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINEmergencyNotificationResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINEmergencyNotificationResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINEmergencyNotificationResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getNotificationsList()).length > 0 && e.writeRepeatedString(3, t);
(t = this.getHeadlinesList()).length > 0 && e.writeRepeatedMessage(4, t, proto.BINNews.serializeBinaryToWriter);
};
proto.BINEmergencyNotificationResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINEmergencyNotificationResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINEmergencyNotificationResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINEmergencyNotificationResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINEmergencyNotificationResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINEmergencyNotificationResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINEmergencyNotificationResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINEmergencyNotificationResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINEmergencyNotificationResponse.prototype.getNotificationsList = function() {
return s.Message.getField(this, 3);
};
proto.BINEmergencyNotificationResponse.prototype.setNotificationsList = function(e) {
s.Message.setField(this, 3, e || []);
};
proto.BINEmergencyNotificationResponse.prototype.addNotifications = function(e, t) {
s.Message.addToRepeatedField(this, 3, e, t);
};
proto.BINEmergencyNotificationResponse.prototype.clearNotificationsList = function() {
this.setNotificationsList([]);
};
proto.BINEmergencyNotificationResponse.prototype.getHeadlinesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINNews, 4);
};
proto.BINEmergencyNotificationResponse.prototype.setHeadlinesList = function(e) {
s.Message.setRepeatedWrapperField(this, 4, e);
};
proto.BINEmergencyNotificationResponse.prototype.addHeadlines = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 4, e, proto.BINNews, t);
};
proto.BINEmergencyNotificationResponse.prototype.clearHeadlinesList = function() {
this.setHeadlinesList([]);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
open_id_login_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "da470BQptFJ7pyHNzp2EQzt", "open_id_login_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINOpenIdConnectRequest", null, i);
r.exportSymbol("proto.BINOpenIdConnectResponse", null, i);
r.exportSymbol("proto.BINOpenIdLoginRequest", null, i);
proto.BINOpenIdLoginRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINOpenIdLoginRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINOpenIdLoginRequest.displayName = "proto.BINOpenIdLoginRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINOpenIdLoginRequest.prototype.toObject = function(e) {
return proto.BINOpenIdLoginRequest.toObject(e, this);
};
proto.BINOpenIdLoginRequest.toObject = function(e, t) {
var o = {
channel: s.Message.getField(t, 1),
openid: s.Message.getField(t, 2),
firstname: s.Message.getField(t, 3),
lastname: s.Message.getField(t, 4),
email: s.Message.getField(t, 5)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINOpenIdLoginRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINOpenIdLoginRequest();
return proto.BINOpenIdLoginRequest.deserializeBinaryFromReader(o, t);
};
proto.BINOpenIdLoginRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setChannel(o);
break;

case 2:
o = t.readString();
e.setOpenid(o);
break;

case 3:
o = t.readString();
e.setFirstname(o);
break;

case 4:
o = t.readString();
e.setLastname(o);
break;

case 5:
var o = t.readString();
e.setEmail(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINOpenIdLoginRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINOpenIdLoginRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINOpenIdLoginRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
};
proto.BINOpenIdLoginRequest.prototype.getChannel = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINOpenIdLoginRequest.prototype.setChannel = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINOpenIdLoginRequest.prototype.clearChannel = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINOpenIdLoginRequest.prototype.hasChannel = function() {
return null != s.Message.getField(this, 1);
};
proto.BINOpenIdLoginRequest.prototype.getOpenid = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINOpenIdLoginRequest.prototype.setOpenid = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINOpenIdLoginRequest.prototype.clearOpenid = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINOpenIdLoginRequest.prototype.hasOpenid = function() {
return null != s.Message.getField(this, 2);
};
proto.BINOpenIdLoginRequest.prototype.getFirstname = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINOpenIdLoginRequest.prototype.setFirstname = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINOpenIdLoginRequest.prototype.clearFirstname = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINOpenIdLoginRequest.prototype.hasFirstname = function() {
return null != s.Message.getField(this, 3);
};
proto.BINOpenIdLoginRequest.prototype.getLastname = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINOpenIdLoginRequest.prototype.setLastname = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINOpenIdLoginRequest.prototype.clearLastname = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINOpenIdLoginRequest.prototype.hasLastname = function() {
return null != s.Message.getField(this, 4);
};
proto.BINOpenIdLoginRequest.prototype.getEmail = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINOpenIdLoginRequest.prototype.setEmail = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINOpenIdLoginRequest.prototype.clearEmail = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINOpenIdLoginRequest.prototype.hasEmail = function() {
return null != s.Message.getField(this, 5);
};
proto.BINOpenIdConnectRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINOpenIdConnectRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINOpenIdConnectRequest.displayName = "proto.BINOpenIdConnectRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINOpenIdConnectRequest.prototype.toObject = function(e) {
return proto.BINOpenIdConnectRequest.toObject(e, this);
};
proto.BINOpenIdConnectRequest.toObject = function(e, t) {
var o = {
channel: s.Message.getField(t, 1),
openid: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINOpenIdConnectRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINOpenIdConnectRequest();
return proto.BINOpenIdConnectRequest.deserializeBinaryFromReader(o, t);
};
proto.BINOpenIdConnectRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setChannel(o);
break;

case 2:
var o = t.readString();
e.setOpenid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINOpenIdConnectRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINOpenIdConnectRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINOpenIdConnectRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINOpenIdConnectRequest.prototype.getChannel = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINOpenIdConnectRequest.prototype.setChannel = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINOpenIdConnectRequest.prototype.clearChannel = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINOpenIdConnectRequest.prototype.hasChannel = function() {
return null != s.Message.getField(this, 1);
};
proto.BINOpenIdConnectRequest.prototype.getOpenid = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINOpenIdConnectRequest.prototype.setOpenid = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINOpenIdConnectRequest.prototype.clearOpenid = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINOpenIdConnectRequest.prototype.hasOpenid = function() {
return null != s.Message.getField(this, 2);
};
proto.BINOpenIdConnectResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINOpenIdConnectResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINOpenIdConnectResponse.displayName = "proto.BINOpenIdConnectResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINOpenIdConnectResponse.prototype.toObject = function(e) {
return proto.BINOpenIdConnectResponse.toObject(e, this);
};
proto.BINOpenIdConnectResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINOpenIdConnectResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINOpenIdConnectResponse();
return proto.BINOpenIdConnectResponse.deserializeBinaryFromReader(o, t);
};
proto.BINOpenIdConnectResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
var o = t.readString();
e.setMessage(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINOpenIdConnectResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINOpenIdConnectResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINOpenIdConnectResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINOpenIdConnectResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINOpenIdConnectResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINOpenIdConnectResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINOpenIdConnectResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINOpenIdConnectResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINOpenIdConnectResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINOpenIdConnectResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINOpenIdConnectResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
ping_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2bc48HxAxFL+6MLtz8T+UXF", "ping_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINPingRequest", null, i);
r.exportSymbol("proto.BINPingResponse", null, i);
proto.BINPingRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPingRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINPingRequest.displayName = "proto.BINPingRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPingRequest.prototype.toObject = function(e) {
return proto.BINPingRequest.toObject(e, this);
};
proto.BINPingRequest.toObject = function(e, t) {
var o = {
disconecttime: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPingRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPingRequest();
return proto.BINPingRequest.deserializeBinaryFromReader(o, t);
};
proto.BINPingRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setDisconecttime(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPingRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPingRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPingRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINPingRequest.prototype.getDisconecttime = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINPingRequest.prototype.setDisconecttime = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPingRequest.prototype.clearDisconecttime = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPingRequest.prototype.hasDisconecttime = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPingResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPingResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINPingResponse.displayName = "proto.BINPingResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPingResponse.prototype.toObject = function(e) {
return proto.BINPingResponse.toObject(e, this);
};
proto.BINPingResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
disconnect: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPingResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPingResponse();
return proto.BINPingResponse.deserializeBinaryFromReader(o, t);
};
proto.BINPingResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = t.readBool();
e.setDisconnect(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPingResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPingResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPingResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeBool(3, t);
};
proto.BINPingResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINPingResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPingResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPingResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPingResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINPingResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPingResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPingResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPingResponse.prototype.getDisconnect = function() {
return s.Message.getFieldWithDefault(this, 3, !1);
};
proto.BINPingResponse.prototype.setDisconnect = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINPingResponse.prototype.clearDisconnect = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINPingResponse.prototype.hasDisconnect = function() {
return null != s.Message.getField(this, 3);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
player_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2046f49/HlJN6jceCHMkzBb", "player_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./map_field_entry_pb.js");
r.exportSymbol("proto.BINPlayer", null, i);
proto.BINPlayer = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINPlayer.repeatedFields_, null);
};
r.inherits(proto.BINPlayer, s.Message);
r.DEBUG && !COMPILED && (proto.BINPlayer.displayName = "proto.BINPlayer");
proto.BINPlayer.repeatedFields_ = [ 11 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPlayer.prototype.toObject = function(e) {
return proto.BINPlayer.toObject(e, this);
};
proto.BINPlayer.toObject = function(e, t) {
var o = {
userid: s.Message.getField(t, 1),
username: s.Message.getField(t, 2),
displayname: s.Message.getField(t, 3),
avatarid: s.Message.getField(t, 4),
level: s.Message.getField(t, 5),
cash: s.Message.getField(t, 6),
gold: s.Message.getField(t, 7),
ready: s.Message.getField(t, 8),
exitaftermatchend: s.Message.getField(t, 9),
tableindex: s.Message.getField(t, 10),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPlayer.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPlayer();
return proto.BINPlayer.deserializeBinaryFromReader(o, t);
};
proto.BINPlayer.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setUserid(o);
break;

case 2:
o = t.readString();
e.setUsername(o);
break;

case 3:
o = t.readString();
e.setDisplayname(o);
break;

case 4:
o = t.readInt32();
e.setAvatarid(o);
break;

case 5:
o = t.readInt32();
e.setLevel(o);
break;

case 6:
o = t.readInt64();
e.setCash(o);
break;

case 7:
o = t.readInt64();
e.setGold(o);
break;

case 8:
o = t.readBool();
e.setReady(o);
break;

case 9:
o = t.readBool();
e.setExitaftermatchend(o);
break;

case 10:
o = t.readInt32();
e.setTableindex(o);
break;

case 11:
var o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPlayer.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPlayer.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPlayer.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt64(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt64(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeBool(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeBool(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeInt32(10, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(11, t, n.BINMapFieldEntry.serializeBinaryToWriter);
};
proto.BINPlayer.prototype.getUserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINPlayer.prototype.setUserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPlayer.prototype.clearUserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPlayer.prototype.hasUserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPlayer.prototype.getUsername = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINPlayer.prototype.setUsername = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPlayer.prototype.clearUsername = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPlayer.prototype.hasUsername = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPlayer.prototype.getDisplayname = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINPlayer.prototype.setDisplayname = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINPlayer.prototype.clearDisplayname = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINPlayer.prototype.hasDisplayname = function() {
return null != s.Message.getField(this, 3);
};
proto.BINPlayer.prototype.getAvatarid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINPlayer.prototype.setAvatarid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINPlayer.prototype.clearAvatarid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINPlayer.prototype.hasAvatarid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINPlayer.prototype.getLevel = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINPlayer.prototype.setLevel = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINPlayer.prototype.clearLevel = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINPlayer.prototype.hasLevel = function() {
return null != s.Message.getField(this, 5);
};
proto.BINPlayer.prototype.getCash = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINPlayer.prototype.setCash = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINPlayer.prototype.clearCash = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINPlayer.prototype.hasCash = function() {
return null != s.Message.getField(this, 6);
};
proto.BINPlayer.prototype.getGold = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINPlayer.prototype.setGold = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINPlayer.prototype.clearGold = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINPlayer.prototype.hasGold = function() {
return null != s.Message.getField(this, 7);
};
proto.BINPlayer.prototype.getReady = function() {
return s.Message.getFieldWithDefault(this, 8, !1);
};
proto.BINPlayer.prototype.setReady = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINPlayer.prototype.clearReady = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINPlayer.prototype.hasReady = function() {
return null != s.Message.getField(this, 8);
};
proto.BINPlayer.prototype.getExitaftermatchend = function() {
return s.Message.getFieldWithDefault(this, 9, !1);
};
proto.BINPlayer.prototype.setExitaftermatchend = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINPlayer.prototype.clearExitaftermatchend = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINPlayer.prototype.hasExitaftermatchend = function() {
return null != s.Message.getField(this, 9);
};
proto.BINPlayer.prototype.getTableindex = function() {
return s.Message.getFieldWithDefault(this, 10, 0);
};
proto.BINPlayer.prototype.setTableindex = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINPlayer.prototype.clearTableindex = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINPlayer.prototype.hasTableindex = function() {
return null != s.Message.getField(this, 10);
};
proto.BINPlayer.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 11);
};
proto.BINPlayer.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 11, e);
};
proto.BINPlayer.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 11, e, proto.BINMapFieldEntry, t);
};
proto.BINPlayer.prototype.clearArgsList = function() {
this.setArgsList([]);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./map_field_entry_pb.js": "map_field_entry_pb",
"google-protobuf": "google-protobuf"
} ],
purchase_money_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "035594gL4tEpYQ/U8eNgnRh", "purchase_money_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINCardConfigRequest", null, i);
r.exportSymbol("proto.BINCardConfigResponse", null, i);
r.exportSymbol("proto.BINCardProduct", null, i);
r.exportSymbol("proto.BINCardProvider", null, i);
r.exportSymbol("proto.BINGoldConfigRequest", null, i);
r.exportSymbol("proto.BINGoldConfigResponse", null, i);
r.exportSymbol("proto.BINGoldProduct", null, i);
r.exportSymbol("proto.BINPurchaseGoldRequest", null, i);
r.exportSymbol("proto.BINPurchaseGoldResponse", null, i);
r.exportSymbol("proto.BINPurchaseMoneyRequest", null, i);
r.exportSymbol("proto.BINPurchaseMoneyResponse", null, i);
r.exportSymbol("proto.BINSmsConfigRequest", null, i);
r.exportSymbol("proto.BINSmsConfigResponse", null, i);
r.exportSymbol("proto.BINSmsNumber", null, i);
r.exportSymbol("proto.BINSmsProvider", null, i);
r.exportSymbol("proto.BINSmsSyntax", null, i);
proto.BINCardConfigRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINCardConfigRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINCardConfigRequest.displayName = "proto.BINCardConfigRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINCardConfigRequest.prototype.toObject = function(e) {
return proto.BINCardConfigRequest.toObject(e, this);
};
proto.BINCardConfigRequest.toObject = function(e, t) {
var o = {
type: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINCardConfigRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINCardConfigRequest();
return proto.BINCardConfigRequest.deserializeBinaryFromReader(o, t);
};
proto.BINCardConfigRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setType(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINCardConfigRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINCardConfigRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINCardConfigRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINCardConfigRequest.prototype.getType = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINCardConfigRequest.prototype.setType = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINCardConfigRequest.prototype.clearType = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINCardConfigRequest.prototype.hasType = function() {
return null != s.Message.getField(this, 1);
};
proto.BINCardProduct = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINCardProduct, s.Message);
r.DEBUG && !COMPILED && (proto.BINCardProduct.displayName = "proto.BINCardProduct");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINCardProduct.prototype.toObject = function(e) {
return proto.BINCardProduct.toObject(e, this);
};
proto.BINCardProduct.toObject = function(e, t) {
var o = {
productid: s.Message.getField(t, 1),
parvalue: s.Message.getField(t, 2),
cashvalue: s.Message.getField(t, 3),
description: s.Message.getField(t, 4),
promotion: s.Message.getField(t, 5)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINCardProduct.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINCardProduct();
return proto.BINCardProduct.deserializeBinaryFromReader(o, t);
};
proto.BINCardProduct.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setProductid(o);
break;

case 2:
o = t.readInt32();
e.setParvalue(o);
break;

case 3:
o = t.readInt32();
e.setCashvalue(o);
break;

case 4:
o = t.readString();
e.setDescription(o);
break;

case 5:
var o = t.readInt32();
e.setPromotion(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINCardProduct.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINCardProduct.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINCardProduct.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
};
proto.BINCardProduct.prototype.getProductid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINCardProduct.prototype.setProductid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINCardProduct.prototype.clearProductid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINCardProduct.prototype.hasProductid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINCardProduct.prototype.getParvalue = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINCardProduct.prototype.setParvalue = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINCardProduct.prototype.clearParvalue = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINCardProduct.prototype.hasParvalue = function() {
return null != s.Message.getField(this, 2);
};
proto.BINCardProduct.prototype.getCashvalue = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINCardProduct.prototype.setCashvalue = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINCardProduct.prototype.clearCashvalue = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINCardProduct.prototype.hasCashvalue = function() {
return null != s.Message.getField(this, 3);
};
proto.BINCardProduct.prototype.getDescription = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINCardProduct.prototype.setDescription = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINCardProduct.prototype.clearDescription = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINCardProduct.prototype.hasDescription = function() {
return null != s.Message.getField(this, 4);
};
proto.BINCardProduct.prototype.getPromotion = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINCardProduct.prototype.setPromotion = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINCardProduct.prototype.clearPromotion = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINCardProduct.prototype.hasPromotion = function() {
return null != s.Message.getField(this, 5);
};
proto.BINCardProvider = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINCardProvider.repeatedFields_, null);
};
r.inherits(proto.BINCardProvider, s.Message);
r.DEBUG && !COMPILED && (proto.BINCardProvider.displayName = "proto.BINCardProvider");
proto.BINCardProvider.repeatedFields_ = [ 4 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINCardProvider.prototype.toObject = function(e) {
return proto.BINCardProvider.toObject(e, this);
};
proto.BINCardProvider.toObject = function(e, t) {
var o = {
providerid: s.Message.getField(t, 1),
providercode: s.Message.getField(t, 2),
providername: s.Message.getField(t, 3),
productsList: s.Message.toObjectList(t.getProductsList(), proto.BINCardProduct.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINCardProvider.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINCardProvider();
return proto.BINCardProvider.deserializeBinaryFromReader(o, t);
};
proto.BINCardProvider.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setProviderid(o);
break;

case 2:
o = t.readString();
e.setProvidercode(o);
break;

case 3:
o = t.readString();
e.setProvidername(o);
break;

case 4:
var o = new proto.BINCardProduct();
t.readMessage(o, proto.BINCardProduct.deserializeBinaryFromReader);
e.addProducts(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINCardProvider.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINCardProvider.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINCardProvider.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
(t = this.getProductsList()).length > 0 && e.writeRepeatedMessage(4, t, proto.BINCardProduct.serializeBinaryToWriter);
};
proto.BINCardProvider.prototype.getProviderid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINCardProvider.prototype.setProviderid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINCardProvider.prototype.clearProviderid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINCardProvider.prototype.hasProviderid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINCardProvider.prototype.getProvidercode = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINCardProvider.prototype.setProvidercode = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINCardProvider.prototype.clearProvidercode = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINCardProvider.prototype.hasProvidercode = function() {
return null != s.Message.getField(this, 2);
};
proto.BINCardProvider.prototype.getProvidername = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINCardProvider.prototype.setProvidername = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINCardProvider.prototype.clearProvidername = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINCardProvider.prototype.hasProvidername = function() {
return null != s.Message.getField(this, 3);
};
proto.BINCardProvider.prototype.getProductsList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINCardProduct, 4);
};
proto.BINCardProvider.prototype.setProductsList = function(e) {
s.Message.setRepeatedWrapperField(this, 4, e);
};
proto.BINCardProvider.prototype.addProducts = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 4, e, proto.BINCardProduct, t);
};
proto.BINCardProvider.prototype.clearProductsList = function() {
this.setProductsList([]);
};
proto.BINCardConfigResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINCardConfigResponse.repeatedFields_, null);
};
r.inherits(proto.BINCardConfigResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINCardConfigResponse.displayName = "proto.BINCardConfigResponse");
proto.BINCardConfigResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINCardConfigResponse.prototype.toObject = function(e) {
return proto.BINCardConfigResponse.toObject(e, this);
};
proto.BINCardConfigResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
providersList: s.Message.toObjectList(t.getProvidersList(), proto.BINCardProvider.toObject, e),
enablesecuritycheck: s.Message.getField(t, 4)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINCardConfigResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINCardConfigResponse();
return proto.BINCardConfigResponse.deserializeBinaryFromReader(o, t);
};
proto.BINCardConfigResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = new proto.BINCardProvider();
t.readMessage(o, proto.BINCardProvider.deserializeBinaryFromReader);
e.addProviders(o);
break;

case 4:
var o = t.readBool();
e.setEnablesecuritycheck(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINCardConfigResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINCardConfigResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINCardConfigResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getProvidersList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINCardProvider.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 4)) && e.writeBool(4, t);
};
proto.BINCardConfigResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINCardConfigResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINCardConfigResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINCardConfigResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINCardConfigResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINCardConfigResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINCardConfigResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINCardConfigResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINCardConfigResponse.prototype.getProvidersList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINCardProvider, 3);
};
proto.BINCardConfigResponse.prototype.setProvidersList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINCardConfigResponse.prototype.addProviders = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINCardProvider, t);
};
proto.BINCardConfigResponse.prototype.clearProvidersList = function() {
this.setProvidersList([]);
};
proto.BINCardConfigResponse.prototype.getEnablesecuritycheck = function() {
return s.Message.getFieldWithDefault(this, 4, !1);
};
proto.BINCardConfigResponse.prototype.setEnablesecuritycheck = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINCardConfigResponse.prototype.clearEnablesecuritycheck = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINCardConfigResponse.prototype.hasEnablesecuritycheck = function() {
return null != s.Message.getField(this, 4);
};
proto.BINPurchaseMoneyRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPurchaseMoneyRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINPurchaseMoneyRequest.displayName = "proto.BINPurchaseMoneyRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPurchaseMoneyRequest.prototype.toObject = function(e) {
return proto.BINPurchaseMoneyRequest.toObject(e, this);
};
proto.BINPurchaseMoneyRequest.toObject = function(e, t) {
var o = {
provider: s.Message.getField(t, 1),
cardserial: s.Message.getField(t, 2),
cardpin: s.Message.getField(t, 3),
securitykey: s.Message.getField(t, 4),
captcha: s.Message.getField(t, 5),
tocash: s.Message.getField(t, 6)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPurchaseMoneyRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPurchaseMoneyRequest();
return proto.BINPurchaseMoneyRequest.deserializeBinaryFromReader(o, t);
};
proto.BINPurchaseMoneyRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setProvider(o);
break;

case 2:
o = t.readString();
e.setCardserial(o);
break;

case 3:
o = t.readString();
e.setCardpin(o);
break;

case 4:
o = t.readString();
e.setSecuritykey(o);
break;

case 5:
o = t.readString();
e.setCaptcha(o);
break;

case 6:
var o = t.readBool();
e.setTocash(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPurchaseMoneyRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPurchaseMoneyRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPurchaseMoneyRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeBool(6, t);
};
proto.BINPurchaseMoneyRequest.prototype.getProvider = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINPurchaseMoneyRequest.prototype.setProvider = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPurchaseMoneyRequest.prototype.clearProvider = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPurchaseMoneyRequest.prototype.hasProvider = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPurchaseMoneyRequest.prototype.getCardserial = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINPurchaseMoneyRequest.prototype.setCardserial = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPurchaseMoneyRequest.prototype.clearCardserial = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPurchaseMoneyRequest.prototype.hasCardserial = function() {
return null != s.Message.getField(this, 2);
};
proto.BINPurchaseMoneyRequest.prototype.getCardpin = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINPurchaseMoneyRequest.prototype.setCardpin = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINPurchaseMoneyRequest.prototype.clearCardpin = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINPurchaseMoneyRequest.prototype.hasCardpin = function() {
return null != s.Message.getField(this, 3);
};
proto.BINPurchaseMoneyRequest.prototype.getSecuritykey = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINPurchaseMoneyRequest.prototype.setSecuritykey = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINPurchaseMoneyRequest.prototype.clearSecuritykey = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINPurchaseMoneyRequest.prototype.hasSecuritykey = function() {
return null != s.Message.getField(this, 4);
};
proto.BINPurchaseMoneyRequest.prototype.getCaptcha = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINPurchaseMoneyRequest.prototype.setCaptcha = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINPurchaseMoneyRequest.prototype.clearCaptcha = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINPurchaseMoneyRequest.prototype.hasCaptcha = function() {
return null != s.Message.getField(this, 5);
};
proto.BINPurchaseMoneyRequest.prototype.getTocash = function() {
return s.Message.getFieldWithDefault(this, 6, !1);
};
proto.BINPurchaseMoneyRequest.prototype.setTocash = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINPurchaseMoneyRequest.prototype.clearTocash = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINPurchaseMoneyRequest.prototype.hasTocash = function() {
return null != s.Message.getField(this, 6);
};
proto.BINPurchaseMoneyResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPurchaseMoneyResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINPurchaseMoneyResponse.displayName = "proto.BINPurchaseMoneyResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPurchaseMoneyResponse.prototype.toObject = function(e) {
return proto.BINPurchaseMoneyResponse.toObject(e, this);
};
proto.BINPurchaseMoneyResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPurchaseMoneyResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPurchaseMoneyResponse();
return proto.BINPurchaseMoneyResponse.deserializeBinaryFromReader(o, t);
};
proto.BINPurchaseMoneyResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
var o = t.readString();
e.setMessage(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPurchaseMoneyResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPurchaseMoneyResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPurchaseMoneyResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINPurchaseMoneyResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINPurchaseMoneyResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPurchaseMoneyResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPurchaseMoneyResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPurchaseMoneyResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINPurchaseMoneyResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPurchaseMoneyResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPurchaseMoneyResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINSmsConfigRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINSmsConfigRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINSmsConfigRequest.displayName = "proto.BINSmsConfigRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINSmsConfigRequest.prototype.toObject = function(e) {
return proto.BINSmsConfigRequest.toObject(e, this);
};
proto.BINSmsConfigRequest.toObject = function(e, t) {
var o = {
type: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINSmsConfigRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINSmsConfigRequest();
return proto.BINSmsConfigRequest.deserializeBinaryFromReader(o, t);
};
proto.BINSmsConfigRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setType(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINSmsConfigRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINSmsConfigRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINSmsConfigRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINSmsConfigRequest.prototype.getType = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINSmsConfigRequest.prototype.setType = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINSmsConfigRequest.prototype.clearType = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINSmsConfigRequest.prototype.hasType = function() {
return null != s.Message.getField(this, 1);
};
proto.BINSmsSyntax = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINSmsSyntax, s.Message);
r.DEBUG && !COMPILED && (proto.BINSmsSyntax.displayName = "proto.BINSmsSyntax");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINSmsSyntax.prototype.toObject = function(e) {
return proto.BINSmsSyntax.toObject(e, this);
};
proto.BINSmsSyntax.toObject = function(e, t) {
var o = {
syntaxid: s.Message.getField(t, 1),
syntax: s.Message.getField(t, 2),
parvalue: s.Message.getField(t, 3),
cashvalue: s.Message.getField(t, 4),
targetnumber: s.Message.getField(t, 5),
description: s.Message.getField(t, 6),
promotion: s.Message.getField(t, 7)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINSmsSyntax.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINSmsSyntax();
return proto.BINSmsSyntax.deserializeBinaryFromReader(o, t);
};
proto.BINSmsSyntax.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setSyntaxid(o);
break;

case 2:
o = t.readString();
e.setSyntax(o);
break;

case 3:
o = t.readInt32();
e.setParvalue(o);
break;

case 4:
o = t.readInt32();
e.setCashvalue(o);
break;

case 5:
o = t.readString();
e.setTargetnumber(o);
break;

case 6:
o = t.readString();
e.setDescription(o);
break;

case 7:
var o = t.readInt32();
e.setPromotion(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINSmsSyntax.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINSmsSyntax.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINSmsSyntax.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeString(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeInt32(7, t);
};
proto.BINSmsSyntax.prototype.getSyntaxid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINSmsSyntax.prototype.setSyntaxid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINSmsSyntax.prototype.clearSyntaxid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINSmsSyntax.prototype.hasSyntaxid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINSmsSyntax.prototype.getSyntax = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINSmsSyntax.prototype.setSyntax = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINSmsSyntax.prototype.clearSyntax = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINSmsSyntax.prototype.hasSyntax = function() {
return null != s.Message.getField(this, 2);
};
proto.BINSmsSyntax.prototype.getParvalue = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINSmsSyntax.prototype.setParvalue = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINSmsSyntax.prototype.clearParvalue = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINSmsSyntax.prototype.hasParvalue = function() {
return null != s.Message.getField(this, 3);
};
proto.BINSmsSyntax.prototype.getCashvalue = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINSmsSyntax.prototype.setCashvalue = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINSmsSyntax.prototype.clearCashvalue = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINSmsSyntax.prototype.hasCashvalue = function() {
return null != s.Message.getField(this, 4);
};
proto.BINSmsSyntax.prototype.getTargetnumber = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINSmsSyntax.prototype.setTargetnumber = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINSmsSyntax.prototype.clearTargetnumber = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINSmsSyntax.prototype.hasTargetnumber = function() {
return null != s.Message.getField(this, 5);
};
proto.BINSmsSyntax.prototype.getDescription = function() {
return s.Message.getFieldWithDefault(this, 6, "");
};
proto.BINSmsSyntax.prototype.setDescription = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINSmsSyntax.prototype.clearDescription = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINSmsSyntax.prototype.hasDescription = function() {
return null != s.Message.getField(this, 6);
};
proto.BINSmsSyntax.prototype.getPromotion = function() {
return s.Message.getFieldWithDefault(this, 7, 0);
};
proto.BINSmsSyntax.prototype.setPromotion = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINSmsSyntax.prototype.clearPromotion = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINSmsSyntax.prototype.hasPromotion = function() {
return null != s.Message.getField(this, 7);
};
proto.BINSmsProvider = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINSmsProvider.repeatedFields_, null);
};
r.inherits(proto.BINSmsProvider, s.Message);
r.DEBUG && !COMPILED && (proto.BINSmsProvider.displayName = "proto.BINSmsProvider");
proto.BINSmsProvider.repeatedFields_ = [ 4 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINSmsProvider.prototype.toObject = function(e) {
return proto.BINSmsProvider.toObject(e, this);
};
proto.BINSmsProvider.toObject = function(e, t) {
var o = {
providerid: s.Message.getField(t, 1),
providercode: s.Message.getField(t, 2),
providername: s.Message.getField(t, 3),
syntaxesList: s.Message.toObjectList(t.getSyntaxesList(), proto.BINSmsSyntax.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINSmsProvider.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINSmsProvider();
return proto.BINSmsProvider.deserializeBinaryFromReader(o, t);
};
proto.BINSmsProvider.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setProviderid(o);
break;

case 2:
o = t.readString();
e.setProvidercode(o);
break;

case 3:
o = t.readString();
e.setProvidername(o);
break;

case 4:
var o = new proto.BINSmsSyntax();
t.readMessage(o, proto.BINSmsSyntax.deserializeBinaryFromReader);
e.addSyntaxes(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINSmsProvider.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINSmsProvider.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINSmsProvider.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
(t = this.getSyntaxesList()).length > 0 && e.writeRepeatedMessage(4, t, proto.BINSmsSyntax.serializeBinaryToWriter);
};
proto.BINSmsProvider.prototype.getProviderid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINSmsProvider.prototype.setProviderid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINSmsProvider.prototype.clearProviderid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINSmsProvider.prototype.hasProviderid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINSmsProvider.prototype.getProvidercode = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINSmsProvider.prototype.setProvidercode = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINSmsProvider.prototype.clearProvidercode = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINSmsProvider.prototype.hasProvidercode = function() {
return null != s.Message.getField(this, 2);
};
proto.BINSmsProvider.prototype.getProvidername = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINSmsProvider.prototype.setProvidername = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINSmsProvider.prototype.clearProvidername = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINSmsProvider.prototype.hasProvidername = function() {
return null != s.Message.getField(this, 3);
};
proto.BINSmsProvider.prototype.getSyntaxesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINSmsSyntax, 4);
};
proto.BINSmsProvider.prototype.setSyntaxesList = function(e) {
s.Message.setRepeatedWrapperField(this, 4, e);
};
proto.BINSmsProvider.prototype.addSyntaxes = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 4, e, proto.BINSmsSyntax, t);
};
proto.BINSmsProvider.prototype.clearSyntaxesList = function() {
this.setSyntaxesList([]);
};
proto.BINSmsNumber = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINSmsNumber.repeatedFields_, null);
};
r.inherits(proto.BINSmsNumber, s.Message);
r.DEBUG && !COMPILED && (proto.BINSmsNumber.displayName = "proto.BINSmsNumber");
proto.BINSmsNumber.repeatedFields_ = [ 4 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINSmsNumber.prototype.toObject = function(e) {
return proto.BINSmsNumber.toObject(e, this);
};
proto.BINSmsNumber.toObject = function(e, t) {
var o = {
number: s.Message.getField(t, 1),
samesyntax: s.Message.getField(t, 2),
dayquota: s.Message.getField(t, 3),
providersList: s.Message.toObjectList(t.getProvidersList(), proto.BINSmsProvider.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINSmsNumber.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINSmsNumber();
return proto.BINSmsNumber.deserializeBinaryFromReader(o, t);
};
proto.BINSmsNumber.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setNumber(o);
break;

case 2:
o = t.readBool();
e.setSamesyntax(o);
break;

case 3:
o = t.readInt32();
e.setDayquota(o);
break;

case 4:
var o = new proto.BINSmsProvider();
t.readMessage(o, proto.BINSmsProvider.deserializeBinaryFromReader);
e.addProviders(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINSmsNumber.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINSmsNumber.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINSmsNumber.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeBool(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
(t = this.getProvidersList()).length > 0 && e.writeRepeatedMessage(4, t, proto.BINSmsProvider.serializeBinaryToWriter);
};
proto.BINSmsNumber.prototype.getNumber = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINSmsNumber.prototype.setNumber = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINSmsNumber.prototype.clearNumber = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINSmsNumber.prototype.hasNumber = function() {
return null != s.Message.getField(this, 1);
};
proto.BINSmsNumber.prototype.getSamesyntax = function() {
return s.Message.getFieldWithDefault(this, 2, !1);
};
proto.BINSmsNumber.prototype.setSamesyntax = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINSmsNumber.prototype.clearSamesyntax = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINSmsNumber.prototype.hasSamesyntax = function() {
return null != s.Message.getField(this, 2);
};
proto.BINSmsNumber.prototype.getDayquota = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINSmsNumber.prototype.setDayquota = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINSmsNumber.prototype.clearDayquota = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINSmsNumber.prototype.hasDayquota = function() {
return null != s.Message.getField(this, 3);
};
proto.BINSmsNumber.prototype.getProvidersList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINSmsProvider, 4);
};
proto.BINSmsNumber.prototype.setProvidersList = function(e) {
s.Message.setRepeatedWrapperField(this, 4, e);
};
proto.BINSmsNumber.prototype.addProviders = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 4, e, proto.BINSmsProvider, t);
};
proto.BINSmsNumber.prototype.clearProvidersList = function() {
this.setProvidersList([]);
};
proto.BINSmsConfigResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINSmsConfigResponse.repeatedFields_, null);
};
r.inherits(proto.BINSmsConfigResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINSmsConfigResponse.displayName = "proto.BINSmsConfigResponse");
proto.BINSmsConfigResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINSmsConfigResponse.prototype.toObject = function(e) {
return proto.BINSmsConfigResponse.toObject(e, this);
};
proto.BINSmsConfigResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
numbersList: s.Message.toObjectList(t.getNumbersList(), proto.BINSmsNumber.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINSmsConfigResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINSmsConfigResponse();
return proto.BINSmsConfigResponse.deserializeBinaryFromReader(o, t);
};
proto.BINSmsConfigResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINSmsNumber();
t.readMessage(o, proto.BINSmsNumber.deserializeBinaryFromReader);
e.addNumbers(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINSmsConfigResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINSmsConfigResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINSmsConfigResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getNumbersList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINSmsNumber.serializeBinaryToWriter);
};
proto.BINSmsConfigResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINSmsConfigResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINSmsConfigResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINSmsConfigResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINSmsConfigResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINSmsConfigResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINSmsConfigResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINSmsConfigResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINSmsConfigResponse.prototype.getNumbersList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINSmsNumber, 3);
};
proto.BINSmsConfigResponse.prototype.setNumbersList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINSmsConfigResponse.prototype.addNumbers = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINSmsNumber, t);
};
proto.BINSmsConfigResponse.prototype.clearNumbersList = function() {
this.setNumbersList([]);
};
proto.BINGoldProduct = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINGoldProduct, s.Message);
r.DEBUG && !COMPILED && (proto.BINGoldProduct.displayName = "proto.BINGoldProduct");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINGoldProduct.prototype.toObject = function(e) {
return proto.BINGoldProduct.toObject(e, this);
};
proto.BINGoldProduct.toObject = function(e, t) {
var o = {
productid: s.Message.getField(t, 1),
cashvalue: s.Message.getField(t, 2),
goldvalue: s.Message.getField(t, 3),
promotion: s.Message.getField(t, 4)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINGoldProduct.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINGoldProduct();
return proto.BINGoldProduct.deserializeBinaryFromReader(o, t);
};
proto.BINGoldProduct.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setProductid(o);
break;

case 2:
o = t.readInt32();
e.setCashvalue(o);
break;

case 3:
o = t.readInt32();
e.setGoldvalue(o);
break;

case 4:
var o = t.readInt32();
e.setPromotion(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINGoldProduct.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINGoldProduct.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINGoldProduct.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
};
proto.BINGoldProduct.prototype.getProductid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINGoldProduct.prototype.setProductid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINGoldProduct.prototype.clearProductid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINGoldProduct.prototype.hasProductid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINGoldProduct.prototype.getCashvalue = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINGoldProduct.prototype.setCashvalue = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINGoldProduct.prototype.clearCashvalue = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINGoldProduct.prototype.hasCashvalue = function() {
return null != s.Message.getField(this, 2);
};
proto.BINGoldProduct.prototype.getGoldvalue = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINGoldProduct.prototype.setGoldvalue = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINGoldProduct.prototype.clearGoldvalue = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINGoldProduct.prototype.hasGoldvalue = function() {
return null != s.Message.getField(this, 3);
};
proto.BINGoldProduct.prototype.getPromotion = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINGoldProduct.prototype.setPromotion = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINGoldProduct.prototype.clearPromotion = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINGoldProduct.prototype.hasPromotion = function() {
return null != s.Message.getField(this, 4);
};
proto.BINGoldConfigRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINGoldConfigRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINGoldConfigRequest.displayName = "proto.BINGoldConfigRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINGoldConfigRequest.prototype.toObject = function(e) {
return proto.BINGoldConfigRequest.toObject(e, this);
};
proto.BINGoldConfigRequest.toObject = function(e, t) {
var o = {
type: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINGoldConfigRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINGoldConfigRequest();
return proto.BINGoldConfigRequest.deserializeBinaryFromReader(o, t);
};
proto.BINGoldConfigRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setType(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINGoldConfigRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINGoldConfigRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINGoldConfigRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINGoldConfigRequest.prototype.getType = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINGoldConfigRequest.prototype.setType = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINGoldConfigRequest.prototype.clearType = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINGoldConfigRequest.prototype.hasType = function() {
return null != s.Message.getField(this, 1);
};
proto.BINGoldConfigResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINGoldConfigResponse.repeatedFields_, null);
};
r.inherits(proto.BINGoldConfigResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINGoldConfigResponse.displayName = "proto.BINGoldConfigResponse");
proto.BINGoldConfigResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINGoldConfigResponse.prototype.toObject = function(e) {
return proto.BINGoldConfigResponse.toObject(e, this);
};
proto.BINGoldConfigResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
goldproductsList: s.Message.toObjectList(t.getGoldproductsList(), proto.BINGoldProduct.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINGoldConfigResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINGoldConfigResponse();
return proto.BINGoldConfigResponse.deserializeBinaryFromReader(o, t);
};
proto.BINGoldConfigResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
var o = new proto.BINGoldProduct();
t.readMessage(o, proto.BINGoldProduct.deserializeBinaryFromReader);
e.addGoldproducts(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINGoldConfigResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINGoldConfigResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINGoldConfigResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getGoldproductsList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINGoldProduct.serializeBinaryToWriter);
};
proto.BINGoldConfigResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINGoldConfigResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINGoldConfigResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINGoldConfigResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINGoldConfigResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINGoldConfigResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINGoldConfigResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINGoldConfigResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINGoldConfigResponse.prototype.getGoldproductsList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINGoldProduct, 3);
};
proto.BINGoldConfigResponse.prototype.setGoldproductsList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINGoldConfigResponse.prototype.addGoldproducts = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINGoldProduct, t);
};
proto.BINGoldConfigResponse.prototype.clearGoldproductsList = function() {
this.setGoldproductsList([]);
};
proto.BINPurchaseGoldRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPurchaseGoldRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINPurchaseGoldRequest.displayName = "proto.BINPurchaseGoldRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPurchaseGoldRequest.prototype.toObject = function(e) {
return proto.BINPurchaseGoldRequest.toObject(e, this);
};
proto.BINPurchaseGoldRequest.toObject = function(e, t) {
var o = {
productid: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPurchaseGoldRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPurchaseGoldRequest();
return proto.BINPurchaseGoldRequest.deserializeBinaryFromReader(o, t);
};
proto.BINPurchaseGoldRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setProductid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPurchaseGoldRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPurchaseGoldRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPurchaseGoldRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINPurchaseGoldRequest.prototype.getProductid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINPurchaseGoldRequest.prototype.setProductid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPurchaseGoldRequest.prototype.clearProductid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPurchaseGoldRequest.prototype.hasProductid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPurchaseGoldResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINPurchaseGoldResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINPurchaseGoldResponse.displayName = "proto.BINPurchaseGoldResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINPurchaseGoldResponse.prototype.toObject = function(e) {
return proto.BINPurchaseGoldResponse.toObject(e, this);
};
proto.BINPurchaseGoldResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINPurchaseGoldResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINPurchaseGoldResponse();
return proto.BINPurchaseGoldResponse.deserializeBinaryFromReader(o, t);
};
proto.BINPurchaseGoldResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
var o = t.readString();
e.setMessage(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINPurchaseGoldResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINPurchaseGoldResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINPurchaseGoldResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINPurchaseGoldResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINPurchaseGoldResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINPurchaseGoldResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINPurchaseGoldResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINPurchaseGoldResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINPurchaseGoldResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINPurchaseGoldResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINPurchaseGoldResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
register_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "e764fNsZeFEubUyA8lCOkFJ", "register_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINRegisterRequest", null, i);
r.exportSymbol("proto.BINRegisterResponse", null, i);
proto.BINRegisterRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRegisterRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINRegisterRequest.displayName = "proto.BINRegisterRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRegisterRequest.prototype.toObject = function(e) {
return proto.BINRegisterRequest.toObject(e, this);
};
proto.BINRegisterRequest.toObject = function(e, t) {
var o = {
username: s.Message.getField(t, 1),
password: s.Message.getField(t, 2),
confirmpassword: s.Message.getField(t, 3),
displayname: s.Message.getField(t, 4),
mobile: s.Message.getField(t, 5)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRegisterRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRegisterRequest();
return proto.BINRegisterRequest.deserializeBinaryFromReader(o, t);
};
proto.BINRegisterRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readString();
e.setUsername(o);
break;

case 2:
o = t.readString();
e.setPassword(o);
break;

case 3:
o = t.readString();
e.setConfirmpassword(o);
break;

case 4:
o = t.readString();
e.setDisplayname(o);
break;

case 5:
var o = t.readString();
e.setMobile(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRegisterRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRegisterRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRegisterRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
};
proto.BINRegisterRequest.prototype.getUsername = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINRegisterRequest.prototype.setUsername = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRegisterRequest.prototype.clearUsername = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRegisterRequest.prototype.hasUsername = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRegisterRequest.prototype.getPassword = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINRegisterRequest.prototype.setPassword = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRegisterRequest.prototype.clearPassword = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRegisterRequest.prototype.hasPassword = function() {
return null != s.Message.getField(this, 2);
};
proto.BINRegisterRequest.prototype.getConfirmpassword = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINRegisterRequest.prototype.setConfirmpassword = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINRegisterRequest.prototype.clearConfirmpassword = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINRegisterRequest.prototype.hasConfirmpassword = function() {
return null != s.Message.getField(this, 3);
};
proto.BINRegisterRequest.prototype.getDisplayname = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINRegisterRequest.prototype.setDisplayname = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINRegisterRequest.prototype.clearDisplayname = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINRegisterRequest.prototype.hasDisplayname = function() {
return null != s.Message.getField(this, 4);
};
proto.BINRegisterRequest.prototype.getMobile = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINRegisterRequest.prototype.setMobile = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINRegisterRequest.prototype.clearMobile = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINRegisterRequest.prototype.hasMobile = function() {
return null != s.Message.getField(this, 5);
};
proto.BINRegisterResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINRegisterResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINRegisterResponse.displayName = "proto.BINRegisterResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINRegisterResponse.prototype.toObject = function(e) {
return proto.BINRegisterResponse.toObject(e, this);
};
proto.BINRegisterResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINRegisterResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINRegisterResponse();
return proto.BINRegisterResponse.deserializeBinaryFromReader(o, t);
};
proto.BINRegisterResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
var o = t.readString();
e.setMessage(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINRegisterResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINRegisterResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINRegisterResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINRegisterResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINRegisterResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINRegisterResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINRegisterResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINRegisterResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINRegisterResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINRegisterResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINRegisterResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
start_match_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "0c4330i6qNOeoaM9FCJYBzo", "start_match_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./map_field_entry_pb.js");
r.exportSymbol("proto.BINStartMatchRequest", null, i);
r.exportSymbol("proto.BINStartMatchResponse", null, i);
proto.BINStartMatchRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINStartMatchRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINStartMatchRequest.displayName = "proto.BINStartMatchRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINStartMatchRequest.prototype.toObject = function(e) {
return proto.BINStartMatchRequest.toObject(e, this);
};
proto.BINStartMatchRequest.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINStartMatchRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINStartMatchRequest();
return proto.BINStartMatchRequest.deserializeBinaryFromReader(o, t);
};
proto.BINStartMatchRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setRoomindex(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINStartMatchRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINStartMatchRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINStartMatchRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINStartMatchRequest.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINStartMatchRequest.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINStartMatchRequest.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINStartMatchRequest.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINStartMatchResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINStartMatchResponse.repeatedFields_, null);
};
r.inherits(proto.BINStartMatchResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINStartMatchResponse.displayName = "proto.BINStartMatchResponse");
proto.BINStartMatchResponse.repeatedFields_ = [ 5 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINStartMatchResponse.prototype.toObject = function(e) {
return proto.BINStartMatchResponse.toObject(e, this);
};
proto.BINStartMatchResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
countdowntimer: s.Message.getField(t, 3),
firstturnuserid: s.Message.getField(t, 4),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e),
zoneid: s.Message.getField(t, 6)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINStartMatchResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINStartMatchResponse();
return proto.BINStartMatchResponse.deserializeBinaryFromReader(o, t);
};
proto.BINStartMatchResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt32();
e.setCountdowntimer(o);
break;

case 4:
o = t.readInt64();
e.setFirstturnuserid(o);
break;

case 5:
o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

case 6:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINStartMatchResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINStartMatchResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINStartMatchResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt32(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(5, t, n.BINMapFieldEntry.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 6)) && e.writeInt32(6, t);
};
proto.BINStartMatchResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINStartMatchResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINStartMatchResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINStartMatchResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINStartMatchResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINStartMatchResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINStartMatchResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINStartMatchResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINStartMatchResponse.prototype.getCountdowntimer = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINStartMatchResponse.prototype.setCountdowntimer = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINStartMatchResponse.prototype.clearCountdowntimer = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINStartMatchResponse.prototype.hasCountdowntimer = function() {
return null != s.Message.getField(this, 3);
};
proto.BINStartMatchResponse.prototype.getFirstturnuserid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINStartMatchResponse.prototype.setFirstturnuserid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINStartMatchResponse.prototype.clearFirstturnuserid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINStartMatchResponse.prototype.hasFirstturnuserid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINStartMatchResponse.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 5);
};
proto.BINStartMatchResponse.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 5, e);
};
proto.BINStartMatchResponse.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 5, e, proto.BINMapFieldEntry, t);
};
proto.BINStartMatchResponse.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINStartMatchResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINStartMatchResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINStartMatchResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINStartMatchResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 6);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./map_field_entry_pb.js": "map_field_entry_pb",
"google-protobuf": "google-protobuf"
} ],
tableView: [ function(e, t, o) {
"use strict";
function s(e, t) {
if (e.length <= 1) return e;
for (var o = Math.floor(e.length / 2), r = e[o], i = [], n = [], a = 0; a < e.length; a++) a !== o && (t ? t(e[a], r) ? i.push(e[a]) : n.push(e[a]) : e[a] <= r ? i.push(e[a]) : n.push(e[a]));
return s(i, t).concat([ r ], s(n, t));
}
cc._RF.push(t, "1d15atdx51ExJ6u0pe1cxvK", "tableView");
var r = cc.Enum({
Horizontal: 0,
Vertical: 1
}), i = cc.Enum({
None: 0,
Up: 1,
Down: 2,
Left: 3,
Rigth: 4
}), n = cc.Enum({
LEFT_TO_RIGHT__TOP_TO_BOTTOM: 0,
TOP_TO_BOTTOM__LEFT_TO_RIGHT: 1
}), a = cc.Enum({
Scroll: 0,
Flip: 1
}), p = function(e) {
var t = cc.Mask;
if (t) for (var o = 0, s = e; s && cc.Node.isNode(s); s = s._parent, ++o) if (s.getComponent(t)) return {
index: o,
node: s
};
return null;
}, l = cc.Class({
extends: cc.ScrollView,
editor: !1,
properties: {
_data: null,
_minCellIndex: 0,
_maxCellIndex: 0,
_paramCount: 0,
_count: 0,
_cellCount: 0,
_showCellCount: 0,
_groupCellCount: null,
_scrollDirection: i.None,
_cellPool: null,
_view: null,
_page: 0,
_pageTotal: 0,
_touchLayer: cc.Node,
_loadSuccess: !1,
_initSuccess: !1,
_scheduleInit: !1,
cell: {
default: null,
type: cc.Prefab,
notify: function(e) {}
},
ScrollModel: {
default: 0,
type: r,
notify: function(e) {
if (this.ScrollModel === r.Horizontal) {
this.horizontal = !0;
this.vertical = !1;
this.verticalScrollBar = null;
} else {
this.vertical = !0;
this.horizontal = !1;
this.horizontalScrollBar = null;
}
},
tooltip: "横向纵向滑动"
},
ViewType: {
default: 0,
type: a,
notify: function(e) {
this.ViewType === a.Flip ? this.inertia = !1 : this.inertia = !0;
},
tooltip: "为Scroll时,不做解释\n为Flipw时，在Scroll的基础上增加翻页的行为"
},
isFill: {
default: !1,
tooltip: "当节点不能铺满一页时，选择isFill为true会填充节点铺满整个view"
},
Direction: {
default: 0,
type: n,
tooltip: "规定cell的排列方向"
},
pageChangeEvents: {
default: [],
type: cc.Component.EventHandler,
tooltip: "仅当ViewType为pageView时有效，初始化或翻页时触发回调，向回调传入两个参数，参数一为当前处于哪一页，参数二为一共多少页"
}
},
statics: {
_cellPoolCache: {}
},
onLoad: function() {
window.s = this;
var e = this;
l._tableView.push(this);
var t = this.node.destroy;
this.node.destroy = function() {
e.clear();
t.call(e.node);
};
var o = this.node._onPreDestroy;
this.node._onPreDestroy = function() {
e.clear();
o.call(e.node);
};
},
onDestroy: function() {
cc.eventManager.removeListener(this._touchListener);
this._touchListener.release();
for (var e in l._tableView) {
cc.log("key =", e);
if (l._tableView[e] === this) {
l._tableView.splice(e);
cc.log("_tableView =", l._tableView);
return;
}
}
},
_addListenerToTouchLayer: function() {
this._touchLayer = new cc.Node();
var e = this._touchLayer.addComponent(cc.Widget);
e.isAlignTop = !0;
e.isAlignBottom = !0;
e.isAlignLeft = !0;
e.isAlignRight = !0;
e.top = 0;
e.bottom = 0;
e.left = 0;
e.right = 0;
e.isAlignOnce = !1;
this._touchLayer.parent = this._view;
var t = this;
this._touchListener = cc.EventListener.create({
event: cc.EventListener.TOUCH_ONE_BY_ONE,
swallowTouches: !1,
ower: this._touchLayer,
mask: p(this._touchLayer),
onTouchBegan: function(e, o) {
var s = e.getLocation();
if (this.ower._hitTest(s, this)) {
t._touchstart(e);
return !0;
}
return !1;
},
onTouchMoved: function(e, o) {
t._touchmove(e);
},
onTouchEnded: function(e, o) {
t._touchend(e);
}
});
this._touchListener.retain();
cc.eventManager.addListener(this._touchListener, this._touchLayer);
},
_setStopPropagation: function() {
this.node.on("touchstart", function(e) {
e.stopPropagation();
});
this.node.on("touchmove", function(e) {
e.stopPropagation();
});
this.node.on("touchend", function(e) {
e.stopPropagation();
});
this.node.on("touchcancel", function(e) {
e.stopPropagation();
});
},
_initCell: function(e, t) {
if (this.ScrollModel === r.Horizontal && this.Direction === n.TOP_TO_BOTTOM__LEFT_TO_RIGHT || this.ScrollModel === r.Vertical && this.Direction === n.LEFT_TO_RIGHT__TOP_TO_BOTTOM) {
for (var o = e.tag * e.childrenCount, s = 0; s < e.childrenCount; ++s) if (l = (p = e.children[s]).getComponent("viewCell")) {
l._cellInit_(this);
l.init(o + s, this._data, t, [ e.tag, s ]);
}
} else if (this.ViewType === a.Flip) {
for (var i = (o = Math.floor(e.tag / this._showCellCount)) * this._showCellCount * e.childrenCount, s = 0; s < e.childrenCount; ++s) if (l = (p = e.children[s]).getComponent("viewCell")) {
l._cellInit_(this);
l.init(this._showCellCount * s + e.tag % this._showCellCount + i, this._data, t, [ s + o * e.childrenCount, s ]);
}
} else for (s = 0; s < e.childrenCount; ++s) {
var p = e.children[s], l = p.getComponent("viewCell");
if (l) {
l._cellInit_(this);
l.init(s * this._count + e.tag, this._data, t, [ s, s ]);
}
}
},
_setCellPosition: function(e, t) {
if (this.ScrollModel === r.Horizontal) {
e.x = 0 === t ? -this.content.width * this.content.anchorX + e.width * e.anchorX : this.content.getChildByTag(t - 1).x + e.width;
e.y = (e.anchorY - this.content.anchorY) * e.height;
} else {
e.y = 0 === t ? this.content.height * (1 - this.content.anchorY) - e.height * (1 - e.anchorY) : this.content.getChildByTag(t - 1).y - e.height;
e.x = (e.anchorX - this.content.anchorX) * e.width;
}
},
_addCell: function(e) {
var t = this._getCell();
this._setCellAttr(t, e);
this._setCellPosition(t, e);
t.parent = this.content;
this._initCell(t);
},
_setCellAttr: function(e, t) {
e.setSiblingIndex(t >= e.tag ? this._cellCount : 0);
e.tag = t;
},
_addCellsToView: function() {
for (var e = 0; e <= this._maxCellIndex; ++e) this._addCell(e);
},
_getCell: function() {
if (0 === this._cellPool.size()) {
var e = cc.instantiate(this.cell), t = new cc.Node();
t.anchorX = .5;
t.anchorY = .5;
var o = 0;
if (this.ScrollModel === r.Horizontal) {
t.width = e.width;
s = Math.floor(this.content.height / e.height);
t.height = this.content.height;
for (i = 0; i < s; ++i) {
e || (e = cc.instantiate(this.cell));
e.x = (e.anchorX - .5) * e.width;
e.y = t.height / 2 - e.height * (1 - e.anchorY) - o;
o += e.height;
e.parent = t;
e = null;
}
} else {
t.height = e.height;
var s = Math.floor(this.content.width / e.width);
t.width = this.content.width;
for (var i = 0; i < s; ++i) {
e || (e = cc.instantiate(this.cell));
e.y = (e.anchorY - .5) * e.height;
e.x = -t.width / 2 + e.width * e.anchorX + o;
o += e.width;
e.parent = t;
e = null;
}
}
this._cellPool.put(t);
}
return e = this._cellPool.get();
},
_getCellSize: function() {
var e = this._getCell(), t = e.getContentSize();
this._cellPool.put(e);
return t;
},
_getGroupCellCount: function() {
var e = this._getCell(), t = e.childrenCount;
this._cellPool.put(e);
return t;
},
clear: function() {
for (var e = this.content.childrenCount - 1; e >= 0; --e) this._cellPool.put(this.content.children[e]);
this._cellCount = 0;
this._showCellCount = 0;
},
reload: function(e) {
void 0 !== e && (this._data = e);
for (var t = this.content.childrenCount - 1; t >= 0; --t) this._initCell(this.content.children[t], !0);
},
_getCellPoolCacheName: function() {
return this.ScrollModel === r.Horizontal ? this.cell.name + "h" + this.content.height : this.cell.name + "w" + this.content.width;
},
_initTableView: function() {
this._scheduleInit = !1;
this._cellPool && this.clear();
var e = this._getCellPoolCacheName();
l._cellPoolCache[e] || (l._cellPoolCache[e] = new cc.NodePool("viewCell"));
this._cellPool = l._cellPoolCache[e];
this._cellSize = this._getCellSize();
this._groupCellCount = this._getGroupCellCount();
this._count = Math.ceil(this._paramCount / this._groupCellCount);
if (this.ScrollModel === r.Horizontal) {
this._view.width = this.node.width;
this._view.x = (this._view.anchorX - this.node.anchorX) * this._view.width;
this._cellCount = Math.ceil(this._view.width / this._cellSize.width) + 1;
if (this.ViewType === a.Flip) if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.width / this._cellSize.width) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
this._pageTotal = 1;
} else {
this._pageTotal = Math.ceil(this._count / (this._cellCount - 1));
this._count = this._pageTotal * (this._cellCount - 1);
this._showCellCount = this._cellCount - 1;
} else if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.width / this._cellSize.width) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
} else this._showCellCount = this._cellCount - 1;
this.content.width = this._count * this._cellSize.width;
this.stopAutoScroll();
this.scrollToLeft();
} else {
this._view.height = this.node.height;
this._view.y = (this._view.anchorY - this.node.anchorY) * this._view.height;
this._cellCount = Math.ceil(this._view.height / this._cellSize.height) + 1;
if (this.ViewType === a.Flip) if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.height / this._cellSize.height) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
this._pageTotal = 1;
} else {
this._pageTotal = Math.ceil(this._count / (this._cellCount - 1));
this._count = this._pageTotal * (this._cellCount - 1);
this._showCellCount = this._cellCount - 1;
} else if (this._cellCount > this._count) {
this.isFill ? this._cellCount = Math.floor(this._view.height / this._cellSize.height) : this._cellCount = this._count;
this._showCellCount = this._cellCount;
} else this._showCellCount = this._cellCount - 1;
this.content.height = this._count * this._cellSize.height;
this.stopAutoScroll();
this.scrollToTop();
}
this._changePageNum(1 - this._page);
this._lastOffset = this.getScrollOffset();
this._minCellIndex = 0;
this._maxCellIndex = this._cellCount - 1;
this._addCellsToView();
this._initSuccess = !0;
},
initTableView: function(e, t) {
this._paramCount = e;
this._data = t;
if (this._loadSuccess) this._scheduleInit || this._initTableView(); else {
if (this.ScrollModel === r.Horizontal) {
this.horizontal = !0;
this.vertical = !1;
} else {
this.vertical = !0;
this.horizontal = !1;
}
this._view = this.content.parent;
this.verticalScrollBar && this.verticalScrollBar.node.on("size-changed", function() {
this._updateScrollBar(this._getHowMuchOutOfBoundary());
}, this);
this.horizontalScrollBar && this.horizontalScrollBar.node.on("size-changed", function() {
this._updateScrollBar(this._getHowMuchOutOfBoundary());
}, this);
this._addListenerToTouchLayer();
this._setStopPropagation();
if (this.node.getComponent(cc.Widget) || this._view.getComponent(cc.Widget) || this.content.getComponent(cc.Widget)) {
this.scheduleOnce(this._initTableView);
this._scheduleInit = !0;
} else this._initTableView();
this._loadSuccess = !0;
}
},
stopAutoScroll: function() {
if (this._scheduleInit) this.scheduleOnce(function() {
this.stopAutoScroll();
}); else {
this._scrollDirection = i.None;
this._super();
}
},
scrollToBottom: function(e, t) {
if (this._scheduleInit) this.scheduleOnce(function() {
this.scrollToBottom(e, t);
}); else {
this._scrollDirection = i.Up;
this._super(e, t);
}
},
scrollToTop: function(e, t) {
if (this._scheduleInit) this.scheduleOnce(function() {
this.scrollToTop(e, t);
}); else {
this._scrollDirection = i.Down;
this._super(e, t);
}
},
scrollToLeft: function(e, t) {
if (this._scheduleInit) this.scheduleOnce(function() {
this.scrollToLeft(e, t);
}); else {
this._scrollDirection = i.Rigth;
this._super(e, t);
}
},
scrollToRight: function(e, t) {
if (this._scheduleInit) this.scheduleOnce(function() {
this.scrollToRight(e, t);
}); else {
this._scrollDirection = i.Left;
this._super(e, t);
}
},
scrollToOffset: function(e, t, o) {
if (this._scheduleInit) this.scheduleOnce(function() {
this.scrollToOffset(e, t, o);
}); else {
var s = this.getScrollOffset(), n = cc.pSub(e, s);
this.ScrollModel === r.Horizontal ? n.x > 0 ? this._scrollDirection = i.Left : n.x < 0 && (this._scrollDirection = i.Rigth) : n.y > 0 ? this._scrollDirection = i.Up : n.y < 0 && (this._scrollDirection = i.Down);
this._super(e, t, o);
}
},
addScrollEvent: function(e, t, o) {
var s = new cc.Component.EventHandler();
s.target = e;
s.component = t;
s.handler = o;
this.scrollEvents.push(s);
},
removeScrollEvent: function(e) {
for (var t in this.scrollEvents) if (this.scrollEvents[t].target === e) {
this.scrollEvents.splice(t, 1);
return;
}
},
clearScrollEvent: function() {
this.scrollEvents = [];
},
addPageEvent: function(e, t, o) {
var s = new cc.Component.EventHandler();
s.target = e;
s.component = t;
s.handler = o;
this.pageChangeEvents.push(s);
},
removePageEvent: function(e) {
for (var t in this.pageChangeEvents) if (this.pageChangeEvents[t].target === e) {
this.pageChangeEvents.splice(t, 1);
return;
}
},
clearPageEvent: function() {
this.pageChangeEvents = [];
},
scrollToNextPage: function() {
this.scrollToPage(this._page + 1);
},
scrollToLastPage: function() {
this.scrollToPage(this._page - 1);
},
scrollToPage: function(e) {
if (this.ViewType === a.Flip && e !== this._page && !(e < 1 || e > this._pageTotal)) {
var t = .3 * Math.abs(e - this._page);
this._changePageNum(e - this._page);
if (this._initSuccess) {
var o = this._view.width, s = this._view.height;
o = (this._page - 1) * o;
s = (this._page - 1) * s;
this.scrollToOffset({
x: o,
y: s
}, t);
} else this.scheduleOnce(function() {
var e = this._view.width, o = this._view.height;
e = (this._page - 1) * e;
o = (this._page - 1) * o;
this.scrollToOffset({
x: e,
y: o
}, t);
});
}
},
getCells: function(e) {
var t = this, o = function() {
var o = [], r = s(t.content.children, function(e, t) {
return e.tag < t.tag;
});
for (var i in r) {
var n = r[i];
for (var a in n.children) o.push(n.children[a]);
}
e(o);
};
this._initSuccess ? o() : this.scheduleOnce(o);
},
getData: function() {
return this._data;
},
getGroupsRange: function(e) {
var t = this, o = function() {
for (var o = [], s = t._minCellIndex; s <= t._maxCellIndex; s++) o.push(s);
e(o);
};
this._initSuccess ? o() : this.scheduleOnce(o);
},
_changePageNum: function(e) {
this._page += e;
this._page <= 0 ? this._page = 1 : this._page > this._pageTotal && (this._page = this._pageTotal);
for (var t in this.pageChangeEvents) this.pageChangeEvents[t].emit([ this._page, this._pageTotal ]);
},
_touchstart: function(e) {
this.ScrollModel === r.Horizontal ? this.horizontal = !1 : this.vertical = !1;
},
_touchmove: function(e) {
if (this.horizontal === this.vertical) {
var t = e.getStartLocation(), o = e.getLocation();
if (this.ScrollModel === r.Horizontal) {
if (Math.abs(o.x - t.x) <= 7) return;
} else if (Math.abs(o.y - t.y) <= 7) return;
this.ScrollModel === r.Horizontal ? this.horizontal = !0 : this.vertical = !0;
}
},
_touchend: function(e) {
this.ScrollModel === r.Horizontal ? this.horizontal = !0 : this.vertical = !0;
this.ViewType === a.Flip && this._pageTotal > 1 && this._pageMove(e);
},
_pageMove: function(e) {
var t = this._view.width, o = this._view.height;
if (this.ViewType === a.Flip) {
var s = this.getScrollOffset(), n = this.getMaxScrollOffset();
if (this.ScrollModel === r.Horizontal) {
if (s.x >= 0 || s.x <= -n.x) return;
o = 0;
if (Math.abs(e.getLocation().x - e.getStartLocation().x) > this._view.width / 4) if (this._scrollDirection === i.Left) {
if (!(this._page < this._pageTotal)) return;
this._changePageNum(1);
} else if (this._scrollDirection === i.Rigth) {
if (!(this._page > 1)) return;
this._changePageNum(-1);
}
} else {
if (s.y >= n.y || s.y <= 0) return;
t = 0;
if (Math.abs(e.getLocation().y - e.getStartLocation().y) > this._view.height / 4) if (this._scrollDirection === i.Up) {
if (!(this._page < this._pageTotal)) return;
this._changePageNum(1);
} else if (this._scrollDirection === i.Down) {
if (!(this._page > 1)) return;
this._changePageNum(-1);
}
}
t = (this._page - 1) * t;
o = (this._page - 1) * o;
this.scrollToOffset({
x: t,
y: o
}, .3);
}
},
_getBoundingBoxToWorld: function(e) {
var t = e.convertToWorldSpace(cc.p(0, 0));
return cc.rect(t.x, t.y, e.width, e.height);
},
_updateCells: function() {
if (this.ScrollModel === r.Horizontal) {
if (this._scrollDirection === i.Left) {
if (this._maxCellIndex < this._count - 1) {
e = this._getBoundingBoxToWorld(this._view);
do {
t = this.content.getChildByTag(this._minCellIndex);
if (!((o = this._getBoundingBoxToWorld(t)).xMax <= e.xMin)) break;
t.x = this.content.getChildByTag(this._maxCellIndex).x + t.width;
this._minCellIndex++;
this._maxCellIndex++;
if (o.xMax + (this._maxCellIndex - this._minCellIndex + 1) * t.width > e.xMin) {
this._setCellAttr(t, this._maxCellIndex);
this._initCell(t);
}
} while (this._maxCellIndex !== this._count - 1);
}
} else if (this._scrollDirection === i.Rigth && this._minCellIndex > 0) {
e = this._getBoundingBoxToWorld(this._view);
do {
t = this.content.getChildByTag(this._maxCellIndex);
if (!((o = this._getBoundingBoxToWorld(t)).xMin >= e.xMax)) break;
t.x = this.content.getChildByTag(this._minCellIndex).x - t.width;
this._minCellIndex--;
this._maxCellIndex--;
if (o.xMin - (this._maxCellIndex - this._minCellIndex + 1) * t.width < e.xMax) {
this._setCellAttr(t, this._minCellIndex);
this._initCell(t);
}
} while (0 !== this._minCellIndex);
}
} else if (this._scrollDirection === i.Up) {
if (this._maxCellIndex < this._count - 1) {
e = this._getBoundingBoxToWorld(this._view);
do {
t = this.content.getChildByTag(this._minCellIndex);
if (!((o = this._getBoundingBoxToWorld(t)).yMin >= e.yMax)) break;
t.y = this.content.getChildByTag(this._maxCellIndex).y - t.height;
this._minCellIndex++;
this._maxCellIndex++;
if (o.yMin - (this._maxCellIndex - this._minCellIndex + 1) * t.height < e.yMax) {
this._setCellAttr(t, this._maxCellIndex);
this._initCell(t);
}
} while (this._maxCellIndex !== this._count - 1);
}
} else if (this._scrollDirection === i.Down && this._minCellIndex > 0) {
var e = this._getBoundingBoxToWorld(this._view);
do {
var t = this.content.getChildByTag(this._maxCellIndex), o = this._getBoundingBoxToWorld(t);
if (!(o.yMax <= e.yMin)) break;
t.y = this.content.getChildByTag(this._minCellIndex).y + t.height;
this._minCellIndex--;
this._maxCellIndex--;
if (o.yMax + (this._maxCellIndex - this._minCellIndex + 1) * t.width > e.yMin) {
this._setCellAttr(t, this._minCellIndex);
this._initCell(t);
}
} while (0 !== this._minCellIndex);
}
},
_getScrollDirection: function() {
var e = this.getScrollOffset(), t = this._lastOffset;
this._lastOffset = e;
e = cc.pSub(e, t);
this.ScrollModel === r.Horizontal ? e.x > 0 ? this._scrollDirection = i.Rigth : e.x < 0 ? this._scrollDirection = i.Left : this._scrollDirection = i.None : e.y < 0 ? this._scrollDirection = i.Down : e.y > 0 ? this._scrollDirection = i.Up : this._scrollDirection = i.None;
},
update: function(e) {
this._super(e);
if (this._initSuccess && this._cellCount !== this._showCellCount && 1 !== this._pageTotal) {
this._getScrollDirection();
this._updateCells();
}
}
});
l._tableView = [];
l.reload = function() {
for (var e in l._tableView) l._tableView[e].reload();
};
l.clear = function() {
for (var e in l._tableView) l._tableView[e].clear();
};
cc.tableView = t.export = l;
cc._RF.pop();
}, {} ],
text_emoticon_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "fcc9beNNQZA77aWmnH+XavD", "text_emoticon_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINTextEmoticon", null, i);
proto.BINTextEmoticon = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINTextEmoticon, s.Message);
r.DEBUG && !COMPILED && (proto.BINTextEmoticon.displayName = "proto.BINTextEmoticon");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINTextEmoticon.prototype.toObject = function(e) {
return proto.BINTextEmoticon.toObject(e, this);
};
proto.BINTextEmoticon.toObject = function(e, t) {
var o = {
userid: s.Message.getField(t, 1),
emoticonid: s.Message.getField(t, 2),
message: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINTextEmoticon.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINTextEmoticon();
return proto.BINTextEmoticon.deserializeBinaryFromReader(o, t);
};
proto.BINTextEmoticon.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setUserid(o);
break;

case 2:
o = t.readInt32();
e.setEmoticonid(o);
break;

case 3:
var o = t.readString();
e.setMessage(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINTextEmoticon.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINTextEmoticon.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINTextEmoticon.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeInt32(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
};
proto.BINTextEmoticon.prototype.getUserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINTextEmoticon.prototype.setUserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINTextEmoticon.prototype.clearUserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINTextEmoticon.prototype.hasUserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINTextEmoticon.prototype.getEmoticonid = function() {
return s.Message.getFieldWithDefault(this, 2, 0);
};
proto.BINTextEmoticon.prototype.setEmoticonid = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINTextEmoticon.prototype.clearEmoticonid = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINTextEmoticon.prototype.hasEmoticonid = function() {
return null != s.Message.getField(this, 2);
};
proto.BINTextEmoticon.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINTextEmoticon.prototype.setMessage = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINTextEmoticon.prototype.clearMessage = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINTextEmoticon.prototype.hasMessage = function() {
return null != s.Message.getField(this, 3);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
turn_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2e9delg/pVBsZmxlmvUai+Q", "turn_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./map_field_entry_pb.js");
r.exportSymbol("proto.BINTurnRequest", null, i);
r.exportSymbol("proto.BINTurnResponse", null, i);
proto.BINTurnRequest = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINTurnRequest.repeatedFields_, null);
};
r.inherits(proto.BINTurnRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINTurnRequest.displayName = "proto.BINTurnRequest");
proto.BINTurnRequest.repeatedFields_ = [ 2 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINTurnRequest.prototype.toObject = function(e) {
return proto.BINTurnRequest.toObject(e, this);
};
proto.BINTurnRequest.toObject = function(e, t) {
var o = {
roomindex: s.Message.getField(t, 1),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINTurnRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINTurnRequest();
return proto.BINTurnRequest.deserializeBinaryFromReader(o, t);
};
proto.BINTurnRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setRoomindex(o);
break;

case 2:
var o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINTurnRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINTurnRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINTurnRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(2, t, n.BINMapFieldEntry.serializeBinaryToWriter);
};
proto.BINTurnRequest.prototype.getRoomindex = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINTurnRequest.prototype.setRoomindex = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINTurnRequest.prototype.clearRoomindex = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINTurnRequest.prototype.hasRoomindex = function() {
return null != s.Message.getField(this, 1);
};
proto.BINTurnRequest.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 2);
};
proto.BINTurnRequest.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 2, e);
};
proto.BINTurnRequest.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 2, e, proto.BINMapFieldEntry, t);
};
proto.BINTurnRequest.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINTurnResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINTurnResponse.repeatedFields_, null);
};
r.inherits(proto.BINTurnResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINTurnResponse.displayName = "proto.BINTurnResponse");
proto.BINTurnResponse.repeatedFields_ = [ 7 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINTurnResponse.prototype.toObject = function(e) {
return proto.BINTurnResponse.toObject(e, this);
};
proto.BINTurnResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
currentturnuserid: s.Message.getField(t, 3),
nextturnuserid: s.Message.getField(t, 4),
matchend: s.Message.getField(t, 5),
countdowntimer: s.Message.getField(t, 6),
argsList: s.Message.toObjectList(t.getArgsList(), n.BINMapFieldEntry.toObject, e),
zoneid: s.Message.getField(t, 8)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINTurnResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINTurnResponse();
return proto.BINTurnResponse.deserializeBinaryFromReader(o, t);
};
proto.BINTurnResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readInt64();
e.setCurrentturnuserid(o);
break;

case 4:
o = t.readInt64();
e.setNextturnuserid(o);
break;

case 5:
o = t.readBool();
e.setMatchend(o);
break;

case 6:
o = t.readInt32();
e.setCountdowntimer(o);
break;

case 7:
o = new n.BINMapFieldEntry();
t.readMessage(o, n.BINMapFieldEntry.deserializeBinaryFromReader);
e.addArgs(o);
break;

case 8:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINTurnResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINTurnResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINTurnResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeBool(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt32(6, t);
(t = this.getArgsList()).length > 0 && e.writeRepeatedMessage(7, t, n.BINMapFieldEntry.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 8)) && e.writeInt32(8, t);
};
proto.BINTurnResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINTurnResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINTurnResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINTurnResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINTurnResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINTurnResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINTurnResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINTurnResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINTurnResponse.prototype.getCurrentturnuserid = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINTurnResponse.prototype.setCurrentturnuserid = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINTurnResponse.prototype.clearCurrentturnuserid = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINTurnResponse.prototype.hasCurrentturnuserid = function() {
return null != s.Message.getField(this, 3);
};
proto.BINTurnResponse.prototype.getNextturnuserid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINTurnResponse.prototype.setNextturnuserid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINTurnResponse.prototype.clearNextturnuserid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINTurnResponse.prototype.hasNextturnuserid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINTurnResponse.prototype.getMatchend = function() {
return s.Message.getFieldWithDefault(this, 5, !1);
};
proto.BINTurnResponse.prototype.setMatchend = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINTurnResponse.prototype.clearMatchend = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINTurnResponse.prototype.hasMatchend = function() {
return null != s.Message.getField(this, 5);
};
proto.BINTurnResponse.prototype.getCountdowntimer = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINTurnResponse.prototype.setCountdowntimer = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINTurnResponse.prototype.clearCountdowntimer = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINTurnResponse.prototype.hasCountdowntimer = function() {
return null != s.Message.getField(this, 6);
};
proto.BINTurnResponse.prototype.getArgsList = function() {
return s.Message.getRepeatedWrapperField(this, n.BINMapFieldEntry, 7);
};
proto.BINTurnResponse.prototype.setArgsList = function(e) {
s.Message.setRepeatedWrapperField(this, 7, e);
};
proto.BINTurnResponse.prototype.addArgs = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 7, e, proto.BINMapFieldEntry, t);
};
proto.BINTurnResponse.prototype.clearArgsList = function() {
this.setArgsList([]);
};
proto.BINTurnResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 8, 0);
};
proto.BINTurnResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINTurnResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINTurnResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 8);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./map_field_entry_pb.js": "map_field_entry_pb",
"google-protobuf": "google-protobuf"
} ],
update_money_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "c22374boRJDcqYRTQntSn8/", "update_money_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINMoneyBox", null, i);
r.exportSymbol("proto.BINUpdateMoneyResponse", null, i);
proto.BINMoneyBox = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINMoneyBox, s.Message);
r.DEBUG && !COMPILED && (proto.BINMoneyBox.displayName = "proto.BINMoneyBox");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINMoneyBox.prototype.toObject = function(e) {
return proto.BINMoneyBox.toObject(e, this);
};
proto.BINMoneyBox.toObject = function(e, t) {
var o = {
userid: s.Message.getField(t, 1),
iscash: s.Message.getField(t, 2),
changemoney: s.Message.getField(t, 3),
currentmoney: s.Message.getField(t, 4),
displaychangemoney: s.Message.getField(t, 5),
reason: s.Message.getField(t, 6)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINMoneyBox.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINMoneyBox();
return proto.BINMoneyBox.deserializeBinaryFromReader(o, t);
};
proto.BINMoneyBox.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setUserid(o);
break;

case 2:
o = t.readBool();
e.setIscash(o);
break;

case 3:
o = t.readInt64();
e.setChangemoney(o);
break;

case 4:
o = t.readInt64();
e.setCurrentmoney(o);
break;

case 5:
o = t.readInt64();
e.setDisplaychangemoney(o);
break;

case 6:
var o = t.readString();
e.setReason(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINMoneyBox.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINMoneyBox.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINMoneyBox.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeBool(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeInt64(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt64(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt64(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeString(6, t);
};
proto.BINMoneyBox.prototype.getUserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINMoneyBox.prototype.setUserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINMoneyBox.prototype.clearUserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINMoneyBox.prototype.hasUserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINMoneyBox.prototype.getIscash = function() {
return s.Message.getFieldWithDefault(this, 2, !1);
};
proto.BINMoneyBox.prototype.setIscash = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINMoneyBox.prototype.clearIscash = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINMoneyBox.prototype.hasIscash = function() {
return null != s.Message.getField(this, 2);
};
proto.BINMoneyBox.prototype.getChangemoney = function() {
return s.Message.getFieldWithDefault(this, 3, 0);
};
proto.BINMoneyBox.prototype.setChangemoney = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINMoneyBox.prototype.clearChangemoney = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINMoneyBox.prototype.hasChangemoney = function() {
return null != s.Message.getField(this, 3);
};
proto.BINMoneyBox.prototype.getCurrentmoney = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINMoneyBox.prototype.setCurrentmoney = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINMoneyBox.prototype.clearCurrentmoney = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINMoneyBox.prototype.hasCurrentmoney = function() {
return null != s.Message.getField(this, 4);
};
proto.BINMoneyBox.prototype.getDisplaychangemoney = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINMoneyBox.prototype.setDisplaychangemoney = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINMoneyBox.prototype.clearDisplaychangemoney = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINMoneyBox.prototype.hasDisplaychangemoney = function() {
return null != s.Message.getField(this, 5);
};
proto.BINMoneyBox.prototype.getReason = function() {
return s.Message.getFieldWithDefault(this, 6, "");
};
proto.BINMoneyBox.prototype.setReason = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINMoneyBox.prototype.clearReason = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINMoneyBox.prototype.hasReason = function() {
return null != s.Message.getField(this, 6);
};
proto.BINUpdateMoneyResponse = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINUpdateMoneyResponse.repeatedFields_, null);
};
r.inherits(proto.BINUpdateMoneyResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINUpdateMoneyResponse.displayName = "proto.BINUpdateMoneyResponse");
proto.BINUpdateMoneyResponse.repeatedFields_ = [ 3 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINUpdateMoneyResponse.prototype.toObject = function(e) {
return proto.BINUpdateMoneyResponse.toObject(e, this);
};
proto.BINUpdateMoneyResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
moneyboxesList: s.Message.toObjectList(t.getMoneyboxesList(), proto.BINMoneyBox.toObject, e),
zoneid: s.Message.getField(t, 4)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINUpdateMoneyResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINUpdateMoneyResponse();
return proto.BINUpdateMoneyResponse.deserializeBinaryFromReader(o, t);
};
proto.BINUpdateMoneyResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = new proto.BINMoneyBox();
t.readMessage(o, proto.BINMoneyBox.deserializeBinaryFromReader);
e.addMoneyboxes(o);
break;

case 4:
var o = t.readInt32();
e.setZoneid(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINUpdateMoneyResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINUpdateMoneyResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINUpdateMoneyResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
(t = this.getMoneyboxesList()).length > 0 && e.writeRepeatedMessage(3, t, proto.BINMoneyBox.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
};
proto.BINUpdateMoneyResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINUpdateMoneyResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINUpdateMoneyResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINUpdateMoneyResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINUpdateMoneyResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINUpdateMoneyResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINUpdateMoneyResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINUpdateMoneyResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINUpdateMoneyResponse.prototype.getMoneyboxesList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINMoneyBox, 3);
};
proto.BINUpdateMoneyResponse.prototype.setMoneyboxesList = function(e) {
s.Message.setRepeatedWrapperField(this, 3, e);
};
proto.BINUpdateMoneyResponse.prototype.addMoneyboxes = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 3, e, proto.BINMoneyBox, t);
};
proto.BINUpdateMoneyResponse.prototype.clearMoneyboxesList = function() {
this.setMoneyboxesList([]);
};
proto.BINUpdateMoneyResponse.prototype.getZoneid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINUpdateMoneyResponse.prototype.setZoneid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINUpdateMoneyResponse.prototype.clearZoneid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINUpdateMoneyResponse.prototype.hasZoneid = function() {
return null != s.Message.getField(this, 4);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
update_user_info_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "49007zKWaZMGoNRoluLR4k3", "update_user_info_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINEditingInfo", null, i);
r.exportSymbol("proto.BINUpdateUserInfoRequest", null, i);
r.exportSymbol("proto.BINUpdateUserInfoResponse", null, i);
proto.BINEditingInfo = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINEditingInfo, s.Message);
r.DEBUG && !COMPILED && (proto.BINEditingInfo.displayName = "proto.BINEditingInfo");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINEditingInfo.prototype.toObject = function(e) {
return proto.BINEditingInfo.toObject(e, this);
};
proto.BINEditingInfo.toObject = function(e, t) {
var o = {
infofield: s.Message.getField(t, 1),
oldvalue: s.Message.getField(t, 2),
newvalue: s.Message.getField(t, 3),
confirmvalue: s.Message.getField(t, 4)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINEditingInfo.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINEditingInfo();
return proto.BINEditingInfo.deserializeBinaryFromReader(o, t);
};
proto.BINEditingInfo.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt32();
e.setInfofield(o);
break;

case 2:
o = t.readString();
e.setOldvalue(o);
break;

case 3:
o = t.readString();
e.setNewvalue(o);
break;

case 4:
var o = t.readString();
e.setConfirmvalue(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINEditingInfo.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINEditingInfo.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINEditingInfo.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
};
proto.BINEditingInfo.prototype.getInfofield = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINEditingInfo.prototype.setInfofield = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINEditingInfo.prototype.clearInfofield = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINEditingInfo.prototype.hasInfofield = function() {
return null != s.Message.getField(this, 1);
};
proto.BINEditingInfo.prototype.getOldvalue = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINEditingInfo.prototype.setOldvalue = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINEditingInfo.prototype.clearOldvalue = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINEditingInfo.prototype.hasOldvalue = function() {
return null != s.Message.getField(this, 2);
};
proto.BINEditingInfo.prototype.getNewvalue = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINEditingInfo.prototype.setNewvalue = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINEditingInfo.prototype.clearNewvalue = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINEditingInfo.prototype.hasNewvalue = function() {
return null != s.Message.getField(this, 3);
};
proto.BINEditingInfo.prototype.getConfirmvalue = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINEditingInfo.prototype.setConfirmvalue = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINEditingInfo.prototype.clearConfirmvalue = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINEditingInfo.prototype.hasConfirmvalue = function() {
return null != s.Message.getField(this, 4);
};
proto.BINUpdateUserInfoRequest = function(e) {
s.Message.initialize(this, e, 0, -1, proto.BINUpdateUserInfoRequest.repeatedFields_, null);
};
r.inherits(proto.BINUpdateUserInfoRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINUpdateUserInfoRequest.displayName = "proto.BINUpdateUserInfoRequest");
proto.BINUpdateUserInfoRequest.repeatedFields_ = [ 1 ];
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINUpdateUserInfoRequest.prototype.toObject = function(e) {
return proto.BINUpdateUserInfoRequest.toObject(e, this);
};
proto.BINUpdateUserInfoRequest.toObject = function(e, t) {
var o = {
userinfosList: s.Message.toObjectList(t.getUserinfosList(), proto.BINEditingInfo.toObject, e)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINUpdateUserInfoRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINUpdateUserInfoRequest();
return proto.BINUpdateUserInfoRequest.deserializeBinaryFromReader(o, t);
};
proto.BINUpdateUserInfoRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = new proto.BINEditingInfo();
t.readMessage(o, proto.BINEditingInfo.deserializeBinaryFromReader);
e.addUserinfos(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINUpdateUserInfoRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINUpdateUserInfoRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINUpdateUserInfoRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
(t = this.getUserinfosList()).length > 0 && e.writeRepeatedMessage(1, t, proto.BINEditingInfo.serializeBinaryToWriter);
};
proto.BINUpdateUserInfoRequest.prototype.getUserinfosList = function() {
return s.Message.getRepeatedWrapperField(this, proto.BINEditingInfo, 1);
};
proto.BINUpdateUserInfoRequest.prototype.setUserinfosList = function(e) {
s.Message.setRepeatedWrapperField(this, 1, e);
};
proto.BINUpdateUserInfoRequest.prototype.addUserinfos = function(e, t) {
return s.Message.addToRepeatedWrapperField(this, 1, e, proto.BINEditingInfo, t);
};
proto.BINUpdateUserInfoRequest.prototype.clearUserinfosList = function() {
this.setUserinfosList([]);
};
proto.BINUpdateUserInfoResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINUpdateUserInfoResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINUpdateUserInfoResponse.displayName = "proto.BINUpdateUserInfoResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINUpdateUserInfoResponse.prototype.toObject = function(e) {
return proto.BINUpdateUserInfoResponse.toObject(e, this);
};
proto.BINUpdateUserInfoResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINUpdateUserInfoResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINUpdateUserInfoResponse();
return proto.BINUpdateUserInfoResponse.deserializeBinaryFromReader(o, t);
};
proto.BINUpdateUserInfoResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
var o = t.readString();
e.setMessage(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINUpdateUserInfoResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINUpdateUserInfoResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINUpdateUserInfoResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
};
proto.BINUpdateUserInfoResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINUpdateUserInfoResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINUpdateUserInfoResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINUpdateUserInfoResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINUpdateUserInfoResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINUpdateUserInfoResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINUpdateUserInfoResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINUpdateUserInfoResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
user_info_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "f09aep2cblFwYv5I9oyg6+t", "user_info_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")(), n = e("./level_pb.js");
r.exportSymbol("proto.BINUserInfo", null, i);
r.exportSymbol("proto.BINUserSetting", null, i);
proto.BINUserInfo = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINUserInfo, s.Message);
r.DEBUG && !COMPILED && (proto.BINUserInfo.displayName = "proto.BINUserInfo");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINUserInfo.prototype.toObject = function(e) {
return proto.BINUserInfo.toObject(e, this);
};
proto.BINUserInfo.toObject = function(e, t) {
var o, r = {
userid: s.Message.getField(t, 1),
username: s.Message.getField(t, 2),
displayname: s.Message.getField(t, 3),
avatarid: s.Message.getField(t, 4),
sex: s.Message.getField(t, 5),
age: s.Message.getField(t, 6),
level: (o = t.getLevel()) && n.BINLevel.toObject(e, o),
medal: (o = t.getMedal()) && n.BINMedal.toObject(e, o),
trustedindex: s.Message.getField(t, 9),
exp: s.Message.getField(t, 10),
cash: s.Message.getField(t, 11),
gold: s.Message.getField(t, 12),
totalmatch: s.Message.getField(t, 13),
totalwin: s.Message.getField(t, 14),
totalcashexchanged: s.Message.getField(t, 15),
totalmoneyexchanged: s.Message.getField(t, 16),
totalmoneycharged: s.Message.getField(t, 17),
lastlogintime: s.Message.getField(t, 18),
isonline: s.Message.getField(t, 19),
usertype: s.Message.getField(t, 20),
email: s.Message.getField(t, 21),
mobile: s.Message.getField(t, 22),
identity: s.Message.getField(t, 23),
accountverified: s.Message.getField(t, 24),
disablecashtransaction: s.Message.getField(t, 25),
securitykeyset: s.Message.getField(t, 26),
cashlock: s.Message.getField(t, 27),
goldlock: s.Message.getField(t, 28),
viplevel: (o = t.getViplevel()) && n.BINVipLevel.toObject(e, o),
vippoint: s.Message.getField(t, 30),
remoteip: s.Message.getField(t, 31)
};
e && (r.$jspbMessageInstance = t);
return r;
};
}
proto.BINUserInfo.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINUserInfo();
return proto.BINUserInfo.deserializeBinaryFromReader(o, t);
};
proto.BINUserInfo.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setUserid(o);
break;

case 2:
o = t.readString();
e.setUsername(o);
break;

case 3:
o = t.readString();
e.setDisplayname(o);
break;

case 4:
o = t.readInt32();
e.setAvatarid(o);
break;

case 5:
o = t.readInt32();
e.setSex(o);
break;

case 6:
o = t.readInt32();
e.setAge(o);
break;

case 7:
o = new n.BINLevel();
t.readMessage(o, n.BINLevel.deserializeBinaryFromReader);
e.setLevel(o);
break;

case 8:
o = new n.BINMedal();
t.readMessage(o, n.BINMedal.deserializeBinaryFromReader);
e.setMedal(o);
break;

case 9:
o = t.readInt64();
e.setTrustedindex(o);
break;

case 10:
o = t.readInt64();
e.setExp(o);
break;

case 11:
o = t.readInt64();
e.setCash(o);
break;

case 12:
o = t.readInt64();
e.setGold(o);
break;

case 13:
o = t.readInt32();
e.setTotalmatch(o);
break;

case 14:
o = t.readInt32();
e.setTotalwin(o);
break;

case 15:
o = t.readInt64();
e.setTotalcashexchanged(o);
break;

case 16:
o = t.readInt64();
e.setTotalmoneyexchanged(o);
break;

case 17:
o = t.readInt64();
e.setTotalmoneycharged(o);
break;

case 18:
o = t.readInt64();
e.setLastlogintime(o);
break;

case 19:
o = t.readBool();
e.setIsonline(o);
break;

case 20:
o = t.readInt32();
e.setUsertype(o);
break;

case 21:
o = t.readString();
e.setEmail(o);
break;

case 22:
o = t.readString();
e.setMobile(o);
break;

case 23:
o = t.readString();
e.setIdentity(o);
break;

case 24:
o = t.readBool();
e.setAccountverified(o);
break;

case 25:
o = t.readBool();
e.setDisablecashtransaction(o);
break;

case 26:
o = t.readBool();
e.setSecuritykeyset(o);
break;

case 27:
o = t.readInt64();
e.setCashlock(o);
break;

case 28:
o = t.readInt64();
e.setGoldlock(o);
break;

case 29:
o = new n.BINVipLevel();
t.readMessage(o, n.BINVipLevel.deserializeBinaryFromReader);
e.setViplevel(o);
break;

case 30:
o = t.readInt64();
e.setVippoint(o);
break;

case 31:
var o = t.readString();
e.setRemoteip(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINUserInfo.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINUserInfo.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINUserInfo.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeString(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeInt32(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeInt32(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeInt32(6, t);
null != (t = this.getLevel()) && e.writeMessage(7, t, n.BINLevel.serializeBinaryToWriter);
null != (t = this.getMedal()) && e.writeMessage(8, t, n.BINMedal.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 9)) && e.writeInt64(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeInt64(10, t);
null != (t = s.Message.getField(this, 11)) && e.writeInt64(11, t);
null != (t = s.Message.getField(this, 12)) && e.writeInt64(12, t);
null != (t = s.Message.getField(this, 13)) && e.writeInt32(13, t);
null != (t = s.Message.getField(this, 14)) && e.writeInt32(14, t);
null != (t = s.Message.getField(this, 15)) && e.writeInt64(15, t);
null != (t = s.Message.getField(this, 16)) && e.writeInt64(16, t);
null != (t = s.Message.getField(this, 17)) && e.writeInt64(17, t);
null != (t = s.Message.getField(this, 18)) && e.writeInt64(18, t);
null != (t = s.Message.getField(this, 19)) && e.writeBool(19, t);
null != (t = s.Message.getField(this, 20)) && e.writeInt32(20, t);
null != (t = s.Message.getField(this, 21)) && e.writeString(21, t);
null != (t = s.Message.getField(this, 22)) && e.writeString(22, t);
null != (t = s.Message.getField(this, 23)) && e.writeString(23, t);
null != (t = s.Message.getField(this, 24)) && e.writeBool(24, t);
null != (t = s.Message.getField(this, 25)) && e.writeBool(25, t);
null != (t = s.Message.getField(this, 26)) && e.writeBool(26, t);
null != (t = s.Message.getField(this, 27)) && e.writeInt64(27, t);
null != (t = s.Message.getField(this, 28)) && e.writeInt64(28, t);
null != (t = this.getViplevel()) && e.writeMessage(29, t, n.BINVipLevel.serializeBinaryToWriter);
null != (t = s.Message.getField(this, 30)) && e.writeInt64(30, t);
null != (t = s.Message.getField(this, 31)) && e.writeString(31, t);
};
proto.BINUserInfo.prototype.getUserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINUserInfo.prototype.setUserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINUserInfo.prototype.clearUserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINUserInfo.prototype.hasUserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINUserInfo.prototype.getUsername = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINUserInfo.prototype.setUsername = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINUserInfo.prototype.clearUsername = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINUserInfo.prototype.hasUsername = function() {
return null != s.Message.getField(this, 2);
};
proto.BINUserInfo.prototype.getDisplayname = function() {
return s.Message.getFieldWithDefault(this, 3, "");
};
proto.BINUserInfo.prototype.setDisplayname = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINUserInfo.prototype.clearDisplayname = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINUserInfo.prototype.hasDisplayname = function() {
return null != s.Message.getField(this, 3);
};
proto.BINUserInfo.prototype.getAvatarid = function() {
return s.Message.getFieldWithDefault(this, 4, 0);
};
proto.BINUserInfo.prototype.setAvatarid = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINUserInfo.prototype.clearAvatarid = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINUserInfo.prototype.hasAvatarid = function() {
return null != s.Message.getField(this, 4);
};
proto.BINUserInfo.prototype.getSex = function() {
return s.Message.getFieldWithDefault(this, 5, 0);
};
proto.BINUserInfo.prototype.setSex = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINUserInfo.prototype.clearSex = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINUserInfo.prototype.hasSex = function() {
return null != s.Message.getField(this, 5);
};
proto.BINUserInfo.prototype.getAge = function() {
return s.Message.getFieldWithDefault(this, 6, 0);
};
proto.BINUserInfo.prototype.setAge = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINUserInfo.prototype.clearAge = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINUserInfo.prototype.hasAge = function() {
return null != s.Message.getField(this, 6);
};
proto.BINUserInfo.prototype.getLevel = function() {
return s.Message.getWrapperField(this, n.BINLevel, 7);
};
proto.BINUserInfo.prototype.setLevel = function(e) {
s.Message.setWrapperField(this, 7, e);
};
proto.BINUserInfo.prototype.clearLevel = function() {
this.setLevel(void 0);
};
proto.BINUserInfo.prototype.hasLevel = function() {
return null != s.Message.getField(this, 7);
};
proto.BINUserInfo.prototype.getMedal = function() {
return s.Message.getWrapperField(this, n.BINMedal, 8);
};
proto.BINUserInfo.prototype.setMedal = function(e) {
s.Message.setWrapperField(this, 8, e);
};
proto.BINUserInfo.prototype.clearMedal = function() {
this.setMedal(void 0);
};
proto.BINUserInfo.prototype.hasMedal = function() {
return null != s.Message.getField(this, 8);
};
proto.BINUserInfo.prototype.getTrustedindex = function() {
return s.Message.getFieldWithDefault(this, 9, 0);
};
proto.BINUserInfo.prototype.setTrustedindex = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINUserInfo.prototype.clearTrustedindex = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINUserInfo.prototype.hasTrustedindex = function() {
return null != s.Message.getField(this, 9);
};
proto.BINUserInfo.prototype.getExp = function() {
return s.Message.getFieldWithDefault(this, 10, 0);
};
proto.BINUserInfo.prototype.setExp = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINUserInfo.prototype.clearExp = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINUserInfo.prototype.hasExp = function() {
return null != s.Message.getField(this, 10);
};
proto.BINUserInfo.prototype.getCash = function() {
return s.Message.getFieldWithDefault(this, 11, 0);
};
proto.BINUserInfo.prototype.setCash = function(e) {
s.Message.setField(this, 11, e);
};
proto.BINUserInfo.prototype.clearCash = function() {
s.Message.setField(this, 11, void 0);
};
proto.BINUserInfo.prototype.hasCash = function() {
return null != s.Message.getField(this, 11);
};
proto.BINUserInfo.prototype.getGold = function() {
return s.Message.getFieldWithDefault(this, 12, 0);
};
proto.BINUserInfo.prototype.setGold = function(e) {
s.Message.setField(this, 12, e);
};
proto.BINUserInfo.prototype.clearGold = function() {
s.Message.setField(this, 12, void 0);
};
proto.BINUserInfo.prototype.hasGold = function() {
return null != s.Message.getField(this, 12);
};
proto.BINUserInfo.prototype.getTotalmatch = function() {
return s.Message.getFieldWithDefault(this, 13, 0);
};
proto.BINUserInfo.prototype.setTotalmatch = function(e) {
s.Message.setField(this, 13, e);
};
proto.BINUserInfo.prototype.clearTotalmatch = function() {
s.Message.setField(this, 13, void 0);
};
proto.BINUserInfo.prototype.hasTotalmatch = function() {
return null != s.Message.getField(this, 13);
};
proto.BINUserInfo.prototype.getTotalwin = function() {
return s.Message.getFieldWithDefault(this, 14, 0);
};
proto.BINUserInfo.prototype.setTotalwin = function(e) {
s.Message.setField(this, 14, e);
};
proto.BINUserInfo.prototype.clearTotalwin = function() {
s.Message.setField(this, 14, void 0);
};
proto.BINUserInfo.prototype.hasTotalwin = function() {
return null != s.Message.getField(this, 14);
};
proto.BINUserInfo.prototype.getTotalcashexchanged = function() {
return s.Message.getFieldWithDefault(this, 15, 0);
};
proto.BINUserInfo.prototype.setTotalcashexchanged = function(e) {
s.Message.setField(this, 15, e);
};
proto.BINUserInfo.prototype.clearTotalcashexchanged = function() {
s.Message.setField(this, 15, void 0);
};
proto.BINUserInfo.prototype.hasTotalcashexchanged = function() {
return null != s.Message.getField(this, 15);
};
proto.BINUserInfo.prototype.getTotalmoneyexchanged = function() {
return s.Message.getFieldWithDefault(this, 16, 0);
};
proto.BINUserInfo.prototype.setTotalmoneyexchanged = function(e) {
s.Message.setField(this, 16, e);
};
proto.BINUserInfo.prototype.clearTotalmoneyexchanged = function() {
s.Message.setField(this, 16, void 0);
};
proto.BINUserInfo.prototype.hasTotalmoneyexchanged = function() {
return null != s.Message.getField(this, 16);
};
proto.BINUserInfo.prototype.getTotalmoneycharged = function() {
return s.Message.getFieldWithDefault(this, 17, 0);
};
proto.BINUserInfo.prototype.setTotalmoneycharged = function(e) {
s.Message.setField(this, 17, e);
};
proto.BINUserInfo.prototype.clearTotalmoneycharged = function() {
s.Message.setField(this, 17, void 0);
};
proto.BINUserInfo.prototype.hasTotalmoneycharged = function() {
return null != s.Message.getField(this, 17);
};
proto.BINUserInfo.prototype.getLastlogintime = function() {
return s.Message.getFieldWithDefault(this, 18, 0);
};
proto.BINUserInfo.prototype.setLastlogintime = function(e) {
s.Message.setField(this, 18, e);
};
proto.BINUserInfo.prototype.clearLastlogintime = function() {
s.Message.setField(this, 18, void 0);
};
proto.BINUserInfo.prototype.hasLastlogintime = function() {
return null != s.Message.getField(this, 18);
};
proto.BINUserInfo.prototype.getIsonline = function() {
return s.Message.getFieldWithDefault(this, 19, !1);
};
proto.BINUserInfo.prototype.setIsonline = function(e) {
s.Message.setField(this, 19, e);
};
proto.BINUserInfo.prototype.clearIsonline = function() {
s.Message.setField(this, 19, void 0);
};
proto.BINUserInfo.prototype.hasIsonline = function() {
return null != s.Message.getField(this, 19);
};
proto.BINUserInfo.prototype.getUsertype = function() {
return s.Message.getFieldWithDefault(this, 20, 0);
};
proto.BINUserInfo.prototype.setUsertype = function(e) {
s.Message.setField(this, 20, e);
};
proto.BINUserInfo.prototype.clearUsertype = function() {
s.Message.setField(this, 20, void 0);
};
proto.BINUserInfo.prototype.hasUsertype = function() {
return null != s.Message.getField(this, 20);
};
proto.BINUserInfo.prototype.getEmail = function() {
return s.Message.getFieldWithDefault(this, 21, "");
};
proto.BINUserInfo.prototype.setEmail = function(e) {
s.Message.setField(this, 21, e);
};
proto.BINUserInfo.prototype.clearEmail = function() {
s.Message.setField(this, 21, void 0);
};
proto.BINUserInfo.prototype.hasEmail = function() {
return null != s.Message.getField(this, 21);
};
proto.BINUserInfo.prototype.getMobile = function() {
return s.Message.getFieldWithDefault(this, 22, "");
};
proto.BINUserInfo.prototype.setMobile = function(e) {
s.Message.setField(this, 22, e);
};
proto.BINUserInfo.prototype.clearMobile = function() {
s.Message.setField(this, 22, void 0);
};
proto.BINUserInfo.prototype.hasMobile = function() {
return null != s.Message.getField(this, 22);
};
proto.BINUserInfo.prototype.getIdentity = function() {
return s.Message.getFieldWithDefault(this, 23, "");
};
proto.BINUserInfo.prototype.setIdentity = function(e) {
s.Message.setField(this, 23, e);
};
proto.BINUserInfo.prototype.clearIdentity = function() {
s.Message.setField(this, 23, void 0);
};
proto.BINUserInfo.prototype.hasIdentity = function() {
return null != s.Message.getField(this, 23);
};
proto.BINUserInfo.prototype.getAccountverified = function() {
return s.Message.getFieldWithDefault(this, 24, !1);
};
proto.BINUserInfo.prototype.setAccountverified = function(e) {
s.Message.setField(this, 24, e);
};
proto.BINUserInfo.prototype.clearAccountverified = function() {
s.Message.setField(this, 24, void 0);
};
proto.BINUserInfo.prototype.hasAccountverified = function() {
return null != s.Message.getField(this, 24);
};
proto.BINUserInfo.prototype.getDisablecashtransaction = function() {
return s.Message.getFieldWithDefault(this, 25, !1);
};
proto.BINUserInfo.prototype.setDisablecashtransaction = function(e) {
s.Message.setField(this, 25, e);
};
proto.BINUserInfo.prototype.clearDisablecashtransaction = function() {
s.Message.setField(this, 25, void 0);
};
proto.BINUserInfo.prototype.hasDisablecashtransaction = function() {
return null != s.Message.getField(this, 25);
};
proto.BINUserInfo.prototype.getSecuritykeyset = function() {
return s.Message.getFieldWithDefault(this, 26, !1);
};
proto.BINUserInfo.prototype.setSecuritykeyset = function(e) {
s.Message.setField(this, 26, e);
};
proto.BINUserInfo.prototype.clearSecuritykeyset = function() {
s.Message.setField(this, 26, void 0);
};
proto.BINUserInfo.prototype.hasSecuritykeyset = function() {
return null != s.Message.getField(this, 26);
};
proto.BINUserInfo.prototype.getCashlock = function() {
return s.Message.getFieldWithDefault(this, 27, 0);
};
proto.BINUserInfo.prototype.setCashlock = function(e) {
s.Message.setField(this, 27, e);
};
proto.BINUserInfo.prototype.clearCashlock = function() {
s.Message.setField(this, 27, void 0);
};
proto.BINUserInfo.prototype.hasCashlock = function() {
return null != s.Message.getField(this, 27);
};
proto.BINUserInfo.prototype.getGoldlock = function() {
return s.Message.getFieldWithDefault(this, 28, 0);
};
proto.BINUserInfo.prototype.setGoldlock = function(e) {
s.Message.setField(this, 28, e);
};
proto.BINUserInfo.prototype.clearGoldlock = function() {
s.Message.setField(this, 28, void 0);
};
proto.BINUserInfo.prototype.hasGoldlock = function() {
return null != s.Message.getField(this, 28);
};
proto.BINUserInfo.prototype.getViplevel = function() {
return s.Message.getWrapperField(this, n.BINVipLevel, 29);
};
proto.BINUserInfo.prototype.setViplevel = function(e) {
s.Message.setWrapperField(this, 29, e);
};
proto.BINUserInfo.prototype.clearViplevel = function() {
this.setViplevel(void 0);
};
proto.BINUserInfo.prototype.hasViplevel = function() {
return null != s.Message.getField(this, 29);
};
proto.BINUserInfo.prototype.getVippoint = function() {
return s.Message.getFieldWithDefault(this, 30, 0);
};
proto.BINUserInfo.prototype.setVippoint = function(e) {
s.Message.setField(this, 30, e);
};
proto.BINUserInfo.prototype.clearVippoint = function() {
s.Message.setField(this, 30, void 0);
};
proto.BINUserInfo.prototype.hasVippoint = function() {
return null != s.Message.getField(this, 30);
};
proto.BINUserInfo.prototype.getRemoteip = function() {
return s.Message.getFieldWithDefault(this, 31, "");
};
proto.BINUserInfo.prototype.setRemoteip = function(e) {
s.Message.setField(this, 31, e);
};
proto.BINUserInfo.prototype.clearRemoteip = function() {
s.Message.setField(this, 31, void 0);
};
proto.BINUserInfo.prototype.hasRemoteip = function() {
return null != s.Message.getField(this, 31);
};
proto.BINUserSetting = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINUserSetting, s.Message);
r.DEBUG && !COMPILED && (proto.BINUserSetting.displayName = "proto.BINUserSetting");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINUserSetting.prototype.toObject = function(e) {
return proto.BINUserSetting.toObject(e, this);
};
proto.BINUserSetting.toObject = function(e, t) {
var o = {
userid: s.Message.getField(t, 1),
autoready: s.Message.getField(t, 2),
autodenyinvitation: s.Message.getField(t, 3)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINUserSetting.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINUserSetting();
return proto.BINUserSetting.deserializeBinaryFromReader(o, t);
};
proto.BINUserSetting.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readInt64();
e.setUserid(o);
break;

case 2:
o = t.readBool();
e.setAutoready(o);
break;

case 3:
var o = t.readBool();
e.setAutodenyinvitation(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINUserSetting.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINUserSetting.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINUserSetting.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt64(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeBool(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeBool(3, t);
};
proto.BINUserSetting.prototype.getUserid = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINUserSetting.prototype.setUserid = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINUserSetting.prototype.clearUserid = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINUserSetting.prototype.hasUserid = function() {
return null != s.Message.getField(this, 1);
};
proto.BINUserSetting.prototype.getAutoready = function() {
return s.Message.getFieldWithDefault(this, 2, !1);
};
proto.BINUserSetting.prototype.setAutoready = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINUserSetting.prototype.clearAutoready = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINUserSetting.prototype.hasAutoready = function() {
return null != s.Message.getField(this, 2);
};
proto.BINUserSetting.prototype.getAutodenyinvitation = function() {
return s.Message.getFieldWithDefault(this, 3, !1);
};
proto.BINUserSetting.prototype.setAutodenyinvitation = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINUserSetting.prototype.clearAutodenyinvitation = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINUserSetting.prototype.hasAutodenyinvitation = function() {
return null != s.Message.getField(this, 3);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"./level_pb.js": "level_pb",
"google-protobuf": "google-protobuf"
} ],
verify_pb: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "637b5jM3iBBw6wV8cyyOaM1", "verify_pb");
var s = e("google-protobuf"), r = s, i = Function("return this")();
r.exportSymbol("proto.BINUserVerifyConfigRequest", null, i);
r.exportSymbol("proto.BINUserVerifyConfigResponse", null, i);
r.exportSymbol("proto.BINUserVerifyRequest", null, i);
r.exportSymbol("proto.BINUserVerifyResponse", null, i);
proto.BINUserVerifyConfigRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINUserVerifyConfigRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINUserVerifyConfigRequest.displayName = "proto.BINUserVerifyConfigRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINUserVerifyConfigRequest.prototype.toObject = function(e) {
return proto.BINUserVerifyConfigRequest.toObject(e, this);
};
proto.BINUserVerifyConfigRequest.toObject = function(e, t) {
var o = {
type: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINUserVerifyConfigRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINUserVerifyConfigRequest();
return proto.BINUserVerifyConfigRequest.deserializeBinaryFromReader(o, t);
};
proto.BINUserVerifyConfigRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readInt32();
e.setType(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINUserVerifyConfigRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINUserVerifyConfigRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINUserVerifyConfigRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeInt32(1, t);
};
proto.BINUserVerifyConfigRequest.prototype.getType = function() {
return s.Message.getFieldWithDefault(this, 1, 0);
};
proto.BINUserVerifyConfigRequest.prototype.setType = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINUserVerifyConfigRequest.prototype.clearType = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINUserVerifyConfigRequest.prototype.hasType = function() {
return null != s.Message.getField(this, 1);
};
proto.BINUserVerifyConfigResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINUserVerifyConfigResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINUserVerifyConfigResponse.displayName = "proto.BINUserVerifyConfigResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINUserVerifyConfigResponse.prototype.toObject = function(e) {
return proto.BINUserVerifyConfigResponse.toObject(e, this);
};
proto.BINUserVerifyConfigResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
userverified: s.Message.getField(t, 3),
verifiedphone: s.Message.getField(t, 4),
verifiedemail: s.Message.getField(t, 5),
verifiedsmssyntax: s.Message.getField(t, 6),
verifiedsmsnumber: s.Message.getField(t, 7),
verifiedsmscost: s.Message.getField(t, 8),
verifiedreward: s.Message.getField(t, 9),
unverifysmssyntax: s.Message.getField(t, 10),
unverifysmsnumber: s.Message.getField(t, 11),
unverifiedsmscost: s.Message.getField(t, 12)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINUserVerifyConfigResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINUserVerifyConfigResponse();
return proto.BINUserVerifyConfigResponse.deserializeBinaryFromReader(o, t);
};
proto.BINUserVerifyConfigResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readBool();
e.setUserverified(o);
break;

case 4:
o = t.readString();
e.setVerifiedphone(o);
break;

case 5:
o = t.readString();
e.setVerifiedemail(o);
break;

case 6:
o = t.readString();
e.setVerifiedsmssyntax(o);
break;

case 7:
o = t.readString();
e.setVerifiedsmsnumber(o);
break;

case 8:
o = t.readInt32();
e.setVerifiedsmscost(o);
break;

case 9:
o = t.readInt32();
e.setVerifiedreward(o);
break;

case 10:
o = t.readString();
e.setUnverifysmssyntax(o);
break;

case 11:
o = t.readString();
e.setUnverifysmsnumber(o);
break;

case 12:
var o = t.readInt32();
e.setUnverifiedsmscost(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINUserVerifyConfigResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINUserVerifyConfigResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINUserVerifyConfigResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeBool(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
null != (t = s.Message.getField(this, 6)) && e.writeString(6, t);
null != (t = s.Message.getField(this, 7)) && e.writeString(7, t);
null != (t = s.Message.getField(this, 8)) && e.writeInt32(8, t);
null != (t = s.Message.getField(this, 9)) && e.writeInt32(9, t);
null != (t = s.Message.getField(this, 10)) && e.writeString(10, t);
null != (t = s.Message.getField(this, 11)) && e.writeString(11, t);
null != (t = s.Message.getField(this, 12)) && e.writeInt32(12, t);
};
proto.BINUserVerifyConfigResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINUserVerifyConfigResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINUserVerifyConfigResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINUserVerifyConfigResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINUserVerifyConfigResponse.prototype.getUserverified = function() {
return s.Message.getFieldWithDefault(this, 3, !1);
};
proto.BINUserVerifyConfigResponse.prototype.setUserverified = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearUserverified = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasUserverified = function() {
return null != s.Message.getField(this, 3);
};
proto.BINUserVerifyConfigResponse.prototype.getVerifiedphone = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINUserVerifyConfigResponse.prototype.setVerifiedphone = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearVerifiedphone = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasVerifiedphone = function() {
return null != s.Message.getField(this, 4);
};
proto.BINUserVerifyConfigResponse.prototype.getVerifiedemail = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINUserVerifyConfigResponse.prototype.setVerifiedemail = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearVerifiedemail = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasVerifiedemail = function() {
return null != s.Message.getField(this, 5);
};
proto.BINUserVerifyConfigResponse.prototype.getVerifiedsmssyntax = function() {
return s.Message.getFieldWithDefault(this, 6, "");
};
proto.BINUserVerifyConfigResponse.prototype.setVerifiedsmssyntax = function(e) {
s.Message.setField(this, 6, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearVerifiedsmssyntax = function() {
s.Message.setField(this, 6, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasVerifiedsmssyntax = function() {
return null != s.Message.getField(this, 6);
};
proto.BINUserVerifyConfigResponse.prototype.getVerifiedsmsnumber = function() {
return s.Message.getFieldWithDefault(this, 7, "");
};
proto.BINUserVerifyConfigResponse.prototype.setVerifiedsmsnumber = function(e) {
s.Message.setField(this, 7, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearVerifiedsmsnumber = function() {
s.Message.setField(this, 7, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasVerifiedsmsnumber = function() {
return null != s.Message.getField(this, 7);
};
proto.BINUserVerifyConfigResponse.prototype.getVerifiedsmscost = function() {
return s.Message.getFieldWithDefault(this, 8, 0);
};
proto.BINUserVerifyConfigResponse.prototype.setVerifiedsmscost = function(e) {
s.Message.setField(this, 8, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearVerifiedsmscost = function() {
s.Message.setField(this, 8, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasVerifiedsmscost = function() {
return null != s.Message.getField(this, 8);
};
proto.BINUserVerifyConfigResponse.prototype.getVerifiedreward = function() {
return s.Message.getFieldWithDefault(this, 9, 0);
};
proto.BINUserVerifyConfigResponse.prototype.setVerifiedreward = function(e) {
s.Message.setField(this, 9, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearVerifiedreward = function() {
s.Message.setField(this, 9, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasVerifiedreward = function() {
return null != s.Message.getField(this, 9);
};
proto.BINUserVerifyConfigResponse.prototype.getUnverifysmssyntax = function() {
return s.Message.getFieldWithDefault(this, 10, "");
};
proto.BINUserVerifyConfigResponse.prototype.setUnverifysmssyntax = function(e) {
s.Message.setField(this, 10, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearUnverifysmssyntax = function() {
s.Message.setField(this, 10, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasUnverifysmssyntax = function() {
return null != s.Message.getField(this, 10);
};
proto.BINUserVerifyConfigResponse.prototype.getUnverifysmsnumber = function() {
return s.Message.getFieldWithDefault(this, 11, "");
};
proto.BINUserVerifyConfigResponse.prototype.setUnverifysmsnumber = function(e) {
s.Message.setField(this, 11, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearUnverifysmsnumber = function() {
s.Message.setField(this, 11, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasUnverifysmsnumber = function() {
return null != s.Message.getField(this, 11);
};
proto.BINUserVerifyConfigResponse.prototype.getUnverifiedsmscost = function() {
return s.Message.getFieldWithDefault(this, 12, 0);
};
proto.BINUserVerifyConfigResponse.prototype.setUnverifiedsmscost = function(e) {
s.Message.setField(this, 12, e);
};
proto.BINUserVerifyConfigResponse.prototype.clearUnverifiedsmscost = function() {
s.Message.setField(this, 12, void 0);
};
proto.BINUserVerifyConfigResponse.prototype.hasUnverifiedsmscost = function() {
return null != s.Message.getField(this, 12);
};
proto.BINUserVerifyRequest = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINUserVerifyRequest, s.Message);
r.DEBUG && !COMPILED && (proto.BINUserVerifyRequest.displayName = "proto.BINUserVerifyRequest");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINUserVerifyRequest.prototype.toObject = function(e) {
return proto.BINUserVerifyRequest.toObject(e, this);
};
proto.BINUserVerifyRequest.toObject = function(e, t) {
var o = {
otp: s.Message.getField(t, 1)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINUserVerifyRequest.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINUserVerifyRequest();
return proto.BINUserVerifyRequest.deserializeBinaryFromReader(o, t);
};
proto.BINUserVerifyRequest.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
var o = t.readString();
e.setOtp(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINUserVerifyRequest.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINUserVerifyRequest.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINUserVerifyRequest.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeString(1, t);
};
proto.BINUserVerifyRequest.prototype.getOtp = function() {
return s.Message.getFieldWithDefault(this, 1, "");
};
proto.BINUserVerifyRequest.prototype.setOtp = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINUserVerifyRequest.prototype.clearOtp = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINUserVerifyRequest.prototype.hasOtp = function() {
return null != s.Message.getField(this, 1);
};
proto.BINUserVerifyResponse = function(e) {
s.Message.initialize(this, e, 0, -1, null, null);
};
r.inherits(proto.BINUserVerifyResponse, s.Message);
r.DEBUG && !COMPILED && (proto.BINUserVerifyResponse.displayName = "proto.BINUserVerifyResponse");
if (s.Message.GENERATE_TO_OBJECT) {
proto.BINUserVerifyResponse.prototype.toObject = function(e) {
return proto.BINUserVerifyResponse.toObject(e, this);
};
proto.BINUserVerifyResponse.toObject = function(e, t) {
var o = {
responsecode: s.Message.getField(t, 1),
message: s.Message.getField(t, 2),
userverified: s.Message.getField(t, 3),
verifiedphone: s.Message.getField(t, 4),
verifiedemail: s.Message.getField(t, 5)
};
e && (o.$jspbMessageInstance = t);
return o;
};
}
proto.BINUserVerifyResponse.deserializeBinary = function(e) {
var t = new s.BinaryReader(e), o = new proto.BINUserVerifyResponse();
return proto.BINUserVerifyResponse.deserializeBinaryFromReader(o, t);
};
proto.BINUserVerifyResponse.deserializeBinaryFromReader = function(e, t) {
for (;t.nextField() && !t.isEndGroup(); ) switch (t.getFieldNumber()) {
case 1:
o = t.readBool();
e.setResponsecode(o);
break;

case 2:
o = t.readString();
e.setMessage(o);
break;

case 3:
o = t.readBool();
e.setUserverified(o);
break;

case 4:
o = t.readString();
e.setVerifiedphone(o);
break;

case 5:
var o = t.readString();
e.setVerifiedemail(o);
break;

default:
t.skipField();
}
return e;
};
proto.BINUserVerifyResponse.serializeBinaryToWriter = function(e, t) {
e.serializeBinaryToWriter(t);
};
proto.BINUserVerifyResponse.prototype.serializeBinary = function() {
var e = new s.BinaryWriter();
this.serializeBinaryToWriter(e);
return e.getResultBuffer();
};
proto.BINUserVerifyResponse.prototype.serializeBinaryToWriter = function(e) {
var t = void 0;
null != (t = s.Message.getField(this, 1)) && e.writeBool(1, t);
null != (t = s.Message.getField(this, 2)) && e.writeString(2, t);
null != (t = s.Message.getField(this, 3)) && e.writeBool(3, t);
null != (t = s.Message.getField(this, 4)) && e.writeString(4, t);
null != (t = s.Message.getField(this, 5)) && e.writeString(5, t);
};
proto.BINUserVerifyResponse.prototype.getResponsecode = function() {
return s.Message.getFieldWithDefault(this, 1, !1);
};
proto.BINUserVerifyResponse.prototype.setResponsecode = function(e) {
s.Message.setField(this, 1, e);
};
proto.BINUserVerifyResponse.prototype.clearResponsecode = function() {
s.Message.setField(this, 1, void 0);
};
proto.BINUserVerifyResponse.prototype.hasResponsecode = function() {
return null != s.Message.getField(this, 1);
};
proto.BINUserVerifyResponse.prototype.getMessage = function() {
return s.Message.getFieldWithDefault(this, 2, "");
};
proto.BINUserVerifyResponse.prototype.setMessage = function(e) {
s.Message.setField(this, 2, e);
};
proto.BINUserVerifyResponse.prototype.clearMessage = function() {
s.Message.setField(this, 2, void 0);
};
proto.BINUserVerifyResponse.prototype.hasMessage = function() {
return null != s.Message.getField(this, 2);
};
proto.BINUserVerifyResponse.prototype.getUserverified = function() {
return s.Message.getFieldWithDefault(this, 3, !1);
};
proto.BINUserVerifyResponse.prototype.setUserverified = function(e) {
s.Message.setField(this, 3, e);
};
proto.BINUserVerifyResponse.prototype.clearUserverified = function() {
s.Message.setField(this, 3, void 0);
};
proto.BINUserVerifyResponse.prototype.hasUserverified = function() {
return null != s.Message.getField(this, 3);
};
proto.BINUserVerifyResponse.prototype.getVerifiedphone = function() {
return s.Message.getFieldWithDefault(this, 4, "");
};
proto.BINUserVerifyResponse.prototype.setVerifiedphone = function(e) {
s.Message.setField(this, 4, e);
};
proto.BINUserVerifyResponse.prototype.clearVerifiedphone = function() {
s.Message.setField(this, 4, void 0);
};
proto.BINUserVerifyResponse.prototype.hasVerifiedphone = function() {
return null != s.Message.getField(this, 4);
};
proto.BINUserVerifyResponse.prototype.getVerifiedemail = function() {
return s.Message.getFieldWithDefault(this, 5, "");
};
proto.BINUserVerifyResponse.prototype.setVerifiedemail = function(e) {
s.Message.setField(this, 5, e);
};
proto.BINUserVerifyResponse.prototype.clearVerifiedemail = function() {
s.Message.setField(this, 5, void 0);
};
proto.BINUserVerifyResponse.prototype.hasVerifiedemail = function() {
return null != s.Message.getField(this, 5);
};
r.object.extend(o, proto);
cc._RF.pop();
}, {
"google-protobuf": "google-protobuf"
} ],
viewCell: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "d1ecaWAeW5DLbK1xPGJ0WPn", "viewCell");
cc.Class({
extends: cc.Component,
properties: {
tableView: {
default: null,
visible: !1
},
_isCellInit_: !1,
_longClicked_: !1
},
_cellAddMethodToNode_: function() {
this.node.clicked = this.clicked.bind(this);
},
_cellAddTouch_: function() {
this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
if (!0 === this.node.active && 0 !== this.node.opacity && !this._longClicked_) {
this._longClicked_ = !0;
this.scheduleOnce(this._longClicked, 1.5);
}
}, this);
this.node.on(cc.Node.EventType.TOUCH_MOVE, function() {
if (this._longClicked_) {
this._longClicked_ = !1;
this.unschedule(this._longClicked);
}
}, this);
this.node.on(cc.Node.EventType.TOUCH_END, function() {
this.clicked();
if (this._longClicked_) {
this._longClicked_ = !1;
this.unschedule(this._longClicked);
}
}, this);
this.node.on(cc.Node.EventType.TOUCH_CANCEL, function() {
if (this._longClicked_) {
this._longClicked_ = !1;
this.unschedule(this._longClicked);
}
}, this);
},
_cellInit_: function(e) {
this.tableView = e;
if (!this._isCellInit_) {
this._cellAddMethodToNode_();
this._cellAddTouch_();
this._isCellInit_ = !0;
}
},
_longClicked: function() {
this._longClicked_ = !1;
this.node.emit(cc.Node.EventType.TOUCH_CANCEL);
this.longClicked();
},
longClicked: function() {},
clicked: function() {},
init: function(e, t, o, s) {
this.index = e;
this.data = t;
cc.log("data =", t);
}
});
cc._RF.pop();
}, {} ]
}, {}, [ "Nohu", "Card", "CardItem", "Types", "ZipUtils", "base64", "bet_pb", "enter_room_pb", "enter_zone_pb", "exit_room_pb", "filter_room_pb", "friend_pb", "gift_pb", "google-protobuf", "gzip", "initialize_pb", "instant_message_pb", "jar_pb", "level_pb", "login_pb", "logout_pb", "lookup_game_history_pb", "lookup_money_history_pb", "lookup_room_pb", "mail_pb", "map_field_entry_pb", "match_begin_pb", "match_end_pb", "notification_pb", "open_id_login_pb", "ping_pb", "player_pb", "purchase_money_pb", "register_pb", "start_match_pb", "text_emoticon_pb", "turn_pb", "update_money_pb", "update_user_info_pb", "user_info_pb", "verify_pb", "AvatarItem", "AvatarSprite", "ButtonSelectLines", "ChargeItem", "ChatObject", "GameList", "Gate", "HistoryItem", "ItemPrefab", "LineResult", "LobbyGameItem", "MailCell", "ProviderItem", "TXMatch", "TaiXiuResult", "UserInfo", "cellBetHistory", "cellPromotion", "cellSmall", "labelCell", "labelCellProvider", "tableView", "viewCell", "CommonPopup", "NodeHeadLine", "PopupCaptcha", "PopupChangeAvatar", "PopupChangeInfo", "PopupChangePass", "PopupCharging", "PopupGift", "PopupHistory", "PopupIngame", "PopupMail", "PopupMessageBox", "PopupSelectLine", "PopupSetting", "PopupTaiXiuResultList", "PopupTaiXiuTop", "PopupTaixiuBetHistory", "PopupThreeCardHistory", "PopupUserInfo", "PopupWebview", "ItemChat", "ItemEmotion", "ItemIAP", "ItemSelectLine", "SmsItem", "NodeIAP", "NodeMail", "NodeNapSMS", "NodeNapThe", "TabItem", "UITab", "UITabLeft", "BaseScene", "Intro", "Lobby", "UILobby", "Login", "minipoker", "PopupTaiXiu", "ThreeCard", "Treasure", "Loading", "MButton", "MEditbox", "Popup", "Toast", "ToastScripts", "NetworkManager" ]);