/*
* Creep Role Guard
* dutyPoint: array of 2 integer
*/

const creepRoleOfficer = require("creep.role.officer");

const creepRoleGuard = {
    __proto__: creepRoleOfficer,

    name: "guard",

    chooseTarget(creep) {
        var target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
        if (!target) {
            target = creep.memory.dutyPoint;
        }
        return target;
    },

    do(creep, target) {
        if (target instanceof Creep) {
            this.doAttack(creep, target);
        } else if (target instanceof RoomPosition) {
            this.doRest(creep, target);
        }
    },
};

module.exports = creepRoleGuard;
