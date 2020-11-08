const creepRoles = require("creep.role")

/* 
* Creep required fields *
* initialized: bool
* role: string
* roleData: object
*/

let creepManager = {
    init: function(creep, role) {
        if (!creep.memory.initialized) {
            creep.memory.initialized = true
            creep.memory.role = role ? role : creepRoles.default.name
            creep.memory.roleData = {}
        }
    },

    loop: function(creep) {
        if (creep.memory.role in creepRoles) {
            creepRoles[creep.memory.role].loop(creep)
        } else {
            console.log("WARNING: unknown role", creep.memory.role, "in creep", creep.id)
        }
    },
}

module.exports = creepManager
