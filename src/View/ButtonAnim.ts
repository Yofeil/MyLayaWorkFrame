import SoundMgr from "../Mgr/SoundMgr";

export default class ButtonAnim extends Laya.Script {

    public bUseSound : boolean  = true;

    private nFirstScaleX : number = 1;
    private nFirstScaleY : number = 1;

    constructor() { super(); }

    onAwake(): void {
        this.nFirstScaleX = (this.owner as Laya.Sprite).scaleX;
        this.nFirstScaleY = (this.owner as Laya.Sprite).scaleY;
        
        this.owner.on(Laya.Event.MOUSE_DOWN, this, this.onDown_CloudFlame);
        this.owner.on(Laya.Event.MOUSE_UP, this, this.onUp_CloudFlame);
        this.owner.on(Laya.Event.MOUSE_OUT, this, this.onUp_CloudFlame);
    }

    onDisable(): void {
        this.owner.offAll();
        Laya.Tween.clearAll(this);
    }

    public onDown_CloudFlame(): void {
        Laya.Tween.to(this.owner, { scaleX: 0.95 * this.nFirstScaleX, scaleY: 0.95 * this.nFirstScaleY }, 25);
        if(this.bUseSound)
        {
            SoundMgr.instance.PlaySound_CloudFlame("clickBtn");
        }
    }

    private onUp_CloudFlame(): void {
        Laya.Tween.to(this.owner, { scaleX: this.nFirstScaleX, scaleY: this.nFirstScaleY }, 25);
    }
}