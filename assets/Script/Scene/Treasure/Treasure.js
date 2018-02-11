var BaseScene = require('BaseScene');
var NetworkManager = require('NetworkManager');

cc.Class({
    extends: BaseScene,

    properties: {
        board_view: cc.Mask,
        itemPrefab: cc.Prefab,
        isFinishSpin: true,
        isRun: false,
        stepMove : 9,
        number : 5,
        time_move: 1,
        list_item: [],
        list_recent_value: null,

        myInterVal: null,
        isRequestJar: false,
        jarValue: 0,
        roomIndex: 0,
        betType: 0,
        btn_select_lines: cc.Prefab,
        line_result: cc.Prefab,
        board_null_line: cc.Node,
        txt_jar_money: cc.Label,
        jarValue: 0,
        lst_number : {
            type: [cc.Integer],
            default: function() {
                return [6,2,8,5,1,4,10,7,3,9,16,12,19,14,13,17,18,15,11,20];
            }
        },
        lst_line_results: [],
        lst_line_selected: []
    },

    onLoad: function() {
        cc.log("on start");
        if(window.ws && window.ws.onmessage)
            window.ws.onmessage = this.onGameStatus.bind(this);
        this.requestJar();
        this.schedule(this.requestJar, 5);

        this.initMenu();
        this.initFirstItem();
    },

    initMenu: function () {
        this.lst_number = [6,2,8,5,1,4,10,7,3,9,16,12,19,14,13,17,18,15,11,20];

        for (var i = 0; i < this.lst_number.length; i++){
            var line_result = cc.instantiate(this.line_result);
            var component = line_result.getComponent("LineResult");
            component.init(i);
            this.board_null_line.addChild(line_result);

            line_result.active = false;
            this.lst_line_results.push(line_result);
        }

        var pos_line_top = 0;
        var size_board = this.board_null_line.getContentSize();

        for (var i = 0; i < this.lst_number.length; i++) {
            var line_number = cc.instantiate(this.btn_select_lines);
            var component = line_number.getComponent("ButtonSelectLines");
            component.initNumber(this.lst_number[i]);
            // component.initHighLight(true);

            var size_line = line_number.getContentSize();
            if (i == 0) {
                pos_line_top = size_line.height * 5*0.93 + size_line.height/2;
            }

            line_number.setPosition(cc.p((parseInt(i / 10) == 0) ?
                        (-size_board.width/2 + size_line.width/2) :
                        (size_board.width/2 - size_line.width/2),
                pos_line_top - size_line.height * ((i % 10) * 0.93 + 1)));
            this.board_null_line.addChild(line_number);

            this.lst_line_selected.push(line_number);
        }
    },

    initFirstItem: function() {
        var random_number = Common.genRandomNumber(98,105,this.stepMove*this.number);
        var items_value = Common.genArrayToMultiArray(random_number, this.stepMove, this.number);
        this.list_recent_value = Common.create2DArray(this.stepMove);

        for(var i = 0; i < this.stepMove; i++){
            for(var j = 0; j < this.number; j++){
                var item = cc.instantiate(this.itemPrefab);
                var posX = (j - 2) * item.getContentSize().width;
                var posY = (i - 1) * item.getContentSize().height;
                item.getComponent("ItemPrefab").init(items_value[i][j] - 98);
                item.setPositionY(posY);
                item.setPositionX(posX);

                this.list_item.push(item);
                this.board_null_line.addChild(item);
            }
        }

        this.list_recent_value = items_value;
    },

    implementSpinTreasure: function (listItem,listWin) {

        var random_number = Common.genRandomNumber(this.stepMove, this.number);
        var items_value = Common.genArrayToMultiArray(random_number, this.stepMove, this.number);

        for(var i = 0; i < listItem.length; i++){
            var x = parseInt(i/this.number);
            var y = parseInt(i%this.number);

            cc.log("x/y",x,y);
            items_value[this.stepMove - 3 + x].push(listItem[i]);
        }

        if(items_value.length * this.number != this.list_item.length){
            return;
        }

        for(var i = 0; i < this.list_item.length; i++){
            var x = parseInt(i/this.number);
            var y = parseInt(i%this.number);

            if(i < 3*this.number){
                var i1 = this.stepMove - (3 - x);
                var j1 = y;
                this.list_item[i].getComponent('ItemPrefab').init(this.list_recent_value[i1][j1] - 98);
            }

            var posX = (y - 2) * this.list_item[i].getContentSize().width * 0.75;
            var posY = (x - 1) * this.list_item[i].getContentSize().height;

            this.list_item[i].setPositionX(posX);
            this.list_item[i].setPositionY(posY);
        }

        this.list_recent_value = items_value;

        for(var i = 0; i < this.list_item.length; i++){
            var x = parseInt(i/this.number);
            var y = parseInt(i%this.number);

            var item = this.list_item[i];

            var item_value = items_value[x][y] - 98;
            if(i >= 3*this.number){
                item.getComponent('ItemPrefab').init(item_value);
            }

            var h = item.getContentSize().height;

            var move1 = cc.moveBy(0.2, cc.p(0,h*0.25));
            var move2 = cc.moveBy(0.15, cc.p(0,h*0.25));
            var move3 = cc.moveBy(this.time_move,cc.p(0,-(this.stepMove - 3.0)*h - 0.5*h));
            var delay = cc.delayTime(y*0.3);

            if(i == this.list_item.length - 1){
                // khi dừng hiệu ứng
                var call_func = cc.callFunc(function () {
                    cc.log("FINISH!!!!");
                });
                item.runAction(cc.sequence(delay,move1,move3,move2,call_func));
            }else{
                item.runAction(cc.sequence(delay,move1,move3,move2));
            }
        }

    },

    requestJar: function() {
        var self = this;
        if(!self.isRequestJar) {
            self.isRequestJar = false;
            NetworkManager.getJarRequest(Common.getZoneId(), this.betType + 1);
        }
    },
    getSpin: function() {
        this.getTurnTreasureRequest(this.betType + 1);
    },
    getTurnTreasureRequest: function(turnType) {
        var entries = [];

        var entryTurn = new proto.BINMapFieldEntry();
        entryTurn.setKey("turnSlotType");
        entryTurn.setValue(turnType.toString());
        entries.push(entryTurn);

        var result = this.lst_number.join(",");

        cc.log("lst_number",this.lst_number);

        var entryLine = new proto.BINMapFieldEntry();
        entryLine.setKey("lineSelected");
        entryLine.setValue(result);
        entries.push(entryLine);
        NetworkManager.getTurnMessageFromServer(0, entries);
    },

    exitRoom: function() {
        NetworkManager.requestExitRoomMessage(this.roomIndex);
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
        if(event.data!==null || event.data !== 'undefined') {
            var lstMessage = NetworkManager.parseFrom(event.data, event.data.byteLength);
            cc.log("list message size:" + lstMessage.length);
            if(lstMessage.length > 0) {
                for(var i = 0; i < lstMessage.length; i++){
                    var buffer = lstMessage[i];
                    this.handleMessage(buffer);
                }
            }
        }
    },
    updateMoneyMessageResponseHandler: function(resp) {
        cc.log("update money response:", resp.toObject());
        if(resp.getResponsecode()) {

        }
        if(resp.hasMessage() && resp.getMessage() !== "") {

        }
    },

    matchEndResponseHandler: function(resp) {
        cc.log("match end response:", resp.toObject());
        if(resp.getResponsecode()) {
            if(resp.getArgsList().length > 0) {
                var listItem = null;
                var lineWin = null;
                for(var i = 0; i < resp.getArgsList().length; i++) {
                    var entry = resp.getArgsList()[i];
                    if(entry.getKey() == "listItem") {
                        listItem = entry.getValue().split(", ").map(function(item) {
                            item = parseInt(item);
                            return item;
                        });

                    } else {
                        if(entry.getValue() !== "")
                            lineWin = entry.getValue().split(", ").map(function(item) {
                                item = parseInt(item);
                                return item;
                            });
                        else lineWin = [];

                    }
                }
                if(listItem !== null && lineWin !== null) {

                    cc.log("list item:", listItem);
                    cc.log("line win:", lineWin);

                    // TODO:

                    this.implementSpinTreasure(listItem,lineWin);
                }
            }
        }

        if(resp.hasMessage() && resp.getMessage() !== "") {

        }
    },

    exitRoomResponseHandler: function(resp) {
        cc.log("exit room response message: ", resp.toObject());
        if(resp.getResponsecode()) {

        }
    },
    exitZoneResponseHandler: function(resp) {
        cc.log("exit zone response message:", resp.toObject());
        if(resp.getResponsecode()) {
            Common.setZoneId(-1);
            cc.director.loadScene('Lobby');
        }

        if(resp.hasMessage() && resp.getMessage() !== "") {

        }
    },
    jarResponseHandler: function(resp) {
        cc.log("jar response message:", resp.toObject());
        if(resp.getResponsecode()) {
            var jar_type_response = 0;
            var preJarValue = this.jarValue;
            this.jarValue = resp.getJarvalue();
            if (resp.getArgsList().length > 0) {
                var entry = resp.getArgsList()[0];
                if (entry.getKey() === "jarType") {
                    jar_type_response = parseInt(entry.getValue().toString());
                }
            }

            if (jar_type_response === this.betType + 1) {
                if (this.jarType === jar_type_response) {
                    // this.moneyJar.node.runAction(cc.actionInterval(1.0, preJarValue, this.jarValue, function(val){
                    //     var number_cash = Common.numberFormatWithCommas(val);
                    Common.countNumberAnim(this.txt_jar_money, preJarValue, this.jarValue, 0, 1);
                    // }));
                } else {
                    this.txt_jar_money.string = Common.numberFormatWithCommas(this.jarValue);
                }
                this.jarType = jar_type_response;
            }
        }

        if(resp.hasMessage() && resp.getMessage() !== "") {

        }
    },

    handleMessage: function(buffer) {
        this._super(buffer);
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
                this.exitRoomResponseHandler(msg);
                break;
            case NetworkManager.MESSAGE_ID.EXIT_ZONE:
                var msg = buffer.response;
                this.exitZoneResponseHandler(msg);
                break;
            case NetworkManager.MESSAGE_ID.JAR:
                var msg = buffer.response;
                this.jarResponseHandler(msg);
                break;
        }
    }
    // update (dt) {},
});
