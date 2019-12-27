
export default class SoundMgr {
    public static readonly soundResPath = "subRes/sound/"
    public static readonly instance: SoundMgr = new SoundMgr();
    
    private bgm:any;

    private constructor() {
    }

    public get Enabled_CloudFlame()
    {
        return this.enabledSound;
    }

    public set Enabled_CloudFlame(e : boolean)
    {
        if(!e)
        {
            this.StopBGM_CloudFlame();
        }
        this.enabledSound = e;
    }

    protected enabledSound : boolean = true;

    public GetSoundUrl_CloudFlame(name: string) : string {
        let url = SoundMgr.soundResPath + name + ".mp3";
        return url;
    }

    public PlaySound_CloudFlame(name: string): void {
        if(!this.enabledSound)
            return;
        var url = this.GetSoundUrl_CloudFlame(name);
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

    public PlayBGM_CloudFlame(name): void{
        if(!this.enabledSound)
            return;
        let url = this.GetSoundUrl_CloudFlame(name);
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

    public StopBGM_CloudFlame(): void{
        if (Laya.Browser.onMiniGame) {
            if(this.bgm){
                this.bgm.stop();
            }
        }else{
            Laya.SoundManager.stopMusic();
        }
    }

}