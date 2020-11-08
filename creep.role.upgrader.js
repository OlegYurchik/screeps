const creepRoleUtils = require("creep.role.utils")
const stateHarvest = 0
const stateUpgrade = 1

/*
* Upgrader creep fields *
* state: int
*/

let creepRoleUpgrader = {
    name: "upgrader",
    pathColor: "#ffa500",
    reusePath: 100,
    states: [stateHarvest, stateUpgrade],
    body: {
        [WORK]: 1,
        [CARRY]: 1,
        [MOVE]: 1,
    },

    loop: function(creep) {
        if (!(creep.memory.roleData.state in this.states)) {
            creep.memory.roleData.state = creep.store[RESOURCE_ENERGY] < creep.store.getCapacity() / 2 ? stateHarvest : stateUpgrade
        }
        
        if (creep.memory.roleData.state == stateUpgrade && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.roleData.state = stateHarvest
            
        } else if (creep.memory.roleData.state == stateHarvest && creep.store.getFreeCapacity() == 0) {
            creep.memory.roleData.state = stateUpgrade
        }

        if (creep.memory.roleData.state == stateUpgrade) {
            creepRoleUtils.doUpgrade(creep, this.pathColor, this.reusePath)
        } else if (creep.memory.roleData.state == stateHarvest) {
            let source = this.choiceSource(creep)
            creepRoleUtils.doHarvest(creep, source, this.pathColor, this.reusePath)
        }
    },

    choiceSource: function(creep) {
        let sources = creep.room.find(FIND_SOURCES)
        return sources[0]
    },
}

module.exports = creepRoleUpgrader
