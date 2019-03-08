export default class RotateBehaviour extends paper.Behaviour {

    private time = 0;

    @paper.serializedField
    @paper.editor.property(paper.editor.EditType.FLOAT)
    speed: number = 1;

    onUpdate(deltaTime: number) {
        this.time += deltaTime;
        const rotation = this.gameObject.transform.localRotation;
        const x = this.time * this.speed;
        const newRotation = rotation.fromEuler({ x, y: 0, z: 0 })
        this.gameObject.transform.setLocalRotation(newRotation);
    }
}