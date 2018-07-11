var MainLayer = cc.Layer.extend({
    ctor:function () {
        this._super();
        // var color = new cc.LayerColor(cc.color(64, 64, 64, 255));
        // this.addChild(color, -1);
        var map = new cc.TMXTiledMap("res/Art/Map/42x42map.tmx");
        this.addChild(map, 0, "TILEMAP");
        map.anchorX = 0;
        map.anchorY = 0;
        map.scale = 0.3;
        var ms = map.getMapSize();
        var ts = map.getTileSize();
        // map.x = -ms.width * ts.width * map.scale/ 2;
        // map.y =  -ms.height * ts.height * map.scale / 2;

        // map.runAction(cc.moveTo(1.0, cc.p(-ms.width * ts.width / 2, -ms.height * ts.height / 2)));
    },


    init: function() {
        // this.background = new cc.Sprite(res.background_png);
        // this.background.x = cc.winSize.width/2;
        // // this.background.y = cc.winSize.height/2;
        // // this.center_point.x = this.background.x;
        // // this.center_point.y = this.background.y;
        // this.background.setScale(cc.winSize.width/this.background.width, cc.winSize.height/this.background.height);
        // cc.log("Init pos: " + this.background.width  + " " + this.background.height );
        // this.addChild(this.background);
        // this.addTouchListener();
    },

    addTouchListener: function(){
        var self = this;
        cc.eventManager.addListener({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            onTouchBegan: function(touch, event) {
                var startX, startY;
                startX = touch.getLocation().x;
                startY = touch.getLocation().y;
                var offsetX = cc.winSize.width/2 - startX;
                var offsetY = Math.abs(cc.winSize.height/2 - startY);
                self.background.scaleX *= 2;
                self.background.scaleY *= 2;
                var move = cc.MoveTo(0.5, cc.p())
                // cc.log(cc.winSize.width* + " " + cc.winSize.height);
                // cc.log("Init pos: " + self.background.width*self.background.scaleX  + " " + self.background.height*self.background.scaleY );
                return true;
            },
            onTouchMoved: function(touch, event) {
                var delta = touch.getDelta();
                var curPos = cc.p(self.background.x, self.background.y);
                curPos = cc.pAdd(curPos, delta);
                self.background.x = curPos.x;
                self.background.y = curPos.y;
                cc.log("Updated Pos: " + self.background.x  + " " + self.background.y );
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