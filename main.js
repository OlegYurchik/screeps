const roomManager = require("room.manager");
const creepManager = require("creep.manager");

module.exports.loop = function() {
    // Call loop for every room and every creep
    for (let roomName in Game.rooms) {
        roomManager.loop(Game.rooms[roomName]);
    }
    for (let creepName in Game.creeps) {
        creepManager.loop(Game.creeps[creepName]);
    }
}
