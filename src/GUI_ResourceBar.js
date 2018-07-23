/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var GUI_ResourceBar = cc.Node.extend({
    /*
        1: Gold
        2: Elixir
        3: Dark Elixir
        4: Coin
     */
    _type: null,
    _icon: null,
    _maxCapacity: null,
    _currentCapacity: null,

    ctor: function(type)
    {
        this._super();
        this.setAnchorPoint(cc.p(1, 1));

        this._currentCapacity = (type == 1) ? cf.user._currentCapacityGold : (type == 2)? cf.user._currentCapacityElixir : (type == 3) ? cf.user._currentCapacityDarkElixir : cf.user._currentCoin;
        this._maxCapacity = (type == 1) ? cf.user._maxCapacityGold : (type == 2) ? cf.user._maxCapacityElixir : (type == 3) ? cf.user._maxCapacityDarkElixir : 0;

        switch (type)
        {
            case 1:
                this._icon = cc.Sprite(res.folder_gui_main + "")
        }
    }
})