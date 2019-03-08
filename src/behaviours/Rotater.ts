
export default class Rotater extends paper.Behaviour {

    @paper.editor.property(paper.editor.EditType.VECTOR3)
    public readonly speed: egret3d.Vector3 = egret3d.Vector3.create(0.0, 0.05, 0.0);

    public onUpdate(deltaTime: number) {
        this.gameObject.transform.rotate(egret3d.Vector3.create().multiplyScalar(deltaTime, this.speed).release());
    }
}