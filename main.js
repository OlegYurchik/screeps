const roomManager = require("room.manager");
const creepManager = require("creep.manager");

module.exports.loop = function() {
    // Delete memory
    for (let creepName in Memory.creeps) {
        if (Game.creeps[creepName] === undefined) {
            delete Memory.creeps[creepName];
        }
    }

    // Call loop for every room and every creep
    for (let roomName in Game.rooms) {
        roomManager.loop(Game.rooms[roomName]);
    }
    for (let creepName in Game.creeps) {
        creepManager.loop(Game.creeps[creepName]);
    }
}
