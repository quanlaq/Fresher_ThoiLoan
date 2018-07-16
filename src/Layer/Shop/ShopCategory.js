var ShopCategory = cc.Sprite.extend({
    _catalogyBg:        null,
    _slotCategory:      null,
    _titleBackground:   null,
    _title:             null,
    _typeImage:         null,
    ctor: function(type){
        this._super();
        var tp;
        this._title = cc.LabelBMFont.create('QUÂN ĐỘI',  font.soji20);
        switch(type){
            case "ARMY":
                tp=shopGUI.typeArmy;
                this._title.setString("QUÂN ĐỘI");
                break;
            case "RES":
                tp=shopGUI.typeRes;
                this._title.setString("TÀI NGUYÊN");
                break;
            case "SHIELD":
                tp=shopGUI.typeShield;
                this._title.setString("BẢO VỆ");
                break;
            case "DC":
                tp=shopGUI.typeDC;
                this._title.setString("TRANG TRÍ");
                break;
            case "DEFENSE":
                tp=shopGUI.typeDefense;
                this._title.setString("PHÒNG THỦ");
                break;
            case "BUY_RES":
                tp=shopGUI.typeBuyRes;
                this._title.setString("NGÂN KHỐ");
                break;
            default:
                break;
        }

        this._typeImage = new cc.Sprite(tp);
        this._catalogyBg = new cc.Sprite(shopGUI.catalogyBg);
        this._titleBackground = new cc.Sprite(shopGUI.titleBackground);
        this._slotCategory = new cc.Sprite(shopGUI.slotCatalogy);

        this.init();
    },

    init: function(){
        this.addChild(this._slotCategory, 0);
        this.addChild(this._catalogyBg, 1);
        this.addChild(this._typeImage, 2);
        this.addChild(this._titleBackground, 3);
        this.addChild(this._title, 4);

        this._slotCategory.attr({
           x: 0,
           y: 0,
           anchorX: 0,
           anchorY: 0
        });

        this._catalogyBg.attr({
            x: this._slotCategory.width/2,
            y: this._slotCategory.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this._typeImage.attr({
            x: this._slotCategory.width/2,
            y: this._slotCategory.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this._titleBackground.attr({
            x: this._slotCategory.width/2,
            y: this._titleBackground.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });

        this._title.attr({
            x: this._slotCategory.width/2,
            y: this._titleBackground.height/2,
            anchorX: 0.5,
            anchorY: 0.5
        });
    }

});