import ViewMgr, { ViewDef } from "./ViewMgr";
import SoundMgr from "./SoundMgr";

export default class GameMgr extends Laya.Script { 

    public static instance: GameMgr = null;

    constructor() { 
        super(); 
        GameMgr.instance = this;
    }

    onAwake()  {        
        (this.owner as Laya.View).scaleY = Laya.stage.height / (this.owner as Laya.View).height;
        (this.owner as Laya.View).scaleX = Laya.stage.width / (this.owner as Laya.View).width;
   }

    onStart(): void {
        //temp 添加读档存档
        this.PreCreateGame_CloudFlame();
    }
    
    private PreCreateGame_CloudFlame(): void {
        //todo：这里添加初始化主场景的代码。
        var self = this;
        ViewMgr.instance.OpenView_CloudFlame(ViewDef.GameOver,null,null);
        SoundMgr.instance.PlayBGM_CloudFlame("bgm");
    }
}