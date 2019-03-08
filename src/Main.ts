import RotateBehaviour from "./behaviours/RotateBehaviour";

import InputTest from "./behaviours/InputTest";
import EUITest from "./behaviours/EUITest";

async function main() {
    await RES.loadConfig("resource/default.res.json", "resource/");
    await RES.getResAsync('Asset/scenes/newScene.scene.json');
    paper.Application.sceneManager.loadScene('Asset/scenes/newScene.scene.json');

    // 强制引用，该问题将在 Egret Pro 1.0.0 修复。
    RotateBehaviour;
    InputTest;
    EUITest;
}