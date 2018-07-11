var mapFolder = "res/Art/Map/";
var buildingsFolder = "res/Art/Buildings/";
var effectsFolder = "res/Art/Effects/";
var guiFolder = "res/Art/GUIs/";

var res = {
    tilemap_tmx: mapFolder + "42x42map.tmx",
    bgTopLeft: mapFolder + "1_0000_Layer-3.png",
    bgBotLeft: mapFolder + "1_0001_Layer-1.png",
    bgTopRight: mapFolder + "1_0002_Layer-4.png",
    bgBotRight: mapFolder + "1_0003_Layer-2.png"
};

var g_preload= [
    res.tilemap_tmx,
    res.bgBotLeft,
    res.bgBotRight,
    res.bgTopLeft,
    res.bgTopRight
];