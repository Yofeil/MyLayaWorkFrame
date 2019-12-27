export default class ViewAutoScale extends Laya.Script {
    onAwake(){
        var curVeiw : Laya.View = this.owner as Laya.View;
        var scaleX = Laya.stage.width / curVeiw.width;
        var scaleY = Laya.stage.height / curVeiw.height;
        var scale = scaleX < scaleY ? scaleX : scaleY;
        curVeiw.scale(scale,scale);
        curVeiw.x = (Laya.stage.width - curVeiw.width * scale)/2;
        curVeiw.y = (Laya.stage.height - curVeiw.height * scale)/2;
    }
}