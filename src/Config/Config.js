var cf = cf || {};

cf.BIG_MAP_SCALE = 0.5;

cf.SCALE = 1;
cf.bgSCALE = cf.SCALE*2;
cf.squareSize = 50*cf.SCALE;
cf.buildingScale = cf.SCALE;

cf.tileSize = {
    height: 57*cf.SCALE,
    width: 76*cf.SCALE
};

cf.time_refresh = 0.1;

/* Move Building */
cf.building_selected = 0;
cf.move_able = false;
cf.moved = false;


cf.tileLocation = [];
cf.map_location = [];
cf.map_array = [];

cf.user = {
    id: null,
    name: "User Name",
    maxCapacityGold: null,
    maxCapacityElixir: null,
    maxCapacityDarkElixir: null,

    currentCapacityGold: null,
    currentCapacityElixir: null,
    currentCapacityDarkElixir: null,
    curentCoin: null,

}

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
cf.json_army_camp = null;
cf.json_barrack = null;
cf.json_builder_hut = null;
cf.json_townhall = null;
cf.json_init_game = null;
cf.json_laboratory = null;
cf.json_resource = null;
cf.json_storage = null;
cf.json_troop = null;
cf.json_troop_base = null;;
cf.ShopItemList = null;

cf.animation_army_camp = [];
cf.animation_barrack = [];
cf.animation_barrack_working = null;
cf.animation_coin_drop = [];
cf.animation_lab = [];
cf.animation_lab_researching = null;
cf.animation_level_up = null;
cf.animation_loading = null;
cf.animation_res_1 = [];
cf.animation_res_2 = [];
cf.animation_town_hall = null;
cf.animation_construct_level_up = null;

cf.SHOP_BUTTON_TAG = 110;
cf.SETTING_BUTTON_TAG = 111;
cf.INVENTORY_BUTTON_TAG = 112;
cf.SHOP_TAG = 1010;

cf.r_old = null;
cf.c_old = null;
cf.current_r = null;
cf.current_c = null;

cf.MAX_BUILDING_TYPE = 20;
cf.MAX_BUILDING_LEVEL = 20;

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