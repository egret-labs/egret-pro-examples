import Rotater from "./behaviours/Rotater";
import RotateLooker from "./behaviours/RotateLooker";
import RotateBehaviour from "./behaviours/RotateBehaviour";
import RotateAround from "./behaviours/RotateAround";

import InputTest from "./examples/InputTest";
import EUITest from "./examples/EUITest";
import CubeMapStarter from "./examples/materials/CubeMapStarter";


async function main() {
    await RES.loadConfig("resource/default.res.json", "resource/");
    await RES.getResAsync('Asset/scenes/newScene.scene.json');
    paper.Application.sceneManager.loadScene('Asset/scenes/newScene.scene.json');

    // 强制引用，该问题将在 Egret Pro 1.0.0 修复。
    Rotater;
    RotateLooker;
    RotateBehaviour;
    RotateAround;

    InputTest;
    EUITest;
    CubeMapStarter;
}