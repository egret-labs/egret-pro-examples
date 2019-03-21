export default class Wander extends paper.Behaviour {
    @paper.editor.property(paper.editor.EditType.FLOAT)
    @paper.serializedField
    public radius: float = 1.0;

    @paper.editor.property(paper.editor.EditType.VECTOR3)
    @paper.serializedField
    public readonly speed: egret3d.Vector3 = egret3d.Vector3.create(1.0, 0.7, 0.4);

    @paper.editor.property(paper.editor.EditType.VECTOR3)
    @paper.serializedField
    public readonly center: egret3d.Vector3 = egret3d.Vector3.create();

    @paper.editor.property(paper.editor.EditType.GAMEOBJECT)
    @paper.serializedField
    public target: paper.GameObject | null = null;

    public onUpdate() {
        const time = paper.clock.time;
        const radius = this.radius;
        const timeScale = this.speed;
        const center = this.center;

        if (this.target) {
            center.copy(this.target.transform.position);
        }

        this.gameObject.transform.setLocalPosition(
            Math.sin(time * timeScale.x) * radius + center.x,
            Math.cos(time * timeScale.y) * radius + center.y,
            Math.cos(time * timeScale.z) * radius + center.z,
        );
    }
}