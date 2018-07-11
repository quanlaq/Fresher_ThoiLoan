var Map = cc.Node.extend({
    _tileMap: null,
    _bgTopLeft: null,
    _bgTopRight: null,
    _bgBotLeft: null,
    _bgBotRight: null,
    _width: null,
    _height: null,
   ctor: function(){
       this._super();
       this.init();
   },

    init: function(){
        this.loadTileMap();
        this.loadBackground();
        cc.log(this._bgBotLeft.height + this._bgBotRight.height);
        this._width = (this._bgBotLeft.width + this._bgBotRight.width)*cf.bgSCALE;
        this._height = (this._bgBotLeft.height + this._bgTopLeft.height)*cf.bgSCALE;
        // var w = this._tileMap.width * cf.SCALE, h = this._tileMap.height * cf.SCALE;
        // var rect = new cc.DrawNode();
        // rect.drawRect(cc.p(this._tileMap.x + 40*cf.SCALE,this._tileMap.y), cc.p(this._tileMap.x + w - 40*cf.SCALE,this._tileMap.y+h), cc.color(0,0,0,0), 2, cc.color(0,255,0,255));
        // cc.log(this._tileMap.width + " " + this._tileMap.height);
        // this.addChild(rect);
        // this.moveMap();
    },


    loadTileMap: function(){
        this._tileMap = new cc.TMXTiledMap("res/Art/Map/42x42map.tmx");
        this._tileMap.x = 506*cf.SCALE;
        this._tileMap.y = 481.3*cf.SCALE;
        this._tileMap.scale = cf.SCALE;
        this.addChild(this._tileMap, 0, 1);
    },

    loadBackground: function() {

        this._bgBotLeft = new cc.Sprite(res.bgBotLeft);
        this._bgBotRight = new cc.Sprite(res.bgBotRight);
        this._bgTopLeft = new cc.Sprite(res.bgTopLeft);
        this._bgTopRight = new cc.Sprite(res.bgTopRight);

        this.addChild(this._bgTopRight, 1);
        this.addChild(this._bgTopLeft,  1);
        this.addChild(this._bgBotRight, 1);
        this.addChild(this._bgBotLeft,  1);

        this._bgBotLeft.attr({
           x:0,
           y:0,
           anchorX: 0,
           anchorY: 0,
            scale: cf.bgSCALE
        });

        this._bgBotRight.attr({
            x: (this._bgBotLeft.width) * cf.bgSCALE,
            y:0,
            anchorX: 0,
            anchorY: 0,
            scale: cf.bgSCALE
        });

        this._bgTopLeft.attr({
            x:0,
            y:(this._bgBotLeft.height )* cf.bgSCALE,
            anchorX: 0,
            anchorY: 0,
            scale: cf.bgSCALE
        });

        this._bgTopRight.attr({
            x:(this._bgBotLeft.width)* cf.bgSCALE,
            y:(this._bgBotLeft.height)* cf.bgSCALE,
            anchorX: 0,
            anchorY: 0,
            scale: cf.bgSCALE
        });

    },

});