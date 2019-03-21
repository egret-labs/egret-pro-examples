
export default class OimoColliderStarter extends paper.Behaviour {

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
            let entity: paper.GameObject | null = null;

            switch (Math.floor(Math.random() * 5)) {
                case 0: {
                    const size = egret3d.Vector3.create(Math.random() * 1.5 + 0.5, Math.random() * 1.5 + 0.5, Math.random() * 1.5 + 0.5).release();
                    entity = egret3d.creater.createGameObject(`Box ${i}`, {
                        mesh: egret3d.DefaultMeshes.CUBE,
                        material: egret3d.DefaultMaterials.MESH_PHYSICAL,
                        castShadows: true,
                        receiveShadows: true,
                    });
                    entity.transform.setLocalScale(size);

                    const boxCollider = entity.addComponent(egret3d.oimo.BoxCollider);
                    boxCollider.box.size = size;
                    break;
                }

                case 1: {
                    const size = Math.random() * 1.5 + 0.5;
                    entity = egret3d.creater.createGameObject(`Sphere ${i}`, {
                        mesh: egret3d.DefaultMeshes.SPHERE,
                        material: egret3d.DefaultMaterials.MESH_PHYSICAL,
                        castShadows: true,
                        receiveShadows: true,
                    });
                    entity.transform.setLocalScale(size);

                    const sphereCollider = entity.addComponent(egret3d.oimo.SphereCollider);
                    sphereCollider.sphere.radius = size * 0.5;
                    break;
                }

                case 2: {
                    const sizeA = Math.random() * 1.5 + 0.5;
                    const sizeB = Math.random() * 1.5 + 0.5;
                    entity = egret3d.creater.createGameObject(`Cylinder ${i}`, {
                        mesh: egret3d.DefaultMeshes.CYLINDER,
                        material: egret3d.DefaultMaterials.MESH_PHYSICAL,
                        castShadows: true,
                        receiveShadows: true,
                    });
                    entity.transform.setLocalScale(sizeA, sizeB, sizeA);

                    const cylinderCollider = entity.addComponent(egret3d.oimo.CylinderCollider);
                    cylinderCollider.cylinder.topRadius = sizeA * 0.5;
                    cylinderCollider.cylinder.bottomRadius = sizeA * 0.5;
                    cylinderCollider.cylinder.height = sizeB;
                    break;
                }

                case 3: {
                    const sizeA = Math.random() * 1.5 + 0.5;
                    const sizeB = Math.random() * 1.5 + 0.5;
                    entity = egret3d.creater.createGameObject(`Cone ${i}`, {
                        mesh: egret3d.DefaultMeshes.CONE,
                        material: egret3d.DefaultMaterials.MESH_PHYSICAL,
                        castShadows: true,
                        receiveShadows: true,
                    });
                    entity.transform.setLocalScale(sizeA, sizeB, sizeA);

                    const coneCollider = entity.addComponent(egret3d.oimo.ConeCollider);
                    coneCollider.cylinder.bottomRadius = sizeA * 0.5;
                    coneCollider.cylinder.height = sizeB;
                    break;
                }

                case 4: {
                    const sizeA = Math.random() * 1.5 + 0.5;
                    const sizeB = Math.random() * 1.5 + 0.5;
                    entity = egret3d.creater.createGameObject(`Capsule ${i}`, {
                        mesh: egret3d.MeshBuilder.createCapsule(sizeA * 0.5, sizeB * 0.5),
                        material: egret3d.DefaultMaterials.MESH_PHYSICAL,
                        castShadows: true,
                        receiveShadows: true,
                    });

                    const capsuleCollider = entity.addComponent(egret3d.oimo.CapsuleCollider);
                    capsuleCollider.capsule.radius = sizeA * 0.5;
                    capsuleCollider.capsule.height = sizeB * 0.5;
                    break;
                }
            }

            if (entity) {
                entity.transform.setLocalPosition(
                    Math.random() * 8.0 - 4.0,
                    Math.random() * 8.0 + 4.0,
                    Math.random() * 8.0 - 4.0
                );

                const rigidbody = entity.getComponent(egret3d.oimo.Rigidbody)!;
                rigidbody.mass = 1.0;
            }
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