
import ViewBase from "../View/ViewBase";

export enum ViewDef
{
    None = "",
    TipsView = "View/TipsView.json",
    GameStart = "View/GameStart.json",
    Gaming = "View/Gaming.json",
    GameOver = "View/GameOver.json",
    //todo:添加你的界面
}

//界面管理器
export default class ViewMgr 
{
    public static readonly instance: ViewMgr = new ViewMgr();
    protected readonly views : any = {};

    public OpenView_CloudFlame(viewType :ViewDef,data? : any,oncomplate? : Function): void 
    {
        if(this.views[viewType])
        {  
            var view = this.views[viewType];
            let coms = view._components;
            let viewBase : ViewBase = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as ViewBase
                        viewBase.OpenView_CloudFlame(data);
                        break;
                    }
                }
            }
            if(oncomplate)
            {
                oncomplate(viewBase);
            }
            return;
        }
        var viewUrl = String(viewType)
        var self = this;
        Laya.Scene.load(viewUrl,Laya.Handler.create(this, function (owner: any) {
            Laya.stage.addChild(owner);
            var view = owner as Laya.View;
            self.views[viewType] = view;
            let coms = owner._components;
            let viewBase : ViewBase = null;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        viewBase = element as ViewBase;
                        element._viewDef = viewType;
                        viewBase.OpenView_CloudFlame(data);
                        break;
                    }
                }
            }
            if(oncomplate)
            {
                oncomplate(viewBase);
            }
        }));
    }

    public CloseView_CloudFlame(viewType :ViewDef) 
    {
        var view : Laya.View = this.views[viewType];
        if(view)
        {
            var owner = view as any;
            let coms = owner._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.onClose();
                        break;
                    }
                }
            }
            view.removeSelf();
            view.destroy();
            this.views[viewType] = null;
        }
    }

    public ShowView_CloudFlame(viewType :ViewDef) 
    {
        var view  = this.views[viewType];
        if(view)
        {
            let coms = view._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.show();
                        break;
                    }
                }
            }
        }
    }

    public HideView_CloudFlame(viewType :ViewDef) 
    {
        var view = this.views[viewType];
        if(view)
        {
            let coms = view._components;
            if(coms){
                for (let index = 0; index < coms.length; index++) {
                    const element = coms[index];
                    if(element._viewBase){
                        element.hide();
                        break;
                    }
                }
            }
        }
    }

    public GetView_CloudFlame(viewType :ViewDef) : Laya.View
    {
        return this.views[viewType];
    }

    public ShowTips_CloudFlame(msg : string)
    {
        this.OpenView_CloudFlame(ViewDef.TipsView,msg);
    }
}