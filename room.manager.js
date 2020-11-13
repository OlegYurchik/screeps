/* 
* Room required fields *
* initialized: bool
* role: string
* roleData: object
*/

const roomRoles = require("room.roles");

const roomManager = {
    init(room, roleName) {
        if (!room.memory.initialized) {
            room.memory.initialized = true;
            room.memory.role = roleName ? roleName : roomRoles.default.name;
            room.memory.roleData = {};
        }
    },

    loop(room) {
        this.init(room);
        if (room.memory.role in roomRoles) {
            roomRoles[room.memory.role].loop(room);
        } else {
            console.log("WARNING: unknown role", room.memory.role, "in room", room.name);
        }
    },
}

module.exports = roomManager;
