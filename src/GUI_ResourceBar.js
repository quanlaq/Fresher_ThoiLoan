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

        switch(type)
        {
            case 1:
                this._currentCapacity = cf.user._currentCapacityGold;
                this._maxCapacity = cf.user._maxCapacityGold;
                break;
            case 2:
                this._currentCapacity = cf._currentCapacityElixir
        }

        this._currentCapacity = (type == 1)
    }
})