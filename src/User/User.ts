//游戏数据,为保持版本兼容，建议不要删除和修改字段名
export class UserGameData
{
    public  levelNum: number = 1;//当前关卡
    public  moneyNum: number = 0;//金币数量
    public  crystalNum: number = 0;//钻石数量    
}

export default class User extends Laya.Script 
{
    public static code: string = "";
    public static openId: string = "";
    public static token: string = null;
    public static nickName: string = "";
    public static gender:number = 0;

    public static get IsLogin_CloudFlame()
    {
        return (User.code != "") || (User.token != "");
    }

    private static readonly _gameData : UserGameData = new UserGameData();

    public static GetSaveData__CloudFlame() : string
    {
        return JSON.stringify(User._gameData);
    }


    public static TestInitUser_CloudFlame()
    {
        User._gameData.levelNum = 1;
        User._gameData.moneyNum = 10000000;
        User._gameData.crystalNum = 10000000;
    }

    public static InitiUser_CloudFlame(data)
    {
        if(data && 0 != data)
        {
            User._gameData.levelNum = data.levelNum;
            User._gameData.moneyNum = data.moneyNum;
            User._gameData.crystalNum = data.crystalNum;
        }
        else
        {
            //todo：处理没有获取到玩家数据的情况
        }     
    }

    public static SetLeveNum_CloudFlame(levelNum : number)
    {
        User._gameData.levelNum = levelNum;
    }

    public static GetLeveNum_CloudFlame() : number
    {
        return User._gameData.levelNum;
    }

    public static AddMoney_CloudFlame(add : number)
    {
        add = Math.ceil(add)
        var last = User._gameData.moneyNum
        User._gameData.moneyNum += add;
        // EventMgr.instance.dispatch(EventDef.Game_OnUserMoneyChange,
        //     {
        //         curr : User._gameData.moneyNum,
        //         last : last
        //     })
    }
    public static SubMoney_CloudFlame(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User._gameData.moneyNum
        User._gameData.moneyNum -= sub;
        if(User._gameData.moneyNum < 0)
        {
            User._gameData.moneyNum = 0;
        }
        // EventMgr.instance.dispatch(EventDef.Game_OnUserMoneyChange,
        //     {
        //         curr : User._gameData.moneyNum,
        //         last : last
        //     })
    }
    public static GetMoney_CloudFlame()
    {
        return User._gameData.moneyNum;
    }

    public static AddCrystal_CloudFlame(add : number)
    {
        add = Math.ceil(add)
        var last = User._gameData.crystalNum
        User._gameData.crystalNum += add;
        // EventMgr.instance.dispatch(EventDef.Game_OnUserCrystalChange,
        //     {
        //         curr : User._gameData.crystalNum,
        //         last : last
        //     })
    }
    public static SubCrystal_CloudFlame(sub : number)
    {
        sub = Math.ceil(sub)
        var last = User._gameData.crystalNum
        User._gameData.crystalNum -= sub;
        if(User._gameData.crystalNum < 0)
        {
            User._gameData.crystalNum = 0;
        }
        // EventMgr.instance.dispatch(EventDef.Game_OnUserCrystalChange,
        //     {
        //         curr : User._gameData.crystalNum,
        //         last : last
        //     })
    }
    public static GetCrystal_CloudFlame()
    {
        return User._gameData.crystalNum;
    }
}