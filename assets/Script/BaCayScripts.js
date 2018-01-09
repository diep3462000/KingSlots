var NetworkManager = require('NetworkManager');
var BaseScene = require('BaseScene');
cc.Class({
    extends: BaseScene,

    properties: {
        cardPrefab: cc.Prefab,
        toastPrefab: cc.Prefab,
        cardView: cc.Mask,
        userMoney: cc.Label,
        moneyBet: cc.Label,
        moneyJar: cc.Label,
        roomName: cc.Sprite,
        fastSpinToggle: cc.Toggle,
        autoSpinToggle: cc.Toggle,
        isFinishSpin: true,
        isRun: false,
        updateMoneyResponse: [],
        isUpdateMoney : false
    },

    exitRoom: function() {
        cc.director.loadScene("Table");
    },

    // use this for initialization
    onLoad: function () {
        window.ws.onmessage = this.ongamestatus.bind(this);
        this.userMoney.string = Common.getCash();
        for(var i = 0; i < 3; i++){
            for(var j = 0; j < 3; j++){
                var item = cc.instantiate(this.cardPrefab);
                var posX =  0;
                if(j === 0){
                    posX = - item.getContentSize().width ;
                } else if(j === 2){
                    posX = item.getContentSize().width ;
                } else {
                    posX = 0;
                }

                var posY = 0;
                if(i === 0){
                    posY = item.getContentSize().height;
                } else if (i === 1){
                    posY = 0;
                } else {
                    posY = - (i - 1)*item.getContentSize().height;
                }

                item.getComponent('CardItem').init();
                item.setPositionY(posY);
                item.setPositionX(posX);

                this.cardView.node.addChild(item);
            }

        }


    },

    update: function (dt) {
        this.handleAutoSpin();
    },

    quayEvent: function () {
        var item = cc.instantiate(this.toastPrefab).getComponent("ToastScripts");
        // var valMoney = (isCash ? turnCashValue[indexCash] : turnGoldValue[indexCash]);
        var money = Common.getCash();
        if(1000 > money){
            var message = "Bạn không có đủ tiền!";
            // item.showToast(message);
            // this.node.addChild(item.node);
            this.showToast(message, this);
            return;
        }
        if (this.autoSpinToggle.isChecked) {
            return;
        }

        if (!this.isRun) {
            this.getTurnMiniThreeCardsRequest(1);
        }else{
            var message = "Xin vui lòng đợi!";
            this.showToast(message, this);
            // item.showToast(message);
            // this.node.addChild(item.node);
        }
    },
    getTurnMiniThreeCardsRequest: function(turnType) {

        // cangatAnimation();
        this.isRun = true;

        var entries = [];
        var entry = new proto.BINMapFieldEntry();
        entry.setKey("turnSlotType");
        entry.setValue(turnType.toString());
        entries.push(entry);
        NetworkManager.getTurnMessageFromServer(0, entries);
    },
    ongamestatus: function(event) {
        if(event.data!==null || typeof(event.data) !== 'undefined') {
            var lstMessage = NetworkManager.parseFrom(event.data, event.data.byteLength);
            // cc.log("lstMessage =", lstMessage.shift());
            if(lstMessage.length > 0) {
                for(var i = 0; i < lstMessage.length; i++){
                    var buffer = lstMessage[i];
                    this.handleMessage(buffer);
                }
            }
        }
    },

    exitRoomResponsehandler: function (resp) {
        cc.log("exit room response handler:", resp.toObject());
        if(resp.getResponsecode()) {

        }

        if(resp.hasMessage()) {
            // show toast
        }
    },

    exitZoneResponseHandler: function(resp) {
        cc.log("exit zone response handler:", resp.toObject());
        if(resp.getResponsecode()) {
            // Common.setZoneId(-1);
            // cc.director.loadScene("Lobby");
        }

        if(resp.hasMessage()) {
            // TODO: display message
        }
    },

    handleMessage: function(buffer) {
        cc.log("buffer =", buffer.message_id);
        switch (buffer.message_id) {
            case NetworkManager.MESSAGE_ID.UPDATE_MONEY:
                var msg = buffer.response;
                this.updateMoneyMessageResponseHandler(msg);
                break;
            case NetworkManager.MESSAGE_ID.MATCH_END:
                this.matchEndResponseHandler(buffer.response);
                break;
            case NetworkManager.MESSAGE_ID.EXIT_ROOM:
                var msg = buffer.response;
                this.exitRoomResponsehandler(msg);
                break;
            // case NetworkManager.MESSAGE_ID.ENTER_ROOM:
            //     var msg = buffer.response;
            //     this.enterRoomResponseHandler(msg);
            //     break;
            case NetworkManager.MESSAGE_ID.EXIT_ZONE:
                var msg = buffer.response;
                this.exitZoneResponseHandler(msg);
                break;
            case NetworkManager.MESSAGE_ID.JAR:
                var msg = buffer.response;
                this.jarResponseHandler(msg);
                break;
        }
    },
    updateMoneyMessageResponseHandler: function (response) {
        if (response.getResponsecode()){
            this.setBinUpdateMoney(response);
            this.removeTurnUpdateMoney();
        }
    },
    setBinUpdateMoney: function(response) {
        this.updateMoneyResponse = response;
    },
    getBINUpdateMoneyResponse: function(){
        return this.updateMoneyResponse;
    },
    removeTurnUpdateMoney: function(){
        var updateMoneyResponse = this.getBINUpdateMoneyResponse();
        cc.log("updateMoneyResponse =", updateMoneyResponse.getMoneyboxesList());
        if(updateMoneyResponse.getResponsecode()) {
            for(var i = 0; i < updateMoneyResponse.getMoneyboxesList().length; i++) {
                var money_box = updateMoneyResponse.getMoneyboxesList()[i];
                if(money_box.getReason() === "miniBacaySpin") {
                    var origin_money = money_box.getCurrentmoney();
                    //set lai tien cho nguoi choi

                    Common.setCash(origin_money);
                    this.userMoney.string = origin_money;
                    //this->moneyEvent->onEventMoneyMiniGame(true,origin_money);

                }
            }
        }
    },
    matchEndResponseHandler: function(response) {
        if (response.getResponsecode()) {
            if (response.getArgsList().length > 0) {
                for (var i = 0; i < response.getArgsList().length; i++) {
                    if (response.getArgsList()[i].getKey() === "currentCards") {
                        var str = response.getArgsList()[i].getValue();
                        var currentCards = str.split(',').map(Number);
                        this.implementSpinMiniThreeCards(currentCards,response);
                    }
                }
            }

            /*if (response->textemoticons_size() > 0){
             BINTextEmoticon emoticon = response->textemoticons(0);
             handleRanking(emoticon.emoticonid(), emoticon.message());
             }*/
        } else {
            this.isRun = false;
            this.autoSpinToggle.isChecked = false;
        }
        /* if (response->has_message() && !response->message().empty())
         this->showToast(response->message().c_str(), 2);*/
    },
    implementSpinMiniThreeCards: function(carx,response) {
        cc.log("carx =", carx);
        this.cardView.node.removeAllChildren(true);
        var text_emoticon = response.getTextemoticonsList()[0];
        this.isFinishSpin = false;
        var isBreakJar = (text_emoticon.getEmoticonid() === 54); //54: nổ hũ

        var stepCard = 4;
        var number = 3;
        var rs = Common.genRandomNumber(carx, stepCard, number);
        var test = Common.genArrayToMultiArray(rs, stepCard, number);
        test[stepCard-2] = carx;
        cc.log("test carx =", test.length);
        for(var i = 0; i < test.length; i++){
            for(var j = 0; j < test[i].length; j++){
                var item = cc.instantiate(this.cardPrefab);
                var cardValue = test[i][j];
                var posX =  0;
                if(j === 0){
                    posX = - item.getContentSize().width ;
                } else if(j === 2){
                    posX = item.getContentSize().width ;
                } else {
                    posX = 0;
                }

                var posY = 0;

                if(i === 0){
                    posY = - item.getContentSize().height;
                } else if (i === 1){
                    posY = 0;
                } else {
                    posY = (i - 1)*item.getContentSize().height;
                }


                item.getComponent('CardItem').replaceCard(cardValue);

                item.setPositionY(posY);
                item.setPositionX(posX);

                this.cardView.node.addChild(item);

                var paddingCard = item.getContentSize().height;

                var moveAction = cc.moveBy(1.5 + j*0.25,
                    cc.p(0, - (test.length - 3)*paddingCard));

                if(j === 0){
                    moveAction = cc.moveBy(1.5 + j*0.25,
                        cc.p(0, - (test.length - 3)*paddingCard));
                }else{
                    moveAction = cc.moveBy((j-1) + 1.5 + (j-1)*0.25 + (test.length - test[i].length) / stepCard,
                        cc.p(0, - (test.length - 4)*paddingCard));
                    // moveAction = cc.moveBy(1.5 + j*0.25,
                    //     cc.p(0, - (test.length - 3)*paddingCard));
                }

                if(j === 2){
                    var emoticon = response.getTextemoticonsList()[0];
                    var emotionId = emoticon.getEmoticonid();
                    var message = emoticon.getMessage();
                    var moneyResponse = this.getBINUpdateMoneyResponse();
                    var callFunc = cc.callFunc(this.handleRanking(emotionId, message, moneyResponse), this);

                    var callFuncAutoSpin = cc.callFunc(function () {
                        if(!isBreakJar)
                             this.isFinishSpin = true;
                    }, this);

                    item.runAction(cc.sequence(moveAction, cc.moveBy(1.5, cc.p(0, -paddingCard)), callFunc, cc.delayTime(2), callFuncAutoSpin, null));

                }else{
                    if(j === 0){
                        item.runAction(moveAction);
                    }else{
                        item.runAction(cc.sequence(moveAction, cc.moveBy(1.5, cc.p(0, -paddingCard))));
                    }

                }

                item.runAction(moveAction);

            }

        }


    },
    _onDealEnd: function() {
        cc.log("run action");
    },
    handleAutoSpin: function() {

        if (this.autoSpinToggle.isChecked && !this.isRun && this.isFinishSpin) {
            var item = cc.instantiate(this.toastPrefab).getComponent("ToastScripts");
            // var valMoney = (isCash ? turnCashValue[indexCash] : turnGoldValue[indexCash]);
            var money = Common.getCash();
            if(1000 > money){
                var message = "Bạn không có đủ tiền!";
                // item.showToast(message);
                this.showToast(message, this);
                this.autoSpinToggle.isChecked = false;
                return;
            }
            this.getTurnMiniThreeCardsRequest(1);
        }
    },
    handleRanking: function(emoticonId, message, response) {

        //TODO: HungLe - Handle Ranking

        //emoticonId = 54;
        if(emoticonId === 54) {
            //showNoHu();
            this.isRun = false;
            return ;
        }
        if (emoticonId !== 72) {
            this.isUpdateMoney = false;
            cc.log("mess =", message);
            var nodeChild = new cc.Node();
            nodeChild.parent = this.node;
            var lbl_text = nodeChild.addComponent(cc.Label);
            lbl_text.string = message;

            lbl_text.node.setPosition(cc.p(1334/2,750/2));
            lbl_text.node.color = cc.color(248,213,82,255);
            var fadeout = cc.fadeOut(1.0);
            var callFunc = cc.callFunc(function () {
                for (var i = 0; i < response.getMoneyboxesList().length; i++) {
                    var nodeMoney = new cc.Node();
                    nodeMoney.parent = this.node;
                    var moneybox = response.getMoneyboxesList()[i];
                    if (moneybox.getDisplaychangemoney() > 0) {
                        this.isUpdateMoney = true;
                        var label_money = nodeMoney.addComponent(cc.Label);
                        label_money.string = moneybox.getDisplaychangemoney().toString();
                        // MLabel::createUpdateMoney(moneybox.displaychangemoney());
                        label_money.node.setPosition(cc.p(1334/2,750/2));
                        label_money.node.color = cc.color(248,213,82,255);
                        // this.cardView.node.addChild(this.label_money);
                        var fadeout = cc.fadeOut(1.5);
                        label_money.node.runAction(cc.sequence(cc.moveBy(0.5, cc.p(0,20)),cc.delayTime(0.25),
                            cc.spawn(cc.moveBy(1.0,cc.p(0,20)),fadeout,null), cc.removeSelf(),null));

                    }
                }
            }, this);

            var callFuncUpdateMoney = cc.callFunc(function () {
                if (this.isUpdateMoney) {
                    this.setOriginMoney();
                }
                this.isRun = false;
            }, this);

            lbl_text.node.runAction(cc.sequence(cc.moveBy(0.5, cc.p(0, 50)),
            callFunc, cc.spawn(cc.moveBy(1.0, cc.p(0, 50)), fadeout, null),
            callFuncUpdateMoney, cc.removeSelf(), null));
            // this.cardView.node.addChild(this.label_text);
        }
        else {
            this.setOriginMoney();
            this.isRun = false;
        }
    },
    setOriginMoney: function() {
        var response = this.getBINUpdateMoneyResponse();
        if(response !== 0){
            for (var i = 0; i < response.getMoneyboxesList().length; i++) {
                var moneybox = response.getMoneyboxesList()[i];
                if (moneybox.getDisplaychangemoney() > 0) {
                    var userInfo = Common.getUserInfo();
                    if (moneybox.getUserid() == userInfo.userid){
                        var origin_money = moneybox.getCurrentmoney();
                        //set lai tien cho nguoi choi
                        Common.setCash(origin_money);
                        this.userMoney.string = origin_money;
                    }
                }
            }
        }

        this.isRun = false;
    },
    jarResponseHandler: function(response) {
        cc.log("jarResponseHandler = ", response);
        // if (response.getResponsecode()) {
        //     var jar_type_response = 0;
        //     preJarValue = jarValue;
        //     jarValue = response.getJarstatus();
        //     auto common = Common::getInstance();
        //     if (response->args_size() > 0) {
        //         BINMapFieldEntry entry = response->args(0);
        //         if (entry.key() == "jarType") {
        //             jar_type_response = Common::getInstance()->convertStringToInt(entry.value());
        //         }
        //     }
        //
        //     if (jar_type_response == calculateTurnType()) {
        //         if (jarType == jar_type_response) {
        //             hu_text->runAction(ActionFloat::create(1.0f, preJarValue, jarValue, [&](float val){
        //                 string number_cash = common->numberFormatWithCommas(val);
        //                 hu_text->setString(number_cash);
        //             }));
        //         }else {
        //             showJarValue(jarValue);
        //         }
        //         jarType = jar_type_response;
        //     }
        // }
        //
        // if (response->has_message() && !response->message().empty()) {
        //     this->showToast(response->message().c_str(), 2);
        // }
        //
        // isRequestJar = false;
    },
    showToast: function (strMess, target) {
        this._super(strMess, target);
    }

});