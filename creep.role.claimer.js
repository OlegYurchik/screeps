/*
* Creep Role Claimer
* roomName: string
*/

const creepRoleOfficer = require("creep.role.officer");

const creepRoleClaimer = {
    __proto__: creepRoleOfficer,

    name: "claimer",

    chooseTarget(creep) {
        if (creep.memory.roleData.roomName == creep.room.name) {
            return creep.room.controller;
        }
        var target = Game.rooms[creep.memory.roleData.roomName];
        if (target) {
            target = target.controller;
        } else {
            target = creep.pos.findClosestByPath(
                Game.map.findExit(creep.room, creep.memory.roleData.roomName)
            );
        }
        return target;
    },

    do(creep, target) {
        if (target instanceof StructureController) {
            this.doClaim(creep, target);
        } else {
            this.doMove(creep, target);
        }
    },
};

module.exports = creepRoleClaimer;
