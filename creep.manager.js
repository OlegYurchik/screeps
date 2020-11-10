const creepRoles = require("creep.role")

/* 
* Creep required fields *
* initialized: bool
* target: object
* role: string
* roleData: object
* power: int
*/

let creepManager = {
    init: function(creep, roleName) {
        if (!creep.memory.initialized) {
            creep.memory.initialized = true
            creep.memory.target = null
            creep.memory.role = roleName ? roleName : creepRoles.default.name
            creep.memory.roleData = {}

            let bodyCounter = {}
            for (let bodyItem in creep.body) {
                if (bodyItem.type in bodyCounter) {
                    bodyCounter[bodyItem.type] = 0
                }
                bodyCounter[bodyItem.type]++
            }
            let power = 100
            for (let bodyType in creepRoles[creep.memory.role].body) {
                let curPower = bodyCounter[bodyType] / creepRoles[creep.memory.role].body[bodyType]
                if (curPower < power) {
                    power = curPower
                }
            }
            creep.memory.power = power
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
