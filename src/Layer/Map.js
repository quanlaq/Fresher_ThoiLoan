var Map = cc.Node.extend({
    _tileMap: null,
    _bgTopLeft: null,
    _bgTopRight: null,
    _bgBotLeft: null,
    _bgBotRight: null,
    _width: null,
    _height: null,

    ctor: function(){
        this._super();
        this.init();
    },

    init: function(){
        this.scale = cf.BIG_MAP_SCALE;

        this.loadTileMap();
        this.loadBackground();
        this._width = (this._bgBotLeft.width + this._bgBotRight.width)*cf.bgSCALE;
        this._height = (this._bgBotLeft.height + this._bgTopLeft.height)*cf.bgSCALE;
        this.initTileLocation();
        this.add_building();
    },

    add_building: function()
    {
        // id, level, row, col, size
        var army_camp = new ArmyCamp(1, 8, cf.json_init_game["map"]["AMC_1"]["posX"], cf.json_init_game["map"]["AMC_1"]["posY"])
        this.locate_map_array(army_camp)
        this.addChild(army_camp);
        army_camp.updateZOrder();

        // id, level, row, col, size
        var barrack = new Barrack(2, 6, 30, 30);
        this.locate_map_array(barrack)
        this.addChild(barrack);

        // id, level, row, col, size
        var town_hall = new TownHall(3, 8, cf.json_init_game["map"]["TOW_1"]["posX"], cf.json_init_game["map"]["TOW_1"]["posY"])
        this.locate_map_array(town_hall);
        this.addChild(town_hall);
        //
        //id, level, row, col, type
        var resource_1 = new Resource(4, 8, cf.json_init_game["map"]["RES_1"]["posX"], cf.json_init_game["map"]["RES_1"]["posY"], 1);
        this.locate_map_array(resource_1)
        this.addChild(resource_1);
        //
        var resource_2 = new Resource(5, 8, 15, 17, 2);
        this.locate_map_array(resource_2)
        this.addChild(resource_2);

        //id, order, row, col, type
        var builder_hut = new BuilderHut(6, 2, cf.json_init_game["map"]["BDH_1"]["posX"], cf.json_init_game["map"]["BDH_1"]["posY"])
        this.locate_map_array(builder_hut)
        this.addChild(builder_hut, 2);

        //id, level, row, col, type, current capacity type(random)
        var cct = Math.floor(Math.random() * 4);
        var storage_1 = new Storage(7, 8, 30, 25, 1, cct);
        this.locate_map_array(storage_1);
        this.addChild(storage_1, 2)
        //
        cct = Math.floor(Math.random() * 4);
        var storage_2 = new Storage(8, 8, 13, 28, 2, cct);
        this.locate_map_array(storage_2);
        this.addChild(storage_2, 2);

        //id, level, row, col, current orientation(random)
        var co = Math.floor(Math.random() * 5)
        var canon = new Canon(8, 2, 25, 10, co);
        this.locate_map_array(canon);
        this.addChild(canon, 2);
        //
        cc.eventManager.addListener(this.get_event_listener(town_hall), town_hall);
        cc.eventManager.addListener(this.get_event_listener(army_camp), army_camp);
        cc.eventManager.addListener(this.get_event_listener(barrack), barrack);
        cc.eventManager.addListener(this.get_event_listener(resource_1), resource_1);
        cc.eventManager.addListener(this.get_event_listener(resource_2), resource_2);
        cc.eventManager.addListener(this.get_event_listener(storage_1), storage_1);
        cc.eventManager.addListener(this.get_event_listener(storage_2), storage_2);
        cc.eventManager.addListener(this.get_event_listener(builder_hut), builder_hut);
        cc.eventManager.addListener(this.get_event_listener(canon), canon);
    },

    get_event_listener: function(b)
    {
        var self = this;
        var size = b._size;

        var listener1 = cc.EventListener.create({
            event: cc.EventListener.TOUCH_ONE_BY_ONE,
            swallowTouches: true,
            onTouchBegan: function(touch, event)
            {
                var locationNote = b.convertToNodeSpace(touch.getLocation());
                var w = b._size * cf.tileSize.width / 2 ;
                var h = b._size * cf.tileSize.height / 2 ;
                var x = locationNote.x;
                var y = locationNote.y;
                var polygon = [ [ -w, 0 ], [ 0, h ], [ w, 0 ], [ 0, -h ] ];

                if (MainLayer.inside([ x, y], polygon) && (cf.building_selected == 0))
                {
                    b.onClick();
                    b.showBuildingButton();
                    cf.building_selected = b.id;
                    cf.current_r = b._row;
                    cf.current_c = b._col;
                    return true
                }
                else
                {
                    b.onMoveClick();
                    b.hideBuildingButton();
                    cf.building_selected = 0;
                    return false
                }
                cf.r_old = b._row;
                cf.c_old = b._col;
                return false;
            },
            onTouchMoved: function(touch, event)
            {
                if (b.id != cf.building_selected) return;
                //cf.building_selected = 0;
                var location = self.getParent().convertTouchToNodeSpace(touch);
                var location_touch = touch.getLocation();
                var tile_location = null;

                for (r = 1; r < 41; r++)
                    for (c = 1; c < 41; c++)
                    {
                        tile_location = cf.tileLocation[r][c];
                        var x = tile_location.x * cf.BIG_MAP_SCALE;
                        var y = tile_location.y * cf.BIG_MAP_SCALE;
                        var polygon = [[x - cf.tileSize.width/2 * cf.BIG_MAP_SCALE, y], [x, y + cf.tileSize.height/2 * cf.BIG_MAP_SCALE], [x + cf.tileSize.width/2 * cf.BIG_MAP_SCALE, y], [x , y - cf.tileSize.height/2 * cf.BIG_MAP_SCALE]];
                        if (MainLayer.inside([location_touch.x - self.x, location_touch.y - self.y], polygon)) {
                            var row = r - Math.floor(size / 2);
                            var col = c - Math.floor(size / 2);
                            if (row == cf.r_old && col == cf.c_old) return;
                            if (!self.check_out_of_map(row, col, size)) return;
                            cf.r_old = row;
                            cf.c_old = col;
                            b._row = row
                            b._col = col;
                            b.setLocalZOrder(200);
                            b.x = cf.tileLocation[b._row][b._col].x;
                            b.y = cf.tileLocation[b._row][b._col].y - (size / 2) * cf.tileSize.height;

                            if (!self.none_space(b._row, b._col, size, b._id))
                            {
                                b._red.visible = true;
                                b._green.visible = false;
                            }
                            else
                            {
                                b._red.visible = false;
                                b._green.visible = true;
                            }
                            return true
                        }
                    }

                return true;
            },
            onTouchEnded: function(touch, event)
            {
                b.updateZOrder();
                b._red.visible = false;
                b.onMoveClick();
                if (!self.none_space(b._row, b._col, size, b._id))
                {
                    b._row = cf.current_r;
                    b._col = cf.current_c;
                    b.x = cf.tileLocation[b._row][b._col].x;
                    b.y = cf.tileLocation[b._row][b._col].y - (size / 2) * cf.tileSize.height;
                }
                else
                {
                    self.unlocate_map_array(cf.current_r, cf.current_c, size);
                    self.locate_map_array(b)
                }
            }
        })

        return listener1;
    },

    initTileLocation: function(){
        cf.map_array.push(0);
        for (i = 1; i < 41; i++)
        {
            var tmp_arr = [];
            for (j = 0; j < 41; j++) tmp_arr.push(0)
            cf.map_array.push(tmp_arr);
        }

        cf.tileLocation.push([0]);
        var mapLayer = this._tileMap.getLayer("bg2");
        for (var i = 1; i <= 40; i++)
        {
            var arr_pos = [];
            for(var k = 0; k<=40; k++) arr_pos.push(k);
            for ( var j = 1; j <= 40; j++)
            {
                r = i;
                c = j;
                var pos = null;

                if ((r+c) % 2 === 0)
                {
                    var current_tile = mapLayer.getTileAt(r, c);
                    //pos = cc.p(current_tile.x + 0.5 * cf.tileSize.width,current_tile.y + 0.5 * cf.tileSize.height );
                    pos = cc.p(current_tile.x + 0.5 * cf.tileSize.width,current_tile.y + cf.tileSize.height );
                    var posInWorld = cc.p(pos.x*this._tileMap.scale + this._tileMap.x, pos.y*this._tileMap.scale + this._tileMap.y);
                }
                else
                {
                    current_tile = mapLayer.getTileAt(r + 1, c);
                    pos = cc.p(current_tile.x,current_tile.y + 1.5 * cf.tileSize.height );
                    posInWorld = cc.p(pos.x*this._tileMap.scale + this._tileMap.x, pos.y*this._tileMap.scale + this._tileMap.y);
                }
                arr_pos[j] = posInWorld;
            }
            cf.tileLocation.push(arr_pos);
        }
    },

    loadTileMap: function(){
        this._tileMap = new cc.TMXTiledMap("res/Art/Map/42x42map.tmx");
        this._tileMap.x = 506*cf.SCALE;
        this._tileMap.y = 481.3*cf.SCALE;
        this._tileMap.scale = cf.SCALE;
        this.addChild(this._tileMap, 0, 1);
    },

    loadBackground: function() {
        this._bgBotLeft = new cc.Sprite(res.bgBotLeft);
        this._bgBotRight = new cc.Sprite(res.bgBotRight);
        this._bgTopLeft = new cc.Sprite(res.bgTopLeft);
        this._bgTopRight = new cc.Sprite(res.bgTopRight);
        this._bgBotLeft.attr({
            x:0,
            y:0,
            anchorX: 0,
            anchorY: 0,
            //opacity: 128,
            scale: cf.bgSCALE
        });
        this._bgBotRight.attr({
            x: (this._bgBotLeft.width) * cf.bgSCALE,
            y:0,
            anchorX: 0,
            anchorY: 0,
            //opacity: 128,
            scale: cf.bgSCALE
        });
        this._bgTopLeft.attr({
            x:0,
            y:(this._bgBotLeft.height )* cf.bgSCALE,
            anchorX: 0,
            anchorY: 0,
            //opacity: 128,
            scale: cf.bgSCALE
        });
        this._bgTopRight.attr({
            x:(this._bgBotLeft.width)* cf.bgSCALE,
            y:(this._bgBotLeft.height)* cf.bgSCALE,
            anchorX: 0,
            anchorY: 0,
            //opacity: 128,
            scale: cf.bgSCALE
        });
        this.addChild(this._bgTopRight, 1);
        this.addChild(this._bgTopLeft,  1);
        this.addChild(this._bgBotRight, 1);
        this.addChild(this._bgBotLeft,  1);
    },

    unlocate_map_array: function(row, col, size)
    {
        for (r = row; r < row + size; r ++)
            for (c = col; c < col + size; c++)
                cf.map_array[r][c] = 0;
    },

    locate_map_array: function(b)
    {
        var r = b._row;
        var c = b._col;
        var size = b._size;

        for (i = r; i < r + size; i++)
            for (j = c; j < c + size; j++)
                cf.map_array[i][j] = b._id;
    },

    none_space: function(row, col, size, id)
    {
        for (r = row; r < row + size; r++)
            for (c = col; c < col + size; c++ )
                if (cf.map_array[r][c] != 0 && cf.map_array[r][c] != id)
                {
                    return false;
                }
        return true;
    },

    check_out_of_map: function(row, col, size)
    {
        if (row < 1 || col < 1 || row + size > 41 || col + size > 41) return false;
        return true;
    },

    log_map_array: function()
    {
        for (r = 1; r < 41; r ++)
        {
            var s = "";
            for (c = 1; c < 41; c++) s = s + " " + cf.map_array[r][c];
            cc.log(s)
        }
    },

    get_avaiable_position: function(size)
    {
        var flag = false;
        var dis = 100;
        var pos = cc.p(0, 0);
        var there_blank_space = false;
        for (r = 1; r <= 40 - size + 1; r++)
            for (c = 1; c <= 40 - size + 1; c++)
            {
                var blank = true;
                for (i = r; i <= r + size - 1; i++)
                    for (j = c; j <= c + size - 1; j++)
                        if (cf.map_array[i][j] != 0)
                        {
                            blank = false;
                            break;
                        }
                if (blank)
                {
                    if (Math.sqrt( Math.pow(r - 20, 2) + Math.pow(c - 20, 2)) < dis)
                    {
                        pos = cc.p(r, c);
                        dis = Math.sqrt( Math.pow(r - 20, 2) + Math.pow(c - 20, 2));
                    }
                    flag = true;
                }
            }
        if (flag) return pos
        else return cc.p(20, 20);
    }
});