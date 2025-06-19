/// <reference path="./.config/vc.d.ts" />
import { KeyCode } from "./.config/enums";

/**
 * - F5: 跑车(Infernus)
 * - F6: 坦克(Rhino)
 */
const MI_INFERNUS = 141; 
const MI_RHINO = 162; 
const player = new Player(0);

while (true) {
    wait(250);
    if (Pad.IsKeyPressed(KeyCode.F5) && player.isPlaying()) {
        spawnVehicle(MI_INFERNUS, "刷出了一辆跑车!");
    }
    if (Pad.IsKeyPressed(KeyCode.F6) && player.isPlaying()) {
        spawnVehicle(MI_RHINO, "刷出了一辆坦克!");
    }
}

function spawnVehicle(modelId, message) {
    loadModel(modelId);

    const pos = addVec(player.getChar().getCoordinates(), { x: 2.0, y: -2.0, z: 0 });
    const vehicle = Car.Create(modelId, pos.x, pos.y, pos.z);
    const blip = Blip.AddForCar(vehicle);

    // 防止车辆门锁死
    vehicle.lockDoors(0);
    vehicle.closeAllDoors();

    showTextBox(message);
    vehicle.markAsNoLongerNeeded();
    Streaming.MarkModelAsNoLongerNeeded(modelId);

    wait(2000);
    blip.remove();
}


function loadModel(mi) {
    Streaming.RequestModel(mi);

    while (!Streaming.HasModelLoaded(mi)) {
        wait(250);
    }
}

function addVec(v1, v2) {
    return { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z };
}
