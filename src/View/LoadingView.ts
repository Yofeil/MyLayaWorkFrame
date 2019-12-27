
export default class LoadingView extends Laya.Script
{    
    protected processWidth : number = 0;

    protected processBarBg : Laya.Clip;
    protected processBar : Laya.Clip;
    protected background : Laya.Clip;
    
    onAwake()
    {
        this.background = this.owner.getChildByName("Bg") as Laya.Clip;
        this.processBarBg = this.background.getChildByName("processBarBg") as Laya.Clip;

        if(this.processBarBg)
        {
            this.processBar = this.processBarBg.getChildByName("processBar") as Laya.Clip;
            this.processWidth = this.processBar.width;
        }

        else
        {
            this.processBar = this.background.getChildByName("processBar") as Laya.Clip;
            this.processWidth = Laya.stage.width;
        }
    }    

    onUpdate()
    {
        this.background.width = Laya.stage.width;
        this.background.height = Laya.stage.height;
        if(!this.processBarBg)
        {
            this.processWidth = Laya.stage.width;
        }
    }    

    public SetProcess_CloudFlame(process : number)
    {
        if(process < 0 )
            process = 0;
        if(process > 1 )
            process = 1;
        var width = this.processWidth * process;
        if(width < 1)
            width = 1;
        this.processBar.width = width;
    }
}