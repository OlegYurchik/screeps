const roomRoleUtils = require("room.role.utils")
const roomRoles = require("room.role")

/* 
* Room required fields *
* initialized: bool
* role: string
* roleData: object
* state: object
* * creepsByRoles: object
* targetState: object
*/

let roomManager = {
    init: function(room) {
        if (!room.memory.initialized) {
            room.memory.initialized = true
            room.memory.role = roomRoles.default.name
            room.memory.roleData = {}
            room.memory.state = {
                creepsByRoles: roomRoleUtils.getCreepsByRoles(room),
            }
            room.memory.targetState = {}
        }
    },

    loop: function(room) {
        if (room.memory.role in roomRoles) {
            roomRoles[room.memory.role].loop(room)
        } else {
            console.log("WARNING: unknown role", room.memory.role, "in room", room.name)
        }
    },
}

module.exports = roomManager
