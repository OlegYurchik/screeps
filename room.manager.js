let creepRoles = require("creep.role")
let roomRoles = require("room.role")

let roomManager = {
    loop: function(room) {
        if (room.memory.role in roomRoles) {
            roomRoles[room.memory.role].loop(room)
        } else {
            console.log("Unknown role", room.memory.role, "in room", room.name)
        }
    },
}

module.exports = roomManager
