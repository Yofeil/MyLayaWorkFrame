import GameConfig from "./GameConfig";
import User from "./User/User";
import HttpUnit from "./Net/HttpUnit";
import { ui } from "./ui/layaMaxUI";
import LoadingView from "./View/LoadingView";
import WXAPI from "./WXAPI";

class Main {
	protected loadingUI : ui.View.LoadingUI = null;
	protected loadingView : LoadingView = null;
	//预加载列表
	private readonly preLoadRes : Array<any> = new Array<any> ();

	constructor() {
		//根据IDE设置初始化引擎		
		if (window["Laya3D"]) Laya3D.init(GameConfig.width, GameConfig.height);
		else Laya.init(GameConfig.width, GameConfig.height, Laya["WebGL"]);
		Laya["Physics"] && Laya["Physics"].enable();
		Laya["DebugPanel"] && Laya["DebugPanel"].enable();
		Laya.stage.scaleMode = GameConfig.scaleMode;
		Laya.stage.screenMode = GameConfig.screenMode;
		Laya.stage.alignV = GameConfig.alignV;
		Laya.stage.alignH = GameConfig.alignH;
		//兼容微信不支持加载scene后缀场景
		Laya.URL.exportSceneToJson = GameConfig.exportSceneToJson;

		//打开调试面板（通过IDE设置调试模式，或者url地址增加debug=true参数，均可打开调试面板）
		if (GameConfig.debug || Laya.Utils.getQueryString("debug") == "true") Laya.enableDebugPanel();
		if (GameConfig.physicsDebug && Laya["PhysicsDebugDraw"]) Laya["PhysicsDebugDraw"].enable();
		if (GameConfig.stat) Laya.Stat.show();
		Laya.alertGlobalError = true;

		//激活资源版本控制，version.json由IDE发布功能自动生成，如果没有也不影响后续流程
		Laya.ResourceVersion.enable("version.json", Laya.Handler.create(this, this.onVersionLoaded), Laya.ResourceVersion.FILENAME_VERSION);
	}

	onVersionLoaded(): void {
		//激活大小图映射，加载小图的时候，如果发现小图在大图合集里面，则优先加载大图合集，而不是小图
		Laya.AtlasInfoManager.enable("fileconfig.json", Laya.Handler.create(this, this.onConfigLoaded));
	}

	onConfigLoaded(): void {
		//加载IDE指定的场景
		//GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		Laya.loader.maxLoader = 50;
		this.InitLoadingView();
		//加载资源
		this.LoadRes();
		
	}

	//初始化加载界面
	private InitLoadingView(): void{
		this.loadingUI = new ui.View.LoadingUI();		
		Laya.stage.addChild(this.loadingUI);		
		this.loadingUI.width = Laya.stage.width;
		this.loadingUI.height = Laya.stage.height;
		this.loadingView = this.loadingUI.getComponent(LoadingView);
		this.loadingView.setProcess(0);
	}

	//添加预加载的资源	
	private PreLoadRes(): void{
		//this._preLoadRes.push({ url: AppConfig.ResServer + "/json/example.json", type: Laya.Loader.JSON });		
	}

	//加载资源
	private LoadRes(): void{
		this.PreLoadRes();
		var resource: Array<any> = this.preLoadRes;
		var self = this;
		if(Laya.Browser.onMiniGame){
			var loadSubResTask: any = Laya.Browser.window["wx"].loadSubpackage({
				name: 'subRes',
				success: (res) => {
					// 分包加载成功,开始预加载资源
					if(resource.length > 0)
					{
						Laya.loader.load(resource, Laya.Handler.create(this, () => {
							self.LoadResComplate();//预加载完成
						}), Laya.Handler.create(this, (res) => {
							//todo:跟新进度条
							self.loadingView.setProcess(res / 2 + 0.5);
						}));
					}
					else
					{
						self.LoadResComplate();//预加载完成
					}
				},
				fail: (res) => 
				{
					this.LoadRes();//加载失败，重新加载
				}
			});			
			loadSubResTask.onProgressUpdate(res => 				
			{
				self.loadingView.setProcess(res / 2);
			});
		}
		else{
			if (resource.length > 0) {
				Laya.loader.load(resource, Laya.Handler.create(this, () => {
					self.LoadResComplate();
				}), Laya.Handler.create(this, (res) => {
					self.loadingView.setProcess(res);
				}));
			}
			else {
				self.LoadResComplate();
			}
		}
	}

	//加载资源完成
	private LoadResComplate(): void{
		this.loadingView.setProcess(1);
		this.UserLogin();
		this.CloadLoadingUI();
		console.log("---游戏加载完成---");
	}

	//用户登录
	private  UserLogin(): void{
		var self = this;
		if(Laya.Browser.onMiniGame)
		{
			WXAPI.wxLogin_CloudFlame(function (code) {
				User.code = code
				HttpUnit.login(
				(res)=> 
				{
					if(res.code == 1)
					{
						console.log("登陆成功！！！");
						User.token = res.data.token;
						User.openId = res.data.openid;
						//ALD.aldSendOpenId(User.openId);
						HttpUnit.getGameData((res)=>{
							console.log("获取用户数据成功！！！");
							if(1 == res.code)
							{
								User.InitiUser_CloudFlame(res.data);
							}
							else
							{
								User.InitiUser_CloudFlame(null);
							}
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						},(res)=>{
							console.log("获取用户数据失败！！！");
							User.token = "";
							User.openId = "";
							User.InitiUser_CloudFlame(null);
							GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
								
							}));
						})
					}
					else
					{
						console.log("登陆失败！！！" + res);
						User.InitiUser_CloudFlame(null);
						GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
							
						}));
					}
				},
				(res) => 
				{
					console.log("登陆失败！！！" + res);
					User.InitiUser_CloudFlame(null);
					GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {
						
					}));
				})
			}, null)
		}		
		else
		{
			User.TestInitUser_CloudFlame();//测试
			GameConfig.startScene && Laya.Scene.open(GameConfig.startScene, false, Laya.Handler.create(this, function () {				
			}));
		}
	}

	//关闭加载界面
	protected CloadLoadingUI(): void{
		if(this.loadingUI && !this.loadingUI.destroyed)
		{
			this.loadingUI.destroy();
		}
	}
}
//激活启动类
new Main();
