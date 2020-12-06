/*
* Creep Role Officer [Abstract] *
*/

const creepRoleCommon = require("creep.role.common");

const creepRoleOfficer = {
    __proto__: creepRoleCommon,

    name: "officer",

    loop(creep) {
        var target = this.chooseTarget(creep);
        this.do(creep, target);
    },

    chooseTarget(creep) {throw "Not implemented"},
    do(creep, target) {throw "Not implemented"},
};

module.exports = creepRoleOfficer;
