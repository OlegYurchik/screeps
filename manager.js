const roomManager = require("room.manager")
const creepManager = require("creep.manager")

let manager = {
    timeSeries: [],

    init: function() {
        for (let roomName in Game.rooms) {
            roomManager.init(Game.rooms[roomName])
        }
        for (let creepName in Game.creeps) {
            creepManager.init(Game.creeps[creepName])
        }
    },

    loop: function() {
        let start = performance.now()
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
        let end = performance.now()
        this.timeSeries.push(end - start)
        if (this.timeSeries.length == 10) {
            let sum = 0
            for (let itertime of this.timeSeries) {
                sum += itertime
            }
            console.log("Iteration time:", (sum / 10).toFixed(2), "ms")
        }
    },
}

module.exports = manager
