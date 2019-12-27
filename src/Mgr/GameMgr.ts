import ViewMgr, { ViewDef } from "./ViewMgr";

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
    
    onEnable(): void {
        console.log("GameMgr");
    }

    onStart(): void {
        this.PreCreateGame();
    }

    onDisable(): void {
    }

    private PreCreateGame(): void {
        //todo：这里添加初始化主场景的代码。
        var self = this;
        ViewMgr.instance.OpenView(ViewDef.GameStart,null,null);
    }
    
}