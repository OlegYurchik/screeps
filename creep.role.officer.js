/*
* Creep Role Officer [Abstract] *
*/

const CreepRoleOfficer = {
    name: "officer",
    
    init(creep, roleData) {

    },

    loop(creep) {
        var target = this.chooseTarget(creep);
        this.do(creep, target);
    },

    chooseTarget(creep) {throw "Not implemented"},
    do(creep, target) {throw "Not implemented"},
};

module.exports = CreepRoleOfficer;
