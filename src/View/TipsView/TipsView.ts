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

    public OpenView(data?: any): void 
    {
        super.OpenView(data);
        this.SetTipsMsg(data);
        Laya.timer.clearAll(this);
        var self = this;
        Laya.timer.once(3000,this,function()
        {   
            self.CloseView();
        })
    }

    public SetTipsMsg(msg : string): void 
    {
        this.tipsText.text = msg;
    }
}