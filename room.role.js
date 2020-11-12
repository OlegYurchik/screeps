const roomRolePlanned = require("room.role.planned")

let roomRoles = {
    default: roomRolePlanned,
    [roomRolePlanned.name]: roomRolePlanned,
}

module.exports = roomRoles
