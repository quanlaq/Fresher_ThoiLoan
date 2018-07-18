var ShopItemList = cc.Layer.extend({
    _scrollView: null,
    _itemList: null,
    _titleBackground:   null,
    ctor: function(tag){
        this._super();
        this.visible = true;
        var color = new cc.LayerColor(cc.color(64,64,64,255));
        color.width = cc.winSize.width;
        color.height = cc.winSize.height;
        this.addChild(color, -1);
        this.init(tag);
    },

    init: function(tag){
        this.getItemList(tag, this.getItemList);

        cc.log("length + " + this._itemList.length);
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        // scrollView.setContentSize(cc.size(shopCat._slotCategory.width, shopCat._slotCategory.height));
        // scrollView.setInnerContainerSize(cc.size(shopCat._slotCategory.width * 55, shopCat._slotCategory.height));
        scrollView.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(scrollView);
        scrollView.width = cc.winSize.width;
    },
    //
    loadItemList: function(tag, cb){
        var shopName = cf.shopTagToName(tag);
        var list;
        cc.loader.loadJson("res/ConfigJson/ShopList.json", function(error, data){
            if(error){
                cc.log(error);
                return error;
            }
            list = data["ShopList"][shopName];
        });
        cc.callFunc(function() {
            cb(list);
        }, this);
    },



});