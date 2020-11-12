const roomRoles = require("room.role")

/* 
* Room required fields *
* initialized: bool
* role: string
* roleData: object
*/

let roomManager = {
    init: function(room, roleName) {
        if (!room.memory.initialized) {
            room.memory.initialized = true
            room.memory.role = roleName ? roleName : roomRoles.default.name
            room.memory.roleData = {}
        }
    },

    loop: function(room) {
        if (room.memory.role in roomRoles) {
            roomRoles[room.memory.role].loop(room)
        } else {
            console.log("WARNING: unknown role", room.memory.role, "in room", room.name)
        }
    },

    reinitialize: function(room, roleName) {
        room.memory.initialized = false
        this.init(room, roleName)
    },
}

module.exports = roomManager
