/**
 * 一个简易的碰撞体射线检测组件。
 */
export default class ColliderRaycaster extends paper.Behaviour {
    private static _lineMaterial: egret3d.Material | null = null;
    private static _pointMaterial: egret3d.Material | null = null;

    /**
     * 需要被检测的实体。
     */
    @paper.editor.property(paper.editor.EditType.GAMEOBJECT)
    @paper.serializedField
    public target: paper.GameObject | null = null;

    private readonly _system: egret3d.CollisionSystem = paper.Application.systemManager.getSystem(egret3d.CollisionSystem)!;
    private readonly _ray: egret3d.Ray = egret3d.Ray.create();
    private readonly _raycastInfo: egret3d.RaycastInfo = egret3d.RaycastInfo.create();
    private readonly _normal: egret3d.Vector3 = egret3d.Vector3.create();

    private _lineMesh: egret3d.Mesh | null = null;

    private _updateRay() {
        const transform = this.gameObject.transform;
        const ray = this._ray;
        ray.origin.copy(transform.position);
        transform.getForward(ray.direction);
    }

    public onStart() {
        const meshFilter = this.gameObject.getOrAddComponent(egret3d.MeshFilter);
        const meshRenderer = this.gameObject.getOrAddComponent(egret3d.MeshRenderer);

        this._lineMesh = meshFilter.mesh = egret3d.Mesh.create(3, 3, [gltf.AttributeSemantics.POSITION, gltf.AttributeSemantics.COLOR_0]);
        this._lineMesh.glTFMesh.primitives[0].mode = gltf.MeshPrimitiveMode.LineStrip;
        this._lineMesh.setIndices([0, 1, 2], 0);
        this._lineMesh.setIndices([0, 1], this._lineMesh.addSubMesh(2, 1, gltf.MeshPrimitiveMode.Points));
        this._lineMesh.setAttributes(gltf.AttributeSemantics.POSITION, [
            0.0, 0.0, 0.0,
            0.0, 0.0, 1.0,
            0.0, 0.0, 1.0,
        ]);
        this._lineMesh.setAttributes(gltf.AttributeSemantics.COLOR_0, [
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
            1.0, 1.0, 1.0, 1.0,
        ]);

        if (!ColliderRaycaster._lineMaterial) {
            ColliderRaycaster._lineMaterial = egret3d.Material.create(egret3d.DefaultShaders.LINEDASHED)
                .addDefine(egret3d.ShaderDefine.USE_COLOR);
            ColliderRaycaster._pointMaterial = egret3d.Material.create(egret3d.DefaultShaders.POINTS)
                .addDefine(egret3d.ShaderDefine.USE_COLOR)
                .setFloat(egret3d.ShaderUniformName.Size, 10.0);
        }

        meshRenderer.materials = [
            ColliderRaycaster._lineMaterial,
            ColliderRaycaster._pointMaterial,
        ];
    }

    public onLateUpdate() {
        if (!this.target) {
            return;
        }

        const mesh = this._lineMesh!;
        const colors = mesh.getColors()!;
        const vertices = mesh.getVertices()!;
        const raycastInfo = this._raycastInfo;
        const isHit = raycastInfo.transform !== null;
        raycastInfo.clear();
        
        const normal = raycastInfo.normal = this._normal;
        this._updateRay();

        if (this._system.raycastSingle(this._ray, this.target, paper.Layer.Default, 0.0, raycastInfo)) {
            normal.applyDirection(this.gameObject.transform.worldToLocalMatrix);

            vertices[3] = 0.0;
            vertices[4] = 0.0;
            vertices[5] = raycastInfo.distance;
            vertices[6] = normal.x;
            vertices[7] = normal.y;
            vertices[8] = normal.z + raycastInfo.distance;

            for (let i = 0, l = colors.length; i < l; i += 4) {
                colors[i + 0] = 1.0;
                colors[i + 1] = 0.0;
                colors[i + 2] = 0.0;
            }

            mesh.uploadVertexBuffer(gltf.AttributeSemantics.POSITION);

            if (!isHit) {
                mesh.uploadVertexBuffer(gltf.AttributeSemantics.COLOR_0);
            }
        }
        else if (isHit) {
            vertices[3] = 0.0;
            vertices[4] = 0.0;
            vertices[5] = 5.0;
            vertices[6] = 0.0;
            vertices[7] = 0.0;
            vertices[8] = 5.0;

            for (let i = 0, l = colors.length; i < l; i += 4) {
                colors[i + 0] = 0.0;
                colors[i + 1] = 1.0;
                colors[i + 2] = 0.0;
            }

            mesh.uploadVertexBuffer(gltf.AttributeSemantics.POSITION);
            mesh.uploadVertexBuffer(gltf.AttributeSemantics.COLOR_0);
        }
    }
}