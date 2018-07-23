var Barrack = BuildingNode.extend({
    ctor: function(id, level, row, col)
    {
        this._size = cf.json_barrack["BAR_1"][level]["width"];
        this._CENTER_BUILDING_STR = "BAR_1_";

        this._super(id, level, row, col);

        /* Init Animation If Not Exist*/
        this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding(this._CENTER_BUILDING_STR);

        /* Add Effect */
        var effect = cc.Sprite(res.tmp_effect);
        effect.anchorX = 0.5;
        effect.anchorY = 0.5;
        effect.scale = cf.SCALE;
        this.addChild(effect, this._center_building.getLocalZOrder() + 1);
        effect.runAction(cf.animation_barrack[this._level].clone().repeatForever());
    },

    initAnimation: function()
    {
        if (this._level < 4) return;
        if (cf.animation_barrack[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_barrack_1_" + this._level +".plist", res.folder_effect + "effect_barrack_1_" + this._level +".png");
            cf.animation_barrack[this._level] = MainLayer.get_animation("effect_barrack_1_" + this._level + " ", 6);
        }
    }
})