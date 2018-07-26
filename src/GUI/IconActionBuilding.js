var IconActionBuilding = ccui.Button.extend({
    _type: null,
    _txt: null,

    ctor: function(type)
    {
        this._type = type;
        switch(type)
        {
            case cf.CODE_BUILDING_INFO: this._super((buildingGUI.iconInfo));
                this._txt = cc.LabelBMFont("Info", font.soji20);
                break;
            case cf.CODE_BUILDING_UPGRADE: this._super(buildingGUI.iconUpgrade);
                this._txt = cc.LabelBMFont("Upgrade", font.soji20);
                break;
            default:
                break;
        }

        this.scale = 1.5;

        this._txt.attr({
            anchorX: 0.5,
            anchorY: 0.5,
            x: this.width/2,
            scale: 1/1.5,
            y: this._txt.height/2*this._txt.scale + 5
        });
        this.addChild(this._txt,1);

        this.addTouchEventListener(this.updateBuilding, this);

    },

    logFunc: function() {
        if(this._type === cf.CODE_BUILDING_UPGRADE) cc.log("Upgrade this building : " + cf.building_selected);
        else cc.log("Show info : " + cf.building_selected);
    },

    updateBuilding: function(sender, type) {
        switch (type){
            case ccui.Widget.TOUCH_BEGAN:
                this.logFunc();
                sender.setScale(sender.scale*1.02);
                break;
            case ccui.Widget.TOUCH_MOVED:
                break;
            case ccui.Widget.TOUCH_ENDED:
                sender.setScale(sender.scale/1.02);
                break;
            case ccui.Widget.TOUCH_CANCELED:
                sender.setScale(sender.scale/1.02);
                break;
        }
    }
});