import viewMgr, { ViewDef } from "../Mgr/ViewMgr";

//界面基类，所有功能模块界面继承于这个类。这种类型的界面不能嵌套。
export default class ViewBase extends Laya.Script 
{
    public onCloseEvent : Function = null;
    public onOpenEvent : Function = null;
    
    protected readonly viewBase : boolean  = true
    protected viewDef : ViewDef = ViewDef.None;
    protected data : any = {};

    onAwake(): void {
        //删除时自动释放
        (this.owner as Laya.View).autoDestroyAtClosed = true;
        (this.owner as Laya.View).height = Laya.stage.height;
    }

    onEnable(): void {
        this.AddEvent_CloudFlame();
    }

    onDisable(): void {
        this.RemoveEvent_CloudFlame();
    }

    onDestroy(): void {
        this.RemoveEvent_CloudFlame();
    }
    
    public OpenView_CloudFlame(data?: any): void {
        this.data = data;
        this.Show_CloudFlame()
        if(this.onOpenEvent)
        {
            this.onOpenEvent();
        }
    }

    public AddEvent_CloudFlame() {

    }

    public RemoveEvent_CloudFlame() {
        Laya.timer.clearAll(this);
    }

    public CloseView_CloudFlame() 
    {
        viewMgr.instance.CloseView_CloudFlame(this.viewDef);
    }

    public Hide_CloudFlame()
    {
        (this.owner as Laya.View).visible = false;
        this.onHide_CloudFlame();
    }

    public Show_CloudFlame()
    {
        (this.owner as Laya.View).visible = true;
        this.onShow_CloudFlame();
    }

    public ViewIsHide_CloudFlame()
    {
        return (this.owner as Laya.View).alpha == 0;
    }

    protected onHide_CloudFlame(){}
    protected onShow_CloudFlame(){}
    protected onClose_CloudFlame()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        if(this.onCloseEvent)
        {
            this.onCloseEvent();
        }
    }
}