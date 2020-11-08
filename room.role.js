const roomRolePeace = require("room.role.peace")

let roomRoles = {
    default: roomRolePeace,
    [roomRolePeace.name]: roomRolePeace,
}

module.exports = roomRoles
