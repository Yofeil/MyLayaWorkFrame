import ViewMgr, { ViewDef } from "../Mgr/ViewMgr";

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
        this.AddEvent();
    }

    onDisable(): void {
        this.RemoveEvent();
    }

    onDestroy(): void {
        this.RemoveEvent();
    }
    
    public OpenView(data?: any): void {
        this.data = data;
        this.Show()
        if(this.onOpenEvent)
        {
            this.onOpenEvent();
        }
    }

    public AddEvent() {

    }

    public RemoveEvent() {
        Laya.timer.clearAll(this);
    }

    public CloseView() 
    {
        ViewMgr.instance.CloseView(this.viewDef);
    }

    public Hide()
    {
        (this.owner as Laya.View).visible = false;
        this.onHide();
    }

    public Show()
    {
        (this.owner as Laya.View).visible = true;
        this.onShow();
    }

    public ViewIsHide()
    {
        return (this.owner as Laya.View).alpha == 0;
    }

    protected onHide(){}
    protected onShow(){}
    protected onClose()
    {
        Laya.timer.clearAll(this);
        Laya.Tween.clearAll(this);
        if(this.onCloseEvent)
        {
            this.onCloseEvent();
        }
    }
}