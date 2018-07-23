/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var User = cc.Class.extend({
    _id: null,
    _name: "User Name",
    _maxCapacityGold: null,
    _maxCapacityElixir: null,
    _maxCapacityDarkElixir: null,

    _currentCapacityGold: null,
    _currentCapacityElixir: null,
    _currentCapacityDarkElixir: null,
    _currentCoin: null,

    _builderNumber: null,

    _buildingList: [],
    _buildingListCount: [],
    /*
    0: TownHall
    1: Gold Storage
    2: Elixir Storage
    3: Dark Elixir Storage
    4: Gold Resource
    5: Elixir Resource
    6: Dark Elixir Resource
    7: Laboratory
    8: Army Camp
    9: Barrack 1
    10: Barrack 2
    11: Builder Hut
     */


    ctor: function(id, name)
    {
        //this._super();
        this._id = id;
        this._name = name;

        this._currentCapacityGold = cf.json_init_game["player"]["gold"];
        this._currentCapacityElixir = cf.json_init_game["player"]["elixir"];
        this._currentCapacityDarkElixir = cf.json_init_game["player"]["darkElixir"];
        this._currentCoin = cf.json_init_game["player"]["coin"];
        this.initBuildingList();

    },

    initBuildingList: function()
    {
        for (var i = 0; i < cf.MAX_BUILDING_TYPE; i++)
        {
            this._buildingList.push([]);
            this._buildingListCount.push(0);
        }
    }
})