import ViewBase from "../ViewBase";
import ViewMgr, { ViewDef } from "../../Mgr/ViewMgr";

export default class GameOver extends ViewBase{
    protected popWindow : Laya.Sprite = null;

    protected closeBtn : Laya.Sprite = null;
    protected backBtn : Laya.Sprite = null;
    protected replayBtn : Laya.Sprite = null;
    protected scoreText : Laya.Text = null;

    onAwake(){
        this.popWindow = this.owner.getChildByName("PopWindow") as Laya.Sprite;

        this.closeBtn = this.popWindow.getChildByName("CloseBtn") as Laya.Sprite;
        this.backBtn = this.popWindow.getChildByName("BackBtn") as Laya.Sprite;
        this.replayBtn = this.popWindow.getChildByName("ReplayBtn") as Laya.Sprite;
        this.scoreText = this.popWindow.getChildByName("ScoreNum") as Laya.Text;

        this.InitScore_CloudFlame();
    }


    AddEvent_CloudFlame(){
        this.closeBtn.on(Laya.Event.CLICK,this,this.OnCloseOrBackBtn_CloudFlame);
        this.backBtn.on(Laya.Event.CLICK,this,this.OnCloseOrBackBtn_CloudFlame);
        this.replayBtn.on(Laya.Event.CLICK,this,this.OnRePlayBtn_CloudFlame);
    }

    RemoveEvent_CloudFlame(){
        this.closeBtn.off(Laya.Event.CLICK,this,this.OnCloseOrBackBtn_CloudFlame);
        this.backBtn.off(Laya.Event.CLICK,this,this.OnCloseOrBackBtn_CloudFlame);
        this.replayBtn.off(Laya.Event.CLICK,this,this.OnRePlayBtn_CloudFlame);
    }

    private InitScore_CloudFlame():void{
        this.scoreText.text = "0";
    }

    private OnCloseOrBackBtn_CloudFlame():void{        
        ViewMgr.instance.OpenView_CloudFlame(ViewDef.GameStart,null,()=>{
            ViewMgr.instance.CloseView_CloudFlame(ViewDef.GameOver);
            ViewMgr.instance.CloseView_CloudFlame(ViewDef.Gaming);
        });
    }

    private OnRePlayBtn_CloudFlame():void{   
        ViewMgr.instance.CloseView_CloudFlame(ViewDef.GameOver);
        ViewMgr.instance.CloseView_CloudFlame(ViewDef.Gaming);
        ViewMgr.instance.OpenView_CloudFlame(ViewDef.Gaming,null,null);
    }
      

}