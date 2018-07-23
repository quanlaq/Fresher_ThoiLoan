var BuildingNode = cc.Node.extend({
    _id: null,
    _level: null,
    _row: null,
    _col: null,
    _size: null,

    _type: null,
    _is_active: true,
    _finishing_time: null,

    _center_building: null,
    _grass: null,
    _grass_shadow: null,
    _arrow: null,
    _green:null,
    _red: null,
    _defence: null,

    /* Button Commit & Cancel Build */
    _gui_commit_build: null,
    _gui_cancel_build: null,

    /* Start Build GUI */
    _info_bar: null,
    _info_bar_bg: null,
    _txt_time_remaining: null,
    _time_remaining: null,
    _time_total: null,
    _BAR_WIDTH: 311,
    _BAR_HEIGHT: 36,
    _effect_level_up: null,

    _CENTER_BUILDING_STR: null,

    /* Order In User Building List */
    _orderInUserBuildingList: null,

    ctor: function(id, level, row, col)
    {
        this._super();
        this.scale = cf.SCALE

        this._id = id;
        this._row = row;
        this._col = col;
        this._level = level;

        //grass shadow
        this._grass_shadow = new GrassShadow(this._size);
        this.addChild(this._grass_shadow, 0);
        this._grass_shadow.visible = false;

        //grass
        this._grass = new grass(this._size);
        this.addChild(this._grass, this._grass_shadow.getLocalZOrder() + 1);

        //arrow
        this._arrow = cc.Sprite(res.map_BG + "arrowmove" + (this._size ) + ".png")
        this._arrow.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 0
        })
        this.addChild(this._arrow, this._grass.getLocalZOrder() + 1);

        //green
        this._green = cc.Sprite(res.map_BG + "GREEN_" + (this._size ) + ".png");
        this._green.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 2
        })
        this._green.visible = false;
        this.addChild(this._green, this._arrow.getLocalZOrder() + 1);

        //red
        this._red = cc.Sprite(res.map_BG + "RED_" + (this._size ) + ".png");
        this._red.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            scale: 2
        })
        this._red.visible = false;
        this.addChild(this._red, this._red.getLocalZOrder() + 1);

        //defence
        this._defence = cc.Sprite(res.map_obj + "upgrading.png");
        this._defence.attr({
            anchorX: 0.5,
            anchorY: 0.75,
            scale: this.scale * this._size / 1.5,
            visible: false
        })
        this.addChild(this._defence, 20);

        //Button commit build
        this._gui_commit_build = ccui.Button(res.folder_gui_action_building + "accept.png");
        this._gui_commit_build.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            y: cf.tileSize.height * cf.SCALE * 2,
            x: - cf.tileSize.width * cf.SCALE,
            visible: false
        });
        this.addChild(this._gui_commit_build, this._defence.getLocalZOrder() + 1);

        //Button cancel build
        this._gui_cancel_build = ccui.Button(res.folder_gui_action_building + "cancel.png");
        this._gui_cancel_build.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            y: cf.tileSize.height * cf.SCALE * 2,
            x: cf.tileSize.width * cf.SCALE,
            visible: false
        });
        this.addChild(this._gui_cancel_build, this._defence.getLocalZOrder() + 1);

        // Location
        this.x = cf.tileLocation[row][col].x;
        this.y = cf.tileLocation[row][col].y - (this._size/2) * cf.tileSize.height;


        //Update zOrder
        this.updateZOrder();

        /* Effect Level Up */
        this.initEffectLevelUp();


        this.schedule(this.updateBuildStatus, 1);

        //this.showBuildingButton();
    },

    initEffectLevelUp: function()
    {
        this._effect_level_up = cc.Sprite(res.tmp_effect);
        this._effect_level_up.attr({
            anchorX: 0.5,
            anchorY: 1,
            x: 0,
            y: 3 * cf.tileSize.height,
            scale: cf.SCALE,
            visible: false,
        });
        this.addChild(this._effect_level_up, this._defence.getLocalZOrder() + 1);
    },

    updateBuildStatus: function()
    {
        if (this._is_active == true)
        {
            this._effect_level_up.visible = false;
            return;
        }
        if (this._time_remaining <= 0)
        {
            this.onCompleteBuild();
            this._is_active = true;
            this.return;
        }
        this._time_remaining -= 1;
        this._txt_time_remaining.setString(Math.floor(this._time_remaining / 60) + "m" + (this._time_remaining % 60) + "s");
        this._info_bar_bg.setTextureRect(cc.rect(0, 0, this._BAR_WIDTH * (this._time_total - this._time_remaining) / this._time_total, this._BAR_HEIGHT))
    },

    onCompleteBuild: function()
    {
        this._effect_level_up.visible = true;
        if (cf.animationConstructLevelUp == null)
        {
            cc.spriteFrameCache.addSpriteFrames(res.folder_effect + "effect_construct_levelup.plist", res.folder_effect + "effect_construct_levelup.png");
        }
        this._txt_time_remaining.visible = false;
        this._info_bar.visible = false;
        this._info_bar_bg.visible = false;
        this._defence.visible = false;

        this._effect_level_up.runAction(cc.Sequence(MainLayer.get_animation("effect_construct_levelup ", 6).clone()).clone());
    },

    addCenterBuilding: function(str, order_image)
    {
        switch(str)
        {
            case "TOW_1_":
                this._center_building = new building(res.folder_town_hall + str + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case "BDH_1":
                this._center_building = new building(res.folder_builder_hut + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case "AMC_1_":
                this._center_building = new building(res.folder_army_camp + str + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case "BAR_1_":
                this._center_building = new building(res.folder_barrack + str + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case "RES_1_":
                this._center_building = new building(res.folder_gold_mine + str + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case "RES_2_":
                this._center_building = new building(res.folder_elixir_collector + str + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            case "STO_1_":
                this._center_building = new building(res.folder_gold_storage + str + this._level + "/" + res.image_postfix_1 + order_image + res.image_postfix_2);
                break;
            case "STO_2_":
                this._center_building = new building(res.folder_elixir_storage + str + this._level + "/" + res.image_postfix_1 + order_image + res.image_postfix_2);
                break;
            case "canon_":
                this._center_building = new building(res.folder_canon + str + this._level + "/" + res.image_postfix_1 + order_image + res.image_postfix_2);
                break;
            case "OBS_":
                this._center_building = new building(res.folder_obs + this._level + "/" + res.image_postfix_1 + "0" + res.image_postfix_2);
                break;
            default:
                break;
        }
        this.addChild(this._center_building, this._defence.getLocalZOrder() - 1);

    },

    onClick: function()
    {
        this._green.visible = true;
        var scale_out = cc.scaleTo(0.25, 1.0);
        this._grass_shadow.visible = true;
        this._arrow.runAction(scale_out);
    },

    onEndClick: function()
    {
        var scale_in = cc.scaleTo(0.25, 0);
        this._arrow.runAction(scale_in);
        this._green.visible = false;
        this._grass_shadow.visible = false;
    },

    showBuildingButton: function()
    {
        var self = this;
        this._gui_cancel_build.visible = true;
        this._gui_commit_build.visible = true;
        this._gui_cancel_build.addClickEventListener(function(){self.hideBuildingButton()});
        this._gui_commit_build.addClickEventListener(function(){
            self.startBuild();
        });
    },

    startBuild: function()
    {
        this._time_remaining = this.getTimeRequire()/60;
        this._time_total = this._time_remaining;
        this._is_active = false;

        /* Time Bar */
        this._info_bar = cc.Sprite(res.folder_gui_build + "info_bar.png", cc.rect(0,0, this._BAR_WIDTH, this._BAR_HEIGHT));
        this._info_bar.scale = 0.5 * cf.SCALE;
        this._info_bar.attr({
            anchorX: 0,
            anchorY: 1,
            x: - this._BAR_WIDTH / 2 * this._info_bar.scale,
            y: cf.tileSize.height * cf.SCALE * 2
        });
        this.addChild(this._info_bar, this._defence.getLocalZOrder() + 1);
        this._info_bar_bg = cc.Sprite(res.folder_gui_build + "info_bar_BG.png", cc.rect(0,0, 0, this._BAR_HEIGHT));
        this._info_bar_bg.scale = 0.5 * cf.SCALE;
        this._info_bar_bg.attr({
            anchorX: 0,
            anchorY: 1,
            x: - this._BAR_WIDTH / 2 * this._info_bar_bg.scale,
            y: cf.tileSize.height * cf.SCALE * 2
        });
        this.addChild(this._info_bar_bg, this._defence.getLocalZOrder() + 1);

        /* Time Text */
        this._txt_time_remaining = cc.LabelBMFont.create(Math.floor(this._time_total / 60) + "m" + (this._time_total % 60) + "s",  font.soji20);
        this._txt_time_remaining.attr({
            anchorX: 0.5,
            anchorY: 0,
            x: 0,
            y: cf.tileSize.height * cf.SCALE * 2
        })
        this.addChild(this._txt_time_remaining, this._defence.getLocalZOrder() + 1);

        this._defence.visible = true;

        this.hideBuildingButton();
    },

    getTimeRequire: function()
    {
        switch (this._CENTER_BUILDING_STR)
        {
            case "TOW_1_":
                return (cf.json_townhall["TOW_1"][this._level]["buildTime"]);
                break;
            case "BDH_1":
                return 0;
                break;
            case "AMC_1_":
                return (cf.json_army_camp["AMC_1"][this._level]["buildTime"]);
                break;
            case "BAR_1_":
                return (cf.json_barrack["BAR_1"][this._level]["buildTime"]);
                break;
            case "RES_1_":
                return (cf.json_resource["RES_1"][this._level]["buildTime"]);
                break;
            case "RES_2_":
                return (cf.json_resource["RES_2"][this._level]["buildTime"]);
                break;
            case "STO_1_":
                return (cf.json_storage["STO_1"][this._level]["buildTime"]);
                break;
            case "STO_2_":
                return (cf.json_storage["STO_2"][this._level]["buildTime"]);
                break;
            case "canon_":
                return this._level * 150;
                break;
            default:
                break;
        }
    },

    hideBuildingButton: function()
    {
        var self = this;
        this._gui_cancel_build.visible = false;
        this._gui_commit_build.visible = false;
        this._gui_cancel_build.addClickEventListener(function() {});
        this._gui_commit_build.addClickEventListener(function() {});
    },

    //getEventListenerForButton: function(button, code)
    //{
    //    var self = this;
    //    var eventLitener = cc.EventListener.create({
    //        event: cc.EventListener.TOUCH_ONE_BY_ONE,
    //        swallowTouches: true,
    //        onTouchBegan: function(touch, event)
    //        {
    //            var target = event.getCurrentTarget();
    //            var location = target.convertToNodeSpace(touch.getLocation());
    //            var s = target.getContentSize();
    //            var rect = cc.rect(0, 0, s.width, s.height)
    //            if (cc.rectContainsPoint(rect, location))
    //                cc.log((code == self.COMMIT_BUILD_CODE ? "COMMIT " : "CANCEL " + self._id))
    //            return false;
    //        },
    //        onTouchMoved: function(touch, event)
    //        {
    //            //
    //        },
    //        onTouchended: function(touch, event)
    //        {
    //            //
    //        }
    //    })
    //
    //    return eventLitener;
    //},

    updateZOrder: function()
    {
        this.setLocalZOrder(this._row + this._col);
    }
})
