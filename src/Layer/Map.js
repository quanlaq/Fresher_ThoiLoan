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
        this._width = (this._bgBotLeft.width + this._bgBotRight.width)*cf.bgSCALE;
        this._height = (this._bgBotLeft.height + this._bgTopLeft.height)*cf.bgSCALE;
        this.initTileLocation();
        cc.log(cf.tileLocation[1][1].x +" " + cf.tileLocation[1][1].y);
        var builderHut = new cc.Sprite(res.builderHut);
        builderHut.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: cf.tileLocation[20][20].x,
            y: cf.tileLocation[20][20].y + (2/2-0.5)*cf.tileSize.height*cf.SCALE,
            // opacity: 255*30/100,
            scale: cf.SCALE
        });
        this.addChild(builderHut, 1);
        // this.moveMap();
    },

    initTileLocation: function(){
        cf.tileLocation.push([0]);
        var mapLayer = this._tileMap.getLayer("bg2");
        for (var i = 1; i <= 40; i++)
        {
            var arr_pos = [];
            for(var k = 0; k<=40; k++) arr_pos.push(k);
            for ( var j = 1; j <= 40; j++)
            {
                r = i;
                c = j;
                var pos = null;
                if ((r+c) % 2 === 0)
                {
                    var current_tile = mapLayer.getTileAt(r, c);
                    pos = cc.p(current_tile.x + 0.5 * cf.tileSize.width,current_tile.y + 0.5 * cf.tileSize.height );
                    var posInWorld = cc.p(pos.x*this._tileMap.scale + this._tileMap.x, pos.y*this._tileMap.scale + this._tileMap.y);
                }
                else
                {
                    current_tile = mapLayer.getTileAt(r + 1, c);
                    pos = cc.p(current_tile.x,current_tile.y + cf.tileSize.height );
                    posInWorld = cc.p(pos.x*this._tileMap.scale + this._tileMap.x, pos.y*this._tileMap.scale + this._tileMap.y);
                }
                arr_pos[j] = posInWorld;
            }
            cf.tileLocation.push(arr_pos);
        }
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
            // opacity: 128,
            scale: cf.bgSCALE
        });

        this._bgBotRight.attr({
            x: (this._bgBotLeft.width) * cf.bgSCALE,
            y:0,
            anchorX: 0,
            anchorY: 0,
            // opacity: 128,
            scale: cf.bgSCALE
        });

        this._bgTopLeft.attr({
            x:0,
            y:(this._bgBotLeft.height )* cf.bgSCALE,
            anchorX: 0,
            anchorY: 0,
            // opacity: 128,
            scale: cf.bgSCALE
        });

        this._bgTopRight.attr({
            x:(this._bgBotLeft.width)* cf.bgSCALE,
            y:(this._bgBotLeft.height)* cf.bgSCALE,
            anchorX: 0,
            anchorY: 0,
            // opacity: 128,
            scale: cf.bgSCALE
        });

    },

});