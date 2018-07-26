/**
 * Created by KienVN on 10/2/2017.
 */

gv.CMD = gv.CMD ||{};
gv.CMD.HAND_SHAKE = 0;
gv.CMD.USER_LOGIN = 1;

gv.CMD.USER_INFO = 1001;
gv.CMD.MOVE = 2001;

testnetwork = testnetwork||{};
testnetwork.packetMap = {};

/** Outpacket */

//Handshake
CmdSendHandshake = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setControllerId(gv.CONTROLLER_ID.SPECIAL_CONTROLLER);
            this.setCmdId(gv.CMD.HAND_SHAKE);
        },
        putData:function(){
            //pack
            this.packHeader();
            //update
            this.updateSize();
        }
    }
)
CmdSendUserInfo = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_INFO);
        },
        pack:function(){
            this.packHeader();
            this.updateSize();
        }
    }
)

CmdSendLogin = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.USER_LOGIN);
        },
        pack:function(user){
            this.packHeader();
            this.putString(user);
            this.updateSize();
        }
    }
)

CmdSendMove = fr.OutPacket.extend(
    {
        ctor:function()
        {
            this._super();
            this.initData(100);
            this.setCmdId(gv.CMD.MOVE);
        },
        pack:function(direction){
            this.packHeader();
            this.putShort(direction);
            this.updateSize();
        }
    }
)

/**
 * InPacket
 */

//Handshake
testnetwork.packetMap[gv.CMD.HAND_SHAKE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.token = this.getString();
        }
    }
);

testnetwork.packetMap[gv.CMD.USER_LOGIN] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
        }
    }
);


testnetwork.packetMap[gv.CMD.USER_INFO] = fr.InPacket.extend
(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function()
        {
            this.townHall = new Object();
            this.townHall.row = this.getByte();
            this.townHall.col = this.getByte();
            this.townHall.level = this.getByte();
            this.townHall.finishBuildOrUpgradeTime = this.getLong();

            var Amount = this.getByte();//Amount of goldStorage
            this.storage = new Object();
            if (Amount > 0)
                this.storage.gold = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.storage.gold.push(new Object());
                this.storage.gold[i].row = this.getByte();
                this.storage.gold[i].col = this.getByte();
                this.storage.gold[i].level = this.getByte();
                this.storage.gold[i].finishBuildOrUpgradeTime = this.getLong();
            }
            Amount = this.getByte();//Amount of elixirStorage
            if (Amount > 0)
                this.storage.elixir = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.storage.elixir.push(new Object());
                this.storage.elixir[i].row = this.getByte();
                this.storage.elixir[i].col = this.getByte();
                this.storage.elixir[i].level = this.getByte();
                this.storage.elixir[i].finishBuildOrUpgradeTime = this.getLong();
            }

            Amount = this.getByte();//Amount of darkElixirStorage
            if (Amount > 0)
                this.storage.darkElixir = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.storage.darkElixir.push(new Object());
                this.storage.darkElixir[i].row = this.getByte();
                this.storage.darkElixir[i].col = this.getByte();
                this.storage.darkElixir[i].level = this.getByte();
                this.storage.darkElixir[i].finishBuildOrUpgradeTime = this.getLong();
            }

            this.resource = new Object();
            Amount = this.getByte();//Amount of goldResource
            if (Amount > 0)
                this.resource.gold = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.resource.gold.push(new Object());
                this.resource.gold[i].row = this.getByte();
                this.resource.gold[i].col = this.getByte();
                this.resource.gold[i].level = this.getByte();
                this.resource.gold[i].lastHarvestTime = this.getLong();
            }
            Amount = this.getByte();//Amount of elixirResource
            if (Amount > 0)
                this.resource.elixir = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.resource.elixir.push(new Object());
                this.resource.elixir[i].row = this.getByte();
                this.resource.elixir[i].col = this.getByte();
                this.resource.elixir[i].level = this.getByte();
                this.resource.elixir[i].lastHarvestTime = this.getLong();
            }
            Amount = this.getByte();//Amount of darkElixirResource
            if (Amount > 0)
                this.resource.darkElixir = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.resource.darkElixir.push(new Object());
                this.resource.darkElixir[i].row = this.getByte();
                this.resource.darkElixir[i].col = this.getByte();
                this.resource.darkElixir[i].level = this.getByte();
                this.resource.darkElixir[i].lastHarvestTime = this.getLong();
            }

            Amount = this.getByte();
            if (Amount > 0)
            {
                this.laboratory = new Object();
                this.laboratory.row = this.getByte();
                this.laboratory.col = this.getByte();
                this.laboratory.level = this.getByte();
                this.laboratory.finishBuildOrUpgradeTime = this.getLong();
                if(this.laboratory.finishBuildOrUpgradeTime == 0)
                {
                    this.laboratory.finishResearchingTime = this.getLong();
                    if(this.laboratory.finishResearchingTime > 0)
                        this.laboratory.researchingTroop = this.getByte();
                }
            }

            Amount = this.getByte();//Amount of armyCamp
            this.armyCamp = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.armyCamp.push(new Object());
                this.armyCamp[i].row = this.getByte();
                this.armyCamp[i].col = this.getByte();
                this.armyCamp[i].level = this.getByte();
                this.armyCamp[i].finishBuildOrUpgradeTime = this.getLong();
            }

            Amount = this.getByte();//Amount of BAR_1
            if (Amount > 0)
                this.normalBarrack = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.normalBarrack.push(new Object());
                this.normalBarrack[i].row = this.getByte();
                this.normalBarrack[i].col = this.getByte();
                this.normalBarrack[i].level = this.getByte();
                this.normalBarrack[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.normalBarrack[i].finishBuildOrUpgradeTime == 0)
                {
                    this.normalBarrack[i].startTrainingTime = this.getLong();
                    if (this.normalBarrack[i].startTrainingTime > 0)
                    {
                        var QueueSize = this.getByte();
                        this.normalBarrack[i].trainingTroopTypes = []
                        this.normalBarrack[i].trainingQueue = []
                        for (i = 0; i < QueueSize; i += 1)
                        {
                            this.normalBarrack[i].trainingTroopTypes.push(this.getByte());
                            this.normalBarrack[i].trainingQueue.push(this.getShort());
                        }
                    }
                }
            }

            Amount = this.getByte();//Amount of BAR_2
            if (Amount > 0)
                this.specialBarrack = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.specialBarrack.push(new Object());
                this.specialBarrack[i].row = this.getByte();
                this.specialBarrack[i].col = this.getByte();
                this.specialBarrack[i].level = this.getByte();
                this.specialBarrack[i].finishBuildOrUpgradeTime = this.getLong();
                if (this.specialBarrack[i].finishBuildOrUpgradeTime == 0)
                {
                    this.specialBarrack[i].startTrainingTime = this.getLong();
                    if (this.specialBarrack[i].startTrainingTime > 0)
                    {
                        var QueueSize = this.getByte();
                        this.specialBarrack[i].trainingTroopTypes = []
                        this.specialBarrack[i].trainingQueue = []
                        for (i = 0; i < QueueSize; i += 1)
                        {
                            this.specialBarrack[i].trainingTroopTypes.push(this.getByte());
                            this.specialBarrack[i].trainingQueue.push(this.getShort());
                        }
                    }
                }
            }

            Amount = this.getByte();//Amount of builderHut
            this.builderHut = [];
            for (i = 0; i < Amount; i += 1)
            {
                this.builderHut.push(new Object());
                this.builderHut[i].row = this.getByte();
                this.builderHut[i].col = this.getByte();
            }

            //player
            this.name = this.getString();
            this.exp = this.getInt();
            this.vipPoint = this.getInt();

            this.coin = this.getInt();
            this.gold = this.getInt();
            this.elixir = this.getInt();
            this.darkElixir = this.getInt();

            this.troopLevel = [];
            this.troopAmount = [];
            for (i = 0; i < 18; i += 1)
            {
                this.troopLevel.push(this.getByte());
                this.troopAmount.push(this.getShort());
            }

            cc.log(JSON.stringify(this));
        }
    }
);


testnetwork.packetMap[gv.CMD.MOVE] = fr.InPacket.extend(
    {
        ctor:function()
        {
            this._super();
        },
        readData:function(){
            this.x = this.getInt();
            this.y = this.getInt();
        }
    }
);




