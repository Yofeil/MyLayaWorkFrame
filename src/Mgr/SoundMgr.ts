
export default class SoundMgr {
    public static readonly soundResPath = "subRes/sound/"
    public static readonly instance: SoundMgr = new SoundMgr();
    
    private bgm:any;

    private constructor() {
    }

    public get Enabled()
    {
        return this._enabled;
    }

    public set Enabled(e : boolean)
    {
        if(!e)
        {
            this.StopBGM();
        }
        this._enabled = e;
    }

    protected _enabled : boolean = true;

    public GetSoundUrl(name: string) : string {
        let url = SoundMgr.soundResPath + name + ".mp3";
        return url;
    }

    public PlaySound(name: string): void {
        if(!this._enabled)
            return;
        var url = this.GetSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            var sound = laya.utils.Pool.getItem(name);
            if (sound == null) {
                sound = wx.createInnerAudioContext();
                sound.src = SoundMgr.soundResPath + name + ".mp3";
                sound.onEnded(() => {
                    laya.utils.Pool.recover(name, sound);
                    sound.offEnded();
                })
            }
            sound.play();
        } else {
            Laya.SoundManager.playSound(url, 1);
        }
    }

    public PlayBGM(name): void{
        if(!this._enabled)
            return;
        let url = this.GetSoundUrl(name);
        if (Laya.Browser.onMiniGame) {
            if(!this.bgm)
            {
                this.bgm = wx.createInnerAudioContext();
            }
            this.bgm.stop();
            this.bgm.src = url;
            this.bgm.loop = true;
            this.bgm.play();
        } else {
            Laya.SoundManager.playMusic(url, 0);
        }
    }

    public StopBGM(): void{
        if (Laya.Browser.onMiniGame) {
            if(this.bgm){
                this.bgm.stop();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}