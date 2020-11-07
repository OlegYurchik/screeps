let roomManager = require("room.manager")
let creepManager = require("creep.manager")

let manager = {
    loop: function() {
        for (let roomName in Game.rooms) {
            roomManager.loop(Game.rooms[roomName])
        }
        for (let creepName in Game.creeps) {
            creepManager.loop(Game.creeps[creepName])
        }
    },
}

module.exports = manager
