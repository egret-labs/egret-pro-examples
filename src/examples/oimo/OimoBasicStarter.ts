
export default class OimoBasicStarter extends paper.Behaviour {

    public onAwake() {
        paper.Application.systemManager.register(StarterSystem, paper.Application.gameObjectContext);
    }
}

class StarterSystem extends paper.BaseSystem<paper.GameObject> {

    protected getMatchers() {
        return [
            paper.Matcher.create<paper.GameObject>(egret3d.Transform, egret3d.oimo.Rigidbody),
        ];
    }

    public onEnable() {
        for (let i = 0; i < 100; i++) {
            const cubeSize = egret3d.Vector3.create(Math.random() * 1.5 + 0.5, Math.random() * 1.5 + 0.5, Math.random() * 1.5 + 0.5).release();
            const gameObject = egret3d.creater.createGameObject(`Box ${i}`, {
                mesh: egret3d.DefaultMeshes.CUBE,
                material: egret3d.DefaultMaterials.MESH_PHYSICAL,
                castShadows: true,
                receiveShadows: true,
            });
            gameObject.transform.setLocalPosition(
                Math.random() * 8.0 - 4.0,
                Math.random() * 8.0 + 4.0,
                Math.random() * 8.0 - 4.0
            );
            gameObject.transform.setLocalScale(cubeSize);

            const rigidbody = gameObject.addComponent(egret3d.oimo.Rigidbody);
            const boxCollider = gameObject.addComponent(egret3d.oimo.BoxCollider);
            boxCollider.box.size = cubeSize;
            rigidbody.mass = 1.0;
        }
    }

    public top: number = 20.0;
    public bottom: number = -20.0;
    public area: number = 10.0;

    public onTickCleanup() {
        for (const entity of this.groups[0].entities) {
            if (entity.transform.localPosition.y < this.bottom) {
                entity.transform.setLocalPosition(
                    Math.random() * this.area - this.area * 0.5,
                    this.top,
                    Math.random() * this.area - this.area * 0.5
                );
                entity.getComponent(egret3d.oimo.Rigidbody)!.syncTransform().linearVelocity = egret3d.Vector3.ZERO;
            }
        }
    }
}