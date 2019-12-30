import GameConfig from "./GameConfig";
import AppConfig from "./AppConfig";
import User from "./User/User";
import { ui } from "./ui/layaMaxUI";
import LoadingView from "./View/LoadingView/LoadingView";
class Main {
	protected loadingUI: ui.View.LoadingUI = null;;
	protected loadingView: LoadingView = null;

	//预加载列表
	private readonly preLoadRes: Array<any> = new Array<any>();

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
		// //加载IDE指定的场景
		// GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
		this.GameInitLoad_CloudFlame();
	}

	//游戏初始化加载
	private GameInitLoad_CloudFlame(): void {
		Laya.loader.maxLoader = 50;
		this.InitLoadingView_CloudFlame();
		this.LoadRes_CloudFlame();
	}

	//初始化加载界面
	private InitLoadingView_CloudFlame(): void {
		this.loadingUI = new ui.View.LoadingUI();
		Laya.stage.addChild(this.loadingUI);
		this.loadingUI.width = Laya.stage.width;
		this.loadingUI.height = Laya.stage.height;
		this.loadingView = this.loadingUI.getComponent(LoadingView);
		this.loadingView.SetProcess_CloudFlame(0);
	}

	//添加预加载的资源	
	private PreLoadRes_CloudFlame(): void {
		this.preLoadRes.push({ url:"res/atlas/GameCommon.atlas", type: Laya.Loader.ATLAS });		
		this.preLoadRes.push({ url:"GameCommon/BG_Main.png", type: Laya.Loader.IMAGE });		
		this.preLoadRes.push({ url:"GameCommon/BG_Pop.png", type: Laya.Loader.IMAGE });		
	}

	//加载资源
	private LoadRes_CloudFlame(): void {
		this.PreLoadRes_CloudFlame();
		var resource: Array<any> = this.preLoadRes;
		var self = this;

		if (!Laya.Browser.onMiniGame) //本地或网页加载策略
		{
			if (resource.length > 0) {
				Laya.loader.load(resource, Laya.Handler.create(this, () => {
					self.LoadResComplate_CloudFlame();
				}), Laya.Handler.create(this, (res) => {
					self.loadingView.SetProcess_CloudFlame(res);
				}));
			}
			else {
				self.LoadResComplate_CloudFlame();
			}
		}
	}

	//加载资源完成
	private LoadResComplate_CloudFlame(): void {
		this.loadingView.SetProcess_CloudFlame(1);
		this.UserLogin_CloudFlame();
		this.CloadLoadingUI_CloudFlame();
		console.log("---游戏加载初始化完成---");
	}

	//用户登录
	private UserLogin_CloudFlame(): void {
		var self = this;
		if (!Laya.Browser.onMiniGame) //本地或网页登录
		{
			User.TestInitUser_CloudFlame();
			GameConfig.startScene && Laya.Scene.open(AppConfig.startScene, false, Laya.Handler.create(this, function () {
			}));
		}
	}

	//关闭加载界面
	protected CloadLoadingUI_CloudFlame(): void {
		if (this.loadingUI && !this.loadingUI.destroyed) {
			this.loadingUI.destroy();
		}
	}
}
//激活启动类
new Main();
