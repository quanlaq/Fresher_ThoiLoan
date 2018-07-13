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
        var centering = cc.MoveTo(1, cc.p(-this._map._width/2 + cc.winSize.width/2, -this._map._height/2 + cc.winSize.height/2));
        this._map.runAction(centering);
        // this.moveMap();
        this.zoomMap(1.1)
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
                cc.log(locInNodex + " " + locInNodey);
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
    }

});

MainLayer.scene = function(){
    var scene = new cc.Scene();
    var layer = new MainLayer();
    scene.addChild(layer);
    return scene;
};