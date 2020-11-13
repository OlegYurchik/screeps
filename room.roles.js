const roomRolePlanned = require("room.role.planned");

const roomRoles = {
    default: roomRolePlanned,
    [roomRolePlanned.name]: roomRolePlanned,
};

module.exports = roomRoles;
