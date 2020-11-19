/*
* Creep Role Claimer
* roomName: array of 2 integer
*/

const creepRoleOfficer = require("creep.role.officer");
const creepRoleUtils = require("creep.role.utils");

const creepRoleClaimer = {
    __proto__: creepRoleOfficer,

    name: "claimer",
    pathColor: "#ff0000",
    // reusePath: 100,

    chooseTarget(creep) {
        // TODO
    },

    do(creep, target) {
        // TODO
    },
};

module.exports = creepRoleClaimer;
