
export default class CubeMapStarter extends paper.Behaviour {

    public onStart() {
        const middle = paper.Application.sceneManager.activeScene.find<paper.GameObject>("Middle")!;
        middle.getComponentInChildren(egret3d.MeshRenderer)!.material = egret3d.Material.create(egret3d.DefaultShaders.MESH_LAMBERT)
            .setColor(0xFFFFFF);

        const right = paper.Application.sceneManager.activeScene.find<paper.GameObject>("Right")!;
        right.getComponentInChildren(egret3d.MeshRenderer)!.material = egret3d.Material.create(egret3d.DefaultShaders.MESH_LAMBERT)
            .setColor(0xFFEE00)
            .setFloat(egret3d.ShaderUniformName.RefractionRatio, 0.95).addDefine(egret3d.ShaderDefine.ENVMAP_MODE_REFRACTION);

        const left = paper.Application.sceneManager.activeScene.find<paper.GameObject>("Left")!;
        left.getComponentInChildren(egret3d.MeshRenderer)!.material = egret3d.Material.create(egret3d.DefaultShaders.MESH_LAMBERT)
            .setColor(0xFF6600)
            .setFloat(egret3d.ShaderUniformName.Reflectivity, 0.3);
    }
}
