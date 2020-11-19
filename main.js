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

    // Call loop for rooms and towers
    for (let roomName in Game.rooms) {
        roomManager.loop(Game.rooms[roomName]);
        let towers = Game.rooms[roomName].find(FIND_STRUCTURES, {
            filter: function(structure) {
                return structure.structureType == STRUCTURE_TOWER &&
                    structure.owner.username == "NoraQ";
        }});
        for (let tower of towers) {
            towerManager.loop(tower);
        }
    }
    // Call loop for creeps
    for (let creepName in Game.creeps) {
        creepManager.loop(Game.creeps[creepName]);
    }

    // Generate pixel
    if (Game.cpu.bucket > 5000) {
        Game.cpu.generatePixel();
    }
}
