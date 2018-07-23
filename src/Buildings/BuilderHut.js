var BuilderHut = BuildingNode.extend({
    ctor: function(id, order, row, col)
    {
        this._size = cf.json_builder_hut["BDH_1"][order]["width"];
        this._CENTER_BUILDING_STR = "BDH_1";

        this._super(id, order, row, col);

        /* Add Center Building */
        this.addCenterBuilding(this._CENTER_BUILDING_STR);
    }
})