export default class User extends Laya.Script 
{
    public static code: string = "";
    public static openId: string = "";
    public static token: string = null;
    public static gender:number = 0;

    public static nickName: string = "";
    public static skinMax:number = 0;

    public static skinIndex:number = 0;//当前皮肤索引
    public static levelNum: number = 1;//当前关卡
    public static moneyNum: number = 0;//金币数量

    public static get IsLogin_CloudFlame()
    {
        return (User.code != "") || (User.token != "");
    }

    public static GetSaveData__CloudFlame() : string
    {
        return JSON.stringify({"skinIndex":this.skinIndex,"levelNum":this.levelNum,"moneyNum":this.moneyNum});
    }


    public static TestInitUser_CloudFlame()
    {
        User.nickName = "User";
        User.skinIndex = 0;
        User.levelNum = 1;
        User.moneyNum = 10000000;
    }

    public static InitiUser_CloudFlame(data)
    {
        if(data && 0 != data)
        {
            User.skinIndex = data.skinIndex;
            User.levelNum = data.levelNum;
            User.moneyNum = data.moneyNum;
        }
        else
        {
            //todo：处理没有获取到玩家数据的情况
        }     
    }
}