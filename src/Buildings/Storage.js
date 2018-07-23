/**
 * Created by CPU02326_Local on 7/20/2018.
 */
var Storage = BuildingNode.extend({
    _type: null,
    _CURRENT_CAPACITY_TYPE: null,

    ctor: function(id, level, row, col, type, current_capacity_type)
    {
        this._CENTER_BUILDING_STR = (type == 1) ? "STO_1_" : "STO_2_"
        this._size = (type == 1) ? this._size = cf.json_storage["STO_1"][level]["width"] : cf.json_storage["STO_2"][level]["width"];
        this._CURRENT_CAPACITY_TYPE = current_capacity_type;

        this._super(id, level, row, col);
        this._type =  type;

        /* Init Animation If Not Exist*/
        //this.initAnimation();

        /* Add Center Building */
        this.addCenterBuilding(this._CENTER_BUILDING_STR, this._CURRENT_CAPACITY_TYPE);

        /* Effect */
        //var effect = cc.Sprite(res.tmp_effect);
        //effect.anchorX = 0.5;
        //effect.anchorY = 0.5;
        //
        //this.addChild(effect, 5);
        //effect.runAction(((this._type == 1) ? cf.animation_res_1[this._level].clone() : cf.animation_res_2[this._level]).clone().repeatForever());
    },

    initAnimation: function()
    {
        if (this._type == 1 && cf.animation_res_1[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_1_" + this._level + ".plist", res.folder_effect + "effect_res_1_" + this._level + ".png");
            cf.animation_res_1[this._level] = MainLayer.get_animation("effect_res_1_" + this._level + " ", 10);
        }

        if (this._type == 2 && cf.animation_res_2[this._level] == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_res_2_" + this._level + ".plist", res.folder_effect + "effect_res_2_" + this._level + ".png");
            cf.animation_res_2[this._level] = MainLayer.get_animation("effect_res_2_" + this._level + " ", 10);
        }
    }
})