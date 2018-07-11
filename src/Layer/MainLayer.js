var MainLayer = cc.Layer.extend({
    _map: null,
    ctor:function () {
        this._super();
        this._map = new Map();
        // cc.log(cc.winSize.height);
        // cc.log(this._map._height);
        this.addChild(this._map, 0, "MAP");
        this.init();
    },


    init: function() {
        // var centering = cc.MoveTo(0.5, cc.p(this._map.width/2 - cc.winSize.width/2, this._map.height/2 - cc.winSize.height/2));
        // this._map.runAction(centering);
        this.moveMap();
    },

    moveMap: function() {
        var self = this;
        var maxX = 0;
        var maxY = 0;

        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
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

                curPos = null;
            },
            onTouchEnded: function(touch, event) {
                return true;
            }
        }, this)
    }

});

MainLayer.scene = function(){
    var scene = new cc.Scene();
    var layer = new MainLayer();
    scene.addChild(layer);
    return scene;
};