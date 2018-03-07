cc.Class({
    extends: cc.Component,

    properties: {
        edit_number : cc.EditBox,
        edit_serial : cc.EditBox,
        table_view : cc.Node,
        ui_left : cc.Node,
        tabLeftPrefab: cc.Prefab,

    },

    initTabLeft: function() {
        cc.log("provider list:", Common.providerLists);
        var tabString = Common.providerLists.map(function(provider) {
            return provider.providername;
        });
        cc.log("tabString:", tabString);

        var item = cc.instantiate(this.tabLeftPrefab);
        item.getComponent("UITabLeft").setTab(tabString, 1, function(index){
            this.onLeftEvent(index);
        }.bind(this));
        this.ui_left.addChild(item);
    },

    onLoad: function () {
        // this.initTabLeft();
    },

    onLeftEvent: function(index) {
        cc.log("index node nap the:", index);
    },

    demo: function (index) {
        cc.log(">>>>>>>>> demo func ",index);
    },

    start: function () {

    },
});
