SHOP_BUTTON_TAG = 10;
SETTING_BUTTON_TAG = 11;
INVENTORY_BUTTON_TAG = 12;

var MainLayer = cc.Layer.extend({
    _map: null,
    _shop: null,
    ctor:function () {
        this._super();
        this._map = new Map();
        // cc.log(cc.winSize.height);
        // cc.log(this._map._height);
        this.addChild(this._map, 0, "MAP");
        this.init();
    },


    init: function() {
        var centering = cc.p(-this._map._width/2 + cc.winSize.width/2, -this._map._height/2 + cc.winSize.height/2);
        this._map.setPosition(centering);
        this.moveMap();
        this.initMainGUI();
        this._shop = new Shop();
        this.addChild(this._shop);
    },

    initMainGUI: function() {

        this.addShopButton();
        this.addSettingButton();
        this.addInventoryButton();
    },

    addShopButton: function(){
        var title = cc.LabelBMFont.create('CỬA HÀNG',  font.soji20);
        var shopButton = new ccui.Button();
        shopButton.scale = 1.5;
        shopButton.loadTextures(mainGUI.shop, mainGUI.shop);
        shopButton.attr({
            x: cc.winSize.width - shopButton.width/2*shopButton.scale - 5,
            y: shopButton.height/2*shopButton.scale,
            anchorX: 0.5,
            anchorY: 0.5
        });
        title.scale /= 1.5;
        title.setAnchorPoint(cc.p(0.5, 0.5));
        title.setPosition(cc.p(shopButton.width/2, title.height/2 + 3));
        shopButton.addTouchEventListener(this.openShop, this);
        shopButton.addChild(title);
        this.addChild(shopButton, 10, SHOP_BUTTON_TAG);
    },

    addSettingButton: function() {
        var shopButton = this.getChildByTag(SHOP_BUTTON_TAG);
        var settingButton = new ccui.Button();
        settingButton.scale = 1.5;
        settingButton.loadTextures(mainGUI.setting, mainGUI.setting);
        settingButton.setAnchorPoint(cc.p(0.5, 0.5));
        settingButton.setPosition(cc.p(cc.winSize.width - settingButton.width/2*settingButton.scale - 5 , shopButton.y + shopButton.height/2*shopButton.scale + settingButton.height/2*settingButton.scale));
        this.addChild(settingButton, 10, SETTING_BUTTON_TAG);
        settingButton.addTouchEventListener(this.openSetting, this);
    },

    addInventoryButton: function(){

        var settingButton = this.getChildByTag(SETTING_BUTTON_TAG);
        var inventoryButton = new ccui.Button();
        inventoryButton.scale = 1.5;
        inventoryButton.loadTextures(mainGUI.inventory, mainGUI.inventory);
        inventoryButton.setAnchorPoint(cc.p(0.5, 0.5));
        inventoryButton.setPosition(cc.p(cc.winSize.width - inventoryButton.width/2*inventoryButton.scale - 5 , settingButton.y + settingButton.height/2*settingButton.scale + inventoryButton.height/2*inventoryButton.scale));
        this.addChild(inventoryButton, 10, INVENTORY_BUTTON_TAG);
        inventoryButton.addTouchEventListener(this.openInventory, this);
    },

    moveMap: function() {
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var loc = touch.getLocation();

                // cc.log(self._map.x + " " + self._map.y);
                // cc.log(loc.x + " " + loc.y);
                var locInNodex = loc.x - self._map.x;
                var locInNodey = loc.y - self._map.y;
                cc.log("click " + locInNodex + " " + locInNodey);
                return true;
            },
            onTouchMoved: function(touch, event) {
                var delta = touch.getDelta();
                var curPos = cc.p(self._map.x, self._map.y);
                curPos = cc.pAdd(curPos, delta);
                self._map.x = curPos.x;
                self._map.y = curPos.y;

                self._map.x = self._map.x >= 0 ? 0 : self._map.x;
                self._map.y = self._map.y >= 0 ? 0 : self._map.y;

                self._map.x = self._map.x >= cc.winSize.width - self._map._width ? self._map.x : cc.winSize.width - self._map._width;
                self._map.y = self._map.y >= cc.winSize.height - self._map._height + 42 ? self._map.y : cc.winSize.height - self._map._height + 42 ;

                // cc.log(self._map.y);
                // cc.log(self._map.x >= cc.winSize.width - self._map._width);

                // cc.log(self.convertToWorldSpace().x + " " + self.convertToWorldSpace().y);
                //
                // cc.log(self._map.x + " " + self._map.y);

                curPos = null;
            },
            onTouchEnded: function(touch, event) {
                return true;
            }
        }, this)
    },

    zoomMap: function(scale) {
        var self = this;
        var touchLocation;
        var curPosInMap;
        var newPosInMap;
        var newMapPos;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                touchLocation = touch.getLocation();
                curPosInMap = cc.p(touchLocation.x - self._map.x, touchLocation.y - self._map.y);
                newPosInMap = cc.p(curPosInMap.x*scale, curPosInMap.y*scale);
                newMapPos = cc.p(touchLocation.x - newPosInMap.x, touchLocation.y - newPosInMap.y);
                return true;
            },
            onTouchMoved: function(touch, event) {
            },
            onTouchEnded: function(touch, event) {
                self._map.setPosition(newMapPos);
                self._map.scale *= scale;
            }
        }, this)
    },

    openShop: function(sender, type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                sender.setScale(sender.scale*1.1);
                cc.log("Open shop");
                if(!this._shop._isOpen) this._shop.onAppear();
                else if(this._shop._isOpen) this._shop.onDisappear();
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.setScale(sender.scale/1.1);
                cc.log("ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(sender.scale/1.1);
                cc.log("canceled");
                break;
        }
    },

    openSetting: function(sender, type){
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                sender.setScale(sender.scale*1.1);
                cc.log("Open setting");
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.setScale(sender.scale/1.1);
                cc.log("ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(sender.scale/1.1);
                cc.log("canceled");
                break;
        }
    },

    openInventory: function(sender, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                sender.setScale(sender.scale*1.1);
                cc.log("Open inventory");
                break;
            case ccui.Widget.TOUCH_MOVED:
                cc.log("moved");
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.setScale(sender.scale/1.1);
                cc.log("ended");
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(sender.scale/1.1);
                cc.log("canceled");
                break;
        }
    }
});

MainLayer.scene = function(){
    var scene = new cc.Scene();
    var layer = new MainLayer();
    scene.addChild(layer);
    return scene;
};