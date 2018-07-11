var map = cc.Sprite.extend({
    _tileMap: null,
    _bgTopLeft: null,
    _bgTopRight: null,
    _bgBotLeft: null,
    _bgBotRight: null,
   ctor: function(){
       this._super();
       this.init();
   },


    init: function(){

    },


    loadTileMap: function(){

        this._tileMap = new cc.TMXTiledMap("res/Art/Map/42x42map.tmx");

    },

    loadBackground: function(){

    }

});