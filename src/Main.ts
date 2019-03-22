import Rotater from "./behaviours/Rotater";
import Looker from "./behaviours/Looker";
import RotateLooker from "./behaviours/RotateLooker";
import Wander from "./behaviours/Wander";
import ColliderRaycaster from "./behaviours/ColliderRaycaster";
import RotateBehaviour from "./behaviours/RotateBehaviour";
import RotateAround from "./behaviours/RotateAround";

import InputTest from "./examples/InputTest";
import EUITest from "./examples/EUITest";
import CubeMapStarter from "./examples/materials/CubeMapStarter";
import OimoBasicStarter from "./examples/oimo/OimoBasicStarter";
import OimoColliderStarter from "./examples/oimo/OimoColliderStarter";

async function main() {
    await RES.loadConfig("resource/default.res.json", "resource/");
    await RES.getResAsync('Asset/scenes/newScene.scene.json');
    paper.Application.sceneManager.loadScene('Asset/scenes/newScene.scene.json');

    // 强制引用，该问题将在 Egret Pro 1.0.0 修复。
    Rotater;
    Looker;
    RotateLooker;
    Wander;
    ColliderRaycaster;
    RotateBehaviour;
    RotateAround;

    InputTest;
    EUITest;
    CubeMapStarter;
    OimoBasicStarter;
    OimoColliderStarter;
}