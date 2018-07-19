var cf = cf || {};

cf.SCALE = 0.5;

cf.bgSCALE = cf.SCALE*2;

cf.squareSize = 50*cf.SCALE;

cf.tileSize = {
    height: 57*cf.SCALE,
    width: 76*cf.SCALE
};

cf.offsetX = 40*cf.SCALE;

cf.buildingScale = cf.SCALE;

cf.tileLocation = [];

cf.shopType = {
    army: {
        name: "ARMY",
        tag: 10,
        str: "QUÂN ĐỘI"
        },
    res: {
        name: "RES",
        tag: 11,
        str: "TÀI NGUYÊN"
        },
    buyRes: {
        name: "BUY_RES",
        tag: 15,
        str: "NGÂN KHỐ"
        },
    defense: {
        name: "DEFENSE",
        tag: 14,
        str: "PHÒNG THỦ"
        },
    dc: {
        name: "DC",
        tag: 13,
        str: "TRANG TRÍ"
        },
    shield: {
        name: "SHIELD",
        tag: 12,
        str: "BẢO VỆ"
    }
};

cf.ShopItemList = null;
cf.jsonArmyCamp = null;
cf.jsonBarrack = null;
cf.jsonBuilderHut = null;
cf.jsonInitGame = null;
cf.jsonLabratory = null;
cf.jsonResource = null;
cf.jsonStorage = null;
cf.jsonTownHall = null;
cf.jsonTroop  = null;
cf.jsonTroopBase = null;
cf.ShopItemList = null;

cf.SHOP_BUTTON_TAG = 110;
cf.SETTING_BUTTON_TAG = 111;
cf.INVENTORY_BUTTON_TAG = 112;
cf.SHOP_TAG = 1010;

//function
cf.shopTagToName = function (tag) {
    switch (tag) {
        case 10:
            return cf.shopType.army.name;
        case 11:
            return cf.shopType.res.name;
        case 12:
            return cf.shopType.shield.name;
        case 13:
            return cf.shopType.buyRes.name;
        case 14:
            return cf.shopType.defense.name;
        case 15:
            return cf.shopType.buyRes.name;
        default:
            return null;
    }
};

cf.getCategoryTag = function(tag){
    return tag*20;
};

cf.shopTagToStr = function (tag) {
    switch (tag) {
        case 10:
            return cf.shopType.army.str;
        case 11:
            return cf.shopType.res.str;
        case 12:
            return cf.shopType.shield.str;
        case 13:
            return cf.shopType.buyRes.str;
        case 14:
            return cf.shopType.defense.str;
        case 15:
            return cf.shopType.buyRes.str;
        default:
            return null;
    }
};

cf.getJsonConfigFile = function (str) {
    var substr = str.substring(0, 3);
    switch(substr)
    {
        case "BDH":
            return cf.jsonBuilderHut;
        case "RES":
            return cf.jsonResource;
        case "STO":
            return cf.jsonStorage;
        case "AMC":
            return cf.jsonArmyCamp;
        case "DEF":
            return null;
        case "BAR":
            return cf.jsonBarrack;
    }

};