const creepRoles = require("creep.role")

/* 
* Creep required fields *
* initialized: bool
* role: string
* roleData: object
*/

let creepManager = {
    init: function(creep, roleName) {
        if (!creep.memory.initialized) {
            creep.memory.initialized = true
            creep.memory.role = roleName ? roleName : creepRoles.default.name
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

    reinitialize: function(creep, roleName) {
        creep.memory.initialized = false
        this.init(creep, roleName)
    },

    setRole: function(creep, roleName) {
        creep.memory.role = roleNae
    },
}

module.exports = creepManager
