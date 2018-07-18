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
        tag: 10
        },
    res: {
        name: "RES",
        tag: 11
        },
    buyRes: {
        name: "BUY_RES",
        tag: 15
        },
    defense: {
        name: "DEFENSE",
        tag: 14
        },
    dc: {
        name: "DC",
        tag: 13
        },
    shield: {
        name: "SHIELD",
        tag: 12
    }
};

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