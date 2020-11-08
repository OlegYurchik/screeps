const creepRoleUtils = require("creep.role.utils")
const stateHarvest = 0
const stateTransfer = 1

/*
* Spawner creep fields *
* state: int
*/

let creepRoleSpawner = {
    name: "spawner",
    pathColor: "#ffff00",
    reusePath: 100,
    states: [stateHarvest, stateTransfer],
    body: {
        [WORK]: 1,
        [CARRY]: 1,
        [MOVE]: 1,
    },

    loop: function(creep) {
        if (!(creep.memory.roleData.state in this.states)) {
            creep.memory.roleData.state = creep.store[RESOURCE_ENERGY] < creep.store.getCapacity() / 2 ? stateHarvest : stateTransfer
        }

        if (creep.memory.roleData.state == stateTransfer && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.roleData.state = stateHarvest
        } else if (creep.memory.roleData.state == stateHarvest && creep.store.getFreeCapacity() == 0) {
            creep.memory.roleData.state = stateTransfer
        }

        if (creep.memory.roleData.state == stateHarvest) {
            let source = this.choiceSource(creep)
            creepRoleUtils.doHarvest(creep, source, this.pathColor, this.reusePath)      
        } else if (creep.memory.roleData.state == stateTransfer) {
            let target = this.choiceTarget(creep)
            creepRoleUtils.doTransfer(creep, target, this.pathColor, this.reusePath)
        }
    },

    choiceSource: function(creep) {
        let sources = creep.room.find(FIND_SOURCES)
        return sources[0]
    },

    choiceTarget: function(creep) {
        let structures = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_SPAWN ||
                        structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            }
        })
        return structures[0]
    },
}

module.exports = creepRoleSpawner
