let creepRoleUtils = require("creep.role.utils")

let creepRoleUpgrader = {
    name: "upgrader",
    pathColor: "#ffa500",
    reusePath: 100,
    body: {
        [WORK]: 1,
        [CARRY]: 1,
        [MOVE]: 1,
    },

    loop: function(creep) {
        if (!creep.memory.state) {
            creep.memory.state = creep.store[RESOURCE_ENERGY] < creep.store.getCapacity() / 2 ? "harvest" : "upgrade"
        }
        
        if (creep.memory.state == "upgrade" && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.state = "harvest"
            
        } else if (creep.memory.state == "harvest" && creep.store.getFreeCapacity() == 0) {
            creep.memory.state = "upgrade"
        }

        if (creep.memory.state == "upgrade") {
            creepRoleUtils.doUpgrade(creep, this.pathColor, this.reusePath)
        } else if (creep.memory.state == "harvest") {
            let source = creep.memory.forceSource ? creep.memory.forceSource : this.choiceSource(creep)
            creepRoleUtils.doHarvest(creep, source, this.pathColor, this.reusePath)
        }
    },

    choiceSource: function(creep) {
        let sources = creep.room.find(FIND_SOURCES)
        return sources[0]
    },
}

module.exports = creepRoleUpgrader