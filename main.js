const creepManager = require("creep.manager");
const roomManager = require("room.manager");
const towerManager = require("tower.manager");

module.exports.loop = function() {
    // Delete memory
    for (let creepName in Memory.creeps) {
        if (Game.creeps[creepName] === undefined) {
            delete Memory.creeps[creepName];
        }
    }

    // Call loop for rooms
    for (let roomName in Game.rooms) {
        roomManager.loop(Game.rooms[roomName]);
    }
    // Call loop for creeps
    for (let creepName in Game.creeps) {
        creepManager.loop(Game.creeps[creepName]);
    }
    // Call loop for structures
    // for (let structureID in Game.structures) {
    //     let structure = Game.structures[structureID];
    //     if (structure.owner.username != "NoraQ") {
    //         continue;
    //     }
    //     switch (structure.structureType) {
    //         case STRUCTURE_TOWER:
    //             towerManager.loop(structure);
    //             break;
    //     }
    // }
}
