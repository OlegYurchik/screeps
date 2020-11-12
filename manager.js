const roomManager = require("room.manager")
const creepManager = require("creep.manager")

let manager = {
    init: function() {
        for (let roomName in Game.rooms) {
            roomManager.init(Game.rooms[roomName])
        }
        for (let creepName in Game.creeps) {
            creepManager.init(Game.creeps[creepName])
        }
    },

    loop: function() {
        for (let roomName in Game.rooms) {
            roomManager.loop(Game.rooms[roomName])
        }
        for (let creepName in Memory.creeps) {
            if (!Game.creeps[creepName]) {
                delete Memory.creeps[creepName]
            }
        }
        for (let creepName in Game.creeps) {
            creepManager.loop(Game.creeps[creepName])
        }
    },
}

module.exports = manager
