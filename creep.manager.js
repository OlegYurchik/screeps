let creepRoles = require("creep.role")

let creepManager = {
    loop: function(creep) {
        if (creep.memory.role in creepRoles) {
            creepRoles[creep.memory.role].loop(creep)
        } else {
            console.log("Unknown role", creep.memory.role, "in creep", creep.id)
        }
    },
}

module.exports = creepManager
