import ViewBase from "../ViewBase";

export default class TipsView extends ViewBase
{
    protected bg : Laya.Sprite;
    protected tipsText : Laya.Text;

    constructor() { super(); }

    onAwake()
    {
        this.bg = this.owner.getChildByName("Bg") as Laya.Sprite;
        this.bg.x = Laya.stage.width / 2 - this.bg.width / 2;
        this.tipsText = this.bg.getChildByName("Text") as Laya.Text;
    }

    public OpenView_CloudFlame(data?: any): void 
    {
        super.OpenView_CloudFlame(data);
        this.SetTipsMsg_CloudFlame(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000,this,function()
        {   
            self.CloseView_CloudFlame();
        })
    }

    public SetTipsMsg_CloudFlame(msg : string): void 
    {
        this.tipsText.text = msg;
    }
}