import ViewMgr, { ViewDef } from "./ViewMgr";
import WXAPI from "../WXAPI";
import SoundMgr from "./SoundMgr";

export default class GameMgr extends Laya.Script {    
    private static instance: GameMgr = null;
    public static GetInstance(): GameMgr { return GameMgr.instance; }
    
    // public get CurLevel()
    // {
    //     return this.curLevel;
    // }
    // protected curLevel : Level;

    constructor() { 
        super(); 
        GameMgr.instance = this;
    }

    onAwake()  {        
        (this.owner as Laya.View).scaleY = Laya.stage.height / (this.owner as Laya.View).height;
        (this.owner as Laya.View).scaleX = Laya.stage.width / (this.owner as Laya.View).width;

        WXAPI.CheckUpdate_CloudFlame();        
    }
    
    onEnable(): void {
    }

    onStart(): void {
        this.PreCreateGame_CloudFlame();
    }

    onDisable(): void {
    }

    private PreCreateGame_CloudFlame(): void {
        //todo：这里添加初始化主场景的代码。
        var self = this;
        ViewMgr.instance.OpenView_CloudFlame(ViewDef.GameStart,null,null);
        SoundMgr.instance.PlayBGM_CloudFlame("bgm");
    }
    
}