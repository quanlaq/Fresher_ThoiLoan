var Shop = cc.Layer.extend({
    _isOpen: false,
    _close:             null,
    _titleBackground:   null,
    _typeArmy:          null,
    _typeBuyRes:        null,
    _typeDC:            null,
    _typeDefense:       null,
    _typeRes:           null,
    _typeShield:        null,

    ctor: function(){
        this._super();
        var scrollView = new ccui.ScrollView();
        scrollView.setDirection(ccui.ScrollView.DIR_HORIZONTAL);
        scrollView.setTouchEnabled(true);
        scrollView.setBounceEnabled(true);
        // scrollView.setBackGroundImage(shopGUI.demo);
        var shopCat = new ShopCategory("ARMY");
        scrollView.setContentSize(cc.size(shopCat._slotCategory.width, shopCat._slotCategory.height));
        scrollView.setInnerContainerSize(cc.size(shopCat._slotCategory.width * 55, shopCat._slotCategory.height));
        scrollView.setAnchorPoint(cc.p(0.5, 0.5));
        this.addChild(scrollView);

        cc.log(scrollView.width);

        scrollView.width = cc.winSize.width;
        scrollView.addChild(shopCat);
        shopCat.setPosition(cc.p(0 ,0));
        var s = new ShopCategory("RES");
        s.setPosition(cc.p(s._slotCategory.width, 0));
        scrollView.addChild(s);
        //
        // for(var i = 0; i < 50; i++){
        //     var s;
        //     if(i%6=== 0) s = new ShopCategory("ARMY");
        //     else if(i % 6 === 1) s = new ShopCategory("RES");
        //     else if(i % 6 === 2) s = new ShopCategory("DEFENSE");
        //     else if(i % 6 === 3) s = new ShopCategory("RES");
        //     else if(i % 6 === 4) s = new ShopCategory("SHIELD");
        //     else if(i % 6 === 5) s = new ShopCategory("DC");
        //     s.setAnchorPoint(cc.p(0.5, 0.5));
        //     s.setPosition(cc.p(i * s.width, 0 ));
        //     scrollView.addChild(s);
        //     s = null;
        // }

   },

    init: function(){
        this.x = cc.winSize.width*2;
        this.y = cc.winSize.height*2;
    },
    // onExit: function(){
    //
    // },

    onAppear: function(){
        this._isOpen = true;
        this.x = cc.winSize.width/2;
        this.y = cc.winSize.height/2;
    },

    onDisappear: function() {
        this._isOpen = false;
        this.x = cc.winSize.width*2;
        this.y = cc.winSize.height*2;

    },

    loadResource: function () {
    }



});