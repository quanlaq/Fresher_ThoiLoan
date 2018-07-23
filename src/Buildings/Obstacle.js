/**
 * Created by CPU02326_Local on 7/23/2018.
 */
var Obstacle = BuildingNode.extend({
    ctor: function(id, type, row, col)
    {
        this._size = 2;
        this._super(id, type, row, col);
        this.addCenterBuilding("OBS_", 0);
    }
})