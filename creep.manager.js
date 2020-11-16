/* 
* Creep required fields *
* initialized: bool
* role: string
* roleData: object
*/

const creepRoles = require("creep.roles");

const creepManager = {
    init(creep, roleName, roleData) {
        if (!creep.memory.initialized) {
            creep.memory.initialized = true;
            creep.memory.role = roleName ? roleName : creepRoles.default.name;
            creep.memory.roleData = {};
            creepRoles[creep.memory.role].init(creep, roleData);
        }
    },

    loop(creep) {
        this.init(creep);
        if (creep.memory.role in creepRoles) {
            creepRoles[creep.memory.role].loop(creep);
        } else {
            console.log("WARNING: unknown role", creep.memory.role, "in creep", creep.id);
        }
    },
}

module.exports = creepManager;
