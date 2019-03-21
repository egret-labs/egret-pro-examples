
export default class Looker extends paper.Behaviour {
    @paper.editor.property(paper.editor.EditType.VECTOR3)
    @paper.serializedField
    public readonly lookAtPoint: egret3d.Vector3 = egret3d.Vector3.create();

    @paper.editor.property(paper.editor.EditType.GAMEOBJECT)
    @paper.serializedField
    public target: paper.GameObject | null = null;

    public onUpdate() {
        const transform = this.gameObject.transform;
        const target = this.lookAtPoint;

        if (this.target) {
            target.copy(this.target.transform.position);
        }

        transform.lookAt(target);
    }
}
